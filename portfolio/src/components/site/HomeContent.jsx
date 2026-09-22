import Image from "next/image";
import Link from "next/link";
import { Button, Divider, Text } from "@/components/ds";
import { CapabilityGroup } from "@/components/site/CapabilityGroup";
import { Icon } from "@/components/site/Icon";
import { LocationTime } from "@/components/site/LocationTime";
import { ProcessReveal } from "@/components/site/ProcessReveal";
import { Reveal } from "@/components/site/Reveal";
import { Scramble } from "@/components/site/Scramble";
import { WorkStatusPanel } from "@/components/site/WorkStatusPanel";
import { getT } from "@/lib/i18n";
import { getPortfolioV2 } from "@/lib/portfolioV2";

export function HomeContent({ lang = "en" }) {
  const content = getPortfolioV2(lang);
  const legacy = getT(lang);
  const fr = lang === "fr";
  const prefix = fr ? "/fr" : "";
  const labels = fr
    ? { top: "Introduction", work: "Projets", capabilities: "Compétences", experience: "Expérience", approach: "Méthode", about: "Profil", contact: "Contact" }
    : { top: "Intro", work: "Work", capabilities: "Capabilities", experience: "Experience", approach: "Approach", about: "About", contact: "Contact" };

  return (
    <>
      <section className="container hero" id="top" data-label={labels.top} aria-labelledby="hero-title">
        <div className="hero__grid">
          <div className="hero__copy">
            <Reveal className="hero__status-row"><LocationTime /></Reveal>
            <Scramble className="eyebrow eyebrow--accent hero__eyebrow" text={content.hero.eyebrow} delay={80} />
            <Reveal mask delay={50}><Text variant="display" id="hero-title" className="hero__title">{content.hero.title}</Text></Reveal>
            <Reveal delay={140}><Text variant="body-lg" className="hero__lead" style={{ color: "var(--graphite)" }}>{content.hero.lead}</Text></Reveal>
            <Reveal delay={190}><Text variant="mono">{content.hero.targets}</Text></Reveal>
            <Reveal delay={220} className="hero__actions">
              <Button href="#work">{content.hero.primaryAction}</Button>
              <Button href={content.links.github} variant="secondary" target="_blank" rel="noopener noreferrer">{content.hero.secondaryAction}</Button>
            </Reveal>
          </div>
          <Reveal delay={120} className="hero__media hero__media--photo" data-nav-dark>
            <Image src="/images/breno-portrait.png" alt="Breno Sampaio" fill sizes="(max-width: 980px) 90vw, 460px" style={{ objectFit: "cover" }} priority />
          </Reveal>
        </div>
      </section>

      <section className="container section" id="work" data-label={labels.work} aria-labelledby="home-work-title">
        <WorkStatusPanel id="home-work-title" status={content.statusLabels[content.work.status]} heading={content.work.heading} body={content.work.body} />
        <Reveal delay={120} className="section-actions"><Button href={`${prefix}/work`} variant="secondary">{fr ? "Voir la structure des projets" : "View the work structure"}</Button></Reveal>
      </section>

      <section className="container section" id="capabilities" data-label={labels.capabilities} aria-labelledby="capabilities-title">
        <div className="section-head">
          <Scramble className="eyebrow eyebrow--accent" text={labels.capabilities} />
          <Reveal mask><Text as="h2" variant="h2" id="capabilities-title">{fr ? "Ce que j’apporte aujourd’hui — et ce que je développe." : "What I bring now — and what I am building."}</Text></Reveal>
        </div>
        <div className="capability-grid">
          {content.capabilities.map((group) => <CapabilityGroup key={group.id} title={group.title} status={content.statusLabels[group.status]} items={group.items} />)}
        </div>
      </section>

      <section className="container section" id="experience" data-label={labels.experience} aria-labelledby="experience-title">
        <div className="experience-layout">
          <div className="section-head">
            <Scramble className="eyebrow eyebrow--accent" text={labels.experience} />
            <Reveal mask><Text as="h2" variant="h2" id="experience-title">{fr ? "Une expérience opérationnelle transférée au produit." : "Operational experience carried into product work."}</Text></Reveal>
            <Reveal><Text variant="body">{content.about.lead}</Text></Reveal>
          </div>
          <Reveal className="experience-list">
            {legacy.experience.items.map((item) => (
              <div className="experience-item" key={`${item.company}-${item.dates}`}>
                <span className="experience-item__dates">{item.dates}</span>
                <div>
                  <Text variant="h3" as="h3" className="experience-item__role">{item.role}</Text>
                  <span className="experience-item__company">{item.company} · {item.location}</span>
                  <p className="experience-item__detail">{item.detail}</p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="container section" id="approach" data-label={labels.approach} aria-labelledby="approach-title">
        <div className="process-head">
          <div className="section-head">
            <Scramble className="eyebrow eyebrow--accent" text={labels.approach} />
            <Reveal mask><Text as="h2" variant="h2" id="approach-title">{fr ? "De l’ambiguïté à une interface validée." : "From ambiguity to a validated interface."}</Text></Reveal>
          </div>
        </div>
        <div className="process-grid process-grid--v2">
          {content.process.map((step, index) => (
            <article className="process-col" key={step.id}>
              <span className="process-col__index">{String(index + 1).padStart(2, "0")}</span>
              <Text as="h3" variant="h3" className="process-col__title">{step.title}</Text>
              <Text variant="small" className="process-col__desc">{step.body}</Text>
            </article>
          ))}
        </div>
        <ProcessReveal targetId="approach" />
      </section>

      <section className="container about-hero about-hero--compact" id="about" data-label={labels.about} aria-labelledby="about-title">
        <div className="about-hero__copy">
          <Scramble className="eyebrow eyebrow--accent" text={content.about.eyebrow} />
          <Reveal mask><Text as="h2" variant="h1" id="about-title" className="about-hero__title">{content.about.title}</Text></Reveal>
          <Reveal><Text variant="body-lg" style={{ color: "var(--graphite)" }}>{content.about.lead}</Text></Reveal>
          <Reveal><Link href={`${prefix}/about`} className="link-arrow">{fr ? "Lire mon parcours" : "Read the full path"}<span className="arrow" aria-hidden="true">↗</span></Link></Reveal>
        </div>
        <Reveal className="about-facts">
          <div className="about-fact"><span className="about-fact__label">{fr ? "Identité actuelle" : "Current identity"}</span><span className="about-fact__value">{content.identity.current}</span></div>
          <div className="about-fact"><span className="about-fact__label">{fr ? "En développement" : "Building now"}</span><span className="about-fact__value">{content.identity.transition}</span></div>
          <div className="about-fact"><span className="about-fact__label">Direction</span><span className="about-fact__value">{content.identity.target}</span></div>
        </Reveal>
      </section>

      <div className="container"><Divider /></div>

      <section className="container section" id="contact" data-label={labels.contact} aria-labelledby="contact-title">
        <div className="contact">
          <div className="section-head">
            <Scramble className="eyebrow eyebrow--accent" text={labels.contact} />
            <Reveal mask><Text as="h2" variant="h1" id="contact-title">{fr ? "Concevons et développons des produits plus clairs." : "Let’s design and build clearer products."}</Text></Reveal>
            <Reveal><Text variant="body">{content.identity.target} · {content.location}</Text></Reveal>
          </div>
          <Reveal className="contact-list">
            <a className="contact-row" href={`mailto:${content.links.email}`}><Icon name="mail" className="contact-row__icon" /><span className="contact-row__label">Email</span><span className="contact-row__value">{content.links.email}</span><span className="arrow" aria-hidden="true">↗</span></a>
            <a className="contact-row" href={content.links.linkedin} target="_blank" rel="noopener noreferrer"><Icon name="globe" className="contact-row__icon" /><span className="contact-row__label">LinkedIn</span><span className="contact-row__value">brenosampaio</span><span className="arrow" aria-hidden="true">↗</span></a>
            <a className="contact-row" href={content.links.github} target="_blank" rel="noopener noreferrer"><Icon name="code" className="contact-row__icon" /><span className="contact-row__label">GitHub</span><span className="contact-row__value">brenosampaio-dev</span><span className="arrow" aria-hidden="true">↗</span></a>
            <a className="contact-row" href={legacy.resume.href} download={legacy.resume.fileName}><Icon name="download" className="contact-row__icon" /><span className="contact-row__label">{fr ? "Résumé" : "Resume"}</span><span className="contact-row__value">PDF</span><span className="arrow" aria-hidden="true">↓</span></a>
            <div className="contact-row"><Icon name="map-pin" className="contact-row__icon" /><span className="contact-row__label">{fr ? "Lieu" : "Location"}</span><span className="contact-row__value">{content.location}</span></div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
