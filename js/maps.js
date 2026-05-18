const TILE_URL = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
const TILE_FALLBACK = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const MAP_CENTER = [18.55, -72.35];
const MAP_ZOOM = 10;
const HT_BOUNDS = L.latLngBounds([[18.0, -74.0], [20.2, -71.5]]);

let map = null;
let markers = [];
let tileLayer = null;

function buildMap() {
  if (typeof L === 'undefined') {
    console.error('Leaflet failed to load. Map cannot render.');
    return;
  }
  const container = document.getElementById('map-container');
  if (!container) return;

  if (map) {
    map.remove();
    map = null;
    tileLayer = null;
    markers = [];
  }

  map = L.map('map-container', { center: MAP_CENTER, zoom: MAP_ZOOM, maxBounds: HT_BOUNDS, minZoom: 8 });
  tileLayer = L.tileLayer(TILE_URL, { attribution: '© OSM © CARTO', maxZoom: 19 });
  tileLayer.addTo(map);
  tileLayer.on('tileerror', () => {
    if (tileLayer && map.hasLayer(tileLayer)) map.removeLayer(tileLayer);
    tileLayer = L.tileLayer(TILE_FALLBACK, { attribution: '© OpenStreetMap', maxZoom: 19 });
    tileLayer.addTo(map);
  });

  updateMap();
  setTimeout(() => map?.invalidateSize(), 100);
}

function updateMap() {
  if (!map || typeof L === 'undefined') return;

  markers.forEach(m => map.removeLayer(m));
  markers = [];

  const monthF = document.getElementById('month-filter')?.value || 'all';
  const violF = document.getElementById('viol-filter')?.value || 'all';
  const perpF = document.getElementById('perp-filter')?.value || 'all';
  const locs = (typeof BINUH_DATA !== 'undefined' ? BINUH_DATA : D).locations || [];

  locs.forEach(loc => {
    if (monthF !== 'all' && !(loc.months || []).includes(monthF)) return;
    if (violF !== 'all' && loc.violation !== violF) return;
    if (perpF !== 'all' && loc.perpetrator !== perpF) return;
    const lat = parseFloat(loc.lat);
    const lon = parseFloat(loc.lon);
    if (!Number.isFinite(lat) || !Number.isFinite(lon)) return;

    const r = Math.max(6, Math.min(40, Math.sqrt(loc.victims) * 4));
    const m = L.circleMarker([lat, lon], {
      radius: r, fillColor: vColor(loc.violation), color: '#fff', weight: 1, fillOpacity: 0.75,
    }).bindPopup(`<b>${loc.commune}</b><br>${lblViol(loc.violation)}<br>${lblPerp(loc.perpetrator)}<br>${loc.victims} ${t('map.popup.victims')}`);
    m.addTo(map);
    markers.push(m);
  });

  if (markers.length) {
    const group = L.featureGroup(markers);
    map.fitBounds(group.getBounds().pad(0.12));
  } else {
    map.setView(MAP_CENTER, MAP_ZOOM);
  }
}

function renderMapFilters() {
  if (typeof applyStaticI18n === 'function') applyStaticI18n();

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
    const cur = violSel.value || 'all';
    violSel.innerHTML = '';
    ['all', 'killed', 'injured', 'abducted'].forEach(v => {
      const o = document.createElement('option');
      o.value = v;
      o.textContent = v === 'all' ? t('map.viol.all') : lblViol(v);
      violSel.appendChild(o);
    });
    violSel.value = cur;
  }
  if (perpSel) {
    const cur = perpSel.value || 'all';
    perpSel.innerHTML = '';
    const all = document.createElement('option');
    all.value = 'all';
    all.textContent = t('map.perp.all');
    perpSel.appendChild(all);
    [...new Set(((typeof BINUH_DATA !== 'undefined' ? BINUH_DATA : D).all_locations || []).map(l => l.perpetrator))].forEach(v => {
      const o = document.createElement('option');
      o.value = v;
      o.textContent = lblPerp(v);
      perpSel.appendChild(o);
    });
    perpSel.value = cur;
  }
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
