import { SiteDocument } from "@/components/site/SiteDocument";

const description = "Product designer turning operational complexity into accessible interfaces and carrying that logic into React.";

export const metadata = {
  metadataBase: new URL("https://brenosampaio.vercel.app"),
  title: { default: "Breno Sampaio — Product Designer building with code", template: "%s — Breno Sampaio" },
  description,
  openGraph: {
    title: "Breno Sampaio — Product Designer building with code",
    description,
    url: "https://brenosampaio.vercel.app",
    siteName: "Breno Sampaio",
    locale: "en_CA",
    type: "website",
    images: [{ url: "https://brenosampaio.vercel.app/opengraph-image", width: 1200, height: 630, alt: "Breno Sampaio — Product Designer building with code" }],
  },
  twitter: { card: "summary_large_image", title: "Breno Sampaio — Product Designer building with code", description, images: ["https://brenosampaio.vercel.app/opengraph-image"] },
};

export const viewport = { themeColor: "#F8F6F1", width: "device-width", initialScale: 1 };

export default function EnglishRootLayout({ children }) {
  return <SiteDocument lang="en">{children}</SiteDocument>;
}
