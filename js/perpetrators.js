const PERP_CHARTS = {
  'chart-perp-victims': { title: 'chart.perp_victims.title', sub: 'chart.perp_victims.sub', explain: 'chart.perp_victims.explain' },
  'chart-perp-incidents': { title: 'chart.perp_incidents.title', sub: 'chart.perp_incidents.sub', explain: 'chart.perp_incidents.explain' },
  'chart-gangs-commune': { title: 'chart.perp_commune.title', sub: 'chart.perp_commune.sub', explain: 'chart.perp_commune.explain' },
};

function renderPerpetrators() {
  enhanceChartWraps(PERP_CHARTS);
  applyStaticI18n();

  const q = cur();
  const perpDetail = D.by_perpetrator || {};
  const activePerps = PERPS.filter(p => (q.by_perpetrator?.[p] || 0) > 0 || (perpDetail[p]?.incidents || 0) > 0);
  const keys = activePerps.length ? activePerps : PERPS;
  const labels = keys.map(lblPerp);
  const victimVals = keys.map(p => q.by_perpetrator?.[p] || 0);
  const incVals = keys.map(p => perpDetail[p]?.incidents || 0);

  Promise.all([
    plotChart('chart-perp-victims', [donutTrace(labels, victimVals, keys.map(perpColor))], pieLayout(360)),
    plotChart('chart-perp-incidents', [{
      type: 'bar', x: labels, y: incVals, marker: { color: keys.map(perpColor) },
    }], { ...baseLayout(), height: 360, xaxis: { tickangle: -25 } }),
  ]).then(resizeCharts);

  const top = sortedCommunes(8);
  const perpNames = keys.filter(p => p !== 'Unknown' || top.some(([, d]) => d.by_perpetrator?.Unknown));
  plotChart('chart-gangs-commune', perpNames.map(p => ({
    name: lblPerp(p),
    type: 'bar',
    x: top.map(t => t[0]),
    y: top.map(t => t[1].by_perpetrator?.[p] || 0),
    marker: { color: perpColor(p) },
  })), { ...baseLayout(), barmode: 'stack', height: 400, xaxis: { tickangle: -35 } });
}

registerPageRenderer(renderPerpetrators);
onDashboardReady(renderPerpetrators);
