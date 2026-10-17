import Link from "next/link";
import styles from "./EditorialShell.module.css";

// Honest empty/in-review state with the approved organic mineral artwork.
export function WorkSelection({ copy, lang = "en" }) {
  const prefix = lang === "fr" ? "/fr" : "";
  return (
    <div className={styles.pausedBanner}>
      <div>
        <p className={styles.eyebrow}>{copy.label}</p>
        <h2 className={styles.serifH2}>{copy.emptyTitle}</h2>
        <p className={styles.pausedBody}>{copy.emptyBody}</p>
        <div className={`page-intro__actions ${styles.actions}`}>
          <Link className={styles.primary} href={`${prefix}/about`}>
            {copy.about} <span aria-hidden="true">→</span>
          </Link>
          <Link className={styles.textLink} href={`${prefix || "/"}#contact`}>
            {lang === "fr" ? "Me contacter" : "Contact me"} <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>

      <figure className={styles.pausedArt} aria-hidden="true">
        <svg viewBox="0 0 320 180" className={styles.artSvg}>
          <ellipse cx="110" cy="95" rx="68" ry="48" fill="var(--wash-sage)" />
          <ellipse cx="195" cy="82" rx="62" ry="46" fill="var(--wash-blue)" />
          <ellipse cx="165" cy="118" rx="52" ry="38" fill="var(--wash-clay)" />
          <path
            className={styles.gestureLine}
            d="M36 132 C88 48, 152 138, 214 64 C244 30, 268 78, 288 52"
            fill="none"
            stroke="var(--ink)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </figure>
    </div>
  );
}
