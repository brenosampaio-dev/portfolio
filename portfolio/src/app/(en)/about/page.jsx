import { AboutContent } from "@/components/site/AboutContent";

export const metadata = {
  title: "About — Product Design grounded in operations",
  description: "How multilingual operations, Product Design and working prototypes connect in Breno Sampaio’s practice.",
  alternates: {
    canonical: "/about",
    languages: { "en-CA": "/about", "fr-CA": "/fr/about" },
  },
};

export default function About() {
  return <AboutContent lang="en" />;
}
