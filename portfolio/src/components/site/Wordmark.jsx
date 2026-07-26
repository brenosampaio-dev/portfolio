"use client";
import Link from "next/link";
import { useRef } from "react";
import { useI18n } from "@/lib/useI18n";

export function Wordmark() {
  const ref = useRef(null);
  const { t } = useI18n();

  function replay() {
    const el = ref.current;
    if (!el) return;
    const spans = el.querySelectorAll(".wm-b, .wm-slash, .wm-s");
    spans.forEach(s => { s.style.animation = "none"; });
    void el.offsetWidth; // force reflow so the browser resets the animation
    spans.forEach(s => { s.style.animation = ""; });
  }

  return (
    <Link
      href="/"
      className="wordmark"
      ref={ref}
      onMouseEnter={replay}
    >
      <span className="wm-b">B</span>
      <span className="wm-slash">/</span>
      <span className="wm-s">S</span>
      <span className="sr-only"> — {t.a11y.home}</span>
    </Link>
  );
}
