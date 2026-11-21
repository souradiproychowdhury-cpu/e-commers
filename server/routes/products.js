const express = require('express');
const db = require('../db');
const fallbackStore = require('../data/fallbackStore');

const router = express.Router();

// GET /api/products - fetch products from database (falls back to local seed data for localhost/demo if DB unavailable)
router.get('/', async (_req, res) => {
  try {
    const result = await db.query(
      `SELECT id, name, category, description, price, image_url, badge, stock, created_at
       FROM products
       ORDER BY created_at ASC, id ASC`
    );

    const products = result.rows.map((row) => ({
      ...row,
      price: Number(row.price),
      stock: Number(row.stock),
    }));

    return res.json({ products });
  } catch (error) {
    if (fallbackStore.isDbConnectionError(error)) {
      console.warn('Database unavailable, serving fallback product catalogue for local hosting.');
      return res.json({ products: fallbackStore.getProducts(), source: 'fallback' });
    }
    console.error('Failed to fetch products:', error);
    return res.status(500).json({ error: 'Unable to load products. Please try again later.' });
  }
});

module.exports = router;
