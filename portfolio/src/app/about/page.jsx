import { AboutContent } from "@/components/site/AboutContent";

export const metadata = {
  title: "About",
  description:
    "From multilingual frontline operations and UX/UI to IT, technical and application support. Based in Valencia, Spain.",
  alternates: {
    canonical: "/about",
  },
};

export default function About() {
  return <AboutContent />;
}
