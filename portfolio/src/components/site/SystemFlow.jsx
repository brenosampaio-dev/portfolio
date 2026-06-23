"use client";

import { useEffect, useRef } from "react";

/*
 * SystemFlow — the control principle, drawn as a pipeline: requests come in,
 * the AI structures and ranks them, but nothing reaches the customer without
 * passing the human approval gate. The gate is the marked node, not an
 * afterthought — it's the whole point. Fires once on enter, then settles.
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
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("is-in");
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="sysflow" ref={ref}>
      {nodes.map((n, i) => (
        <div className="sysflow__step" key={n.label} style={{ "--i": i }}>
          <div className={`sysflow-node sysflow-node--${n.kind}`}>
            <span className="sysflow-node__label">{n.label}</span>
            <span className="sysflow-node__sub">{n.sub}</span>
          </div>
          {i < nodes.length - 1 && (
            <span className="sysflow__arrow" aria-hidden="true">→</span>
          )}
        </div>
      ))}
    </div>
  );
}
