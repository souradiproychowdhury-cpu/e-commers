(() => {
  const CART_STORAGE_KEY = 'forma_cart_v1';

  const state = {
    products: [],
    filteredProducts: [],
    cart: loadCart(),
    loading: false,
    error: null,
  };

  const els = {
    productsGrid: document.getElementById('productsGrid'),
    productsStatus: document.getElementById('productsStatus'),
    searchInput: document.getElementById('searchInput'),
    categoryFilter: document.getElementById('categoryFilter'),
    cartCount: document.getElementById('cartCount'),
    openCartBtn: document.getElementById('openCartBtn'),
    closeCartBtn: document.getElementById('closeCartBtn'),
    cartDrawer: document.getElementById('cartDrawer'),
    cartOverlay: document.getElementById('cartOverlay'),
    cartItems: document.getElementById('cartItems'),
    cartSubtotal: document.getElementById('cartSubtotal'),
    cartShipping: document.getElementById('cartShipping'),
    cartTotal: document.getElementById('cartTotal'),
    cartShippingNote: document.getElementById('cartShippingNote'),
    goToCheckoutBtn: document.getElementById('goToCheckoutBtn'),
    checkoutItems: document.getElementById('checkoutItems'),
    checkoutSubtotal: document.getElementById('checkoutSubtotal'),
    checkoutShipping: document.getElementById('checkoutShipping'),
    checkoutTotal: document.getElementById('checkoutTotal'),
    shippingNote: document.getElementById('shippingNote'),
    checkoutForm: document.getElementById('checkoutForm'),
    checkoutStatus: document.getElementById('checkoutStatus'),
    placeOrderBtn: document.getElementById('placeOrderBtn'),
    orderConfirmation: document.getElementById('orderConfirmation'),
    newsletterForm: document.getElementById('newsletterForm'),
    newsletterEmail: document.getElementById('newsletterEmail'),
    newsletterStatus: document.getElementById('newsletterStatus'),
    navToggle: document.getElementById('navToggle'),
    navLinks: document.getElementById('navLinks'),
    year: document.getElementById('year'),
  };

  function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(amount || 0));
  }

  function roundCurrency(value) {
    return Math.round((Number(value) + Number.EPSILON) * 100) / 100;
  }

  function calculateShipping(subtotal) {
    // Free shipping above $100. $7.50 shipping below $100.
    return subtotal >= 100 ? 0 : 7.5;
  }

  function loadCart() {
    try {
      const raw = localStorage.getItem(CART_STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed
        .map((item) => ({
          productId: Number(item.productId),
          quantity: Number(item.quantity),
        }))
        .filter((item) => Number.isInteger(item.productId) && item.productId > 0 && Number.isInteger(item.quantity) && item.quantity > 0);
    } catch {
      return [];
    }
  }

  function saveCart() {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.cart));
  }

  function getProductById(id) {
    return state.products.find((p) => Number(p.id) === Number(id));
  }

  function getCartDetailedItems() {
    return state.cart
      .map((item) => {
        const product = getProductById(item.productId);
        if (!product) return null;
        const quantity = Math.max(0, Math.min(item.quantity, Number(product.stock) || item.quantity));
        const unitPrice = Number(product.price);
        const lineTotal = roundCurrency(unitPrice * item.quantity);
        return {
          ...item,
          quantity: item.quantity,
          effectiveQuantity: quantity,
          name: product.name,
          imageUrl: product.image_url,
          unitPrice,
          lineTotal,
          stock: Number(product.stock),
          category: product.category,
        };
      })
      .filter(Boolean);
  }

  function getCartTotals() {
    const detailed = getCartDetailedItems();
    const subtotal = roundCurrency(detailed.reduce((sum, item) => sum + item.lineTotal, 0));
    const shipping = roundCurrency(calculateShipping(subtotal));
    const total = roundCurrency(subtotal + shipping);
    const count = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    return { detailed, subtotal, shipping, total, count };
  }

  function setStatus(el, message, type = '') {
    if (!el) return;
    el.textContent = message || '';
    el.className = `status-message${type ? ' ' + type : ''}`;
  }

  function setProductsStatus(message, type = '') {
    if (!els.productsStatus) return;
    els.productsStatus.textContent = message || '';
    els.productsStatus.className = `status-message${type ? ' ' + type : ''}`;
  }

  async function fetchProducts() {
    state.loading = true;
    state.error = null;
    setProductsStatus('Loading products…');
    els.productsGrid.innerHTML = '<div class="loading-state">Loading our collection…</div>';

    try {
      const res = await fetch('/api/products', { headers: { Accept: 'application/json' } });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || 'Failed to load products.');
      }
      state.products = Array.isArray(data.products) ? data.products : [];
      populateCategoryFilter();
      applyFilters();
      if (state.products.length === 0) {
        setProductsStatus('No products are available at the moment.', 'error');
      } else {
        setProductsStatus('');
      }
    } catch (error) {
      state.error = error.message || 'Unable to load products.';
      state.products = [];
      els.productsGrid.innerHTML = `<div class="empty-state"><p><strong>We couldn't load the catalogue.</strong></p><p>${escapeHtml(state.error)}</p><button class="btn btn-secondary" id="retryProductsBtn">Try again</button></div>`;
      setProductsStatus(state.error, 'error');
      const retry = document.getElementById('retryProductsBtn');
      if (retry) retry.addEventListener('click', fetchProducts);
    } finally {
      state.loading = false;
      renderCart();
      renderCheckoutSummary();
      renderProducts(); // ensure buttons reflect cart state if products loaded later
    }
  }

  function populateCategoryFilter() {
    const current = els.categoryFilter.value || 'all';
    const categories = Array.from(new Set(state.products.map((p) => p.category).filter(Boolean))).sort((a, b) => a.localeCompare(b));
    els.categoryFilter.innerHTML = '<option value="all">All categories</option>' + categories.map((c) => `<option value="${escapeAttr(c)}">${escapeHtml(c)}</option>`).join('');
    if (categories.includes(current) || current === 'all') {
      els.categoryFilter.value = current;
    }
  }

  function applyFilters() {
    const query = (els.searchInput.value || '').trim().toLowerCase();
    const category = els.categoryFilter.value || 'all';

    state.filteredProducts = state.products.filter((product) => {
      const matchesCategory = category === 'all' || product.category === category;
      const haystack = `${product.name || ''} ${product.description || ''} ${product.category || ''}`.toLowerCase();
      const matchesQuery = !query || haystack.includes(query);
      return matchesCategory && matchesQuery;
    });

    renderProducts();
  }

  function renderProducts() {
    if (state.loading) return;
    if (!state.products.length && state.error) return;

    if (!state.filteredProducts.length) {
      els.productsGrid.innerHTML = '<div class="empty-state"><p><strong>No products match your search.</strong></p><p>Try adjusting your search terms or category filter.</p></div>';
      return;
    }

    els.productsGrid.innerHTML = state.filteredProducts.map((product) => {
      const stock = Number(product.stock);
      const inCartQty = state.cart.find((i) => i.productId === Number(product.id))?.quantity || 0;
      const remaining = stock - inCartQty;
      const outOfStock = stock <= 0;
      const maxed = !outOfStock && remaining <= 0;
      const lowStock = stock > 0 && stock <= 5;
      let stockLabel = `${stock} in stock`;
      let stockClass = '';
      if (outOfStock) { stockLabel = 'Out of stock'; stockClass = 'out'; }
      else if (maxed) { stockLabel = 'All available stock in cart'; stockClass = 'low'; }
      else if (lowStock) { stockLabel = `Only ${stock} left`; stockClass = 'low'; }

      const btnDisabled = outOfStock || maxed ? 'disabled' : '';
      const btnLabel = outOfStock ? 'Unavailable' : (maxed ? 'Max in cart' : 'Add to cart');

      return `
        <article class="product-card" data-product-id="${product.id}">
          <div class="product-media">
            <img src="${escapeAttr(product.image_url)}" alt="${escapeAttr(product.name)}" loading="lazy" />
            ${product.badge ? `<span class="badge">${escapeHtml(product.badge)}</span>` : ''}
          </div>
          <div class="product-body">
            <div class="product-meta">
              <p class="product-category">${escapeHtml(product.category || '')}</p>
              <p class="product-price">${formatCurrency(product.price)}</p>
            </div>
            <h3 class="product-title">${escapeHtml(product.name)}</h3>
            <p class="product-desc">${escapeHtml(product.description || '')}</p>
            <div class="product-footer">
              <p class="stock-note ${stockClass}">${escapeHtml(stockLabel)}</p>
              <button class="btn btn-primary add-btn" data-action="add-to-cart" data-id="${product.id}" ${btnDisabled}>${btnLabel}</button>
            </div>
          </div>
        </article>`;
    }).join('');
  }

  function addToCart(productId) {
    const product = getProductById(productId);
    if (!product) return;
    const stock = Number(product.stock);
    if (stock <= 0) return;

    const existing = state.cart.find((item) => item.productId === Number(productId));
    if (existing) {
      if (existing.quantity >= stock) return;
      existing.quantity += 1;
    } else {
      state.cart.push({ productId: Number(productId), quantity: 1 });
    }
    saveCart();
    renderCart();
    renderCheckoutSummary();
    renderProducts();
    openCart();
  }

  function updateQuantity(productId, delta) {
    const item = state.cart.find((i) => i.productId === Number(productId));
    const product = getProductById(productId);
    if (!item) return;
    const stock = product ? Number(product.stock) : Infinity;
    const next = item.quantity + delta;
    if (next <= 0) {
      removeFromCart(productId);
      return;
    }
    item.quantity = Math.min(next, stock);
    saveCart();
    renderCart();
    renderCheckoutSummary();
    renderProducts();
  }

  function removeFromCart(productId) {
    state.cart = state.cart.filter((item) => item.productId !== Number(productId));
    saveCart();
    renderCart();
    renderCheckoutSummary();
    renderProducts();
  }

  function renderCart() {
    const { detailed, subtotal, shipping, total, count } = getCartTotals();
    els.cartCount.textContent = String(count);
    els.cartSubtotal.textContent = formatCurrency(subtotal);
    els.cartShipping.textContent = shipping === 0 ? 'Free' : formatCurrency(shipping);
    els.cartTotal.textContent = formatCurrency(total);
    els.cartShippingNote.textContent = subtotal >= 100
      ? 'You qualify for free shipping.'
      : `Add ${formatCurrency(roundCurrency(100 - subtotal))} more for free shipping. Otherwise $7.50 shipping applies.`;

    if (!detailed.length) {
      els.cartItems.innerHTML = '<div class="cart-empty"><p>Your cart is empty.</p><p>Explore the collection to add objects you love.</p></div>';
      return;
    }

    // Warn if any item exceeds current stock (e.g. stock changed since last load)
    els.cartItems.innerHTML = detailed.map((item) => {
      const overStock = item.quantity > item.stock;
      const qtyNote = overStock ? `<p class="item-meta" style="color: var(--danger);">Only ${item.stock} available now</p>` : '';
      return `
        <div class="cart-item" data-id="${item.productId}">
          <img src="${escapeAttr(item.imageUrl || '')}" alt="${escapeAttr(item.name)}" loading="lazy" />
          <div class="cart-item-details">
            <p class="item-title">${escapeHtml(item.name)}</p>
            <p class="item-meta">${formatCurrency(item.unitPrice)} each</p>
            ${qtyNote}
            <div class="qty-controls" aria-label="Quantity controls for ${escapeAttr(item.name)}">
              <button class="qty-btn" data-action="decrease" data-id="${item.productId}" aria-label="Decrease quantity">−</button>
              <span class="qty-value" aria-live="polite">${item.quantity}</span>
              <button class="qty-btn" data-action="increase" data-id="${item.productId}" aria-label="Increase quantity" ${item.quantity >= item.stock ? 'disabled' : ''}>+</button>
            </div>
          </div>
          <div class="cart-item-actions">
            <span class="item-price">${formatCurrency(item.lineTotal)}</span>
            <button class="remove-btn" data-action="remove" data-id="${item.productId}">Remove</button>
          </div>
        </div>`;
    }).join('');
  }

  function renderCheckoutSummary() {
    const { detailed, subtotal, shipping, total } = getCartTotals();
    els.checkoutSubtotal.textContent = formatCurrency(subtotal);
    els.checkoutShipping.textContent = shipping === 0 ? 'Free' : formatCurrency(shipping);
    els.checkoutTotal.textContent = formatCurrency(total);
    els.shippingNote.textContent = subtotal >= 100
      ? 'Free shipping applied (subtotal $100 or above).'
      : 'Free shipping above $100. $7.50 shipping below $100.';

    if (!detailed.length) {
      els.checkoutItems.innerHTML = '<p class="item-meta">Your cart is empty. Add products before placing an order.</p>';
      return;
    }

    els.checkoutItems.innerHTML = detailed.map((item) => `
      <div class="checkout-item">
        <img src="${escapeAttr(item.imageUrl || '')}" alt="${escapeAttr(item.name)}" loading="lazy" />
        <div>
          <p class="item-title">${escapeHtml(item.name)}</p>
          <p class="item-meta">Qty ${item.quantity} × ${formatCurrency(item.unitPrice)}</p>
        </div>
        <div class="item-price">${formatCurrency(item.lineTotal)}</div>
      </div>
    `).join('');
  }

  function openCart() {
    els.cartDrawer.classList.add('open');
    els.cartOverlay.classList.add('open');
    els.cartDrawer.setAttribute('aria-hidden', 'false');
    els.cartOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    els.cartDrawer.classList.remove('open');
    els.cartOverlay.classList.remove('open');
    els.cartDrawer.setAttribute('aria-hidden', 'true');
    els.cartOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function escapeHtml(str) {
    return String(str ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function escapeAttr(str) {
    return escapeHtml(str);
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || '').trim());
  }

  function validateCheckoutForm() {
    const customerName = els.checkoutForm.customerName.value.trim();
    const email = els.checkoutForm.email.value.trim();
    const address = els.checkoutForm.address.value.trim();
    const city = els.checkoutForm.city.value.trim();
    const postalCode = els.checkoutForm.postalCode.value.trim();
    const errors = [];

    if (customerName.length < 2) errors.push('Please enter your full name (at least 2 characters).');
    if (!validateEmail(email)) errors.push('Please enter a valid email address.');
    if (address.length < 5) errors.push('Please enter a valid address (at least 5 characters).');
    if (!city) errors.push('Please enter your city.');
    if (postalCode.length < 3) errors.push('Please enter a valid postal code.');

    const { detailed } = getCartTotals();
    if (!detailed.length) errors.push('Your cart is empty. Add products before placing an order.');
    for (const item of detailed) {
      if (item.quantity > item.stock) {
        errors.push(`${item.name} exceeds available stock (${item.stock} available). Please update your cart.`);
      }
    }

    return {
      ok: errors.length === 0,
      errors,
      data: { customerName, email, address, city, postalCode },
    };
  }

  async function handleCheckoutSubmit(event) {
    event.preventDefault();
    els.orderConfirmation.classList.add('hidden');
    els.orderConfirmation.innerHTML = '';

    const validation = validateCheckoutForm();
    if (!validation.ok) {
      setStatus(els.checkoutStatus, validation.errors[0], 'error');
      return;
    }

    const payload = {
      ...validation.data,
      // Send only ids and quantities; server calculates actual prices
      items: state.cart.map((item) => ({ productId: item.productId, quantity: item.quantity })),
    };

    els.placeOrderBtn.disabled = true;
    els.placeOrderBtn.textContent = 'Placing order…';
    setStatus(els.checkoutStatus, 'Verifying availability and placing your order…');

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const details = Array.isArray(data.details) && data.details.length ? ` ${data.details[0]}` : '';
        throw new Error((data.error || 'Unable to place order.') + details);
      }

      // Success: clear cart, reset form UI as appropriate, show confirmation, refresh products for updated stock
      state.cart = [];
      saveCart();
      renderCart();
      renderCheckoutSummary();
      els.checkoutForm.reset();
      setStatus(els.checkoutStatus, 'Order placed successfully.', 'success');
      showOrderConfirmation(data.order);
      await refreshProductsSilently();
      window.location.hash = '#checkout';
    } catch (error) {
      setStatus(els.checkoutStatus, error.message || 'Unable to place order. Please try again.', 'error');
    } finally {
      els.placeOrderBtn.disabled = false;
      els.placeOrderBtn.textContent = 'Place order';
    }
  }

  async function refreshProductsSilently() {
    try {
      const res = await fetch('/api/products', { headers: { Accept: 'application/json' } });
      const data = await res.json().catch(() => ({}));
      if (res.ok && Array.isArray(data.products)) {
        state.products = data.products;
        populateCategoryFilter();
        applyFilters();
      }
    } catch {
      // Non-critical; keep existing state
    }
  }

  function showOrderConfirmation(order) {
    if (!order) return;
    const created = order.createdAt ? new Date(order.createdAt).toLocaleString() : 'Just now';
    const items = Array.isArray(order.items) ? order.items : [];
    els.orderConfirmation.innerHTML = `
      <p class="eyebrow">Order confirmed</p>
      <h3>Thank you for your order, ${escapeHtml(order.customerName || 'customer')}.</h3>
      <p class="order-id">Order #${escapeHtml(String(order.id))}</p>
      <p>We’ve received your order and verified pricing and availability on our server.</p>
      <ul class="confirmation-list">
        <li><strong>Status:</strong> ${escapeHtml(order.status || 'confirmed')}</li>
        <li><strong>Email:</strong> ${escapeHtml(order.email || '')}</li>
        <li><strong>Delivery:</strong> ${escapeHtml(order.address || '')}, ${escapeHtml(order.city || '')} ${escapeHtml(order.postalCode || '')}</li>
        <li><strong>Items:</strong> ${items.reduce((sum, i) => sum + Number(i.quantity || 0), 0)}</li>
        <li><strong>Subtotal:</strong> ${formatCurrency(order.subtotal)}</li>
        <li><strong>Shipping:</strong> ${Number(order.shipping) === 0 ? 'Free' : formatCurrency(order.shipping)}</li>
        <li><strong>Total charged:</strong> ${formatCurrency(order.total)}</li>
        <li><strong>Placed:</strong> ${escapeHtml(created)}</li>
      </ul>
    `;
    els.orderConfirmation.classList.remove('hidden');
  }

  function handleNewsletterSubmit(event) {
    event.preventDefault();
    const email = (els.newsletterEmail.value || '').trim();
    if (!validateEmail(email)) {
      setStatus(els.newsletterStatus, 'Please enter a valid email address to subscribe.', 'error');
      return;
    }
    setStatus(els.newsletterStatus, 'Thanks for subscribing. You’ll receive occasional notes from FORMA.', 'success');
    els.newsletterForm.reset();
  }

  function bindEvents() {
    els.searchInput.addEventListener('input', applyFilters);
    els.categoryFilter.addEventListener('change', applyFilters);

    els.productsGrid.addEventListener('click', (event) => {
      const btn = event.target.closest('[data-action="add-to-cart"]');
      if (!btn || btn.disabled) return;
      addToCart(Number(btn.dataset.id));
    });

    els.openCartBtn.addEventListener('click', openCart);
    els.closeCartBtn.addEventListener('click', closeCart);
    els.cartOverlay.addEventListener('click', closeCart);
    els.goToCheckoutBtn.addEventListener('click', () => closeCart());

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && els.cartDrawer.classList.contains('open')) {
        closeCart();
      }
    });

    els.cartItems.addEventListener('click', (event) => {
      const btn = event.target.closest('button[data-action]');
      if (!btn) return;
      const id = Number(btn.dataset.id);
      const action = btn.dataset.action;
      if (action === 'increase') updateQuantity(id, 1);
      if (action === 'decrease') updateQuantity(id, -1);
      if (action === 'remove') removeFromCart(id);
    });

    els.checkoutForm.addEventListener('submit', handleCheckoutSubmit);
    els.newsletterForm.addEventListener('submit', handleNewsletterSubmit);

    els.navToggle.addEventListener('click', () => {
      const open = els.navLinks.classList.toggle('open');
      els.navToggle.setAttribute('aria-expanded', String(open));
      els.navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    els.navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        els.navLinks.classList.remove('open');
        els.navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  function init() {
    if (els.year) els.year.textContent = String(new Date().getFullYear());
    bindEvents();
    renderCart();
    renderCheckoutSummary();
    fetchProducts();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
