-- books_summary orders by finished_at DESC under LIMIT 200. The existing index
-- is on created_at, which is a different column and cannot serve this order.
CREATE INDEX IF NOT EXISTS idx_reading_log_books_finished_at
  ON app_reading_log__books(finished_at);
