import { HomeContent } from "@/components/site/HomeContent";

export const metadata = {
  title: "Breno Sampaio — Designer produit développant des interfaces accessibles",
  description: "Designer produit développant des interfaces accessibles en React, avec une expérience en opérations multilingues en Espagne et en France.",
  alternates: { canonical: "/fr", languages: { "en-CA": "/", "fr-CA": "/fr" } },
};

export default function FrenchHomePage() {
  return <HomeContent lang="fr" />;
}
