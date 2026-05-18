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
  const locs = D.locations || [];

  locs.forEach(loc => {
    if (monthF !== 'all' && !(loc.months || []).includes(monthF)) return;
    if (violF !== 'all' && loc.violation !== violF) return;
    if (perpF !== 'all' && loc.perpetrator !== perpF) return;
    if (!loc.lat || !loc.lon) return;
    const r = Math.max(6, Math.min(40, Math.sqrt(loc.victims) * 4));
    const m = L.circleMarker([loc.lat, loc.lon], {
      radius: r, fillColor: vColor(loc.violation), color: '#fff', weight: 1, fillOpacity: 0.75,
    }).bindPopup(`<b>${loc.commune}</b><br>${lblViol(loc.violation)}<br>${lblPerp(loc.perpetrator)}<br>${loc.victims} ${t('map.popup.victims')}`);
    m.addTo(map); markers.push(m);
  });
}

function renderMapFilters() {
  applyStaticI18n();
  const violSel = document.getElementById('viol-filter');
  const perpSel = document.getElementById('perp-filter');
  const monthSel = document.getElementById('month-filter');

  if (monthSel) {
    const cur = monthSel.value || 'all';
    monthSel.innerHTML = '';
    const all = document.createElement('option');
    all.value = 'all';
    all.textContent = t('map.month.all');
    monthSel.appendChild(all);
    ['January', 'February', 'March'].forEach(m => {
      const o = document.createElement('option');
      o.value = m;
      o.textContent = lblMonth(m);
      monthSel.appendChild(o);
    });
    monthSel.value = cur;
  }
  if (violSel) {
    violSel.innerHTML = '';
    ['all', 'killed', 'injured', 'abducted'].forEach(v => {
      const o = document.createElement('option');
      o.value = v;
      o.textContent = v === 'all' ? t('map.viol.all') : lblViol(v);
      violSel.appendChild(o);
    });
  }
  if (perpSel) {
    perpSel.innerHTML = '';
    const all = document.createElement('option');
    all.value = 'all';
    all.textContent = t('map.perp.all');
    perpSel.appendChild(all);
    [...new Set((D.all_locations || []).map(l => l.perpetrator))].forEach(v => {
      const o = document.createElement('option');
      o.value = v;
      o.textContent = lblPerp(v);
      perpSel.appendChild(o);
    });
  }
  updateMap();
}

function renderMaps() {
  renderMapFilters();
  if (!map) buildMap();
  else updateMap();
}

registerPageRenderer(renderMaps);

document.addEventListener('DOMContentLoaded', () => {
  if (typeof BINUH_DATA === 'undefined') return;
  ['month-filter', 'viol-filter', 'perp-filter'].forEach(id => {
    document.getElementById(id)?.addEventListener('change', updateMap);
  });
  onDashboardReady(renderMaps);
});
