export const GITHUB_URL = "https://github.com/brenosampaio-dev";
export const LINKEDIN_URL = "https://www.linkedin.com/in/brenosampaio";

export function navigationFor(lang) {
  const fr = lang === "fr";
  return [
    { id: "work", label: fr ? "Projets" : "Work", href: fr ? "/fr/work" : "/work" },
    { id: "labs", label: "Labs", href: fr ? "/fr/labs" : "/labs" },
    { id: "about", label: fr ? "Profil" : "About", href: fr ? "/fr/about" : "/about" },
    { id: "contact", label: "Contact", href: fr ? "/fr#contact" : "/#contact" },
  ];
}
