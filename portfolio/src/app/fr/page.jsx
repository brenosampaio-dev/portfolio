import { HomeContent } from "@/components/site/HomeContent";

export const metadata = {
  title: "Breno Sampaio — Designer produit, du design au code",
  description: "Designer produit transformant la complexité opérationnelle en interfaces accessibles et prolongeant cette logique en React.",
  alternates: { canonical: "/fr", languages: { "en-CA": "/", "fr-CA": "/fr" } },
};

export default function FrenchHomePage() {
  return <HomeContent lang="fr" />;
}
