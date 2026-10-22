#!/usr/bin/env python3
"""Set every <lastmod> in sitemap.xml to the date its page was last changed.

For each <url> in sitemap.xml the page file is found from the <loc>, and
<lastmod> becomes the date of the last git commit that touched that file
(git log -1 --format=%cs). A page with uncommitted changes gets today's date,
so running this before you commit gives the right date.

Run from anywhere:   python tools/update-sitemap-lastmod.py
Options:             --dry-run         show what would change, write nothing
                     --only PREFIX     only entries whose page path starts with
                                       PREFIX (e.g. academic/coa/)

Nothing in sitemap.xml changes except the <lastmod> dates; line endings and
all other text are kept exactly as they are.
"""
import argparse
import datetime
import os
import re
import subprocess
import sys

BASE = 'https://chandrashaker.com/courses/'
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITEMAP = os.path.join(ROOT, 'sitemap.xml')


def git(*args):
    return subprocess.run(['git', '-C', ROOT] + list(args), capture_output=True, text=True).stdout.strip()


def page_file(loc):
    """Map a sitemap URL to the repo file that serves it, or None."""
    if not loc.startswith(BASE):
        return None
    path = loc[len(BASE):]
    candidates = [path + 'index.html'] if (path == '' or path.endswith('/')) else [path + '.html', path + '/index.html', path]
    for c in candidates:
        if os.path.isfile(os.path.join(ROOT, c)):
            return c
    return None


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('--dry-run', action='store_true')
    ap.add_argument('--only', default='')
    args = ap.parse_args()

    raw = open(SITEMAP, 'rb').read().decode('utf-8')
    today = datetime.date.today().isoformat()
    dirty = {line[3:].strip().strip('"') for line in git('status', '--porcelain').splitlines()}
    changed, missing = [], []

    def fix(m):
        block = m.group(0)
        loc = re.search(r'<loc>(.*?)</loc>', block).group(1).strip()
        lm = re.search(r'(<lastmod>)(.*?)(</lastmod>)', block)
        f = page_file(loc)
        if f is None:
            missing.append(loc)
            return block
        if not f.startswith(args.only) or not lm:
            return block
        new = today if f in dirty else git('log', '-1', '--format=%cs', '--', f)
        if not new or new == lm.group(2):
            return block
        changed.append((loc, lm.group(2), new))
        return block[:lm.start(2)] + new + block[lm.end(2):]

    out = re.sub(r'<url>.*?</url>', fix, raw, flags=re.S)
    if not args.dry_run and out != raw:
        open(SITEMAP, 'wb').write(out.encode('utf-8'))
    for loc, old, new in changed:
        print('%s  %s -> %s' % (loc, old, new))
    print('%d entr%s %s%s' % (len(changed), 'y' if len(changed) == 1 else 'ies',
                              'would change' if args.dry_run else 'changed', ' (dry run)' if args.dry_run else ''))
    for loc in missing:
        print('warning: no page file found for', loc, file=sys.stderr)


if __name__ == '__main__':
    main()
