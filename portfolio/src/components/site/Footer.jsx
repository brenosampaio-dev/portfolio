"use client";

import Link from "next/link";
import { Text } from "@/components/ds";
import { useLang } from "@/context/AppContext";
import { profile } from "@/lib/content";
import { GITHUB_URL, LINKEDIN_URL, navigationFor } from "@/lib/siteNavigation";
import { Wordmark } from "./Wordmark";

export function Footer() {
  const { lang } = useLang();
  const fr = lang === "fr";
  const navigation = navigationFor(lang).filter(({ id }) => id !== "contact");

  return (
    <footer className="site-footer" id="contact-footer">
      <div className="container site-footer__grid">
        <div className="stack" style={{ gap: "var(--space-3)" }}>
          <Text variant="small" style={{ color: "var(--ink)", maxWidth: "34ch" }}>
            {fr
              ? "Designer produit développant des interfaces accessibles en React."
              : "Product designer building accessible interfaces in React."}
          </Text>
          <Text variant="small">
            {fr
              ? "Valence, Espagne · hybride · télétravail · mobilité"
              : "Valencia, Spain · hybrid · remote · relocation"}
          </Text>
          <Text variant="small">© 2026 Breno Sampaio</Text>
        </div>

        <nav className="stack" style={{ gap: "var(--space-3)" }} aria-label={fr ? "Navigation secondaire" : "Secondary navigation"}>
          <span className="eyebrow">{fr ? "Parcourir" : "Explore"}</span>
          {navigation.map((item) => (
            <Link key={item.id} className="link-quiet" href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="stack" style={{ gap: "var(--space-3)" }}>
          <span className="eyebrow">{fr ? "Contact et profils" : "Contact and profiles"}</span>
          <div className="footer-social">
            <a className="link-quiet" href={`mailto:${profile.email}`}>{profile.email}</a>
            <a className="link-quiet" href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a className="link-quiet" href={GITHUB_URL} target="_blank" rel="noopener noreferrer">GitHub</a>
            <a className="link-quiet" href="/breno-sampaio-resume-en.pdf" download="Breno_Sampaio_Resume_EN.pdf">Resume EN</a>
            <a className="link-quiet" href="/breno-sampaio-resume-fr.pdf" download="Breno_Sampaio_Resume_FR.pdf">CV FR</a>
          </div>
          <div className="footer-seal">
            <Wordmark />
          </div>
        </div>
      </div>
    </footer>
  );
}
