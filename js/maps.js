const TILE_URL = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
const MAP_CENTER = [18.55, -72.35];
const MAP_ZOOM = 10;
const HT_BOUNDS = L.latLngBounds([[18.0, -74.0], [20.2, -71.5]]);

let map = null, markers = [];

function buildMap() {
  if (map) map.remove();
  map = L.map('map-container', { center: MAP_CENTER, zoom: MAP_ZOOM, maxBounds: HT_BOUNDS, minZoom: 8 });
  L.tileLayer(TILE_URL, { attribution: '© OSM © CARTO' }).addTo(map);
  updateMap();
}

function updateMap() {
  markers.forEach(m => map.removeLayer(m));
  markers = [];
  const monthF = document.getElementById('month-filter')?.value || 'all';
  const violF = document.getElementById('viol-filter')?.value || 'all';
  const perpF = document.getElementById('perp-filter')?.value || 'all';
  const locs = D.all_locations || D.locations || [];

  locs.forEach(loc => {
    if (monthF !== 'all' && !(loc.months||[]).includes(monthF)) return;
    if (violF !== 'all' && loc.violation !== violF) return;
    if (perpF !== 'all' && loc.perpetrator !== perpF) return;
    if (!loc.lat || !loc.lon) return;
    const r = Math.max(6, Math.min(40, Math.sqrt(loc.victims) * 4));
    const m = L.circleMarker([loc.lat, loc.lon], {
      radius: r, fillColor: vColor(loc.violation), color: '#fff', weight: 1, fillOpacity: 0.75,
    }).bindPopup(`<b>${loc.commune}</b><br>${loc.violation}<br>${loc.perpetrator}<br>${loc.victims} victims`);
    m.addTo(map); markers.push(m);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const violSel = document.getElementById('viol-filter');
  const perpSel = document.getElementById('perp-filter');
  if (violSel) {
    ['all','killed','injured','abducted'].forEach(v => {
      const o = document.createElement('option'); o.value = v;
      o.textContent = v === 'all' ? 'All violations' : v.charAt(0).toUpperCase() + v.slice(1);
      violSel.appendChild(o);
    });
  }
  if (perpSel) {
    [...new Set((D.all_locations||[]).map(l => l.perpetrator))].forEach(v => {
      const o = document.createElement('option'); o.value = v; o.textContent = v; perpSel.appendChild(o);
    });
    const all = document.createElement('option'); all.value = 'all'; all.textContent = 'All perpetrators';
    perpSel.insertBefore(all, perpSel.firstChild);
  }
  ['month-filter','viol-filter','perp-filter'].forEach(id => {
    document.getElementById(id)?.addEventListener('change', updateMap);
  });
  buildMap();
});
