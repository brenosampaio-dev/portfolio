"use client";

import { useEffect, useRef, useState } from "react";
import { Scramble } from "@/components/site/Scramble";
import { useI18n } from "@/lib/useI18n";

/*
 * Toolkit — a compact capability map for support roles. The label decodes in
 * (same Scramble as the section eyebrows); then each capability resolves from
 * a blur in a quick deal. Plays once; reduced motion / no-JS shows everything
 * in place.
 */
export function Toolkit({ stagger = 70 }) {
  const { t } = useI18n();
  const ref = useRef(null);
  const [open, setOpen] = useState(0);
  const groups = t.toolkit.groups ?? [];
  const n = groups.reduce((total, group) => total + group.items.length, 0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setOpen(n);
      return;
    }

    let timers = [];
    let started = false;
    const run = () => {
      if (started) return;
      started = true;
      for (let i = 0; i < n; i += 1) {
        timers.push(setTimeout(() => setOpen(i + 1), 300 + i * stagger));
      }
    };

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          run();
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
    };
  }, [n, stagger]);

  // Touch devices can't hover, so the accent arrives as a wave instead. It
  // re-fires on every entry; hover devices keep the quieter hover treatment.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(hover: none)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const tiles = el.querySelectorAll(".toolkit__item");
    let timers = [];
    let inView = false;

    const wave = () => {
      timers.forEach(clearTimeout);
      timers = [];
      tiles.forEach((tile, i) => {
        timers.push(
          setTimeout(() => {
            tile.classList.add("is-flash");
            timers.push(setTimeout(() => tile.classList.remove("is-flash"), 700));
          }, i * 130)
        );
      });
    };

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !inView) {
          inView = true;
          wave();
        } else if (!e.isIntersecting) {
          inView = false;
        }
      },
      { threshold: 0.6 }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
      tiles.forEach((t) => t.classList.remove("is-flash"));
    };
  }, []);

  return (
    <div className="toolkit" ref={ref}>
      <div className="toolkit__intro">
        <Scramble className="eyebrow eyebrow--accent toolkit__label" text={t.toolkit.label} />
        <p className="toolkit__summary">{t.toolkit.summary}</p>
      </div>

      <div className="toolkit__groups">
        {groups.map((group, groupIndex) => {
          const offset = groups
            .slice(0, groupIndex)
            .reduce((total, precedingGroup) => total + precedingGroup.items.length, 0);

          return (
            <div className="toolkit__group" key={group.label}>
              <div className="toolkit__group-heading">
                <span className="toolkit__group-index" aria-hidden="true">
                  {String(groupIndex + 1).padStart(2, "0")}
                </span>
                <span className="toolkit__group-title">{group.label}</span>
              </div>

              <ul className="toolkit__list">
                {group.items.map((item, itemIndex) => {
                  const sequenceIndex = offset + itemIndex;

                  return (
                    <li
                      key={item}
                      className={`toolkit__item${sequenceIndex < open ? " is-in" : ""}`}
                    >
                      <span className="toolkit__marker" aria-hidden="true">↘</span>
                      <span className="toolkit__name">{item}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
