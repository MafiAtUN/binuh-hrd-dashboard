document.addEventListener('DOMContentLoaded', () => {
  const q = cur();
  setKpi('kpi-male', q.gender.male);
  setKpi('kpi-female', q.gender.female);
  setKpi('kpi-boys', q.gender.boys);
  setKpi('kpi-girls', q.gender.girls);

  Plotly.newPlot('chart-sex-donut', [donutTrace(
    ['Men','Women','Boys','Girls'], [q.gender.male, q.gender.female, q.gender.boys, q.gender.girls],
    [C.male, C.female, C.boys, C.girls]
  )], pieLayout(340));

  Plotly.newPlot('chart-age-bar', [{
    type:'bar', x:['Minors (0–17)','Adults (18–59)','Elderly (60+)'],
    y:[q.by_age.minor, q.by_age.adult, q.by_age.elderly],
    marker:{color:[C.minor, C.adult, C.elderly]},
  }], {...baseLayout(), height:360});

  const months = MONTHS.filter(m => D.monthly?.[m]);
  Plotly.newPlot('chart-gender-monthly', [
    {name:'Men',x:months,y:months.map(m=>D.monthly[m].gender.male),type:'bar',marker:{color:C.male}},
    {name:'Women',x:months,y:months.map(m=>D.monthly[m].gender.female),type:'bar',marker:{color:C.female}},
    {name:'Boys',x:months,y:months.map(m=>D.monthly[m].gender.boys),type:'bar',marker:{color:C.boys}},
    {name:'Girls',x:months,y:months.map(m=>D.monthly[m].gender.girls),type:'bar',marker:{color:C.girls}},
  ], {...baseLayout(), barmode:'stack', height:400});

  document.querySelectorAll('[data-count]').forEach(el => animateCounter(el, +el.dataset.count));
});
