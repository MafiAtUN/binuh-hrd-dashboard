onDashboardReady(() => {
  const q = cur();
  const p = prev();
  setKpi('kpi-total', q.total);
  setKpi('kpi-killed', q.killed);
  setKpi('kpi-injured', q.injured);
  setKpi('kpi-abducted', q.abducted);
  setKpi('kpi-gangs', q.by_perpetrator?.Gangs || 0);

  const chEl = document.getElementById('kpi-total-change');
  if (chEl && p) chEl.innerHTML = changeHtml(q.total, p.total);

  plotChart('chart-violation-donut', [donutTrace(
    ['Killed','Injured','Abducted'], [q.killed, q.injured, q.abducted],
    [C.killed, C.injured, C.abducted]
  )], {...pieLayout(300), annotations:[{text:`<b>${fmt(q.total)}</b><br><span style="font-size:11px">victims</span>`,x:0.5,y:0.5,showarrow:false,font:{color:C.text}}]});

  const g = q.gender;
  plotChart('chart-gender-donut', [donutTrace(
    ['Men','Women','Boys','Girls'], [g.male, g.female, g.boys, g.girls],
    [C.male, C.female, C.boys, C.girls]
  )], pieLayout(300));

  const trend = D.quarterly_trend || [];
  plotChart('chart-quarterly', [{
    type:'bar', x:trend.map(t=>t.label),
    y:trend.map(t=>t.total), marker:{color:C.accent},
    name:'Victims',
  }], {...baseLayout(), height:360});

  plotChart('chart-perp-donut', [donutTrace(
    Object.keys(q.by_perpetrator||{}), Object.values(q.by_perpetrator||{}),
    Object.keys(q.by_perpetrator||{}).map(perpColor)
  )], pieLayout(300));

  const months = MONTHS.filter(m => D.monthly?.[m]);
  if (months.length) {
    plotChart('chart-monthly', [
      {name:'Killed',x:months,y:months.map(m=>D.monthly[m].killed),type:'bar',marker:{color:C.killed}},
      {name:'Injured',x:months,y:months.map(m=>D.monthly[m].injured),type:'bar',marker:{color:C.injured}},
      {name:'Abducted',x:months,y:months.map(m=>D.monthly[m].abducted),type:'bar',marker:{color:C.abducted}},
    ], {...baseLayout(), barmode:'stack', height:360});
  }

  const top = sortedCommunes(10);
  plotChart('chart-commune-bar', [{
    type:'bar', orientation:'h', y:top.map(t=>t[0]).reverse(), x:top.map(t=>t[1].total).reverse(),
    marker:{color:C.accent},
  }], {...baseLayout(), height:400, margin:{l:160}});

  const ins = document.getElementById('insights');
  if (ins && top[0]) {
    ins.innerHTML = `<ul class="insight-list">
      <li><strong>${fmt(q.total)}</strong> victims documented in ${D.meta?.period_label || 'the reporting period'}.</li>
      <li>Killed: <strong>${fmt(q.killed)}</strong> (${pctN(q.killed,q.total)}%) · Injured: <strong>${fmt(q.injured)}</strong> · Abducted: <strong>${fmt(q.abducted)}</strong></li>
      <li>Most affected commune: <strong>${top[0][0]}</strong> (${fmt(top[0][1].total)} victims).</li>
      <li>Gangs attributed to <strong>${pctN(q.by_perpetrator?.Gangs||0, q.total)}%</strong> of victims in this quarter.</li>
    </ul>`;
  }
  document.querySelectorAll('[data-count]').forEach(el => animateCounter(el, +el.dataset.count));
});
