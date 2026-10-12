import { describe, expect, it } from "vitest";
import { getPortfolioV2, PROJECT_STATUSES } from "@/lib/portfolioV2";

describe("portfolio v2 non-case content", () => {
  it.each(["en", "fr"])("has complete %s hubs", (lang) => {
    const content = getPortfolioV2(lang);
    expect(content.hero.title).toBeTruthy();
    expect(content.capabilities).toHaveLength(3);
    expect(content.process).toHaveLength(5);
    expect(content.work.status).toBe(PROJECT_STATUSES.building);
    expect(content.work.items.map(({ slug }) => slug)).toEqual(["relay", "basis", "signalroom"]);
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

  it("publishes only Relay while keeping future cases non-clickable", () => {
    const work = getPortfolioV2("en").work;
    expect(work.status).toBe(PROJECT_STATUSES.building);
    expect(work.items[0]).toEqual(expect.objectContaining({
      slug: "relay",
      href: "/work/relay",
      status: "research-prototype",
    }));
    expect(work.items.slice(1).every(({ href }) => href === null)).toBe(true);
    expect(work.items.every((item) => item.client === undefined && item.impact === undefined)).toBe(true);
    expect(work.liveUrl).toBeUndefined();
  });

  it("uses the current Gmail address as the single contact destination", () => {
    expect(getPortfolioV2("en").links.email).toBe("sampayobreno@gmail.com");
    expect(getPortfolioV2("fr").links.email).toBe("sampayobreno@gmail.com");
  });
});
