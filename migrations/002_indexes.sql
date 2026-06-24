CREATE INDEX IF NOT EXISTS idx_reading_log_books_created_at ON app_reading_log__books(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reading_log_books_member_id  ON app_reading_log__books(member_id);
