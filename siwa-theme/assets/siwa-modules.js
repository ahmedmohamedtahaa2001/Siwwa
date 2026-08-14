/* ============================================================
   SIWA — MODULE BEHAVIOUR
   ------------------------------------------------------------
   Behaviour only. Every customer-facing string comes from a data-*
   attribute written by Liquid from a locale key or a schema setting —
   never from this file. If you find yourself typing a sentence here,
   it belongs in locales/ or a setting.

   This file is HAND-AUTHORED and is NOT generated from the component
   library. The library's js/library.js renders gallery demos and has no
   Shopify runtime; this drives the real cart and Section Rendering APIs.
   The CSS relationship is the other way round: the library owns all of
   it and assets/*.css are generated copies.

   Motion: only transform and opacity are animated, and the
   prefers-reduced-motion block in tokens.css suppresses it wholesale.
   ============================================================ */
(() => {
  'use strict';

  const money = (cents) => {
    // Shopify writes the format into the DOM; never guess a currency here.
    const fmt = document.documentElement.dataset.moneyFormat || '{{amount}}';
    const amount = (cents / 100).toLocaleString(document.documentElement.lang || 'en', {
      minimumFractionDigits: 2, maximumFractionDigits: 2
    });
    return fmt.replace(/\{\{\s*amount[^}]*\}\}/, amount);
  };

  const t = (el, key, fallback) => (el && el.dataset[key]) || fallback || '';

  /* ══════════════════════ TABS ══════════════════════
     Real ARIA tabs: roving tabindex plus arrow, Home and End keys.
     Without the keyboard handling this is a row of buttons, not tabs. */
  const initTabs = (root) => {
    const tabs = [...root.querySelectorAll('[role="tab"]')];
    const panels = [...root.querySelectorAll('[role="tabpanel"]')];
    if (!tabs.length) return;

    const select = (index, focus = true) => {
      tabs.forEach((tab, i) => {
        const on = i === index;
        tab.setAttribute('aria-selected', on ? 'true' : 'false');
        tab.tabIndex = on ? 0 : -1;
        if (panels[i]) panels[i].hidden = !on;
      });
      if (focus) tabs[index].focus();
    };

    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => select(i, false));
      tab.addEventListener('keydown', (e) => {
        const rtl = document.documentElement.dir === 'rtl';
        const forward = rtl ? 'ArrowLeft' : 'ArrowRight';
        const back = rtl ? 'ArrowRight' : 'ArrowLeft';
        let next = null;
        if (e.key === forward) next = (i + 1) % tabs.length;
        else if (e.key === back) next = (i - 1 + tabs.length) % tabs.length;
        else if (e.key === 'Home') next = 0;
        else if (e.key === 'End') next = tabs.length - 1;
        if (next !== null) { e.preventDefault(); select(next); }
      });
    });
  };

  /* ══════════════════════ CAROUSEL ══════════════════════
     Native scroll-snap does the scrolling; the buttons only nudge it, so
     touch and trackpad keep working untouched. Buttons disable at the
     ends rather than wrapping — a silent no-op reads as broken. */
  const initCarousel = (root) => {
    const track = root.querySelector('.car__track') || root.querySelector('.carousel');
    if (!track) return;
    const prev = root.querySelector('[data-carousel-prev]');
    const next = root.querySelector('[data-carousel-next]');
    const foot = root.querySelector('[data-carousel-foot]');
    const dots = root.querySelector('[data-carousel-dots]');

    const rtl = () => document.documentElement.dir === 'rtl';
    const num = (n) => n.toLocaleString(document.documentElement.lang || 'en');
    // scrollLeft is negative-going in RTL on standards-compliant engines.
    const maxScroll = () => track.scrollWidth - track.clientWidth;

    /* One page is as many WHOLE cards as fit, never a fraction of one —
       a page that lands mid-card reads as a broken scroll. */
    const step = () => {
      const first = track.firstElementChild;
      if (!first) return track.clientWidth || 1;
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      const card = first.getBoundingClientRect().width + gap;
      if (!card) return track.clientWidth || 1;
      const per = Math.max(1, Math.floor((track.clientWidth + gap) / card));
      return card * per;
    };

    /* Dots page rather than track one-per-slide: a rail of twelve products
       would otherwise show twelve dots, most of them meaningless when four
       cards are on screen at once. Landings are 0, step, 2·step … and
       finally maxScroll, so the count is the whole steps plus that last
       resting place. It follows the viewport, hence the rebuild on resize. */
    const pageCount = () => (maxScroll() <= 1 ? 1 : Math.ceil(maxScroll() / step()) + 1);

    /* The last landing is maxScroll, not (n-1)·step — the final hop is
       usually shorter than a full page. Sending the last segment to
       k·step would overshoot and clamp, leaving it indistinguishable
       from the one before it. */
    const landing = (k) => (k >= pageCount() - 1 ? maxScroll() : Math.min(k * step(), maxScroll()));
    const goTo = (k) => track.scrollTo({
      left: (rtl() ? -1 : 1) * landing(k), behavior: 'smooth' });

    let built = -1;
    const buildDots = (n) => {
      if (!dots || n === built) return;
      built = n;
      dots.textContent = '';
      const label = dots.dataset.label || '';
      for (let k = 0; k < n; k++) {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'car__dot';
        b.setAttribute('role', 'tab');
        b.setAttribute('aria-label', (label + ' ' + num(k + 1)).trim());
        b.addEventListener('click', () => goTo(k));
        dots.appendChild(b);
      }
    };

    const update = () => {
      const max = maxScroll();
      const pos = Math.abs(track.scrollLeft);
      const n = pageCount();
      buildDots(n);
      // Nothing to page through: hide the bar rather than show one dead dot
      // between two dead arrows.
      if (foot) foot.hidden = n <= 1;
      if (prev) prev.disabled = pos <= 1;
      if (next) next.disabled = pos >= max - 1;
      // Scroll position is the single source of truth, so dragging the
      // track by hand moves the bar too.
      // Sitting at the end IS the last page; rounding pos/step can never
      // produce that index when the final hop is shorter than a page.
      const cur = max <= 1 ? 0
        : (pos >= max - 2 ? n - 1 : Math.min(n - 1, Math.round(pos / step())));
      if (dots) {
        /* Width = the share of the rail on screen; shift = how far that
           view has travelled, expressed in multiples of its own width so
           CSS can slide it by transform alone. Clamped so the span's far
           edge lands exactly on the track's, never past it. */
        const sw = track.scrollWidth || 1;
        const frac = Math.min(1, track.clientWidth / sw);
        const maxShift = frac > 0 ? (1 - frac) / frac : 0;
        const shift = frac > 0 ? (pos / sw) / frac : 0;
        dots.style.setProperty('--car-frac', frac);
        dots.style.setProperty('--car-shift', Math.max(0, Math.min(shift, maxShift)));
        Array.prototype.forEach.call(dots.children, (d, k) =>
          d.setAttribute('aria-current', k === cur ? 'true' : 'false'));
      }
    };

    const nudge = (dir) => {
      const sign = rtl() ? -1 : 1;
      track.scrollBy({ left: dir * sign * step(), behavior: 'smooth' });
    };

    if (prev) prev.addEventListener('click', () => nudge(-1));
    if (next) next.addEventListener('click', () => nudge(1));
    track.addEventListener('scroll', update, { passive: true });
    if (window.ResizeObserver) new ResizeObserver(update).observe(track);
    update();
  };

  /* ══════════════════════ LAYERING PICKER ══════════════════════
     Adds two variants in ONE cart request. Two sequential /cart/add
     calls can interleave and drop a line, and a failure halfway leaves
     the customer with half a bundle. */
  const initLayering = (root) => {
    const totalEl = root.querySelector('[data-layering-total]');
    const statusEl = root.querySelector('[data-layering-status]');
    const addBtn = root.querySelector(`#${root.dataset.uid}-add`);

    const selected = (role) => {
      const nodes = [...root.querySelectorAll(`[data-layering-${role}]`)];
      for (const n of nodes) {
        if (n.tagName === 'SELECT') return n.options[n.selectedIndex];
        if (n.checked) return n;
      }
      return null;
    };

    const recalc = () => {
      const base = selected('base');
      const partner = selected('partner');
      if (!totalEl) return;
      if (!base || !partner) { totalEl.textContent = ''; return; }
      const sum = Number(base.dataset.price || 0) + Number(partner.dataset.price || 0);
      totalEl.textContent = money(sum);
    };

    root.addEventListener('change', recalc);
    recalc();

    if (addBtn) {
      addBtn.addEventListener('click', async () => {
        const base = selected('base');
        const partner = selected('partner');
        if (!base || !partner) {
          if (statusEl) statusEl.textContent = t(root, 'msgIncomplete');
          return;
        }
        addBtn.setAttribute('data-state', 'loading');
        try {
          const res = await fetch(`${window.Shopify?.routes?.root || '/'}cart/add.js`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              items: [
                { id: Number(base.value), quantity: 1 },
                { id: Number(partner.value), quantity: 1 }
              ]
            })
          });
          if (!res.ok) throw new Error(String(res.status));
          if (statusEl) statusEl.textContent = t(root, 'msgAdded');
          document.dispatchEvent(new CustomEvent('siwa:cart:updated'));
        } catch {
          // Never swallow this. A silent failure looks like a successful add.
          if (statusEl) statusEl.textContent = t(root, 'msgFailed');
        } finally {
          addBtn.removeAttribute('data-state');
        }
      });
    }
  };

  /* ══════════════════════ QUIZ ══════════════════════
     Counts answer values and resolves the winner against a collection.
     Deliberately simple and inspectable: a weighted model would imply
     data nobody has collected. When no value clears the threshold it
     falls back rather than asserting a match. */
  const initQuiz = (root) => {
    const form = root.querySelector('[data-quiz-form]');
    if (!form) return;
    const questions = [...root.querySelectorAll('[data-quiz-question]')];
    const bar = root.querySelector('[data-quiz-bar]');
    const stepEl = root.querySelector('[data-quiz-step]');
    const progress = root.querySelector('[role="progressbar"]');
    const resultEl = root.querySelector('[data-quiz-result]');
    const nextBtn = root.querySelector(`#${root.dataset.uid}-next`);
    const backBtn = root.querySelector(`#${root.dataset.uid}-back`);
    let index = 0;

    const show = (i) => {
      questions.forEach((q, n) => { q.hidden = n !== i; });
      const pct = questions.length ? ((i + 1) / questions.length) * 100 : 0;
      if (bar) bar.style.width = `${pct}%`;
      if (progress) progress.setAttribute('aria-valuenow', String(i + 1));
      if (stepEl) {
        stepEl.textContent = (t(root, 'msgStep') || '{n}/{total}')
          .replace('{n}', i + 1).replace('{total}', questions.length);
      }
      if (backBtn) backBtn.disabled = i === 0;
      if (nextBtn) {
        nextBtn.querySelector('.btn__label').textContent =
          i === questions.length - 1 ? t(root, 'msgSee') : t(root, 'msgNext');
      }
    };

    const score = () => {
      const tally = {};
      form.querySelectorAll('[data-quiz-answer]:checked').forEach((input) => {
        tally[input.value] = (tally[input.value] || 0) + 1;
      });
      const ranked = Object.entries(tally).sort((a, b) => b[1] - a[1]);
      return ranked.length ? ranked[0][0] : null;
    };

    const finish = async () => {
      const winner = score();
      const handle = winner ? root.dataset.resultCollection : root.dataset.fallbackCollection;
      if (!resultEl) return;
      resultEl.hidden = false;
      form.hidden = true;
      resultEl.setAttribute('data-quiz-winner', winner || '');

      // Section Rendering API would fetch the matched products here; the
      // Phase 4 section supplies the URL. Until then the result element
      // carries the outcome and the section decides what to do with it.
      resultEl.dispatchEvent(new CustomEvent('siwa:quiz:complete', {
        bubbles: true,
        detail: { winner, collection: handle, type: root.dataset.resultType }
      }));
      resultEl.focus();
    };

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const current = questions[index];
        const answered = current && current.querySelector('[data-quiz-answer]:checked');
        if (!answered) {
          if (stepEl) stepEl.textContent = t(root, 'msgPick');
          return;
        }
        if (index < questions.length - 1) { index += 1; show(index); }
        else finish();
      });
    }
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        if (index > 0) { index -= 1; show(index); }
      });
    }
    show(0);
  };


  /* ══════════════════════ DRAWER ══════════════════════
     Focus is moved in and restored on close, and Escape closes. A drawer
     that traps nothing and restores nothing is a div, not a dialog. */
  const initDrawer = (root) => {
    let lastFocus = null;
    const open = () => {
      lastFocus = document.activeElement;
      root.hidden = false;
      const first = root.querySelector('a, button, input, [tabindex]');
      if (first) first.focus();
      document.addEventListener('keydown', onKey);
    };
    const close = () => {
      root.hidden = true;
      document.removeEventListener('keydown', onKey);
      if (lastFocus) lastFocus.focus();
      document.querySelectorAll(`[data-siwa-drawer-open="${root.id}"]`)
        .forEach(b => b.setAttribute('aria-expanded', 'false'));
    };
    const onKey = (e) => { if (e.key === 'Escape') close(); };

    document.querySelectorAll(`[data-siwa-drawer-open="${root.id}"]`).forEach(btn =>
      btn.addEventListener('click', () => { btn.setAttribute('aria-expanded', 'true'); open(); }));
    root.querySelectorAll('[data-siwa-drawer-close]').forEach(btn =>
      btn.addEventListener('click', close));
    root.addEventListener('click', (e) => { if (e.target === root) close(); });
  };

  /* ══════════════════════ MEGA MENU ══════════════════════ */
  const initMega = (btn) => {
    const panel = document.getElementById(btn.getAttribute('aria-controls'));
    if (!panel) return;
    const set = (on) => {
      btn.setAttribute('aria-expanded', on ? 'true' : 'false');
      panel.hidden = !on;
    };
    btn.addEventListener('click', () => set(btn.getAttribute('aria-expanded') !== 'true'));
    btn.addEventListener('keydown', (e) => { if (e.key === 'Escape') { set(false); btn.focus(); } });
    document.addEventListener('click', (e) => {
      if (!panel.contains(e.target) && e.target !== btn) set(false);
    });
  };

  /* ══════════════════════ SLIDESHOW / ANNOUNCEMENT ══════════════════════
     Rotation stops on hover, on focus-within, and permanently once the
     visitor uses a control — an auto-advancing carousel that fights the
     user is a WCAG 2.2.2 failure. */
  const initRotator = (root, slideSel, dotSel) => {
    const slides = [...root.querySelectorAll(slideSel)];
    if (slides.length < 2) return;
    const dots = dotSel ? [...root.querySelectorAll(dotSel)] : [];
    const interval = Number(root.dataset.interval || 5000);
    const autoplay = root.dataset.autoplay === 'true';
    let i = 0, timer = null, stopped = !autoplay;

    const show = (n) => {
      i = (n + slides.length) % slides.length;
      slides.forEach((s, k) => {
        const on = k === i;
        if (s.hasAttribute('hidden') || s.dataset.announcementSlide !== undefined) s.hidden = !on;
        s.setAttribute('aria-current', on ? 'true' : 'false');
      });
      dots.forEach((d, k) => d.setAttribute('aria-current', k === i ? 'true' : 'false'));
    };
    const start = () => { if (!stopped && !timer) timer = setInterval(() => show(i + 1), interval); };
    const stop = () => { clearInterval(timer); timer = null; };

    dots.forEach((d, k) => d.addEventListener('click', () => { stopped = true; stop(); show(k); }));
    const pause = root.querySelector('[data-slide-pause]');
    if (pause) pause.addEventListener('click', () => { stopped = !stopped; stopped ? stop() : start(); });

    root.addEventListener('mouseenter', stop);
    root.addEventListener('mouseleave', start);
    root.addEventListener('focusin', stop);
    root.addEventListener('focusout', start);
    show(0); start();
  };

  /* ══════════════════════ COUNTDOWN ══════════════════════ */
  const initCountdown = (el) => {
    const deadline = Date.parse(el.dataset.deadline);
    if (Number.isNaN(deadline)) return;
    const tick = () => {
      const left = deadline - Date.now();
      if (left <= 0) { el.textContent = el.dataset.expired || ''; clearInterval(id); return; }
      const d = Math.floor(left / 86400000);
      const h = Math.floor(left / 3600000) % 24;
      const m = Math.floor(left / 60000) % 60;
      el.textContent = `${d}${el.dataset.unitDays} ${h}${el.dataset.unitHours} ${m}${el.dataset.unitMinutes}`;
    };
    tick();
    const id = setInterval(tick, 60000);
  };

  /* ══════════════════════ MARQUEE ══════════════════════ */
  const initMarquee = (el) => {
    el.style.setProperty('--marquee-speed', `${el.dataset.speed || 40}s`);
  };

  /* ══════════════════════ POPUP ══════════════════════
     Native <dialog>: focus trapping, Escape and the backdrop are the
     browser's job. A dismissal is remembered so the same visitor is not
     asked twice. */
  const initPopup = (dlg) => {
    const key = dlg.dataset.storageKey;
    const remember = dlg.dataset.remember === 'true';
    try { if (remember && key && localStorage.getItem(key)) return; } catch { /* private mode */ }

    const open = () => { if (!dlg.open) dlg.showModal(); };
    const dismiss = () => {
      try { if (remember && key) localStorage.setItem(key, '1'); } catch { /* private mode */ }
      if (dlg.open) dlg.close();
    };

    dlg.querySelectorAll('[data-siwa-popup-close]').forEach(b => b.addEventListener('click', dismiss));
    dlg.addEventListener('close', dismiss);

    const step1 = dlg.querySelector('[data-popup-step="1"]');
    const step2 = dlg.querySelector('[data-popup-step="2"]');
    if (step1 && step2) {
      const yes = dlg.querySelector('[id$="-yes"], [id*="PopupYes"]');
      const no = dlg.querySelector('[id$="-no"], [id*="PopupNo"]');
      if (yes) yes.addEventListener('click', () => { step1.hidden = true; step2.hidden = false; });
      if (no) no.addEventListener('click', dismiss);
    }

    const trigger = dlg.dataset.trigger;
    if (trigger === 'exit') {
      document.addEventListener('mouseout', function once(e) {
        if (e.clientY <= 0) { open(); document.removeEventListener('mouseout', once); }
      });
    } else if (trigger === 'scroll') {
      const pct = Number(dlg.dataset.scrollPercent || 50);
      const onScroll = () => {
        const scrolled = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
        if (scrolled >= pct) { open(); window.removeEventListener('scroll', onScroll); }
      };
      window.addEventListener('scroll', onScroll, { passive: true });
    } else {
      setTimeout(open, Number(dlg.dataset.delay || 5000));
    }
  };

  /* ══════════════════════ COLLECTION FACETS ══════════════════════
     Progressive enhancement over a real <form>. With JS off the form
     submits and the page reloads with the filters applied. */
  const initCollection = (root) => {
    const form = root.querySelector('[data-facet-form]');
    if (!form) return;
    const sectionId = root.dataset.sectionId;
    let controller = null;

    const apply = async () => {
      const params = new URLSearchParams(new FormData(form)).toString();
      const url = `${window.location.pathname}?${params}`;
      if (controller) controller.abort();
      controller = new AbortController();
      root.setAttribute('aria-busy', 'true');
      try {
        const res = await fetch(`${url}&section_id=${sectionId}`, { signal: controller.signal });
        if (!res.ok) throw new Error(String(res.status));
        const html = new DOMParser().parseFromString(await res.text(), 'text/html');
        const next = html.querySelector(`#CollectionGrid-${sectionId}`);
        if (next) root.innerHTML = next.innerHTML;
        window.history.replaceState({}, '', url);
        boot(root);
      } catch (e) {
        // Aborted requests are expected when filters change quickly.
        if (e.name !== 'AbortError') window.location.href = url;
      } finally {
        root.removeAttribute('aria-busy');
      }
    };

    form.addEventListener('change', (e) => { e.preventDefault(); apply(); });
    form.addEventListener('submit', (e) => { e.preventDefault(); apply(); });
    const sort = root.querySelector('[data-facet-sort]');
    if (sort) sort.addEventListener('change', apply);
  };

  /* ══════════════════════ PDP GALLERY ══════════════════════ */
  const initGallery = (root) => {
    const thumbs = [...root.querySelectorAll('[data-gallery-thumb]')];
    const slides = [...root.querySelectorAll('[data-gallery-slide]')];
    if (!thumbs.length) return;
    thumbs.forEach((thumb, i) => thumb.addEventListener('click', () => {
      thumbs.forEach((t2, k) => t2.setAttribute('aria-current', k === i ? 'true' : 'false'));
      slides.forEach((s, k) => { s.hidden = k !== i; });
    }));
  };

  /* ══════════════════════ STICKY BUY BAR ══════════════════════ */
  const initBuyBar = (bar) => {
    const anchor = document.querySelector('[id^="ProductForm-"]');
    if (!anchor) return;
    const io = new IntersectionObserver(([entry]) => { bar.hidden = entry.isIntersecting; },
      { rootMargin: '0px 0px -80% 0px' });
    io.observe(anchor);
  };

  /* ══════════════════════ SHARE ══════════════════════ */
  const initShare = (btn) => {
    btn.addEventListener('click', async () => {
      const data = { title: btn.dataset.shareTitle, url: btn.dataset.shareUrl };
      if (navigator.share) { try { await navigator.share(data); } catch { /* dismissed */ } }
      else if (navigator.clipboard) { try { await navigator.clipboard.writeText(data.url); } catch { /* denied */ } }
    });
  };

  /* ══════════════════════ PARALLAX ══════════════════════
     One rAF loop, transform only, and disabled outright for coarse
     pointers and reduced-motion users. */
  const initParallax = (root) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const media = root.querySelector('.pimg');
    if (!media) return;
    let ticking = false;
    const update = () => {
      const rect = root.getBoundingClientRect();
      const offset = (rect.top / window.innerHeight) * 40;
      media.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  };


  /* ══════════════════════ REVEAL ══════════════════════
     IntersectionObserver, one class toggle, no scroll handler. Elements
     are unobserved once revealed — an observer that keeps firing for the
     life of the page is a scroll jank generator. */
  const initReveal = (scope) => {
    const targets = scope.querySelectorAll('[data-reveal], [data-reveal-line]');
    if (!targets.length) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      targets.forEach(el => el.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.05 });
    targets.forEach(el => io.observe(el));
  };

  /* ══════════════════════ RECENTLY VIEWED ══════════════════════
     Handles only, in localStorage, on the visitor's own device — nothing
     is sent anywhere. The section stays hidden until it actually has
     products, so a first-time visitor never sees an empty heading and
     the page never shifts. */
  const RECENT_KEY = 'siwa:recently-viewed';

  const recordRecentlyViewed = () => {
    const el = document.querySelector('[data-product-handle-current]');
    const handle = el && el.dataset.productHandleCurrent;
    if (!handle) return;
    try {
      const list = JSON.parse(localStorage.getItem(RECENT_KEY) || '[]');
      const next = [handle, ...list.filter(h => h !== handle)].slice(0, 20);
      localStorage.setItem(RECENT_KEY, JSON.stringify(next));
    } catch { /* private mode — recently-viewed simply does not build up */ }
  };

  const initRecent = (root) => {
    let handles = [];
    try {
      handles = JSON.parse(localStorage.getItem(root.dataset.storageKey || RECENT_KEY) || '[]');
    } catch { return; }
    if (!handles.length) return;

    // The product being viewed right now is not "recent", it is "here".
    const current = document.querySelector('[data-product-handle-current]');
    if (current) handles = handles.filter(h => h !== current.dataset.productHandleCurrent);

    const limit = Number(root.dataset.limit || 4);
    let shown = 0;

    handles.forEach((handle) => {
      if (shown >= limit) return;
      const item = root.querySelector(`[data-recent-item="${CSS.escape(handle)}"]`);
      if (!item) return;              // not in the candidate set, or unpublished
      item.hidden = false;
      item.style.order = String(shown); // visit order, without moving any DOM
      shown += 1;
    });

    if (shown > 0) {
      root.hidden = false;
      initReveal(root);
    }
    // shown === 0 -> the section stays hidden. An empty recently-viewed
    // row is worse than no section at all.
  };

  /* ══════════════════════ BOOT ══════════════════════ */
  const boot = (scope = document) => {
    scope.querySelectorAll('[data-siwa-tabs]').forEach(initTabs);
    scope.querySelectorAll('[data-siwa-carousel]').forEach(initCarousel);
    scope.querySelectorAll('[data-siwa-layering]').forEach(initLayering);
    scope.querySelectorAll('[data-siwa-quiz]').forEach(initQuiz);
    scope.querySelectorAll('[data-siwa-drawer]').forEach(initDrawer);
    scope.querySelectorAll('[data-siwa-mega]').forEach(initMega);
    scope.querySelectorAll('[data-siwa-slideshow]').forEach(el =>
      initRotator(el, '.hero', '[data-slide-dot]'));
    scope.querySelectorAll('[data-siwa-announcement]').forEach(el =>
      initRotator(el, '[data-announcement-slide]', null));
    scope.querySelectorAll('[data-siwa-countdown]').forEach(initCountdown);
    scope.querySelectorAll('[data-siwa-marquee]').forEach(initMarquee);
    scope.querySelectorAll('[data-siwa-popup]').forEach(initPopup);
    scope.querySelectorAll('[data-siwa-collection]').forEach(initCollection);
    scope.querySelectorAll('[data-gallery-main]').forEach(el => initGallery(el.closest('.gallery') || el));
    scope.querySelectorAll('[data-siwa-buybar]').forEach(initBuyBar);
    scope.querySelectorAll('[data-siwa-share]').forEach(initShare);
    scope.querySelectorAll('[data-siwa-parallax]').forEach(initParallax);
    scope.querySelectorAll('[data-siwa-recent]').forEach(initRecent);
    initReveal(scope);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { recordRecentlyViewed(); boot(); });
  } else {
    recordRecentlyViewed();
    boot();
  }

  // Theme editor re-renders a section without reloading the page.
  document.addEventListener('shopify:section:load', (e) => boot(e.target));
})();
