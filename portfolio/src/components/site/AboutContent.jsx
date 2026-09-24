import Image from "next/image";
import { Button, Text } from "@/components/ds";
import { CapabilityGroup } from "@/components/site/CapabilityGroup";
import { PageIntro } from "@/components/site/PageIntro";
import { Reveal } from "@/components/site/Reveal";
import { profile } from "@/lib/content";
import { getT } from "@/lib/i18n";
import { getPortfolioV2 } from "@/lib/portfolioV2";

export function AboutContent({ lang = "en" }) {
  const content = getPortfolioV2(lang);
  const legacy = getT(lang);
  const fr = lang === "fr";
  const prefix = fr ? "/fr" : "";

  return (
    <article>
      <section id="about-overview" className="container about-hero" data-label={fr ? "Profil" : "About"} aria-label={fr ? "Présentation" : "Positioning"}>
        <PageIntro eyebrow={content.about.eyebrow} title={content.about.title} lead={content.about.lead} actions={<Button href={legacy.resume.href} download={legacy.resume.fileName}>{fr ? "Télécharger le CV" : "Download resume"}</Button>} />
        <Reveal>
          <div className="portrait portrait--photo">
            <Image src="/images/breno-portrait.png" alt="Breno Sampaio" fill sizes="(max-width: 980px) 90vw, 360px" style={{ objectFit: "cover" }} priority />
          </div>
        </Reveal>
        <Reveal className="about-facts">
          <div className="about-fact"><span className="about-fact__label">{fr ? "Identité actuelle" : "Current identity"}</span><span className="about-fact__value">{content.identity.current}</span></div>
          <div className="about-fact"><span className="about-fact__label">{fr ? "En développement" : "Building now"}</span><span className="about-fact__value">{content.identity.transition}</span></div>
          <div className="about-fact"><span className="about-fact__label">{fr ? "Mobilité" : "Mobility"}</span><span className="about-fact__value">{fr ? "Espagne · Europe · Canada selon le processus employeur" : "Spain · Europe · Canada with the right employer process"}</span></div>
        </Reveal>
      </section>

      <section id="about-path" className="container section about-body" data-label={fr ? "Parcours" : "The path"} aria-labelledby="about-path-title">
        <Text as="h2" variant="h2" id="about-path-title">{fr ? "Opérations → Produit → Code" : "Operations → Product → Code"}</Text>
        <div className="prose">
          <p>{content.about.lead}</p>
          <p className="muted">{fr ? "Le fil conducteur est la clarté : comprendre ce qui bloque une personne, rendre les contraintes visibles, puis transformer ce raisonnement en parcours et en composants utilisables." : "The connecting thread is clarity: understand what blocks a person, make constraints visible, then carry that reasoning into usable flows and components."}</p>
        </div>
      </section>

      <section id="transferable-strengths" className="container section" data-label={fr ? "Forces transférables" : "Transferable strengths"} aria-labelledby="strengths-title">
        <div className="section-head"><Text as="h2" variant="h2" id="strengths-title">{fr ? "Des forces éprouvées qui passent au produit." : "Proven strengths that transfer into product."}</Text></div>
        <div className="capability-grid">
          {content.capabilities.slice(0, 2).map((group) => <CapabilityGroup key={group.id} title={group.title} status={content.statusLabels[group.status]} items={group.items} />)}
        </div>
      </section>

      <section id="current-learning" className="container section" data-label={fr ? "Apprentissage actuel" : "Current learning"} aria-labelledby="learning-title">
        <div className="section-head">
          <Text as="h2" variant="h2" id="learning-title">{fr ? "Le code comme prolongement du design." : "Code as an extension of design."}</Text>
          <Text variant="body">{content.about.learning}</Text>
        </div>
        <CapabilityGroup title={content.capabilities[2].title} status={content.statusLabels[content.capabilities[2].status]} items={content.capabilities[2].items} />
      </section>

      <section id="timeline" className="container section" data-label={fr ? "Chronologie" : "Timeline"} aria-labelledby="timeline-title">
        <div className="experience-layout">
          <div className="section-head"><Text as="h2" variant="h2" id="timeline-title">{fr ? "Expérience factuelle" : "Factual experience"}</Text></div>
          <div className="experience-list">
            {legacy.experience.items.map((item) => (
              <div className="experience-item" key={`${item.company}-${item.dates}`}>
                <span className="experience-item__dates">{item.dates}</span>
                <div><Text as="h3" variant="h3" className="experience-item__role">{item.role}</Text><span className="experience-item__company">{item.company} · {item.location}</span><p className="experience-item__detail">{item.detail}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="languages-location" className="container section" data-label={fr ? "Langues et lieu" : "Languages and location"} aria-labelledby="languages-title">
        <div className="about-body">
          <div className="section-head"><Text as="h2" variant="h2" id="languages-title">{content.location}</Text><Text variant="body">{fr ? "Disponible pour des modalités hybrides, à distance et une mobilité adaptée au poste." : "Available for hybrid, remote and role-appropriate relocation arrangements."}</Text></div>
          <div className="about-facts">
            {profile.languages.map((language) => <div className="about-fact" key={language.name}><span className="about-fact__label">{legacy.languageNames[language.name] || language.name}</span><span className="about-fact__value">{legacy.languageLevels[language.level] || language.level}</span></div>)}
          </div>
        </div>
      </section>

      <section id="about-actions" className="container section" data-label={fr ? "Prochaines étapes" : "Next actions"} aria-labelledby="about-actions-title">
        <div className="section-head">
          <Text as="h2" variant="h2" id="about-actions-title">{fr ? "Voir le système, puis parlons." : "See the system, then let’s talk."}</Text>
          <div className="page-intro__actions"><Button href={`${prefix}/work`}>{fr ? "Voir les projets" : "Explore work"}</Button><Button href={`${prefix}/labs`} variant="secondary">Labs</Button><Button href={`${prefix || "/"}#contact`} variant="link">Contact</Button></div>
        </div>
      </section>
    </article>
  );
}
