import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { CV_HREF } from "@/components/cv";

export const metadata: Metadata = {
  title: "About",
  description:
    "From service operations and multilingual customer-facing work into product design — with a long-term direction toward design engineering.",
};

const paragraphs = [
  "I came to product design from real service operations and multilingual customer-facing work. [A short, honest line on that transition — what the work was, and why design.]",
  "I saw firsthand the friction between people, systems, requests, incidents and handovers — and now I convert that into product. [Refine with a concrete sense of what you build and for whom.]",
  "My technical interest points toward Design Engineering over the long term — framed as a direction of travel, not a current title. [Add a sentence on how that shows up in the work today.]",
];

const languages = [
  { name: "Portuguese", level: "Native" },
  { name: "Spanish", level: "Fluent" },
  { name: "French", level: "Strong" },
  { name: "English", level: "Working" },
  { name: "Italian", level: "Basic" },
];

export default function AboutPage() {
  return (
    <section className="reveal" style={{ width: "100%", maxWidth: "760px", margin: "0 auto", padding: "clamp(56px,10vw,112px) 24px clamp(48px,8vw,80px)" }}>
      <p style={{ margin: "0 0 16px", fontFamily: "var(--font-mono)", fontSize: "12px", textTransform: "uppercase", letterSpacing: "var(--tracking-eyebrow)", color: "var(--warm-grey)" }}>
        About
      </p>
      <h1 style={{ margin: "0 0 40px", fontFamily: "var(--font-sans)", fontSize: "clamp(32px,6vw,44px)", fontWeight: 600, lineHeight: 1.06, letterSpacing: "-0.025em", color: "var(--ink)" }}>
        From operations to product.
      </h1>
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {paragraphs.map((p, i) => (
          <p key={i} style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: "18px", lineHeight: 1.65, color: "var(--ink)", textWrap: "pretty" }}>
            {p}
          </p>
        ))}
      </div>

      <div style={{ marginTop: "48px", borderTop: "1px solid var(--stone)", paddingTop: "32px" }}>
        <p style={{ margin: "0 0 20px", fontFamily: "var(--font-mono)", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--muted-grey)" }}>
          Languages
        </p>
        <dl style={{ margin: 0, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "16px 24px" }}>
          {languages.map((l) => (
            <div key={l.name} style={{ display: "flex", justifyContent: "space-between", gap: "12px", borderBottom: "1px solid var(--stone)", paddingBottom: "10px" }}>
              <dt style={{ fontFamily: "var(--font-sans)", fontSize: "15px", color: "var(--ink)" }}>{l.name}</dt>
              <dd style={{ margin: 0, fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--warm-grey)" }}>{l.level}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginTop: "40px" }}>
        <Button variant="primary" href="/contact">
          Get in touch
        </Button>
        <Button variant="secondary" href={CV_HREF} download>
          Download CV
        </Button>
      </div>
    </section>
  );
}
