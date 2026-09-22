import { describe, expect, it } from "vitest";
import { getPortfolioV2, PROJECT_STATUSES } from "@/lib/portfolioV2";

describe("portfolio v2 non-case content", () => {
  it.each(["en", "fr"])("has complete %s hubs", (lang) => {
    const content = getPortfolioV2(lang);
    expect(content.hero.title).toBeTruthy();
    expect(content.capabilities).toHaveLength(3);
    expect(content.process).toHaveLength(5);
    expect(content.work.status).toBe(PROJECT_STATUSES.paused);
    expect(content.links.github).toMatch(/^https:\/\/github\.com\/brenosampaio-dev/);
  });

  it("does not claim Design Engineer as the current identity", () => {
    expect(getPortfolioV2("en").identity.current).toBe("Product Designer");
    expect(getPortfolioV2("en").identity.target).toContain("Design Engineer");
  });

  it("does not expose invented project evidence", () => {
    const work = getPortfolioV2("en").work;
    expect(work.items).toEqual([]);
    expect(work.liveUrl).toBeUndefined();
  });
});
