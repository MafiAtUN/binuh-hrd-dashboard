#!/usr/bin/env python3
"""BINUH HR — Report_2.0.csv → js/data.js. Run: python3 extract_data.py"""
import json
import os
from datetime import datetime

import pandas as pd

BASE = os.path.dirname(__file__)
CSV = os.path.join(BASE, "documents", "Report_2.0.csv")
OUT = os.path.join(BASE, "js", "data.js")

PRIMARY_YEAR = 2026
PRIMARY_QUARTER = "Q1"

VIOLATIONS = ["Killed", "Injured", "Abducted"]
VIOLATION_MAP = {"Meurtre": "Killed", "Blessure": "Injured", "Kidnapping": "Abducted"}
MONTHS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
]
PERPS = ["Gangs", "Security Forces", "Community / Justice Actors", "Unknown"]

CENTROIDS = {
    "Port-au-Prince": (18.547327, -72.3395928),
    "Delmas": (18.5553727, -72.3063117),
    "Cité Soleil": (18.5937745, -72.3102812),
    "Croix-des-Bouquets": (18.7306286, -72.3083562),
    "Pétion-Ville": (18.4838989, -72.3157059),
    "Tabarre": (18.5958321, -72.2845644),
    "Cabaret": (18.7343259, -72.4181932),
    "Kenscoff": (18.3717337, -72.2862809),
    "Gressier": (18.5441194, -72.4766886),
    "Carrefour": (18.5399097, -72.400102),
    "L'Estère": (19.3667591, -72.5728224),
    "Arcahaie": (18.7704469, -72.489741),
    "Gros Morne": (19.6744559, -72.6334068),
    "Mirebalais": (18.7410098, -72.0082473),
    "Dessalines": (19.1814002, -72.599987),
    "Gonaïves": (19.4460597, -72.6884336),
}


def col(df, *parts):
    for c in df.columns:
        if all(p.lower() in c.lower() for p in parts):
            return c
    raise KeyError(parts)


def norm_quarter(q):
    if pd.isna(q):
        return ""
    q = str(q).strip()
    for i in range(1, 5):
        if f"Qtr {i}" in q or q == f"Q{i}":
            return f"Q{i}"
    return ""


def norm_perp(p):
    if pd.isna(p) or str(p).strip() == "":
        return "Unknown"
    p = str(p).strip().lower()
    if "gang" in p:
        return "Gangs"
    if "security" in p:
        return "Security Forces"
    if "population" in p or "justice" in p:
        return "Community / Justice Actors"
    return "Unknown"


def load_df():
    if not os.path.isfile(CSV):
        alt = os.path.join(BASE, "Report_2.0.csv")
        path = alt if os.path.isfile(alt) else CSV
    else:
        path = CSV
    df = pd.read_csv(path, encoding="utf-8", encoding_errors="replace")
    c_inc = col(df, "incident")
    c_com = col(df, "Admin2")
    c_perp = col(df, "Auteur")
    c_count = "Count"

    df = df.rename(columns={
        c_inc: "violation_raw",
        c_com: "commune",
        c_perp: "perpetrator",
        "lat_y": "lat",
        "lon_x": "lon",
    })
    df["commune"] = df["commune"].apply(lambda x: str(x).strip() if pd.notna(x) else "Unknown")
    df["violation"] = df["violation_raw"].map(VIOLATION_MAP)
    df = df[df["violation"].isin(VIOLATIONS)].copy()
    df["quarter"] = df["Quarter"].apply(norm_quarter)
    df["perpetrator"] = df["perpetrator"].apply(norm_perp)
    df["year"] = pd.to_numeric(df["Year"], errors="coerce").astype("Int64")
    df["victims"] = pd.to_numeric(df[c_count], errors="coerce").fillna(0).astype(int)

    g_col = col(df, "Filles")
    b_col = col(df, "Garçons")
    w_col = col(df, "Femmes18")
    m_col = col(df, "Hommes18")
    ew_col = col(df, "âgées", "Femmes")
    em_col = col(df, "âgées", "Hommes")
    for c in [g_col, b_col, w_col, m_col, ew_col, em_col]:
        df[c] = pd.to_numeric(df[c], errors="coerce").fillna(0)
    df["boys"] = df[b_col]
    df["girls"] = df[g_col]
    df["male"] = df[m_col] + df[em_col]
    df["female"] = df[w_col] + df[ew_col]
    df["lat"] = pd.to_numeric(df["lat"], errors="coerce")
    df["lon"] = pd.to_numeric(df["lon"], errors="coerce")
    return df


