import { WorkContent } from "@/components/site/WorkContent";

export const metadata = {
  title: "Work — Product decisions and evidence",
  description: "A new selection of Product Design work is in preparation. Explore Breno Sampaio’s background and approach.",
  alternates: { canonical: "/work", languages: { "en-CA": "/work", "fr-CA": "/fr/work" } },
};

export default function WorkPage() {
  return <WorkContent lang="en" />;
}
