const themeSwitch = document.querySelector('.theme-switch');
const themeIcon = themeSwitch.querySelector('img');
const body = document.querySelector('body');

themeSwitch.addEventListener('click', (e) => {
  if (body.classList.contains('light')) {
    body.classList.remove('light');
    body.classList.add('dark');
    themeIcon.src = '/assets/icons/sun-icon.svg';
    return;
  }

  if (body.classList.contains('dark')) {
    body.classList.remove('dark');
    body.classList.add('light');
    themeIcon.src = '/assets/icons/moon-icon.svg';
    return;
  }
});
