document.addEventListener('DOMContentLoaded', () => {
  const q = cur();
  const victimLabels = Object.keys(q.by_perpetrator || {});
  const victimVals = victimLabels.map(p => q.by_perpetrator[p]);

  plotChart('chart-perp-victims', [donutTrace(victimLabels, victimVals, victimLabels.map(perpColor))], pieLayout(360));

  const perpDetail = D.by_perpetrator || {};
  const incLabels = Object.keys(perpDetail).sort((a, b) => perpDetail[b].incidents - perpDetail[a].incidents);
  const incVals = incLabels.map(p => perpDetail[p].incidents);
  plotChart('chart-perp-incidents', [{
    type: 'bar', x: incLabels, y: incVals, marker: { color: incLabels.map(perpColor) },
  }], { ...baseLayout(), height: 360, xaxis: { tickangle: -25 } });

  const top = sortedCommunes(8);
  plotChart('chart-gangs-commune', [{
    type: 'bar', x: top.map(t => t[0]), y: top.map(t => t[1].by_perpetrator?.Gangs || 0), marker: { color: C.gangs },
  }], { ...baseLayout(), height: 380, xaxis: { tickangle: -35 } });
});
