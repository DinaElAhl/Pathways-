#!/usr/bin/env python3
"""Build the international school suggestions used when a school registers on Roots.

Source: Wikidata (CC0 public domain). For every country it writes
public/schools/<ISO>.json as a list of {"n": name, "c": city, "t": kind},
plus public/schools/index.json with the count per country.

Kinds collected (each queried separately so no single query times out):
  - instance of "international school" (Q572835)
  - instance of "International Baccalaureate World School" (Q113363345)
  - member of the Council of International Schools (Q5176425)
  - any school with an "accredited by" (P5514) statement

Wikidata coverage is partial, so the app always lets a school type its own name.

Run from the repository root:  python3 tools/build_intl_schools.py
"""
import json
import os
import sys
import time
import urllib.parse
import urllib.request

ENDPOINTS = [
    "https://query.wikidata.org/sparql",
    "https://qlever.cs.uni-freiburg.de/api/wikidata",
]
USER_AGENT = "RootsLearning/1.0 (https://app.pathwayslearn.com; school directory builder)"
PREFIXES = (
    "PREFIX wd: <http://www.wikidata.org/entity/> "
    "PREFIX wdt: <http://www.wikidata.org/prop/direct/> "
    "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> "
)
SCHOOL_TYPES = "wd:Q3914 wd:Q159334 wd:Q9842 wd:Q9826 wd:Q2143781 wd:Q572835"
BRANCHES = {
    "International school": "?s wdt:P31 wd:Q572835 .",
    "IB World School": "?s wdt:P31 wd:Q113363345 .",
    "CIS member": "?s wdt:P463 wd:Q5176425 .",
    "Accredited": "?s wdt:P5514 ?acc . VALUES ?t { " + SCHOOL_TYPES + " } ?s wdt:P31 ?t .",
}
QUERY = PREFIXES + """SELECT ?s ?name ?iso ?city WHERE {{
  {branch}
  ?s wdt:P17 ?country . ?country wdt:P297 ?iso .
  FILTER NOT EXISTS {{ ?s wdt:P576 ?closed }}
  OPTIONAL {{ ?s rdfs:label ?en . FILTER(LANG(?en) = "en") }}
  OPTIONAL {{ ?s rdfs:label ?fr . FILTER(LANG(?fr) = "fr") }}
  OPTIONAL {{ ?s rdfs:label ?ar . FILTER(LANG(?ar) = "ar") }}
  BIND(COALESCE(?en, ?fr, ?ar) AS ?name)
  FILTER(BOUND(?name))
  OPTIONAL {{ ?s wdt:P131 ?place . ?place rdfs:label ?city . FILTER(LANG(?city) = "en") }}
}}"""


def run(query):
    last = None
    for endpoint in ENDPOINTS:
        for attempt in range(3):
            try:
                url = endpoint + "?" + urllib.parse.urlencode({"query": query, "format": "json"})
                req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT, "Accept": "application/sparql-results+json"})
                with urllib.request.urlopen(req, timeout=180) as resp:
                    return json.load(resp)["results"]["bindings"]
            except Exception as exc:  # network hiccup, timeout, rate limit
                last = exc
                print(f"  {endpoint.split('/')[2]} attempt {attempt + 1} failed: {exc}", file=sys.stderr)
                time.sleep(5 * (attempt + 1))
    raise RuntimeError(f"all endpoints failed: {last}")


def main():
    out_dir = os.path.join("public", "schools")
    os.makedirs(out_dir, exist_ok=True)
    schools = {}  # wikidata id -> record
    for kind, branch in BRANCHES.items():
        print(f"Fetching: {kind} …")
        rows = run(QUERY.format(branch=branch))
        print(f"  {len(rows)} rows")
        for r in rows:
            sid = r["s"]["value"].rsplit("/", 1)[-1]
            iso = r["iso"]["value"].upper()
            rec = schools.setdefault(sid, {"iso": iso, "n": r["name"]["value"].strip(), "c": "", "t": []})
            if not rec["c"] and "city" in r:
                rec["c"] = r["city"]["value"].strip()
            if kind not in rec["t"]:
                rec["t"].append(kind)

    by_country = {}
    for rec in schools.values():
        if len(rec["iso"]) != 2 or not rec["n"]:
            continue
        by_country.setdefault(rec["iso"], []).append({"n": rec["n"][:120], "c": rec["c"][:80], "t": " · ".join(rec["t"])})

    for name in os.listdir(out_dir):
        if name.endswith(".json"):
            os.remove(os.path.join(out_dir, name))
    index = {}
    for iso, rows in sorted(by_country.items()):
        seen, unique = set(), []
        for row in sorted(rows, key=lambda x: (x["n"].lower(), x["c"])):
            key = (row["n"].lower(), row["c"].lower())
            if key not in seen:
                seen.add(key)
                unique.append(row)
        with open(os.path.join(out_dir, iso + ".json"), "w", encoding="utf-8") as fh:
            json.dump(unique, fh, ensure_ascii=False, separators=(",", ":"))
        index[iso] = len(unique)
    with open(os.path.join(out_dir, "index.json"), "w", encoding="utf-8") as fh:
        json.dump(index, fh, separators=(",", ":"))
    top = sorted(index.items(), key=lambda kv: -kv[1])[:10]
    print(f"Done: {sum(index.values())} schools in {len(index)} countries. Top: " + ", ".join(f"{k} {v}" for k, v in top))
    print("Egypt (EG):", index.get("EG", 0), "| Saudi Arabia (SA):", index.get("SA", 0), "| UAE (AE):", index.get("AE", 0))


if __name__ == "__main__":
    main()
