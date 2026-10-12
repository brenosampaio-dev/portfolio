import { LabsContent } from "@/components/site/LabsContent";

export const metadata = {
  title: "Systems Lab — Expériences d’interface produit",
  description: "Des expériences de systèmes d’interface autour des produits denses, de l’accessibilité et de l’implémentation.",
  alternates: { canonical: "/fr/labs", languages: { "en-CA": "/labs", "fr-CA": "/fr/labs" } },
};

export default function FrenchLabsPage() {
  return <LabsContent lang="fr" />;
}
