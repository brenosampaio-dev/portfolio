"use client";

import { useEffect, useRef } from "react";

/*
 * Reveal — a discreet entrance. GSAP ScrollTrigger only *triggers* it; the
 * motion itself is CSS, so values stay in the design-system motion tokens.
 *
 * Variants:
 *   default        opacity + small translate (fade up)
 *   mask           text "rises" from behind a clip mask (editorial / Awwwards)
 *
 * Mask reveals deliberately keep one copy of the original heading in the DOM.
 * Splitting a heading into cloned lines can duplicate heading IDs while the
 * animation runs, which breaks document semantics and accessible-name lookup.
 *
 * No parallax. Fires once. Reduced motion and no-JS keep content visible.
 */
export function Reveal({ as: Tag = "div", mask = false, delay = 0, className = "", children, ...props }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      el.classList.add("is-in");
      return;
    }

    let st;
    let cancelled = false;

    const runCssReveal = (ScrollTrigger) => {
      if (delay) {
        el.style.transitionDelay = `${delay}ms`;
        const inner = el.firstElementChild;
        if (mask && inner) inner.style.transitionDelay = `${delay}ms`;
      }
      st = ScrollTrigger.create({
        trigger: el,
        start: "top 90%",
        once: true,
        onEnter: () => el.classList.add("is-in"),
      });
      if (window.__lenis) window.__lenis.on("scroll", ScrollTrigger.update);
      ScrollTrigger.refresh();
    };

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")])
      .then(([{ gsap }, stMod]) => {
        if (cancelled || !ref.current) return;
        const ScrollTrigger = stMod.ScrollTrigger || stMod.default;
        gsap.registerPlugin(ScrollTrigger);
        runCssReveal(ScrollTrigger);
      })
      .catch(() => {
        // Last-resort: never leave the text hidden — reveal it immediately.
        if (!cancelled && ref.current) el.classList.add("is-in");
      });

    return () => {
      cancelled = true;
      if (st) st.kill();
    };
  }, [delay, mask]);

  const cls = ["reveal", mask ? "reveal--mask" : "", className].filter(Boolean).join(" ");

  return (
    <Tag ref={ref} className={cls} {...props}>
      {mask ? <div className="reveal__inner">{children}</div> : children}
    </Tag>
  );
}
