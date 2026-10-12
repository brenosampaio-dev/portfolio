import { RelayCaseContent } from "@/components/site/RelayCaseContent";

export const metadata = {
  title: "Relay — Espace de décision pour les exceptions e-commerce",
  description: "Un prototype de recherche pour analyser, attribuer et résoudre des exceptions e-commerce transfrontalières avec des données synthétiques.",
  alternates: { canonical: "/fr/work/relay", languages: { "en-CA": "/work/relay", "fr-CA": "/fr/work/relay" } },
};

export default function FrenchRelayCasePage() {
  return <RelayCaseContent lang="fr" />;
}
