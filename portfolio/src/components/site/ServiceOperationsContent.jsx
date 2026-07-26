"use client";
import { Text, Tag, Status, Button, Divider } from "@/components/ds";
import { Reveal } from "@/components/site/Reveal";
import { Icon } from "@/components/site/Icon";
import { CaseHero } from "@/components/site/CaseHero";
import { CaseSnapshot } from "@/components/site/CaseSnapshot";
import { CaseSection } from "@/components/site/CaseSection";
import { DecisionsLedger } from "@/components/site/DecisionsLedger";
import { BrowserFrame } from "@/components/site/BrowserFrame";
import { DashboardPreview } from "@/components/site/DashboardPreview";
import { StatesGrid } from "@/components/site/StatesGrid";
import { ScatterFragments } from "@/components/site/ScatterFragments";
import { FlowDiagram } from "@/components/site/FlowDiagram";
import { ServiceSqlSpecimen } from "@/components/site/TechnicalArtifacts";
import { useLang } from "@/context/AppContext";
import { getT } from "@/lib/i18n";

const STATES = [
  { label: "Empty", variant: "empty", caption: "No open or escalated incidents in this view." },
  { label: "Loading", variant: "loading" },
  { label: "Error", variant: "error", caption: "Save failed. Draft kept locally — retry when ready." },
  { label: "Success", variant: "success", caption: "Incident logged with owner, status and history." },
];

