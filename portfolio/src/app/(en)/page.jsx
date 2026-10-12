import { HomeContent } from "@/components/site/HomeContent";

export const metadata = {
  title: "Breno Sampaio — Product Designer for complex products",
  description: "Product Designer turning complex workflows into accessible products, from problem framing and interaction design to systems and working prototypes.",
  alternates: {
    canonical: "/",
    languages: { "en-CA": "/", "fr-CA": "/fr" },
  },
};

export default function Home() {
  return <HomeContent lang="en" />;
}
