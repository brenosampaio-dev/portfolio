import { HomeContent } from "@/components/site/HomeContent";

export const metadata = {
  title: "Breno Sampaio — Designer produit · Produits complexes",
  description: "Designer produit transformant des processus complexes en produits accessibles, du cadrage et du design d’interaction aux systèmes et prototypes fonctionnels.",
  alternates: { canonical: "/fr", languages: { "en-CA": "/", "fr-CA": "/fr" } },
};

export default function FrenchHomePage() {
  return <HomeContent lang="fr" />;
}
