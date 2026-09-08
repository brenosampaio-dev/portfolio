import Link from "next/link";
import { Text, Tag } from "@/components/ds";
import { Reveal } from "@/components/site/Reveal";

/*
 * CaseHero — the reusable opening block for a case study: back link, tag-line,
 * title, lede. Visual-first cases introduce the scenario before the facts;
 * older cases keep their original facts-first order.
 */
export function CaseHero({ backHref = "/#work", backLabel, tags = [], title, lead, visual, visualFirst = false, children }) {
  const visualBlock = visual && (
    <Reveal delay={240} className="case-hero__visual">
      {visual}
    </Reveal>
  );
  return (
    <header className="container case-hero">
      <Reveal>
        <Link href={backHref} className="case-back">
          <span aria-hidden="true">←</span> {backLabel}
        </Link>
      </Reveal>

      <div className="stack" style={{ gap: "var(--space-6)" }}>
        <Reveal>
          <div className="case-hero__meta">
            {tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        </Reveal>
        <Reveal mask delay={60}>
          <Text variant="display" className="case-hero__title">
            {title}
          </Text>
        </Reveal>
        <Reveal delay={160}>
          <Text variant="body-lg" style={{ maxWidth: "60ch", color: "var(--graphite)" }}>
            {lead}
          </Text>
        </Reveal>
      </div>

      {visualFirst && visualBlock}
      {children}
      {!visualFirst && visualBlock}
    </header>
  );
}
