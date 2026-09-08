import Image from "next/image";
import "./CaseVisual.css";
import { caseVisualLabels, getCaseVisual } from "@/lib/caseVisuals";

export function CaseVisual({ slug, phase, lang, eager = false }) {
  const visual = getCaseVisual(slug, phase, lang);
  if (!visual) return null;
  const labels = caseVisualLabels[lang === "fr" ? "fr" : "en"];

  return (
    <figure className="case-visual">
      <a
        className="case-visual__imageLink"
        href={visual.src}
        target="_blank"
        rel="noreferrer"
        aria-label={`${labels.enlarge}: ${visual.title} (${labels.newTab})`}
      >
        <Image
          src={visual.src}
          alt={visual.alt}
          width={visual.width}
          height={visual.height}
          loading={eager ? "eager" : "lazy"}
          sizes="(max-width: 800px) 100vw, (max-width: 1440px) 85vw, 1200px"
          className="case-visual__image"
        />
        <span className="case-visual__expand" aria-hidden="true">↗</span>
      </a>
      <figcaption className="case-visual__caption">
        <span className="case-visual__label">{labels.disclosure}</span>
        <strong>{visual.title}</strong>
        <p>{visual.caption}</p>
      </figcaption>
    </figure>
  );
}
