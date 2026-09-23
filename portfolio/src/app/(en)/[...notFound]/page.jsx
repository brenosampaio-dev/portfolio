import { notFound } from "next/navigation";

export const metadata = {
  metadataBase: new URL("https://brenosampaio.vercel.app"),
  title: "Page not found",
  description: "The requested page could not be found.",
};

export default function EnglishUnknownRoute() {
  notFound();
}
