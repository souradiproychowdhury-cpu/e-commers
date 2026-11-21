const express = require('express');
const db = require('../db');
const { validateCheckoutPayload, calculateShipping } = require('../utils/validation');
const fallbackStore = require('../data/fallbackStore');

const router = express.Router();

function roundCurrency(value) {
  return Math.round((Number(value) + Number.EPSILON) * 100) / 100;
}

function buildOrderFromProducts({ customerName, email, address, city, postalCode, items }, productsById) {
  const orderItems = items.map((item) => {
    const product = productsById.get(item.productId);
    const unitPrice = roundCurrency(product.price);
    const lineTotal = roundCurrency(unitPrice * item.quantity);
    return {
      productId: item.productId,
      name: product.name,
      unitPrice,
      quantity: item.quantity,
      lineTotal,
      imageUrl: product.image_url,
    };
  });

  const subtotal = roundCurrency(orderItems.reduce((sum, item) => sum + item.lineTotal, 0));
  const shipping = roundCurrency(calculateShipping(subtotal));
  const total = roundCurrency(subtotal + shipping);

  return {
    orderItems,
    orderPayload: {
      customer_name: customerName,
      email,
      address,
      city,
      postal_code: postalCode,
      items: orderItems,
      subtotal,
      shipping,
      total,
      status: 'confirmed',
    },
    totals: { subtotal, shipping, total },
  };
}

function validateStockAndPresence(items, productsById) {
  const missing = items.filter((item) => !productsById.has(item.productId)).map((item) => item.productId);
  if (missing.length > 0) {
    return {
      ok: false,
      status: 400,
      body: {
        error: 'Some products in your cart are no longer available.',
        details: [`Unavailable product IDs: ${missing.join(', ')}`],
      },
    };
  }

  const stockIssues = [];
  for (const item of items) {
    const product = productsById.get(item.productId);
    if (Number(product.stock) < item.quantity) {
      stockIssues.push(`${product.name}: requested ${item.quantity}, but only ${product.stock} in stock.`);
    }
  }
  if (stockIssues.length > 0) {
    return {
      ok: false,
      status: 409,
      body: {
        error: 'Insufficient stock for one or more items.',
        details: stockIssues,
      },
    };
  }
  return { ok: true };
}

async function createOrderWithFallback(validatedData) {
  const { customerName, email, address, city, postalCode, items } = validatedData;
  const products = fallbackStore.getProductsByIds(items.map((i) => i.productId));
  const productsById = new Map(products.map((row) => [Number(row.id), row]));

  const check = validateStockAndPresence(items, productsById);
  if (!check.ok) return check;

  const { orderItems, orderPayload, totals } = buildOrderFromProducts(validatedData, productsById);
  fallbackStore.decrementStock(items);
  const saved = fallbackStore.createOrderRecord(orderPayload);

  return {
    ok: true,
    status: 201,
    body: {
      message: 'Order placed successfully (local fallback mode).',
      order: {
        id: saved.id,
        status: saved.status,
        customerName,
        email,
        address,
        city,
        postalCode,
        items: orderItems,
        subtotal: totals.subtotal,
        shipping: totals.shipping,
        total: totals.total,
        createdAt: saved.created_at,
      },
    },
  };
}

// POST /api/orders - validate checkout, verify stock, calculate prices server-side, save order, update stock
router.post('/', async (req, res) => {
  const validation = validateCheckoutPayload(req.body);
  if (!validation.ok) {
    return res.status(400).json({ error: 'Invalid checkout details.', details: validation.errors });
  }

  const { customerName, email, address, city, postalCode, items } = validation.data;
  let client;

  try {
    client = await db.pool.connect();
  } catch (error) {
    if (fallbackStore.isDbConnectionError(error)) {
      console.warn('Database unavailable, processing order using local fallback store.');
      const fallbackResult = await createOrderWithFallback(validation.data);
      return res.status(fallbackResult.status).json(fallbackResult.body);
    }
    console.error('Failed to connect to database for order:', error);
    return res.status(500).json({ error: 'Unable to place order. Please try again later.' });
  }

  try {
    await client.query('BEGIN');

    const productIds = items.map((item) => item.productId);
    const productsResult = await client.query(
      `SELECT id, name, price, stock, image_url
       FROM products
       WHERE id = ANY($1::int[])
       FOR UPDATE`,
      [productIds]
    );

    const productsById = new Map(productsResult.rows.map((row) => [Number(row.id), row]));
    const check = validateStockAndPresence(items, productsById);
    if (!check.ok) {
      await client.query('ROLLBACK');
      return res.status(check.status).json(check.body);
    }

    const { orderItems, totals } = buildOrderFromProducts(validation.data, productsById);

    // Update stock
    for (const item of items) {
      await client.query('UPDATE products SET stock = stock - $1 WHERE id = $2', [
        item.quantity,
        item.productId,
      ]);
    }

    // Save order details
    const orderResult = await client.query(
      `INSERT INTO orders
        (customer_name, email, address, city, postal_code, items, subtotal, shipping, total, status)
       VALUES ($1, $2, $3, $4, $5, $6::jsonb, $7, $8, $9, 'confirmed')
       RETURNING id, status, subtotal, shipping, total, created_at`,
      [
        customerName,
        email,
        address,
        city,
        postalCode,
        JSON.stringify(orderItems),
        totals.subtotal,
        totals.shipping,
        totals.total,
      ]
    );

    await client.query('COMMIT');

    const order = orderResult.rows[0];
    return res.status(201).json({
      message: 'Order placed successfully.',
      order: {
        id: order.id,
        status: order.status,
        customerName,
        email,
        address,
        city,
        postalCode,
        items: orderItems,
        subtotal: Number(order.subtotal),
        shipping: Number(order.shipping),
        total: Number(order.total),
        createdAt: order.created_at,
      },
    });
  } catch (error) {
    try {
      await client.query('ROLLBACK');
    } catch (_) {
      // ignore rollback errors
    }
    if (fallbackStore.isDbConnectionError(error)) {
      console.warn('Database error during order, processing with local fallback store.', error.message);
      const fallbackResult = await createOrderWithFallback(validation.data);
      return res.status(fallbackResult.status).json(fallbackResult.body);
    }
    console.error('Failed to create order:', error);
    return res.status(500).json({ error: 'Unable to place order. Please try again later.' });
  } finally {
    if (client) client.release();
  }
});

module.exports = router;
