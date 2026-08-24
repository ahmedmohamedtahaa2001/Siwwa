(() => {
  const init = (root = document) => root.querySelectorAll('[data-home-carousel]').forEach((track) => {
    if (track.dataset.carouselReady) return;
    track.dataset.carouselReady = 'true';
    const section = track.closest('.home-products');
    const distance = () => track.querySelector('.home-products__item')?.getBoundingClientRect().width || track.clientWidth;
    section?.querySelector('[data-carousel-prev]')?.addEventListener('click', () => track.scrollBy({ left: -distance(), behavior: 'smooth' }));
    section?.querySelector('[data-carousel-next]')?.addEventListener('click', () => track.scrollBy({ left: distance(), behavior: 'smooth' }));
  });
  document.addEventListener('DOMContentLoaded', () => init());
  document.addEventListener('shopify:section:load', (event) => init(event.target));
})();
