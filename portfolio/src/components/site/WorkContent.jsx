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
          title={fr ? "Une structure honnête avant les études de cas." : "An honest structure before the case studies."}
          lead={content.work.body}
          actions={<Button href={lang === "fr" ? "/fr#contact" : "/#contact"}>{fr ? "Parler d’une opportunité" : "Discuss an opportunity"}</Button>}
        />
        <span id="work-page-title" className="sr-only">{fr ? "Projets" : "Work"}</span>
      </section>

      <section id="built-products" className="container section" data-label={content.work.builtHeading} aria-labelledby="built-products-title">
        <WorkStatusPanel
          id="built-products-title"
          status={content.statusLabels[content.work.status]}
          heading={content.work.heading}
          body={fr ? "Aucun produit n’est affiché ici tant que sa portée, sa contribution et ses preuves ne sont pas prêtes à être examinées." : "No product appears here until its scope, contribution and evidence are ready to review."}
        />
      </section>

      <section id="design-systems" className="container section" data-label={content.work.systemsHeading} aria-labelledby="design-systems-title">
        <div className="section-head">
          <Status>{content.statusLabels.next}</Status>
          <Text as="h2" variant="h2" id="design-systems-title">{content.work.systemsHeading}</Text>
          <Text variant="body">{fr ? "Cette section accueillera uniquement des composants documentés avec leurs décisions, variantes, états et critères d’accessibilité." : "This section will contain only documented components with their decisions, variants, states and accessibility criteria."}</Text>
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
