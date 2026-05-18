document.addEventListener('DOMContentLoaded', () => {
  const q = D.q1;
  setKpi('kpi-female', q.by_sex.female||0);
  setKpi('kpi-male', q.by_sex.male||0);
  setKpi('kpi-minor', q.by_age.minor);
  setKpi('kpi-adult', q.by_age.adult);
  setKpi('kpi-elderly', q.by_age.elderly);

  Plotly.newPlot('chart-sex-donut', [donutTrace(
    ['Female','Male'], [q.by_sex.female||0, q.by_sex.male||0], [C.female, C.male]
  )], {...baseLayout(), height:340});

  Plotly.newPlot('chart-age-bar', [{
    type:'bar', x:['Minors (0–17)','Adults (18–59)','Elderly (60+)'],
    y:[q.by_age.minor, q.by_age.adult, q.by_age.elderly],
    marker:{color:[C.minor,C.adult,C.elderly]},
  }], {...baseLayout(), height:360});

  const months = MONTHS.filter(m => D.monthly[m]);
  Plotly.newPlot('chart-age-monthly', [
    {name:'Minors',x:months,y:months.map(m=>D.monthly[m].by_age.minor),type:'bar',marker:{color:C.minor}},
    {name:'Adults',x:months,y:months.map(m=>D.monthly[m].by_age.adult),type:'bar',marker:{color:C.adult}},
    {name:'Elderly',x:months,y:months.map(m=>D.monthly[m].by_age.elderly),type:'bar',marker:{color:C.elderly}},
  ], {...baseLayout(), barmode:'stack', height:380});
  document.querySelectorAll('[data-count]').forEach(el=> animateCounter(el, +el.dataset.count));
});
