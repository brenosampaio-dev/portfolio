"use client";

import { useLang } from "@/context/AppContext";
import { getT } from "@/lib/i18n";

export function useI18n() {
  const { lang, setLang } = useLang();
  return { lang, setLang, t: getT(lang) };
}
