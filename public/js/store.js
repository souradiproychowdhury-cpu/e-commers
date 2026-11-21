(function () {
  const CART_KEY = 'forma_cart_v1';
  const ORDERS_KEY = 'forma_orders_v1';

  function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(amount || 0));
  }

  function roundCurrency(value) {
    return Math.round((Number(value) + Number.EPSILON) * 100) / 100;
  }

  function calculateShipping(subtotal) {
    return subtotal >= 100 ? 0 : 7.5;
  }

  function loadCart() {
    try {
      const raw = localStorage.getItem(CART_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(parsed)) return [];
      return parsed
        .map((i) => ({ productId: Number(i.productId), quantity: Number(i.quantity) }))
        .filter((i) => Number.isInteger(i.productId) && i.productId > 0 && Number.isInteger(i.quantity) && i.quantity > 0);
    } catch { return []; }
  }

  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }

  function getCart() { return loadCart(); }
  function setCart(cart) { saveCart(cart); }

  function addToCart(productId, quantity = 1, stock = Infinity) {
    const cart = loadCart();
    const existing = cart.find((i) => i.productId === Number(productId));
    if (existing) {
      existing.quantity = Math.min(existing.quantity + Number(quantity), Number(stock));
    } else {
      cart.push({ productId: Number(productId), quantity: Math.min(Number(quantity), Number(stock)) });
    }
    saveCart(cart.filter((i) => i.quantity > 0));
    return getCart();
  }

  function updateQuantity(productId, quantity, stock = Infinity) {
    let cart = loadCart();
    const item = cart.find((i) => i.productId === Number(productId));
    if (!item) return cart;
    const next = Math.max(0, Math.min(Number(quantity), Number(stock)));
    if (next <= 0) cart = cart.filter((i) => i.productId !== Number(productId));
    else item.quantity = next;
    saveCart(cart);
    return cart;
  }

  function removeFromCart(productId) {
    const cart = loadCart().filter((i) => i.productId !== Number(productId));
    saveCart(cart);
    return cart;
  }

  function clearCart() { saveCart([]); }

  function cartCount() {
    return loadCart().reduce((sum, i) => sum + Number(i.quantity || 0), 0);
  }

  async function fetchProducts() {
    const res = await fetch('/api/products', { headers: { Accept: 'application/json' } });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || 'Unable to load products.');
    return Array.isArray(data.products) ? data.products : [];
  }

  async function placeOrder(payload) {
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const details = Array.isArray(data.details) && data.details.length ? ` ${data.details.join(' ')}` : '';
      const err = new Error((data.error || 'Unable to place order.') + details);
      err.status = res.status;
      err.data = data;
      throw err;
    }
    return data;
  }

  function saveLocalOrder(order) {
    try {
      const orders = JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');
      orders.unshift({ ...order, savedAt: new Date().toISOString() });
      localStorage.setItem(ORDERS_KEY, JSON.stringify(orders.slice(0, 20)));
    } catch {}
  }

  function getLocalOrders() {
    try {
      const orders = JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');
      return Array.isArray(orders) ? orders : [];
    } catch { return []; }
  }

  function getParam(name) {
    return new URLSearchParams(window.location.search).get(name);
  }

  function escapeHtml(str) {
    return String(str ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
  }

  function toast(message, type = 'info') {
    let root = document.getElementById('toast-root');
    if (!root) {
      root = document.createElement('div');
      root.id = 'toast-root';
      root.className = 'fixed top-20 right-4 z-[80] flex flex-col gap-2';
      document.body.appendChild(root);
    }
    const el = document.createElement('div');
    const colors = type === 'error' ? 'bg-error text-on-error' : type === 'success' ? 'bg-primary text-on-primary' : 'bg-surface-container-highest text-on-surface';
    el.className = `px-4 py-3 rounded-lg shadow-md font-body-sm text-body-sm ${colors}`;
    el.textContent = message;
    root.appendChild(el);
    setTimeout(() => { el.style.opacity = '0'; el.style.transition = 'opacity 200ms'; setTimeout(() => el.remove(), 220); }, 2600);
  }

  async function updateCartBadges() {
    const count = cartCount();
    document.querySelectorAll('[data-cart-count]').forEach((el) => {
      el.textContent = String(count);
      el.classList.toggle('hidden', count <= 0);
    });
  }

  function wireGlobalNavActive() {
    const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    document.querySelectorAll('[data-nav]').forEach((a) => {
      const target = (a.getAttribute('href') || '').split('/').pop().split('?')[0].toLowerCase();
      const active = target === path || (path === '' && target === 'index.html');
      a.dataset.active = active ? 'true' : 'false';
      if (active) { a.classList.add('text-primary','font-semibold'); a.classList.remove('text-on-surface-variant'); }
    });
  }

  window.FORMAStore = {
    formatCurrency, roundCurrency, calculateShipping,
    getCart, setCart, addToCart, updateQuantity, removeFromCart, clearCart, cartCount,
    fetchProducts, placeOrder, saveLocalOrder, getLocalOrders,
    getParam, escapeHtml, toast, updateCartBadges, wireGlobalNavActive,
  };
})();
