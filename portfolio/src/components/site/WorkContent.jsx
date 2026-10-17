import Link from "next/link";
import { Reveal } from "@/components/site/Reveal";
import { Scramble } from "@/components/site/Scramble";
import { WorkSelection } from "@/components/site/WorkSelection";
import { getPortfolioEditorial } from "@/lib/portfolioEditorial";
import styles from "./EditorialShell.module.css";

export function WorkContent({ lang = "en" }) {
  const c = getPortfolioEditorial(lang);
  const prefix = lang === "fr" ? "/fr" : "";

  return (
    <article className={styles.shell}>
      <section className={`container ${styles.pageIntro}`} id="work-overview" data-label={c.labels.work} aria-labelledby="work-page-title">
        <div className={styles.workHeader}>
          <div>
            <p className={styles.eyebrow}><Scramble text={c.work.label} /></p>
            <Reveal mask>
              <h1 id="work-page-title" className={styles.pageTitle}>{c.work.title}</h1>
            </Reveal>
          </div>
          <p className={styles.sectionCaption}>{c.work.caption}</p>
        </div>

        <Reveal delay={80}>
          <WorkSelection copy={c.work} lang={lang} />
        </Reveal>

        <Reveal className={styles.catalogPreview} delay={140}>
          <div className={styles.sectionHeading} style={{ marginBottom: "1.5rem" }}>
            <div>
              <p className={styles.eyebrow}>{c.work.catalogEyebrow}</p>
              <h2 className={styles.serifH2}>{c.work.catalogTitle}</h2>
            </div>
          </div>

          <article className={styles.compactCard} aria-label={c.work.compactMeta}>
            <div className={styles.compactThumb} aria-hidden="true">
              <div className={styles.compactThumbBar} />
              <div className={styles.compactThumbLines}>
                <span style={{ width: "85%" }} />
                <span style={{ width: "65%" }} />
                <span style={{ width: "75%" }} />
              </div>
            </div>
            <div className={styles.compactInfo}>
              <p className={styles.projectMeta} style={{ marginBottom: "0.25rem" }}>{c.work.compactMeta}</p>
              <h3>{c.work.compactTitle}</h3>
              <p>{c.work.compactBody}</p>
              <div className={styles.compactTags}>
                <span><strong>{c.work.compactContributionLabel}</strong> {c.work.compactContributionValue}</span>
                <span><strong>{c.work.compactStatusLabel}</strong> {c.work.compactStatusValue}</span>
              </div>
            </div>
            <div>
              <Link href={`${prefix || "/"}#contact`} className={styles.textLink}>
                {c.aboutPage.contact} <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </article>
        </Reveal>
      </section>
    </article>
  );
}
