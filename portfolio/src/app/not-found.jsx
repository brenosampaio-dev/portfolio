"use client";

import Link from "next/link";
import { Text } from "@/components/ds";
import { useI18n } from "@/lib/useI18n";
import { renderTitle } from "@/lib/renderTitle";

export default function NotFound() {
  const { t } = useI18n();
  const copy = t.notFound;

  return (
    <section className="container not-found" aria-labelledby="not-found-title">
      <span className="eyebrow eyebrow--accent">{copy.eyebrow}</span>
      <Text variant="display" id="not-found-title">
        {renderTitle(copy.heading)}
      </Text>
      <p>{copy.body}</p>
      <div className="not-found__actions">
        <Link href="/#work" className="link-arrow">{copy.work} <span aria-hidden="true">↗</span></Link>
        <Link href="/">{copy.home}</Link>
      </div>
    </section>
  );
}
