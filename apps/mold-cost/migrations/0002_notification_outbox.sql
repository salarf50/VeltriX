CREATE TABLE IF NOT EXISTS notification_outbox (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  event_key TEXT NOT NULL,
  user_id TEXT NOT NULL,
  event_type TEXT NOT NULL CHECK (event_type IN ('registration', 'usage')),
  channel TEXT NOT NULL CHECK (channel IN ('telegram', 'bale')),
  message TEXT NOT NULL,
  created_at TEXT NOT NULL,
  next_attempt_at TEXT NOT NULL,
  attempts INTEGER NOT NULL DEFAULT 0 CHECK (attempts >= 0),
  lease_until TEXT,
  delivered_at TEXT,
  last_error TEXT,
  UNIQUE (event_key, channel),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_notification_outbox_pending
  ON notification_outbox(delivered_at, next_attempt_at, lease_until, id);
