(() => {
  const init = root => {
    if (root.dataset.reviewsReady) return;
    root.dataset.reviewsReady = 'true';
    const summaryToggle = root.querySelector('[data-summary-toggle]');
    summaryToggle?.addEventListener('click', () => {
      const open = summaryToggle.getAttribute('aria-expanded') !== 'true';
      summaryToggle.setAttribute('aria-expanded', String(open));
      root.querySelector('.oke-reviewsSummary-content')?.classList.toggle('is-clamped', !open);
    });
    root.querySelectorAll('[data-review-body]').forEach(body => {
      const button = body.nextElementSibling;
      if (body.textContent.length < 150) return;
      body.classList.add('is-clamped');
      button.hidden = false;
      button.addEventListener('click', () => {
        const open = button.getAttribute('aria-expanded') !== 'true';
        button.setAttribute('aria-expanded', String(open));
        body.classList.toggle('is-clamped', !open);
        button.textContent = open ? 'Read Less' : 'Read More';
      });
    });
    root.querySelectorAll('.oke-helpful').forEach(group => group.addEventListener('click', event => {
      const button = event.target.closest('[data-helpful]');
      if (!button) return;
      group.querySelectorAll('[data-helpful]').forEach(item => item.setAttribute('aria-pressed', String(item === button && item.getAttribute('aria-pressed') !== 'true')));
    }));
    const list = root.querySelector('.oke-w-reviews-list');
    root.querySelector('[data-review-sort]')?.addEventListener('change', event => {
      [...list.children].sort((a, b) => event.target.value === 'lowest' ? a.dataset.rating - b.dataset.rating : event.target.value === 'highest' ? b.dataset.rating - a.dataset.rating : a.dataset.index - b.dataset.index).forEach(item => list.append(item));
    });
    root.querySelector('[data-show-more]')?.addEventListener('click', event => {
      root.querySelectorAll('[data-review-item][hidden]').forEach(item => item.hidden = false);
      event.currentTarget.hidden = true;
    });
  };
  const boot = scope => scope.querySelectorAll('[data-product-reviews]').forEach(init);
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', () => boot(document), { once: true }) : boot(document);
  new MutationObserver(records => records.forEach(record => record.addedNodes.forEach(node => node.nodeType === 1 && (node.matches?.('[data-product-reviews]') ? init(node) : boot(node))))).observe(document.documentElement, { childList: true, subtree: true });
})();
