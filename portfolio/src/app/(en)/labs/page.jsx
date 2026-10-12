import { LabsContent } from "@/components/site/LabsContent";

export const metadata = {
  title: "Systems Lab — Product interface experiments",
  description: "Interface-system experiments exploring dense product patterns, accessibility and implementation.",
  alternates: { canonical: "/labs", languages: { "en-CA": "/labs", "fr-CA": "/fr/labs" } },
};

export default function LabsPage() {
  return <LabsContent lang="en" />;
}
