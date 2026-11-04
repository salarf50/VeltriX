PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  workshop TEXT NOT NULL,
  phone TEXT NOT NULL,
  phone_normalized TEXT NOT NULL UNIQUE,
  follow_confirmed INTEGER NOT NULL DEFAULT 0 CHECK (follow_confirmed IN (0, 1)),
  privacy_accepted INTEGER NOT NULL DEFAULT 0 CHECK (privacy_accepted IN (0, 1)),
  privacy_accepted_at TEXT,
  privacy_version TEXT NOT NULL DEFAULT '1.0',
  is_admin INTEGER NOT NULL DEFAULT 0 CHECK (is_admin IN (0, 1)),
  created_at TEXT NOT NULL,
  last_seen_at TEXT NOT NULL,
  subscription_expires_at TEXT,
  registration_notified INTEGER NOT NULL DEFAULT 0 CHECK (registration_notified IN (0, 1)),
  disabled INTEGER NOT NULL DEFAULT 0 CHECK (disabled IN (0, 1))
);

CREATE TABLE IF NOT EXISTS sessions (
  token_hash TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  created_at TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_sessions_user_expires
  ON sessions(user_id, expires_at);

CREATE TABLE IF NOT EXISTS usage_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL,
  month_key TEXT NOT NULL,
  used_at TEXT NOT NULL,
  request_id TEXT NOT NULL,
  counts_against_quota INTEGER NOT NULL DEFAULT 1 CHECK (counts_against_quota IN (0, 1)),
  UNIQUE (user_id, request_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_usage_month
  ON usage_events(user_id, month_key, counts_against_quota);

CREATE TABLE IF NOT EXISTS subscription_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL,
  activated_at TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  activated_by TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_subscription_user
  ON subscription_log(user_id, activated_at);

CREATE TABLE IF NOT EXISTS rate_limits (
  rate_key TEXT PRIMARY KEY,
  window_start INTEGER NOT NULL,
  hits INTEGER NOT NULL
);
