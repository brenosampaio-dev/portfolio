"use client";

import { useEffect, useRef } from "react";
import { ICON_PATHS } from "@/lib/icons";

/*
 * Icon — a monoline mark that draws itself on interaction.
 *
 * The resting state is the fully-drawn icon. The flourish (a self-draw via
 * stroke-dashoffset) starts blank and ends back at the natural state — so it
 * always settles, never loops.
 *
 * Trigger differs by device, deliberately:
 *  · Desktop (hover-capable) — redraws each time the pointer enters its hover
 *    zone (the icon's parent row/head), so it animates only on intent.
 *  · Touch (no hover) — draws once when it scrolls into view, then rests. Only
 *    icons actually on screen play, with a tiny random offset so a group that
 *    enters together cascades instead of snapping in unison.
 *
 * Reduced motion / no-JS: the icon is simply shown, static and drawn.
 */
export function Icon({ name, size = 20, strokeWidth = 1.5, className = "", ...props }) {
  const ref = useRef(null);
  const paths = ICON_PATHS[name];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const play = () => {
      el.classList.remove("icon--draw");
      // Force a style/layout flush so removing then re-adding the class actually
      // restarts the animation. SVG elements have no offsetWidth, so the usual
      // `void el.offsetWidth` reads undefined and never forces reflow — meaning
      // every hover after the first would be a no-op. getBoundingClientRect()
      // does flush layout on SVG, so each hover replays from the start.
      el.getBoundingClientRect();
      el.classList.add("icon--draw");
    };

    const canHover = window.matchMedia("(hover: hover)").matches;

    if (canHover) {
      const zone = el.parentElement || el;
      zone.addEventListener("mouseenter", play);
      return () => zone.removeEventListener("mouseenter", play);
    }

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          const t = setTimeout(play, Math.random() * 160);
          io.disconnect();
          el._iconTimer = t;
        }
      },
      { threshold: 0.65 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (el._iconTimer) clearTimeout(el._iconTimer);
    };
  }, [name]);

  if (!paths) return null;

  return (
    <svg
      ref={ref}
      className={`icon${className ? ` ${className}` : ""}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {paths.map((d, i) => (
        <path key={i} d={d} pathLength="1" />
      ))}
    </svg>
  );
}
