import { WorkContent } from "@/components/site/WorkContent";

export const metadata = {
  title: "Work — Case-study structure and evidence",
  description: "An honest view of the portfolio structure while the next product design and frontend cases are selected.",
  alternates: { canonical: "/work", languages: { "en-CA": "/work", "fr-CA": "/fr/work" } },
};

export default function WorkPage() {
  return <WorkContent lang="en" />;
}
