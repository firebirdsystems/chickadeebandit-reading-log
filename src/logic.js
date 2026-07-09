// Pure, testable logic extracted from index.html.
// No DOM, no network — safe to import from Node for unit tests.

import { isAdult } from "./shared.js";
export { isAdult };

// Neutralize DB-derived ids before interpolating into inline on* handlers.
export function sid(v) {
  return String(v ?? "").replace(/[^A-Za-z0-9_-]/g, "");
}

export function memberName(memberMap, id) {
  return memberMap.get(id) ?? "Unknown";
}

// Books scoped to the active member tab (or, for a non-adult viewer, their own),
// sorted in-progress first then finished by most recent.
export function visibleBooks(books, activeMemberId, currentMe) {
  let vis;
  if (activeMemberId) vis = books.filter(b => b.member_id === activeMemberId);
  else if (currentMe && !isAdult(currentMe)) vis = books.filter(b => b.member_id === currentMe.id);
  else vis = books;

  return [...vis].sort((a, b) => {
    const aActive = !a.finished_at;
    const bActive = !b.finished_at;
    if (aActive !== bActive) return aActive ? -1 : 1;
    if (!aActive) return b.finished_at > a.finished_at ? 1 : -1;
    return 0;
  });
}

export function formatDate(s) {
  if (!s) return "";
  try {
    return new Date(s + "T12:00:00").toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
  } catch {
    return s;
  }
}

export function starStr(n) {
  return n ? `${"★".repeat(n)}${"☆".repeat(5 - n)}` : "";
}

// Progress data for a book, or null when there is nothing to show.
export function bookProgress(b) {
  const pages = b.pages || 0;
  if (!pages) return null;

  const finished = !!b.finished_at;
  const cur = finished ? pages : (b.current_page || 0);
  if (!finished && cur === 0) return null;

  const pct = Math.min(100, Math.round((cur / pages) * 100));
  const cls = finished ? "finished" : "active";
  const label = finished
    ? `✓ Finished · ${pages.toLocaleString()} pages`
    : `Page ${cur.toLocaleString()} of ${pages.toLocaleString()} · ${pct}%`;
  return { pct, cls, label };
}

export function readingStats(books) {
  const finished = [], inProgress = [];
  for (const b of books) (b.finished_at ? finished : inProgress).push(b);
  const pages = finished.reduce((s, b) => s + (b.pages || 0), 0);
  return { finishedCount: finished.length, inProgressCount: inProgress.length, pages };
}
