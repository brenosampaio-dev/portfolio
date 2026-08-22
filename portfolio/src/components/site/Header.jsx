"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Wordmark } from "./Wordmark";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useTheme, useLang } from "@/context/AppContext";
import { getT } from "@/lib/i18n";

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
      <circle cx="8" cy="8" r="2.8" />
      <line x1="8" y1="1" x2="8" y2="2.6" />
      <line x1="8" y1="13.4" x2="8" y2="15" />
      <line x1="1" y1="8" x2="2.6" y2="8" />
      <line x1="13.4" y1="8" x2="15" y2="8" />
      <line x1="3.2" y1="3.2" x2="4.3" y2="4.3" />
      <line x1="11.7" y1="11.7" x2="12.8" y2="12.8" />
      <line x1="12.8" y1="3.2" x2="11.7" y2="4.3" />
      <line x1="4.3" y1="11.7" x2="3.2" y2="12.8" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12.5 10A6 6 0 1 1 6 3.5a4.5 4.5 0 0 0 6.5 6.5z" />
    </svg>
  );
}

function ToolsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <circle cx="4" cy="9" r="1.25" fill="currentColor" />
      <circle cx="9" cy="9" r="1.25" fill="currentColor" />
      <circle cx="14" cy="9" r="1.25" fill="currentColor" />
    </svg>
  );
}

export function Header() {
  const headerRef = useRef(null);
  const [toolsOpen, setToolsOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const pathname = usePathname();
  const { lang } = useLang();
  const t = getT(lang);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const darkEls = document.querySelectorAll("[data-nav-dark]");
    if (!darkEls.length) return;

    const intersecting = new Set();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) intersecting.add(e.target);
          else intersecting.delete(e.target);
        });
        header.classList.toggle("site-header--dark", intersecting.size > 0);
      },
      { rootMargin: "-24px 0px -88% 0px", threshold: 0 }
    );

    darkEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setToolsOpen(false);
  }, [pathname]);

  useEffect(() => {
    function closeOnHeaderLink(event) {
      const link = event.target.closest?.("a");
      if (link && headerRef.current?.contains(link)) setToolsOpen(false);
    }

    document.addEventListener("click", closeOnHeaderLink, true);
    return () => document.removeEventListener("click", closeOnHeaderLink, true);
  }, []);

  useEffect(() => {
    if (!toolsOpen) return undefined;

    function closeOnOutsidePress(event) {
      if (!headerRef.current?.contains(event.target)) setToolsOpen(false);
    }

    function closeOnEscape(event) {
      if (event.key === "Escape") setToolsOpen(false);
    }

    document.addEventListener("pointerdown", closeOnOutsidePress);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsidePress);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [toolsOpen]);

  return (
    <header className="site-header" ref={headerRef}>
      <div className="dock">
        <Wordmark />

        <div className="dock__divider" aria-hidden="true" />

        <nav className="nav" aria-label={t.a11y.primaryNavigation}>
          <Link href="/#work" aria-current={pathname.startsWith("/work") ? "page" : undefined}>{t.nav.work}</Link>
          <Link href="/#about" aria-current={pathname === "/about" ? "page" : undefined}>{t.nav.about}</Link>
          <Link href="/#approach" className="nav-hide-sm">{t.nav.approach}</Link>
        </nav>

        <div className="dock__divider dock__divider--mid" aria-hidden="true" />

        <div className="dock__actions">
          <span className="availability">
            <span className="dot" aria-hidden="true" />
            <span className="availability__text">{t.availability}</span>
          </span>
          <Link href="/#contact" className="header-contact">
            {t.nav.contact} <span aria-hidden="true">↗</span>
          </Link>
          <a
            href={t.resume.href}
            className="header-cv"
            download={t.resume.fileName}
            aria-label={t.resume.downloadAria}
          >
            <span className="header-cv__label header-cv__label--long">{t.nav.downloadCv}</span>
            <span className="header-cv__label header-cv__label--short" aria-hidden="true">CV</span>
            <span className="header-cv__arrow" aria-hidden="true">↓</span>
          </a>
        </div>

        <div className="dock__divider dock__divider--controls" aria-hidden="true" />

        <div className="dock__controls">
          <LanguageSwitcher />
          <button
            className="theme-btn"
            onClick={toggle}
            aria-label={theme === "dark" ? t.a11y.switchToLight : t.a11y.switchToDark}
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>

        </div>

        <button
          type="button"
          className="mobile-tools-toggle"
          aria-expanded={toolsOpen}
          aria-controls="mobile-header-tools"
          aria-label={toolsOpen ? t.a11y.closeHeaderTools : t.a11y.openHeaderTools}
          onClick={() => setToolsOpen((open) => !open)}
        >
          <ToolsIcon />
        </button>
      </div>

      {toolsOpen && (
        <div
          id="mobile-header-tools"
          className="mobile-tools"
          onClick={(event) => {
            if (event.target.closest("a")) setToolsOpen(false);
          }}
        >
          <div className="mobile-tools__actions">
            <a
              href={t.resume.href}
              className="mobile-tools__link mobile-tools__link--primary"
              download={t.resume.fileName}
            >
              <span>{t.nav.downloadCv}</span>
              <span aria-hidden="true">↓</span>
            </a>
            <Link href="/#contact" className="mobile-tools__link">
              <span>{t.nav.contact}</span>
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className="mobile-tools__preferences">
            <LanguageSwitcher />
            <button
              className="theme-btn mobile-tools__theme"
              onClick={toggle}
              aria-label={theme === "dark" ? t.a11y.switchToLight : t.a11y.switchToDark}
            >
              {theme === "dark" ? <SunIcon /> : <MoonIcon />}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
