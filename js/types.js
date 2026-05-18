document.addEventListener('DOMContentLoaded', () => {
  const q = D.q1;
  const sv = q.by_sv_normalized;
  const keys = Object.keys(sv);

  Plotly.newPlot('chart-sv-bar', [{
    type:'bar', x:keys.map(svLabel), y:keys.map(k=>sv[k]), marker:{color:keys.map(svColor)},
  }], {...baseLayout(), height:380});

  Plotly.newPlot('chart-sv-donut', [donutTrace(keys.map(svLabel), keys.map(k=>sv[k]), keys.map(svColor))],
    {...baseLayout(), height:360});

  const raw = Object.entries(q.by_sv_raw).sort((a,b)=>b[1]-a[1]).slice(0,12);
  Plotly.newPlot('chart-sv-raw', [{
    type:'bar', orientation:'h', y:raw.map(r=>r[0]).reverse(), x:raw.map(r=>r[1]).reverse(),
    marker:{color:C.pregnancy},
  }], {...baseLayout(), height:420, margin:{l:200}});

  const months = MONTHS.filter(m => D.monthly[m]);
  const allKeys = [...new Set(months.flatMap(m => Object.keys(D.monthly[m].by_sv_normalized)))];
  Plotly.newPlot('chart-sv-monthly', allKeys.map(k => ({
    name: svLabel(k), x: months, y: months.map(m => D.monthly[m].by_sv_normalized[k]||0),
    type:'bar', marker:{color:svColor(k)},
  })), {...baseLayout(), barmode:'stack', height:400});
});
