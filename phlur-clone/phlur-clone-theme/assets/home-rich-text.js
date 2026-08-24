(() => {
  const selector = '.rich-text .scroll-trigger';
  const activate = (element) => element.classList.add('scroll-trigger--active');

  const observe = (root = document) => {
    const elements = [...root.querySelectorAll(selector)].filter((element) => !element.dataset.richTextObserved);
    if (!elements.length) return;

    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      elements.forEach(activate);
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        activate(entry.target);
        observer.unobserve(entry.target);
      });
    });

    elements.forEach((element) => {
      element.dataset.richTextObserved = 'true';
      observer.observe(element);
    });
  };

  observe();
  document.addEventListener('shopify:section:load', (event) => observe(event.target));
})();
