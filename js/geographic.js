document.addEventListener('DOMContentLoaded', () => {
  const q = cur();
  const top = sortedCommunes(15);
  setKpi('kpi-communes', Object.keys(D.by_commune||{}).length);
  if (top[0]) {
    setKpi('kpi-top-commune-v', top[0][1].total);
    document.getElementById('kpi-top-commune-n').textContent = top[0][0];
    animateCounter(document.getElementById('kpi-top-commune-v'), top[0][1].total);
  }
  animateCounter(document.getElementById('kpi-communes'), Object.keys(D.by_commune||{}).length);

  Plotly.newPlot('chart-commune-victims', [{
    type:'bar', orientation:'h', y:top.map(t=>t[0]).reverse(), x:top.map(t=>t[1].total).reverse(),
    marker:{color:C.accent},
  }], {...baseLayout(), height:480, margin:{l:160}});

  Plotly.newPlot('chart-commune-killed', [{
    type:'bar', orientation:'h', y:top.map(t=>t[0]).reverse(), x:top.map(t=>t[1].killed).reverse(),
    marker:{color:C.killed},
  }], {...baseLayout(), height:480, margin:{l:160}});

  const tbl = document.getElementById('commune-table');
  if (tbl) {
    tbl.innerHTML = `<thead><tr><th>Commune</th><th>Victims</th><th>Killed</th><th>Injured</th><th>Abducted</th></tr></thead><tbody>${
      top.map(([c,d])=>`<tr><td>${c}</td><td>${d.total}</td><td>${d.killed}</td><td>${d.injured}</td><td>${d.abducted}</td></tr>`).join('')
    }</tbody>`;
  }
});
