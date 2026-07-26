"use client";

import { useEffect, useRef } from "react";
import { useI18n } from "@/lib/useI18n";

/*
 * TriageFlow — the resolution, as information architecture. Before: read
 * everything, triage in your head, reply inconsistently. After: AI structures
 * and ranks, a human verifies and approves, replies stay consistent across
 * languages. Below, the core loop the product is built around. Honest diagram,
 * not a faked screen. Reuses the shared .flow CSS; fires once and settles.
 */
export function TriageFlow() {
  const ref = useRef(null);
  const { t } = useI18n();
  const copy = t.specimens.triage.flow;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-in");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("is-in");
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.18 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="flow" ref={ref}>
      <div className="flow__ba">
        <div className="flow-state flow-state--before">
          <span className="flow-state__label">{copy.beforeLabel}</span>
          <div className="flow-state__frags" aria-hidden="true">
            {copy.before.map((b) => (
              <span className="flow-frag" key={b}>{b}</span>
            ))}
          </div>
        </div>
        <span className="flow__arrow" aria-hidden="true">→</span>
        <div className="flow-state flow-state--after">
          <span className="flow-state__label">{copy.afterLabel}</span>
          <span className="flow-state__one">{copy.after}</span>
        </div>
      </div>

      <div className="flow__steps">
        {copy.steps.map((f, i) => (
          <div className="flow-step" key={f} style={{ "--i": i }}>
            <span className="flow-step__n">{String(i + 1).padStart(2, "0")}</span>
            <span className="flow-step__t">{f}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
