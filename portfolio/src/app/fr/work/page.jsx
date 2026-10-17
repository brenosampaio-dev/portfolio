import { WorkContent } from "@/components/site/WorkContent";

export const metadata = {
  title: "Projets — Décisions produit et preuves",
  description: "Une nouvelle sélection de projets en design produit est en préparation. Découvrez le parcours et la démarche de Breno Sampaio.",
  alternates: { canonical: "/fr/work", languages: { "en-CA": "/work", "fr-CA": "/fr/work" } },
};

export default function FrenchWorkPage() {
  return <WorkContent lang="fr" />;
}
