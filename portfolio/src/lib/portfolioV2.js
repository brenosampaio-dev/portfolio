import { getPortfolioCases } from "@/lib/portfolioCases";

export const PROJECT_STATUSES = Object.freeze({
  strong: "strong",
  building: "building",
  next: "next",
  paused: "paused",
});

export const portfolioProfileFacts = Object.freeze({
  links: {
    github: "https://github.com/brenosampaio-dev",
    linkedin: "https://www.linkedin.com/in/brenosampaio",
    email: "sampayobreno@gmail.com",
  },
  location: "Valencia, Spain",
});

const shared = portfolioProfileFacts;

const en = {
  ...shared,
  statusLabels: {
    strong: "Strong now",
    building: "Building now",
    next: "Next",
    paused: "Cases in development",
  },
  identity: {
    current: "Product Designer",
    transition: "Prototyping product decisions in React",
    target: "Product Design roles across Europe and remote teams",
  },
  hero: {
    eyebrow: "Product Designer · Systems · Prototypes",
    title: "Complex products, made clear.",
    lead: "I turn complex workflows into accessible products — from problem framing and interaction design to systems and working prototypes.",
    targets: "Product strategy · Interaction design · Design systems",
    primaryAction: "View selected work",
    secondaryAction: "About my practice",
  },
  work: {
    status: PROJECT_STATUSES.building,
    heading: "One product proof, followed by the system and build it makes possible.",
    body: "Relay is published as a research prototype grounded in public sources and synthetic data. Basis and Signalroom remain explicit future work until their implementation and validation exist.",
    items: getPortfolioCases("en"),
    builtHeading: "Product → System → Build",
    systemsHeading: "Systems behind the interface",
    archiveHeading: "Previous operational studies",
    archiveBody: "Earlier simulations remain available as reasoning exercises outside the primary recruiter path. They are not presented as client or production work.",
  },
  capabilities: [
    {
      id: "product",
      title: "Product and operations",
      status: PROJECT_STATUSES.strong,
      items: ["Workflow mapping", "Requirements and constraints", "Edge cases and handoffs", "Multilingual service context"],
    },
    {
      id: "design",
      title: "Design",
      status: PROJECT_STATUSES.strong,
      items: ["Interaction design", "UI systems", "Prototyping", "Accessibility", "Usability testing"],
    },
    {
      id: "building",
      title: "Building",
      status: PROJECT_STATUSES.building,
      items: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Git"],
    },
  ],
  process: [
    { id: "understand", title: "Understand", body: "Find the people, constraints and failure points." },
    { id: "define", title: "Define", body: "Turn ambiguity into states, risks and success signals." },
    { id: "explore", title: "Explore", body: "Prototype competing directions before choosing one." },
    { id: "build", title: "Build and validate", body: "Build the interface and test normal, edge and failure paths." },
    { id: "iterate", title: "Measure and iterate", body: "Measure what exists. Document what does not. Improve without inventing impact." },
  ],
  labs: {
    eyebrow: "Systems Lab · In development",
    title: "Small interface experiments, documented as systems.",
    lead: "This space will examine tables, forms and decision-heavy patterns through interaction, accessibility and implementation.",
    current: "Systems Lab",
    currentStatus: PROJECT_STATUSES.building,
  },
  about: {
    eyebrow: "Product design, grounded in operations",
    title: "I design for the moment complexity becomes a decision.",
    lead: "Eight years in multilingual operations taught me to see fragmented information, ambiguous ownership, handoffs and service failure. I now turn those conditions into product flows, interface systems and working prototypes.",
    learning: "I use HTML, CSS, JavaScript and React to test interaction decisions, accessibility behavior and system logic in working interfaces.",
  },
};

const fr = {
  ...shared,
  location: "Valence, Espagne",
  statusLabels: {
    strong: "Solide aujourd’hui",
    building: "En développement",
    next: "Prochaine étape",
    paused: "Projets en développement",
  },
  identity: {
    current: "Designer produit",
    transition: "Prototypage de décisions produit en React",
    target: "Postes en design produit en Europe et à distance",
  },
  hero: {
    eyebrow: "Designer produit · Systèmes · Prototypes",
    title: "Des produits complexes, rendus clairs.",
    lead: "Je transforme des processus complexes en produits accessibles — du cadrage du problème et du design d’interaction aux systèmes et prototypes fonctionnels.",
    targets: "Stratégie produit · Design d’interaction · Design systems",
    primaryAction: "Voir les projets",
    secondaryAction: "Découvrir ma pratique",
  },
  work: {
    status: PROJECT_STATUSES.building,
    heading: "Une preuve produit, suivie du système et du build qu’elle rend possibles.",
    body: "Relay est publié comme prototype de recherche fondé sur des sources publiques et des données synthétiques. Basis et Signalroom restent des projets futurs explicites tant que leur implémentation et leur validation n’existent pas.",
    items: getPortfolioCases("fr"),
    builtHeading: "Produit → Système → Build",
    systemsHeading: "Les systèmes derrière l’interface",
    archiveHeading: "Études opérationnelles précédentes",
    archiveBody: "Les simulations précédentes restent disponibles comme exercices de raisonnement, hors du parcours principal des recruteurs. Elles ne sont pas présentées comme du travail client ou de production.",
  },
  capabilities: [
    {
      id: "product",
      title: "Produit et opérations",
      status: PROJECT_STATUSES.strong,
      items: ["Cartographie des processus", "Exigences et contraintes", "Cas limites et transferts", "Contexte de service multilingue"],
    },
    {
      id: "design",
      title: "Design",
      status: PROJECT_STATUSES.strong,
      items: ["Design d’interaction", "Systèmes d’interface", "Prototypage", "Accessibilité", "Tests d’utilisabilité"],
    },
    {
      id: "building",
      title: "Développement",
      status: PROJECT_STATUSES.building,
      items: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Git"],
    },
  ],
  process: [
    { id: "understand", title: "Comprendre", body: "Repérer les personnes, les contraintes et les points de rupture." },
    { id: "define", title: "Définir", body: "Transformer l’ambiguïté en états, risques et signaux de réussite." },
    { id: "explore", title: "Explorer", body: "Prototyper plusieurs directions avant d’en choisir une." },
    { id: "build", title: "Développer et valider", body: "Construire l’interface et tester les parcours normaux, limites et dégradés." },
    { id: "iterate", title: "Mesurer et itérer", body: "Mesurer ce qui existe. Documenter ce qui manque. Améliorer sans inventer d’impact." },
  ],
  labs: {
    eyebrow: "Laboratoire de systèmes · En développement",
    title: "De petites expériences d’interface, documentées comme des systèmes.",
    lead: "Cet espace examinera les tableaux, les formulaires et les parcours de décision à travers l’interaction, l’accessibilité et l’implémentation.",
    current: "Laboratoire de systèmes",
    currentStatus: PROJECT_STATUSES.building,
  },
  about: {
    eyebrow: "Design produit, ancré dans les opérations",
    title: "Je conçois pour le moment où la complexité devient une décision.",
    lead: "Huit ans en opérations multilingues m’ont appris à repérer l’information fragmentée, la responsabilité ambiguë, les transferts et les ruptures de service. Je transforme aujourd’hui ces conditions en parcours produit, systèmes d’interface et prototypes fonctionnels.",
    learning: "J’utilise HTML, CSS, JavaScript et React pour tester les décisions d’interaction, les comportements d’accessibilité et la logique des systèmes dans des interfaces fonctionnelles.",
  },
};

export function getPortfolioV2(lang) {
  return lang === "fr" ? fr : en;
}
