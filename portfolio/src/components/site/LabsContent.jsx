import { Status, Text } from "@/components/ds";
import { PageIntro } from "@/components/site/PageIntro";
import { getPortfolioV2 } from "@/lib/portfolioV2";

export function LabsContent({ lang = "en" }) {
  const content = getPortfolioV2(lang);
  const fr = lang === "fr";

  return (
    <article>
      <section id="labs-overview" className="container section--emphasis" data-label={fr ? "Laboratoire de systèmes" : "Systems Lab"} aria-labelledby="labs-page-title">
        <PageIntro eyebrow={content.labs.eyebrow} title={content.labs.title} lead={content.labs.lead} />
        <span id="labs-page-title" className="sr-only">Labs</span>
      </section>

      <section id="current-learning" className="container section" data-label={fr ? "Expériences système" : "System experiments"} aria-labelledby="labs-current-title">
        <div className="section-head">
          <Status>{content.statusLabels[content.labs.currentStatus]}</Status>
          <Text as="h2" variant="h2" id="labs-current-title">{content.labs.current}</Text>
          <Text variant="body">{fr ? "Premiers modules prévus : tableau de données, combobox accessible et parcours de révision ou d’approbation." : "First planned modules: a data table, an accessible combobox and a review or approval flow."}</Text>
        </div>
      </section>

      <section id="publishing-standard" className="container section" data-label={fr ? "Critère de publication" : "Publishing standard"} aria-labelledby="publishing-standard-title">
        <div className="section-head">
          <Text as="h2" variant="h2" id="publishing-standard-title">{fr ? "Une expérience devient une preuve lorsqu’elle explique ses décisions." : "An experiment becomes evidence when it explains its decisions."}</Text>
          <Text variant="body">{fr ? "Chaque module publié montrera le comportement étudié, les variantes, les cas limites, les critères d’accessibilité et ce que l’implémentation a révélé." : "Every published module will show the behavior examined, variants, edge cases, accessibility criteria and what implementation revealed."}</Text>
        </div>
      </section>
    </article>
  );
}
