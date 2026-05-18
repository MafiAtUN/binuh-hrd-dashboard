/* BINUH HR Dashboard — English / French */
const I18N = {
  en: {
    'brand.title': 'BINUH Human Rights',
    'brand.sub.overview': 'Violence Affecting Civilians — Haiti',
    'brand.sub.demographics': 'Demographics',
    'brand.sub.perpetrators': 'Perpetrators',
    'brand.sub.geographic': 'Geographic',
    'brand.sub.violations': 'Violations',
    'brand.sub.maps': 'Maps',
    'nav.overview': 'Overview',
    'nav.demographics': 'Demographics',
    'nav.perpetrators': 'Perpetrators',
    'nav.geographic': 'Geographic',
    'nav.violations': 'Violations',
    'nav.maps': 'Maps',
    'footer.copy': '© BINUH Human Rights',
    'footer.json': 'Download JSON',
    'footer.csv': 'Download CSV',
    'disclaimer': 'Documented civilian casualties in Haiti (Report 2.0). Data are non-exhaustive and subject to under-reporting.',
    'disclaimer.map': 'Circle size reflects victim count at each location. Data are non-exhaustive.',
    'kpi.total': 'Total victims',
    'kpi.killed': 'Killed',
    'kpi.injured': 'Injured',
    'kpi.abducted': 'Abducted',
    'kpi.gangs': 'Gangs (victims)',
    'kpi.male': 'Men',
    'kpi.female': 'Women',
    'kpi.boys': 'Boys',
    'kpi.girls': 'Girls',
    'kpi.communes': 'Communes',
    'kpi.top_commune': 'Top commune victims',
    'page.overview': 'Violence Affecting Civilians — Overview',
    'page.demographics': 'Victims — Demographics',
    'page.perpetrators': 'Perpetrator Analysis',
    'page.geographic': 'Geographic Analysis',
    'page.geographic.sub': 'By commune (Admin2)',
    'page.violations': 'Violation Analysis',
    'page.maps': 'Incident Map',
    'chart.violation.title': 'By violation type',
    'chart.violation.sub': 'Share of documented victims by harm category',
    'chart.violation.explain': 'Each victim is counted once per primary violation (killed, injured, or abducted). Property-related incidents are excluded.',
    'chart.gender.title': 'By sex and age group',
    'chart.gender.sub': 'Distribution of victims by gender',
    'chart.gender.explain': 'Counts include men, women, boys, and girls as recorded in the incident database.',
    'chart.quarterly.title': 'Quarterly trend',
    'chart.quarterly.sub': 'Total victims per quarter',
    'chart.quarterly.explain': 'Shows how documented civilian harm has evolved across reporting quarters.',
    'chart.perp_overview.title': 'By alleged perpetrator',
    'chart.perp_overview.sub': 'Victims attributed to perpetrator category',
    'chart.perp_overview.explain': 'Attribution is based on available information at the time of documentation; many incidents remain partially attributed.',
    'chart.monthly.title': 'Monthly breakdown (current quarter)',
    'chart.monthly.sub': 'Victims by month and violation type',
    'chart.monthly.explain': 'Stacked bars show how killings, injuries, and abductions are distributed across months in Q1 2026.',
    'chart.commune.title': 'Top communes',
    'chart.commune.sub': 'Fifteen communes with the highest victim counts',
    'chart.commune.explain': 'Geographic concentration helps identify areas requiring heightened monitoring and response.',
    'chart.sex.title': 'Sex of victims',
    'chart.sex.sub': 'Proportion of victims by sex',
    'chart.sex.explain': 'Disaggregated data support gender-sensitive analysis and advocacy.',
    'chart.age.title': 'Age groups',
    'chart.age.sub': 'Minors, adults, and elderly victims',
    'chart.age.explain': 'Age disaggregation highlights protection risks for children and older persons.',
    'chart.gender_monthly.title': 'Gender by month',
    'chart.gender_monthly.sub': 'Monthly victim profile by sex',
    'chart.gender_monthly.explain': 'Tracks whether harm affects men, women, boys, or girls differently over time.',
    'chart.perp_victims.title': 'Victims by perpetrator',
    'chart.perp_victims.sub': 'Share of victims per perpetrator category',
    'chart.perp_victims.explain': 'Illustrates which actor types are most frequently associated with civilian harm in the quarter.',
    'chart.perp_incidents.title': 'Incidents by perpetrator',
    'chart.perp_incidents.sub': 'Number of distinct incidents per category',
    'chart.perp_incidents.explain': 'One incident may involve multiple victims; incident counts measure frequency of events.',
    'chart.perp_commune.title': 'All perpetrator categories — top communes',
    'chart.perp_commune.sub': 'Stacked victims in the eight most affected communes',
    'chart.perp_commune.explain': 'Compares how gangs, security forces, and community actors contribute to harm in each commune.',
    'chart.commune_victims.title': 'Victims by commune',
    'chart.commune_victims.sub': 'Top fifteen communes by victim count',
    'chart.commune_victims.explain': 'Admin2-level breakdown of where victims were documented during the reporting period.',
    'chart.commune_incidents.title': 'Incidents by commune',
    'chart.commune_incidents.sub': 'Top fifteen communes by incident count',
    'chart.commune_incidents.explain': 'Shows where events are most frequently reported, which may differ from victim totals.',
    'chart.viol_bar.title': 'Victims by violation',
    'chart.viol_bar.sub': 'Absolute counts by harm type',
    'chart.viol_bar.explain': 'Bar heights reflect the number of victims for each violation category in Q1 2026.',
    'chart.viol_donut.title': 'Share of victims',
    'chart.viol_donut.sub': 'Proportional distribution of harm types',
    'chart.viol_donut.explain': 'Useful for comparing the relative scale of killings, injuries, and abductions.',
    'chart.viol_monthly.title': 'Monthly breakdown (Q1 2026)',
    'chart.viol_monthly.sub': 'Violation type by month',
    'chart.viol_monthly.explain': 'Reveals seasonal or monthly patterns in how violence manifests.',
    'map.filters.title': 'Map filters',
    'map.filters.sub': 'Refine displayed incidents',
    'map.filters.explain': 'Filter by month, violation type, or perpetrator. Only Q1 2026 incidents with coordinates are shown.',
    'map.month.all': 'All months',
    'map.viol.all': 'All violations',
    'map.perp.all': 'All perpetrators',
    'map.popup.victims': 'victims',
    'viol.killed': 'Killed',
    'viol.injured': 'Injured',
    'viol.abducted': 'Abducted',
    'gender.men': 'Men',
    'gender.women': 'Women',
    'gender.boys': 'Boys',
    'gender.girls': 'Girls',
    'age.minor': 'Minors (0–17)',
    'age.adult': 'Adults (18–59)',
    'age.elderly': 'Elderly (60+)',
    'perp.gangs': 'Gangs',
    'perp.security': 'Security Forces',
    'perp.community': 'Community / Justice Actors',
    'perp.unknown': 'Unknown',
    'series.victims': 'Victims',
    'center.victims': 'victims',
    'table.commune': 'Commune',
    'table.victims': 'Victims',
    'table.incidents': 'Incidents',
    'table.killed': 'Killed',
    'table.injured': 'Injured',
    'table.abducted': 'Abducted',
    'insight.title': 'Key findings',
    'insight.1': '{n} victims documented in {period}.',
    'insight.2': 'Killed: {killed} ({kp}%) · Injured: {injured} · Abducted: {abducted}',
    'insight.3': 'Most affected commune: {commune} ({cv} victims).',
    'insight.4': 'Gangs attributed to {gp}% of victims in this quarter.',
    'btn.png': 'PNG',
    'btn.csv': 'CSV',
    'data.source': 'Data source: Human Rights Section, BINUH (Report 2.0)',
    'month.january': 'January', 'month.february': 'February', 'month.march': 'March',
    'month.april': 'April', 'month.may': 'May', 'month.june': 'June',
    'month.july': 'July', 'month.august': 'August', 'month.september': 'September',
    'month.october': 'October', 'month.november': 'November', 'month.december': 'December',
  },
  fr: {
    'brand.title': 'Droits de l\'homme — BINUH',
    'brand.sub.overview': 'Violence affectant les civils — Haïti',
    'brand.sub.demographics': 'Démographie',
    'brand.sub.perpetrators': 'Auteurs',
    'brand.sub.geographic': 'Géographie',
    'brand.sub.violations': 'Violations',
    'brand.sub.maps': 'Cartes',
    'nav.overview': 'Aperçu',
    'nav.demographics': 'Démographie',
    'nav.perpetrators': 'Auteurs',
    'nav.geographic': 'Géographie',
    'nav.violations': 'Violations',
    'nav.maps': 'Cartes',
    'footer.copy': '© Droits de l\'homme — BINUH',
    'footer.json': 'Télécharger JSON',
    'footer.csv': 'Télécharger CSV',
    'disclaimer': 'Victimes civiles documentées en Haïti (Rapport 2.0). Les données ne sont pas exhaustives et souffrent de sous-déclaration.',
    'disclaimer.map': 'La taille des cercles reflète le nombre de victimes à chaque emplacement. Données non exhaustives.',
    'kpi.total': 'Total victimes',
    'kpi.killed': 'Tués',
    'kpi.injured': 'Blessés',
    'kpi.abducted': 'Enlevés',
    'kpi.gangs': 'Gangs (victimes)',
    'kpi.male': 'Hommes',
    'kpi.female': 'Femmes',
    'kpi.boys': 'Garçons',
    'kpi.girls': 'Filles',
    'kpi.communes': 'Communes',
    'kpi.top_commune': 'Commune la plus touchée',
    'page.overview': 'Violence affectant les civils — Aperçu',
    'page.demographics': 'Victimes — Démographie',
    'page.perpetrators': 'Analyse des auteurs',
    'page.geographic': 'Analyse géographique',
    'page.geographic.sub': 'Par commune (Admin2)',
    'page.violations': 'Analyse des violations',
    'page.maps': 'Carte des incidents',
    'chart.violation.title': 'Par type de violation',
    'chart.violation.sub': 'Part des victimes documentées par catégorie de préjudice',
    'chart.violation.explain': 'Chaque victime est comptée une fois selon la violation principale (tué, blessé ou enlevé). Les atteintes aux biens sont exclues.',
    'chart.gender.title': 'Par sexe et âge',
    'chart.gender.sub': 'Répartition des victimes par genre',
    'chart.gender.explain': 'Les effectifs comprennent hommes, femmes, garçons et filles tels qu\'enregistrés dans la base d\'incidents.',
    'chart.quarterly.title': 'Tendance trimestrielle',
    'chart.quarterly.sub': 'Total des victimes par trimestre',
    'chart.quarterly.explain': 'Montre l\'évolution des atteintes civiles documentées au fil des trimestres.',
    'chart.perp_overview.title': 'Par auteur présumé',
    'chart.perp_overview.sub': 'Victimes attribuées à une catégorie d\'auteur',
    'chart.perp_overview.explain': 'L\'attribution repose sur les informations disponibles au moment de la documentation ; de nombreux incidents restent partiellement attribués.',
    'chart.monthly.title': 'Répartition mensuelle (trimestre en cours)',
    'chart.monthly.sub': 'Victimes par mois et type de violation',
    'chart.monthly.explain': 'Les barres empilées montrent la répartition des tués, blessés et enlevés sur les mois du T1 2026.',
    'chart.commune.title': 'Principales communes',
    'chart.commune.sub': 'Quinze communes avec le plus grand nombre de victimes',
    'chart.commune.explain': 'La concentration géographique aide à cibler le suivi et l\'intervention.',
    'chart.sex.title': 'Sexe des victimes',
    'chart.sex.sub': 'Proportion des victimes par sexe',
    'chart.sex.explain': 'Les données désagrégées soutiennent une analyse et un plaidoyer sensibles au genre.',
    'chart.age.title': 'Groupes d\'âge',
    'chart.age.sub': 'Mineurs, adultes et personnes âgées',
    'chart.age.explain': 'La désagrégation par âge met en évidence les risques pour les enfants et les personnes âgées.',
    'chart.gender_monthly.title': 'Genre par mois',
    'chart.gender_monthly.sub': 'Profil mensuel des victimes par sexe',
    'chart.gender_monthly.explain': 'Permet de voir si les hommes, femmes, garçons ou filles sont touchés différemment dans le temps.',
    'chart.perp_victims.title': 'Victimes par auteur',
    'chart.perp_victims.sub': 'Part des victimes par catégorie d\'auteur',
    'chart.perp_victims.explain': 'Indique quels types d\'acteurs sont le plus souvent associés aux atteintes civiles au trimestre.',
    'chart.perp_incidents.title': 'Incidents par auteur',
    'chart.perp_incidents.sub': 'Nombre d\'incidents distincts par catégorie',
    'chart.perp_incidents.explain': 'Un incident peut concerner plusieurs victimes ; le nombre d\'incidents mesure la fréquence des événements.',
    'chart.perp_commune.title': 'Toutes catégories d\'auteurs — principales communes',
    'chart.perp_commune.sub': 'Victimes empilées dans les huit communes les plus touchées',
    'chart.perp_commune.explain': 'Compare la contribution des gangs, forces de sécurité et acteurs communautaires dans chaque commune.',
    'chart.commune_victims.title': 'Victimes par commune',
    'chart.commune_victims.sub': 'Quinze communes avec le plus de victimes',
    'chart.commune_victims.explain': 'Répartition au niveau Admin2 des lieux où les victimes ont été documentées.',
    'chart.commune_incidents.title': 'Incidents par commune',
    'chart.commune_incidents.sub': 'Quinze communes avec le plus d\'incidents',
    'chart.commune_incidents.explain': 'Montre où les événements sont le plus souvent signalés, ce qui peut différer du total des victimes.',
    'chart.viol_bar.title': 'Victimes par violation',
    'chart.viol_bar.sub': 'Effectifs absolus par type de préjudice',
    'chart.viol_bar.explain': 'La hauteur des barres reflète le nombre de victimes par catégorie au T1 2026.',
    'chart.viol_donut.title': 'Part des victimes',
    'chart.viol_donut.sub': 'Répartition proportionnelle des types de préjudice',
    'chart.viol_donut.explain': 'Utile pour comparer l\'ampleur relative des tués, blessés et enlevés.',
    'chart.viol_monthly.title': 'Répartition mensuelle (T1 2026)',
    'chart.viol_monthly.sub': 'Type de violation par mois',
    'chart.viol_monthly.explain': 'Révèle des tendances mensuelles ou saisonnières dans la violence.',
    'map.filters.title': 'Filtres de la carte',
    'map.filters.sub': 'Affiner les incidents affichés',
    'map.filters.explain': 'Filtrer par mois, type de violation ou auteur. Seuls les incidents du T1 2026 avec coordonnées sont affichés.',
    'map.month.all': 'Tous les mois',
    'map.viol.all': 'Toutes les violations',
    'map.perp.all': 'Tous les auteurs',
    'map.popup.victims': 'victimes',
    'viol.killed': 'Tués',
    'viol.injured': 'Blessés',
    'viol.abducted': 'Enlevés',
    'gender.men': 'Hommes',
    'gender.women': 'Femmes',
    'gender.boys': 'Garçons',
    'gender.girls': 'Filles',
    'age.minor': 'Mineurs (0–17 ans)',
    'age.adult': 'Adultes (18–59 ans)',
    'age.elderly': 'Personnes âgées (60+ ans)',
    'perp.gangs': 'Gangs',
    'perp.security': 'Forces de sécurité',
    'perp.community': 'Acteurs communautaires / justice',
    'perp.unknown': 'Inconnu',
    'series.victims': 'Victimes',
    'center.victims': 'victimes',
    'table.commune': 'Commune',
    'table.victims': 'Victimes',
    'table.incidents': 'Incidents',
    'table.killed': 'Tués',
    'table.injured': 'Blessés',
    'table.abducted': 'Enlevés',
    'insight.title': 'Points clés',
    'insight.1': '{n} victimes documentées au cours de {period}.',
    'insight.2': 'Tués : {killed} ({kp} %) · Blessés : {injured} · Enlevés : {abducted}',
    'insight.3': 'Commune la plus touchée : {commune} ({cv} victimes).',
    'insight.4': 'Gangs responsables de {gp} % des victimes ce trimestre.',
    'btn.png': 'PNG',
    'btn.csv': 'CSV',
    'data.source': 'Source : Section des droits de l\'homme, BINUH (Rapport 2.0)',
    'month.january': 'Janvier', 'month.february': 'Février', 'month.march': 'Mars',
    'month.april': 'Avril', 'month.may': 'Mai', 'month.june': 'Juin',
    'month.july': 'Juillet', 'month.august': 'Août', 'month.september': 'Septembre',
    'month.october': 'Octobre', 'month.november': 'Novembre', 'month.december': 'Décembre',
  },
};

