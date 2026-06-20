"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

/*
 * Rail — a thin vertical timeline pinned to the left gutter (desktop). On first
 * load the line draws itself in top→bottom; a dot per section then fades in, and
 * the dot for the section you're reading fills + pulses with its label beside it.
 *
 * Each dot is an anchor, so hovering previews a section (its dot lights and the
 * label slides to it) and clicking smooth-scrolls there via the global hash
 * handler in SmoothScroll. Below the rail's breakpoint we fall back to a single
 * pulsing dot + label (mobile).
 */
export function ScrollProgress() {
  const sectionsRef = useRef([]);
  const [sections, setSections] = useState([]);
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(null);
  const pathname = usePathname();

  // Collect sections whenever the route changes
  useEffect(() => {
    const els = Array.from(document.querySelectorAll("main section[id]"));
    sectionsRef.current = els;
    setSections(
      els.map((el) => ({
        id: el.id,
        label: el.dataset.label || el.getAttribute("aria-label") || el.id,
      }))
    );
    setActive(0);
    setHovered(null);
  }, [pathname]);

  // Active section = last one whose top has crossed the viewport middle
  useEffect(() => {
    let ticking = false;
    let lastIdx = -1;

    const update = () => {
      ticking = false;
      const secs = sectionsRef.current;
      const threshold = window.innerHeight * 0.5;
      let idx = 0;
      for (let i = 0; i < secs.length; i += 1) {
        if (secs[i].getBoundingClientRect().top <= threshold) idx = i;
      }
      if (idx !== lastIdx) {
        lastIdx = idx;
        setActive(idx);
      }
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  const n = sections.length;
  if (n === 0) return null;
  const posOf = (i) => (n > 1 ? (i / (n - 1)) * 100 : 0);
  // Hovering a dot previews it; otherwise the rail tracks the section you're in.
  const shown = hovered != null ? hovered : active;

  return (
    <>
      <nav className="rail" aria-hidden="true">
        <span className="rail__line" />
        {sections.map((s, i) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            tabIndex={-1}
            className={`rail__dot${i === shown ? " is-active" : ""}`}
            style={{ top: `${posOf(i)}%`, animationDelay: `${1.6 + i * 0.06}s` }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          />
        ))}
        <span className="rail__label" style={{ top: `${posOf(shown)}%` }}>
          {sections[shown]?.label}
        </span>
      </nav>

      <div className="rail-mini" aria-hidden="true">
        <span className="rail-mini__dot" />
        <span className="rail-mini__label">{sections[active]?.label}</span>
      </div>
    </>
  );
}