def agg_slice(sub):
    total = int(sub["victims"].sum())
    out = {
        "total": total,
        "incidents": len(sub),
        "killed": int(sub.loc[sub["violation"] == "Killed", "victims"].sum()),
        "injured": int(sub.loc[sub["violation"] == "Injured", "victims"].sum()),
        "abducted": int(sub.loc[sub["violation"] == "Abducted", "victims"].sum()),
        "gender": {
            "male": int(sub["male"].sum()),
            "female": int(sub["female"].sum()),
            "boys": int(sub["boys"].sum()),
            "girls": int(sub["girls"].sum()),
        },
        "by_age": {
            "minor": int(sub["boys"].sum() + sub["girls"].sum()),
            "adult": 0,
            "elderly": 0,
        },
        "by_perpetrator": {},
        "by_violation_gender": {},
    }
    w_col = [c for c in sub.columns if "Femmes18" in c]
    m_col = [c for c in sub.columns if "Hommes18" in c and "âgées" not in c]
    ew = [c for c in sub.columns if "âgées" in c and "Femmes" in c]
    em = [c for c in sub.columns if "âgées" in c and "Hommes" in c]
    if w_col and m_col:
        out["by_age"]["adult"] = int(sub[w_col[0]].sum() + sub[m_col[0]].sum())
    if ew and em:
        out["by_age"]["elderly"] = int(sub[ew[0]].sum() + sub[em[0]].sum())

    for p, g in sub.groupby("perpetrator"):
        out["by_perpetrator"][p] = int(g["victims"].sum())
    for v in VIOLATIONS:
        vs = sub[sub["violation"] == v]
        out["by_violation_gender"][v.lower()] = {
            "male": int(vs["male"].sum()),
            "female": int(vs["female"].sum()),
            "boys": int(vs["boys"].sum()),
            "girls": int(vs["girls"].sum()),
        }
    return out


def period_filter(df, year, quarter):
    return df[(df["year"] == year) & (df["quarter"] == quarter)]


def build_locations(df):
    locs = []
    for (lat, lon, com, viol, perp), g in df.groupby(
        ["lat", "lon", "commune", "violation", "perpetrator"], dropna=False
    ):
        latf = float(lat) if pd.notna(lat) else CENTROIDS.get(com, (None, None))[0]
        lonf = float(lon) if pd.notna(lon) else CENTROIDS.get(com, (None, None))[1]
        if latf is None:
            continue
        locs.append({
            "lat": latf,
            "lon": lonf,
            "commune": com,
            "violation": viol.lower(),
            "perpetrator": perp,
            "victims": int(g["victims"].sum()),
            "incidents": len(g),
            "year": int(g["year"].iloc[0]),
            "quarter": g["quarter"].iloc[0],
            "months": sorted(g["Month"].dropna().unique().tolist()),
        })
    return locs


def main():
    df = load_df()
    cur = period_filter(df, PRIMARY_YEAR, PRIMARY_QUARTER)
    prev = period_filter(df, PRIMARY_YEAR - 1, "Q4") if PRIMARY_QUARTER == "Q1" else None
    if prev is None or len(prev) == 0:
        prev = period_filter(df, PRIMARY_YEAR, {"Q2": "Q1", "Q3": "Q2", "Q4": "Q3"}.get(PRIMARY_QUARTER, "Q4"))

    quarterly_trend = []
    for year in sorted(df["year"].dropna().unique()):
        for q in ["Q1", "Q2", "Q3", "Q4"]:
            sub = period_filter(df, int(year), q)
            if len(sub) == 0:
                continue
            a = agg_slice(sub)
            quarterly_trend.append({
                "year": int(year),
                "quarter": q,
                "label": f"{q} {int(year)}",
                **{k: a[k] for k in ["total", "killed", "injured", "abducted", "incidents"]},
            })

    monthly = {}
    if len(cur):
        for m in MONTHS:
            sub = cur[cur["Month"] == m]
            if len(sub):
                monthly[m] = agg_slice(sub)

    by_commune = {c: agg_slice(g) for c, g in cur.groupby("commune") if c}

    by_perpetrator = {p: agg_slice(g) for p, g in cur.groupby("perpetrator")}

    month_labels = {
        "Q1": "January – March",
        "Q2": "April – June",
        "Q3": "July – September",
        "Q4": "October – December",
    }

    data = {
        "meta": {
            "mission": "BINUH",
            "title": "Violence Affecting Civilians Dashboard",
            "primary_year": PRIMARY_YEAR,
            "primary_quarter": PRIMARY_QUARTER,
            "period_label": f"{PRIMARY_QUARTER} {PRIMARY_YEAR} — {month_labels.get(PRIMARY_QUARTER, '')}",
            "source": "BINUH Human Rights — Incident Database (Report 2.0)",
            "generated_at": datetime.now().isoformat(timespec="seconds"),
        },
        "current": agg_slice(cur) if len(cur) else agg_slice(df.iloc[:0]),
        "previous": agg_slice(prev) if len(prev) else None,
        "quarterly_trend": quarterly_trend,
        "monthly": monthly,
        "by_commune": by_commune,
        "by_perpetrator": by_perpetrator,
        "locations": build_locations(cur),
        "all_locations": build_locations(df),
        "data_quality": {
            "missing_coords": int((cur["lat"].isna() | cur["lon"].isna()).sum()) if len(cur) else 0,
            "unknown_commune": int((cur["commune"] == "Unknown").sum()) if len(cur) else 0,
        },
    }

    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, "w", encoding="utf-8") as f:
        f.write("/* Auto-generated — do not edit */\nconst BINUH_DATA = ")
        f.write(json.dumps(data, indent=2, ensure_ascii=False))
        f.write(";\n")

    c = data["current"]
    print(f"OK: {c['incidents']} incidents, {c['total']} victims ({PRIMARY_QUARTER} {PRIMARY_YEAR})")
    print(f"    Killed {c['killed']} | Injured {c['injured']} | Abducted {c['abducted']}")
    print(f"→ {OUT}")


if __name__ == "__main__":
    main()
