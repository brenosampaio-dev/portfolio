import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/contact-form";
import { CV_HREF } from "@/components/cv";

export const metadata: Metadata = {
  title: "Contact",
  description: "Open to product design roles across Spain and Europe (remote). The fastest way to reach me is email.",
};

const details = [
  { dt: "Email", dd: "[email — to add]" },
  { dt: "LinkedIn", dd: "[linkedin.com/in/...]" },
  { dt: "Location", dd: "Valencia, Spain" },
  { dt: "Availability", dd: "Spain / Europe remote" },
];

export default function ContactPage() {
  return (
    <section className="reveal" style={{ width: "100%", maxWidth: "1080px", margin: "0 auto", padding: "clamp(56px,10vw,112px) 24px clamp(48px,8vw,80px)" }}>
      <p style={{ margin: "0 0 16px", fontFamily: "var(--font-mono)", fontSize: "12px", textTransform: "uppercase", letterSpacing: "var(--tracking-eyebrow)", color: "var(--warm-grey)" }}>
        Contact
      </p>
      <h1 style={{ margin: "0 0 16px", fontFamily: "var(--font-sans)", fontSize: "clamp(34px,6vw,44px)", fontWeight: 600, lineHeight: 1.06, letterSpacing: "-0.025em", color: "var(--ink)" }}>
        Let&apos;s talk.
      </h1>
      <p style={{ margin: "0 0 48px", maxWidth: "560px", fontFamily: "var(--font-sans)", fontSize: "18px", lineHeight: 1.6, color: "var(--warm-grey)" }}>
        Open to product design roles across Spain and Europe (remote). The fastest way to reach me is email.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "48px" }}>
        <div>
          <dl style={{ margin: 0, display: "flex", flexDirection: "column", gap: "20px" }}>
            {details.map((d) => (
              <div key={d.dt}>
                <dt style={{ margin: "0 0 6px", fontFamily: "var(--font-mono)", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--muted-grey)" }}>
                  {d.dt}
                </dt>
                <dd style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: "16px", color: "var(--ink)" }}>{d.dd}</dd>
              </div>
            ))}
          </dl>
          <div style={{ marginTop: "32px" }}>
            <Button variant="secondary" href={CV_HREF} download>
              Download CV
            </Button>
          </div>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
