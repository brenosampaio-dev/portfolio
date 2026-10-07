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
          eyebrow={fr ? "Projets indépendants · En développement" : "Independent work · In development"}
          title={fr ? "Produit, système et build — chacun avec ses propres preuves." : "Product, system and build — each with its own proof."}
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
          body={content.work.body}
        />
      </section>

      <section id="design-systems" className="container section" data-label={content.work.systemsHeading} aria-labelledby="design-systems-title">
        <div className="section-head">
          <Status>{content.statusLabels.next}</Status>
          <Text as="h2" variant="h2" id="design-systems-title">{content.work.systemsHeading}</Text>
          <Text variant="body">{fr ? "Basis sera extrait des besoins réels de Relay : composants, variantes, états et critères d’accessibilité documentés, pas une galerie d’écrans." : "Basis will be extracted from Relay’s real interface needs: documented components, variants, states and accessibility criteria, not a screen gallery."}</Text>
        </div>
      </section>

      <section id="operational-archive" className="container section" data-label={content.work.archiveHeading} aria-labelledby="operational-archive-title">
        <div className="section-head">
          <Status>{fr ? "Référence uniquement" : "Reference only"}</Status>
          <Text as="h2" variant="h2" id="operational-archive-title">{content.work.archiveHeading}</Text>
          <Text variant="body">{content.work.archiveBody}</Text>
        </div>
      </section>
    </article>
  );
}
