"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useLang, useTheme } from "@/context/AppContext";
import { getT } from "@/lib/i18n";
import { GITHUB_URL, navigationFor } from "@/lib/siteNavigation";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Wordmark } from "./Wordmark";

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
  const toolsRef = useRef(null);
  const toolsTriggerRef = useRef(null);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const { theme, toggle } = useTheme();
  const pathname = usePathname() || "/";
  const { lang } = useLang();
  const t = getT(lang);
  const navigation = navigationFor(lang);
  const homePath = lang === "fr" ? "/fr" : "/";
  const moreLabel = lang === "fr" ? "Plus" : "More";

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return undefined;

    const darkElements = document.querySelectorAll("[data-nav-dark]");
    if (!darkElements.length) return undefined;

    const intersecting = new Set();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) intersecting.add(entry.target);
          else intersecting.delete(entry.target);
        });
        header.classList.toggle("site-header--dark", intersecting.size > 0);
      },
      { rootMargin: "-24px 0px -88% 0px", threshold: 0 },
    );

    darkElements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    if (pathname !== homePath) {
      setActiveSection(null);
      return undefined;
    }

    const sections = ["work", "capabilities", "experience", "approach", "about", "contact"]
      .map((id) => ({ id, element: document.getElementById(id) }))
      .filter(({ element }) => element);

    let frame;
    const updateActiveSection = () => {
      frame = undefined;
      const readingLine = window.scrollY + Math.max(120, window.innerHeight * 0.36);
      let nextSection = null;
      sections.forEach((section) => {
        if (section.element.offsetTop <= readingLine) nextSection = section.id;
      });
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        nextSection = "contact";
      }
      setActiveSection((current) => current === nextSection ? current : nextSection);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [homePath, pathname]);

  useEffect(() => {
    setToolsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!toolsOpen) return undefined;

    const focusFrame = window.requestAnimationFrame(() => {
      toolsRef.current?.querySelector("a, button")?.focus();
    });

    function closeOnOutsidePress(event) {
      if (!headerRef.current?.contains(event.target)) setToolsOpen(false);
    }

    function closeOnEscape(event) {
      if (event.key !== "Escape") return;
      setToolsOpen(false);
      window.requestAnimationFrame(() => toolsTriggerRef.current?.focus());
    }

    document.addEventListener("pointerdown", closeOnOutsidePress);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("pointerdown", closeOnOutsidePress);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [toolsOpen]);

  const currentFor = ({ id, href }) => {
    if (id === "work" && (pathname === href || pathname.startsWith("/work/"))) return "page";
    if (id === "labs" && pathname === href) return "page";
    if (id === "about" && pathname === href) return "page";
    if (pathname === homePath && activeSection === id) return "location";
    return undefined;
  };

  const [work, labs, about, contact] = navigation;

  return (
    <header className="site-header" ref={headerRef}>
      <div className="dock">
        <Wordmark />
        <div className="dock__divider" aria-hidden="true" />

        <nav className="nav" aria-label={t.a11y.primaryNavigation}>
          {[work, labs, about, contact].map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={item.id === "labs" || item.id === "contact" ? "nav-hide-mobile" : undefined}
              aria-current={currentFor(item)}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="dock__divider dock__divider--mid" aria-hidden="true" />

        <div className="dock__controls">
          <a className="header-contact" href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
            GitHub <span aria-hidden="true">↗</span>
          </a>
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
          <LanguageSwitcher />
          <button
            type="button"
            className="theme-btn"
            onClick={toggle}
            aria-label={theme === "dark" ? t.a11y.switchToLight : t.a11y.switchToDark}
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>

        <button
          ref={toolsTriggerRef}
          type="button"
          className="mobile-tools-toggle"
          aria-expanded={toolsOpen}
          aria-controls="mobile-header-tools"
          aria-label={moreLabel}
          onClick={() => setToolsOpen((open) => !open)}
        >
          <ToolsIcon />
        </button>
      </div>

      {toolsOpen && (
        <div id="mobile-header-tools" className="mobile-tools" ref={toolsRef}>
          <nav className="mobile-tools__actions" aria-label={moreLabel}>
            {navigation.map((item) => (
              <Link key={item.id} href={item.href} className="mobile-tools__link" onClick={() => setToolsOpen(false)}>
                <span>{item.label}</span><span aria-hidden="true">{item.id === "contact" ? "↗" : "→"}</span>
              </Link>
            ))}
            <a className="mobile-tools__link" href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
              <span>GitHub</span><span aria-hidden="true">↗</span>
            </a>
            <a
              href={t.resume.href}
              className="mobile-tools__link mobile-tools__link--primary"
              download={t.resume.fileName}
            >
              <span>{t.nav.downloadCv}</span><span aria-hidden="true">↓</span>
            </a>
          </nav>
          <div className="mobile-tools__preferences">
            <LanguageSwitcher />
            <button
              type="button"
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
