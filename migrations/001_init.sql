CREATE TABLE IF NOT EXISTS books (
  id           TEXT    NOT NULL,
  household_id UUID    NOT NULL DEFAULT current_setting('app.household_id', true)::uuid,
  member_id    TEXT    NOT NULL,
  title        TEXT    NOT NULL,
  author       TEXT    NOT NULL DEFAULT '',
  pages        INTEGER,
  current_page INTEGER,
  rating       INTEGER,
  finished_at  TEXT    NOT NULL DEFAULT '',
  notes        TEXT    NOT NULL DEFAULT '',
  created_at   TEXT    NOT NULL,
  updated_at   TEXT    NOT NULL,
  PRIMARY KEY (household_id, id)
)