const PAGE_KEYS = {
  'index.html': { brand: 'brand.sub.overview', title: 'page.overview', disclaimer: 'disclaimer' },
  'demographics.html': { brand: 'brand.sub.demographics', title: 'page.demographics' },
  'perpetrators.html': { brand: 'brand.sub.perpetrators', title: 'page.perpetrators' },
  'geographic.html': { brand: 'brand.sub.geographic', title: 'page.geographic', subtitle: 'page.geographic.sub' },
  'violations.html': { brand: 'brand.sub.violations', title: 'page.violations' },
  'maps.html': { brand: 'brand.sub.maps', title: 'page.maps', disclaimer: 'disclaimer.map' },
};

let currentLang = localStorage.getItem('binuh-lang') || 'en';
const pageRenderers = [];

function t(key, vars = {}) {
  let s = (I18N[currentLang] && I18N[currentLang][key]) || (I18N.en[key]) || key;
  Object.entries(vars).forEach(([k, v]) => { s = s.replace(new RegExp(`\\{${k}\\}`, 'g'), v); });
  return s;
}

function getLang() { return currentLang; }

function setLang(lang) {
  if (!I18N[lang] || lang === currentLang) return;
  currentLang = lang;
  localStorage.setItem('binuh-lang', lang);
  document.documentElement.lang = lang;
  applyStaticI18n();
  updateLangButtons();
  window.dispatchEvent(new CustomEvent('binuh:langchange'));
  pageRenderers.forEach(fn => fn());
}

