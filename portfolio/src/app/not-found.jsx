"use client";

import Link from "next/link";
import { Text } from "@/components/ds";
import { useLang } from "@/context/AppContext";
import { getT } from "@/lib/i18n";
import { renderTitle } from "@/lib/renderTitle";

export default function NotFound() {
  const { lang } = useLang();
  const t = getT(lang);
  const copy = t.notFound;
  const prefix = lang === "fr" ? "/fr" : "";

  return (
    <section className="container not-found" aria-labelledby="not-found-title">
      <span className="eyebrow eyebrow--accent">{copy.eyebrow}</span>
      <Text variant="display" id="not-found-title">
        {renderTitle(copy.heading)}
      </Text>
      <p>{copy.body}</p>
      <div className="not-found__actions">
        <Link href={`${prefix}/work`} className="link-arrow">{copy.work} <span aria-hidden="true">↗</span></Link>
        <Link href={prefix || "/"}>{copy.home}</Link>
      </div>
    </section>
  );
}
