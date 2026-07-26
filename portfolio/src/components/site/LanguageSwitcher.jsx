"use client";

import { useI18n } from "@/lib/useI18n";

const OPTIONS = [
  { value: "en", short: "EN" },
  { value: "fr", short: "FR" },
];

export function LanguageSwitcher() {
  const { lang, setLang, t } = useI18n();

  return (
    <div
      className={`language-switcher language-switcher--${lang}`}
      role="group"
      aria-label={t.languageSwitcher.group}
    >
      <span className="language-switcher__thumb" aria-hidden="true" />
      {OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          data-language={option.value}
          className="language-switcher__option"
          aria-pressed={lang === option.value}
          aria-label={t.languageSwitcher.options[option.value]}
          title={t.languageSwitcher.options[option.value]}
          onClick={() => setLang(option.value)}
        >
          {option.short}
        </button>
      ))}
      <span className="sr-only" aria-live="polite">
        {t.languageSwitcher.active}
      </span>
    </div>
  );
}
