(() => {
  'use strict';

  document.documentElement.classList.remove('no-js');
  document.documentElement.classList.add('js');

  const body = document.body;
  let returnFocus = null;
  const overlay = document.querySelector('[data-shell-overlay]');
  const panels = ['[data-mobile-menu]', '[data-search-overlay]', '[data-cart-drawer]', '[data-newsletter-popup]'];
  panels.forEach((selector, index) => {
    const panel = document.querySelector(selector);
    if (!panel) return;
    panel.dataset.dialog = '';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-modal', 'true');
    if (!panel.id) panel.id = `ShellDialog-${index + 1}`;
    if (!panel.hasAttribute('tabindex')) panel.setAttribute('tabindex', '-1');
  });
  const closePanels = () => {
    panels.forEach((selector) => {
      const panel = document.querySelector(selector);
      panel?.classList.remove('is-open');
      panel?.setAttribute('aria-hidden', 'true');
    });
    if (overlay) overlay.hidden = true;
    body.classList.remove('no-scroll');
    document.querySelectorAll('[data-mobile-menu-open],[data-search-open],[data-cart-open]').forEach((trigger) => trigger.setAttribute('aria-expanded', 'false'));
    returnFocus?.focus();
    returnFocus = null;
  };
  const openPanel = (selector, trigger) => {
    closePanels();
    returnFocus = trigger || document.activeElement;
    const panel = document.querySelector(selector);
    if (!panel) return;
    panel.classList.add('is-open');
    panel.setAttribute('aria-hidden', 'false');
    if (overlay) overlay.hidden = false;
    body.classList.add('no-scroll');
    trigger?.setAttribute('aria-expanded', 'true');
    panel.querySelector('button, a, input')?.focus();
  };

  const mobileTrigger = document.querySelector('[data-mobile-menu-open]');
  const searchTrigger = document.querySelector('[data-search-open]');
  const cartTrigger = document.querySelector('[data-cart-open]');
  mobileTrigger?.setAttribute('aria-controls', document.querySelector('[data-mobile-menu]')?.id || 'MobileMenu');
  searchTrigger?.setAttribute('aria-controls', document.querySelector('[data-search-overlay]')?.id || 'SearchDialog');
  cartTrigger?.setAttribute('aria-controls', 'CartDrawer');
  [mobileTrigger, searchTrigger, cartTrigger].forEach((trigger) => trigger?.setAttribute('aria-expanded', 'false'));
  mobileTrigger?.addEventListener('click', () => openPanel('[data-mobile-menu]', mobileTrigger));
  searchTrigger?.addEventListener('click', () => openPanel('[data-search-overlay]', searchTrigger));
  cartTrigger?.addEventListener('click', (event) => { event.preventDefault(); openPanel('[data-cart-drawer]', cartTrigger); });
  document.querySelectorAll('[data-mobile-menu-close],[data-search-close],[data-cart-close],[data-newsletter-close]').forEach((button) => button.addEventListener('click', closePanels));
  overlay?.addEventListener('click', closePanels);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closePanels();
      setMegaMenu(false);
    }
    if (event.key !== 'Tab') return;
    const dialog = document.querySelector('[data-dialog].is-open');
    if (!dialog) return;
    const focusable = [...dialog.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])')];
    if (!focusable.length) { event.preventDefault(); dialog.focus(); return; }
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });

  const setMegaMenu = (open) => {
    const shopTrigger = document.querySelector('[data-shop-trigger]');
    const megaMenu = document.querySelector('[data-mega-menu],#shop-main-drawer');
    const shopOverlay = document.querySelector('[data-shop-overlay],#shop-nav-overlay');
    megaMenu?.classList.toggle('is-open', open);
    megaMenu?.setAttribute('aria-hidden', String(!open));
    shopOverlay?.classList.toggle('is-open', open);
    shopOverlay?.setAttribute('aria-hidden', String(!open));
    body.classList.toggle('menu-open', open);
    body.classList.toggle('no-scroll', open);
    shopTrigger?.setAttribute('aria-expanded', String(open));
    if (!open) {
      const subDrawer = document.querySelector('[data-shop-subdrawer]');
      subDrawer?.classList.remove('is-open');
      subDrawer?.setAttribute('aria-hidden', 'true');
      subDrawer?.querySelectorAll('[data-sub-panel]').forEach((panel) => { panel.hidden = true; });
      megaMenu?.querySelectorAll('[data-sub-id]').forEach((button) => button.setAttribute('aria-expanded', 'false'));
      body.classList.remove('shop-sub-open');
    }
  };
  document.addEventListener('click', (event) => {
    if (event.target.closest('[data-shop-close]')) setMegaMenu(false);
  });
  document.addEventListener('click', (event) => {
    const shopTrigger = event.target.closest('[data-shop-trigger],#shop-nav-trigger');
    if (!shopTrigger) return;
    event.preventDefault();
    const megaMenu = document.querySelector('[data-mega-menu],#shop-main-drawer');
    setMegaMenu(!megaMenu?.classList.contains('is-open'));
  });
  document.addEventListener('click', (event) => {
    if (event.target.closest('[data-shop-overlay],#shop-nav-overlay')) setMegaMenu(false);
  });
  const megaMenu = document.querySelector('[data-mega-menu],#shop-main-drawer');
  const shopSubDrawer = document.querySelector('[data-shop-subdrawer]');
  megaMenu?.querySelectorAll('[data-sub-id]').forEach((button) => {
    button.addEventListener('click', () => {
      const panel = shopSubDrawer?.querySelector(`[data-sub-panel="${button.dataset.subId}"]`);
      if (!panel) return;
      shopSubDrawer.querySelectorAll('[data-sub-panel]').forEach((candidate) => { candidate.hidden = candidate !== panel; });
      shopSubDrawer.querySelector('[data-shop-sub-title]').textContent = panel.dataset.subTitle || button.textContent.trim();
      shopSubDrawer.classList.add('is-open');
      shopSubDrawer.setAttribute('aria-hidden', 'false');
      button.setAttribute('aria-expanded', 'true');
      body.classList.add('shop-sub-open');
      panel.querySelector('a,button')?.focus();
    });
  });
  shopSubDrawer?.querySelectorAll('[data-shop-sub-back]').forEach((button) => {
    button.addEventListener('click', () => {
      const panel = shopSubDrawer.querySelector('[data-sub-panel]:not([hidden])');
      const trigger = megaMenu.querySelector(`[data-sub-id="${panel?.dataset.subPanel}"]`);
      shopSubDrawer.classList.remove('is-open');
      shopSubDrawer.setAttribute('aria-hidden', 'true');
      if (panel) panel.hidden = true;
      trigger?.setAttribute('aria-expanded', 'false');
      body.classList.remove('shop-sub-open');
      trigger?.focus();
    });
  });

  document.querySelector('[data-mobile-shop-toggle]')?.addEventListener('click', (event) => {
    const submenu = event.currentTarget.nextElementSibling;
    const open = submenu.hidden;
    submenu.hidden = !open;
    event.currentTarget.setAttribute('aria-expanded', String(open));
  });

  document.querySelectorAll('[data-announcement-bar]').forEach((bar) => {
    const slides = [...bar.querySelectorAll('[data-announcement-slide]')];
    if (slides.length < 2) return;
    let index = 0;
    let timer;
    const show = (next) => {
      index = (next + slides.length) % slides.length;
      slides.forEach((slide, slideIndex) => {
        const active = slideIndex === index;
        slide.classList.toggle('is-active', active);
        slide.setAttribute('aria-hidden', String(!active));
        if (active) slide.removeAttribute('tabindex');
        else slide.setAttribute('tabindex', '-1');
        slide.querySelector('a')?.setAttribute('tabindex', active ? '0' : '-1');
      });
    };
    const restart = () => {
      window.clearInterval(timer);
      if (bar.dataset.autoplay === 'true') timer = window.setInterval(() => show(index + 1), Number(bar.dataset.speed));
    };
    bar.querySelector('[data-announcement-previous]')?.addEventListener('click', () => { show(index - 1); restart(); });
    bar.querySelector('[data-announcement-next]')?.addEventListener('click', () => { show(index + 1); restart(); });
    bar.addEventListener('mouseenter', () => window.clearInterval(timer));
    bar.addEventListener('mouseleave', restart);
    bar.addEventListener('focusin', () => window.clearInterval(timer));
    bar.addEventListener('focusout', (event) => { if (!bar.contains(event.relatedTarget)) restart(); });
    document.addEventListener('visibilitychange', () => { if (document.hidden) window.clearInterval(timer); else restart(); });
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) bar.dataset.autoplay = 'false';
    show(index);
    restart();
  });

  let searchController;
  const searchInput = document.querySelector('[data-predictive-search-input]');
  searchInput?.addEventListener('input', async () => {
    const term = searchInput.value.trim();
    const results = document.querySelector('[data-predictive-search-results]');
    const suggestions = document.querySelector('[data-search-suggestions]');
    if (term.length < 2) { if (results) results.innerHTML = ''; if (suggestions) suggestions.hidden = false; return; }
    searchController?.abort();
    searchController = new AbortController();
    try {
      const response = await fetch(`/search/suggest?q=${encodeURIComponent(term)}&section_id=predictive-search`, { signal: searchController.signal });
      if (!response.ok) throw new Error(`Predictive search failed: ${response.status}`);
      const html = new DOMParser().parseFromString(await response.text(), 'text/html');
      if (results) results.innerHTML = html.querySelector('#shopify-section-predictive-search')?.innerHTML || '';
      if (suggestions) suggestions.hidden = true;
    } catch (error) { if (error.name !== 'AbortError') console.error(error); }
  });

  document.addEventListener('click', async (event) => {
    const button = event.target.closest('[data-cart-quantity]');
    if (!button) return;
    const item = button.closest('[data-cart-line]');
    try {
      const response = await fetch('/cart/change.js', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ line: Number(item.dataset.cartLine), quantity: Number(button.dataset.cartQuantity) }) });
      if (!response.ok) throw new Error(`Cart update failed: ${response.status}`);
      const cart = await response.json();
      document.querySelectorAll('[data-cart-count]').forEach((count) => { count.textContent = count.closest('.cart-drawer__header') ? `(${cart.item_count})` : cart.item_count; });
      const pageResponse = await fetch(window.location.pathname, { headers: { 'X-Requested-With': 'XMLHttpRequest' } });
      if (!pageResponse.ok) throw new Error(`Cart drawer render failed: ${pageResponse.status}`);
      const page = new DOMParser().parseFromString(await pageResponse.text(), 'text/html');
      const fresh = page.querySelector('[data-cart-drawer]');
      const current = document.querySelector('[data-cart-drawer]');
      if (fresh && current) { fresh.classList.add('is-open'); fresh.setAttribute('aria-hidden', 'false'); current.replaceWith(fresh); fresh.querySelector('[data-cart-close]')?.addEventListener('click', closePanels); }
    } catch (error) { console.error(error); }
  });

  const initializeCartSlider = () => {
    const slider = document.querySelector('[data-cart-slider]');
    if (!slider || slider.dataset.ready === 'true') return;
    slider.dataset.ready = 'true';
    const root = slider.closest('[data-cart-drawer]');
    const previous = root.querySelector('[data-cart-slider-prev]');
    const next = root.querySelector('[data-cart-slider-next]');
    const step = () => {
      const slide = slider.querySelector('.cart-drawer__recommendation,.swiper-slide');
      const styles = window.getComputedStyle(slider);
      return (slide?.getBoundingClientRect().width || 0) + (parseFloat(styles.columnGap || styles.gap) || 0);
    };
    const update = () => {
      const maximum = slider.scrollWidth - slider.clientWidth;
      const position = Math.abs(slider.scrollLeft);
      if (previous) { previous.disabled = position < 2; previous.setAttribute('aria-disabled', String(previous.disabled)); }
      if (next) { next.disabled = position > maximum - 2; next.setAttribute('aria-disabled', String(next.disabled)); }
    };
    previous?.addEventListener('click', () => slider.scrollBy({ left: -step(), behavior: 'smooth' }));
    next?.addEventListener('click', () => slider.scrollBy({ left: step(), behavior: 'smooth' }));
    slider.addEventListener('scroll', update, { passive: true });
    new ResizeObserver(update).observe(slider);
    update();
  };

  const refreshCartDrawer = async (openAfter) => {
    const response = await fetch(window.location.pathname, { headers: { 'X-Requested-With': 'XMLHttpRequest' } });
    if (!response.ok) throw new Error(`Cart drawer render failed: ${response.status}`);
    const page = new DOMParser().parseFromString(await response.text(), 'text/html');
    const fresh = page.querySelector('[data-cart-drawer]');
    const current = document.querySelector('[data-cart-drawer]');
    if (!fresh || !current) return;
    current.replaceWith(fresh);
    fresh.querySelector('[data-cart-close]')?.addEventListener('click', closePanels);
    initializeCartSlider();
    if (openAfter) openPanel('[data-cart-drawer]', cartTrigger);
  };

  const updateCartCount = (itemCount) => {
    document.querySelectorAll('[data-cart-count]').forEach((count) => {
      count.textContent = count.closest('.cart-drawer__header') ? `(${itemCount})` : itemCount;
      count.classList.toggle('hidden', itemCount === 0 && !count.closest('.cart-drawer__header'));
    });
  };

  document.addEventListener('submit', async (event) => {
    const form = event.target.closest('[data-cart-recommendation-form]');
    if (!form) return;
    event.preventDefault();
    const button = form.querySelector('button[type="submit"]');
    button.disabled = true;
    try {
      const response = await fetch('/cart/add.js', { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(form) });
      if (!response.ok) throw new Error(`Add to cart failed: ${response.status}`);
      await refreshCartDrawer(true);
    } catch (error) { console.error(error); button.disabled = false; }
  });
  document.addEventListener('submit', async (event) => {
    const form = event.target.closest('form[data-type="add-to-cart-form"],form[data-collection-product-form]');
    if (!form || form.closest('[id^="MainProduct-"]') || form.hasAttribute('data-cart-recommendation-form')) return;
    event.preventDefault();
    const button = form.querySelector('button[type="submit"]');
    if (!button || button.disabled) return;
    const originalLabel = button.getAttribute('aria-label');
    button.disabled = true;
    button.setAttribute('aria-busy', 'true');
    try {
      const response = await fetch('/cart/add.js', { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(form) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.description || 'Unable to add this item');
      const cart = await fetch('/cart.js').then((cartResponse) => cartResponse.json());
      updateCartCount(cart.item_count);
      document.dispatchEvent(new CustomEvent('cart:updated', { detail: cart }));
    } catch (error) {
      window.alert(error.message);
    } finally {
      button.disabled = false;
      button.removeAttribute('aria-busy');
      if (originalLabel) button.setAttribute('aria-label', originalLabel);
    }
  });
  document.addEventListener('cart:updated', (event) => {
    if (event.detail?.item_count != null) updateCartCount(event.detail.item_count);
    refreshCartDrawer(true).catch(console.error);
  });
  initializeCartSlider();

  const deferredVideos = [...document.querySelectorAll('video[data-performance-video]')];
  const loadDeferredVideo = (video) => {
    if (video.dataset.performanceLoaded === 'true') return;
    video.dataset.performanceLoaded = 'true';
    video.querySelectorAll('source[data-src]').forEach((source) => {
      source.src = source.dataset.src;
      source.removeAttribute('data-src');
    });
    video.load();
    video.play().catch(() => {});
  };
  const delayedVideos = deferredVideos.filter((video) => video.hasAttribute('data-video-after-load'));
  const viewportVideos = deferredVideos.filter((video) => !video.hasAttribute('data-video-after-load'));
  window.addEventListener('load', () => {
    const startDelayedVideos = () => delayedVideos.forEach(loadDeferredVideo);
    if ('requestIdleCallback' in window) window.requestIdleCallback(startDelayedVideos, { timeout: 1500 });
    else window.setTimeout(startDelayedVideos, 250);
  }, { once: true });
  if ('IntersectionObserver' in window) {
    const videoObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      loadDeferredVideo(entry.target);
      videoObserver.unobserve(entry.target);
    }), { rootMargin: '600px 0px' });
    viewportVideos.forEach((video) => videoObserver.observe(video));
  } else {
    viewportVideos.forEach(loadDeferredVideo);
  }

  const closeLocalization = (root) => {
    const list = root?.querySelector('[data-localization-list]');
    const toggle = root?.querySelector('[data-localization-toggle]');
    if (list) list.hidden = true;
    toggle?.setAttribute('aria-expanded', 'false');
  };
  document.querySelectorAll('[data-localization-toggle]').forEach((toggle) => toggle.addEventListener('click', (event) => {
    const root = event.currentTarget.closest('.disclosure');
    const list = root?.querySelector('[data-localization-list]');
    if (!list) return;
    const open = list.hidden;
    document.querySelectorAll('.disclosure').forEach(closeLocalization);
    list.hidden = !open;
    event.currentTarget.setAttribute('aria-expanded', String(open));
  }));
  document.querySelectorAll('[data-localization-close]').forEach((control) => control.addEventListener('click', () => closeLocalization(control.closest('.disclosure'))));
  document.addEventListener('click', (event) => { if (!event.target.closest('.disclosure')) document.querySelectorAll('.disclosure').forEach(closeLocalization); });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') document.querySelectorAll('.disclosure').forEach(closeLocalization); });

  const popup = document.querySelector('[data-newsletter-popup]');
  if (popup && !window.localStorage.getItem('phlurNewsletterDismissed')) {
    window.setTimeout(() => openPanel('[data-newsletter-popup]'), Number(popup.dataset.delay));
    popup.querySelector('[data-newsletter-close]')?.addEventListener('click', () => window.localStorage.setItem('phlurNewsletterDismissed', 'true'));
  }
})();

