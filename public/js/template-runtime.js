(() => {
  const CART_KEY = 'forma_cart_v1';
  const ORDERS_KEY = 'forma_orders_v1';
  const WISHLIST_KEY = 'forma_wishlist_v1';

  const PRODUCTS = [
    {
      id: 1,
      name: 'Double-Faced Cashmere Wrap Coat',
      shortName: 'Cashmere Wrap Coat',
      category: 'Atelier Line',
      breadcrumb: 'Tailoring',
      price: 78000,
      image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAocnrYg9nnd0lMcekteOASd06EVZgxbe8bp4KVwLb7Qa1Lwc-k4eEPQEZWBHWQlM-2R12kiHDxkI6heF_H4hzQZrybNWhawCmbomC5L8PwXjyfEHSXlANQQj8NwOKnLKrPYgtM-3kM09vaxu5374F3kH4Jh1ZuuEx-3VpUrQbC_uBBrI-kQRdZR7s0HPmh2BTQu90oGjyGeMc_x0Jo3lqs0qHfn143eIO1kZ4l4Y2r=s1600',
      detail_image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJg1zNp6iSUjZNC5IuoxcrJblzgwL9_mJIGV-TsuXq4edWdF1_NUn_RpZcCeX5DJGPDKw8NcfegoYUtbk1TzTvLeS1UvRg3XACDV7lPersmL_jzrpPTbubaLMf_5GWhFx7BaMiwaHKtcPOWmQ0tKzaj6tPuAidN1wSun-cDd5w4q58NRwXNLt_fX0FNZBfDoGcvZEvMiSLBlZyx_lkzlHji00AHQ44_wwgwlcVDic6=s1600',
      badge: 'New Season',
      stock: 8,
      description: 'An icon of quiet luxury, engineered for the modern silhouette. Cut from a proprietary blend of two layers of pure virgin cashmere, hand-finished to achieve a fluid drape and unparalleled softness. The unlined construction ensures a weightless feel without compromising warmth.',
      color: 'Oatmeal Melange',
      sizes: ['IT 36','IT 38','IT 40','IT 42','IT 44'],
      defaultSize: 'IT 38',
      unavailable: ['IT 44']
    },
    {
      id: 2,
      name: 'Draped Silk Blouse',
      shortName: 'Draped Silk Blouse',
      category: 'Atelier Line',
      breadcrumb: 'Atelier Line',
      price: 29800,
      image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXsEF8viRgxl-8Lres3osl5q0iD7Lfa0FCjNth2he3X3fFV_Xivyb4jJ8xS4aIHjn0DDTIzB-YVBKG1I6PxiQxSnU0s7zpVBVr54-0oQdzqSTSawNEWfFAc-DlMAVh41L-cY81xWReGJMhjzM7I4SwNSWoORjQBpYZ3-uEFZJoOPFnXlzrb23OaZXhYerOSkfmOgUFKOd459cel_3LALla0ozqcl1razuc228Zj3QT=s1600',
      detail_image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXsEF8viRgxl-8Lres3osl5q0iD7Lfa0FCjNth2he3X3fFV_Xivyb4jJ8xS4aIHjn0DDTIzB-YVBKG1I6PxiQxSnU0s7zpVBVr54-0oQdzqSTSawNEWfFAc-DlMAVh41L-cY81xWReGJMhjzM7I4SwNSWoORjQBpYZ3-uEFZJoOPFnXlzrb23OaZXhYerOSkfmOgUFKOd459cel_3LALla0ozqcl1razuc228Zj3QT=s1600',
      badge: null,
      stock: 12,
      description: 'A fluid silk blouse with sculptural draping and a luminous finish. Designed to move effortlessly from day to evening with refined simplicity and an elegant, relaxed silhouette.',
      color: 'Ivory Silk',
      sizes: ['IT 36','IT 38','IT 40','IT 42','IT 44'],
      defaultSize: 'IT 38',
      unavailable: []
    },
    {
      id: 3,
      name: 'High-Waist Tailored Trousers',
      shortName: 'Tailored Trousers',
      category: 'Sartorial',
      breadcrumb: 'Sartorial',
      price: 36000,
      image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBi9BRVQYILL90TK_Fhmc9EYHwv9ZMX_n2HBuduKHtnLGFdwgSQ_1z6BCIgnfE2GvIVPXTqgt7THEkAkBcXWexkRh2ppbNOTgzPK50jdLnyVyiInHVhdlLI7PsFdY3PuHz41ZDJE5mV3_9GHGA_IQpyQ1hs2Bi9OQgqvYlcjiOODhoCrruVToz8Jd5vICD0VDOIOsxI8zOespMhK6RzdmwVDBMju3xrx-PUHKvkM4Oi=s1600',
      detail_image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBi9BRVQYILL90TK_Fhmc9EYHwv9ZMX_n2HBuduKHtnLGFdwgSQ_1z6BCIgnfE2GvIVPXTqgt7THEkAkBcXWexkRh2ppbNOTgzPK50jdLnyVyiInHVhdlLI7PsFdY3PuHz41ZDJE5mV3_9GHGA_IQpyQ1hs2Bi9OQgqvYlcjiOODhoCrruVToz8Jd5vICD0VDOIOsxI8zOespMhK6RzdmwVDBMju3xrx-PUHKvkM4Oi=s1600',
      badge: null,
      stock: 10,
      description: 'Precisely tailored high-waist trousers with sharp pleats and a clean, elongated line. Crafted in fine wool for structure, comfort, and enduring wardrobe versatility.',
      color: 'Espresso Brown',
      sizes: ['IT 36','IT 38','IT 40','IT 42','IT 44'],
      defaultSize: 'IT 38',
      unavailable: []
    },
    {
      id: 4,
      name: 'Structured Leather Tote',
      shortName: 'Leather Tote',
      category: 'Leathergoods',
      breadcrumb: 'Leathergoods',
      price: 64000,
      image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA7kofpv3SUEdjZgJGKNy9zMDzHIT0E1IhX8Lcz-v4_y50ifg3A9sH5tCQ1lbqhTuMIZDDbz8HKzgAnKOfpeIBSCRSexf1_RhO7E1r6Q-yipDyJXfjK0T3P-GX2x86yiHa6DEq-NkYwGU40kWbBRaA-LlG3hnTocwPKjNREB5hfeOBzb1u-5p4O2lwJx2y0gQv9RcGVCJCFhPNbRdw8uwQI4pk_bDJ_KvgXMDeSZp8I=s1600',
      detail_image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA7kofpv3SUEdjZgJGKNy9zMDzHIT0E1IhX8Lcz-v4_y50ifg3A9sH5tCQ1lbqhTuMIZDDbz8HKzgAnKOfpeIBSCRSexf1_RhO7E1r6Q-yipDyJXfjK0T3P-GX2x86yiHa6DEq-NkYwGU40kWbBRaA-LlG3hnTocwPKjNREB5hfeOBzb1u-5p4O2lwJx2y0gQv9RcGVCJCFhPNbRdw8uwQI4pk_bDJ_KvgXMDeSZp8I=s1600',
      badge: 'Exclusive',
      stock: 6,
      description: 'A structured leather tote defined by clean geometry and meticulous craftsmanship. Designed for everyday elegance with a spacious interior and refined hardware details.',
      color: 'Terracotta Leather',
      sizes: ['One Size'],
      defaultSize: 'One Size',
      unavailable: []
    },
    {
      id: 5,
      name: 'Merino Ribbed Turtleneck',
      shortName: 'Merino Turtleneck',
      category: 'Knitwear',
      breadcrumb: 'Knitwear',
      price: 24500,
      image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrf_NHB--sotonIdbhO6CSqWE9LGMe6AAuSqFQLRxG8qGooOTtp4lCEJ3pOD7UhnUswiknaeGSqFcW9aKA3BcRwFZ4yduXLCykGsT5LeHoPIKnJdGwPXHxxL4_uloei0p7IfWFxC5sfoCqkdAbH0Uad-IhkUsA_05kYThGOhfSDRQ3FJphvPnCRGv7Egd83b_bxy3mnwdtdaMTU8hofkDeJnrMMgL7MOO7XUt00Knn=s1600',
      detail_image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrf_NHB--sotonIdbhO6CSqWE9LGMe6AAuSqFQLRxG8qGooOTtp4lCEJ3pOD7UhnUswiknaeGSqFcW9aKA3BcRwFZ4yduXLCykGsT5LeHoPIKnJdGwPXHxxL4_uloei0p7IfWFxC5sfoCqkdAbH0Uad-IhkUsA_05kYThGOhfSDRQ3FJphvPnCRGv7Egd83b_bxy3mnwdtdaMTU8hofkDeJnrMMgL7MOO7XUt00Knn=s1600',
      badge: null,
      stock: 15,
      description: 'An ultra-fine merino ribbed turtleneck with a soft, close-to-body fit. A foundational layer offering warmth, texture, and understated sophistication.',
      color: 'Slate Grey',
      sizes: ['XS','S','M','L','XL'],
      defaultSize: 'M',
      unavailable: []
    },
    {
      id: 6,
      name: 'Brushed Mohair Cardigan',
      shortName: 'Mohair Cardigan',
      category: 'Knitwear',
      breadcrumb: 'Knitwear',
      price: 46000,
      image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-dEnZCD5FLBq_CfnzpSW3Pv9pjHrdZrkZUafk9J4xPYE4_iNv0iA2-KZYesRdItt-DHcqqDDWloqV4ZzEyIIQoMTGP5LFMr9z8V8bRXWRUEIUjPbAqU79wENX_3JDPvHBCoTKCX8P8kqVwjK9Z3VrpDufz_QTzKxcsGGyoAcXWfoLKADHKJOaCjUBPirT1MGe9Zv7cdV7XjEukbZxVYYAPjDF9Ur1rTOmPMpIgAsX=s1600',
      detail_image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-dEnZCD5FLBq_CfnzpSW3Pv9pjHrdZrkZUafk9J4xPYE4_iNv0iA2-KZYesRdItt-DHcqqDDWloqV4ZzEyIIQoMTGP5LFMr9z8V8bRXWRUEIUjPbAqU79wENX_3JDPvHBCoTKCX8P8kqVwjK9Z3VrpDufz_QTzKxcsGGyoAcXWfoLKADHKJOaCjUBPirT1MGe9Zv7cdV7XjEukbZxVYYAPjDF9Ur1rTOmPMpIgAsX=s1600',
      badge: 'Low Stock',
      stock: 2,
      description: 'A brushed mohair cardigan with a plush handfeel and relaxed drape. Designed for layered comfort, it brings warmth and softness to refined everyday dressing.',
      color: 'Ginger Terracotta',
      sizes: ['XS','S','M','L','XL'],
      defaultSize: 'M',
      unavailable: ['XL']
    }
  ];
  const byId = new Map(PRODUCTS.map(p => [p.id, p]));

  const fmtINR = (n) => {
    const num = Number(n || 0);
    try { return '₹' + num.toLocaleString('en-IN'); } catch { return '₹' + Math.round(num); }
  };
  const safeJSON = (k, f) => { try { const v = JSON.parse(localStorage.getItem(k) || ''); return v ?? f; } catch { return f; } };
  const saveJSON = (k, v) => localStorage.setItem(k, JSON.stringify(v));
  const getCart = () => safeJSON(CART_KEY, []).filter(i => i && Number.isInteger(Number(i.productId)) && Number(i.quantity) > 0).map(i => ({ productId: Number(i.productId), quantity: Number(i.quantity), size: i.size || null, color: i.color || null }));
  const setCart = (items) => { saveJSON(CART_KEY, items); updateBadges(); };
  const getOrders = () => safeJSON(ORDERS_KEY, []);
  const saveOrder = (order) => { const all = getOrders(); all.unshift(order); saveJSON(ORDERS_KEY, all.slice(0, 20)); };
  const getWishlist = () => new Set(safeJSON(WISHLIST_KEY, []).map(Number));
  const setWishlist = (s) => saveJSON(WISHLIST_KEY, [...s]);
  const escapeHtml = (str) => String(str ?? '').replace(/[&<>"']/g, m => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[m]));
  const page = () => {
    const p = location.pathname.toLowerCase();
    if (p.endsWith('catalog.html')) return 'catalog';
    if (p.endsWith('product.html')) return 'product';
    if (p.endsWith('bag.html')) return 'bag';
    if (p.endsWith('profile.html')) return 'profile';
    return 'discover';
  };

  function toast(msg, kind='ok') {
    let el = document.getElementById('forma-toast');
    if (!el) {
      el = document.createElement('div');
      el.id = 'forma-toast';
      el.style.cssText = 'position:fixed;left:50%;bottom:92px;transform:translateX(-50%) translateY(8px);z-index:9999;max-width:calc(100vw - 32px);padding:10px 14px;border-radius:10px;background:rgba(28,27,23,.94);color:#fff;font:600 11px/1.4 "Plus Jakarta Sans",sans-serif;letter-spacing:.04em;opacity:0;pointer-events:none;transition:opacity .18s,transform .18s;box-shadow:0 8px 24px rgba(0,0,0,.18)';
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.style.background = kind === 'error' ? 'rgba(186,26,26,.96)' : 'rgba(28,27,23,.94)';
    requestAnimationFrame(() => { el.style.opacity = '1'; el.style.transform = 'translateX(-50%) translateY(0)'; });
    clearTimeout(el._t);
    el._t = setTimeout(() => { el.style.opacity = '0'; el.style.transform = 'translateX(-50%) translateY(8px)'; }, 1800);
  }

  function cartCount() { return getCart().reduce((s,i)=>s + Number(i.quantity||0), 0); }
  function cartSubtotal() { return getCart().reduce((s,i)=>{ const p=byId.get(Number(i.productId)); return s + (p ? p.price * Number(i.quantity||0) : 0); }, 0); }
  function selectedProduct() {
    const pid = Number(new URLSearchParams(location.search).get('id') || 1);
    return byId.get(pid) || byId.get(1);
  }

  function addToCart(productId, qty = 1, meta = {}) {
    const p = byId.get(Number(productId));
    if (!p) { toast('Product unavailable', 'error'); return false; }
    qty = Math.max(1, Number(qty || 1));
    const cart = getCart();
    const key = (i) => Number(i.productId) === p.id && (i.size || null) === (meta.size || null) && (i.color || null) === (meta.color || null);
    const existing = cart.find(key);
    const nextQty = (existing ? existing.quantity : 0) + qty;
    if (nextQty > Number(p.stock || 0)) { toast(`Only ${p.stock} available`, 'error'); return false; }
    if (existing) existing.quantity = nextQty; else cart.push({ productId: p.id, quantity: qty, size: meta.size || null, color: meta.color || null });
    setCart(cart);
    toast(`${p.name} added to bag`);
    if (page() === 'bag') renderBag();
    return true;
  }

  function updateCartLine(productId, qty, opts = {}) {
    let cart = getCart();
    const idx = typeof opts.index === 'number' ? opts.index : cart.findIndex(i => Number(i.productId) === Number(productId));
    if (idx < 0) return;
    qty = Number(qty);
    if (!Number.isFinite(qty) || qty <= 0) cart.splice(idx, 1);
    else {
      const p = byId.get(Number(cart[idx].productId));
      if (p && qty > Number(p.stock || 0)) { toast(`Only ${p.stock} available`, 'error'); qty = Number(p.stock); }
      cart[idx].quantity = qty;
    }
    setCart(cart);
    if (page() === 'bag') renderBag();
  }

  function removeCartLine(productId, opts = {}) {
    let cart = getCart();
    if (typeof opts.index === 'number') cart.splice(opts.index, 1);
    else cart = cart.filter(i => Number(i.productId) !== Number(productId));
    setCart(cart);
    toast('Item removed');
    if (page() === 'bag') renderBag();
  }

  function injectStyles() {
    if (document.getElementById('forma-runtime-style')) return;
    const style = document.createElement('style');
    style.id = 'forma-runtime-style';
    style.textContent = `
      /* Catalog image sizing (slightly smaller) */
      #catalog-container .catalog-card .aspect-\\[3\\/4\\],
      #catalog-container .catalog-card [class*="aspect-[3/4]"] { aspect-ratio: 4 / 5 !important; }
      #catalog-container .catalog-card img { object-position: center top; }
      #catalog-container.single-col .catalog-card { max-width: 88%; margin-left: auto; margin-right: auto; }

      /* Responsive dimensions: prevent overly wide layout on laptop/desktop while keeping mobile intact */
      body { background: #fdf9f2; }
      @media (min-width: 768px) {
        main { max-width: 920px; margin-left: auto !important; margin-right: auto !important; width: 100%; }
        header > div, nav > div { max-width: 920px; margin-left: auto; margin-right: auto; width: 100%; }
      }
      @media (min-width: 1200px) {
        main { max-width: 1120px; }
        header > div, nav > div { max-width: 1120px; }
      }

      /* Product/catalog image clarity */
      img { max-width: 100%; image-rendering: auto; -webkit-backface-visibility: hidden; backface-visibility: hidden; transform: translateZ(0); }
      #mainProductImage, .catalog-card img, main article img, main section img { filter: none !important; }
      .catalog-card img, #mainProductImage { image-rendering: -webkit-optimize-contrast; image-rendering: crisp-edges; image-rendering: auto; }
      /* Avoid blurry scaling on hover transforms in some browsers */
      .catalog-card .group:hover img, .group:hover img { will-change: transform; }
    `;
    document.head.appendChild(style);
  }

  function updateBadges() {
    const count = cartCount();
    ['header [data-template-action="cart"] span.absolute','nav a[href$="bag.html"] span.absolute','nav a[data-path="shopping-bag"] span.absolute','nav a[data-path="shopping-bag-and-summary"] span.absolute'].forEach(sel => document.querySelectorAll(sel).forEach(el => {
      el.textContent = String(count);
      el.style.display = count > 0 ? '' : 'none';
    }));
    Array.from(document.querySelectorAll('span,p,div')).forEach(el => {
      if (el.children.length === 0 && /Curated Pieces?/i.test((el.textContent||'').trim())) {
        el.textContent = `${count} Curated Piece${count === 1 ? '' : 's'}`;
      }
    });
  }

  function wireHeaderAndTabs() {
    document.querySelectorAll('[data-template-action="search"]').forEach(btn => btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (page() !== 'catalog') location.href = 'catalog.html';
      else { const f = document.getElementById('open-filter-btn'); if (f) f.click(); else toast('Browse the catalog'); }
    }));
    document.querySelectorAll('[data-template-action="wishlist"]').forEach(btn => btn.addEventListener('click', (e) => {
      e.preventDefault();
      toast('Saved items');
      if (page() !== 'catalog') location.href = 'catalog.html#saved';
    }));
    document.querySelectorAll('[data-template-action="cart"]').forEach(btn => btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (page() !== 'bag') location.href = 'bag.html';
    }));
    document.querySelectorAll('[data-template-action="profile"]').forEach(btn => btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (page() !== 'profile') location.href = 'profile.html';
    }));
    document.querySelectorAll('header img[alt="Profile"]').forEach(img => {
      img.style.cursor = 'pointer';
      img.addEventListener('click', () => { if (page() !== 'profile') location.href = 'profile.html'; });
    });
  }

  function wireDiscoverPage() {
    if (page() !== 'discover') return;
    const navMap = {
      'Explore Collection':'catalog.html','Our Story':'catalog.html','View All':'catalog.html','Shop Now':'catalog.html','Shop the Edit':'catalog.html','Shop Collection':'catalog.html','New Arrivals':'catalog.html','Tailoring':'catalog.html#Sartorial','Knitwear':'catalog.html#Knitwear','Outerwear':'catalog.html','Leather Goods':'catalog.html#Leathergoods','Accessories':'catalog.html','The Departments':'catalog.html'
    };
    Array.from(document.querySelectorAll('a,button')).forEach(el => {
      const t = (el.textContent || '').replace(/\s+/g,' ').trim();
      if (navMap[t]) {
        el.addEventListener('click', (e) => {
          const href = el.getAttribute && el.getAttribute('href');
          if (el.tagName === 'A' && href && href !== '#' && !href.startsWith('javascript:')) return;
          e.preventDefault();
          location.href = navMap[t];
        });
      }
      if (t === 'Details') { el.style.cursor = 'pointer'; el.addEventListener('click', (e)=>{ e.preventDefault(); toast('Complimentary insured courier delivery across India'); }); }
      if (t === 'Inspect Look') { el.style.cursor = 'pointer'; el.addEventListener('click', (e)=>{ e.preventDefault(); location.href='product.html?id=1'; }); }
      if (/add_shopping_cart|shopping_bag/i.test((el.querySelector('.material-symbols-outlined')||{}).textContent||'') && !el.closest('header') && !el.closest('nav')) {
        el.addEventListener('click', (e)=>{ e.preventDefault(); e.stopPropagation(); addToCart(1,1); });
      }
    });
    document.querySelectorAll('button[aria-label*="lookbook" i], button[aria-label*="Play" i]').forEach(b => b.addEventListener('click', (e)=>{ e.preventDefault(); toast('Lookbook preview'); }));
  }

  function wireCatalogPage() {
    if (page() !== 'catalog') return;
    document.querySelectorAll('.catalog-card').forEach(card => {
      const id = Number(card.getAttribute('data-id'));
      const product = byId.get(id);
      card.style.cursor = 'pointer';
      card.addEventListener('click', (e) => {
        if (e.target.closest('button,a,input,select,label')) return;
        if (id) location.href = `product.html?id=${id}`;
      });
      card.querySelectorAll('.quick-size-bar button').forEach(b => b.addEventListener('click', (e) => {
        e.preventDefault(); e.stopPropagation();
        const size = (b.textContent || '').trim();
        if (product) addToCart(product.id, 1, { size: size || null, color: product.color || null });
      }));
      card.querySelectorAll('button[aria-label*="Save"]').forEach(b => b.addEventListener('click', (e) => {
        e.preventDefault(); e.stopPropagation();
        if (!id) return;
        const w = getWishlist();
        if (w.has(id)) { w.delete(id); toast('Removed from saved'); } else { w.add(id); toast('Saved to wishlist'); }
        setWishlist(w);
        const icon = b.querySelector('.material-symbols-outlined');
        if (icon) icon.style.fontVariationSettings = w.has(id) ? "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" : "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24";
      }));
    });
    Array.from(document.querySelectorAll('button,a')).forEach(el => {
      const t = (el.textContent || '').replace(/\s+/g,' ').trim();
      if (t === 'Load Next 24 Pieces') el.addEventListener('click', (e)=>{ e.preventDefault(); toast('All available pieces are displayed'); });
      if (t === 'Inspect Look') el.addEventListener('click', (e)=>{ e.preventDefault(); location.href = 'product.html?id=1'; });
    });
  }

  function wireProductPage() {
    if (page() !== 'product') return;
    const product = selectedProduct();
    window.__activeProductId = product.id;
    window.__activeProduct = product;
    window.__selectedProductColor = product.color || 'Default';
    window.__selectedProductSize = product.defaultSize || (product.sizes && product.sizes[0]) || null;

    // Populate key details while preserving template layout
    const h1s = Array.from(document.querySelectorAll('main h1'));
    const title = h1s.find(h => h.className.includes('headline') || /Cashmere|Coat|Blouse|Trousers|Tote|Turtleneck|Cardigan/i.test(h.textContent||'')) || h1s[0];
    if (title) title.textContent = product.name;
    const mainImg = document.getElementById('mainProductImage');
    if (mainImg) mainImg.src = product.detail_image || product.image_url;

    // Breadcrumb/category labels and price
    Array.from(document.querySelectorAll('a,span,p,div,h2')).forEach(el => {
      if (el.children.length) return;
      const txt = (el.textContent || '').replace(/\s+/g,' ').trim();
      if (txt === 'Tailoring' || txt === 'Knitwear' || txt === 'Sartorial' || txt === 'Leathergoods' || txt === 'Atelier Line') el.textContent = product.breadcrumb || product.category;
      if (txt === 'Atelier Coat') el.textContent = product.shortName || product.name;
      if (txt === '₹78,000' || txt === 'â‚¹78,000') el.textContent = fmtINR(product.price);
    });
    document.querySelectorAll('#bagBtnPrice').forEach(el => el.textContent = `• ${fmtINR(product.price)}`);

    // Description (keep template block, replace main paragraph text)
    const desc = Array.from(document.querySelectorAll('main p')).find(p => /quiet luxury|fluid drape|virgin cashmere|engineered for the modern silhouette/i.test(p.textContent || ''));
    if (desc) desc.textContent = product.description;

    // Color label
    document.querySelectorAll('#activeColorName').forEach(el => el.textContent = product.color || 'Selected');

    // Size pills: update labels/default/unavailable but keep visual structure
    const sizePills = Array.from(document.querySelectorAll('.size-pill'));
    if (sizePills.length && Array.isArray(product.sizes) && product.sizes.length) {
      sizePills.forEach((pill, i) => {
        const size = product.sizes[i] || null;
        if (size) {
          const textNode = Array.from(pill.childNodes).find(n => n.nodeType === 3 && n.textContent.trim());
          if (textNode) textNode.textContent = size; else pill.textContent = size;
          pill.setAttribute('data-size', size);
          const unavailable = (product.unavailable || []).includes(size);
          if (unavailable) {
            pill.className = 'size-pill relative py-3 rounded-lg bg-surface-container-low text-on-surface-variant/50 font-title-sm text-title-sm text-center cursor-not-allowed';
            if (!pill.querySelector('.absolute')) {
              const line = document.createElement('span'); line.className = 'absolute inset-0 flex items-center justify-center pointer-events-none'; line.innerHTML = '<span class="block w-[80%] h-px bg-outline-variant/60 rotate-[-18deg]"></span>'; pill.appendChild(line);
            }
          } else if (size === (product.defaultSize || product.sizes[0])) {
            pill.className = 'size-pill py-3 rounded-lg bg-primary text-on-primary font-title-sm text-title-sm text-center font-semibold shadow-sm transition-all duration-150 active:scale-95';
            window.__selectedProductSize = size;
            pill.querySelectorAll('.absolute').forEach(x=>x.remove());
          } else {
            pill.className = 'size-pill py-3 rounded-lg bg-surface-container text-on-surface font-title-sm text-title-sm text-center transition-all duration-150 active:scale-95';
            pill.querySelectorAll('.absolute').forEach(x=>x.remove());
          }
        } else {
          pill.style.display = 'none';
        }
      });
    }

    // Override template handlers to be functional with selected product/cart
    const _adjustQty = window.adjustQty;
    window.adjustQty = function(delta) {
      if (typeof _adjustQty === 'function') _adjustQty(delta);
      const qty = Number((document.getElementById('qtyVal') || {}).textContent || 1) || 1;
      document.querySelectorAll('#bagBtnPrice').forEach(el => el.textContent = `• ${fmtINR(product.price * qty)}`);
    };
    const _selectColor = window.selectColor;
    window.selectColor = function(btn, colorName) {
      window.__selectedProductColor = colorName || window.__selectedProductColor;
      if (typeof _selectColor === 'function') _selectColor(btn, colorName);
    };
    const _selectSize = window.selectSize;
    window.selectSize = function(btn, size) {
      if (btn && /cursor-not-allowed/.test(btn.className)) { toast('Selected size is unavailable', 'error'); return; }
      window.__selectedProductSize = size || (btn && (btn.getAttribute('data-size') || btn.textContent.trim())) || window.__selectedProductSize;
      if (typeof _selectSize === 'function') _selectSize(btn, size);
    };

    window.handleAddToBag = function() {
      const qty = Number((document.getElementById('qtyVal') || {}).textContent || 1) || 1;
      const ok = addToCart(product.id, qty, { size: window.__selectedProductSize || null, color: window.__selectedProductColor || null });
      if (!ok) return;
      const btn = document.getElementById('addToBagBtn');
      const textSpan = document.getElementById('bagBtnText');
      const priceSpan = document.getElementById('bagBtnPrice');
      if (btn && textSpan) {
        const originalText = textSpan.innerHTML;
        const originalPrice = priceSpan ? priceSpan.textContent : '';
        const originalBg = btn.className;
        btn.classList.remove('bg-primary');
        btn.classList.add('bg-secondary');
        textSpan.innerHTML = '<span class="flex items-center gap-2"><span class="material-symbols-outlined text-[18px]">check</span><span>Added to Bag</span></span>';
        if (priceSpan) priceSpan.textContent = '';
        setTimeout(() => {
          btn.className = originalBg;
          textSpan.innerHTML = originalText;
          if (priceSpan) priceSpan.textContent = originalPrice || `• ${fmtINR(product.price * qty)}`;
        }, 1400);
      }
    };

    const _toggleWishlist = window.toggleWishlist;
    window.toggleWishlist = function() {
      const w = getWishlist();
      if (w.has(product.id)) { w.delete(product.id); toast('Removed from saved'); } else { w.add(product.id); toast('Saved to wishlist'); }
      setWishlist(w);
      if (typeof _toggleWishlist === 'function') try { _toggleWishlist(); } catch {}
      const icon = document.getElementById('wishlistIcon');
      const btn = document.getElementById('wishlistBtn');
      if (icon) {
        icon.style.fontVariationSettings = w.has(product.id) ? "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" : "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24";
        icon.classList.toggle('text-secondary', w.has(product.id));
      }
      if (btn) btn.classList.toggle('text-secondary', w.has(product.id));
    };

    // Ensure share/back/continue actions work
    Array.from(document.querySelectorAll('button,a')).forEach(el => {
      const label = (el.getAttribute('aria-label') || '').toLowerCase();
      const t = (el.textContent || '').replace(/\s+/g,' ').trim();
      if (label.includes('share')) el.addEventListener('click', (e)=>{ e.preventDefault(); if (navigator.share) { navigator.share({ title: product.name, url: location.href }).catch(()=>{}); } else { navigator.clipboard && navigator.clipboard.writeText(location.href).catch(()=>{}); toast('Product link copied'); } });
      if (label.includes('go back') && !el.getAttribute('onclick')) el.addEventListener('click', (e)=>{ e.preventDefault(); history.length > 1 ? history.back() : location.href='catalog.html'; });
      if (/Continue Shopping/i.test(t)) el.addEventListener('click', (e)=>{ e.preventDefault(); location.href='catalog.html'; });
    });

    // initialize price display with qty 1
    window.adjustQty(0);
    updateBadges();
  }

  function ensureCheckoutModal() {
    if (document.getElementById('template-checkout-modal')) return;
    const modal = document.createElement('div');
    modal.id = 'template-checkout-modal';
    modal.className = 'hidden fixed inset-0 z-[100]';
    modal.innerHTML = '<div class="absolute inset-0 bg-primary/50 backdrop-blur-sm" data-close-checkout="1"></div>' +
      '<div class="absolute inset-x-0 bottom-0 bg-surface rounded-t-2xl max-h-[88vh] overflow-y-auto p-margin pb-8 shadow-2xl">' +
        '<div class="flex items-center justify-between mb-4"><div><p class="font-label-sm text-label-sm uppercase tracking-widest text-secondary">Secure Checkout</p><h2 class="font-headline-sm text-headline-sm text-primary">Delivery Details</h2></div><button type="button" class="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center" data-close-checkout="1"><span class="material-symbols-outlined text-[18px]">close</span></button></div>' +
        '<form id="template-checkout-form" class="flex flex-col gap-3">' +
          '<input required name="fullName" placeholder="Full Name" class="h-12 px-3 rounded bg-surface-container-low border border-transparent focus:border-secondary/30 focus:outline-none font-body-sm text-body-sm" />' +
          '<input required type="email" name="email" placeholder="Email Address" class="h-12 px-3 rounded bg-surface-container-low border border-transparent focus:border-secondary/30 focus:outline-none font-body-sm text-body-sm" />' +
          '<input required name="address" placeholder="Address" class="h-12 px-3 rounded bg-surface-container-low border border-transparent focus:border-secondary/30 focus:outline-none font-body-sm text-body-sm" />' +
          '<div class="grid grid-cols-2 gap-3"><input required name="city" placeholder="City" class="h-12 px-3 rounded bg-surface-container-low border border-transparent focus:border-secondary/30 focus:outline-none font-body-sm text-body-sm" /><input required name="postalCode" placeholder="Postal Code" class="h-12 px-3 rounded bg-surface-container-low border border-transparent focus:border-secondary/30 focus:outline-none font-body-sm text-body-sm" /></div>' +
          '<div id="template-checkout-summary" class="p-3 rounded-lg bg-surface-container-low font-body-sm text-body-sm text-on-surface-variant"></div>' +
          '<div id="template-checkout-error" class="hidden text-error font-body-sm text-body-sm"></div>' +
          '<div id="template-checkout-success" class="hidden p-3 rounded-lg bg-secondary-fixed/40 text-on-secondary-container font-body-sm text-body-sm"><span class="font-semibold">Order confirmed.</span> <span id="template-checkout-success-text"></span></div>' +
          '<button type="submit" id="template-checkout-submit" class="w-full h-14 bg-primary text-on-primary rounded font-label-md text-label-md uppercase tracking-widest font-semibold mt-1">Place Order</button>' +
        '</form>' +
      '</div>';
    document.body.appendChild(modal);
    modal.addEventListener('click', (e) => { if (e.target.closest('[data-close-checkout]')) modal.classList.add('hidden'); });
    modal.querySelector('#template-checkout-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const form = e.currentTarget;
      const err = form.querySelector('#template-checkout-error');
      const ok = form.querySelector('#template-checkout-success');
      const submit = form.querySelector('#template-checkout-submit');
      err.classList.add('hidden'); err.textContent = ''; ok.classList.add('hidden');
      const details = { fullName: form.fullName.value.trim(), email: form.email.value.trim(), address: form.address.value.trim(), city: form.city.value.trim(), postalCode: form.postalCode.value.trim() };
      submit.disabled = true; submit.textContent = 'Placing Order...';
      try {
        const cart = getCart();
        if (!cart.length) throw new Error('Your bag is empty.');
        const payload = { customerName: details.fullName, email: details.email, address: details.address, city: details.city, postalCode: details.postalCode, items: cart.map(i => ({ productId: Number(i.productId), quantity: Number(i.quantity) })) };
        const res = await fetch('/api/orders', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || 'Unable to place order.');
        saveOrder({ id: data.order?.id, created_at: data.order?.createdAt || data.order?.created_at || new Date().toISOString(), status: data.order?.status || 'confirmed', items: data.order?.items || cart.map(i => { const p = byId.get(Number(i.productId)) || {}; return { productId:i.productId, quantity:i.quantity, name:p.name, unitPrice:p.price }; }), total: data.order?.total, subtotal: data.order?.subtotal, shipping: data.order?.shipping });
        setCart([]);
        ok.classList.remove('hidden');
        form.querySelector('#template-checkout-success-text').textContent = `Order ${data.order?.id ? '#' + data.order.id : ''} placed successfully. Total ${fmtINR(data.order?.total ?? 0)}.`;
        toast('Order placed successfully');
        renderBag();
        setTimeout(() => { modal.classList.add('hidden'); location.href = 'profile.html'; }, 1200);
      } catch (ex) {
        err.textContent = ex.message || 'Unable to place order.';
        err.classList.remove('hidden');
        toast(ex.message || 'Checkout failed', 'error');
      } finally {
        submit.disabled = false; submit.textContent = 'Place Order';
      }
    });
  }

  function renderBag() {
    if (page() !== 'bag') return;
    const cart = getCart().map((item, index) => ({ ...item, index, product: byId.get(Number(item.productId)) })).filter(i => i.product);
    const subtotal = cart.reduce((s,i)=>s + i.product.price * i.quantity, 0);
    const shipping = cart.length ? (subtotal >= 100 ? 0 : 7.5) : 0;
    const total = subtotal + shipping;

    const itemArticles = Array.from(document.querySelectorAll('main article')).filter(a => a.querySelector('img') && (/Remove item|Decrease quantity|Increase quantity|Size:/i.test(a.innerHTML || '') || /₹|â‚¹/.test(a.textContent||'')));
    if (itemArticles.length) {
      const list = itemArticles[0].parentElement;
      if (list) {
        itemArticles.forEach(a => a.remove());
        let holder = list.querySelector('[data-cart-list]');
        if (!holder) { holder = document.createElement('div'); holder.setAttribute('data-cart-list','1'); holder.className = 'flex flex-col gap-space-md'; list.insertBefore(holder, list.firstChild); }
        if (!cart.length) {
          holder.innerHTML = '<div class="p-space-md bg-surface-container-low rounded-xl text-center shadow-sm"><h2 class="font-headline-sm text-headline-sm text-primary">Your bag is empty</h2><p class="font-body-sm text-body-sm text-on-surface-variant mt-2">Add curated pieces from the collection to begin your order.</p><a href="catalog.html" class="inline-flex mt-4 h-11 px-5 items-center justify-center rounded bg-primary text-on-primary font-label-md text-label-md uppercase tracking-widest">Continue Shopping</a></div>';
        } else {
          holder.innerHTML = cart.map(({product, quantity, index, size, color}) => (
            '<article class="p-space-md bg-surface-container-low rounded-xl flex gap-space-md shadow-sm transition-all duration-200" data-cart-index="' + index + '">' +
              '<div class="w-24 h-32 flex-shrink-0 bg-surface-container overflow-hidden rounded relative">' +
                '<img class="w-full h-full object-cover object-top" alt="' + escapeHtml(product.name) + '" src="' + escapeHtml(product.image_url) + '">' +
                (product.badge ? '<span class="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded-full bg-surface-container-highest/90 text-on-surface font-label-sm text-[8px] uppercase tracking-wider">' + escapeHtml(product.badge) + '</span>' : '') +
              '</div>' +
              '<div class="flex-1 min-w-0 flex flex-col justify-between"><div>' +
                '<div class="flex items-start justify-between gap-2"><div><p class="font-label-sm text-label-sm uppercase tracking-widest text-secondary mb-0.5">' + escapeHtml(product.category) + '</p><h2 class="font-headline-sm text-headline-sm text-primary leading-tight">' + escapeHtml(product.name) + '</h2></div><button aria-label="Remove item" class="text-on-surface-variant hover:text-secondary p-0.5 transition-colors" data-remove-index="' + index + '"><span class="material-symbols-outlined text-[18px]">close</span></button></div>' +
                '<p class="font-body-sm text-body-sm text-on-surface-variant mt-1">' + (size ? 'Size: ' + escapeHtml(size) : 'Selected piece') + (color ? ' | ' + escapeHtml(color) : '') + '</p>' +
                '<p class="font-body-sm text-body-sm text-on-surface-variant">In stock: ' + escapeHtml(product.stock) + '</p>' +
              '</div><div class="flex items-end justify-between mt-3">' +
                '<div class="flex items-center gap-3 bg-surface-container rounded px-2 py-1.5"><button aria-label="Decrease quantity" class="w-6 h-6 flex items-center justify-center text-on-surface hover:text-secondary active:scale-95 transition-transform" data-dec-index="' + index + '"><span class="material-symbols-outlined text-[14px]">remove</span></button><span class="font-label-md text-label-md text-primary w-4 text-center">' + quantity + '</span><button aria-label="Increase quantity" class="w-6 h-6 flex items-center justify-center text-on-surface hover:text-secondary active:scale-95 transition-transform" data-inc-index="' + index + '"><span class="material-symbols-outlined text-[14px]">add</span></button></div>' +
                '<div class="flex flex-col items-end gap-1.5"><span class="font-title-sm text-title-sm text-primary">' + fmtINR(product.price * quantity) + '</span><button class="flex items-center gap-1 font-label-sm text-label-sm uppercase tracking-wider text-secondary hover:opacity-80 transition-opacity" data-save-id="' + product.id + '"><span class="material-symbols-outlined text-[12px]">favorite</span><span>Save</span></button></div>' +
              '</div></div></article>'
          )).join('');
          holder.querySelectorAll('[data-remove-index]').forEach(b => b.addEventListener('click', () => removeCartLine(null, { index: Number(b.dataset.removeIndex) })));
          holder.querySelectorAll('[data-inc-index]').forEach(b => b.addEventListener('click', () => { const i = Number(b.dataset.incIndex); const c = getCart(); if (c[i]) updateCartLine(c[i].productId, c[i].quantity + 1, { index: i }); }));
          holder.querySelectorAll('[data-dec-index]').forEach(b => b.addEventListener('click', () => { const i = Number(b.dataset.decIndex); const c = getCart(); if (c[i]) updateCartLine(c[i].productId, c[i].quantity - 1, { index: i }); }));
          holder.querySelectorAll('[data-save-id]').forEach(b => b.addEventListener('click', () => { const w = getWishlist(); w.add(Number(b.dataset.saveId)); setWishlist(w); toast('Saved to wishlist'); }));
        }
      }
    }

    // Update summary totals and checkout labels (template structure preserved)
    Array.from(document.querySelectorAll('.flex.items-center.justify-between, .flex.justify-between')).forEach(row => {
      const label = ((row.firstElementChild && row.firstElementChild.textContent) || '').replace(/\s+/g,' ').trim();
      const valueEl = row.lastElementChild;
      if (!valueEl) return;
      if (/Items Subtotal/i.test(label)) valueEl.textContent = fmtINR(subtotal);
      if (/Express Logistics|Shipping/i.test(label)) valueEl.textContent = cart.length ? (shipping === 0 ? 'Complimentary' : fmtINR(shipping)) : fmtINR(0);
      if (/Protective Packaging/i.test(label)) { /* keep template */ }
      if (/Total Investment/i.test(label) && !/Inclusive/i.test((row.parentElement && row.parentElement.textContent) || label)) valueEl.textContent = fmtINR(total);
    });
    Array.from(document.querySelectorAll('button,span,p')).forEach(el => {
      const t = (el.textContent || '').replace(/\s+/g,' ').trim();
      if (/Pay .*Secure Checkout/i.test(t)) {
        const target = el.tagName === 'SPAN' ? el : (el.querySelector('span.font-label-md, span') || el);
        target.textContent = `Pay ${fmtINR(total)} via UPI / Secure Checkout`;
      }
      if (/Currently at .*Express threshold/i.test(t)) el.textContent = `Currently at ${fmtINR(subtotal)}. Express threshold: ₹1,11,300.`;
      if (/Add .* to qualify/i.test(t)) { const rem = Math.max(0, 111300 - subtotal); el.textContent = rem > 0 ? `Add ${fmtINR(rem)} to qualify` : 'Complimentary express unlocked'; }
    });
    const bar = Array.from(document.querySelectorAll('[style*="width"]')).find(d => /bg-secondary/.test(d.className || '') && /%/.test(d.getAttribute('style')||''));
    if (bar) bar.style.width = Math.max(0, Math.min(100, Math.round((subtotal / 111300) * 100))) + '%';

    const summary = document.getElementById('template-checkout-summary');
    if (summary) summary.innerHTML = '<div class="flex justify-between"><span>Items</span><span>' + cartCount() + '</span></div><div class="flex justify-between mt-1"><span>Subtotal</span><span>' + fmtINR(subtotal) + '</span></div><div class="flex justify-between mt-1"><span>Shipping</span><span>' + (shipping === 0 ? 'Complimentary' : fmtINR(shipping)) + '</span></div><div class="flex justify-between mt-2 font-semibold text-primary"><span>Total</span><span>' + fmtINR(total) + '</span></div>';
    updateBadges();
  }

  function wireBagPage() {
    if (page() !== 'bag') return;
    ensureCheckoutModal();
    renderBag();
    // Override template inline handlers to operate on real cart state
    window.incrementQty = function() {};
    window.decrementQty = function() {};
    window.removeItem = function() {};
    window.togglePromoDrawer = function() {
      const drawer = document.getElementById('promo-drawer');
      const arrow = document.getElementById('promo-arrow');
      if (!drawer) return;
      drawer.classList.toggle('hidden');
      drawer.classList.toggle('flex');
      if (arrow) arrow.style.transform = drawer.classList.contains('hidden') ? '' : 'rotate(180deg)';
    };
    Array.from(document.querySelectorAll('button,a')).forEach(btn => {
      const t = (btn.textContent || '').replace(/\s+/g,' ').trim();
      if (/Secure Checkout|Pay .*Secure Checkout/i.test(t)) {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          if (!getCart().length) { toast('Your bag is empty', 'error'); return; }
          ensureCheckoutModal(); renderBag();
          document.getElementById('template-checkout-modal').classList.remove('hidden');
        });
      }
      if (/Continue Shopping/i.test(t)) btn.addEventListener('click', (e)=>{ e.preventDefault(); location.href='catalog.html'; });
      if (/^Apply$/i.test(t)) btn.addEventListener('click', (e)=>{ e.preventDefault(); const input = document.querySelector('#promo-drawer input'); const code = ((input && input.value) || '').trim(); toast(code ? 'Code ' + code + ' applied' : 'Enter a promo code', code ? 'ok' : 'error'); });
    });
  }

  function renderProfileOrders() {
    if (page() !== 'profile') return;
    const orders = getOrders();
    const heading = Array.from(document.querySelectorAll('h2,h3')).find(h => /Recent Acquisitions/i.test(h.textContent || ''));
    if (!heading) return;
    const section = heading.closest('section');
    if (!section) return;
    let list = section.querySelector('[data-orders-list]');
    if (!list) {
      const filterRow = Array.from(section.children).find(c => c.querySelector && c.querySelector('button'));
      list = document.createElement('div');
      list.setAttribute('data-orders-list', '1');
      list.className = 'flex flex-col gap-space-sm mt-2';
      if (filterRow && filterRow.nextSibling) section.insertBefore(list, filterRow.nextSibling); else section.appendChild(list);
      Array.from(section.querySelectorAll('article')).forEach(a => { if (!a.closest('[data-orders-list]')) a.style.display = 'none'; });
    }
    if (!orders.length) {
      list.innerHTML = '<div class="p-space-md bg-surface-container-low rounded-xl"><p class="font-title-sm text-primary">No orders yet</p><p class="font-body-sm text-on-surface-variant mt-1">Your confirmed acquisitions will appear here after checkout.</p><a href="catalog.html" class="inline-flex mt-3 h-10 px-4 items-center justify-center rounded bg-primary text-on-primary font-label-sm text-label-sm uppercase tracking-wider">Shop Collection</a></div>';
    } else {
      list.innerHTML = orders.map(o => {
        const count = (o.items || []).reduce((s,i)=>s + Number(i.quantity||0), 0);
        const date = o.created_at ? new Date(o.created_at).toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' }) : '';
        const first = (o.items && o.items[0]) || {};
        const title = first.name || (byId.get(Number(first.productId)) || {}).name || 'Curated Piece';
        return '<article class="p-space-md bg-surface-container-low rounded-xl flex flex-col gap-2 shadow-sm"><div class="flex items-start justify-between gap-2"><div><p class="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">Order ' + (o.id ? '#' + o.id : '') + '</p><h3 class="font-headline-sm text-headline-sm text-primary mt-1">' + escapeHtml(title) + (count > 1 ? ' + ' + (count - 1) + ' more' : '') + '</h3><p class="font-body-sm text-body-sm text-on-surface-variant mt-1">' + escapeHtml(date) + ' • ' + count + ' item' + (count===1?'':'s') + ' • ' + escapeHtml(o.status || 'Confirmed') + '</p></div><div class="text-right"><p class="font-title-sm text-title-sm text-primary">' + fmtINR(o.total || 0) + '</p></div></div><div class="flex gap-2 pt-1"><a href="catalog.html" class="flex-1 h-10 rounded bg-primary text-on-primary font-label-sm text-label-sm uppercase tracking-wider flex items-center justify-center">Shop Again</a><button type="button" class="flex-1 h-10 rounded bg-surface-container-high text-on-surface font-label-sm text-label-sm uppercase tracking-wider" data-order-help="' + (o.id || '') + '">Details</button></div></article>';
      }).join('');
      list.querySelectorAll('[data-order-help]').forEach(b => b.addEventListener('click', () => toast('Order ' + (b.dataset.orderHelp || '') + ' details saved')));
    }
    Array.from(section.querySelectorAll('button')).forEach(b => {
      const t = (b.textContent || '').replace(/\s+/g,' ').trim();
      if (/^All/i.test(t) || /Delivered|In Progress|Cancelled/i.test(t)) b.addEventListener('click', (e)=>{ e.preventDefault(); toast(t + ' view'); });
    });
  }

  function wireProfilePage() {
    if (page() !== 'profile') return;
    renderProfileOrders();
    Array.from(document.querySelectorAll('button,a')).forEach(el => {
      const t = (el.textContent || '').replace(/\s+/g,' ').trim();
      if (/Edit Profile/i.test(t)) el.addEventListener('click', (e)=>{ e.preventDefault(); toast('Profile settings'); });
      if (/Track Order/i.test(t)) el.addEventListener('click', (e)=>{ e.preventDefault(); toast('Tracking details available soon'); });
      if (/Concierge Support|Concierge/i.test(t)) el.addEventListener('click', (e)=>{ e.preventDefault(); toast('Concierge support available'); });
      if (/^Saved$/i.test(t)) el.addEventListener('click', (e)=>{ e.preventDefault(); location.href='catalog.html#saved'; });
      if (/Sign Out/i.test(t)) el.addEventListener('click', (e)=>{ e.preventDefault(); toast('Signed out'); });
      if (/Returns Portal/i.test(t)) el.addEventListener('click', (e)=>{ e.preventDefault(); toast('Returns portal'); });
      if (/Order History/i.test(t)) el.addEventListener('click', (e)=>{ e.preventDefault(); renderProfileOrders(); toast('Order history'); });
      if (/Style Preferences/i.test(t)) el.addEventListener('click', (e)=>{ e.preventDefault(); toast('Style preferences'); });
      if (/Track$|Return$|Invoice$|Reorder$/i.test(t)) el.addEventListener('click', (e)=>{ e.preventDefault(); toast(t + ' request received'); });
    });
  }

  function init() {
    injectStyles();
    wireHeaderAndTabs();
    wireDiscoverPage();
    wireCatalogPage();
    wireProductPage();
    wireBagPage();
    wireProfilePage();
    updateBadges();
    if (page() === 'bag') renderBag();
    if (page() === 'profile') renderProfileOrders();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();

