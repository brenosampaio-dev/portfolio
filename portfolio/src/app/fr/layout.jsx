import { SiteDocument } from "@/components/site/SiteDocument";

const description = "Designer produit transformant la complexité opérationnelle en interfaces accessibles et prolongeant cette logique en React.";

export const metadata = {
  metadataBase: new URL("https://brenosampaio.vercel.app"),
  title: { default: "Breno Sampaio — Designer produit, du design au code", template: "%s — Breno Sampaio" },
  description,
  openGraph: {
    title: "Breno Sampaio — Designer produit, du design au code",
    description,
    url: "https://brenosampaio.vercel.app/fr",
    siteName: "Breno Sampaio",
    locale: "fr_CA",
    type: "website",
    images: [{ url: "https://brenosampaio.vercel.app/opengraph-image", width: 1200, height: 630, alt: "Breno Sampaio — Designer produit, du design au code" }],
  },
  twitter: { card: "summary_large_image", title: "Breno Sampaio — Designer produit, du design au code", description, images: ["https://brenosampaio.vercel.app/opengraph-image"] },
};

export const viewport = { themeColor: "#F8F6F1", width: "device-width", initialScale: 1 };

export default function FrenchRootLayout({ children }) {
  return <SiteDocument lang="fr">{children}</SiteDocument>;
}
