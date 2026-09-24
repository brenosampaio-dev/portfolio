import { Status, Text } from "@/components/ds";
import { PageIntro } from "@/components/site/PageIntro";
import { getPortfolioV2 } from "@/lib/portfolioV2";

export function LabsContent({ lang = "en" }) {
  const content = getPortfolioV2(lang);
  const fr = lang === "fr";

  return (
    <article>
      <section id="labs-overview" className="container section--emphasis" data-label="Labs" aria-labelledby="labs-page-title">
        <PageIntro eyebrow={content.labs.eyebrow} title={content.labs.title} lead={content.labs.lead} />
        <span id="labs-page-title" className="sr-only">Labs</span>
      </section>

      <section id="current-learning" className="container section" data-label={fr ? "Apprentissage actuel" : "Current learning"} aria-labelledby="labs-current-title">
        <div className="section-head">
          <Status>{content.statusLabels[content.labs.currentStatus]}</Status>
          <Text as="h2" variant="h2" id="labs-current-title">{content.labs.current}</Text>
          <Text variant="body">{fr ? "Priorités actuelles : HTML, CSS, JavaScript, React, accessibilité et Git." : "Current focus: HTML, CSS, JavaScript, React, accessibility and Git."}</Text>
        </div>
      </section>

      <section id="publishing-standard" className="container section" data-label={fr ? "Critère de publication" : "Publishing standard"} aria-labelledby="publishing-standard-title">
        <div className="section-head">
          <Text as="h2" variant="h2" id="publishing-standard-title">{fr ? "Ce qui mérite d’être publié" : "What earns a place here"}</Text>
          <Text variant="body">{fr ? "Un exercice de cours non modifié n’est pas une preuve de portfolio. Chaque expérience publiée devra montrer la question testée, l’adaptation, les décisions et ce qui a été appris." : "Unmodified tutorial work is not portfolio evidence. Every published experiment must show the question tested, the adaptation, the decisions and what was learned."}</Text>
        </div>
      </section>
    </article>
  );
}
