"use client";

import { useLayoutEffect, useRef } from "react";
import { CountUp } from "@/components/site/CountUp";
import { useI18n } from "@/lib/useI18n";

/*
 * DashboardPreview — the "open now" operational view, rendered as real UI in
 * code (not a screenshot). It's the concept's core screen: at handover, what's
 * open, what's urgent, by area, with the next action. Built from the same
 * tokens as the rest of the site so it reads as a true design-system specimen.
 */
export function DashboardPreview() {
  const ref = useRef(null);
  const { t } = useI18n();
  const copy = t.specimens.service.dashboard;

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-in");
      return;
    }

    el.classList.add("dash--motion", "dash--preparing");
    void el.offsetWidth;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        el.classList.add("is-in");
        io.disconnect();
      },
      { threshold: 0.22 }
    );

    const frame = requestAnimationFrame(() => {
      el.classList.remove("dash--preparing");
      io.observe(el);
    });

    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
    };
  }, []);

  return (
    <div className="dash" ref={ref}>
      <div className="dash__head">
        <div>
          <span className="dash__eyebrow">{copy.eyebrow}</span>
          <span className="dash__title">{copy.title}</span>
        </div>
        <span className="dash__clock">07:02</span>
      </div>

      <div className="dash__stats">
        {copy.stats.map((s) => (
          <div className={`dash__stat${s.urgent ? " dash__stat--urgent" : ""}`} key={s.label}>
            <CountUp value={s.value} duration={1050} className="dash__stat-value" />
            <span className="dash__stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      <div className="dash__body">
        <ul className="dash__list">
          {copy.incidents.map((i, index) => (
            <li
              className={`dash-row${i.urgent ? " dash-row--urgent" : ""}`}
              key={i.id}
              style={{ "--row-index": index }}
            >
              <span className="dash-row__dot" aria-hidden="true" />
              <div className="dash-row__main">
                <span className="dash-row__title">{i.title}</span>
                <span className="dash-row__meta">
                  <span className="dash-row__id">{i.id}</span>
                  <span className="dash-row__sep" aria-hidden="true">·</span>
                  {i.area}
                  <span className="dash-row__sep" aria-hidden="true">·</span>
                  {i.owner}
                </span>
              </div>
              <span className="dash-row__flag">{i.urgent ? copy.urgent : copy.open}</span>
            </li>
          ))}
        </ul>

        <aside className="dash__aside" aria-label={copy.asideLabel}>
          <div className="dash__aside-head">
            <span className="dash__aside-label">{copy.shiftPulse}</span>
            <span className="dash__aside-live"><i aria-hidden="true" /> {copy.window}</span>
          </div>

          <div className="dash-chart" aria-hidden="true">
            <svg viewBox="0 0 320 112" preserveAspectRatio="none">
              <defs>
                <linearGradient id="queuePulseFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--clay)" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="var(--clay)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <g className="dash-chart__grid">
                <line x1="0" y1="24" x2="320" y2="24" />
                <line x1="0" y1="56" x2="320" y2="56" />
                <line x1="0" y1="88" x2="320" y2="88" />
              </g>
              <path
                className="dash-chart__area"
                d="M0,84 C28,80 38,69 64,72 C91,76 101,50 128,55 C154,60 169,38 194,43 C220,48 237,25 258,31 C281,38 294,18 320,22 L320,112 L0,112 Z"
              />
              <path
                className="dash-chart__line"
                pathLength="1"
                d="M0,84 C28,80 38,69 64,72 C91,76 101,50 128,55 C154,60 169,38 194,43 C220,48 237,25 258,31 C281,38 294,18 320,22"
              />
              <g className="dash-chart__points">
                <circle cx="128" cy="55" r="3.5" style={{ "--point-index": 0 }} />
                <circle cx="258" cy="31" r="3.5" style={{ "--point-index": 1 }} />
                <circle cx="320" cy="22" r="4" style={{ "--point-index": 2 }} />
              </g>
            </svg>
            <div className="dash-chart__axis">
              <span>19:00</span>
              <span>01:00</span>
              <span>07:00</span>
            </div>
          </div>

          <span className="dash__areas-label">{copy.pendingByArea}</span>
          <ul className="dash__areas">
            {copy.areas.map((a, index) => (
              <li className="dash-area" key={a.name} style={{ "--area-index": index }}>
                <span className="dash-area__name">{a.name}</span>
                <span className="dash-area__bar" aria-hidden="true">
                  <span
                    className="dash-area__fill"
                    style={{
                      width: `${Math.round(a.load * 100)}%`,
                      "--area-load": a.load,
                    }}
                  />
                </span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
