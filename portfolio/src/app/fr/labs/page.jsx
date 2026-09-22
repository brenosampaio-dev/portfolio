import { LabsContent } from "@/components/site/LabsContent";

export const metadata = {
  title: "Labs — Apprentissage frontend et expériences",
  description: "Des expériences frontend sélectionnées avec adaptations, décisions de design et réflexion technique.",
  alternates: { canonical: "/fr/labs", languages: { "en-CA": "/labs", "fr-CA": "/fr/labs" } },
};

export default function FrenchLabsPage() {
  return <LabsContent lang="fr" />;
}
