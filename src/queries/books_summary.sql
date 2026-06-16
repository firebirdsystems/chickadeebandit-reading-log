SELECT
  b.id,
  b.member_id,
  b.title,
  b.author,
  b.pages,
  b.rating,
  b.finished_at,
  b.notes
FROM app_reading_log__books b
ORDER BY b.finished_at DESC
LIMIT 200
