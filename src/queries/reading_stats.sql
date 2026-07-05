SELECT
  b.member_id,
  COUNT(*)                                                        AS total_books,
  COALESCE(SUM(b.pages), 0)                                       AS total_pages,
  ROUND(AVG(b.rating), 1)                                         AS avg_rating,
  MAX(b.finished_at)                                              AS last_finished
FROM app_reading_log__books b
GROUP BY b.member_id
ORDER BY total_books DESC
