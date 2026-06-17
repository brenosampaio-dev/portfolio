import Link from "next/link";
import { CV_HREF } from "./cv";

/**
 * Global footer — appears on every page. "Let's talk." + reach details + location.
 * Bottom padding clears the floating dock.
 */
export function SiteFooter() {
  return (
    <footer style={{ borderTop: "1px solid var(--stone)", background: "var(--ivory)" }}>
      <div
        style={{
          width: "100%",
          maxWidth: "1080px",
          margin: "0 auto",
          padding: "clamp(40px,7vw,64px) 24px clamp(104px,16vw,132px)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "40px",
            alignItems: "start",
          }}
        >
          <div>
            <p
              style={{
                margin: "0 0 12px",
                fontFamily: "var(--font-mono)",
                fontSize: "12px",
                textTransform: "uppercase",
                letterSpacing: "var(--tracking-eyebrow)",
                color: "var(--warm-grey)",
              }}
            >
              Get in touch
            </p>
            <p
              style={{
                margin: "0 0 20px",
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(24px,4vw,32px)",
                fontWeight: 600,
                letterSpacing: "-0.015em",
                color: "var(--ink)",
              }}
            >
              Let&apos;s talk.
            </p>
            <Link
              href="/contact"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "15px",
                fontWeight: 500,
                color: "var(--ink)",
                textDecoration: "underline",
                textUnderlineOffset: "4px",
                textDecorationColor: "var(--muted-grey)",
              }}
            >
              Contact →
            </Link>
          </div>
          <div>
            <p
              style={{
                margin: "0 0 12px",
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: "var(--muted-grey)",
              }}
            >
              Reach me
            </p>
            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "8px" }}>
              <li style={{ fontFamily: "var(--font-sans)", fontSize: "15px", color: "var(--ink)" }}>[email — to add]</li>
              <li style={{ fontFamily: "var(--font-sans)", fontSize: "15px", color: "var(--ink)" }}>[linkedin.com/in/...]</li>
            </ul>
            <div style={{ marginTop: "16px" }}>
              <a
                href={CV_HREF}
                download
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "15px",
                  fontWeight: 500,
                  color: "var(--ink)",
                  textDecoration: "underline",
                  textUnderlineOffset: "4px",
                  textDecorationColor: "var(--muted-grey)",
                }}
              >
                Download CV →
              </a>
            </div>
          </div>
          <div>
            <p
              style={{
                margin: "0 0 12px",
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: "var(--muted-grey)",
              }}
            >
              Based in
            </p>
            <p style={{ margin: "0 0 4px", fontFamily: "var(--font-sans)", fontSize: "15px", color: "var(--ink)" }}>
              Valencia, Spain
            </p>
            <p style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: "15px", color: "var(--warm-grey)" }}>
              Open to Spain / Europe remote
            </p>
          </div>
        </div>
        <div
          style={{
            marginTop: "48px",
            paddingTop: "24px",
            borderTop: "1px solid var(--stone)",
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            justifyContent: "space-between",
          }}
        >
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", letterSpacing: "0.02em", color: "var(--muted-grey)" }}>
            © 2026 Breno Sampaio
          </span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", letterSpacing: "0.02em", color: "var(--muted-grey)" }}>
            Product Designer · Valencia
          </span>
        </div>
      </div>
    </footer>
  );
}
