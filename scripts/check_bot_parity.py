from pathlib import Path
import re
import sys

root = Path(__file__).resolve().parents[1]
telegram = (root / 'telegram-bot/worker-full.js').read_text()
baleh = (root / 'telegram-bot/worker-baleh.js').read_text()
toml_t = (root / 'telegram-bot/wrangler.toml').read_text()
toml_b = (root / 'telegram-bot/wrangler-baleh.toml').read_text()

errors = []
required = [
    'publicStatsResponse', 'recordBotUserStat', 'sendDailyReminder',
    'monthlyOverview', 'isCompletedLead', 'adminLeadKeyboard',
    "'cache-control'",
    "if (tehranDay(new Date()).endsWith('-01')) await monthlyOverview(env);",
]
for marker in required:
    if marker not in telegram:
        errors.append(f'telegram missing: {marker}')
    if marker not in baleh:
        errors.append(f'baleh missing: {marker}')
if 'weeklyReview' in telegram or 'weeklyReview' in baleh:
    errors.append('legacy weeklyReview must not remain active')

kv_t = re.search(r'^id\s*=\s*"([^"]+)"', toml_t, re.M)
kv_b = re.search(r'^id\s*=\s*"([^"]+)"', toml_b, re.M)
if not kv_t or not kv_b or kv_t.group(1) != kv_b.group(1):
    errors.append('Telegram and Baleh KV namespace IDs differ')
cron_t = re.findall(r'^crons\s*=\s*(.+)$', toml_t, re.M)
cron_b = re.findall(r'^crons\s*=\s*(.+)$', toml_b, re.M)
if cron_t != cron_b:
    errors.append('Telegram and Baleh cron schedules differ')

# These are platform-independent contract markers for the public stats API.
for field in ['online', 'bot_users_total', 'bot_users', 'updated_at']:
    if field not in telegram or field not in baleh:
        errors.append(f'public stats field missing in one bot: {field}')

if errors:
    print('BOT PARITY CHECK FAILED')
    print('\n'.join(f'- {e}' for e in errors))
    sys.exit(1)
print('BOT PARITY CHECK PASSED: Telegram/Baleh contracts, KV binding, cron, and reporting markers agree.')
