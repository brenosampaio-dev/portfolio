"use client";

import { useEffect, useRef } from "react";
import { useI18n } from "@/lib/useI18n";

/*
 * ChannelScatter — the problem, made visible. The same volume of requests
 * arrives across every channel and four languages at once, unranked and
 * unread. Slightly rotated, overlapping chips so the eye reads "noise" before
 * it reads any one label. Fires once on enter; under reduced motion it simply
 * shows. No loop — the mess settles and stays. Reuses the shared .scatter CSS.
 */
export function ChannelScatter() {
  const ref = useRef(null);
  const { t } = useI18n();
  const copy = t.specimens.triage.channelScatter;

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
