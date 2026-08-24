(() => {
  const elements = document.querySelectorAll('.phlur-discovery .scroll-trigger.animate--slide-in');
  if (!elements.length) return;

  const reveal = (element) => element.classList.remove('scroll-trigger--offscreen');
  const revealAll = () => elements.forEach(reveal);

  // This image sits well below the fold. Full-page capture does not always
  // produce a scroll event, so promote only this section's image from lazy.
  document.querySelectorAll('.phlur-discovery img[loading="lazy"]').forEach((image) => {
    image.loading = 'eager';
  });

  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    revealAll();
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      reveal(entry.target);
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '200px 0px' });

  elements.forEach((element) => {
    element.classList.add('scroll-trigger--offscreen');
    observer.observe(element);
  });

  // Never leave content hidden when a browser captures the full document
  // without scrolling or suspends IntersectionObserver delivery.
  window.addEventListener('load', () => window.setTimeout(revealAll, 300), { once: true });
  window.setTimeout(revealAll, 1200);
})();
