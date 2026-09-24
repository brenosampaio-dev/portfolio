import { WorkContent } from "@/components/site/WorkContent";

export const metadata = {
  title: "Projets — Portée, décisions et preuves",
  description: "Une structure de portfolio pour le design produit et le frontend, avec une portée, des décisions, une contribution et des preuves explicites.",
  alternates: { canonical: "/fr/work", languages: { "en-CA": "/work", "fr-CA": "/fr/work" } },
};

export default function FrenchWorkPage() {
  return <WorkContent lang="fr" />;
}
