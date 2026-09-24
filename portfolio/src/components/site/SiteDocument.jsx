import "../../../design-system/styles.css";
import "../../app/globals.css";
import "../../app/signature.css";

import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { CodeVeil } from "@/components/site/CodeVeil";
import { LocaleMetadata } from "@/components/site/LocaleMetadata";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { SkipLink } from "@/components/site/SkipLink";
import { SmoothScroll } from "@/components/site/SmoothScroll";
import { ToTop } from "@/components/site/ToTop";
import { Providers } from "@/context/AppContext";
import { profile } from "@/lib/content";
import { getPortfolioV2 } from "@/lib/portfolioV2";

export function SiteDocument({ children, lang }) {
  const htmlLang = lang === "fr" ? "fr-CA" : "en-CA";
  const content = getPortfolioV2(lang);

  return (
    <html lang={htmlLang} data-lang={lang} suppressHydrationWarning>
      {/* The two locale root layouts delegate their complete document shell here. */}
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var d=document.documentElement;var s=localStorage.getItem('theme');var p=window.matchMedia('(prefers-color-scheme:dark)').matches;d.setAttribute('data-theme',s||(p?'dark':'light'));}catch(e){}})();` }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300;1,9..40,400&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&display=swap" />
      </head>
      <body>
        <script id="person-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: profile.name,
          jobTitle: "Product Designer",
          description: content.hero.lead,
          url: "https://brenosampaio.vercel.app",
          email: `mailto:${content.links.email}`,
          address: { "@type": "PostalAddress", addressLocality: lang === "fr" ? "Valence" : "Valencia", addressCountry: "ES" },
          knowsLanguage: profile.languages.map((item) => item.name),
          sameAs: [content.links.linkedin, content.links.github],
        }) }} />
        <script id="js-flag" dangerouslySetInnerHTML={{ __html: `document.documentElement.classList.add('js')` }} />
        <Providers initialLang={lang}>
          <LocaleMetadata />
          <CodeVeil />
          <SmoothScroll />
          <ScrollProgress />
          <SkipLink />
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <ToTop />
        </Providers>
      </body>
    </html>
  );
}
