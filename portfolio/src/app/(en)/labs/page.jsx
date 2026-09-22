import { LabsContent } from "@/components/site/LabsContent";

export const metadata = {
  title: "Labs — Frontend learning and experiments",
  description: "Selected frontend experiments with adaptations, design decisions and technical reflection.",
  alternates: { canonical: "/labs", languages: { "en-CA": "/labs", "fr-CA": "/fr/labs" } },
};

export default function LabsPage() {
  return <LabsContent lang="en" />;
}
