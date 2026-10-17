"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/context/AppContext";
import { getT } from "@/lib/i18n";
import { GITHUB_URL, navigationFor } from "@/lib/siteNavigation";
import { ThemePicker } from "./ThemePicker";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Wordmark } from "./Wordmark";
import styles from "./EditorialShell.module.css";

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
  const pathname = usePathname() || "/";
  const { lang } = useLang();
  const t = getT(lang);
  const navigation = navigationFor(lang);
  const homePath = lang === "fr" ? "/fr" : "/";
  const moreLabel = lang === "fr" ? "Plus" : "More";

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return undefined;
    let frame;
    const update = () => {
      frame = undefined;
      const box = header.querySelector(".dock").getBoundingClientRect();
      let surface = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
      let largest = 0;
      document.querySelectorAll("[data-header-tone], [data-nav-dark]").forEach(element => {
        const rect = element.getBoundingClientRect();
        const overlap = Math.max(0, Math.min(box.right, rect.right) - Math.max(box.left, rect.left)) * Math.max(0, Math.min(box.bottom, rect.bottom) - Math.max(box.top, rect.top));
        if (overlap > largest && overlap > box.width * box.height * .28) {
          largest = overlap;
          surface = element.dataset.headerTone || "dark";
        }
      });
      header.dataset.surface = surface;
      header.classList.toggle("site-header--dark", surface === "dark");
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const observer = new MutationObserver(schedule);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    update();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [pathname]);

  useEffect(() => {
    if (pathname !== homePath) {
      setActiveSection(null);
      return undefined;
    }

    const sections = ["work", "capabilities", "approach", "about", "contact"]
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
      if (event.key !== "Escape" || event.target.closest("details")) return;
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
    if (id === "work" && (pathname === href || pathname.startsWith(`${href}/`))) return "page";
    if (id === "labs" && pathname === href) return "page";
    if (id === "about" && pathname === href) return "page";
    if (pathname === homePath && activeSection === id) return "location";
    return undefined;
  };


  return (
    <header className={`site-header ${["/", "/fr", "/work", "/fr/work", "/about", "/fr/about"].includes(pathname) ? styles.editorialHeader : ""}`} ref={headerRef}>
      <div className="dock">
        <Wordmark />
        <div className="dock__divider" aria-hidden="true" />

        <nav className="nav" aria-label={t.a11y.primaryNavigation}>
          {navigation.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={item.id === "contact" ? "nav-hide-mobile" : undefined}
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
          <ThemePicker lang={lang} />
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
            <ThemePicker lang={lang} />
          </div>
        </div>
      )}
    </header>
  );
}
