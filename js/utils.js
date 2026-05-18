/* BINUH HR Dashboard — shared utilities */
const C = {
  bg:'#0c1f3a', bgCard:'#122a4d', text:'#e8f1fa', textMuted:'#8ba8c4', accent:'#009EDB',
  collective_rape:'#f43f5e', rape:'#fb923c', pregnancy:'#c084fc', kidnapping_slavery:'#a78bfa',
  exploitation:'#34d399', other:'#94a3b8',
  female:'#f472b6', male:'#60a5fa', minor:'#93c5fd', adult:'#60a5fa', elderly:'#fbbf24',
  gangs:'#f43f5e', unknown:'#94a3b8', not_recorded:'#5a7a9a',
  months: { January:'#60a5fa', February:'#fbbf24', March:'#34d399' },
};
const SV_LABELS = {
  collective_rape:'Collective Rape', rape:'Rape', pregnancy:'Pregnancy-related',
  kidnapping_slavery:'Kidnapping / Slavery', exploitation:'Exploitation', other:'Other',
};
const DATA_SOURCE = 'Data source: Human Rights Section, UN Integrated Office in Haiti (BINUH)';

const baseLayout = (o={}) => ({
  paper_bgcolor:'rgba(0,0,0,0)', plot_bgcolor:'rgba(0,0,0,0)',
  font:{color:C.textMuted,family:'Inter,system-ui,sans-serif',size:12},
  xaxis:{gridcolor:'rgba(0,158,219,0.12)',color:C.textMuted,zeroline:false},
  yaxis:{gridcolor:'rgba(0,158,219,0.12)',color:C.textMuted,zeroline:false},
  legend:{bgcolor:'rgba(0,0,0,0)',font:{size:11,color:C.textMuted},orientation:'h',x:0,y:-0.18},
  margin:{t:30,r:16,b:50,l:60}, hovermode:'closest', ...o,
});
const plotlyConfig = { displayModeBar:false, responsive:true };
function makeChart(id, traces, layout, config={}) {
  Plotly.newPlot(id, traces, {...baseLayout(),...layout}, {...plotlyConfig,...config});
}
const D = typeof BINUH_DATA !== 'undefined' ? BINUH_DATA : {};
const MONTHS = ['January','February','March'];
function pct(p,w){ return w?Math.round(p/w*100)+'%':'0%'; }
function pctN(p,w){ return w?Math.round(p/w*100):0; }
function fmt(n){ return (n||0).toLocaleString(); }
function svColor(k){ return C[k]||C.other; }
function svLabel(k){ return SV_LABELS[k]||k; }
function perpColor(p){
  if(!p) return C.unknown;
  if(p==='Gangs') return C.gangs;
  if(p==='Not recorded') return C.not_recorded;
  return C.unknown;
}
function donutTrace(labels, values, colors, hole=0.52) {
  return { type:'pie', hole, labels, values, marker:{colors,line:{color:C.bg,width:2}},
    textinfo:'percent', hovertemplate:'<b>%{label}</b><br>%{value:,}<br>%{percent}<extra></extra>' };
}
function animateCounter(el, target, dur=1200) {
  const t0=performance.now();
  const step=now=>{ const p=Math.min((now-t0)/dur,1); el.textContent=fmt(Math.round(target*(1-Math.pow(1-p,3))));
    if(p<1) requestAnimationFrame(step); };
  requestAnimationFrame(step);
}
function setKpi(id,v){ const e=document.getElementById(id); if(e){e.dataset.count=v;} }
function highlightNav(){
  const page=window.location.pathname.split('/').pop()||'index.html';
  document.querySelectorAll('.nav-link').forEach(a=>{
    const h=a.getAttribute('href')||'';
    if(h===page||(page===''&&h==='index.html')) a.classList.add('active');
  });
}
function sortedCommunes(n=15){
  return Object.entries(D.by_commune||{}).sort((a,b)=>b[1].victims-a[1].victims).slice(0,n);
}
function downloadBlob(blob,fn){ const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download=fn; a.click(); }
function downloadJSON(o,fn='binuh-data.json'){ downloadBlob(new Blob([JSON.stringify(o,null,2)],{type:'application/json'}),fn); }
function downloadCSV(rows,fn='data.csv'){
  const csv=rows.map(r=>r.map(c=>`"${String(c).replace(/"/g,'""')}"`).join(',')).join('\n');
  downloadBlob(new Blob([csv],{type:'text/csv'}),fn);
}
function addChartDownloadButtons(container, chartEl, base) {
  if (!container || !chartEl || container.querySelector('.chart-download-actions')) return;
  const title = container.querySelector('.chart-title')?.textContent?.trim() || base;
  const div = document.createElement('div');
  div.className = 'chart-download-actions';
  div.innerHTML = '<button type="button" class="btn-download-chart">PNG</button><button type="button" class="btn-download-data">CSV</button>';
  div.querySelector('.btn-download-chart').onclick = () => {
    if (typeof html2canvas === 'undefined') { Plotly.downloadImage(chartEl, { format:'png', filename: base }); return; }
    const btns = div; btns.style.visibility = 'hidden';
    html2canvas(container, { useCORS:true, backgroundColor:'#122a4d', scale:2 }).then(canvas => {
      btns.style.visibility = ''; const a = document.createElement('a');
      a.download = base + '.png'; a.href = canvas.toDataURL('image/png'); a.click();
    }).catch(() => { btns.style.visibility = ''; Plotly.downloadImage(chartEl, { format:'png', filename: base }); });
  };
  div.querySelector('.btn-download-data').onclick = () => {
    const gd = chartEl; if (!gd._fullData?.[0]) return;
    const t = gd._fullData[0];
    let rows = [['Category', 'Value']];
    if (t.type === 'pie') t.labels.forEach((l, i) => rows.push([l, t.values[i]]));
    else if (t.type === 'bar') rows = [['Category', t.name || 'Value'], ...t.x.map((x, i) => [x, t.y[i]])];
    downloadCSV([[DATA_SOURCE], [], ...rows], base + '.csv');
  };
  const header = container.querySelector('.chart-header');
  (header || container).appendChild(div);
}
function initFooterDownloads(){
  const j=document.getElementById('dl-all-json'), c=document.getElementById('dl-summary-csv');
  if(j) j.onclick=e=>{e.preventDefault(); downloadJSON(BINUH_DATA,'binuh-hr-q1-2026-data.json');};
  if(c) c.onclick=e=>{
    e.preventDefault(); const q=D.q1;
    downloadCSV([[DATA_SOURCE],[],['Metric','Value'],['Incidents',q.incidents],['Victims',q.victims],
      ['Collective Rape victims',q.by_sv_normalized.collective_rape||0],['Rape victims',q.by_sv_normalized.rape||0],
      ['Gangs (victims)',q.by_perpetrator.Gangs||0]],'binuh-hr-q1-2026-summary.csv');
  };
}
function initCounters(){
  document.querySelectorAll('[data-count]').forEach(el=>{
    const obs=new IntersectionObserver(en=>{ if(en[0].isIntersecting){ animateCounter(el,+el.dataset.count); obs.disconnect(); }}, {threshold:0.3});
    obs.observe(el);
  });
}
window.addEventListener('load', () => {
  document.querySelectorAll('.plotly-chart').forEach(ch => {
    const wrap = ch.closest('.chart-wrap');
    if (wrap) addChartDownloadButtons(wrap, ch, ch.id || 'chart');
  });
});
document.addEventListener('DOMContentLoaded',()=>{ highlightNav(); initCounters(); initFooterDownloads(); });
