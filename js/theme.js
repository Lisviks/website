const themeSwitch = document.querySelector('.theme-switch');
const themeIcon = themeSwitch.querySelector('img');
const body = document.querySelector('body');

window.addEventListener('DOMContentLoaded', (e) => {
  const lsTheme = localStorage.getItem('deividas.blog-theme');

  if (lsTheme !== null) {
    body.classList.add(lsTheme);
  } else {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      body.classList.add('light');
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      body.classList.add('dark');
    }
  }
});

themeSwitch.addEventListener('click', (e) => {
  // Switch to dark theme
  if (body.classList.contains('light')) {
    body.classList.remove('light');
    body.classList.add('dark');
    themeIcon.src = '/assets/icons/sun-icon.svg';
    localStorage.setItem('deividas.blog-theme', 'dark');
    return;
  }

  // Switch to light theme
  if (body.classList.contains('dark')) {
    body.classList.remove('dark');
    body.classList.add('light');
    themeIcon.src = '/assets/icons/moon-icon.svg';
    localStorage.setItem('deividas.blog-theme', 'light');
    return;
  }
});
