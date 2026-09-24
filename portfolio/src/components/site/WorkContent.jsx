import { Button, Status, Text } from "@/components/ds";
import { PageIntro } from "@/components/site/PageIntro";
import { WorkStatusPanel } from "@/components/site/WorkStatusPanel";
import { getPortfolioV2 } from "@/lib/portfolioV2";

export function WorkContent({ lang = "en" }) {
  const content = getPortfolioV2(lang);
  const fr = lang === "fr";

  return (
    <article>
      <section id="work-overview" className="container section--emphasis" data-label={fr ? "Aperçu des projets" : "Work overview"} aria-labelledby="work-page-title">
        <PageIntro
          eyebrow={fr ? "Projets · sélection en pause" : "Work · selection paused"}
          title={fr ? "Des projets avec leur contexte, leurs décisions et leurs preuves." : "Work with scope, decisions and evidence."}
          lead={content.work.body}
          actions={<Button href={lang === "fr" ? "/fr#contact" : "/#contact"}>{fr ? "Échanger" : "Start a conversation"}</Button>}
        />
        <span id="work-page-title" className="sr-only">{fr ? "Projets" : "Work"}</span>
      </section>

      <section id="built-products" className="container section" data-label={content.work.builtHeading} aria-labelledby="built-products-title">
        <WorkStatusPanel
          id="built-products-title"
          status={content.statusLabels[content.work.status]}
          heading={content.work.heading}
          body={fr ? "Chaque projet sélectionné précisera sa portée, les décisions, ma contribution et les preuves disponibles." : "Every selected case will state its scope, decisions, contribution and available evidence."}
        />
      </section>

      <section id="design-systems" className="container section" data-label={content.work.systemsHeading} aria-labelledby="design-systems-title">
        <div className="section-head">
          <Status>{content.statusLabels.next}</Status>
          <Text as="h2" variant="h2" id="design-systems-title">{content.work.systemsHeading}</Text>
          <Text variant="body">{fr ? "Les composants apparaîtront avec leurs décisions, variantes, états et critères d’accessibilité — pas comme une simple galerie d’écrans." : "Components will appear with their decisions, variants, states and accessibility criteria — not as a gallery of polished screens."}</Text>
        </div>
      </section>

      <section id="operational-archive" className="container section" data-label={content.work.archiveHeading} aria-labelledby="operational-archive-title">
        <div className="section-head">
          <Status>{content.statusLabels.paused}</Status>
          <Text as="h2" variant="h2" id="operational-archive-title">{content.work.archiveHeading}</Text>
          <Text variant="body">{content.work.archiveBody}</Text>
        </div>
      </section>
    </article>
  );
}
