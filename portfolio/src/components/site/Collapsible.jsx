"use client";

import { useId, useState } from "react";
import { useI18n } from "@/lib/useI18n";

/*
 * Collapsible — progressive disclosure with a native button at every viewport.
 * The visible heading stays semantic and the adjacent control owns the panel.
 *
 * Content is never removed from the DOM, so it stays selectable, indexable, and
 * accessible. Scroll-reveal children are force-shown once their section opens so
 * nothing is ever stuck invisible behind a collapsed panel.
 */
export function Collapsible({ header, children, defaultOpen = false, className = "", label = "section" }) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();
  const { t } = useI18n();

  return (
    <div className={`collapsible${open ? " is-open" : ""}${className ? ` ${className}` : ""}`}>
      <div className="collapsible__head">
        <div className="collapsible__headInner">{header}</div>
        <button
          type="button"
          className="collapsible__toggle"
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={`${open ? t.a11y.collapse : t.a11y.expand} ${label}`}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="collapsible__icon" aria-hidden="true" />
        </button>
      </div>
      <div
        className="collapsible__panel"
        id={panelId}
        aria-hidden={!open}
        inert={!open ? true : undefined}
      >
        <div className="collapsible__panelInner">{children}</div>
      </div>
    </div>
  );
}
