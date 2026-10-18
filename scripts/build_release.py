#!/usr/bin/env python3
"""Build installable Foundry VTT release assets with optional real GitHub links."""
from __future__ import annotations
import argparse
import hashlib
import json
from pathlib import Path
import re
import zipfile

ROOT = Path(__file__).resolve().parent.parent
INSTALL_DIRS = ('module', 'templates', 'styles', 'lang')
INSTALL_FILES = ('README.md',)

def release_files(repo: str | None, tag: str | None, output: Path) -> None:
    manifest = json.loads((ROOT / 'system.json').read_text(encoding='utf-8'))
    system_id = manifest['id']
    version = manifest['version']
    release_tag = tag or f'v{version}'
    if release_tag != f'v{version}':
        raise ValueError(f'Tag {release_tag!r} does not match system version {version!r}')
    if not re.fullmatch(r'[a-z0-9][a-z0-9-]*', system_id):
        raise ValueError('Invalid system id')
    if repo:
        if not re.fullmatch(r'[A-Za-z0-9_.-]+/[A-Za-z0-9_.-]+', repo):
            raise ValueError('GitHub repository must be OWNER/REPOSITORY')
        base=f'https://github.com/{repo}/releases'
        manifest['manifest'] = f'{base}/latest/download/system.json'
        manifest['download'] = f'{base}/download/{release_tag}/{system_id}.zip'
        manifest['url'] = f'https://github.com/{repo}'
    else:
        for k in ('manifest', 'download', 'url'):
            manifest.pop(k, None)
    output.mkdir(parents=True,exist_ok=True)
    manifest_file = output / 'system.json'
    manifest_bytes = (json.dumps(manifest, ensure_ascii=False, indent=2)+'\n').encode('utf-8')
    manifest_file.write_bytes(manifest_bytes)
    pkg_zip=output / f'{system_id}.zip'
    with zipfile.ZipFile(pkg_zip, 'w', compression=zipfile.ZIP_DEFLATED, compresslevel=9) as z:
        z.writestr('system.json', manifest_bytes)
        for fn in INSTALL_FILES:
            z.write(ROOT / fn, fn)
        for dn in INSTALL_DIRS:
            for p in sorted((ROOT / dn).rglob('*')):
                if p.is_file() and not p.name.startswith('.'):
                    z.write(p, p.relative_to(ROOT).as_posix())
    assets = [manifest_file, pkg_zip]
    checksum='\n'.join(hashlib.sha256(p.read_bytes()).hexdigest()+'  '+p.name for p in assets)+'\n'
    (output / 'SHA256SUMS.txt').write_text(checksum,encoding='utf-8')
    print(f'Generated assets: {pkg_zip}, {manifest_file}')
    print('GitHub manifest configured' if repo else 'LOCAL ONLY: no GitHub URLs until repository is known')

if __name__ == '__main__':
    ap=argparse.ArgumentParser(description=__doc__)
    ap.add_argument('--repo',help='OWNER/REPO: configures real manifest and download URLs')
    ap.add_argument('--tag',help='Release tag, e.g. v0.1.0')
    ap.add_argument('--output',type=Path,default=ROOT / 'dist' / 'release')
    args=ap.parse_args()
    release_files(args.repo,args.tag,args.output)
