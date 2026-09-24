import { HomeContent } from "@/components/site/HomeContent";

export const metadata = {
  title: "Breno Sampaio — Product Designer building with code",
  description: "Product designer turning operational complexity into accessible interfaces and carrying that logic into React.",
  alternates: {
    canonical: "/",
    languages: { "en-CA": "/", "fr-CA": "/fr" },
  },
};

export default function Home() {
  return <HomeContent lang="en" />;
}
