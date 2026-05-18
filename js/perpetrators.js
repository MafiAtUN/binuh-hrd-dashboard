onDashboardReady(() => {
  const q = cur();
  const perpDetail = D.by_perpetrator || {};
  const activePerps = PERPS.filter(p => (q.by_perpetrator?.[p] || 0) > 0 || (perpDetail[p]?.incidents || 0) > 0);
  const labels = activePerps.length ? activePerps : PERPS;
  const victimVals = labels.map(p => q.by_perpetrator?.[p] || 0);
  const incVals = labels.map(p => perpDetail[p]?.incidents || 0);

  Promise.all([
    plotChart('chart-perp-victims', [donutTrace(labels, victimVals, labels.map(perpColor))], pieLayout(360)),
    plotChart('chart-perp-incidents', [{
      type: 'bar', x: labels, y: incVals, marker: { color: labels.map(perpColor) },
    }], { ...baseLayout(), height: 360, xaxis: { tickangle: -25 } }),
  ]).then(resizeCharts);

  const top = sortedCommunes(8);
  const perpNames = labels.filter(p => p !== 'Unknown' || top.some(([, d]) => d.by_perpetrator?.Unknown));
  plotChart('chart-gangs-commune', perpNames.map(p => ({
    name: p,
    type: 'bar',
    x: top.map(t => t[0]),
    y: top.map(t => t[1].by_perpetrator?.[p] || 0),
    marker: { color: perpColor(p) },
  })), { ...baseLayout(), barmode: 'stack', height: 400, xaxis: { tickangle: -35 } });
});
