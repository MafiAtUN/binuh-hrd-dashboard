#!/usr/bin/env python3
"""BINUH HR — CSV → js/data.js. Run: python3 extract_data.py"""
import json, os
from datetime import datetime
import pandas as pd

BASE = os.path.dirname(__file__)
CSV = os.path.join(BASE, "Cath's Mara data.csv")
OUT = os.path.join(BASE, "js", "data.js")

CID = "Incident ID1, 2, 3, 4, …"
CCOM = "Commune (Admin2) de l'incident"
MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"]

CENTROIDS = {
    "Port-au-Prince": (18.547327, -72.3395928), "Delmas": (18.5553727, -72.3063117),
    "Cité Soleil": (18.5937745, -72.3102812), "Croix-des-Bouquets": (18.7306286, -72.3083562),
    "Pétion-Ville": (18.4838989, -72.3157059), "Tabarre": (18.5958321, -72.2845644),
    "Cabaret": (18.7343259, -72.4181932), "Kenscoff": (18.3717337, -72.2862809),
    "Gressier": (18.5441194, -72.4766886), "Carrefour": (18.5399097, -72.400102),
    "L'Estère": (19.3667591, -72.5728224), "Arcahaie": (18.7704469, -72.489741),
    "Gros Morne": (19.6744559, -72.6334068), "Mirebalais": (18.7410098, -72.0082473),
    "Dessalines": (19.1814002, -72.599987), "Gonaïves": (19.4460597, -72.6884336),
}

def clean_commune(c):
    return str(c).strip() if pd.notna(c) else ""

def norm_perp(p):
    if pd.isna(p) or str(p).strip() == "": return "Not recorded"
    p = str(p).strip()
    return "Unknown" if p.lower() == "unknown" else p

def norm_sv(raw):
    if pd.isna(raw): return "other", "Other"
    s, low = str(raw).strip(), str(raw).strip().lower()
    if "pregnancy" in low: return "pregnancy", s
    if "kidnap" in low or "slavery" in low: return "kidnapping_slavery", s
    if "exploitation" in low: return "exploitation", s
    if "collective" in low: return "collective_rape", s
    if low.startswith("rape"): return "rape", s
    return "other", s

def agg(sub):
    v = int(sub["# of Victims"].fillna(0).sum())
    by_sv, by_raw, by_perp = {}, {}, {}
    for _, r in sub.iterrows():
        k, lbl = norm_sv(r["Type of Sexual Violence "])
        n = int(r["# of Victims"]) if pd.notna(r["# of Victims"]) else 1
        by_sv[k] = by_sv.get(k, 0) + n
        by_raw[lbl] = by_raw.get(lbl, 0) + n
        pn = norm_perp(r["Perpetrator Category"])
        by_perp[pn] = by_perp.get(pn, 0) + n
    by_sex = {}
    for k, g in sub.groupby("Victim's Sex"):
        by_sex[str(k).strip().lower()] = int(g["# of Victims"].fillna(0).sum())
    return {
        "incidents": len(sub), "victims": v,
        "by_sex": by_sex,
        "by_age": {"minor": int(sub["Minor0 - 17"].sum()), "adult": int(sub["Adults18 - 59"].sum()), "elderly": int(sub["Elderly60+"].sum())},
        "by_sv_normalized": by_sv, "by_sv_raw": by_raw, "by_perpetrator": by_perp,
        "pregnancy_incidents": int(sub["Type of Sexual Violence "].astype(str).str.contains("Pregnancy|pregnancy", na=False).sum()),
    }

def main():
    df = pd.read_csv(CSV)
    df[CCOM] = df[CCOM].apply(clean_commune)
    df["Perpetrator Category"] = df["Perpetrator Category"].apply(norm_perp)
    df["# of Victims"] = pd.to_numeric(df["# of Victims"], errors="coerce").fillna(1)
    df["sv_norm"], df["sv_label"] = zip(*df["Type of Sexual Violence "].apply(norm_sv))

    q1 = agg(df)
    monthly = {m: agg(df[df.Month == m]) for m in MONTHS if len(df[df.Month == m])}
    by_commune = {c: agg(g) for c, g in df.groupby(CCOM) if c}
    by_perpetrator = {norm_perp(p): agg(g) for p, g in df.groupby("Perpetrator Category")}

    locs = []
    for (lat, lon, com, perp, svn), g in df.groupby(["lat_y","lon_x",CCOM,"Perpetrator Category","sv_norm"], dropna=False):
        com = clean_commune(com)
        latf = float(lat) if pd.notna(lat) else CENTROIDS.get(com, (None, None))[0]
        lonf = float(lon) if pd.notna(lon) else CENTROIDS.get(com, (None, None))[1]
        locs.append({"lat": latf, "lon": lonf, "commune": com, "perpetrator": norm_perp(perp),
            "sv_type": svn, "victims": int(g["# of Victims"].sum()), "incidents": len(g),
            "months": sorted(g.Month.dropna().unique().tolist())})

    data = {
        "meta": {"mission": "BINUH", "year": int(df.Year.iloc[0]), "quarter": "Q1",
            "period_label": "Q1 2026 — January to March",
            "source": "BINUH Human Rights — Incident Database",
            "generated_at": datetime.now().isoformat(timespec="seconds")},
        "q1": q1, "monthly": monthly, "by_commune": by_commune, "by_perpetrator": by_perpetrator,
        "locations": locs,
        "data_quality": {
            "missing_coords": df[df.lat_y.isna() | df.lon_x.isna()][CID].astype(int).tolist(),
            "age_mismatch": df[df["# of Victims"] != df["Minor0 - 17"]+df["Adults18 - 59"]+df["Elderly60+"]][CID].astype(int).tolist(),
        },
    }
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, "w", encoding="utf-8") as f:
        f.write("/* Auto-generated — do not edit */\nconst BINUH_DATA = ")
        f.write(json.dumps(data, indent=2, ensure_ascii=False))
        f.write(";\n")
    print(f"OK: {q1['incidents']} incidents, {q1['victims']} victims → {OUT}")

if __name__ == "__main__":
    main()
