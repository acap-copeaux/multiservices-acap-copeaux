
async function loadReviews(){
  const mount = document.getElementById('reviewsList'); if(!mount) return;
  try{
    const cfg = await (await fetch('assets/data/config.json', {cache:'no-store'})).json();
    const local = await (await fetch('assets/data/reviews.json', {cache:'no-store'})).json();
    let cards = [];
    if(local && local.reviews){ cards = cards.concat(local.reviews.map(r=>({author:r.author,rating:r.rating,text:r.text,source:r.source,date:r.date}))); }
    if(cfg.google_places_api_key && cfg.place_id){
      const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${cfg.place_id}&fields=name,reviews,rating,user_ratings_total,url&language=fr&key=${cfg.google_places_api_key}`;
      const res = await fetch(url);
      if(res.ok){
        const data = await res.json();
        if(data && data.result && data.result.reviews){
          cards = cards.concat(data.result.reviews.map(rv=>({author:rv.author_name,rating:rv.rating,text:rv.text,source:'Google',date:new Date(rv.time*1000).toISOString().slice(0,10)})));
        }
      }
    }
    if(cards.length===0){ mount.innerHTML = '<p class="muted">Aucun avis à afficher pour le moment.</p>'; return; }
    mount.innerHTML = cards.slice(0,12).map(r=>`
      <article class="card">
        <div class="badge">★ ${Number(r.rating).toFixed(1)} / 5</div>
        <h3>${r.author}</h3>
        <p>${r.text}</p>
        <p style="color:var(--muted);font-size:14px">${r.source||''} ${r.date?('— '+r.date):''}</p>
      </article>
    `).join('');
  }catch(e){ mount.innerHTML = '<p class="error">Impossible de charger les avis pour le moment.</p>'; }
}
document.addEventListener('DOMContentLoaded', loadReviews);
