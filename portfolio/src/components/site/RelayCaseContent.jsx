import { Text } from "@/components/ds";
import { RelayPrototype } from "@/components/relay/RelayPrototype";
import { CaseHero } from "@/components/site/CaseHero";
import { CaseSection } from "@/components/site/CaseSection";
import { CaseSnapshot } from "@/components/site/CaseSnapshot";
import { getPortfolioCase } from "@/lib/portfolioCases";

export function RelayCaseContent({ lang = "en" }) {
  const fr = lang === "fr";
  const project = getPortfolioCase("relay", lang);

  const snapshot = [
    { label: fr ? "Type" : "Type", value: project.projectType },
    { label: fr ? "Statut" : "Status", value: project.statusLabel },
    { label: fr ? "Données" : "Data", value: fr ? "Entièrement synthétiques" : "Entirely synthetic" },
    { label: fr ? "Validation" : "Validation", value: project.validationLabel },
  ];

  return (
    <article>
      <CaseHero
        backHref={fr ? "/fr/work" : "/work"}
        backLabel={fr ? "Retour aux projets" : "Back to work"}
        tags={[project.projectType, project.statusLabel, fr ? "Données synthétiques" : "Synthetic data"]}
        title={project.title}
        lead={project.summary}
      >
        <CaseSnapshot items={snapshot} />
      </CaseHero>

      {project.sections.map((section, index) => (
        <CaseSection
          key={section.id}
          id={section.id}
          number={`${String(index + 1).padStart(2, "0")} — ${section.title}`}
          heading={section.title}
          label={section.title}
          defaultOpen={section.id === "problem" || section.id === "prototype"}
        >
          <div className="prose">
            <Text variant="body">{section.body}</Text>
          </div>
          {section.id === "prototype" && <RelayPrototype lang={lang} />}
        </CaseSection>
      ))}
    </article>
  );
}
