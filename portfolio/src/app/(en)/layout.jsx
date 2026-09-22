import { SiteDocument } from "@/components/site/SiteDocument";

const description = "Product designer building accessible interfaces in React, grounded in multilingual operations across Spain and France.";

export const metadata = {
  metadataBase: new URL("https://brenosampaio.vercel.app"),
  title: { default: "Breno Sampaio — Product Designer building accessible interfaces", template: "%s — Breno Sampaio" },
  description,
};

export const viewport = { themeColor: "#F8F6F1", width: "device-width", initialScale: 1 };

export default function EnglishRootLayout({ children }) {
  return <SiteDocument lang="en">{children}</SiteDocument>;
}
