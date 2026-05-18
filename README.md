# BINUH Human Rights — Sexual Violence Dashboard

Interactive Q1 2026 dashboard for sexual violence incidents documented by the Human Rights Section, UN Integrated Office in Haiti (BINUH). Built with the same static stack as the [UNMISS HRD violence dashboard](https://github.com/MafiAtUN/unmiss-hrd-q4-report-data).

## Live demo

**https://mafiatun.github.io/binuh-hrd-dashboard/**

## Quick start

```bash
pip3 install -r requirements.txt
python3 extract_data.py
python3 -m http.server 8000
# http://localhost:8000
```

## Data

| File | Role |
|------|------|
| `Cath's Mara data.csv` | Source incident export (update and re-run ETL) |
| `extract_data.py` | Normalizes CSV → `js/data.js` |
| `js/data.js` | `BINUH_DATA` object (committed for static hosting) |

## Pages

- **Overview** — KPIs, types, perpetrators, monthly trends, insights
- **Demographics** — Sex and age (minor / adult / elderly)
- **Perpetrators** — Gangs, unknown, not recorded
- **Geographic** — Commune (Admin2) rankings and table
- **SV Types** — Normalized categories and raw labels
- **Maps** — Leaflet map with month / type / perpetrator filters

## Deploy to GitHub Pages

1. Create repo `binuh-hrd-dashboard` on GitHub
2. Push this folder
3. Settings → Pages → Source: **main** branch, root `/`
4. Ensure `.nojekyll` is present (included)

## Updating data

Replace or edit `Cath's Mara data.csv`, then:

```bash
python3 extract_data.py
git add js/data.js && git commit -m "Update Q1 data"
```

## Tech

HTML · CSS · Plotly.js · Leaflet · Python/pandas · No build step

## Disclaimer

Data are non-exhaustive and subject to underreporting. For official reporting, use validated HR products.
