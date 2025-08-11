(function(){
  const root = document.documentElement;
  function start(){
    root.classList.add('preloading');
    const pre = document.createElement('div');
    pre.id = 'preloader';
    pre.setAttribute('aria-label','Chargement du site');
    pre.innerHTML = `
      <svg class="hud" viewBox="0 0 200 200" role="img" aria-label="Animation HUD">
        <defs><clipPath id="circleClip"><circle cx="100" cy="100" r="84"/></clipPath></defs>
        <circle cx="100" cy="100" r="84" class="ring"/>
        <g class="scanner" clip-path="url(#circleClip)"><rect x="0" y="0" width="200" height="200" class="scan-bar"/></g>
        <g class="glow"><circle cx="100" cy="100" r="84" class="ring2"/></g>
        <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" class="logo-text">aCaP' Copeaux</text>
      </svg>`;
    document.body.prepend(pre);
    setTimeout(()=>{
      root.classList.remove('preloading');
      root.classList.add('ready');
      pre.classList.add('hide');
      setTimeout(()=> pre.remove(), 350);
    }, 2400);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
