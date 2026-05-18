onDashboardReady(() => {
  const q = cur();
  const labels = ['Killed','Injured','Abducted'];
  const vals = [q.killed, q.injured, q.abducted];
  const cols = [C.killed, C.injured, C.abducted];

  plotChart('chart-viol-bar', [{
    type:'bar', x:labels, y:vals, marker:{color:cols},
  }], {...baseLayout(), height:380});

  plotChart('chart-viol-donut', [donutTrace(labels, vals, cols)], pieLayout(360));

  const months = MONTHS.filter(m => D.monthly?.[m]);
  plotChart('chart-viol-monthly', [
    {name:'Killed',x:months,y:months.map(m=>D.monthly[m].killed),type:'bar',marker:{color:C.killed}},
    {name:'Injured',x:months,y:months.map(m=>D.monthly[m].injured),type:'bar',marker:{color:C.injured}},
    {name:'Abducted',x:months,y:months.map(m=>D.monthly[m].abducted),type:'bar',marker:{color:C.abducted}},
  ], {...baseLayout(), barmode:'stack', height:400});
});
