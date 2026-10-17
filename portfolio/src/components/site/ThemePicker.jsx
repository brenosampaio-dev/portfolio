"use client";
import { useEffect, useId, useRef } from "react";
import { useTheme } from "@/context/AppContext";
import styles from "./ThemePicker.module.css";

function ThemeIcon({ mode }) {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    {mode === "light" ? <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" /></> : mode === "dark" ? <path d="M20.5 13.2A8.7 8.7 0 0 1 10.8 3.5a8.7 8.7 0 1 0 9.7 9.7Z" /> : <><rect x="3" y="4" width="18" height="13" rx="2" /><path d="M8 21h8m-4-4v4" /></>}
  </svg>;
}
export function ThemePicker({ lang = "en" }) {
  const { theme, themePreference, chooseTheme } = useTheme();
  const ref = useRef(null);
  const groupName = useId();
  const fr = lang === "fr";
  const names = fr ? { light: "Clair", dark: "Sombre", system: "Système" } : { light: "Light", dark: "Dark", system: "System" };
  const label = `${fr ? "Apparence" : "Appearance"}: ${names[themePreference]}`;
  useEffect(() => {
    const close = event => { if (ref.current && !ref.current.contains(event.target)) ref.current.open = false; };
    document.addEventListener("pointerdown", close);
    document.addEventListener("focusin", close);
    return () => { document.removeEventListener("pointerdown", close); document.removeEventListener("focusin", close); };
  }, []);
  return <details ref={ref} className={styles.picker} onKeyDown={event => {
    if (event.key === "Escape") { event.stopPropagation(); ref.current.open = false; ref.current.querySelector("summary").focus(); }
  }}>
    <summary className={styles.trigger} aria-label={label} title={label}><ThemeIcon mode={theme} /></summary>
    <fieldset className={styles.panel}><legend className={styles.srOnly}>{fr ? "Apparence" : "Appearance"}</legend>
      {Object.keys(names).map(mode => <label className={styles.option} key={mode}>
        <input type="radio" name={`theme-${groupName}`} value={mode} checked={themePreference === mode} onChange={() => chooseTheme(mode)} />
        <ThemeIcon mode={mode} /><span>{names[mode]}</span><span className={styles.check} aria-hidden="true">✓</span>
      </label>)}
    </fieldset>
  </details>;
}
