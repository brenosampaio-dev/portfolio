"use client";

import { useEffect } from "react";

/*
 * ProcessReveal — deals the process columns in left-to-right. When the grid
 * enters view each column lifts out of a blur in quick succession. The content
 * remains visible by default, so a missed observer event or hash navigation
 * can never leave the whole section permanently transparent.
 */
export function ProcessReveal({ targetId = "process", stagger = 110, startDelay = 40 }) {
  useEffect(() => {
    const section = document.getElementById(targetId);
    if (!section) return;
    const cols = Array.from(section.querySelectorAll(".process-col"));
    if (!cols.length) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      cols.forEach((c) => c.classList.add("is-in"));
      return;
    }

    let started = false;
    const run = () => {
      if (started) return;
      started = true;
      cols.forEach((c, i) => {
        c.classList.add("is-in");
        c.animate(
          [
            { opacity: 0, transform: "translateY(16px)", filter: "blur(8px)" },
            { opacity: 1, transform: "translateY(0)", filter: "blur(0)" },
          ],
          {
            duration: 420,
            delay: startDelay + i * stagger,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            fill: "both",
          }
        );
      });
    };

    const grid = section.querySelector(".process-grid") || section;
    const initialRect = grid.getBoundingClientRect();
    if (initialRect.top < window.innerHeight && initialRect.bottom > 0) {
      run();
      return;
    }

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          run();
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(grid);

    return () => io.disconnect();
  }, [targetId, stagger, startDelay]);

  return null;
}
