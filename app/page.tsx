import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/ui/project-card";
import { Status } from "@/components/ui/status";
import { CV_HREF } from "@/components/cv";

const monoLabel = (color = "var(--muted-grey)") =>
  ({ fontFamily: "var(--font-mono)", fontSize: "12px", letterSpacing: "var(--tracking-mono)", color }) as const;

const approachPoints = [
  {
    n: "01",
    title: "Real service operations",
    body: "[I came to design through front-desk and customer-facing operations — I have lived the friction I now design against.]",
  },
  {
    n: "02",
    title: "Systems thinking",
    body: "[Reusable components, defined states and clear patterns over one-off screens — design that holds up as the product grows.]",
  },
  {
    n: "03",
    title: "Implementation-aware",
    body: "[I design with the build in mind — edge cases, empty and error states, and a handoff developers can actually work from.]",
  },
  {
    n: "04",
    title: "AI-assisted workflows",
    body: "[I use AI-assisted workflows to explore, prototype and document faster — without outsourcing the design judgement.]",
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="wrap" style={{ paddingTop: "clamp(64px,12vw,128px)", paddingBottom: "clamp(44px,7vw,72px)" }}>
        <p
          className="reveal"
          style={{
            margin: "0 0 clamp(24px,4vw,36px)",
            fontFamily: "var(--font-mono)",
            fontSize: "12px",
            textTransform: "uppercase",
            letterSpacing: "var(--tracking-eyebrow)",
            color: "var(--warm-grey)",
            animationDelay: "40ms",
          }}
        >
          Product designer — service operations &amp; B2B operational tools
        </p>
        <h1
          className="reveal"
          style={{
            margin: 0,
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(46px,9.5vw,84px)",
            fontWeight: 600,
            lineHeight: 0.97,
            letterSpacing: "-0.04em",
            color: "var(--ink)",
            animationDelay: "110ms",
          }}
        >
          Breno
          <br />
          Sampaio
        </h1>
        <div
          className="hero-split reveal"
          style={{
            marginTop: "clamp(36px,6vw,64px)",
            paddingTop: "clamp(28px,4vw,40px)",
            borderTop: "1px solid var(--stone)",
            animationDelay: "180ms",
          }}
        >
          <p
            style={{
              margin: 0,
              maxWidth: "600px",
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(19px,2.4vw,22px)",
              lineHeight: 1.5,
              color: "var(--ink)",
              textWrap: "pretty",
            }}
          >
            I turn real operational friction into clear flows, systems and interfaces — for service operations and B2B
            operational tools. Multilingual (PT/ES/FR/EN), implementation-aware.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--ink)" }}>
              Valencia, Spain
            </span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--warm-grey)" }}>
              Open to Spain / Europe remote
            </span>
          </div>
        </div>
        <div
          className="reveal"
          style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginTop: "clamp(28px,4vw,40px)", animationDelay: "250ms" }}
        >
          <Button variant="primary" href="/work/service-operations-dashboard">
            View case study
          </Button>
          <Button variant="secondary" href={CV_HREF} download>
            Download CV
          </Button>
        </div>
      </section>

      {/* Selected Work */}
      <section className="wrap" style={{ paddingTop: "clamp(48px,8vw,80px)", paddingBottom: "clamp(48px,8vw,80px)" }}>
        <div className="ed-row" style={{ borderTop: "1px solid var(--stone)", paddingTop: "clamp(28px,4vw,40px)" }}>
          <div className="ed-label">
            <span style={monoLabel()}>(01)</span>
            <h2 style={{ margin: "8px 0 0", fontFamily: "var(--font-sans)", fontSize: "20px", fontWeight: 600, letterSpacing: "-0.01em", color: "var(--ink)" }}>
              Selected work
            </h2>
            <p style={{ margin: "10px 0 0", fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "var(--tracking-mono)", color: "var(--muted-grey)" }}>
              One case · 2026
            </p>
          </div>
          <Link
            href="/work/service-operations-dashboard"
            aria-label="Open case study: Service Operations Dashboard"
            style={{ display: "block", maxWidth: "560px", textDecoration: "none" }}
          >
            <ProjectCard
              title="Service Operations Dashboard"
              problem="[Front-desk teams lose visibility when incidents and handovers scatter across disconnected tools and informal notes.]"
              role="Product design · flows · UI"
              tags={["B2B", "Service Ops", "Design System"]}
              style={{ width: "100%" }}
            />
            <div style={{ display: "flex", alignItems: "center", gap: "14px", padding: "16px 4px 0", flexWrap: "wrap" }}>
              <Status>Concept</Status>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", letterSpacing: "var(--tracking-mono)", color: "var(--warm-grey)" }}>2026</span>
              <span style={{ marginLeft: "auto", fontFamily: "var(--font-sans)", fontSize: "14px", fontWeight: 500, color: "var(--ink)" }}>View case study →</span>
            </div>
          </Link>
        </div>
      </section>

      {/* Approach */}
      <section className="wrap" style={{ paddingTop: "clamp(48px,8vw,80px)", paddingBottom: "clamp(48px,8vw,80px)" }}>
        <div className="ed-row" style={{ borderTop: "1px solid var(--stone)", paddingTop: "clamp(28px,4vw,40px)" }}>
          <div className="ed-label">
            <span style={monoLabel()}>(02)</span>
            <h2 style={{ margin: "8px 0 0", fontFamily: "var(--font-sans)", fontSize: "20px", fontWeight: 600, letterSpacing: "-0.01em", color: "var(--ink)" }}>
              How I work
            </h2>
            <p style={{ margin: "12px 0 0", maxWidth: "170px", fontFamily: "var(--font-sans)", fontSize: "14px", lineHeight: 1.5, color: "var(--warm-grey)" }}>
              A technical edge from real operations — applied to interfaces, not slideware.
            </p>
          </div>
          <div>
            <div style={{ borderBottom: "1px solid var(--stone)" }}>
              {approachPoints.map((p) => (
                <div
                  key={p.n}
                  style={{ display: "grid", gridTemplateColumns: "44px minmax(0,1fr)", gap: "20px", padding: "22px 0", borderTop: "1px solid var(--stone)" }}
                >
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "13px", color: "var(--muted-grey)", paddingTop: "3px" }}>{p.n}</span>
                  <div>
                    <h3 style={{ margin: "0 0 6px", fontFamily: "var(--font-sans)", fontSize: "17px", fontWeight: 600, letterSpacing: "-0.01em", color: "var(--ink)" }}>
                      {p.title}
                    </h3>
                    <p style={{ margin: 0, maxWidth: "560px", fontFamily: "var(--font-sans)", fontSize: "15px", lineHeight: 1.6, color: "var(--warm-grey)" }}>{p.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <blockquote
              style={{
                margin: "32px 0 0",
                paddingLeft: "20px",
                borderLeft: "2px solid var(--stone)",
                maxWidth: "600px",
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(17px,2vw,19px)",
                fontStyle: "normal",
                lineHeight: 1.5,
                color: "var(--ink)",
              }}
            >
              &ldquo;I&apos;m not a full-stack engineer; I design with implementation in mind — reusable components, states,
              edge cases, clear handoff.&rdquo;
            </blockquote>
          </div>
        </div>
      </section>

      {/* About teaser */}
      <section className="wrap" style={{ paddingTop: "clamp(48px,8vw,80px)", paddingBottom: "clamp(56px,9vw,96px)" }}>
        <div className="ed-row" style={{ borderTop: "1px solid var(--stone)", paddingTop: "clamp(28px,4vw,40px)" }}>
          <div className="ed-label">
            <span style={monoLabel()}>(03)</span>
            <h2 style={{ margin: "8px 0 0", fontFamily: "var(--font-sans)", fontSize: "20px", fontWeight: 600, letterSpacing: "-0.01em", color: "var(--ink)" }}>
              About
            </h2>
          </div>
          <div style={{ maxWidth: "640px" }}>
            <p style={{ margin: "0 0 28px", fontFamily: "var(--font-sans)", fontSize: "clamp(20px,2.4vw,24px)", lineHeight: 1.5, color: "var(--ink)", textWrap: "pretty" }}>
              I came to product design from service operations and multilingual customer-facing work — close to the people,
              requests, incidents and handovers that products are supposed to support. [Two to three lines on the transition
              for Breno to refine.]
            </p>
            <Button variant="link" href="/about">
              More about me →
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
