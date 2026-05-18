document.addEventListener('DOMContentLoaded', () => {
  const q = D.q1;
  const setCount = (id,n) => { const e=document.getElementById(id); if(e){e.dataset.count=n;} };
  setCount('kpi-incidents', q.incidents);
  setCount('kpi-victims', q.victims);
  setCount('kpi-collective', q.by_sv_normalized.collective_rape||0);
  setCount('kpi-rape', q.by_sv_normalized.rape||0);
  setCount('kpi-gangs', q.by_perpetrator.Gangs||0);

  const svKeys = Object.keys(q.by_sv_normalized);
  const svVals = svKeys.map(k => q.by_sv_normalized[k]);
  Plotly.newPlot('chart-sv-donut', [donutTrace(svKeys.map(svLabel), svVals, svKeys.map(svColor))],
    {...baseLayout(), height:340, margin:{t:20,r:10,b:30,l:10}, showlegend:true});

  const months = MONTHS.filter(m => D.monthly[m]);
  Plotly.newPlot('chart-monthly', [
    {name:'Incidents',x:months,y:months.map(m=>D.monthly[m].incidents),type:'bar',marker:{color:C.accent}},
    {name:'Victims',x:months,y:months.map(m=>D.monthly[m].victims),type:'bar',marker:{color:C.collective_rape}},
  ], {...baseLayout(), barmode:'group', height:360, title:{text:'Monthly trends',font:{size:13,color:C.textMuted}}});

  Plotly.newPlot('chart-perp-donut', [donutTrace(
    Object.keys(q.by_perpetrator), Object.values(q.by_perpetrator),
    Object.keys(q.by_perpetrator).map(p => perpColor(p))
  )], {...baseLayout(), height:340});

  const top = sortedCommunes(10);
  Plotly.newPlot('chart-commune-bar', [{
    type:'bar', orientation:'h', y:top.map(t=>t[0]).reverse(), x:top.map(t=>t[1].victims).reverse(),
    marker:{color:C.accent}, hovertemplate:'%{y}<br>%{x:,} victims<extra></extra>',
  }], {...baseLayout(), height:400, margin:{l:140}});

  const ins = document.getElementById('insights');
  if(ins){
    const topC = top[0];
    const jan = D.monthly.January, feb = D.monthly.February, mar = D.monthly.March;
    let momTxt = '';
    if (jan && feb) {
      const fp = pctN(feb.victims - jan.victims, jan.victims);
      momTxt = `<li>Victims rose from ${fmt(jan.victims)} (Jan) to ${fmt(feb.victims)} (Feb) — ${fp > 0 ? '+' : ''}${fp}%.</li>`;
    }
    if (feb && mar) {
      const mp = pctN(mar.victims - feb.victims, feb.victims);
      momTxt += `<li>March: ${fmt(mar.victims)} victims (${mp > 0 ? '+' : ''}${mp}% vs February).</li>`;
    }
    ins.innerHTML = `<ul class="insight-list">
      <li><strong>${fmt(q.victims)}</strong> victims across <strong>${fmt(q.incidents)}</strong> incidents (${D.meta?.period_label || 'Q1 2026'}).</li>
      <li>Most affected commune: <strong>${topC[0]}</strong> (${fmt(topC[1].victims)} victims).</li>
      <li>Gangs attributed in <strong>${pctN(q.by_perpetrator.Gangs||0, q.victims)}%</strong> of victim records.</li>
      <li>${q.pregnancy_incidents} incidents with pregnancy-related outcomes.</li>${momTxt}
    </ul>`;
  }
  const dq = D.data_quality;
  const dqSec = document.getElementById('data-quality-section');
  const dqEl = document.getElementById('data-quality');
  if (dq && dqSec && dqEl && (dq.missing_coords?.length || dq.age_mismatch?.length)) {
    dqSec.style.display = '';
    dqEl.innerHTML = `<ul class="insight-list">
      <li>${dq.missing_coords.length} incident(s) missing coordinates (IDs: ${dq.missing_coords.join(', ')}).</li>
      <li>${dq.age_mismatch.length} incident(s) where victim count ≠ age buckets (IDs: ${dq.age_mismatch.join(', ')}).</li>
    </ul>`;
  }
  document.querySelectorAll('[data-count]').forEach(el=> animateCounter(el, +el.dataset.count));
});
