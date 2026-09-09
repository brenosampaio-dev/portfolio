"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { caseVisualLabels, getCaseVisual } from "@/lib/caseVisuals";
import "./WorkShowcase.css";

export function WorkShowcase({ projects, lang, viewCase }) {
  const rootRef = useRef(null);
  const labels = caseVisualLabels[lang === "fr" ? "fr" : "en"];
  const publishedProjects = projects.filter((project) => !project.upcoming);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    let cancelled = false;
    let media;

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")])
      .then(([{ gsap }, scrollTriggerModule]) => {
        if (cancelled || !rootRef.current) return;

        const ScrollTrigger = scrollTriggerModule.ScrollTrigger || scrollTriggerModule.default;
        gsap.registerPlugin(ScrollTrigger);
        media = gsap.matchMedia();

        media.add(
          "(min-width: 801px) and (min-height: 620px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
          () => {
            root.classList.add("work-showcase--enhanced");
            const context = gsap.context(() => {
              const scenes = gsap.utils.toArray(".work-showcase__scene");

              scenes.forEach((scene, index) => {
                const row = scene.querySelector(".work-showcase__row");
                const visual = scene.querySelector(".work-showcase__visual");
                const copyItems = scene.querySelectorAll(".work-showcase__copy > *");
                const progress = scene.querySelector(".work-showcase__progress-fill");

                gsap.timeline({
                  scrollTrigger: {
                    trigger: scene,
                    start: "top 92%",
                    end: "top 28%",
                    scrub: 0.55,
                    invalidateOnRefresh: true,
                  },
                })
                  .fromTo(
                    row,
                    { y: 72, scale: 0.94, opacity: 0.28 },
                    { y: 0, scale: 1, opacity: 1, ease: "none", duration: 1 },
                    0
                  )
                  .fromTo(
                    visual,
                    { y: 28, opacity: 0.45 },
                    { y: 0, opacity: 1, ease: "none", duration: 0.82 },
                    0.08
                  )
                  .fromTo(
                    copyItems,
                    { y: 24, opacity: 0 },
                    { y: 0, opacity: 1, ease: "none", stagger: 0.045, duration: 0.56 },
                    0.2
                  );

                gsap.fromTo(
                  progress,
                  { scaleX: 0 },
                  {
                    scaleX: 1,
                    ease: "none",
                    scrollTrigger: {
                      trigger: scene,
                      start: "top 108px",
                      end: "bottom 108px",
                      scrub: true,
                      invalidateOnRefresh: true,
                    },
                  }
                );

                if (index < scenes.length - 1) {
                  gsap.to(row, {
                    y: -18,
                    scale: 0.965,
                    opacity: 0.3,
                    ease: "none",
                    scrollTrigger: {
                      trigger: scene,
                      start: "bottom 52%",
                      end: "bottom 18%",
                      scrub: 0.5,
                      invalidateOnRefresh: true,
                    },
                  });
                }
              });
            }, root);

            const updateScrollTrigger = () => ScrollTrigger.update();
            window.__lenis?.on("scroll", updateScrollTrigger);
            ScrollTrigger.refresh();

            return () => {
              window.__lenis?.off("scroll", updateScrollTrigger);
              context.revert();
              root.classList.remove("work-showcase--enhanced");
            };
          }
        );
      })
      .catch(() => {
        root.classList.remove("work-showcase--enhanced");
      });

    return () => {
      cancelled = true;
      media?.revert();
      root.classList.remove("work-showcase--enhanced");
    };
  }, []);

  return (
    <div className="work-showcase" ref={rootRef}>
      {publishedProjects.map((project, index) => {
        const visual = getCaseVisual(project.slug, "investigation", lang);
        return (
          <article
            className="work-showcase__scene"
            key={project.slug}
            style={{ "--scene-index": index + 1 }}
          >
            <Link
              href={project.href}
              className="work-showcase__row"
              aria-label={`${project.title} — ${labels.disclosure} — ${viewCase}`}
            >
              {visual && (
                <div className="work-showcase__visual">
                  <Image
                    src={visual.src}
                    width={visual.width}
                    height={visual.height}
                    sizes="(max-width: 800px) 100vw, 720px"
                    alt={visual.alt}
                  />
                  <span className="work-showcase__disclosure">{labels.disclosure}</span>
                </div>
              )}
              <div className="work-showcase__copy">
                <span className="work-showcase__index">
                  {String(index + 1).padStart(2, "0")} / {project.year}
                </span>
                <span className="work-showcase__category">{project.category}</span>
                <h3>{project.title}</h3>
                <p>{project.problem}</p>
                <span className="work-showcase__tools">{project.role}</span>
                <span className="work-showcase__cta">
                  {viewCase}<span aria-hidden="true">↗</span>
                </span>
                <span className="work-showcase__progress" aria-hidden="true">
                  <span className="work-showcase__progress-fill" />
                </span>
              </div>
            </Link>
          </article>
        );
      })}
    </div>
  );
}
