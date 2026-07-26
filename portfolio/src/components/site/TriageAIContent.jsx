"use client";
import { Text, Tag, Status, Button, Divider } from "@/components/ds";
import { Reveal } from "@/components/site/Reveal";
import { Scramble } from "@/components/site/Scramble";
import { Collapsible } from "@/components/site/Collapsible";
import { Icon } from "@/components/site/Icon";
import { DecisionsLedger } from "@/components/site/DecisionsLedger";
import { BrowserFrame } from "@/components/site/BrowserFrame";
import { Confidence } from "@/components/site/Confidence";
import { TriageInbox } from "@/components/site/TriageInbox";
import { TriageFlow } from "@/components/site/TriageFlow";
import { AnalysisPanel } from "@/components/site/AnalysisPanel";
import { CorrectionFlow } from "@/components/site/CorrectionFlow";
import { TriageStates } from "@/components/site/TriageStates";
import { CaseHero } from "@/components/site/CaseHero";
import { CaseSnapshot } from "@/components/site/CaseSnapshot";
import { TriagePayloadSpecimen } from "@/components/site/TechnicalArtifacts";
import { useLang } from "@/context/AppContext";
import { getT } from "@/lib/i18n";
import { renderTitle } from "@/lib/renderTitle";

export function TriageAIContent() {
  const { lang } = useLang();
  const t = getT(lang);
  const c = t.cases;
  const s = t.cases.triageai;
  const specimen = t.specimens.triage;
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
          <BrowserFrame url="support.local/intake">
            <TriageInbox />
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
      <section id="sec-context" data-label={c.sectionLabels.context} className="container section case-section" aria-labelledby="ctx">
        <Collapsible
          defaultOpen
          label={c.sectionLabels.context}
          header={
            <div className="case-section__head">
              <Scramble className="eyebrow eyebrow--accent" text={c.sectionNums.context} />
              <Reveal mask>
                <Text variant="h2" id="ctx">{s.contextHeading}</Text>
              </Reveal>
            </div>
          }
        >
          <Reveal className="prose">
            {s.contextProse.map((p, i) => <p key={i}>{p}</p>)}
          </Reveal>

        </Collapsible>
      </section>

      <div className="container"><Divider /></div>

      {/* ── Process ──────────────────────────────────────────── */}
      <section id="sec-process" data-label={c.sectionLabels.process} className="container section case-section" aria-labelledby="process">
        <Collapsible
          defaultOpen
          label={c.sectionLabels.process}
          header={
            <div className="case-section__head">
              <Scramble className="eyebrow eyebrow--accent" text={c.sectionNums.process} />
              <Reveal mask>
                <Text variant="h2" id="process">{s.processHeading}</Text>
              </Reveal>
            </div>
          }
        >
          <Reveal className="prose">
            {s.processProse.map((item, i) => (
              <p key={i} className="muted">
                <strong style={{ color: "var(--ink)", fontWeight: 500 }}>{item.label}</strong>{" "}
                {item.text}
              </p>
            ))}
          </Reveal>

          <Reveal>
            <TriagePayloadSpecimen />
          </Reveal>

          <Reveal>
            <TriageFlow />
          </Reveal>

          <Reveal>
            <Text variant="h3" style={{ marginBottom: "var(--space-8)" }}>{c.decisionsHeading}</Text>
          </Reveal>
          <DecisionsLedger decisions={s.decisions} />
        </Collapsible>
      </section>

      <div className="container"><Divider /></div>

      {/* ── The design & system ──────────────────────────────── */}
      <section id="sec-design" data-label={c.sectionLabels.design} className="container section case-section" aria-labelledby="design">
        <Collapsible
          defaultOpen
          label={c.sectionLabels.design}
          header={
            <div className="case-section__head">
              <Scramble className="eyebrow eyebrow--accent" text={c.sectionNums.design} />
              <Reveal mask>
                <Text variant="h2" id="design">{s.designHeading}</Text>
              </Reveal>
            </div>
          }
        >
          <Reveal className="prose">
            <p>{s.designProse[0]}</p>
            <p className="muted">
              {s.designProse[1]}{" "}
              <strong style={{ color: "var(--ink)", fontWeight: 500 }}>{s.designEmphasis.low}</strong>{" "}
              {t.common.and}{" "}
              <strong style={{ color: "var(--ink)", fontWeight: 500 }}>{s.designEmphasis.caught}</strong>
            </p>
          </Reveal>

          <Reveal>
            <Text variant="h3" style={{ marginBottom: "var(--space-6)" }}>{s.analysisPanelHeading}</Text>
            <BrowserFrame url="support.local/case/REQ-4488">
              <AnalysisPanel />
            </BrowserFrame>
          </Reveal>

          <Reveal>
            <Text variant="h3" style={{ marginBottom: "var(--space-6)" }}>{s.correctionHeading}</Text>
            <CorrectionFlow />
          </Reveal>

          <Reveal>
            <Text variant="h3" style={{ marginBottom: "var(--space-6)" }}>{s.dsSliceHeading}</Text>
            <div className="specimen">
              <div className="incident">
                <div className="incident__top">
                  <span className="incident__id">REQ-4471</span>
                  <Confidence level="low" />
                </div>
                <span className="incident__title">“No recibí el reembolso de mi reserva cancelada.”</span>
                <div className="incident__meta">
                  <Tag>ES</Tag>
                  <Tag>{specimen.incident.refund}</Tag>
                  <Status variant="urgent">{specimen.incident.priorityHigh}</Status>
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
                  <span className="incident__key">{specimen.incident.confidenceTokens}</span>
                  <div style={{ display: "flex", gap: "var(--space-2)", flexWrap: "wrap" }}>
                    <Confidence level="high" />
                    <Confidence level="review" />
                    <Confidence level="low" />
                  </div>
                </div>
                <div className="stack" style={{ gap: "var(--space-2)" }}>
                  <span className="incident__key">{specimen.incident.tagsLabel}</span>
                  <div style={{ display: "flex", gap: "var(--space-2)", flexWrap: "wrap" }}>
                    <Tag>ES</Tag>
                    <Tag>PT</Tag>
                    <Tag>FR</Tag>
                    <Tag>EN</Tag>
                    <Tag>{specimen.incident.refund}</Tag>
                    <Tag>{specimen.incident.maintenance}</Tag>
                  </div>
                </div>
                <Text variant="small">{s.dsSliceNote}</Text>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <Text variant="h3" style={{ marginBottom: "var(--space-6)" }}>{c.statesHeading}</Text>
            <TriageStates />
          </Reveal>
        </Collapsible>
      </section>

      <div className="container"><Divider /></div>

      {/* ── Outcome & reflection ─────────────────────────────── */}
      <section id="sec-outcome" data-label={c.sectionLabels.outcome} className="container section case-section" aria-labelledby="outcome">
        <Collapsible
          defaultOpen
          label={c.sectionLabels.outcome}
          header={
            <div className="case-section__head">
              <Scramble className="eyebrow eyebrow--accent" text={c.sectionNums.outcome} />
              <Reveal mask>
                <Text variant="h2" id="outcome">{s.outcomeHeading}</Text>
              </Reveal>
            </div>
          }
        >
          <Reveal className="prose">
            <p className="muted">
              <strong style={{ color: "var(--ink)", fontWeight: 500 }}>{s.outcomeProse.impact.label}</strong>{" "}
              {s.outcomeProse.impact.text}
            </p>
          </Reveal>

          <Reveal className="prose">
            {["tradeoffs", "reflection"].map((key) => (
              <p key={key} className={key === "reflection" ? "" : "muted"}>
                <strong style={{ color: "var(--ink)", fontWeight: 500 }}>{s.outcomeProse[key].label}</strong>{" "}
                {s.outcomeProse[key].text}
              </p>
            ))}
          </Reveal>

          <Reveal className="case-cta">
            <Button href="/#contact" variant="secondary">{c.getInTouch}</Button>
          </Reveal>
        </Collapsible>
      </section>
    </article>
  );
}
