/* ============================================================================
   siwa-theme.js — the behaviour layer.

   The Siwa Design System ships CSS only. Every interactive contract its
   stylesheets imply — the mobile nav drawer, the mega menu's `hidden`/
   `aria-expanded` pair, dialogs, the scrim, scroll reveals, the live region —
   is implemented here, once, for every section.

   Contract for section authors. Wire markup to these attributes; do not write
   per-section JavaScript for any of it.

     data-siwa-toggle="<id>"      button that opens/closes the element with that
                                  id. The script maintains aria-expanded on the
                                  button and the `hidden` attribute on the panel.
     data-siwa-drawer="<id>"      same, for a `.siwa-drawer` panel: adds
                                  `.is-open`, shows the scrim, traps focus,
                                  locks background scroll, closes on Escape and
                                  on a scrim click.
     data-siwa-dialog="<id>"      same, for a <dialog> — uses showModal() so the
                                  platform provides the trap and the Escape key.
     data-siwa-close              any element inside a panel that closes it.
     .siwa-reveal                 revealed on scroll by IntersectionObserver.
     data-siwa-announce="polite"  the element's text is copied into the shared
                                  live region whenever it changes.

   Rules this file keeps so components do not have to:
     · Focus returns to the invoker on close, every time.
     · Escape closes the topmost open thing and nothing else.
     · Background scroll is locked only while something modal is open, and the
       lock is reference-counted so two overlapping panels cannot leave the page
       permanently frozen.
     · Reduced motion is respected: reveals resolve to their end state at once.
     · Everything degrades. Without this file the mega menu stays closed but the
       links are still reachable, and `.siwa-reveal` content is visible because
       the hidden start state only applies under `.js`.
   ========================================================================== */

