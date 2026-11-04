#!/usr/bin/env python3
# .surge-final.py — 最終試行: deploy 後、検証メールを最長40分バックグラウンドで待ち、
# 届き次第クリック→200確認→deploy/.surge-state.json に READY を書く
import json, os, re, secrets, ssl, subprocess, sys, time
import urllib.request

ROOT = '/home/user/airliner-sim'
STATE = ROOT + '/deploy/.surge-state.json'
ctx = ssl.create_default_context()

def w(st, **kw):
    d = {'state': st, 'ts': time.strftime('%F %T'), **kw}
    json.dump(d, open(STATE, 'w'), indent=1)
    print(json.dumps(d), flush=True)

def api(url, method='GET', body=None, token=None):
    data = json.dumps(body).encode() if body else None
    for k in range(5):
        try:
            r = urllib.request.Request('https://api.mail.tm' + url, data=data, method=method)
            r.add_header('Content-Type', 'application/json')
            if token:
                r.add_header('Authorization', 'Bearer ' + token)
            with urllib.request.urlopen(r, timeout=30, context=ctx) as f:
                return json.load(f)
        except Exception:
            if k == 4:
                raise
            time.sleep(15)

try:
    dom = api('/domains')['hydra:member'][0]['domain']
    P = secrets.token_urlsafe(12) + 'Aa1'
    E = f"airliner-{secrets.token_hex(3)}@{dom}"
    api('/accounts', 'POST', {'address': E, 'password': P})
    tok = api('/token', 'POST', {'address': E, 'password': P})['token']
    D = f"flightsim-{secrets.token_hex(3)}.surge.sh"
    w('account_created', domain=D, url=f'https://{D}/')
    json.dump({'mail': E, 'pass': P, 'domain': D, 'mailtm_token': tok},
              open(ROOT + '/deploy/.surge-cred.json', 'w'))

    # deploy（PTY で email/password を流す）
    open('/tmp/pty2.py', 'w').write('''
import os, pty, select, time
E=os.environ["E"].encode()+b"\\n"; P=os.environ["P"].encode()+b"\\n"
mfd, sfd = pty.openpty()
pid = os.fork()
if pid == 0:
    os.setsid(); os.dup2(sfd,0); os.dup2(sfd,1); os.dup2(sfd,2)
    os.execvp("npx",["npx","--yes","surge", os.environ["DIR"], os.environ["DOM"]])
os.close(sfd)
t0=time.time(); stage=0
while time.time()-t0<180:
    r,_,_ = select.select([mfd],[],[],2)
    if r:
        try: d=os.read(mfd,65536)
        except OSError: break
        if not d: break
        print(d.decode(errors="replace"),end="",flush=True)
        low=d.lower()
        if stage==0 and b"email" in low: os.write(mfd,E); stage=1
        elif stage==1 and b"password" in low: os.write(mfd,P); stage=2
    else:
        try:
            st=os.waitpid(pid, os.WNOHANG)[0]
            if st: break
        except ChildProcessError: break
''')
    env = {**os.environ, 'TERM': 'dumb', 'E': E, 'P': P, 'DOM': D, 'DIR': ROOT + '/web'}
    t = subprocess.run([sys.executable, '/tmp/pty2.py'], cwd=ROOT,
                       capture_output=True, text=True, timeout=220, env=env)
    out = (t.stdout or '') + (t.stderr or '')
    if 'Success!' not in out:
        w('deploy_failed', tail=out[-300:])
        sys.exit(2)
    w('deployed_awaiting_verification', url=f'https://{D}/')

    t0 = time.time()
    while time.time() - t0 < 2400:
        time.sleep(35)
        try:
            msgs = api('/messages', token=tok)['hydra:member']
        except Exception as e:
            print(f'poll err {e}', flush=True)
            continue
        if not msgs:
            continue
        m = api('/messages/' + msgs[0]['id'], token=tok)
        body = ' '.join(m.get('html') or []) + ' ' + (m.get('text') or '')
        urls = [u.rstrip('>').replace('&amp;', '&') for u in re.findall(r'https?://[^\s"\'<>]+', body)]
        v = next((u for u in urls if 'surge' in u or 'verif' in u), urls[0] if urls else '')
        if not v:
            w('mail_no_link', subj=str(msgs[0].get('subject'))[:80])
            break
        print('VERIFY LINK: ' + v[:140], flush=True)
        try:
            r = urllib.request.Request(v, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(r, timeout=40, context=ctx) as f:
                w('verification_clicked', http=f.status)
        except Exception as e:
            w('verify_click_failed', err=str(e)[:120])
        time.sleep(25)
        for i in range(10):
            try:
                with urllib.request.urlopen('https://' + D + '/', timeout=30, context=ctx) as f:
                    code = f.status
            except Exception:
                code = 0
            if code == 200:
                w('READY', url=f'https://{D}/')
                sys.exit(0)
            time.sleep(20)
        w('clicked_but_still_blocked', url=f'https://{D}/')
        sys.exit(4)
    w('NO_MAIL_TIMEOUT', waited_s=2400)
except SystemExit:
    raise
except Exception as e:
    w('error', err=repr(e)[:200])
    sys.exit(1)
