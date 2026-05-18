const TILE_URL = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
const MAP_CENTER = [18.55, -72.35];
const MAP_ZOOM = 10;
const HT_BOUNDS = L.latLngBounds([[18.0, -74.0], [20.2, -71.5]]);

let map = null, markers = [];

function svFill(k) {
  const c = svColor(k);
  return c.startsWith('#') ? c + 'b3' : 'rgba(0,158,219,0.7)';
}

function buildMap() {
  if(map) map.remove();
  map = L.map('map-container', { center: MAP_CENTER, zoom: MAP_ZOOM, maxBounds: HT_BOUNDS, minZoom: 8 });
  L.tileLayer(TILE_URL, { attribution: '© OSM © CARTO' }).addTo(map);
  updateMap();
}

function updateMap() {
  markers.forEach(m => map.removeLayer(m));
  markers = [];
  const monthF = document.getElementById('month-filter')?.value || 'all';
  const svF = document.getElementById('sv-filter')?.value || 'all';
  const perpF = document.getElementById('perp-filter')?.value || 'all';

  (D.locations||[]).forEach(loc => {
    if(monthF !== 'all' && !(loc.months||[]).includes(monthF)) return;
    if(svF !== 'all' && loc.sv_type !== svF) return;
    if(perpF !== 'all' && loc.perpetrator !== perpF) return;
    if(!loc.lat || !loc.lon) return;
    const r = Math.max(6, Math.min(40, Math.sqrt(loc.victims) * 4));
    const m = L.circleMarker([loc.lat, loc.lon], {
      radius: r, fillColor: svFill(loc.sv_type), color: '#fff', weight: 1, fillOpacity: 0.75,
    }).bindPopup(`<b>${loc.commune}</b><br>${svLabel(loc.sv_type)}<br>${loc.perpetrator}<br>${loc.victims} victims · ${loc.incidents} incidents`);
    m.addTo(map); markers.push(m);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const svSel = document.getElementById('sv-filter');
  const perpSel = document.getElementById('perp-filter');
  if(svSel){
    ['all',...new Set((D.locations||[]).map(l=>l.sv_type))].forEach(v=>{
      const o=document.createElement('option'); o.value=v; o.textContent=v==='all'?'All types':svLabel(v); svSel.appendChild(o);
    });
  }
  if(perpSel){
    ['all',...new Set((D.locations||[]).map(l=>l.perpetrator))].forEach(v=>{
      const o=document.createElement('option'); o.value=v; o.textContent=v==='all'?'All perpetrators':v; perpSel.appendChild(o);
    });
  }
  ['month-filter','sv-filter','perp-filter'].forEach(id=>{
    document.getElementById(id)?.addEventListener('change', updateMap);
  });
  buildMap();
});