(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ── Focus management ──────────────────────────────────────────────────── */

  var FOCUSABLE = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled]):not([type="hidden"])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(',');

  function focusableWithin(root) {
    return Array.prototype.filter.call(root.querySelectorAll(FOCUSABLE), function (el) {
      return el.offsetWidth > 0 || el.offsetHeight > 0 || el === document.activeElement;
    });
  }

  /* ── Scroll lock, reference counted ────────────────────────────────────── */

  var lockCount = 0;

  function lockScroll() {
    if (lockCount === 0) {
      var scrollbar = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      if (scrollbar > 0) document.body.style.paddingInlineEnd = scrollbar + 'px';
    }
    lockCount += 1;
  }

  function unlockScroll() {
    lockCount = Math.max(0, lockCount - 1);
    if (lockCount === 0) {
      document.body.style.overflow = '';
      document.body.style.paddingInlineEnd = '';
    }
  }

  /* ── The open-panel stack ──────────────────────────────────────────────
     Escape and outside-clicks always act on the topmost entry, so a filter
     drawer opened from inside a modal closes in the order the customer expects.
     ---------------------------------------------------------------------- */

  var stack = [];

  function scrim() {
    var el = document.querySelector('.siwa-scrim');
    if (!el) {
      el = document.createElement('div');
      el.className = 'siwa-scrim';
      el.setAttribute('aria-hidden', 'true');
      document.body.appendChild(el);
    }
    return el;
  }

  function open(entry) {
    stack.push(entry);
    if (entry.trigger) entry.trigger.setAttribute('aria-expanded', 'true');

    if (entry.modal) {
      lockScroll();
      scrim().classList.add('is-open');
    }

    if (entry.type === 'dialog' && typeof entry.panel.showModal === 'function') {
      entry.panel.showModal();
    } else {
      entry.panel.removeAttribute('hidden');
      if (entry.type === 'drawer') entry.panel.classList.add('is-open');
    }

    var first = focusableWithin(entry.panel)[0];
    if (first) first.focus();
  }

  function close(entry) {
    var index = stack.indexOf(entry);
    if (index === -1) return;
    stack.splice(index, 1);

    if (entry.trigger) entry.trigger.setAttribute('aria-expanded', 'false');

    if (entry.type === 'dialog' && typeof entry.panel.close === 'function') {
      if (entry.panel.open) entry.panel.close();
    } else if (entry.type === 'drawer') {
      // A drawer is hidden by losing `.is-open` — the stylesheet translates it
      // off the inline axis. Adding `hidden` as well would leave a rendered
      // element permanently carrying the attribute, which is an authoring error
      // even when it looks right.
      entry.panel.classList.remove('is-open');
    } else {
      entry.panel.setAttribute('hidden', '');
    }

    if (entry.modal) {
      unlockScroll();
      if (!stack.some(function (e) { return e.modal; })) {
        scrim().classList.remove('is-open');
      }
    }

    // Focus returns to whatever opened this. Not doing so drops a keyboard user
    // at the top of the document with no idea where they were.
    if (entry.trigger && document.body.contains(entry.trigger)) entry.trigger.focus();
  }

  function entryFor(trigger, panel, type) {
    return {
      trigger: trigger,
      panel: panel,
      type: type,
      modal: type === 'drawer' || type === 'dialog',
    };
  }

  function findEntry(panel) {
    for (var i = 0; i < stack.length; i += 1) {
      if (stack[i].panel === panel) return stack[i];
    }
    return null;
  }

  /* ── Wiring ────────────────────────────────────────────────────────────── */

  function typeOf(trigger) {
    if (trigger.hasAttribute('data-siwa-drawer')) return 'drawer';
    if (trigger.hasAttribute('data-siwa-dialog')) return 'dialog';
    return 'panel';
  }

  function panelIdOf(trigger) {
    return (
      trigger.getAttribute('data-siwa-toggle') ||
      trigger.getAttribute('data-siwa-drawer') ||
      trigger.getAttribute('data-siwa-dialog')
    );
  }

  document.addEventListener('click', function (event) {
    var closer = event.target.closest('[data-siwa-close]');
    if (closer) {
      var panel = closer.closest('[data-siwa-panel]') || closer.closest('dialog, .siwa-drawer');
      var openEntry = panel && findEntry(panel);
      if (openEntry) {
        event.preventDefault();
        close(openEntry);
        return;
      }
    }

    var trigger = event.target.closest(
      '[data-siwa-toggle],[data-siwa-drawer],[data-siwa-dialog]'
    );
    if (trigger) {
      var target = document.getElementById(panelIdOf(trigger));
      if (!target) return;
      event.preventDefault();
      var existing = findEntry(target);
      if (existing) {
        close(existing);
      } else {
        // Mutual exclusion. Two mega menus, or a mega menu and the search
        // panel, both anchor at `inset-block-start: 100%` and would overlap.
        // Only sibling panels close — a panel nested inside another (the mega
        // menu inside the mobile drawer) stays open.
        stack
          .slice()
          .filter(function (e) {
            return !e.modal && !e.panel.contains(target) && e.panel !== target;
          })
          .forEach(close);
        open(entryFor(trigger, target, typeOf(trigger)));
      }
      return;
    }

    // A click anywhere else dismisses open non-modal panels. Modal things keep
    // the scrim for that job, which also stops a stray click from tearing down
    // a drawer mid-task.
    stack
      .slice()
      .filter(function (e) {
        return !e.modal && !e.panel.contains(event.target) && !e.trigger.contains(event.target);
      })
      .forEach(close);

    // A click on the scrim closes the topmost modal thing.
    if (event.target.classList && event.target.classList.contains('siwa-scrim')) {
      for (var i = stack.length - 1; i >= 0; i -= 1) {
        if (stack[i].modal) {
          close(stack[i]);
          return;
        }
      }
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.key !== 'Escape' && event.key !== 'Esc') return;
    if (!stack.length) return;
    // <dialog> handles its own Escape; closing it here as well would fire twice.
    var top = stack[stack.length - 1];
    if (top.type === 'dialog') return;
    event.preventDefault();
    close(top);
  });

  /** The topmost modal entry, ignoring any non-modal panel opened above it. */
  function topmostModal() {
    for (var i = stack.length - 1; i >= 0; i -= 1) {
      if (stack[i].modal) return stack[i];
    }
    return null;
  }

  // Focus trap for drawers and non-native dialogs.
  document.addEventListener('keydown', function (event) {
    if (event.key !== 'Tab' || !stack.length) return;

    // Trap against the topmost *modal*, not the topmost entry. A mega menu
    // opened inside the mobile drawer pushes a non-modal panel on top; keying
    // off the stack head there silently released the trap in exactly the case a
    // phone user meets first.
    var top = topmostModal();
    if (!top || top.type === 'dialog') return;

    var items = focusableWithin(top.panel);
    if (!items.length) return;
    var first = items[0];
    var last = items[items.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  // A natively-closed <dialog> (Escape, form method=dialog) must still leave the
  // stack, or the scroll lock never unwinds.
  document.addEventListener(
    'close',
    function (event) {
      var openEntry = findEntry(event.target);
      if (openEntry) close(openEntry);
    },
    true
  );

  /* ── Scroll reveals ────────────────────────────────────────────────────── */

  function initReveals() {
    var targets = document.querySelectorAll('.siwa-reveal:not(.is-visible)');
    if (!targets.length) return;

    // Content is never withheld behind an animation that will not play.
    if (reduceMotion.matches || !('IntersectionObserver' in window)) {
      Array.prototype.forEach.call(targets, function (el) { el.classList.add('is-visible'); });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
    );

    Array.prototype.forEach.call(targets, function (el) { observer.observe(el); });
  }

  /* ── The shared live region ────────────────────────────────────────────── */

  function announce(message) {
    var region = document.getElementById('siwa-live-region');
    if (!region || !message) return;
    // Clearing first forces a re-announcement when the text is unchanged.
    region.textContent = '';
    window.setTimeout(function () { region.textContent = message; }, 60);
  }

  // The Theme Editor re-runs init on every section reload. Without this, each
  // reload attached another observer to the same node and one cart change
  // announced twice, then three times.
  var watched = new WeakSet();

  function initAnnouncers() {
    if (!('MutationObserver' in window)) return;
    var nodes = document.querySelectorAll('[data-siwa-announce]');
    Array.prototype.forEach.call(nodes, function (node) {
      if (watched.has(node)) return;
      watched.add(node);
      new MutationObserver(function () {
        announce(node.textContent.trim());
      }).observe(node, { childList: true, characterData: true, subtree: true });
    });
  }

  /* ── Boot ──────────────────────────────────────────────────────────────── */

  function init() {
    initReveals();
    initAnnouncers();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // The Theme Editor tears sections down and rebuilds them; anything opened in
  // a removed section has to leave the stack or the scroll lock leaks.
  document.addEventListener('shopify:section:load', init);
  document.addEventListener('shopify:section:unload', function (event) {
    stack
      .filter(function (entry) { return event.target.contains(entry.panel); })
      .forEach(close);
  });

  window.SiwaTheme = { announce: announce, refresh: init };
})();
