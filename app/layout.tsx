import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Dock } from "@/components/dock";
import { SiteFooter } from "@/components/site-footer";
import { GlassFilter } from "@/components/glass-filter";
import { RevealManager } from "@/components/reveal-manager";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

const POSITIONING =
  "Product Designer for service operations and B2B operational tools — turning real operational friction into clear flows, systems and interfaces. Multilingual (PT/ES/FR/EN), implementation-aware.";

export const metadata: Metadata = {
  title: {
    default: "Breno Sampaio — Product Designer",
    template: "%s · Breno Sampaio",
  },
  description: POSITIONING,
  authors: [{ name: "Breno Sampaio" }],
  openGraph: {
    title: "Breno Sampaio — Product Designer",
    description: POSITIONING,
    type: "website",
    locale: "en",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <RevealManager />
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--paper)" }}>
          <GlassFilter />
          <main style={{ flex: "1 0 auto" }}>{children}</main>
          <SiteFooter />
          <Dock />
        </div>
      </body>
    </html>
  );
}
