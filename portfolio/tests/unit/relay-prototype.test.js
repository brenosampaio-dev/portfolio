import { describe, expect, it } from "vitest";
import {
  RELAY_ROLES,
  RELAY_STATES,
  applyRelayAction,
  getPrioritizedCases,
  getVisibleActions,
  relaySyntheticCases,
} from "@/lib/relayPrototype";

const specialist = Object.freeze({ id: "SYN-ACTOR-01", name: "Mira", role: RELAY_ROLES.specialist });
const manager = Object.freeze({ id: "SYN-ACTOR-02", name: "Jonas", role: RELAY_ROLES.manager });

describe("Relay synthetic exception model", () => {
  it("prioritizes overdue and urgent exceptions ahead of ordinary work", () => {
    const prioritized = getPrioritizedCases([...relaySyntheticCases].reverse());

    expect(prioritized[0]).toEqual(expect.objectContaining({
      priority: "urgent",
      sla: expect.objectContaining({ overdue: true }),
    }));
    expect(prioritized.map(({ priorityScore }) => priorityScore)).toEqual(
      [...prioritized.map(({ priorityScore }) => priorityScore)].sort((a, b) => b - a),
    );
  });

  it("uses synthetic identifiers and exposes evidence completeness in every record", () => {
    expect(relaySyntheticCases.length).toBeGreaterThanOrEqual(4);

    relaySyntheticCases.forEach((exception) => {
      expect(exception.id).toMatch(/^SYN-REL-\d{4}$/);
      expect(exception.customerReference).toMatch(/^SYN-CUSTOMER-\d{3}$/);
      expect(exception.dataOrigin).toBe("synthetic");
      expect(exception.evidence.required).toBeGreaterThan(0);
      expect(exception.evidence.available).toBeLessThanOrEqual(exception.evidence.required);
      expect(exception.evidence.completeness).toBe(
        Math.round((exception.evidence.available / exception.evidence.required) * 100),
      );
    });
  });

  it("exposes actions by role and never offers approval to a specialist", () => {
    const openException = relaySyntheticCases.find(({ state }) => state === RELAY_STATES.open);
    const blockedException = relaySyntheticCases.find(({ state }) => state === RELAY_STATES.blocked);

    expect(getVisibleActions(RELAY_ROLES.specialist, openException)).toEqual(
      expect.arrayContaining(["investigate", "assign", "escalate"]),
    );
    expect(getVisibleActions(RELAY_ROLES.specialist, blockedException)).not.toContain("approve");
    expect(getVisibleActions(RELAY_ROLES.manager, blockedException)).toEqual(
      expect.arrayContaining(["approve", "reject"]),
    );
  });

  it("records assignment and escalation without mutating the source record", () => {
    const original = relaySyntheticCases.find(({ state }) => state === RELAY_STATES.open);
    const assigned = applyRelayAction(original, { type: "assign", assignee: specialist.name }, manager);
    const escalated = applyRelayAction(assigned, { type: "escalate", reason: "Carrier evidence conflicts" }, specialist);

    expect(original.owner).toBeNull();
    expect(assigned).toEqual(expect.objectContaining({
      state: RELAY_STATES.assigned,
      owner: specialist.name,
    }));
    expect(escalated.state).toBe(RELAY_STATES.escalated);
    expect(escalated.audit.at(-1)).toEqual(expect.objectContaining({
      action: "escalated",
      actor: specialist.name,
      detail: "Carrier evidence conflicts",
    }));
  });

  it("blocks a sensitive resolution until an authorized manager approves it", () => {
    const original = relaySyntheticCases.find(({ state }) => state === RELAY_STATES.open);
    const blocked = applyRelayAction(
      original,
      { type: "propose-resolution", resolution: "refund", sensitive: true },
      specialist,
    );

    expect(blocked).toEqual(expect.objectContaining({
      state: RELAY_STATES.blocked,
      blockedReason: "manager-approval-required",
      pendingResolution: "refund",
    }));
    expect(() => applyRelayAction(blocked, { type: "approve" }, specialist)).toThrow(
      /manager approval required/i,
    );

    const resolved = applyRelayAction(blocked, { type: "approve" }, manager);
    expect(resolved).toEqual(expect.objectContaining({
      state: RELAY_STATES.resolved,
      resolution: "refund",
      blockedReason: null,
    }));
    expect(resolved.audit.at(-1)).toEqual(expect.objectContaining({
      action: "resolution-approved",
      actor: manager.name,
    }));
  });

  it("rejects only a blocked resolution that is waiting for manager approval", () => {
    const openException = relaySyntheticCases.find(({ state }) => state === RELAY_STATES.open);
    const blocked = applyRelayAction(
      openException,
      { type: "propose-resolution", resolution: "refund", sensitive: true },
      specialist,
    );

    expect(() => applyRelayAction(openException, { type: "reject" }, manager)).toThrow(
      /no blocked resolution/i,
    );
    expect(applyRelayAction(blocked, { type: "reject", reason: "Evidence is incomplete" }, manager)).toEqual(
      expect.objectContaining({
        state: RELAY_STATES.assigned,
        pendingResolution: null,
        blockedReason: null,
      }),
    );
  });

  it("resolves an ordinary permitted action directly and closes it with an audit record", () => {
    const original = relaySyntheticCases.find(({ state }) => state === RELAY_STATES.open);
    const resolved = applyRelayAction(
      original,
      { type: "propose-resolution", resolution: "request-carrier-update", sensitive: false },
      specialist,
    );
    const closed = applyRelayAction(resolved, { type: "close" }, specialist);

    expect(resolved.state).toBe(RELAY_STATES.resolved);
    expect(closed.state).toBe(RELAY_STATES.closed);
    expect(closed.audit.at(-1)).toEqual(expect.objectContaining({
      action: "closed",
      actor: specialist.name,
    }));
  });
});