function registerPageRenderer(fn) { pageRenderers.push(fn); }

function applyStaticI18n() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (key) el.textContent = t(key);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.setAttribute('placeholder', t(el.getAttribute('data-i18n-placeholder')));
  });
  const page = currentPage();
  const pk = PAGE_KEYS[page];
  if (pk) {
    const brand = document.querySelector('.brand-sub');
    if (brand && pk.brand) brand.textContent = t(pk.brand);
    const title = document.querySelector('.page-title');
    if (title && pk.title) {
      const parts = t(pk.title).split(' — ');
      if (parts.length > 1) title.innerHTML = `${parts[0]} — <span>${parts.slice(1).join(' — ')}</span>`;
      else {
        const sp = t(pk.title).split(' ');
        const last = sp.pop();
        title.innerHTML = `${sp.join(' ')} <span>${last}</span>`;
      }
    }
    const sub = document.querySelector('.page-subtitle');
    if (sub && pk.subtitle) sub.textContent = t(pk.subtitle);
    const disc = document.querySelector('.page-disclaimer');
    if (disc && pk.disclaimer) disc.textContent = t(pk.disclaimer);
  }
}

function currentPage() {
  const parts = window.location.pathname.split('/').filter(Boolean);
  let page = parts[parts.length - 1] || 'index.html';
  if (!page.endsWith('.html')) page = 'index.html';
  return page;
}

