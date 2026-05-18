document.addEventListener('DOMContentLoaded', () => {
  const perps = D.by_perpetrator;
  const labels = Object.keys(perps);
  const victims = labels.map(p => perps[p].victims);

  Plotly.newPlot('chart-perp-victims', [donutTrace(labels, victims, labels.map(perpColor))],
    {...baseLayout(), height:360});

  const months = MONTHS.filter(m => D.monthly[m]);
  labels.forEach((p,i) => {
    // stacked by estimating from q1 ratio — use monthly if we had perp monthly; show commune instead
  });
  Plotly.newPlot('chart-perp-commune', [{
    type:'bar', x:labels, y:labels.map(p => perps[p].incidents),
    marker:{color:labels.map(perpColor)},
  }], {...baseLayout(), height:360, title:{text:'Incidents by perpetrator category'}});

  const top = sortedCommunes(8);
  const gangData = top.map(([c,d]) => d.by_perpetrator.Gangs||0);
  Plotly.newPlot('chart-gangs-commune', [{
    type:'bar', x:top.map(t=>t[0]), y:gangData, marker:{color:C.gangs},
  }], {...baseLayout(), height:380, xaxis:{tickangle:-35}});
});
