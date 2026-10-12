import { WorkContent } from "@/components/site/WorkContent";

export const metadata = {
  title: "Projets — Décisions produit et preuves",
  description: "Des projets indépendants en design produit dont la portée, les décisions, les artefacts et la validation sont explicites.",
  alternates: { canonical: "/fr/work", languages: { "en-CA": "/work", "fr-CA": "/fr/work" } },
};

export default function FrenchWorkPage() {
  return <WorkContent lang="fr" />;
}
