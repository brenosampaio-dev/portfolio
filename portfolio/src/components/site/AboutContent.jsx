import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/site/Reveal";
import { Scramble } from "@/components/site/Scramble";
import { profile } from "@/lib/content";
import { getT } from "@/lib/i18n";
import { getPortfolioEditorial } from "@/lib/portfolioEditorial";
import styles from "./EditorialShell.module.css";

export function AboutContent({ lang = "en" }) {
  const c = getPortfolioEditorial(lang);
  const a = c.aboutPage;
  const t = getT(lang);
  const prefix = lang === "fr" ? "/fr" : "";

  return (
    <article className={styles.shell}>
      {/* 01 · Personal thesis + Portrait card */}
      <section className={`container ${styles.pageIntro}`} id="about-overview" data-label={a.eyebrow} aria-labelledby="about-page-title">
        <div className={styles.aboutIntro}>
          <div>
            <p className={styles.eyebrow}><Scramble text={a.eyebrow} /></p>
            <Reveal mask>
              <h1 id="about-page-title" className={styles.pageTitle}>
                {a.title} <span>{a.emphasis}</span>
              </h1>
            </Reveal>
            <Reveal delay={80}>
              <p className={styles.lead}>{a.intro}</p>
              <p className={styles.subLead}>{a.introSub}</p>
            </Reveal>
          </div>

          <Reveal as="aside" className={styles.portraitCardPage} delay={120} aria-label={c.about.caption}>
            <div data-header-tone="dark">
              <Image
                src="/images/breno-portrait.png"
                alt="Breno Sampaio"
                width={600}
                height={750}
                sizes="(max-width: 700px) 260px, 320px"
                priority
                className={styles.portraitCardImg}
              />
            </div>
            <dl className={styles.portraitCardMeta}>
              <div><dt>{a.metaBaseLabel}</dt><dd>{a.metaBaseValue}</dd></div>
              <div><dt>{a.metaRoleLabel}</dt><dd>{a.metaRoleValue}</dd></div>
              <div><dt>{a.metaLangsLabel}</dt><dd>{a.metaLangsValue}</dd></div>
            </dl>
          </Reveal>
        </div>
      </section>

      {/* 02 · Product Perspective & Collaboration */}
      <section className={`container ${styles.section} ${styles.chapterSection}`} id="perspective" data-label={lang === "fr" ? "Perspective" : "Perspective"} aria-labelledby="perspective-title">
        <div className={styles.chapterGrid}>
          <Reveal className={styles.chapterHead}>
            <p className={styles.eyebrow}>{a.perspectiveEyebrow}</p>
            <h2 id="perspective-title" className={styles.serifH2}>{a.perspective}</h2>
          </Reveal>
          <Reveal className={styles.chapterBody} delay={80}>
            <p className={styles.chapterLead}>{a.perspectiveBody}</p>
            <div className={styles.pillarsGrid}>
              {a.pillars.map((pillar) => (
                <div key={pillar.title} className={styles.pillarBox}>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.body}</p>
                </div>
              ))}
            </div>

            <div className={styles.editorialRows}>
              <div className={styles.edRow}>
                <div className={styles.edLabel}>{a.collaborationLabel}</div>
                <div className={styles.edContent}>
                  <h3>{a.collaboration}</h3>
                  <p>{a.collaborationBody}</p>
                </div>
              </div>
              <div className={styles.edRow}>
                <div className={styles.edLabel}>{a.frontendLabel}</div>
                <div className={styles.edContent}>
                  <h3>{a.frontend}</h3>
                  <p>{a.frontendBody}</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 03 · Synthesized Trajectory */}
      <section className={`container ${styles.section} ${styles.chapterSection}`} id="timeline" data-label={lang === "fr" ? "Parcours" : "Experience"} aria-labelledby="timeline-title">
        <div className={styles.chapterGrid}>
          <Reveal className={styles.chapterHead}>
            <p className={styles.eyebrow}>{a.experienceEyebrow}</p>
            <h2 id="timeline-title" className={styles.serifH2}>{a.experience}</h2>
          </Reveal>
          <div className={styles.editorialRows}>
            {a.trajectoryRows.map((row, idx) => (
              <Reveal key={row.title} className={styles.edRow} delay={idx * 80}>
                <div className={styles.edLabel}>{row.label}</div>
                <div className={styles.edContent}>
                  <h3>{row.title}</h3>
                  <p>{row.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 04 · Languages, Location & Direct Closing Action */}
      <section className={`container ${styles.section}`} id="languages-location" data-label={a.languages} aria-labelledby="languages-title">
        <div className={styles.chapterGrid}>
          <Reveal className={styles.chapterHead}>
            <p className={styles.eyebrow}>{a.languages}</p>
            <h2 id="languages-title" className={styles.serifH2}>{a.location}</h2>
          </Reveal>
          <Reveal delay={80}>
            <dl className={styles.languages}>
              {profile.languages.map((language) => (
                <div key={language.name}>
                  <dt>{t.languageNames[language.name] || language.name}</dt>
                  <dd>{t.languageLevels[language.level] || language.level}</dd>
                </div>
              ))}
            </dl>
            <div className={`page-intro__actions ${styles.actions}`} style={{ marginTop: "2.5rem" }}>
              <Link className={styles.primary} href={`${prefix || "/"}#contact`}>
                {a.contact} <span aria-hidden="true">→</span>
              </Link>
              <a className={styles.textLink} href={t.resume.href} download={t.resume.fileName}>
                {c.contact.resume} <span aria-hidden="true">↓</span>
              </a>
              <Link className={styles.textLink} href={`${prefix}/work`}>
                {a.work} <span aria-hidden="true">→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </article>
  );
}
