"use client";

import { Fragment, useEffect, useRef } from "react";
import { SEQ_BEAT, SEQ_START } from "@/lib/motion";

/*
 * SystemFlow — the control principle, drawn as a pipeline: requests come in,
 * the AI structures and ranks them, but nothing reaches the customer without
 * passing the human approval gate. The gate is the marked node, not an
 * afterthought — it's the whole point.
 *
 * It plays as a sequence on enter: each card focuses in on the site's shared
 * cadence (SEQ_BEAT between steps, same as Approach/Process), and the connector
 * draws toward the next card at the half-beat, so the eye is led from one step
 * to the next. Fires once, then settles. Respects reduced motion.
 */
const nodes = [
  { label: "Channels", sub: "WhatsApp · Email · Web", kind: "in" },
  { label: "AI triage", sub: "Language · intent · urgency", kind: "ai" },
  { label: "Human approval", sub: "Nothing sends without this", kind: "gate" },
  { label: "Response", sub: "Consistent across languages", kind: "out" },
];

export function SystemFlow() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-in");
      return;
    }
    // If it's already in view on mount, light it up directly — belt-and-braces
    // so the sequence always plays even if the observer is slow to fire.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9 && rect.bottom > 0) {
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
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="sysflow" ref={ref}>
      {nodes.map((n, i) => (
        <Fragment key={n.label}>
          <div
            className={`sysflow-node sysflow-node--${n.kind}`}
            style={{ "--d": `${SEQ_START + i * SEQ_BEAT}ms` }}
          >
            <span className="sysflow-node__label">{n.label}</span>
            <span className="sysflow-node__sub">{n.sub}</span>
          </div>
          {i < nodes.length - 1 && (
            <span
              className="sysflow__conn"
              aria-hidden="true"
              style={{ "--d": `${SEQ_START + i * SEQ_BEAT + Math.round(SEQ_BEAT / 2)}ms` }}
            />
          )}
        </Fragment>
      ))}
    </div>
  );
}
