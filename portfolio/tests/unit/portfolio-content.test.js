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

  it.each([
    ["en", "Product Designer", /Product Design/i],
    ["fr", "Designer produit", /design produit/i],
  ])("positions %s for Product Design roles", (lang, current, targetPattern) => {
    const content = getPortfolioV2(lang);
    expect(content.identity.current).toBe(current);
    expect(content.identity.target).toMatch(targetPattern);
    expect(content.identity.target).not.toMatch(/frontend|design engineer|support|assistance/i);
  });

  it.each([
    ["en", "View selected work", "About my practice"],
    ["fr", "Voir les projets", "Découvrir ma pratique"],
  ])("uses recruiter-first hero actions in %s", (lang, primaryAction, secondaryAction) => {
    const hero = getPortfolioV2(lang).hero;
    expect(hero.primaryAction).toBe(primaryAction);
    expect(hero.secondaryAction).toBe(secondaryAction);
    expect(hero.secondaryAction).not.toMatch(/github/i);
  });

  it.each(["en", "fr"])("frames %s labs as system experiments", (lang) => {
    const labs = getPortfolioV2(lang).labs;
    expect(labs.current).toMatch(/systems lab|laboratoire de systèmes/i);
    expect(`${labs.title} ${labs.lead}`).not.toMatch(/scrimba/i);
  });

  it("does not expose invented project evidence", () => {
    const work = getPortfolioV2("en").work;
    expect(work.status).toBe(PROJECT_STATUSES.paused);
    expect(work.items).toEqual([]);
    expect(work.liveUrl).toBeUndefined();
  });

  it("uses the current Gmail address as the single contact destination", () => {
    expect(getPortfolioV2("en").links.email).toBe("sampayobreno@gmail.com");
    expect(getPortfolioV2("fr").links.email).toBe("sampayobreno@gmail.com");
  });
});
