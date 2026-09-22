import { SiteDocument } from "@/components/site/SiteDocument";

const description = "Designer produit développant des interfaces accessibles en React, avec une expérience en opérations multilingues en Espagne et en France.";

export const metadata = {
  metadataBase: new URL("https://brenosampaio.vercel.app"),
  title: { default: "Breno Sampaio — Designer produit développant des interfaces accessibles", template: "%s — Breno Sampaio" },
  description,
};

export const viewport = { themeColor: "#F8F6F1", width: "device-width", initialScale: 1 };

export default function FrenchRootLayout({ children }) {
  return <SiteDocument lang="fr">{children}</SiteDocument>;
}
