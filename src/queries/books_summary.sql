SELECT
  b.id,
  b.member_id,
  b.title,
  b.author,
  b.pages,
  b.rating,
  b.finished_at,
  b.notes
FROM books b
WHERE b.household_id = current_setting('app.household_id', true)::uuid
ORDER BY b.finished_at DESC
LIMIT 200
