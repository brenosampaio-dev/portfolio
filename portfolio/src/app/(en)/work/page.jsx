import { WorkContent } from "@/components/site/WorkContent";

export const metadata = {
  title: "Work — Scope, decisions and evidence",
  description: "A portfolio structure for product design and frontend work, with scope, decisions, contribution and evidence made explicit.",
  alternates: { canonical: "/work", languages: { "en-CA": "/work", "fr-CA": "/fr/work" } },
};

export default function WorkPage() {
  return <WorkContent lang="en" />;
}
