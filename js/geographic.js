document.addEventListener('DOMContentLoaded', () => {
  const top = sortedCommunes(15);
  const q = D.q1;
  setKpi('kpi-communes', Object.keys(D.by_commune).length);
  if(top[0]){
    setKpi('kpi-top-commune-v', top[0][1].victims);
    document.getElementById('kpi-top-commune-n').textContent = top[0][0];
    animateCounter(document.getElementById('kpi-top-commune-v'), top[0][1].victims);
  }
  animateCounter(document.getElementById('kpi-communes'), Object.keys(D.by_commune).length);

  Plotly.newPlot('chart-commune-victims', [{
    type:'bar', orientation:'h', y:top.map(t=>t[0]).reverse(), x:top.map(t=>t[1].victims).reverse(),
    marker:{color:top.map((_,i)=>`hsl(${200+i*8},70%,55%)`)},
  }], {...baseLayout(), height:480, margin:{l:160}});

  Plotly.newPlot('chart-commune-incidents', [{
    type:'bar', orientation:'h', y:top.map(t=>t[0]).reverse(), x:top.map(t=>t[1].incidents).reverse(),
    marker:{color:C.accent},
  }], {...baseLayout(), height:480, margin:{l:160}});

  const tbl = document.getElementById('commune-table');
  if(tbl){
    tbl.innerHTML = `<thead><tr><th>Commune</th><th>Incidents</th><th>Victims</th><th>% Victims</th></tr></thead><tbody>${
      top.map(([c,d])=>`<tr><td>${c}</td><td>${d.incidents}</td><td>${d.victims}</td><td>${pctN(d.victims,q.victims)}%</td></tr>`).join('')
    }</tbody>`;
  }
});
