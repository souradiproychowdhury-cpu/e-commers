function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function isValidEmail(email) {
  if (typeof email !== 'string') return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function normalizeCartItems(items) {
  if (!Array.isArray(items) || items.length === 0) {
    return { error: 'Cart must include at least one item.' };
  }

  const normalized = [];
  for (const item of items) {
    const productId = Number(item?.productId ?? item?.id);
    const quantity = Number(item?.quantity);

    if (!Number.isInteger(productId) || productId <= 0) {
      return { error: 'Each cart item must include a valid productId.' };
    }
    if (!Number.isInteger(quantity) || quantity <= 0) {
      return { error: 'Each cart item must include a quantity of at least 1.' };
    }

    normalized.push({ productId, quantity });
  }

  // Merge duplicate product IDs
  const merged = new Map();
  for (const item of normalized) {
    merged.set(item.productId, (merged.get(item.productId) || 0) + item.quantity);
  }

  return {
    items: Array.from(merged.entries()).map(([productId, quantity]) => ({ productId, quantity })),
  };
}

function validateCheckoutPayload(body) {
  const errors = [];
  const customerName = typeof body?.customerName === 'string' ? body.customerName.trim() : '';
  const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';
  const address = typeof body?.address === 'string' ? body.address.trim() : '';
  const city = typeof body?.city === 'string' ? body.city.trim() : '';
  const postalCode = typeof body?.postalCode === 'string' ? body.postalCode.trim() : '';

  if (!isNonEmptyString(customerName) || customerName.length < 2) {
    errors.push('Full name is required (at least 2 characters).');
  }
  if (!isValidEmail(email)) {
    errors.push('A valid email address is required.');
  }
  if (!isNonEmptyString(address) || address.length < 5) {
    errors.push('Address is required (at least 5 characters).');
  }
  if (!isNonEmptyString(city)) {
    errors.push('City is required.');
  }
  if (!isNonEmptyString(postalCode) || postalCode.length < 3) {
    errors.push('Postal code is required.');
  }

  const itemsResult = normalizeCartItems(body?.items);
  if (itemsResult.error) {
    errors.push(itemsResult.error);
  }

  if (errors.length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    data: {
      customerName,
      email,
      address,
      city,
      postalCode,
      items: itemsResult.items,
    },
  };
}

function calculateShipping(subtotal) {
  // Free shipping above $100, otherwise $7.50
  return subtotal >= 100 ? 0 : 7.5;
}

module.exports = {
  validateCheckoutPayload,
  calculateShipping,
};
