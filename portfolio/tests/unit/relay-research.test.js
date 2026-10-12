import { describe, expect, it } from "vitest";
import {
  getRelayResearchSummary,
  relayResearchDisclosure,
  relayResearchSources,
  relayWorkflow,
} from "@/lib/relayResearch";

const requiredSupports = [
  "ecommerce-orders",
  "carrier-tracking",
  "customer-service",
  "cross-border-compliance",
];

describe("Relay research foundation", () => {
  it("grounds each product assumption in dated public sources", () => {
    const coveredTopics = new Set();

    expect(relayResearchSources.length).toBeGreaterThanOrEqual(4);
    for (const source of relayResearchSources) {
      expect(source).toEqual(expect.objectContaining({
        title: expect.any(String),
        url: expect.stringMatching(/^https:\/\//),
        publisher: expect.any(String),
        accessedOn: "2026-10-08",
        supports: expect.any(Array),
        kind: expect.stringMatching(/^(public-guidance|platform-documentation|carrier-documentation)$/),
      }));
      source.supports.forEach((topic) => coveredTopics.add(topic));
    }

    requiredSupports.forEach((topic) => expect(coveredTopics).toContain(topic));
  });

  it("keeps the workflow bounded to the six approved stages", () => {
    expect(relayWorkflow.map(({ id }) => id)).toEqual([
      "queue",
      "investigate",
      "assign",
      "resolve",
      "approve",
      "close",
    ]);
    relayWorkflow.forEach((stage) => {
      expect(stage.decision).toBeTruthy();
      expect(stage.evidence).toBeTruthy();
    });
  });

  it("discloses synthetic data and unperformed participant validation", () => {
    expect(relayResearchDisclosure).toEqual(expect.objectContaining({
      projectType: "Independent Product / 2026",
      status: "Research prototype",
      dataOrigin: "synthetic",
      participantResearchCompleted: false,
      usabilityTestingCompleted: false,
      businessImpactClaimed: false,
    }));
  });

  it.each(["en", "fr"])("returns an honest localized %s summary", (lang) => {
    const summary = getRelayResearchSummary(lang);
    expect(summary.lang).toBe(lang);
    expect(summary.verifiedFacts.length).toBeGreaterThan(0);
    expect(summary.designAssumptions.length).toBeGreaterThan(0);
    expect(summary.openQuestions.length).toBeGreaterThan(0);
    expect(summary.validationLabel).toMatch(lang === "fr" ? /validation prévue/i : /planned validation/i);
  });
});
