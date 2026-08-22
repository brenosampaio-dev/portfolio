// Single source of real content. No invented clients, metrics, or logos.

export const profile = {
  name: "Breno Sampaio",
  role: "Multilingual IT and technical support",
  location: "Valencia, Spain",
  timezone: "Europe/Madrid",
  email: "hello@brenosampaio.com",
  languages: [
    { name: "Portuguese", level: "Native" },
    { name: "Spanish", level: "Fluent" },
    { name: "French", level: "Professional / Fluent" },
    { name: "English", level: "Professional working" },
  ],
};

// Selected work — independent concepts with limitations labelled in the cases.
export const projects = [
  {
    slug: "service-operations",
    category: "Support workflow case",
    title: "Incident & Handover Workflow",
    problem:
      "An operational workflow for logging, assigning, escalating and handing over open incidents with clear status, ownership and history.",
    role: "Incident workflow concept",
    year: "2026",
    href: "/work/service-operations",
  },
  {
    slug: "triageai",
    category: "Support workflow case",
    title: "Multilingual Support Triage",
    problem:
      "A support intake workflow that structures, prioritizes and routes multilingual requests while keeping every outgoing response under human approval.",
    role: "Multilingual triage concept",
    year: "2026",
    href: "/work/triageai",
  },
];

// Process — Breno's own working method (not the mockup's copy). Problem-first,
// user-aware and evidence-led. Five steps from clarification to documentation.
export const process = [
  {
    title: "Clarify",
    icon: "search",
    description: "Understand the user, the symptoms, the impact and the expected result.",
    items: ["Ask focused questions", "Confirm scope and urgency", "Capture the environment", "Separate evidence from assumption"],
  },
  {
    title: "Investigate",
    icon: "frame",
    description: "Reproduce the issue, collect evidence and narrow the likely causes.",
    items: ["Reproduce the reported behaviour", "Check data, states and dependencies", "Compare normal and failure paths", "Record what has already been tried"],
  },
  {
    title: "Test",
    icon: "sitemap",
    description: "Test the safest next step and verify the result against clear criteria.",
    items: ["Start with reversible checks", "Test one variable at a time", "Verify access and permissions", "Confirm the user can continue"],
  },
  {
    title: "Resolve",
    icon: "check-circle",
    description: "Resolve within scope or escalate with enough context for the next team.",
    items: ["Explain the fix clearly", "Confirm ownership and next action", "Escalate with evidence", "Keep the user informed"],
  },
  {
    title: "Document",
    icon: "layout",
    description: "Leave a useful ticket history and turn recurring fixes into reusable guidance.",
    items: ["Record symptoms, cause and resolution", "Write practical user guidance", "Flag recurring patterns", "Improve the handover for next time"],
  },
];

// Approach — how Breno works a project, step by step (mockup 4). His own voice.
export const approach = [
  {
    title: "Understand the real workflow",
    description:
      "Start with users, current tools, constraints and the moments where information, ownership or service breaks.",
  },
  {
    title: "Map requirements and dependencies",
    description:
      "Turn the operational problem into explicit scope, functional requirements, constraints and acceptance criteria.",
  },
  {
    title: "Define data, states and responsibilities",
    description:
      "Make fields, status changes, permissions, routing rules and ownership clear before configuration begins.",
  },
  {
    title: "Test normal and failure paths",
    description:
      "Check the happy path, exceptions, validation, access, integrations and recovery — not only the demo flow.",
  },
  {
    title: "Document and support adoption",
    description:
      "Prepare users, hand over decisions clearly and keep learning from support issues after launch.",
  },
];

// Principles — Breno's guiding values (mockup 6). Compass, not rules.
export const principles = [
  {
    annotation: "",
    principle: "Clear communication",
    description: "State scope, decisions, risks and next actions in language each team can use.",
  },
  {
    annotation: "",
    principle: "Operational fit",
    description: "Configure around the real workflow, not an idealised process that disappears after launch.",
  },
  {
    annotation: "",
    principle: "Traceability",
    description: "Keep ownership, status changes, approvals and support evidence visible.",
  },
  {
    annotation: "",
    principle: "Human control",
    description: "Automate support work without hiding uncertainty or removing accountable review.",
  },
  {
    annotation: "",
    principle: "Multilingual context",
    description: "Treat language as an operational requirement across intake, documentation and support.",
  },
  {
    annotation: "",
    principle: "UX as a supporting layer",
    description: "Use clarity and restraint to reduce errors, training effort and cognitive load.",
  },
];
