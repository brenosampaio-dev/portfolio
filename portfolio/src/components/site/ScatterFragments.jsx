"use client";

import { useEffect, useRef } from "react";
import { useI18n } from "@/lib/useI18n";

/*
 * ScatterFragments — the problem, made visible. The same incident lives across
 * a pile of disconnected sources, slightly rotated and overlapping, so the eye
 * reads "noise" before reading any one label. Fires once on enter; under
 * reduced motion it simply shows. No loop — the mess settles and stays.
 */
export function ScatterFragments() {
  const ref = useRef(null);
  const { t } = useI18n();
  const copy = t.specimens.service.scatter;

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
    <div className="scatter" ref={ref} aria-hidden="true">
      <div className="scatter__field">
        {copy.sources.map((s, i) => (
          <span className="scatter-chip" key={s} style={{ "--i": i }}>
            <span className="scatter-chip__src">{s}</span>
            <span className="scatter-chip__line" />
          </span>
        ))}
      </div>
      <span className="scatter__caption">
        {copy.caption}
      </span>
    </div>
  );
}
