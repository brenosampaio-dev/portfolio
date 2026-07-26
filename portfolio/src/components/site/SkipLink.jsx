"use client";

import { useI18n } from "@/lib/useI18n";

export function SkipLink() {
  const { t } = useI18n();
  return <a href="#main" className="skip-link">{t.a11y.skipToContent}</a>;
}