export function ServiceOperationsContent() {
  const { lang } = useLang();
  const t = getT(lang);
  const c = t.cases;
  const s = t.cases.serviceOps;

  const factItems = [
    { label: c.factLabels.role, value: s.facts.role },
    { label: c.factLabels.type, value: s.facts.type },
    { label: c.factLabels.platform, value: s.facts.platform },
    { label: c.factLabels.stack, value: s.facts.stack },
    { label: c.factLabels.status, value: s.facts.status },
    { label: c.factLabels.delivered, value: s.facts.delivered },
  ];

  return (
    <article>
      <CaseHero
        backHref="/#work"
        backLabel={c.back}
        tags={[s.tag, "2026"]}
        title={<>Incident & <span className="accent">Handover Workflow</span></>}
        lead={s.lead}
        visual={
          <BrowserFrame url="operations.local/open-now">
            <DashboardPreview />
          </BrowserFrame>
        }
      >
        <CaseSnapshot items={factItems} />
      </CaseHero>

      {/* ── Snapshot / TL;DR ─────────────────────────────────── */}
      <section id="snapshot" data-label="Snapshot" className="container section--tight" aria-label="Snapshot">
        <Reveal className="snapshot">
          <div className="snapshot__row">
            <Icon name="alert" className="snapshot__icon" />
            <span className="snapshot__label">{c.snapshot.problem}</span>
            <span className="snapshot__value">{s.snapshotProblem}</span>
          </div>
          <div className="snapshot__row">
            <Icon name="users" className="snapshot__icon" />
            <span className="snapshot__label">{c.snapshot.forWhom}</span>
            <span className="snapshot__value">{s.snapshotForWhom}</span>
          </div>
          <div className="snapshot__row snapshot__row--wide">
            <Icon name="target" className="snapshot__icon" />
            <span className="snapshot__label">{c.snapshot.impact}</span>
            <span className="snapshot__value">{s.snapshotImpact}</span>
          </div>
        </Reveal>
      </section>

      {/* ── Context & problem ────────────────────────────────── */}
      <CaseSection id="context" label="Context" number={c.sectionNums.context} heading={s.contextHeading}>
        <Reveal className="prose">
          {s.contextProse.map((p, i) => <p key={i}>{p}</p>)}
        </Reveal>

        <Reveal>
          <ScatterFragments />
        </Reveal>

      </CaseSection>

      <div className="container"><Divider /></div>

      {/* ── Process ──────────────────────────────────────────── */}
      <CaseSection id="process" label="Process" number={c.sectionNums.process} heading={s.processHeading}>
        <Reveal className="prose">
          {s.processProse.map((item, i) => (
            <p key={i} className="muted">
              <strong style={{ color: "var(--ink)", fontWeight: 500 }}>{item.label}</strong>{" "}
              {item.text}
            </p>
          ))}
        </Reveal>

        <Reveal>
          <ServiceSqlSpecimen />
        </Reveal>

        <Reveal>
          <FlowDiagram />
        </Reveal>

        <Reveal>
          <Text variant="h3" style={{ marginBottom: "var(--space-8)" }}>{c.decisionsHeading}</Text>
        </Reveal>
        <DecisionsLedger decisions={s.decisions} />
      </CaseSection>

      <div className="container"><Divider /></div>

      {/* ── The design & system ──────────────────────────────── */}
      <CaseSection id="design" label="Design" number={c.sectionNums.design} heading={s.designHeading}>
        <Reveal className="prose">
          <p>{s.designProse[0]}</p>
          <p className="muted">{s.designProse[1]}</p>
        </Reveal>

        <Reveal>
          <Text variant="h3" style={{ marginBottom: "var(--space-6)" }}>{s.dsSliceHeading}</Text>
          <div className="specimen">
            <div className="incident">
              <div className="incident__top">
                <span className="incident__id">INC-2041</span>
                <Status variant="urgent">Urgent</Status>
              </div>
              <span className="incident__title">Late checkout requested — room note pending</span>
              <div className="incident__meta">
                <Tag>Front desk</Tag>
                <Tag>Guest request</Tag>
              </div>
              <div className="incident__fields">
                <div className="incident__field">
                  <span className="incident__key">Category</span>
                  <span className="incident__val">Guest request</span>
                </div>
                <div className="incident__field">
                  <span className="incident__key">Room</span>
                  <span className="incident__val">412</span>
                </div>
                <div className="incident__field">
                  <span className="incident__key">Area</span>
                  <span className="incident__val">Reception</span>
                </div>
                <div className="incident__field">
                  <span className="incident__key">Owner</span>
                  <span className="incident__val">Night shift</span>
                </div>
              </div>
            </div>

            <div className="stack" style={{ gap: "var(--space-5)" }}>
              <div className="stack" style={{ gap: "var(--space-2)" }}>
                <span className="incident__key">Status tokens</span>
                <div style={{ display: "flex", gap: "var(--space-2)", flexWrap: "wrap" }}>
                  <Status variant="default">Open</Status>
                  <Status variant="urgent">Urgent</Status>
                  <Status variant="done">Resolved</Status>
                </div>
              </div>
              <div className="stack" style={{ gap: "var(--space-2)" }}>
                <span className="incident__key">Guided fields</span>
                <div style={{ display: "flex", gap: "var(--space-2)", flexWrap: "wrap" }}>
                  <Tag>Category</Tag>
                  <Tag>Room</Tag>
                  <Tag>Area</Tag>
                  <Tag>Priority</Tag>
                  <Tag>Owner</Tag>
                  <Tag>Status</Tag>
                </div>
              </div>
              <Text variant="small">{s.dsSliceNote}</Text>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <Text variant="h3" style={{ marginBottom: "var(--space-6)" }}>{c.statesHeading}</Text>
          <StatesGrid states={STATES} />
        </Reveal>
      </CaseSection>

      <div className="container"><Divider /></div>

      {/* ── Outcome & reflection ─────────────────────────────── */}
      <CaseSection id="outcome" label="Outcome" number={c.sectionNums.outcome} heading={s.outcomeHeading}>
        <Reveal className="prose">
          <p className="muted">
            <strong style={{ color: "var(--ink)", fontWeight: 500 }}>{s.outcomeProse.impact.label}</strong>{" "}
            {s.outcomeProse.impact.text}
          </p>
        </Reveal>

        <Reveal className="prose">
          {["tradeoffs", "reflection", "different"].map((key) => (
            <p key={key} className={key === "reflection" ? "" : "muted"}>
              <strong style={{ color: "var(--ink)", fontWeight: 500 }}>{s.outcomeProse[key].label}</strong>{" "}
              {s.outcomeProse[key].text}
            </p>
          ))}
        </Reveal>

        <Reveal className="case-cta">
          <Button href="/#contact" variant="secondary">{c.getInTouch}</Button>
        </Reveal>
      </CaseSection>
    </article>
  );
}
