"use client";
import { createContext, useContext, useState, useEffect, useLayoutEffect, useCallback } from "react";

const ThemeCtx = createContext({ theme: "light", toggle: () => {} });
const LangCtx  = createContext({ lang: "en", setLang: () => {} });
const SUPPORTED_LANGS = ["en", "fr"];

export function Providers({ children }) {
  const [theme, setTheme] = useState("light");
  const [lang,  setLang]  = useState("en");

  useLayoutEffect(() => {
    const saved      = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(saved || (prefersDark ? "dark" : "light"));

    const savedLang = localStorage.getItem("lang");
    if (savedLang && SUPPORTED_LANGS.includes(savedLang)) {
      setLang(savedLang);
    } else if (navigator.language.toLowerCase().startsWith("fr")) {
      setLang("fr");
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = theme === "dark" ? "#0D1017" : "#FAFAFA";
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = lang === "fr" ? "fr-CA" : "en-CA";
    document.documentElement.dataset.lang = lang;
    localStorage.setItem("lang", lang);
  }, [lang]);

  const toggle = () => setTheme(t => (t === "light" ? "dark" : "light"));
  const changeLang = useCallback((nextLang) => {
    if (!SUPPORTED_LANGS.includes(nextLang)) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduceMotion && document.startViewTransition) {
      document.startViewTransition(() => setLang(nextLang));
      return;
    }
    setLang(nextLang);
  }, []);

  return (
    <ThemeCtx.Provider value={{ theme, toggle }}>
      <LangCtx.Provider value={{ lang, setLang: changeLang }}>
        {children}
      </LangCtx.Provider>
    </ThemeCtx.Provider>
  );
}

export const useTheme = () => useContext(ThemeCtx);
export const useLang  = () => useContext(LangCtx);