/* Canonical product enhancements: normalized media/variants, accessible gallery and smart-cart refresh. */
(() => {
  const root = document.querySelector('[data-product-section]'); if (!root) return;
  let raw; try { raw = JSON.parse(root.querySelector('[data-product-json]').textContent); } catch (_) { return; }
  const variants = Array.isArray(raw.variants) ? raw.variants : []; const moneyFormat = root.dataset.moneyFormat || '{{amount}}';
  const money = (cents) => { let n = (Number(cents || 0) / 100).toFixed(2); if (moneyFormat.includes('{{amount_no_decimals}}')) n = Math.round(Number(cents || 0) / 100).toString(); return moneyFormat.replace(/{{amount(_no_decimals)?}}/g, n).replace(/{{currency}}/g, ''); };
  const selected = () => [...root.querySelectorAll('[data-option-input]:checked')].map((i) => i.value); const variant = () => { const opts = selected(); return variants.find((v) => (Array.isArray(v.options) ? v.options : []).every((x, i) => x === opts[i])) || variants[0]; };
  const update = () => { const v = variant(); if (!v) return; root.querySelector('[data-variant-id]').value = v.id; root.querySelector('[data-product-price]').innerHTML = (v.compare_at_price > v.price ? `<del>${money(v.compare_at_price)}</del>` : '') + `<span>${money(v.price)}</span>`; root.querySelector('[data-add-price]').textContent = money(v.price); root.querySelector('[data-add-label]').textContent = v.available ? root.dataset.addLabel || 'Add to bag' : root.dataset.soldLabel || 'Sold out'; root.querySelector('[data-add-to-cart]').disabled = !v.available; if (v.featured_media?.id) root.querySelector(`[data-media-target="${v.featured_media.id}"]`)?.click(); };
  root.querySelectorAll('[data-option-input]').forEach((i) => i.addEventListener('change', update));
  root.addEventListener('click', (event) => { const control = event.target.closest('[data-quantity-minus],[data-quantity-plus]'); if (!control || !root.contains(control)) return; const input = root.querySelector('[data-quantity-input]'); if (!input) return; const min = Number(input.min || 1); const max = input.max ? Number(input.max) : Infinity; const delta = control.hasAttribute('data-quantity-minus') ? -1 : 1; input.value = Math.min(max, Math.max(min, Number(input.value || min) + delta)); input.dispatchEvent(new Event('change', { bubbles: true })); });
  const slides = () => [...root.querySelectorAll('[data-media-id]')]; let index = Math.max(0, slides().findIndex((s) => !s.hidden)); const show = (n) => { const all = slides(); if (!all.length) return; index = (n + all.length) % all.length; all.forEach((s, i) => { s.hidden = i !== index; }); root.querySelectorAll('[data-media-target]').forEach((b, i) => b.classList.toggle('is-active', i === index)); };
  root.querySelector('[data-gallery-prev]')?.addEventListener('click', () => show(index - 1)); root.querySelector('[data-gallery-next]')?.addEventListener('click', () => show(index + 1)); root.querySelector('[data-gallery-main]')?.addEventListener('keydown', (e) => { if (e.key === 'ArrowLeft') show(index - 1); if (e.key === 'ArrowRight') show(index + 1); }); root.querySelectorAll('[data-media-target]').forEach((b, i) => b.addEventListener('click', () => show(i)));
  let startX = 0; root.querySelector('[data-gallery-main]')?.addEventListener('touchstart', (e) => { startX = e.changedTouches[0].clientX; }, {passive:true}); root.querySelector('[data-gallery-main]')?.addEventListener('touchend', (e) => { const dx = e.changedTouches[0].clientX - startX; if (Math.abs(dx) > 40) show(index + (dx < 0 ? 1 : -1)); }, {passive:true});
  const form = root.querySelector('[data-product-form]'); form?.addEventListener('submit', async (e) => { e.preventDefault(); const b = root.querySelector('[data-add-to-cart]'); b.disabled = true; try { const r = await fetch('/cart/add.js', {method:'POST', headers:{'Content-Type':'application/json','Accept':'application/json'}, body:JSON.stringify({items:[{id:Number(root.querySelector('[data-variant-id]').value), quantity:Number(root.querySelector('[data-quantity-input]').value)}]})}); if (!r.ok) throw new Error('Add to cart failed'); const cart = await fetch('/cart.js').then((x) => x.json()); document.querySelectorAll('[data-cart-count]').forEach((x) => { x.textContent = cart.item_count; }); document.dispatchEvent(new CustomEvent('cart:updated', {detail:cart})); document.querySelector('[data-cart-open]')?.click(); } catch (err) { console.error(err); } finally { b.disabled = false; } });
})();
