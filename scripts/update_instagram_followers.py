#!/usr/bin/env python3
"""Update the visible Instagram follower count from an official API response.

Required environment variables:
  INSTAGRAM_ACCESS_TOKEN
  INSTAGRAM_BUSINESS_ACCOUNT_ID

The script intentionally refuses to guess from search snippets or stale caches.
It changes index.html only after receiving a valid non-negative followers_count.
"""
import json, os, re, sys
from pathlib import Path
from urllib.parse import urlencode
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[1]
INDEX = ROOT / "index.html"
TOKEN = os.getenv("INSTAGRAM_ACCESS_TOKEN")
ACCOUNT_ID = os.getenv("INSTAGRAM_BUSINESS_ACCOUNT_ID")

if not TOKEN or not ACCOUNT_ID:
    print("Instagram official API credentials are not configured; no file changed.", file=sys.stderr)
    print("Set INSTAGRAM_ACCESS_TOKEN and INSTAGRAM_BUSINESS_ACCOUNT_ID first.", file=sys.stderr)
    raise SystemExit(2)

params = urlencode({"fields": "followers_count", "access_token": TOKEN})
url = f"https://graph.facebook.com/v22.0/{ACCOUNT_ID}?{params}"
req = Request(url, headers={"User-Agent": "VeltriX-follower-updater/1.0"})
try:
    with urlopen(req, timeout=20) as response:
        payload = json.load(response)
except Exception as exc:
    print(f"Instagram Graph API request failed: {exc}; no file changed.", file=sys.stderr)
    raise SystemExit(3)

value = payload.get("followers_count")
if isinstance(value, bool) or not isinstance(value, (int, float)) or int(value) < 0:
    print("API response did not contain a valid followers_count; no file changed.", file=sys.stderr)
    raise SystemExit(4)

followers = f"{int(value):,}"
s = INDEX.read_text()
updated, count = re.subn(r'(data-follower-count="instagram">)[^<]+', rf'\g<1>{followers}', s, count=1)
if count != 1:
    print("Follower marker was not found exactly once; no file changed.", file=sys.stderr)
    raise SystemExit(5)
INDEX.write_text(updated)
print(f"Updated Instagram followers to {followers}.")
