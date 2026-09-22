import { HomeContent } from "@/components/site/HomeContent";

export const metadata = {
  title: "Breno Sampaio — Product Designer building accessible interfaces",
  description: "Product designer building accessible interfaces in React, grounded in multilingual operations across Spain and France.",
  alternates: {
    canonical: "/",
    languages: { "en-CA": "/", "fr-CA": "/fr" },
  },
};

export default function Home() {
  return <HomeContent lang="en" />;
}
