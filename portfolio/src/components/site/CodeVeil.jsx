"use client";

import { useEffect, useRef } from "react";

const ENABLE_QUERY = "(min-width: 1024px) and (hover: hover) and (pointer: fine)";
const REDUCE_QUERY = "(prefers-reduced-motion: reduce)";

export function CodeVeil() {
  const veilRef = useRef(null);

  useEffect(() => {
    const veil = veilRef.current;
    if (!veil) return undefined;

    const enabled = window.matchMedia(ENABLE_QUERY);
    const reduced = window.matchMedia(REDUCE_QUERY);
    let radius = 0;

    const deactivate = () => {
      veil.dataset.active = "false";
      veil.style.removeProperty("will-change");
    };

    const paint = (x, y) => {
      if (!enabled.matches || reduced.matches) {
        deactivate();
        return;
      }

      if (!radius) radius = veil.offsetWidth / 2;
      veil.style.transform = `translate3d(${x - radius}px, ${y - radius}px, 0)`;
      veil.style.backgroundPosition = `${radius - x}px ${radius - y}px`;
      veil.style.setProperty("will-change", "transform, opacity");
      veil.dataset.active = "true";
    };

    const onPointerMove = (event) => {
      if (!enabled.matches || reduced.matches) return;
      paint(event.clientX, event.clientY);
    };

    const onMediaChange = () => {
      if (!enabled.matches || reduced.matches) deactivate();
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("blur", deactivate);
    document.documentElement.addEventListener("pointerleave", deactivate);
    enabled.addEventListener("change", onMediaChange);
    reduced.addEventListener("change", onMediaChange);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("blur", deactivate);
      document.documentElement.removeEventListener("pointerleave", deactivate);
      enabled.removeEventListener("change", onMediaChange);
      reduced.removeEventListener("change", onMediaChange);
    };
  }, []);

  return <div ref={veilRef} className="code-veil" data-active="false" aria-hidden="true" />;
}
