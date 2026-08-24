(() => {
  const initialize = (root = document) => root.querySelectorAll('[data-featured-collection]').forEach((section) => {
    if (section.dataset.featuredReady) return;
    section.dataset.featuredReady = 'true';
    const track = section.querySelector('[data-featured-track]');
    const previous = section.querySelector('[data-featured-prev]');
    const next = section.querySelector('[data-featured-next]');
    if (!track || !previous || !next) return;
    const distance = () => {
      const slide = track.querySelector('.featured-collection__slide');
      return slide ? slide.getBoundingClientRect().width + 16 : track.clientWidth;
    };
    const update = () => {
      const atStart = track.scrollLeft <= 2;
      const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
      previous.setAttribute('aria-disabled', String(atStart));
      next.setAttribute('aria-disabled', String(atEnd));
      previous.tabIndex = atStart ? -1 : 0;
      next.tabIndex = atEnd ? -1 : 0;
      previous.classList.toggle('swiper-button-disabled', atStart);
      next.classList.toggle('swiper-button-disabled', atEnd);
    };
    previous.addEventListener('click', () => track.scrollBy({ left: -distance(), behavior: 'smooth' }));
    next.addEventListener('click', () => track.scrollBy({ left: distance(), behavior: 'smooth' }));
    track.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    update();
  });
  document.addEventListener('DOMContentLoaded', () => initialize());
  document.addEventListener('shopify:section:load', (event) => initialize(event.target));
})();
