
(function(){
  const themeBtn = document.getElementById('themeSwitch');
  const menuBtn = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');
  const root = document.documentElement;
  const stored = localStorage.getItem('theme'); if (stored) root.setAttribute('data-theme', stored);
  if (themeBtn){ themeBtn.addEventListener('click', ()=>{ const cur = root.getAttribute('data-theme')==='light' ? 'dark' : 'light'; root.setAttribute('data-theme', cur); localStorage.setItem('theme', cur); });}
  if (menuBtn){ menuBtn.addEventListener('click', ()=> nav.classList.toggle('open'));}
})();