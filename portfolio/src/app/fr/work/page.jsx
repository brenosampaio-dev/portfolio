import { WorkContent } from "@/components/site/WorkContent";

export const metadata = {
  title: "Projets — Structure et preuves des études de cas",
  description: "Une vue honnête de la structure du portfolio pendant la sélection des prochains projets design produit et frontend.",
  alternates: { canonical: "/fr/work", languages: { "en-CA": "/work", "fr-CA": "/fr/work" } },
};

export default function FrenchWorkPage() {
  return <WorkContent lang="fr" />;
}
