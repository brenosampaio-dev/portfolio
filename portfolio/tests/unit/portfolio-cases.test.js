import { describe, expect, it } from "vitest";
import {
  CASE_STATUSES,
  getPortfolioCase,
  getPortfolioCases,
} from "@/lib/portfolioCases";
import { relayResearchSources } from "@/lib/relayResearch";

describe("canonical portfolio case contract", () => {
  it.each([
    ["en", "/work/relay", "Research prototype", "Planned validation"],
    ["fr", "/fr/work/relay", "Prototype de recherche", "Validation prévue"],
  ])("publishes an honest localized Relay case in %s", (lang, href, statusLabel, validationLabel) => {
    const relay = getPortfolioCase("relay", lang);

    expect(relay).toEqual(expect.objectContaining({
      slug: "relay",
      href,
      projectType: "Independent Product / 2026",
      status: CASE_STATUSES.researchPrototype,
      statusLabel,
      dataOrigin: "synthetic",
      validationLabel,
    }));
    expect(relay.title).toBeTruthy();
    expect(relay.summary).toBeTruthy();
    expect(relay.role).toBeTruthy();
    expect(relay.activities.length).toBeGreaterThan(3);
    expect(relay.sections.map(({ id }) => id)).toEqual([
      "problem",
      "constraints",
      "workflow",
      "decisions",
      "prototype",
      "validation",
    ]);
  });

  it("references the real research register without claiming participant or business evidence", () => {
    const relay = getPortfolioCase("relay", "en");

    expect(relay.researchSources).toBe(relayResearchSources);
    expect(relay.researchSources.length).toBeGreaterThan(0);
    expect(relay.disclosures).toEqual(expect.objectContaining({
      publicDeskResearch: true,
      syntheticData: true,
      participantResearchCompleted: false,
      usabilityTestingCompleted: false,
      businessImpactClaimed: false,
    }));
    expect(relay).not.toHaveProperty("client");
    expect(relay).not.toHaveProperty("impact");
    expect(relay).not.toHaveProperty("adoption");
  });

  it.each(["en", "fr"])("keeps Basis and Signalroom visibly future work in %s", (lang) => {
    const cases = getPortfolioCases(lang);

    expect(cases.map(({ slug }) => slug)).toEqual(["relay", "basis", "signalroom"]);
    expect(cases[0].status).toBe(CASE_STATUSES.researchPrototype);
    expect(cases.slice(1).every(({ status }) => status === CASE_STATUSES.futureWork)).toBe(true);
    expect(cases.slice(1).every(({ href }) => href === null)).toBe(true);
  });

  it("falls back to English for unknown locales and returns null for unknown cases", () => {
    expect(getPortfolioCase("relay", "es").href).toBe("/work/relay");
    expect(getPortfolioCase("unknown", "en")).toBeNull();
  });
});
