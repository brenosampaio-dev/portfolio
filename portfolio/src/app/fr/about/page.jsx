import { AboutContent } from "@/components/site/AboutContent";

export const metadata = {
  title: "Profil — Opérations, design produit et frontend",
  description: "Le lien entre opérations multilingues, design produit et apprentissage frontend dans la pratique de Breno Sampaio.",
  alternates: { canonical: "/fr/about", languages: { "en-CA": "/about", "fr-CA": "/fr/about" } },
};

export default function FrenchAboutPage() {
  return <AboutContent lang="fr" />;
}
