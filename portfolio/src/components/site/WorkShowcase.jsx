import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/site/Reveal";
import { caseVisualLabels, getCaseVisual } from "@/lib/caseVisuals";
import "./WorkShowcase.css";

export function WorkShowcase({ projects, lang, viewCase }) {
  const labels = caseVisualLabels[lang === "fr" ? "fr" : "en"];

  return (
    <div className="work-showcase">
      {projects.filter((project) => !project.upcoming).map((project, index) => {
        const visual = getCaseVisual(project.slug, "investigation", lang);
        return (
          <Reveal key={project.slug}>
            <article>
              <Link
                href={project.href}
                className="work-showcase__row"
                aria-label={`${project.title} — ${viewCase}`}
              >
                {visual && (
                  <div className="work-showcase__visual" aria-hidden="true">
                    <Image
                      src={visual.src}
                      width={visual.width}
                      height={visual.height}
                      sizes="(max-width: 800px) 100vw, 720px"
                      alt=""
                    />
                    <span className="work-showcase__disclosure">{labels.disclosure}</span>
                  </div>
                )}
                <div className="work-showcase__copy">
                  <span className="work-showcase__index">{String(index + 1).padStart(2, "0")} / {project.year}</span>
                  <span className="work-showcase__category">{project.category}</span>
                  <h3>{project.title}</h3>
                  <p>{project.problem}</p>
                  <span className="work-showcase__tools">{project.role}</span>
                  <span className="work-showcase__cta">{viewCase}<span aria-hidden="true">↗</span></span>
                </div>
              </Link>
            </article>
          </Reveal>
        );
      })}
    </div>
  );
}
