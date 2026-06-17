"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type CSSProperties } from "react";
import { CV_HREF } from "./cv";

/**
 * Floating liquid-glass dock — replaces the top bar.
 * Brand-adapted: text labels (no icon library), the glass refracts the Paper
 * surface behind it via the #glass-distortion SVG filter. The active page gets
 * a light pill highlight (see .dock-link[data-nav-active] in globals.css).
 */
const links = [
  { href: "/work/service-operations-dashboard", label: "Work", match: "/work" },
  { href: "/about", label: "About", match: "/about" },
  { href: "/contact", label: "Contact", match: "/contact" },
];

const linkBase: CSSProperties = {
  background: "transparent",
  border: "none",
  cursor: "pointer",
  fontFamily: "var(--font-sans)",
  fontSize: "14px",
  fontWeight: 500,
  color: "var(--warm-grey)",
  padding: "9px 16px",
  borderRadius: "999px",
  whiteSpace: "nowrap",
  textDecoration: "none",
  transition:
    "color var(--duration-base) var(--ease-smooth), background-color var(--duration-base) var(--ease-smooth)",
};

function DockLink({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  const [hover, setHover] = useState(false);
  return (
    <Link
      href={href}
      className="dock-link"
      data-nav-active={active}
      style={{
        ...linkBase,
        ...(hover && !active ? { color: "var(--ink)", background: "rgba(255,255,255,0.45)" } : null),
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {label}
    </Link>
  );
}

export function Dock() {
  const pathname = usePathname() ?? "/";
  const isHome = pathname === "/";
  const [homeHover, setHomeHover] = useState(false);
  const [cvHover, setCvHover] = useState(false);

  return (
    <nav
      aria-label="Primary"
      style={{
        position: "fixed",
        left: "50%",
        bottom: "clamp(16px,4vw,28px)",
        transform: "translateX(-50%)",
        zIndex: 60,
        maxWidth: "calc(100vw - 24px)",
      }}
    >
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          gap: "4px",
          padding: "7px",
          borderRadius: "999px",
          overflow: "hidden",
          boxShadow: "0 8px 30px rgba(17,17,17,0.16), 0 2px 6px rgba(17,17,17,0.08)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            borderRadius: "inherit",
            backdropFilter: "blur(6px) saturate(160%)",
            WebkitBackdropFilter: "blur(6px) saturate(160%)",
            filter: "url(#glass-distortion)",
            isolation: "isolate",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            borderRadius: "inherit",
            background: "rgba(247,245,240,0.5)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            borderRadius: "inherit",
            boxShadow:
              "inset 1.5px 1.5px 1px 0 rgba(255,255,255,0.6), inset -1px -1px 1px 1px rgba(255,255,255,0.4)",
            border: "1px solid rgba(255,255,255,0.35)",
          }}
        />
        <div style={{ position: "relative", zIndex: 3, display: "flex", alignItems: "center", gap: "2px" }}>
          <Link
            href="/"
            className="dock-link"
            data-nav-active={isHome}
            aria-label="Home — Breno Sampaio"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "40px",
              height: "40px",
              flex: "0 0 auto",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              fontFamily: "var(--font-mono)",
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "0.02em",
              color: "var(--ink)",
              borderRadius: "999px",
              textDecoration: "none",
              transition:
                "color var(--duration-base) var(--ease-smooth), background-color var(--duration-base) var(--ease-smooth)",
              ...(homeHover && !isHome ? { background: "rgba(255,255,255,0.45)" } : null),
            }}
            onMouseEnter={() => setHomeHover(true)}
            onMouseLeave={() => setHomeHover(false)}
          >
            BS
          </Link>
          <span
            aria-hidden="true"
            style={{
              width: "1px",
              height: "22px",
              flex: "0 0 auto",
              background: "rgba(17,17,17,0.1)",
              margin: "0 3px",
            }}
          />
          {links.map((l) => (
            <DockLink key={l.href} href={l.href} label={l.label} active={pathname.startsWith(l.match)} />
          ))}
          <a
            href={CV_HREF}
            download
            className="dock-cv"
            style={{
              marginLeft: "4px",
              background: "transparent",
              border: "1px solid rgba(17,17,17,0.14)",
              cursor: "pointer",
              fontFamily: "var(--font-sans)",
              fontSize: "14px",
              fontWeight: 500,
              color: "var(--ink)",
              padding: "8px 15px",
              borderRadius: "999px",
              whiteSpace: "nowrap",
              textDecoration: "none",
              transition: "background-color var(--duration-base) var(--ease-smooth)",
              ...(cvHover ? { background: "rgba(255,255,255,0.55)" } : null),
            }}
            onMouseEnter={() => setCvHover(true)}
            onMouseLeave={() => setCvHover(false)}
          >
            Download CV
          </a>
        </div>
      </div>
    </nav>
  );
}
