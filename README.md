# BINUH Human Rights — Sexual Violence Dashboard

Public Q1 2026 dashboard for sexual violence incidents documented by the Human Rights Section, UN Integrated Office in Haiti (BINUH).

**Built for [GitHub Pages](https://pages.github.com/)** — static HTML/CSS/JS only, no server or build step on deploy.

## Live site

**https://mafiatun.github.io/binuh-hrd-dashboard/**

## GitHub Pages setup

1. Push this repo to GitHub
2. **Settings → Pages →** Branch **main**, folder **/**
3. Wait 1–2 minutes, open the Pages URL

See [DEPLOY.md](DEPLOY.md) for full details.

## Published data

| File | On GitHub? |
|------|------------|
| `js/data.js` | Yes — `BINUH_DATA` (pre-aggregated; what the site loads) |
| `documents/*.csv` | No — gitignored; local ETL input only |

## Local preview (optional)

Same files as GitHub Pages serves:

```bash
python3 -m http.server 8000
# http://localhost:8000
```

Regenerate data locally (not on GitHub):

```bash
pip3 install -r requirements.txt
# Place CSV in documents/, then:
python3 extract_data.py
git add js/data.js && git commit -m "Update data" && git push
```

## Pages

Overview · Demographics · Perpetrators · Geographic · SV Types · Maps

## Disclaimer

Data are non-exhaustive and subject to underreporting.
