SELECT
  b.member_id,
  COUNT(*)                                                        AS total_books,
  COALESCE(SUM(b.pages), 0)                                       AS total_pages,
  ROUND(AVG(b.rating) FILTER (WHERE b.rating IS NOT NULL), 1)     AS avg_rating,
  MAX(b.finished_at)                                              AS last_finished
FROM books b
WHERE b.household_id = current_setting('app.household_id', true)::uuid
GROUP BY b.member_id
ORDER BY total_books DESC
