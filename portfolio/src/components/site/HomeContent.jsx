"use client";
import Link from "next/link";
import Image from "next/image";
import { Text, Button, ProjectCard, Divider } from "@/components/ds";
import { Reveal } from "@/components/site/Reveal";
import { ProcessReveal } from "@/components/site/ProcessReveal";
import { Scramble } from "@/components/site/Scramble";
import { Toolkit } from "@/components/site/Toolkit";
import { Collapsible } from "@/components/site/Collapsible";
import { Icon } from "@/components/site/Icon";
import { LocationTime } from "@/components/site/LocationTime";
import { LocalTime } from "@/components/site/LocalTime";
import { BrowserFrame } from "@/components/site/BrowserFrame";
import { DashboardPreview } from "@/components/site/DashboardPreview";
import { TriageInbox } from "@/components/site/TriageInbox";
import { profile } from "@/lib/content";
import { useLang } from "@/context/AppContext";
import { getT } from "@/lib/i18n";
import { renderTitle } from "@/lib/renderTitle";

export function HomeContent() {
  const { lang } = useLang();
  const t = getT(lang);

  return (
    <>
      {/* ── 1 · Hero ─────────────────────────────────────────── */}
      <section className="container hero" id="top" data-label={t.labels.intro} aria-labelledby="hero-title">
        <div className="hero__grid">
          <div className="hero__copy">
            <Reveal><LocationTime /></Reveal>
            <Scramble className="eyebrow eyebrow--accent hero__eyebrow" text="Breno Sampaio" delay={120} />
            <Reveal mask delay={60}>
              <Text variant="display" id="hero-title" className="hero__title">
                {renderTitle(t.hero.title)}
              </Text>
            </Reveal>
            <Reveal delay={220}>
              <Text variant="body-lg" className="hero__lead" style={{ color: "var(--graphite)" }}>
                {t.hero.lead}
              </Text>
            </Reveal>
            <Reveal delay={320} className="hero__actions">
              <Button href="#work" variant="primary">{t.hero.cta1}</Button>
              <Button href={t.resume.href} variant="link" download={t.resume.fileName}>{t.hero.cta2}</Button>
            </Reveal>
          </div>

          <Reveal delay={160} className="hero__media hero__media--photo" data-nav-dark>
            <Image
              src="/images/breno-portrait.png"
              alt="Breno Sampaio"
              fill
              sizes="(max-width: 980px) 90vw, 460px"
              style={{ objectFit: "cover" }}
              priority
            />
          </Reveal>
        </div>

        <Toolkit />
      </section>

      {/* ── 2 · Selected work ────────────────────────────────── */}
      <section className="container section" id="work" data-label={t.labels.work} aria-labelledby="work-title">
        <div className="section-head">
          <Scramble className="eyebrow eyebrow--accent" text={t.work.eyebrow} />
          <Reveal mask delay={60}><Text variant="h2" id="work-title">{t.work.heading}</Text></Reveal>
          <Reveal delay={140}>
            <Text variant="body" style={{ color: "var(--stone)", maxWidth: "48ch" }}>
              {t.work.subheading}
            </Text>
          </Reveal>
        </div>

        <div className="work-grid work-grid--solo">
          {t.projects.map((p, i) => (
            <Reveal
              key={p.slug || `upcoming-${i}`}
              delay={i * 90}
              className={`work-item${p.upcoming ? " work-item--upcoming" : ""}`}
            >
              <ProjectCard
                category={p.category}
                title={p.title}
                problem={p.problem}
                role={p.role}
                year={p.year}
                href={p.href}
                upcoming={p.upcoming}
                preview={
                  p.slug === "service-operations" ? (
                    <BrowserFrame url="operations.local/open-now" className="browser-frame--card">
                      <DashboardPreview />
                    </BrowserFrame>
                  ) : p.slug === "triageai" ? (
                    <BrowserFrame url="support.local/intake" className="browser-frame--card">
                      <TriageInbox />
                    </BrowserFrame>
                  ) : null
                }
              />
            </Reveal>
          ))}
        </div>
        <Reveal delay={180}>
          <p className="work-more">{t.work.more}</p>
        </Reveal>
      </section>

      {/* ── 3 · Professional evidence ───────────────────────── */}
      <section className="container section" id="experience" data-label={t.labels.experience} aria-labelledby="experience-title">
        <div className="experience-layout">
          <div className="section-head">
            <Scramble className="eyebrow eyebrow--accent" text={t.experience.eyebrow} />
            <Reveal mask delay={60}>
              <Text variant="h2" id="experience-title">
                {renderTitle(t.experience.heading)}
              </Text>
            </Reveal>
            <Reveal delay={140}>
              <Text variant="body" style={{ color: "var(--stone)", maxWidth: "44ch" }}>
                {t.experience.subheading}
              </Text>
            </Reveal>
          </div>

          <Reveal className="experience-list" delay={120}>
            {t.experience.items.map((item) => (
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

      {/* ── 4 · How I work ───────────────────────────────────── */}
      <section className="container section" id="approach" data-label={t.labels.process} aria-labelledby="process-title">
        <div className="process-head">
          <div className="stack" style={{ gap: "var(--space-4)" }}>
            <Scramble className="eyebrow eyebrow--accent" text={t.process.eyebrow} />
            <Reveal mask delay={60}>
              <Text variant="h2" id="process-title">
                {renderTitle(t.process.heading)}
              </Text>
            </Reveal>
          </div>
          <Reveal delay={140}>
            <Text variant="body" style={{ color: "var(--stone)" }}>
              {t.process.subheading}
            </Text>
          </Reveal>
        </div>

        <div className="process-grid">
          {t.processSteps.map((step, i) => (
            <Collapsible
              key={step.title}
              className="process-col"
              defaultOpen={i === 0}
              label={step.title}
              header={
                <>
                  <Icon name={step.icon} size={22} className="process-col__icon" />
                  <span className="process-col__index">{String(i + 1).padStart(2, "0")}</span>
                  <span className="process-col__title">{step.title}</span>
                </>
              }
            >
              <span className="process-col__desc">{step.description}</span>
              <ul className="process-col__items">
                {step.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </Collapsible>
          ))}
        </div>
        <ProcessReveal targetId="approach" />
      </section>

      {/* ── 5 · About ────────────────────────────────────────── */}
      <section className="container about-hero about-hero--compact" id="about" data-label={t.labels.about} aria-labelledby="about-title">
        <div className="about-hero__copy">
          <Scramble className="eyebrow eyebrow--accent" text={t.about.eyebrow} />
          <Reveal mask delay={60}>
            <Text variant="h1" as="h2" className="about-hero__title" id="about-title">
              {renderTitle(t.about.heading)}
            </Text>
          </Reveal>
          <Reveal delay={160}>
            <Text variant="body-lg" style={{ maxWidth: "44ch", color: "var(--graphite)" }}>
              {t.about.lead}
            </Text>
          </Reveal>
          <Reveal delay={240}>
            <Link href="/about" className="link-arrow">
              {t.about.cta}
              <span className="arrow" aria-hidden="true">↗</span>
            </Link>
          </Reveal>
        </div>

        <Reveal delay={200} className="about-facts">
          <div className="about-fact">
            <Icon name="map-pin" className="about-fact__icon" />
            <span className="about-fact__label">{t.about.facts.basedIn}</span>
            <span className="about-fact__value">{t.profile.location}</span>
          </div>
          <div className="about-fact">
            <Icon name="briefcase" className="about-fact__icon" />
            <span className="about-fact__label">{t.about.facts.working}</span>
            <span className="about-fact__value">{t.about.facts.workingValue}</span>
          </div>
          <div className="about-fact">
            <Icon name="globe" className="about-fact__icon" />
            <span className="about-fact__label">{t.about.facts.languages}</span>
            <div className="stack" style={{ gap: "var(--space-2)" }}>
              {profile.languages.map((l) => (
                <span className="lang-row" key={l.name}>
                  <span className="about-fact__value">{t.languageNames[l.name] || l.name}</span>
                  <span className="lang-row__level">{t.languageLevels[l.level] || l.level}</span>
                </span>
              ))}
            </div>
          </div>
          <div className="about-fact">
            <Icon name="award" className="about-fact__icon" />
            <span className="about-fact__label">{t.about.facts.cert}</span>
            <span className="about-fact__value">{t.about.facts.certValue}</span>
          </div>
          <div className="about-fact">
            <Icon name="globe" className="about-fact__icon" />
            <span className="about-fact__label">{t.about.facts.mobility}</span>
            <span className="about-fact__value">{t.about.facts.mobilityValue}</span>
          </div>
        </Reveal>
      </section>

      <div className="container"><Divider /></div>

      {/* ── 6 · Contact ──────────────────────────────────────── */}
      <section className="container section" id="contact" data-label={t.labels.contact} aria-labelledby="contact-title">
        <div className="contact">
          <div className="stack" style={{ gap: "var(--space-6)" }}>
            <Scramble className="eyebrow eyebrow--accent" text={t.contact.eyebrow} />
            <Reveal mask delay={60}>
              <Text variant="h1" as="h2" id="contact-title" style={{ maxWidth: "16ch" }}>
                {renderTitle(t.contact.heading)}
              </Text>
            </Reveal>
            <Reveal delay={160}>
              <Text variant="body" style={{ color: "var(--stone)", maxWidth: "46ch" }}>
                {t.contact.body}
              </Text>
            </Reveal>
          </div>

          <Reveal className="contact-list" delay={120}>
            <a className="contact-row" href={`mailto:${profile.email}`}>
              <Icon name="mail" className="contact-row__icon" />
              <span className="contact-row__label">{t.contact.email}</span>
              <span className="contact-row__value">{profile.email}</span>
              <span className="arrow" aria-hidden="true">↗</span>
            </a>
            <div className="contact-row">
              <Icon name="map-pin" className="contact-row__icon" />
              <span className="contact-row__label">{t.contact.location}</span>
              <span className="contact-row__value">{t.profile.location}</span>
            </div>
            <div className="contact-row">
              <Icon name="clock" className="contact-row__icon" />
              <span className="contact-row__label">{t.contact.localTime}</span>
              <span className="contact-row__value">
                <LocalTime timeZone={profile.timezone} />
              </span>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
