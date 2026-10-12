import { WorkContent } from "@/components/site/WorkContent";

export const metadata = {
  title: "Work — Product decisions and evidence",
  description: "Independent Product Design cases with scope, decisions, artifacts and validation made explicit.",
  alternates: { canonical: "/work", languages: { "en-CA": "/work", "fr-CA": "/fr/work" } },
};

export default function WorkPage() {
  return <WorkContent lang="en" />;
}
