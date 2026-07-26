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
import { renderTitle } from "@/lib/renderTitle";

export function ServiceOperationsContent() {
  const { lang } = useLang();
  const t = getT(lang);
  const c = t.cases;
  const s = t.cases.serviceOps;
  const specimen = t.specimens.service;

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
        title={renderTitle(s.title)}
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
      <section id="snapshot" data-label={c.sectionLabels.snapshot} className="container section--tight" aria-label={c.sectionLabels.snapshot}>
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
      <CaseSection id="context" label={c.sectionLabels.context} number={c.sectionNums.context} heading={s.contextHeading}>
        <Reveal className="prose">
          {s.contextProse.map((p, i) => <p key={i}>{p}</p>)}
        </Reveal>

        <Reveal>
          <ScatterFragments />
        </Reveal>

      </CaseSection>

      <div className="container"><Divider /></div>

      {/* ── Process ──────────────────────────────────────────── */}
      <CaseSection id="process" label={c.sectionLabels.process} number={c.sectionNums.process} heading={s.processHeading}>
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
      <CaseSection id="design" label={c.sectionLabels.design} number={c.sectionNums.design} heading={s.designHeading}>
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
                <Status variant="urgent">{specimen.incident.urgent}</Status>
              </div>
              <span className="incident__title">{specimen.incident.title}</span>
              <div className="incident__meta">
                {specimen.incident.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
              </div>
              <div className="incident__fields">
                {specimen.incident.fields.map((field) => (
                  <div className="incident__field" key={field.label}>
                    <span className="incident__key">{field.label}</span>
                    <span className="incident__val">{field.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="stack" style={{ gap: "var(--space-5)" }}>
              <div className="stack" style={{ gap: "var(--space-2)" }}>
                <span className="incident__key">{specimen.incident.statusTokens}</span>
                <div style={{ display: "flex", gap: "var(--space-2)", flexWrap: "wrap" }}>
                  <Status variant="default">{specimen.incident.statuses.open}</Status>
                  <Status variant="urgent">{specimen.incident.statuses.urgent}</Status>
                  <Status variant="done">{specimen.incident.statuses.resolved}</Status>
                </div>
              </div>
              <div className="stack" style={{ gap: "var(--space-2)" }}>
                <span className="incident__key">{specimen.incident.guidedFields}</span>
                <div style={{ display: "flex", gap: "var(--space-2)", flexWrap: "wrap" }}>
                  {specimen.incident.fieldTags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
                </div>
              </div>
              <Text variant="small">{s.dsSliceNote}</Text>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <Text variant="h3" style={{ marginBottom: "var(--space-6)" }}>{c.statesHeading}</Text>
          <StatesGrid states={specimen.states} />
        </Reveal>
      </CaseSection>

      <div className="container"><Divider /></div>

      {/* ── Outcome & reflection ─────────────────────────────── */}
      <CaseSection id="outcome" label={c.sectionLabels.outcome} number={c.sectionNums.outcome} heading={s.outcomeHeading}>
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
