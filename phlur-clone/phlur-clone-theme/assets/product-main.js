/* Product main interactions, including reference-compatible gallery geometry. */
(() => {
  const initialize = root => {
    if (root.dataset.productMainReady) return;
    root.dataset.productMainReady = 'true';
    const gallery = root.querySelector('[data-product-gallery]');
    if (gallery) {
      gallery.classList.add('swiper-initialized', 'swiper-horizontal', 'swiper-backface-hidden');
      const track = gallery.querySelector('.swiper-wrapper');
      const slides = [...gallery.querySelectorAll('.swiper-slide')];
      const bullets = [...gallery.querySelectorAll('.swiper-pagination-bullet')];
      const previous = gallery.querySelector('.swiper-button-prev');
      const next = gallery.querySelector('.swiper-button-next');
      let active = 0, start = 0, delta = 0, dragging = false;
      const state = () => {
        slides.forEach((slide, index) => {
          slide.classList.toggle('swiper-slide-active', index === active);
          slide.classList.toggle('swiper-slide-prev', index === active - 1);
          slide.classList.toggle('swiper-slide-next', index === active + 1);
        });
        bullets.forEach((bullet, index) => {
          bullet.classList.toggle('swiper-pagination-bullet-active', index === active);
          index === active ? bullet.setAttribute('aria-current', 'true') : bullet.removeAttribute('aria-current');
        });
        [[previous, active === 0], [next, active === slides.length - 1]].forEach(([control, disabled]) => {
          control.setAttribute('aria-disabled', String(disabled));
          control.classList.toggle('swiper-button-disabled', disabled);
          control.tabIndex = disabled ? -1 : 0;
        });
      };
      const show = (index, animate = true) => {
        active = Math.max(0, Math.min(slides.length - 1, index));
        track.style.transitionDuration = animate ? 'var(--gallery-transition-duration)' : '0ms';
        track.style.transitionDelay = '0ms';
        track.style.transform = `translate3d(${-slides[active].offsetLeft}px, 0px, 0px)`;
        track.dataset.currentIndex = String(active);
        state();
      };
      let sizeRetry = 0;
      const size = () => {
        const width = gallery.getBoundingClientRect().width;
        if (innerWidth >= 750 && width > 0) slides.forEach(slide => { slide.style.width = `${width}px`; });
        else slides.forEach(slide => { slide.style.removeProperty('width'); });
        if (width > 0) {
          sizeRetry = 0;
          show(active, false);
        } else if (sizeRetry < 12) {
          sizeRetry += 1;
          requestAnimationFrame(size);
        }
      };
      previous.onclick = () => show(active - 1);
      next.onclick = () => show(active + 1);
      bullets.forEach((bullet, index) => { bullet.onclick = () => show(index); });
      [previous, next, ...bullets].forEach((control, index) => control.addEventListener('keydown', event => {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        if (control === previous) show(active - 1);
        else if (control === next) show(active + 1);
        else show(index - 2);
      }));
      gallery.onpointerdown = event => { dragging = true; start = event.clientX; delta = 0; gallery.setPointerCapture(event.pointerId); };
      gallery.onpointermove = event => { if (dragging) delta = event.clientX - start; };
      const end = event => {
        if (gallery.hasPointerCapture?.(event.pointerId)) gallery.releasePointerCapture(event.pointerId);
        const movement = delta; dragging = false; delta = 0;
        if (event.type === 'pointerup' && Math.abs(movement) > 45) show(active + (movement < 0 ? 1 : -1));
      };
      gallery.onpointerup = end;
      gallery.onpointercancel = end;
      addEventListener('resize', size, { passive: true });
      const resizeObserver = 'ResizeObserver' in window ? new ResizeObserver(size) : null;
      resizeObserver?.observe(gallery);
      const unload = event => {
        if (event.target !== root && !event.target?.contains(root)) return;
        removeEventListener('resize', size);
        resizeObserver?.disconnect();
        document.removeEventListener('shopify:section:unload', unload);
      };
      document.addEventListener('shopify:section:unload', unload);
      requestAnimationFrame(() => requestAnimationFrame(size));
    }
    root.querySelectorAll('.accordion-header-wrap').forEach(button => {
      button.onclick = () => {
        const accordion = button.closest('.js_accordion');
        const content = accordion.querySelector('.accordion_content');
        const opening = !accordion.classList.contains('open');
        accordion.classList.toggle('open', opening);
        button.setAttribute('aria-expanded', opening ? 'true' : 'false');
        content.style.display = opening ? '' : 'none';
      };
    });
    root.querySelectorAll('.scentCollectionSwiper').forEach(slider => {
      const track = slider.querySelector('.swiper-wrapper');
      const slides = [...slider.querySelectorAll('.swiper-wrapper > .swiper-slide')];
      const labels = [...slider.querySelectorAll('.swiper-pagination-custom .swiper-pagination-bullet')];
      const previous = slider.querySelector(':scope > .swiper-button-prev');
      const next = slider.querySelector(':scope > .swiper-button-next');
      let active = Math.max(0, slides.findIndex(slide => slide.classList.contains('active-product')));
      const update = index => {
        active = Math.max(0, Math.min(slides.length - 1, index));
        const maximum = Math.max(0, track.scrollWidth - slider.clientWidth);
        const offset = Math.min(slides[active]?.offsetLeft || 0, maximum);
        track.style.transform = `translate3d(${-offset}px,0,0)`;
        slides.forEach((slide, i) => {
          slide.classList.toggle('swiper-slide-active', i === active);
          slide.classList.toggle('swiper-slide-next', i === active + 1);
        });
        labels.forEach((label, i) => {
          label.classList.toggle('swiper-pagination-bullet-active', i === active);
          label.tabIndex = i === active ? 0 : -1;
        });
        [[previous, active === 0], [next, active === slides.length - 1]].forEach(([control, disabled]) => {
          if (!control) return;
          control.classList.toggle('swiper-button-disabled', disabled);
          control.setAttribute('aria-disabled', String(disabled));
          control.tabIndex = disabled ? -1 : 0;
        });
      };
      previous?.addEventListener('click', () => update(active - 1));
      next?.addEventListener('click', () => update(active + 1));
      [previous, next, ...labels].filter(Boolean).forEach((control, index) => control.addEventListener('keydown', event => {
        if (!['Enter', ' ', 'ArrowLeft', 'ArrowRight'].includes(event.key)) return;
        event.preventDefault();
        if (event.key === 'ArrowLeft' || control === previous) update(active - 1);
        else if (event.key === 'ArrowRight' || control === next) update(active + 1);
        else update(index - 2);
      }));
      labels.forEach((label, index) => {
        label.setAttribute('role', 'button');
        label.tabIndex = index === active ? 0 : -1;
        label.addEventListener('click', () => update(index));
      });
      const resizeObserver = 'ResizeObserver' in window ? new ResizeObserver(() => update(active)) : null;
      resizeObserver?.observe(slider);
      update(active);
    });
    root.querySelectorAll('form[action$="/cart/add"]').forEach(form => form.addEventListener('submit', async event => {
      event.preventDefault();
      const button = form.querySelector('[type=submit]');
      const output = form.querySelector('[role=status],[role=alert]');
      const spinner = button.querySelector('.loading__spinner');
      button.disabled = true;
      button.setAttribute('aria-disabled', 'true');
      spinner?.classList.remove('hidden');
      try {
        const response = await fetch('/cart/add.js', { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(form) });
        const result = await response.json();
        if (!response.ok) throw Error(result.description || 'Unable to add item');
        if (output) { output.hidden = false; output.textContent = 'Added to bag'; }
        const cart = await fetch('/cart.js').then(cartResponse => cartResponse.json());
        document.dispatchEvent(new CustomEvent('cart:updated', { detail: cart }));
      } catch (error) {
        if (output) { output.hidden = false; output.textContent = error.message; }
      } finally {
        button.disabled = false;
        button.setAttribute('aria-disabled', 'false');
        spinner?.classList.add('hidden');
      }
    }));
  };
  document.querySelectorAll('[id^="MainProduct-"]').forEach(initialize);
  document.addEventListener('shopify:section:load', event => {
    const root = event.target.matches?.('[id^="MainProduct-"]') ? event.target : event.target.querySelector?.('[id^="MainProduct-"]');
    if (root) initialize(root);
  });
})();
