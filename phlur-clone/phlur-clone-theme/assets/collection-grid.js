(() => {
  const drawer = document.querySelector('[data-filter-drawer]');
  if (!drawer) return;
  const open = document.querySelector('[data-filter-open]');
  const close = drawer.querySelectorAll('[data-filter-close]');
  const setOpen = (value) => {
    drawer.classList.toggle('is-open', value);
    drawer.setAttribute('aria-hidden', String(!value));
    document.documentElement.style.overflow = value ? 'hidden' : '';
    if (value) drawer.querySelector('.phlur-filter-drawer__close')?.focus();
    else open?.focus();
  };
  open?.addEventListener('click', () => setOpen(true));
  close.forEach((el) => el.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && drawer.classList.contains('is-open')) setOpen(false);
  });
})();
