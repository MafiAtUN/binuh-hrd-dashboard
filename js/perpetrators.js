document.addEventListener('DOMContentLoaded', () => {
  const q = cur();
  const labels = Object.keys(q.by_perpetrator || {});
  const vals = labels.map(p => q.by_perpetrator[p]);

  Plotly.newPlot('chart-perp-victims', [donutTrace(labels, vals, labels.map(perpColor))], pieLayout(360));
  Plotly.newPlot('chart-perp-bar', [{
    type:'bar', x:labels, y:vals, marker:{color:labels.map(perpColor)},
  }], {...baseLayout(), height:360, xaxis:{tickangle:-20}});

  const top = sortedCommunes(8);
  Plotly.newPlot('chart-gangs-commune', [{
    type:'bar', x:top.map(t=>t[0]), y:top.map(t=>t[1].by_perpetrator?.Gangs||0), marker:{color:C.gangs},
  }], {...baseLayout(), height:380, xaxis:{tickangle:-35}});
});
