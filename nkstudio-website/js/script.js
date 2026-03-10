window.addEventListener('scroll', () => {
  const nav = document.querySelector('.navbar');
  if (!nav) return;

  nav.style.boxShadow =
    window.scrollY > 30 ? '0 8px 24px rgba(0, 0, 0, 0.12)' : '0 2px 10px rgba(0, 0, 0, 0.05)';
});
