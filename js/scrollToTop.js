const btn = document.querySelector('.scroll-to-top-btn');

btn.addEventListener('click', (e) => {
  window.scrollY = 500;
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
