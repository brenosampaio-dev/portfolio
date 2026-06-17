import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag";
import { Status } from "@/components/ui/status";

export const metadata: Metadata = {
  title: "Service Operations Dashboard — Case study",
  description:
    "Concept case study — a service-operations dashboard that pulls scattered requests, incidents and handovers into one clear, stateful interface.",
};

const wrapStyle = {
  width: "100%",
  maxWidth: "1080px",
  margin: "0 auto",
} as const;

const monoEyebrow = {
  fontFamily: "var(--font-mono)",
  fontSize: "12px",
  textTransform: "uppercase",
  letterSpacing: "var(--tracking-eyebrow)",
  color: "var(--warm-grey)",
} as const;

const dlLabel = {
  margin: "0 0 6px",
  fontFamily: "var(--font-mono)",
  fontSize: "11px",
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  color: "var(--muted-grey)",
} as const;

const dlValue = {
  margin: 0,
  fontFamily: "var(--font-sans)",
  fontSize: "15px",
  lineHeight: 1.5,
  color: "var(--ink)",
} as const;

const sectionLabel = {
  margin: "8px 0 0",
  fontFamily: "var(--font-sans)",
  fontSize: "20px",
  fontWeight: 600,
  letterSpacing: "-0.01em",
  color: "var(--ink)",
} as const;

const indexNum = {
  fontFamily: "var(--font-mono)",
  fontSize: "12px",
  letterSpacing: "var(--tracking-mono)",
  color: "var(--muted-grey)",
} as const;

const snapshot = [
  { dt: "Problem", dd: "[Operational information scatters across disconnected tools, so teams lose visibility and consistency.]" },
  { dt: "For whom", dd: "[Front-desk & service-operations teams]" },
  { dt: "Role", dd: "Product design · flows · UI" },
  { dt: "Delivered", dd: "[Core flows, key screens with states, a slice of the design system]" },
  { dt: "Expected impact — to validate", dd: "[A hypothesis to test — e.g. faster handovers, fewer missed incidents. No numbers until measured.]" },
];

const constraints = ["Multilingual teams", "Mobile and desktop", "Low tolerance for extra admin work", "Human error and fast handoff"];

const decisions = [1, 2, 3];

const states: { key: string; label: string; alert?: boolean }[] = [
  { key: "empty", label: "Empty" },
  { key: "loading", label: "Loading" },
  { key: "error", label: "Error · the one place Vermilion appears", alert: true },
  { key: "success", label: "Success" },
  { key: "edge case", label: "Edge case" },
];

const swatches = [
  { name: "Paper", bg: "var(--paper)", border: true },
  { name: "Ivory", bg: "var(--ivory)", border: true },
  { name: "Ink", bg: "var(--ink)" },
  { name: "Moss · accent", bg: "var(--moss)" },
  { name: "Vermilion · alert", bg: "var(--vermilion)" },
];