function initLangSwitcher() {
  document.querySelectorAll('.navbar').forEach(nav => {
    if (nav.querySelector('.lang-switch')) return;
    const links = nav.querySelector('.nav-links');
    const div = document.createElement('div');
    div.className = 'lang-switch';
    div.innerHTML = '<button type="button" class="lang-btn" data-lang="en" aria-label="English">EN</button><button type="button" class="lang-btn" data-lang="fr" aria-label="Français">FR</button>';
    div.querySelectorAll('.lang-btn').forEach(btn => btn.addEventListener('click', () => setLang(btn.dataset.lang)));
    if (links) nav.insertBefore(div, links);
    else nav.appendChild(div);
  });
  updateLangButtons();
}

function updateLangButtons() {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === currentLang);
  });
}

function lblViol(key) {
  const k = String(key).toLowerCase();
  return t({ killed: 'viol.killed', injured: 'viol.injured', abducted: 'viol.abducted' }[k] || 'viol.killed');
}

function lblPerp(name) {
  if (!name) return t('perp.unknown');
  if (name === 'Gangs') return t('perp.gangs');
  if (name === 'Security Forces') return t('perp.security');
  if (name.includes('Community')) return t('perp.community');
  if (name === 'Unknown') return t('perp.unknown');
  return name;
}

