import { AboutContent } from "@/components/site/AboutContent";

export const metadata = {
  title: "About",
  description:
    "From frontline service operations to software implementation, SaaS onboarding and application support. Based in Valencia, Spain.",
  alternates: {
    canonical: "/about",
  },
};

export default function About() {
  return <AboutContent />;
}
