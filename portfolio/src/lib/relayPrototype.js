export const RELAY_ROLES = Object.freeze({
  specialist: "specialist",
  operationsLead: "operations-lead",
  complianceReviewer: "compliance-reviewer",
  manager: "manager",
});

export const RELAY_STATES = Object.freeze({
  open: "open",
  investigating: "investigating",
  assigned: "assigned",
  escalated: "escalated",
  blocked: "blocked",
  resolved: "resolved",
  closed: "closed",
});

const makeEvidence = (available, required) => Object.freeze({
  available,
  required,
  completeness: Math.round((available / required) * 100),
});

const syntheticCases = [
  {
    id: "SYN-REL-2401",
    customerReference: "SYN-CUSTOMER-101",
    dataOrigin: "synthetic",
    title: "Delivery promise passed while carrier status remains unchanged",
    market: "ES → FR",
    priority: "urgent",
    priorityScore: 100,
    state: RELAY_STATES.open,
    owner: null,
    sla: { label: "Overdue by 3h", overdue: true, dueAt: "2026-10-08T09:00:00Z" },
    evidence: makeEvidence(3, 5),
    blockedReason: null,
    pendingResolution: null,
    resolution: null,
    audit: [{ at: "2026-10-08T08:10:00Z", action: "exception-created", actor: "Relay synthetic fixture", detail: "Promised delivery date passed" }],
  },
  {
    id: "SYN-REL-2402",
    customerReference: "SYN-CUSTOMER-102",
    dataOrigin: "synthetic",
    title: "Replacement shipment needs a confirmed owner",
    market: "DE → NL",
    priority: "high",
    priorityScore: 72,
    state: RELAY_STATES.assigned,
    owner: "Noa",
    sla: { label: "Due in 2h", overdue: false, dueAt: "2026-10-08T14:00:00Z" },
    evidence: makeEvidence(4, 5),
    blockedReason: null,
    pendingResolution: null,
    resolution: null,
    audit: [{ at: "2026-10-08T08:30:00Z", action: "assigned", actor: "Jonas", detail: "Assigned to Noa" }],
  },
  {
    id: "SYN-REL-2403",
    customerReference: "SYN-CUSTOMER-103",
    dataOrigin: "synthetic",
    title: "Refund proposal exceeds specialist authority",
    market: "IT → BE",
    priority: "high",
    priorityScore: 64,
    state: RELAY_STATES.blocked,
    owner: "Mira",
    sla: { label: "Due today", overdue: false, dueAt: "2026-10-08T17:00:00Z" },
    evidence: makeEvidence(5, 5),
    blockedReason: "manager-approval-required",
    pendingResolution: "refund",
    resolution: null,
    audit: [{ at: "2026-10-08T09:05:00Z", action: "approval-requested", actor: "Mira", detail: "Refund requires manager authority" }],
  },
  {
    id: "SYN-REL-2404",
    customerReference: "SYN-CUSTOMER-104",
    dataOrigin: "synthetic",
    title: "Carrier evidence reconciled and customer update prepared",
    market: "PT → ES",
    priority: "normal",
    priorityScore: 24,
    state: RELAY_STATES.resolved,
    owner: "Mira",
    sla: { label: "Within SLA", overdue: false, dueAt: "2026-10-09T10:00:00Z" },
    evidence: makeEvidence(4, 4),
    blockedReason: null,
    pendingResolution: null,
    resolution: "request-carrier-update",
    audit: [{ at: "2026-10-08T09:20:00Z", action: "resolved", actor: "Mira", detail: "Carrier update requested" }],
  },
];

export const relaySyntheticCases = Object.freeze(
  syntheticCases.map((exception) => Object.freeze(exception)),
);

export function getPrioritizedCases(exceptions = relaySyntheticCases) {
  return [...exceptions].sort((a, b) => b.priorityScore - a.priorityScore);
}

export function getVisibleActions(role, exception) {
  if (!exception) return [];

  if (exception.state === RELAY_STATES.blocked) {
    return role === RELAY_ROLES.manager ? ["approve", "reject"] : ["view-approval"];
  }

  if (exception.state === RELAY_STATES.resolved) return ["close"];
  if (exception.state === RELAY_STATES.closed) return [];

  const common = ["investigate", "assign", "escalate", "propose-resolution"];
  if (role === RELAY_ROLES.complianceReviewer) return [...common, "review-compliance"];
  return common;
}

function appendAudit(exception, actor, action, detail) {
  const sequence = exception.audit.length + 1;
  return [
    ...exception.audit,
    {
      at: `2026-10-08T10:${String(sequence).padStart(2, "0")}:00Z`,
      action,
      actor: actor.name,
      detail,
    },
  ];
}

function requireManager(actor) {
  if (actor.role !== RELAY_ROLES.manager) {
    throw new Error("Manager approval required for this resolution");
  }
}

export function applyRelayAction(exception, action, actor) {
  if (!exception || !action?.type || !actor?.role || !actor?.name) {
    throw new Error("A valid exception, action and actor are required");
  }

  switch (action.type) {
    case "investigate":
      return {
        ...exception,
        state: RELAY_STATES.investigating,
        audit: appendAudit(exception, actor, "investigation-opened", "Evidence review started"),
      };
    case "assign":
      if (!action.assignee) throw new Error("Assignment requires an assignee");
      return {
        ...exception,
        state: RELAY_STATES.assigned,
        owner: action.assignee,
        audit: appendAudit(exception, actor, "assigned", `Assigned to ${action.assignee}`),
      };
    case "escalate":
      return {
        ...exception,
        state: RELAY_STATES.escalated,
        audit: appendAudit(exception, actor, "escalated", action.reason || "Escalated for review"),
      };
    case "propose-resolution":
      if (!action.resolution) throw new Error("A resolution is required");
      if (action.sensitive) {
        return {
          ...exception,
          state: RELAY_STATES.blocked,
          blockedReason: "manager-approval-required",
          pendingResolution: action.resolution,
          audit: appendAudit(exception, actor, "approval-requested", `${action.resolution} requires manager authority`),
        };
      }
      return {
        ...exception,
        state: RELAY_STATES.resolved,
        resolution: action.resolution,
        audit: appendAudit(exception, actor, "resolved", action.resolution),
      };
    case "approve":
      requireManager(actor);
      if (exception.state !== RELAY_STATES.blocked || !exception.pendingResolution) {
        throw new Error("No blocked resolution is waiting for approval");
      }
      return {
        ...exception,
        state: RELAY_STATES.resolved,
        resolution: exception.pendingResolution,
        pendingResolution: null,
        blockedReason: null,
        audit: appendAudit(exception, actor, "resolution-approved", exception.pendingResolution),
      };
    case "reject":
      requireManager(actor);
      return {
        ...exception,
        state: RELAY_STATES.assigned,
        pendingResolution: null,
        blockedReason: null,
        audit: appendAudit(exception, actor, "resolution-rejected", action.reason || "Resolution rejected"),
      };
    case "close":
      if (exception.state !== RELAY_STATES.resolved) {
        throw new Error("Only a resolved exception can be closed");
      }
      return {
        ...exception,
        state: RELAY_STATES.closed,
        audit: appendAudit(exception, actor, "closed", "Exception closed with audit record"),
      };
    default:
      throw new Error(`Unsupported Relay action: ${action.type}`);
  }
}