function lblGender(g) {
  return t({ male: 'gender.men', female: 'gender.women', boys: 'gender.boys', girls: 'gender.girls', Men: 'gender.men', Women: 'gender.women', Boys: 'gender.boys', Girls: 'gender.girls' }[g] || 'gender.men');
}

function lblMonth(m) {
  return t('month.' + String(m).toLowerCase()) || m;
}

function lblAge(i) {
  return [t('age.minor'), t('age.adult'), t('age.elderly')][i] || '';
}

function violLabelList() { return ['killed', 'injured', 'abducted'].map(lblViol); }

function genderLabelList() { return ['male', 'female', 'boys', 'girls'].map(lblGender); }

function enhanceChartWraps(meta) {
  Object.entries(meta).forEach(([chartId, keys]) => {
    const chart = document.getElementById(chartId);
    if (!chart) return;
    const wrap = chart.closest('.chart-wrap');
    if (!wrap) return;
    let header = wrap.querySelector('.chart-header');
    if (!header) {
      header = document.createElement('div');
      header.className = 'chart-header';
      wrap.insertBefore(header, chart);
    }
    if (!header.querySelector('.chart-title')) {
      const tEl = document.createElement('div');
      tEl.className = 'chart-title';
      tEl.setAttribute('data-i18n', keys.title);
      header.appendChild(tEl);
    } else {
      header.querySelector('.chart-title').setAttribute('data-i18n', keys.title);
    }
    let sub = wrap.querySelector('.chart-subtitle');
    if (!sub) {
      sub = document.createElement('p');
      sub.className = 'chart-subtitle';
      header.appendChild(sub);
    }
    sub.setAttribute('data-i18n', keys.sub);
    let ex = wrap.querySelector('.chart-explain');
    if (!ex) {
      ex = document.createElement('p');
      ex.className = 'chart-explain';
      wrap.insertBefore(ex, chart);
    }
    ex.setAttribute('data-i18n', keys.explain);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.lang = currentLang;
  initLangSwitcher();
  applyStaticI18n();
});