export default function CaseStudyPage() {
  return (
    <div className="reveal">
      {/* Header */}
      <section style={{ ...wrapStyle, padding: "clamp(40px,7vw,72px) 24px clamp(24px,4vw,40px)" }}>
        <Button variant="link" href="/" style={{ fontFamily: "var(--font-mono)", fontSize: "12px", letterSpacing: "var(--tracking-mono)", textTransform: "uppercase", color: "var(--warm-grey)", textDecoration: "none" }}>
          ← Back to work
        </Button>
        <p style={{ margin: "28px 0 12px", ...monoEyebrow }}>B2B · Service operations · 2026 · Concept</p>
        <h1 style={{ margin: 0, maxWidth: "820px", fontFamily: "var(--font-sans)", fontSize: "clamp(34px,6vw,44px)", fontWeight: 600, lineHeight: 1.06, letterSpacing: "-0.025em", color: "var(--ink)", textWrap: "balance" }}>
          Service Operations Dashboard
        </h1>
      </section>

      {/* Snapshot / TL;DR */}
      <section style={{ ...wrapStyle, padding: "0 24px clamp(40px,7vw,64px)" }}>
        <div style={{ border: "1px solid var(--stone)", borderRadius: "var(--radius-lg)", background: "var(--ivory)", padding: "clamp(24px,4vw,40px)" }}>
          <p style={{ margin: "0 0 24px", ...monoEyebrow }}>Snapshot — the 30-second read</p>
          <dl style={{ margin: 0, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "24px 32px" }}>
            {snapshot.map((s) => (
              <div key={s.dt}>
                <dt style={dlLabel}>{s.dt}</dt>
                <dd style={dlValue}>{s.dd}</dd>
              </div>
            ))}
            <div>
              <dt style={dlLabel}>Tags</dt>
              <dd style={{ margin: "8px 0 0", display: "flex", flexWrap: "wrap", gap: "8px" }}>
                <Tag>B2B</Tag>
                <Tag>Service Ops</Tag>
                <Tag>Design System</Tag>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Context & problem */}
      <section className="wrap" style={{ paddingTop: "clamp(40px,6vw,64px)", paddingBottom: "clamp(40px,6vw,64px)", borderTop: "1px solid var(--stone)" }}>
        <div className="ed-row">
          <div className="ed-label">
            <span style={indexNum}>(01)</span>
            <h2 style={sectionLabel}>Context &amp; problem</h2>
          </div>
          <p style={{ margin: 0, maxWidth: "640px", fontFamily: "var(--font-sans)", fontSize: "clamp(19px,2.2vw,21px)", lineHeight: 1.6, color: "var(--ink)", textWrap: "pretty" }}>
            [Concrete operational friction, from real experience — e.g. front-desk teams lose time and consistency when guest
            requests, room changes, incidents and handovers live across disconnected tools and informal notes. Describe the
            situation plainly, name who feels it, and what breaks down.]
          </p>
        </div>
      </section>

      {/* Role, scope & constraints */}
      <section className="wrap" style={{ paddingTop: "clamp(40px,6vw,64px)", paddingBottom: "clamp(40px,6vw,64px)", borderTop: "1px solid var(--stone)" }}>
        <div className="ed-row">
          <div className="ed-label">
            <span style={indexNum}>(02)</span>
            <h2 style={sectionLabel}>Role, scope &amp; constraints</h2>
          </div>
          <div style={{ maxWidth: "640px" }}>
            <p style={{ margin: "0 0 20px", fontFamily: "var(--font-mono)", fontSize: "12px", letterSpacing: "0.03em", color: "var(--warm-grey)" }}>
              Concept case based on real operational experience.
            </p>
            <p style={{ margin: "0 0 28px", fontFamily: "var(--font-sans)", fontSize: "17px", lineHeight: 1.65, color: "var(--ink)" }}>
              [What Breno did — e.g. framed the problem, mapped the flows, designed the key screens and states, and defined the
              reusable components and handoff.]
            </p>
            <p style={{ ...dlLabel, margin: "0 0 12px" }}>Constraints</p>
            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column" }}>
              {constraints.map((c, i) => (
                <li
                  key={c}
                  style={{
                    display: "flex",
                    gap: "14px",
                    padding: "12px 0",
                    borderTop: "1px solid var(--stone)",
                    borderBottom: i === constraints.length - 1 ? "1px solid var(--stone)" : undefined,
                    fontFamily: "var(--font-sans)",
                    fontSize: "16px",
                    lineHeight: 1.5,
                    color: "var(--ink)",
                  }}
                >
                  <span style={{ color: "var(--muted-grey)" }}>—</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Process */}
      <section style={{ ...wrapStyle, padding: "clamp(40px,6vw,64px) 24px", borderTop: "1px solid var(--stone)" }}>
        <p style={{ margin: "0 0 12px", ...monoEyebrow }}>(03) Process</p>
        <h2 style={{ margin: "0 0 12px", fontFamily: "var(--font-sans)", fontSize: "var(--text-h2)", fontWeight: 600, letterSpacing: "var(--tracking-h2)", color: "var(--ink)" }}>
          Thinking, not deliverables
        </h2>

        <h3 style={{ margin: "40px 0 16px", fontFamily: "var(--font-sans)", fontSize: "var(--text-h3)", fontWeight: 500, letterSpacing: "var(--tracking-h3)", color: "var(--ink)" }}>
          Research, evidence &amp; assumptions
        </h3>
        <p style={{ margin: 0, maxWidth: "760px", fontFamily: "var(--font-sans)", fontSize: "16px", lineHeight: 1.65, color: "var(--ink)" }}>
          [Field observation, desk research, and the assumptions still to validate. State what is evidence and what is
          hypothesis — keep them separate.]
        </p>

        <h3 style={{ margin: "40px 0 16px", fontFamily: "var(--font-sans)", fontSize: "var(--text-h3)", fontWeight: 500, letterSpacing: "var(--tracking-h3)", color: "var(--ink)" }}>
          Flows &amp; information architecture
        </h3>
        <p style={{ margin: "0 0 24px", maxWidth: "760px", fontFamily: "var(--font-sans)", fontSize: "16px", lineHeight: 1.65, color: "var(--warm-grey)" }}>
          Before → after, the user journey, the system map, decision states and edge cases. Honest empty frames until the real
          artefacts exist.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" }}>
          {["flow: before → after — to add", "system map — to add", "decision states — to add"].map((label) => (
            <div
              key={label}
              style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "200px", border: "1px solid var(--muted-grey)", borderRadius: "var(--radius-xs)", background: "var(--ivory)" }}
            >
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.04em", color: "var(--muted-grey)" }}>{label}</span>
            </div>
          ))}
        </div>

        <h3 style={{ margin: "48px 0 16px", fontFamily: "var(--font-sans)", fontSize: "var(--text-h3)", fontWeight: 500, letterSpacing: "var(--tracking-h3)", color: "var(--ink)" }}>
          Key design decisions
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {decisions.map((d) => (
            <div key={d} style={{ border: "1px solid var(--stone)", borderRadius: "var(--radius-md)", background: "var(--ivory)", padding: "24px" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", letterSpacing: "var(--tracking-mono)", color: "var(--muted-grey)" }}>
                Decision {String(d).padStart(2, "0")}
              </span>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", marginTop: "16px" }}>
                {[
                  { label: "Problem", body: "[The problem this decision addresses.]" },
                  { label: "Decision", body: "[What I chose to do.]" },
                  { label: "Trade-off", body: "[What it cost, honestly.]" },
                ].map((col) => (
                  <div key={col.label}>
                    <p style={{ margin: "0 0 6px", fontFamily: "var(--font-mono)", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--warm-grey)" }}>
                      {col.label}
                    </p>
                    <p style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: "15px", lineHeight: 1.55, color: "var(--ink)" }}>{col.body}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* The design & system */}
      <section style={{ ...wrapStyle, padding: "clamp(40px,6vw,64px) 24px", borderTop: "1px solid var(--stone)" }}>
        <p style={{ margin: "0 0 12px", ...monoEyebrow }}>(04) The design &amp; system</p>
        <h2 style={{ margin: "0 0 12px", fontFamily: "var(--font-sans)", fontSize: "var(--text-h2)", fontWeight: 600, letterSpacing: "var(--tracking-h2)", color: "var(--ink)" }}>
          Designed for every state
        </h2>
        <p style={{ margin: "0 0 28px", maxWidth: "760px", fontFamily: "var(--font-sans)", fontSize: "16px", lineHeight: 1.65, color: "var(--warm-grey)" }}>
          Real interfaces are mostly the states nobody demos. Empty, loading, error, success and the edge cases — designed, not
          assumed.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "16px" }}>
          {states.map((s) => (
            <div key={s.key} style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "150px",
                  border: `1px solid ${s.alert ? "var(--vermilion-border)" : "var(--muted-grey)"}`,
                  borderRadius: "var(--radius-xs)",
                  background: s.alert ? "var(--vermilion-wash)" : "var(--ivory)",
                }}
              >
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.04em", color: s.alert ? "var(--vermilion)" : "var(--muted-grey)" }}>{s.key}</span>
              </div>
              <span style={{ marginTop: "10px", fontFamily: "var(--font-mono)", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--warm-grey)" }}>{s.label}</span>
            </div>
          ))}
        </div>

        <h3 style={{ margin: "48px 0 8px", fontFamily: "var(--font-sans)", fontSize: "var(--text-h3)", fontWeight: 500, letterSpacing: "var(--tracking-h3)", color: "var(--ink)" }}>
          A slice of the design system
        </h3>
        <p style={{ margin: "0 0 24px", maxWidth: "760px", fontFamily: "var(--font-sans)", fontSize: "16px", lineHeight: 1.65, color: "var(--warm-grey)" }}>
          Tokens and reused components — the proof that this is built to ship, not just to present.
        </p>
        <div style={{ border: "1px solid var(--stone)", borderRadius: "var(--radius-lg)", background: "var(--ivory)", padding: "clamp(20px,3vw,32px)", display: "flex", flexDirection: "column", gap: "28px" }}>
          <div>
            <p style={{ ...dlLabel, margin: "0 0 14px" }}>Color tokens</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
              {swatches.map((s) => (
                <div key={s.name} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ width: "28px", height: "28px", borderRadius: "8px", background: s.bg, border: s.border ? "1px solid var(--stone)" : undefined }} />
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--warm-grey)" }}>{s.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ borderTop: "1px solid var(--stone)", paddingTop: "24px" }}>
            <p style={{ ...dlLabel, margin: "0 0 14px" }}>Reused components</p>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px" }}>
              <Button variant="primary" style={{ height: "38px", fontSize: "14px" }}>Assign</Button>
              <Button variant="secondary" style={{ height: "38px", fontSize: "14px" }}>Reassign</Button>
              <Tag>Handover</Tag>
              <Status>In progress</Status>
              <Status variant="done">Resolved</Status>
              <Status variant="urgent">Incident</Status>
            </div>
          </div>
        </div>
      </section>

      {/* Outcome & reflection */}
      <section className="wrap" style={{ paddingTop: "clamp(40px,6vw,64px)", paddingBottom: "clamp(40px,6vw,64px)", borderTop: "1px solid var(--stone)" }}>
        <div className="ed-row">
          <div className="ed-label">
            <span style={indexNum}>(05)</span>
            <h2 style={sectionLabel}>Outcome &amp; reflection</h2>
          </div>
          <div style={{ maxWidth: "640px", display: "flex", flexDirection: "column", gap: "28px" }}>
            {[
              { label: "Expected impact — to validate", body: "[Success metrics I would measure next — stated as hypotheses, not results. No invented numbers.]" },
              { label: "Trade-offs & next steps", body: "[What was left out and why, and what I would do next with more time or real users.]" },
              { label: "On AI-assisted workflow", body: "[An honest note on where AI-assisted tools helped — and where design judgement stayed mine.]" },
            ].map((b) => (
              <div key={b.label}>
                <p style={{ ...dlLabel, margin: "0 0 10px" }}>{b.label}</p>
                <p style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: "17px", lineHeight: 1.65, color: "var(--ink)" }}>{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case navigation */}
      <section style={{ ...wrapStyle, padding: "0 24px clamp(48px,8vw,80px)", borderTop: "1px solid var(--stone)", paddingTop: "32px" }}>
        <Link href="/" style={{ fontFamily: "var(--font-sans)", fontSize: "15px", fontWeight: 500, color: "var(--ink)", textDecoration: "none" }}>
          ← Back to work
        </Link>
      </section>
    </div>
  );
}
