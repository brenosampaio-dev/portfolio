import {
  getRelayResearchSummary,
  relayResearchDisclosure,
  relayResearchSources,
  relayWorkflow,
} from "@/lib/relayResearch";

export const CASE_STATUSES = Object.freeze({
  researchPrototype: "research-prototype",
  futureWork: "future-work",
});

const sharedRelay = Object.freeze({
  slug: "relay",
  projectType: relayResearchDisclosure.projectType,
  status: CASE_STATUSES.researchPrototype,
  dataOrigin: relayResearchDisclosure.dataOrigin,
  researchSources: relayResearchSources,
  workflow: relayWorkflow,
  disclosures: Object.freeze({
    publicDeskResearch: true,
    syntheticData: true,
    participantResearchCompleted: relayResearchDisclosure.participantResearchCompleted,
    usabilityTestingCompleted: relayResearchDisclosure.usabilityTestingCompleted,
    businessImpactClaimed: relayResearchDisclosure.businessImpactClaimed,
  }),
});

const sections = {
  en: [
    {
      id: "problem",
      title: "Exceptions become customer failures when evidence has no owner.",
      body: "Order, payment, fulfillment, carrier, customer-service and compliance signals can disagree. Relay frames the work around the next defensible decision rather than another disconnected dashboard.",
    },
    {
      id: "constraints",
      title: "The product must make uncertainty visible.",
      body: "The prototype uses synthetic records, explicit permissions and source-labelled evidence. It does not replace an ERP, decide legal compliance or claim live integrations.",
    },
    {
      id: "workflow",
      title: "One path from queue to auditable closure.",
      body: "Prioritize the exception, investigate its evidence, assign ownership, choose a permitted resolution, obtain approval when required and close with an audit record.",
    },
    {
      id: "decisions",
      title: "Design decisions reduce ambiguity before they add speed.",
      body: "Relay treats ownership, deadline risk, evidence completeness and authority as first-class product states. The interface exposes why an action is available or blocked.",
    },
    {
      id: "prototype",
      title: "The evidence is a working React prototype.",
      body: "The implemented flow demonstrates queue prioritization, investigation, assignment, sensitive-resolution approval and chronological audit history with entirely synthetic data.",
    },
    {
      id: "validation",
      title: "Participant validation is planned, not implied.",
      body: "Desk research currently informs the workflow. Operator interviews and task-based usability sessions remain planned work; no business impact is claimed.",
    },
  ],
  fr: [
    {
      id: "problem",
      title: "Une exception devient un échec client lorsque les preuves n’ont pas de responsable.",
      body: "Les signaux de commande, paiement, traitement, transport, service client et conformité peuvent se contredire. Relay organise le travail autour de la prochaine décision défendable, pas d’un tableau de bord supplémentaire.",
    },
    {
      id: "constraints",
      title: "Le produit doit rendre l’incertitude visible.",
      body: "Le prototype utilise des dossiers synthétiques, des permissions explicites et des preuves dont la source est indiquée. Il ne remplace pas un ERP, ne décide pas de la conformité juridique et ne prétend pas disposer d’intégrations en direct.",
    },
    {
      id: "workflow",
      title: "Un seul parcours, de la file à une clôture vérifiable.",
      body: "Prioriser l’exception, examiner les preuves, attribuer la responsabilité, choisir une résolution autorisée, obtenir une approbation si nécessaire et clôturer avec une piste d’audit.",
    },
    {
      id: "decisions",
      title: "Les décisions de design réduisent l’ambiguïté avant d’accélérer le travail.",
      body: "Relay traite la responsabilité, le risque d’échéance, la complétude des preuves et l’autorité comme des états produit essentiels. L’interface explique pourquoi une action est disponible ou bloquée.",
    },
    {
      id: "prototype",
      title: "La preuve est un prototype React fonctionnel.",
      body: "Le parcours implémenté démontre la priorisation, l’analyse, l’attribution, l’approbation d’une résolution sensible et l’historique chronologique avec des données entièrement synthétiques.",
    },
    {
      id: "validation",
      title: "La validation avec des participants est prévue, pas sous-entendue.",
      body: "La recherche documentaire guide actuellement le parcours. Les entretiens opérateurs et les tests d’utilisabilité restent prévus ; aucun impact commercial n’est revendiqué.",
    },
  ],
};

const localizedCases = {
  en: [
    {
      ...sharedRelay,
      href: "/work/relay",
      statusLabel: "Research prototype",
      validationLabel: "Planned validation",
      title: "Resolving cross-border order exceptions before they become customer failures",
      shortTitle: "Relay",
      summary: "A decision workspace for European ecommerce teams coordinating fragmented order exceptions.",
      role: "Independent Product Designer and Front-end Prototyper",
      activities: ["Desk research", "Workflow modelling", "Interaction design", "UI system", "React prototype", "Accessibility review"],
      sections: sections.en,
      researchSummary: getRelayResearchSummary("en"),
    },
    {
      slug: "basis",
      href: null,
      status: CASE_STATUSES.futureWork,
      statusLabel: "Future work",
      projectType: "Independent Product / 2026",
      shortTitle: "Basis",
      title: "Turning dense operational interfaces into an accessible product system",
      summary: "A system extracted from implemented Relay needs, not a speculative component gallery.",
    },
    {
      slug: "signalroom",
      href: null,
      status: CASE_STATUSES.futureWork,
      statusLabel: "Future work",
      projectType: "Independent Product / 2026",
      shortTitle: "Signalroom",
      title: "Turning product signals into evidence-backed decisions",
      summary: "A future 0-to-1 product connecting product signals, evidence and recorded decisions.",
    },
  ],
  fr: [
    {
      ...sharedRelay,
      href: "/fr/work/relay",
      statusLabel: "Prototype de recherche",
      validationLabel: "Validation prévue",
      title: "Résoudre les exceptions de commande transfrontalières avant qu’elles ne deviennent des échecs client",
      shortTitle: "Relay",
      summary: "Un espace de décision pour les équipes e-commerce européennes qui coordonnent des exceptions de commande fragmentées.",
      role: "Designer produit indépendant et prototypage front-end",
      activities: ["Recherche documentaire", "Modélisation du parcours", "Design d’interaction", "Système UI", "Prototype React", "Revue d’accessibilité"],
      sections: sections.fr,
      researchSummary: getRelayResearchSummary("fr"),
    },
    {
      slug: "basis",
      href: null,
      status: CASE_STATUSES.futureWork,
      statusLabel: "Projet à venir",
      projectType: "Independent Product / 2026",
      shortTitle: "Basis",
      title: "Transformer des interfaces opérationnelles denses en système produit accessible",
      summary: "Un système extrait des besoins réellement implémentés dans Relay, et non une galerie spéculative de composants.",
    },
    {
      slug: "signalroom",
      href: null,
      status: CASE_STATUSES.futureWork,
      statusLabel: "Projet à venir",
      projectType: "Independent Product / 2026",
      shortTitle: "Signalroom",
      title: "Transformer les signaux produit en décisions étayées par des preuves",
      summary: "Un futur produit 0-to-1 reliant signaux produit, preuves et décisions consignées.",
    },
  ],
};

export function getPortfolioCases(lang = "en") {
  return localizedCases[lang] || localizedCases.en;
}

export function getPortfolioCase(slug, lang = "en") {
  return getPortfolioCases(lang).find((item) => item.slug === slug) || null;
}
