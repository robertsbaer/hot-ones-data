#!/usr/bin/env python3
import json
import re
import sys
from datetime import datetime
from collections import defaultdict, Counter

EP_REGEX = re.compile(r'^S(\d{2})E(\d{2})$')
SPECIAL_REGEX = re.compile(r'^SPECIAL')
DATE_FMT = '%B %d, %Y'  # e.g. 'March 12, 2015'


def load_data(path):
    with open(path, 'r', encoding='utf-8') as f:
        raw = json.load(f)
    # unwrap if wrapped in an object with "episodes" key
    if isinstance(raw, dict) and 'episodes' in raw:
        data = raw['episodes']
    else:
        data = raw
    print(f"Loaded {len(data)} records from {path}")
    return data


def parse_date(datestr):
    try:
        return datetime.strptime(datestr, DATE_FMT)
    except Exception:
        return None


def main(json_path):
    data = load_data(json_path)
    season_eps = defaultdict(list)
    errors = []

    # 1) Season-field vs episode-code + date parsing
    for idx, rec in enumerate(data, 1):
        season_field = rec.get('season')
        ep_code = rec.get('episode', '')
        date_str = rec.get('date', '')
        date_obj = parse_date(date_str)
        # report unparsable dates explicitly
        if date_str and not date_obj:
            errors.append(f"[#{idx}] unparsable date for {ep_code}: '{date_str}'")

        # Only group standard episodes for per-season checks
        m = EP_REGEX.match(ep_code)
        if not m:
            continue
        code_season, code_ep = int(m.group(1)), int(m.group(2))
        try:
            season_num = int(season_field)
        except Exception:
            errors.append(f"[#{idx}] bad season field: {season_field!r}")
            continue
        if code_season != season_num:
            errors.append(f"[#{idx}] season mismatch: field={season_num} vs code={ep_code}")
        season_eps[season_num].append((code_ep, rec, date_obj))

    # 2) Missing or duplicate episodes per season
    for season, eps in sorted(season_eps.items()):
        nums = [n for n, _, _ in eps]
        cnt = Counter(nums)
        dups = [n for n, c in cnt.items() if c > 1]
        if dups:
            errors.append(f"Season {season:02d} duplicates: {dups}")
        mn, mx = min(nums), max(nums)
        missing = [n for n in range(mn, mx + 1) if n not in cnt]
        if missing:
            errors.append(f"Season {season:02d} missing episodes: {missing}")

    # 3) Date-order within each season for standard episodes
    for season, eps in sorted(season_eps.items()):
        sorted_by_num = sorted(eps, key=lambda t: t[0])
        for (prev_num, prev_rec, prev_date), (cur_num, cur_rec, cur_date) in zip(sorted_by_num, sorted_by_num[1:]):
            if prev_date and cur_date and cur_date < prev_date:
                errors.append(
                    f"S{season:02d}E{cur_num:02d} date {cur_rec.get('date')} "
                    f"before S{season:02d}E{prev_num:02d} date {prev_rec.get('date')}"
                )

    # 4) Global sequential date check across all standard episodes
    all_eps = []
    for season in sorted(season_eps):
        for num, rec, date_obj in sorted(season_eps[season], key=lambda t: t[0]):
            if date_obj:
                all_eps.append((season, num, date_obj))
    for (s_prev, n_prev, d_prev), (s_cur, n_cur, d_cur) in zip(all_eps, all_eps[1:]):
        if d_prev and d_cur and d_cur < d_prev:
            errors.append(
                f"Global order issue: S{s_cur:02d}E{n_cur:02d} date {d_cur.strftime(DATE_FMT)} "
                f"comes before S{s_prev:02d}E{n_prev:02d} date {d_prev.strftime(DATE_FMT)}"
            )

    # 5) Full-data chronological check in input order (including specials)
    prev_date = None
    for idx, rec in enumerate(data, 1):
        date_obj = parse_date(rec.get('date', ''))
        if not date_obj:
            continue
        if prev_date and date_obj < prev_date:
            ep_code = rec.get('episode', '<unknown>')
            errors.append(
                f"[#{idx}] {ep_code} date {rec.get('date')} is out of sequence (before previous)"
            )
        prev_date = date_obj

    # Report results
    if errors:
        print(f"\nFound {len(errors)} issue(s):")
        for e in errors:
            print(" •", e)
        sys.exit(1)
    else:
        print("✔ All checks passed – no issues found.")


if __name__ == '__main__':
    path = sys.argv[1] if len(sys.argv) > 1 else 'merged_hot_ones.json'
    main(path)