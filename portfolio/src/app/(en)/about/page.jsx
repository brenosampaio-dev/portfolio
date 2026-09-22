import { AboutContent } from "@/components/site/AboutContent";

export const metadata = {
  title: "About — Operations, product design and frontend",
  description: "How multilingual operations, product design and frontend learning connect in Breno Sampaio’s practice.",
  alternates: {
    canonical: "/about",
    languages: { "en-CA": "/about", "fr-CA": "/fr/about" },
  },
};

export default function About() {
  return <AboutContent lang="en" />;
}
