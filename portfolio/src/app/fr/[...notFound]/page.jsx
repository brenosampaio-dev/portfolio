import { notFound } from "next/navigation";

export const metadata = {
  metadataBase: new URL("https://brenosampaio.vercel.app"),
  title: "Page introuvable",
  description: "La page demandée est introuvable.",
};

export default function FrenchUnknownRoute() {
  notFound();
}
