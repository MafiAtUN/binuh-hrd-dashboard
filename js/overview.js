const OVERVIEW_CHARTS = {
  'chart-violation-donut': { title: 'chart.violation.title', sub: 'chart.violation.sub', explain: 'chart.violation.explain' },
  'chart-gender-donut': { title: 'chart.gender.title', sub: 'chart.gender.sub', explain: 'chart.gender.explain' },
  'chart-quarterly': { title: 'chart.quarterly.title', sub: 'chart.quarterly.sub', explain: 'chart.quarterly.explain' },
  'chart-perp-donut': { title: 'chart.perp_overview.title', sub: 'chart.perp_overview.sub', explain: 'chart.perp_overview.explain' },
  'chart-monthly': { title: 'chart.monthly.title', sub: 'chart.monthly.sub', explain: 'chart.monthly.explain' },
  'chart-commune-bar': { title: 'chart.commune.title', sub: 'chart.commune.sub', explain: 'chart.commune.explain' },
};

function renderOverview() {
  enhanceChartWraps(OVERVIEW_CHARTS);
  applyStaticI18n();

  const q = cur();
  const p = prev();
  setKpi('kpi-total', q.total);
  setKpi('kpi-killed', q.killed);
  setKpi('kpi-injured', q.injured);
  setKpi('kpi-abducted', q.abducted);
  setKpi('kpi-gangs', q.by_perpetrator?.Gangs || 0);

  const chEl = document.getElementById('kpi-total-change');
  if (chEl && p) chEl.innerHTML = changeHtml(q.total, p.total);

  const vLabels = violLabelList();
  plotChart('chart-violation-donut', [donutTrace(
    vLabels, [q.killed, q.injured, q.abducted],
    [C.killed, C.injured, C.abducted]
  )], { ...pieLayout(300), annotations: [{ text: `<b>${fmt(q.total)}</b><br><span style="font-size:11px">${t('center.victims')}</span>`, x: 0.5, y: 0.5, showarrow: false, font: { color: C.text } }] });

  const g = q.gender;
  plotChart('chart-gender-donut', [donutTrace(
    genderLabelList(), [g.male, g.female, g.boys, g.girls],
    [C.male, C.female, C.boys, C.girls]
  )], pieLayout(300));

  const trend = D.quarterly_trend || [];
  plotChart('chart-quarterly', [{
    type: 'bar', x: trend.map(t => t.label),
    y: trend.map(t => t.total), marker: { color: C.accent },
    name: t('series.victims'),
  }], { ...baseLayout(), height: 360 });

  const perpKeys = Object.keys(q.by_perpetrator || {});
  plotChart('chart-perp-donut', [donutTrace(
    perpKeys.map(lblPerp), Object.values(q.by_perpetrator || {}),
    perpKeys.map(perpColor)
  )], pieLayout(300));

  const months = MONTHS.filter(m => D.monthly?.[m]);
  if (months.length) {
    plotChart('chart-monthly', [
      { name: lblViol('killed'), x: months.map(lblMonth), y: months.map(m => D.monthly[m].killed), type: 'bar', marker: { color: C.killed } },
      { name: lblViol('injured'), x: months.map(lblMonth), y: months.map(m => D.monthly[m].injured), type: 'bar', marker: { color: C.injured } },
      { name: lblViol('abducted'), x: months.map(lblMonth), y: months.map(m => D.monthly[m].abducted), type: 'bar', marker: { color: C.abducted } },
    ], { ...baseLayout(), barmode: 'stack', height: 360 });
  }

  const top = sortedCommunes(10);
  plotChart('chart-commune-bar', [{
    type: 'bar', orientation: 'h', y: top.map(t => t[0]).reverse(), x: top.map(t => t[1].total).reverse(),
    marker: { color: C.accent },
  }], { ...baseLayout(), height: 400, margin: { l: 160 } });

  const ins = document.getElementById('insights');
  if (ins && top[0]) {
    ins.innerHTML = `<h3 class="insight-heading" data-i18n="insight.title">${t('insight.title')}</h3><ul class="insight-list">
      <li>${t('insight.1', { n: fmt(q.total), period: D.meta?.period_label || '' })}</li>
      <li>${t('insight.2', { killed: fmt(q.killed), kp: pctN(q.killed, q.total), injured: fmt(q.injured), abducted: fmt(q.abducted) })}</li>
      <li>${t('insight.3', { commune: top[0][0], cv: fmt(top[0][1].total) })}</li>
      <li>${t('insight.4', { gp: pctN(q.by_perpetrator?.Gangs || 0, q.total) })}</li>
    </ul>`;
  }
  document.querySelectorAll('[data-count]').forEach(el => animateCounter(el, +el.dataset.count));
}

registerPageRenderer(renderOverview);
onDashboardReady(renderOverview);
