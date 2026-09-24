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
    email: "brenosampaio@outlook.com",
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
    paused: "Case selection paused",
  },
  identity: {
    current: "Product Designer",
    transition: "Building accessible interfaces in React",
    target: "Frontend and junior Design Engineer opportunities",
  },
  hero: {
    eyebrow: "Product Designer · Building with code",
    title: "Complexity underneath. Clarity on the surface.",
    lead: "I turn operational complexity into accessible product interfaces, then carry that logic into React.",
    targets: "Product Design · Interface Systems · Frontend",
    primaryAction: "See how I work",
    secondaryAction: "View GitHub",
  },
  work: {
    status: PROJECT_STATUSES.paused,
    heading: "Only work I can explain and defend belongs here.",
    body: "Case selection is paused. When it resumes, every case will make its scope, decisions, contribution and evidence explicit.",
    items: [],
    builtHeading: "Selected product work",
    systemsHeading: "Interfaces as systems",
    archiveHeading: "Operational reasoning",
    archiveBody: "The existing simulations remain available as reasoning exercises. They are not presented as client or production work.",
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
    eyebrow: "Learning, edited",
    title: "A lesson earns a place here only when it changes the work.",
    lead: "Scrimba’s Frontend Career Path is in progress. I publish experiments only when they show an adaptation, a decision or a technical lesson.",
    current: "Scrimba Frontend Career Path",
    currentStatus: PROJECT_STATUSES.building,
  },
  about: {
    eyebrow: "Operations → Product → Code",
    title: "I learned product where real workflows break.",
    lead: "Eight years in multilingual operations taught me to read ambiguity, ownership, handoffs and service failure. Product design gave that instinct structure. Frontend turns it into working interfaces.",
    learning: "I am deepening HTML, CSS, JavaScript, React and accessible implementation through Scrimba and independent builds.",
  },
};

const fr = {
  ...shared,
  location: "Valence, Espagne",
  statusLabels: {
    strong: "Solide aujourd’hui",
    building: "En développement",
    next: "Prochaine étape",
    paused: "Sélection des études de cas en pause",
  },
  identity: {
    current: "Designer produit",
    transition: "Développement d’interfaces accessibles en React",
    target: "Opportunités frontend et junior Design Engineer",
  },
  hero: {
    eyebrow: "Designer produit · Du design au code",
    title: "La complexité en coulisses. La clarté à l’écran.",
    lead: "Je transforme la complexité opérationnelle en interfaces produit accessibles, puis j’en prolonge la logique en React.",
    targets: "Design produit · Systèmes d’interface · Frontend",
    primaryAction: "Voir ma méthode",
    secondaryAction: "Voir GitHub",
  },
  work: {
    status: PROJECT_STATUSES.paused,
    heading: "Seuls les projets que je peux expliquer et défendre ont leur place ici.",
    body: "La sélection des études de cas est en pause. À sa reprise, chaque cas explicitera sa portée, les décisions, ma contribution et les preuves.",
    items: [],
    builtHeading: "Projets produit sélectionnés",
    systemsHeading: "Les interfaces comme systèmes",
    archiveHeading: "Raisonnement opérationnel",
    archiveBody: "Les simulations existantes restent disponibles comme exercices de raisonnement. Elles ne sont pas présentées comme du travail client ou de production.",
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
    eyebrow: "Apprendre, puis éditer",
    title: "Une leçon mérite sa place ici lorsqu’elle transforme le travail.",
    lead: "Le Frontend Career Path de Scrimba est en cours. Je ne publie une expérience que si elle montre une adaptation, une décision ou un apprentissage technique.",
    current: "Scrimba Frontend Career Path",
    currentStatus: PROJECT_STATUSES.building,
  },
  about: {
    eyebrow: "Opérations → Produit → Code",
    title: "J’ai appris le produit là où les processus réels se brisent.",
    lead: "Huit ans en opérations multilingues m’ont appris à lire l’ambiguïté, la responsabilité, les transferts et les ruptures de service. Le design produit a structuré cet instinct. Le frontend le transforme en interfaces fonctionnelles.",
    learning: "J’approfondis HTML, CSS, JavaScript, React et l’implémentation accessible grâce à Scrimba et à des projets indépendants.",
  },
};

export function getPortfolioV2(lang) {
  return lang === "fr" ? fr : en;
}
