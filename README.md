# BINUH Human Rights — Sexual Violence Dashboard

Public Q1 2026 dashboard for sexual violence incidents documented by the Human Rights Section, UN Integrated Office in Haiti (BINUH).

## Live site

**https://mafiatun.github.io/binuh-hrd-dashboard/**

*(Will move to the `binuh-human-rights-ohchr` GitHub organization once that is set up.)*

## How data is published

| What | In git? | Purpose |
|------|---------|---------|
| **`js/data.js`** | Yes | `BINUH_DATA` — aggregated data the website loads (JavaScript object, same structure as JSON) |
| **`documents/*.csv`** | **No** (gitignored) | Raw incident export — local only for ETL |

The CSV is **not** shipped in this public repo. Only the pre-built `js/data.js` is published.

## Update data (local only)

1. Put `Cath's Mara data.csv` in `documents/`
2. Run:

```bash
pip3 install -r requirements.txt
python3 extract_data.py
```

3. Commit only `js/data.js` if totals changed

## Run locally

```bash
python3 -m http.server 8000
# http://localhost:8000
```

## Pages

Overview · Demographics · Perpetrators · Geographic · SV Types · Maps

## Tech

HTML · CSS · Plotly · Leaflet · Python/pandas · No build step

## Disclaimer

Data are non-exhaustive and subject to underreporting. For official reporting, use validated HR products.
