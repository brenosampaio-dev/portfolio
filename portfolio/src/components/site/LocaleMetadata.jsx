"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useI18n } from "@/lib/useI18n";

function setMeta(selector, value) {
  const node = document.querySelector(selector);
  if (node && value) node.setAttribute("content", value);
}

export function LocaleMetadata() {
  const pathname = usePathname();
  const { t } = useI18n();

  useEffect(() => {
    const pageKey =
      pathname === "/about"
        ? "about"
        : pathname === "/work/service-operations"
          ? "serviceOperations"
          : pathname === "/work/triageai"
            ? "triage"
            : pathname === "/"
              ? "home"
              : "notFound";
    const page = t.metadata.pages[pageKey];
    if (!page) return;

    const apply = () => {
      document.title = page.title;
      setMeta('meta[name="description"]', page.description);
      setMeta('meta[property="og:title"]', page.title);
      setMeta('meta[property="og:description"]', page.description);
      setMeta('meta[property="og:locale"]', t.metadata.ogLocale);
      setMeta('meta[name="twitter:title"]', page.title);
      setMeta('meta[name="twitter:description"]', page.description);
      const schemaNode = document.querySelector("#person-schema");
      if (schemaNode) {
        try {
          const schema = JSON.parse(schemaNode.textContent);
          schema.jobTitle = t.metadata.person.jobTitle;
          schema.description = t.metadata.pages.home.description;
          schema.address.addressLocality = t.metadata.person.addressLocality;
          schema.knowsLanguage = t.metadata.person.languages;
          schemaNode.textContent = JSON.stringify(schema);
        } catch {
          // Keep the server-rendered Canadian English schema if parsing fails.
        }
      }
    };

    apply();
    const frame = requestAnimationFrame(() => requestAnimationFrame(apply));
    const timeout = window.setTimeout(apply, 120);
    const observer = new MutationObserver(() => {
      if (document.title !== page.title) document.title = page.title;
    });
    observer.observe(document.head, { childList: true, subtree: true, characterData: true });
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
      observer.disconnect();
    };
  }, [pathname, t]);

  return null;
}
