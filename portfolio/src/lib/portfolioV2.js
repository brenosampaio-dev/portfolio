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
    eyebrow: "Product Designer · Frontend in progress",
    title: "I design and build accessible product interfaces for complex, real-world workflows.",
    lead: "Product designer building in React and JavaScript, grounded in 8+ years of multilingual operations across Spain and France.",
    targets: "Product Design · Frontend · UX Engineering",
    primaryAction: "Explore the work structure",
    secondaryAction: "View GitHub",
  },
  work: {
    status: PROJECT_STATUSES.paused,
    heading: "The next case studies will be selected after the portfolio foundation is complete.",
    body: "No unfinished project is presented as shipped work. The current rebuild focuses on the system, navigation and reading experience first.",
    items: [],
    builtHeading: "Built products",
    systemsHeading: "Design systems and component work",
    archiveHeading: "Operational reasoning archive",
    archiveBody: "The existing simulations remain preserved while their future role is decided. They are not presented as client or production work.",
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
    { id: "understand", title: "Understand", body: "Understand the workflow, users and business constraint." },
    { id: "define", title: "Define", body: "Define states, risks, requirements and success signals." },
    { id: "explore", title: "Explore", body: "Explore and prototype alternatives before committing to one direction." },
    { id: "build", title: "Build and validate", body: "Build the interface, test normal and failure paths, and validate with people." },
    { id: "iterate", title: "Measure and iterate", body: "Document evidence, measure what is available, and improve without inventing impact." },
  ],
  labs: {
    eyebrow: "Learning in public, selectively",
    title: "Labs are for questions worth testing, not copied course output.",
    lead: "The Scrimba Frontend Career Path is in progress. Experiments appear here only when they include an adaptation, design decision or technical reflection.",
    current: "Scrimba Frontend Career Path",
    currentStatus: PROJECT_STATUSES.building,
  },
  about: {
    eyebrow: "Operations → Product → Code",
    title: "I learned products from the moments where real workflows break.",
    lead: "Eight-plus years in multilingual operations shaped how I investigate ambiguity, ownership, handoffs and service recovery. Product design gave that reasoning structure; frontend development is helping me carry it into working interfaces.",
    learning: "I am currently strengthening HTML, CSS, JavaScript, React and accessible implementation through Scrimba and independent practice.",
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
    eyebrow: "Designer produit · Frontend en développement",
    title: "Je conçois et développe des interfaces produit accessibles pour des processus réels et complexes.",
    lead: "Designer produit développant en React et JavaScript, avec plus de huit ans d’expérience en opérations multilingues en Espagne et en France.",
    targets: "Design produit · Frontend · UX Engineering",
    primaryAction: "Explorer la structure des projets",
    secondaryAction: "Voir GitHub",
  },
  work: {
    status: PROJECT_STATUSES.paused,
    heading: "Les prochaines études de cas seront sélectionnées après la finalisation des fondations du portfolio.",
    body: "Aucun projet inachevé n’est présenté comme un produit livré. La refonte se concentre d’abord sur le système, la navigation et l’expérience de lecture.",
    items: [],
    builtHeading: "Produits développés",
    systemsHeading: "Design systems et composants",
    archiveHeading: "Archive de raisonnement opérationnel",
    archiveBody: "Les simulations existantes restent préservées pendant que leur rôle futur est décidé. Elles ne sont pas présentées comme du travail client ou de production.",
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
    { id: "understand", title: "Comprendre", body: "Comprendre le processus, les utilisateurs et la contrainte métier." },
    { id: "define", title: "Définir", body: "Définir les états, les risques, les exigences et les signaux de réussite." },
    { id: "explore", title: "Explorer", body: "Explorer et prototyper plusieurs options avant de retenir une direction." },
    { id: "build", title: "Développer et valider", body: "Développer l’interface, tester les parcours normaux et les erreurs, puis valider avec des personnes." },
    { id: "iterate", title: "Mesurer et itérer", body: "Documenter les preuves, mesurer ce qui est disponible et améliorer sans inventer d’impact." },
  ],
  labs: {
    eyebrow: "Apprendre publiquement, avec sélection",
    title: "Les Labs servent à tester des questions utiles, pas à publier des exercices copiés.",
    lead: "Le parcours Frontend Career Path de Scrimba est en cours. Une expérience n’apparaît ici que si elle comporte une adaptation, une décision de design ou une réflexion technique.",
    current: "Scrimba Frontend Career Path",
    currentStatus: PROJECT_STATUSES.building,
  },
  about: {
    eyebrow: "Opérations → Produit → Code",
    title: "J’ai appris les produits dans les moments où les processus réels se brisent.",
    lead: "Plus de huit ans en opérations multilingues ont façonné ma manière d’analyser l’ambiguïté, la responsabilité, les transferts et la reprise de service. Le design produit a structuré ce raisonnement ; le développement frontend m’aide à le transformer en interfaces fonctionnelles.",
    learning: "Je renforce actuellement HTML, CSS, JavaScript, React et l’implémentation accessible grâce à Scrimba et à une pratique indépendante.",
  },
};

export function getPortfolioV2(lang) {
  return lang === "fr" ? fr : en;
}
