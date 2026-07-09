import { describe, it, expect } from "vitest";
import {
  sid, memberName, visibleBooks, formatDate, starStr, bookProgress, readingStats,
} from "../src/logic.js";

describe("sid", () => {
  it("strips unsafe characters", () => {
    expect(sid("abc-1_Z")).toBe("abc-1_Z");
    expect(sid("a'b\");x")).toBe("abx");
    expect(sid(null)).toBe("");
  });
});

describe("memberName", () => {
  it("resolves from the map, defaults Unknown", () => {
    expect(memberName(new Map([["m", "Sam"]]), "m")).toBe("Sam");
    expect(memberName(new Map(), "m")).toBe("Unknown");
  });
});

describe("visibleBooks", () => {
  const books = [
    { id: "1", member_id: "kid", finished_at: "2026-02-01" },
    { id: "2", member_id: "kid", finished_at: "" },
    { id: "3", member_id: "other", finished_at: "2026-03-01" },
  ];
  it("scopes to active member tab", () => {
    expect(visibleBooks(books, "kid", null).map(b => b.id)).toEqual(["2", "1"]);
  });
  it("a non-adult sees only their own", () => {
    expect(visibleBooks(books, null, { id: "kid", role: "child" }).map(b => b.id)).toEqual(["2", "1"]);
  });
  it("an adult sees all, in-progress first", () => {
    const out = visibleBooks(books, null, { role: "adult" });
    expect(out[0].id).toBe("2"); // in-progress first
  });
});

describe("formatDate", () => {
  it("empty for falsy, formatted otherwise", () => {
    expect(formatDate("")).toBe("");
    expect(formatDate("2026-07-08")).toMatch(/Jul/);
  });
});

describe("starStr", () => {
  it("renders filled and empty stars", () => {
    expect(starStr(3)).toBe("★★★☆☆");
    expect(starStr(0)).toBe("");
  });
});

describe("bookProgress", () => {
  it("null when no pages", () => expect(bookProgress({ pages: 0 })).toBe(null));
  it("null when unstarted and unfinished", () => expect(bookProgress({ pages: 100, current_page: 0 })).toBe(null));
  it("computes active progress", () => {
    expect(bookProgress({ pages: 200, current_page: 50 })).toEqual({ pct: 25, cls: "active", label: "Page 50 of 200 · 25%" });
  });
  it("computes finished progress", () => {
    expect(bookProgress({ pages: 200, finished_at: "2026-01-01" })).toMatchObject({ pct: 100, cls: "finished" });
  });
});

describe("readingStats", () => {
  it("counts finished, in-progress, and total pages", () => {
    const books = [
      { finished_at: "x", pages: 100 },
      { finished_at: "", pages: 300 },
      { finished_at: "y", pages: 50 },
    ];
    expect(readingStats(books)).toEqual({ finishedCount: 2, inProgressCount: 1, pages: 150 });
  });
});
