#!/usr/bin/env bash
# scripts/tunnel-watchdog.sh
# quick tunnel の「プロセスは生きているのに edge が URL を回収した(1033/530)」状態を自己回復させる番人。
#   - /tmp/cf.log を見張り、最新の trycloudflare URL を検出して URL ファイルへ同期
#       /tmp/tunnel-url.txt          … 機械用
#       TUNNEL_URL.txt (workspace)  … ユーザー/チャット用（recycle 後も最後のURLが残る）
#   - 現行 URL への HTTP 200 チェックに 3 回連続で失敗したら cloudflared を kill
#     （既存のスーパーバイザ ループが 8 秒後に再起動 → 新しい URL が自動発行・同期される）
set -u
LOG=/tmp/cf.log
URLF=/tmp/tunnel-url.txt
WSF=/home/user/airliner-sim/TUNNEL_URL.txt
INTERVAL=30
FAILS=0

cur() { cat "$URLF" 2>/dev/null || true; }
seturl() { echo "$1" > "$URLF"; echo "$1" > "$WSF"; echo "$(date '+%F %T') URL -> $1"; }

while true; do
  # 1) ログ上の最新URLがファイルとズレていたら同期（手動kill/supervisor再起動にも追従）
  latest=$(grep -ao 'https://[a-z0-9-]*\.trycloudflare\.com' "$LOG" 2>/dev/null | tail -1)
  if [ -n "$latest" ] && [ "$latest" != "$(cur)" ]; then
    seturl "$latest"
    FAILS=0
  fi

  # 2) 疎通監視: 3 回連続失敗で強制再発行
  u=$(cur)
  if [ -n "$u" ]; then
    code=$(curl -s -o /dev/null -w '%{http_code}' --max-time 20 "$u/" || echo 000)
    if [ "$code" = "200" ]; then
      FAILS=0
    else
      FAILS=$((FAILS+1))
      echo "$(date '+%F %T') health check failed (HTTP $code) fails=$FAILS"
      if [ "$FAILS" -ge 3 ]; then
        echo "$(date '+%F %T') giving up on $u — killing cloudflared to force re-issue"
        pkill -9 -x cloudflared 2>/dev/null
        FAILS=0
      fi
    fi
  fi
  sleep "$INTERVAL"
done
