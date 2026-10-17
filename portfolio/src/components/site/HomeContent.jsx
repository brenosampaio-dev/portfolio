import Image from "next/image";
import Link from "next/link";
import { CapabilitiesExplorer } from "@/components/site/CapabilitiesExplorer";
import { ContactForm } from "@/components/site/ContactForm";
import { LocationTime } from "@/components/site/LocationTime";
import { Reveal } from "@/components/site/Reveal";
import { Scramble } from "@/components/site/Scramble";
import { getT } from "@/lib/i18n";
import { getPortfolioEditorial } from "@/lib/portfolioEditorial";
import { portfolioProfileFacts } from "@/lib/portfolioV2";
import styles from "./EditorialShell.module.css";

export function HomeContent({ lang = "en" }) {
  const c = getPortfolioEditorial(lang);
  const t = getT(lang);
  const prefix = lang === "fr" ? "/fr" : "";
  const { links } = portfolioProfileFacts;

  return (
    <div className={styles.shell}>
      {/* ====================================================================
          01 · HERO (Option 1 Approved: Mineral pigment & organic line)
          ==================================================================== */}
      <section className={`container ${styles.hero}`} id="top" data-label={c.labels.top} aria-labelledby="hero-title">
        <div className={styles.heroGrid}>
          <div className={styles.heroLeft}>
            <p className={styles.eyebrow}>
              <Scramble text={c.hero.eyebrow} />
            </p>
            <Reveal mask>
              <h1 className={`hero__title ${styles.heroTitle}`} id="hero-title">
                {c.hero.title} <span>{c.hero.emphasis}</span>
              </h1>
            </Reveal>
            <Reveal delay={90}>
              <div className={`hero__actions ${styles.actions}`}>
                <Link className={styles.primary} href={`${prefix}/work`}>
                  {c.hero.primary} <span aria-hidden="true">→</span>
                </Link>
                <Link className={styles.textLink} href={`${prefix}/about`}>
                  {c.hero.secondary} <span aria-hidden="true">→</span>
                </Link>
              </div>
            </Reveal>
          </div>

          <Reveal className={styles.heroSupporting} delay={140}>
            <figure className={`hero__media--art ${styles.mineralCanvas}`} aria-hidden="true">
              <svg viewBox="0 0 420 240" className={styles.artSvg}>
                <defs>
                  <filter id="hero-soft-wash" x="-15%" y="-15%" width="130%" height="130%">
                    <feGaussianBlur stdDeviation="8" />
                  </filter>
                </defs>
                <path
                  className={styles.washShape1}
                  d="M195 36 C255 22, 315 52, 322 112 C328 170, 275 212, 212 204 C152 196, 134 146, 146 90 C156 46, 165 43, 195 36 Z"
                  fill="var(--wash-sage)"
                  filter="url(#hero-soft-wash)"
                />
                <path
                  className={styles.washShape2}
                  d="M108 118 C154 96, 212 122, 216 168 C220 210, 168 234, 118 224 C72 214, 58 174, 74 142 C84 124, 92 125, 108 118 Z"
                  fill="var(--wash-blue)"
                  filter="url(#hero-soft-wash)"
                />
                <path
                  className={styles.washShape3}
                  d="M268 78 C318 66, 366 102, 358 156 C350 206, 294 226, 252 204 C214 184, 212 132, 236 98 C248 82, 254 81, 268 78 Z"
                  fill="var(--wash-clay)"
                  filter="url(#hero-soft-wash)"
                />
                <path
                  className={styles.gestureLine}
                  d="M56 196 C104 82, 174 54, 224 138 C264 204, 316 186, 366 68"
                  fill="none"
                  stroke="var(--ink)"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </figure>
            <p className={styles.heroLead}>{c.hero.lead}</p>
            <p className={styles.practice}>{c.hero.practice}</p>
            <div className={styles.location}><LocationTime /></div>
          </Reveal>
        </div>
      </section>

      {/* ====================================================================
          02 · SELECTED WORK (Approved Product Stage + Structured Context)
          ==================================================================== */}
      <section className={`container ${styles.section}`} id="work" data-label={c.labels.work} aria-labelledby="home-work-title">
        <Reveal className={styles.sectionHeading}>
          <div>
            <p className={styles.eyebrow}>{c.work.label}</p>
            <h2 className={styles.sansH2} id="home-work-title">{c.work.title}</h2>
          </div>
          <p className={styles.sectionCaption}>{c.work.caption}</p>
        </Reveal>

        <Reveal as="article" className={styles.projectCard} delay={80} aria-labelledby="featured-project-title">
          <figure className={styles.projectMedia}>
            <div className={styles.interfaceStage} aria-hidden="true">
              <div className={styles.desktopUi}>
                <div className={styles.windowTop}><i /><i /><i /><span /></div>
                <div className={styles.workspace}>
                  <div className={styles.uiSidebar}>
                    <div className={styles.brandGlyph}>/</div>
                    <b /><b /><b /><b /><b />
                    <div className={styles.sidebarBottom} />
                  </div>
                  <div className={styles.workspaceMain}>
                    <div className={styles.workspaceToolbar}><span /><i /><i /></div>
                    <div className={styles.contentHeading}><span /><b /></div>
                    <div className={styles.introLine} />
                    <div className={styles.contentColumns}>
                      <div className={styles.mainColumn}>
                        <div className={styles.summaryBlock}>
                          <div className={styles.summaryIcon}>↗</div>
                          <div><b /><span /><span /></div>
                          <i />
                        </div>
                        <div className={styles.listHeader}><b /><span /></div>
                        <div className={styles.dataRow}><i /><div><b /><span /></div><em /></div>
                        <div className={styles.dataRow}><i /><div><b /><span /></div><em /></div>
                        <div className={styles.dataRow}><i /><div><b /><span /></div><em /></div>
                      </div>
                      <div className={styles.detailColumn}>
                        <div className={styles.detailMark} />
                        <b /><span /><span />
                        <div className={styles.detailRule} />
                        <b /><span />
                        <div className={styles.detailAction} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.mobileUi}>
                <div className={styles.phoneSpeaker} />
                <div className={styles.mobileToolbar}><b /><i /></div>
                <div className={styles.mobileTitle} />
                <div className={styles.mobileLine} />
                <div className={styles.mobileSummary}><span>↗</span><b /><i /></div>
                <div className={styles.mobileRow}><i /><b /></div>
                <div className={styles.mobileRow}><i /><b /></div>
                <div className={styles.mobileRow}><i /><b /></div>
                <div className={styles.mobileBottom}><b /><b /><b /></div>
              </div>
            </div>
            <figcaption>{c.work.stageCaption}</figcaption>
          </figure>

          <div className={styles.projectCopy}>
            <p className={styles.projectMeta}>{c.work.meta}</p>
            <h3 className={styles.projectHeading} id="featured-project-title">
              {c.work.projectTitle}<br />
              <span>{c.work.projectTitleEmphasis}</span>
            </h3>
            <p className={styles.projectDescription}>{c.work.description}</p>
            <dl className={styles.projectFacts}>
              {c.work.facts.map((fact) => (
                <div key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
            <Link href={`${prefix}/work`} className={styles.projectLink}>
              <span>{c.work.cta}</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M5 19 19 5M5 5h14v14" />
              </svg>
            </Link>
          </div>
        </Reveal>
        <p className={styles.studyNote}>{c.work.note}</p>
      </section>

      {/* ====================================================================
          03 · FOCUS & CAPABILITIES (Approved 3-Tab Interactive Explorer)
          ==================================================================== */}
      <section className={`container ${styles.section}`} id="capabilities" data-label={c.labels.capabilities} aria-labelledby="capabilities-title">
        <Reveal className={styles.capHeading}>
          <p className={styles.eyebrow}>{c.capabilities.eyebrow}</p>
          <h2 className={styles.sansH2} id="capabilities-title">{c.capabilities.title}</h2>
          <p className={styles.capIntro}>{c.capabilities.lead}</p>
        </Reveal>
        <Reveal delay={80}>
          <CapabilitiesExplorer copy={c.capabilities} />
        </Reveal>
      </section>

      {/* ====================================================================
          04 · WAY OF WORKING (Approved Option A: Quiet Editorial 3 Rows)
          ==================================================================== */}
      <section className={`container ${styles.section} ${styles.approachSection}`} id="approach" data-label={c.labels.approach} aria-labelledby="approach-title">
        <div className={styles.approachGrid}>
          <Reveal>
            <p className={styles.eyebrow}>{c.approach.eyebrow}</p>
            <h2 className={styles.sansH2} id="approach-title">{c.approach.title}</h2>
            <p className={styles.lead}>{c.approach.lead}</p>
          </Reveal>
          <div className={styles.questions}>
            {c.approach.items.map((item, idx) => (
              <Reveal as="article" key={item.title} delay={idx * 90}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          05 · ABOUT & BACKGROUND (Approved Option 3 Responsive Two-Columns)
          ==================================================================== */}
      <section className={`container ${styles.section}`} id="about" data-label={c.labels.about} aria-labelledby="about-title">
        <span id="experience" className={styles.anchor} aria-hidden="true" />
        <div className={styles.aboutOpt3Grid}>
          <Reveal className={styles.aboutOpt3Content}>
            <p className={styles.eyebrow}>{c.about.eyebrow}</p>
            <h2 className={styles.serifH2} id="about-title">{c.about.title}</h2>

            <div className={styles.aboutSubCols}>
              <div>
                <h3>{c.about.col1Title}</h3>
                <p>{c.about.col1Body}</p>
              </div>
              <div>
                <h3>{c.about.col2Title}</h3>
                <p>{c.about.col2Body}</p>
              </div>
            </div>

            <Link href={`${prefix}/about`} className={styles.projectLink} style={{ maxWidth: "340px" }}>
              <span>{c.about.link}</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M5 19 19 5M5 5h14v14" />
              </svg>
            </Link>
          </Reveal>

          <Reveal as="aside" className={styles.openPortraitCard} delay={120} aria-label={c.about.caption}>
            <div className={styles.openPortraitImgWrap} data-header-tone="dark">
              <Image
                src="/images/breno-portrait.png"
                alt="Breno Sampaio"
                width={600}
                height={750}
                sizes="(max-width: 700px) 96px, (max-width: 960px) 240px, 320px"
                className={styles.openPortraitImg}
              />
            </div>
            <div className={styles.openPortraitMeta}>
              <strong>Breno Sampaio</strong>
              <span>{c.about.cardRole}</span>
              <span className={styles.openPortraitLangs}>{c.about.cardLangs}</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ====================================================================
          06 · CONTACT (Approved Option 2: Direct Facts + Open Form Card)
          ==================================================================== */}
      <section className={`container ${styles.section} ${styles.contactSection}`} id="contact" data-label={c.labels.contact} aria-labelledby="contact-title" tabIndex={-1}>
        <div className={styles.contactGrid}>
          <Reveal>
            <p className={styles.eyebrow}>{c.contact.eyebrow}</p>
            <h2 className={styles.serifH2} id="contact-title">{c.contact.title}</h2>
            <p className={styles.lead}>{c.contact.lead}</p>

            <dl className={styles.contactFacts}>
              <div>
                <dt>{c.contact.directLabel}</dt>
                <dd>
                  <a className={styles.email} href={`mailto:${links.email}`}>
                    {links.email} <span aria-hidden="true">↗</span>
                  </a>
                </dd>
              </div>
              <div>
                <dt>{c.contact.docsLabel}</dt>
                <dd className={styles.contactLinks}>
                  <a className={styles.textLink} href={t.resume.href} download={t.resume.fileName}>
                    {c.contact.resume} <span aria-hidden="true">↓</span>
                  </a>
                  <a className={styles.textLink} href={links.linkedin} target="_blank" rel="noopener noreferrer">
                    LinkedIn <span aria-hidden="true">↗</span>
                  </a>
                  <a className={styles.textLink} href={links.github} target="_blank" rel="noopener noreferrer">
                    GitHub <span aria-hidden="true">↗</span>
                  </a>
                </dd>
              </div>
              <div>
                <dt>{c.contact.baseLabel}</dt>
                <dd>{c.contact.baseValue}</dd>
              </div>
            </dl>
          </Reveal>

          <Reveal className={styles.formPanel} delay={100}>
            <h3>{c.contact.form}</h3>
            <ContactForm lang={lang} />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
