const GEO_CHARTS = {
  'chart-commune-victims': { title: 'chart.commune_victims.title', sub: 'chart.commune_victims.sub', explain: 'chart.commune_victims.explain' },
  'chart-commune-incidents': { title: 'chart.commune_incidents.title', sub: 'chart.commune_incidents.sub', explain: 'chart.commune_incidents.explain' },
};

function renderGeographic() {
  enhanceChartWraps(GEO_CHARTS);
  applyStaticI18n();

  const top = sortedCommunes(15);
  setKpi('kpi-communes', Object.keys(D.by_commune || {}).length);
  if (top[0]) {
    setKpi('kpi-top-commune-v', top[0][1].total);
    document.getElementById('kpi-top-commune-n').textContent = top[0][0];
    animateCounter(document.getElementById('kpi-top-commune-v'), top[0][1].total);
  }
  animateCounter(document.getElementById('kpi-communes'), Object.keys(D.by_commune || {}).length);

  const names = top.map(t => t[0]).reverse();
  Promise.all([
    plotChart('chart-commune-victims', [{
      type: 'bar', orientation: 'h', y: names, x: top.map(t => t[1].total).reverse(),
      marker: { color: C.accent },
    }], { ...baseLayout(), height: 480, margin: { l: 160 } }),
    plotChart('chart-commune-incidents', [{
      type: 'bar', orientation: 'h', y: names, x: top.map(t => t[1].incidents).reverse(),
      marker: { color: C.injured },
    }], { ...baseLayout(), height: 480, margin: { l: 160 } }),
  ]).then(resizeCharts);

  const tbl = document.getElementById('commune-table');
  if (tbl) {
    tbl.innerHTML = `<thead><tr>
      <th>${t('table.commune')}</th><th>${t('table.victims')}</th><th>${t('table.incidents')}</th>
      <th>${t('table.killed')}</th><th>${t('table.injured')}</th><th>${t('table.abducted')}</th>
    </tr></thead><tbody>${
      top.map(([c, d]) => `<tr><td>${c}</td><td>${d.total}</td><td>${d.incidents}</td><td>${d.killed}</td><td>${d.injured}</td><td>${d.abducted}</td></tr>`).join('')
    }</tbody>`;
  }
}

registerPageRenderer(renderGeographic);
onDashboardReady(renderGeographic);
