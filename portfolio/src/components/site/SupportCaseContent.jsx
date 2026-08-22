"use client";

import { Button, Divider, Status, Tag, Text } from "@/components/ds";
import { CaseHero } from "@/components/site/CaseHero";
import { CaseSection } from "@/components/site/CaseSection";
import { CaseSnapshot } from "@/components/site/CaseSnapshot";
import { DecisionsLedger } from "@/components/site/DecisionsLedger";
import { Icon } from "@/components/site/Icon";
import { Reveal } from "@/components/site/Reveal";
import { SupportCasePreview } from "@/components/site/SupportCasePreview";
import { useLang } from "@/context/AppContext";
import { getCaseStudy } from "@/lib/caseStudies";
import { renderTitle } from "@/lib/renderTitle";

function IncidentTicket({ ticket }) {
  return (
    <div className="incident lab-ticket">
      <div className="incident__top">
        <span className="incident__id">{ticket.id}</span>
        <Status variant="urgent">{ticket.status}</Status>
      </div>
      <span className="incident__title">{ticket.title}</span>
      <div className="incident__meta">
        {ticket.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
      </div>
      <div className="incident__fields">
        {ticket.fields.map(([label, value]) => (
          <div className="incident__field" key={label}>
            <span className="incident__key">{label}</span>
            <span className="incident__val">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DefinitionList({ items }) {
  return (
    <div className="def-list">
      {items.map((item) => (
        <div className="def-item" key={item.term}>
          <span className="def-item__term">{item.term}</span>
          <span className="def-item__desc">{item.desc}</span>
        </div>
      ))}
    </div>
  );
}

function InvestigationTrail({ items }) {
  return (
    <ol className="evidence-trail">
      {items.map((item) => (
        <li className={`evidence-trail__item evidence-trail__item--${item.state}`} key={`${item.time}-${item.title}`}>
          <span className="evidence-trail__time">{item.time}</span>
          <div className="evidence-trail__body">
            <span className="evidence-trail__title">{item.title}</span>
            <span className="evidence-trail__evidence">{item.evidence}</span>
            <span className="evidence-trail__result">{item.result}</span>
          </div>
        </li>
      ))}
    </ol>
  );
}

function TechnicalRecord({ artifact, labels }) {
  return (
    <figure className="technical-artifact">
      <figcaption>
        <span className="technical-artifact__eyebrow">{artifact.eyebrow}</span>
        <strong>{artifact.title}</strong>
        <span>{artifact.note}</span>
      </figcaption>
      <pre className="technical-artifact__code"><code>{artifact.code}</code></pre>
      <div className="technical-artifact__tableWrap">
        <table className="technical-artifact__table">
          <thead>
            <tr>
              <th scope="col">{labels.field}</th>
              <th scope="col">{labels.observed}</th>
              <th scope="col">{labels.meaning}</th>
            </tr>
          </thead>
          <tbody>
            {artifact.rows.map(([field, observed, meaning]) => (
              <tr key={field}>
                <th scope="row">{field}</th>
                <td><code>{observed}</code></td>
                <td>{meaning}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}

function ValidationGrid({ items }) {
  return (
    <div className="validation-grid">
      {items.map(([label, value, state]) => (
        <div className="validation-card" key={label}>
          <span className="validation-card__label">{label}</span>
          <Status variant={state}>{value}</Status>
        </div>
      ))}
    </div>
  );
}

function UserUpdate({ item }) {
  return (
    <blockquote className="support-update">
      <span className="support-update__label">{item.label}</span>
      <p>{item.text}</p>
    </blockquote>
  );
}

function NumberedList({ items }) {
  return (
    <ol className="runbook-list">
      {items.map((item, index) => (
        <li key={item}>
          <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
          <p>{item}</p>
        </li>
      ))}
    </ol>
  );
}

function MeasureList({ items }) {
  return (
    <div className="measure-list">
      {items.map(([metric, reveals], index) => (
        <div className="measure-item" key={metric}>
          <span className="measure-item__num">{String(index + 1).padStart(2, "0")}</span>
          <div>
            <span className="measure-item__metric">{metric}</span>
            <span className="measure-item__reveals">{reveals}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function ProofGrid({ items }) {
  return (
    <div className="proof-grid">
      {items.map(([title, text]) => (
        <div className="proof-card" key={title}>
          <span className="proof-card__title">{title}</span>
          <p>{text}</p>
        </div>
      ))}
    </div>
  );
}

function ReferenceList({ items }) {
  return (
    <ul className="reference-list">
      {items.map(([label, href]) => (
        <li key={href}>
          <a href={href} target="_blank" rel="noreferrer">{label}<span aria-hidden="true">↗</span></a>
        </li>
      ))}
    </ul>
  );
}

export function SupportCaseContent({ slug }) {
  const { lang } = useLang();
  const bundle = getCaseStudy(lang, slug);
  if (!bundle) return null;
  const { study: s, factLabels, snapshotLabels, sectionLabels, headings, artifactLabels, common } = bundle;

  const factItems = Object.entries(factLabels).map(([key, label]) => ({ label, value: s.facts[key] }));

  return (
    <article>
      <CaseHero
        backHref="/#work"
        backLabel={bundle.back}
        tags={[s.tag, s.year, common.synthetic]}
        title={renderTitle(s.title)}
        lead={s.lead}
        visual={<SupportCasePreview slug={slug} />}
      >
        <p className="case-subtitle">{s.subtitle}</p>
        <CaseSnapshot items={factItems} />
      </CaseHero>

      <section id="snapshot" data-label={sectionLabels.snapshot} className="container section--tight" aria-label={sectionLabels.snapshot}>
        <Reveal className="snapshot">
          <div className="snapshot__row">
            <Icon name="alert" className="snapshot__icon" />
            <span className="snapshot__label">{snapshotLabels.problem}</span>
            <span className="snapshot__value">{s.snapshot.problem}</span>
          </div>
          <div className="snapshot__row">
            <Icon name="user" className="snapshot__icon" />
            <span className="snapshot__label">{snapshotLabels.user}</span>
            <span className="snapshot__value">{s.snapshot.user}</span>
          </div>
          <div className="snapshot__row snapshot__row--wide">
            <Icon name="check-circle" className="snapshot__icon" />
            <span className="snapshot__label">{snapshotLabels.result}</span>
            <span className="snapshot__value">{s.snapshot.result}</span>
          </div>
        </Reveal>
      </section>

      <CaseSection id="incident" label={sectionLabels.context} number={s.context.number} heading={s.context.heading}>
        <Reveal className="prose">
          {s.context.prose.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </Reveal>
        <Reveal>
          <Text variant="h3" style={{ marginBottom: "var(--space-6)" }}>{headings.ticket}</Text>
          <IncidentTicket ticket={s.context.ticket} />
        </Reveal>
        <Reveal>
          <Text variant="h3" style={{ marginBottom: "var(--space-6)" }}>{headings.scope}</Text>
          <DefinitionList items={s.context.scope} />
        </Reveal>
      </CaseSection>

      <div className="container"><Divider /></div>

      <CaseSection id="investigation" label={sectionLabels.investigation} number={s.investigation.number} heading={s.investigation.heading}>
        <Reveal className="prose">
          {s.investigation.prose.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </Reveal>
        <Reveal>
          <Text variant="h3" style={{ marginBottom: "var(--space-6)" }}>{headings.trail}</Text>
          <InvestigationTrail items={s.investigation.trail} />
        </Reveal>
        <Reveal>
          <Text variant="h3" style={{ marginBottom: "var(--space-6)" }}>{headings.artifact}</Text>
          <TechnicalRecord artifact={s.investigation.artifact} labels={artifactLabels} />
        </Reveal>
        <Reveal>
          <Text variant="h3" style={{ marginBottom: "var(--space-8)" }}>{headings.decisions}</Text>
        </Reveal>
        <DecisionsLedger decisions={s.investigation.decisions} />
      </CaseSection>

      <div className="container"><Divider /></div>

      <CaseSection id="resolution" label={sectionLabels.resolution} number={s.resolution.number} heading={s.resolution.heading}>
        <Reveal className="prose">
          {s.resolution.prose.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </Reveal>
        <Reveal>
          <Text variant="h3" style={{ marginBottom: "var(--space-6)" }}>{headings.validation}</Text>
          <ValidationGrid items={s.resolution.validation} />
        </Reveal>
        <Reveal>
          <Text variant="h3" style={{ marginBottom: "var(--space-6)" }}>{headings.communication}</Text>
          <UserUpdate item={s.resolution.communication} />
        </Reveal>
        <Reveal className="escalation-note">
          <div className="escalation-note__icon"><Icon name="send" /></div>
          <div>
            <span className="escalation-note__label">{headings.escalation}</span>
            <p>{s.resolution.escalation}</p>
          </div>
        </Reveal>
      </CaseSection>

      <div className="container"><Divider /></div>

      <CaseSection id="prevention" label={sectionLabels.prevention} number={s.prevention.number} heading={s.prevention.heading}>
        <Reveal className="prose">
          {s.prevention.prose.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </Reveal>
        <Reveal>
          <Text variant="h3" style={{ marginBottom: "var(--space-6)" }}>{headings.runbook}</Text>
          <NumberedList items={s.prevention.runbook} />
        </Reveal>
        <Reveal>
          <Text variant="h3" style={{ marginBottom: "var(--space-6)" }}>{headings.measures}</Text>
          <MeasureList items={s.prevention.measures} />
        </Reveal>
      </CaseSection>

      <div className="container"><Divider /></div>

      <CaseSection id="evidence" label={sectionLabels.outcome} number={s.outcome.number} heading={s.outcome.heading}>
        <Reveal className="prose">
          {s.outcome.prose.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </Reveal>
        <Reveal>
          <Text variant="h3" style={{ marginBottom: "var(--space-6)" }}>{headings.proof}</Text>
          <ProofGrid items={s.outcome.proof} />
        </Reveal>
        <Reveal>
          <Text variant="h3" style={{ marginBottom: "var(--space-6)" }}>{headings.limits}</Text>
          <ul className="limits-list">
            {s.outcome.limits.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </Reveal>
        <Reveal>
          <Text variant="h3" style={{ marginBottom: "var(--space-6)" }}>{headings.references}</Text>
          <ReferenceList items={s.outcome.references} />
        </Reveal>
        <Reveal className="case-cta">
          <Button href="/#contact" variant="secondary">{common.download}</Button>
        </Reveal>
      </CaseSection>
    </article>
  );
}
