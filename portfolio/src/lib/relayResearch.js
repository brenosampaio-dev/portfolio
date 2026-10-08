export const relayResearchDisclosure = Object.freeze({
  projectType: "Independent Product / 2026",
  status: "Research prototype",
  dataOrigin: "synthetic",
  participantResearchCompleted: false,
  usabilityTestingCompleted: false,
  businessImpactClaimed: false,
});

export const relayResearchSources = Object.freeze([
  {
    title: "Managing orders",
    url: "https://help.shopify.com/en/manual/fulfillment/managing-orders",
    publisher: "Shopify Help Center",
    accessedOn: "2026-10-08",
    supports: ["ecommerce-orders", "customer-service"],
    kind: "platform-documentation",
  },
  {
    title: "Understanding your order statuses",
    url: "https://help.shopify.com/en/manual/fulfillment/managing-orders/order-status",
    publisher: "Shopify Help Center",
    accessedOn: "2026-10-08",
    supports: ["ecommerce-orders"],
    kind: "platform-documentation",
  },
  {
    title: "Fulfilling orders using a fulfillment service with an app",
    url: "https://help.shopify.com/en/manual/fulfillment/fulfilling-orders/app-fulfillment",
    publisher: "Shopify Help Center",
    accessedOn: "2026-10-08",
    supports: ["ecommerce-orders", "carrier-tracking"],
    kind: "platform-documentation",
  },
  {
    title: "Order tracking at Shopify",
    url: "https://help.shopify.com/en/manual/fulfillment/setup/order-status-page/order-tracking",
    publisher: "Shopify Help Center",
    accessedOn: "2026-10-08",
    supports: ["carrier-tracking", "customer-service"],
    kind: "platform-documentation",
  },
  {
    title: "Shipment Tracking — Unified",
    url: "https://developer.dhl.com/tracking",
    publisher: "DHL API Developer Portal",
    accessedOn: "2026-10-08",
    supports: ["carrier-tracking"],
    kind: "carrier-documentation",
  },
  {
    title: "B2C e-commerce, distance and off-premises selling",
    url: "https://europa.eu/youreurope/business/selling-in-eu/selling-goods-services/ecommerce-distance-selling/index_en.htm",
    publisher: "European Union — Your Europe",
    accessedOn: "2026-10-08",
    supports: ["customer-service", "cross-border-compliance"],
    kind: "public-guidance",
  },
  {
    title: "General Product Safety Regulation — Regulation (EU) 2023/988",
    url: "https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=CELEX:32023R0988",
    publisher: "EUR-Lex",
    accessedOn: "2026-10-08",
    supports: ["cross-border-compliance"],
    kind: "public-guidance",
  },
  {
    title: "VAT special schemes — One Stop Shop",
    url: "https://taxation-customs.ec.europa.eu/taxation/vat/vat-special-schemes/vat-special-schemes-oss_en",
    publisher: "European Commission — Taxation and Customs Union",
    accessedOn: "2026-10-08",
    supports: ["cross-border-compliance"],
    kind: "public-guidance",
  },
  {
    title: "What data can we process and under which conditions?",
    url: "https://commission.europa.eu/law/law-topic/data-protection/reform/rules-business-and-organisations/principles-gdpr/overview-principles/what-data-can-we-process-and-under-which-conditions_en",
    publisher: "European Commission",
    accessedOn: "2026-10-08",
    supports: ["customer-service", "cross-border-compliance"],
    kind: "public-guidance",
  },
]);

export const relayWorkflow = Object.freeze([
  {
    id: "queue",
    decision: "Which exception needs attention first?",
    evidence: "Promised date, operational state, risk flags and current owner.",
  },
  {
    id: "investigate",
    decision: "What happened and which source can be trusted?",
    evidence: "Order, payment, fulfillment, carrier and customer-contact timeline.",
  },
  {
    id: "assign",
    decision: "Who owns the next action and when is it due?",
    evidence: "Role, permission, handoff reason and explicit service deadline.",
  },
  {
    id: "resolve",
    decision: "Which permitted resolution fits the available evidence?",
    evidence: "Replacement, refund, re-shipment or escalation requirements.",
  },
  {
    id: "approve",
    decision: "Does a sensitive action require a manager decision?",
    evidence: "Permission rule, rationale, amount and approval record.",
  },
  {
    id: "close",
    decision: "Is the case complete and auditable?",
    evidence: "Outcome, customer communication and chronological audit trail.",
  },
]);

const summaries = {
  en: {
    lang: "en",
    validationLabel: "Planned validation",
    verifiedFacts: [
      "Order, payment, fulfillment and return states can evolve independently.",
      "External fulfillment and carrier events can be asynchronous, incomplete or inconsistent.",
      "EU distance selling creates delivery, complaint, refund and transport-risk obligations.",
      "Cross-border operations may depend on destination, VAT scheme and product-safety evidence.",
    ],
    designAssumptions: [
      "A shared exception queue could make fragmented operational evidence easier to act on.",
      "Ownership, deadlines, permissions and an audit trail may reduce ambiguity at handoffs.",
      "Relay should flag VAT and product-safety evidence without pretending to decide legal compliance.",
    ],
    openQuestions: [
      "Which exceptions happen most often and create the greatest operational risk?",
      "Which system is trusted when store, supplier and carrier records disagree?",
      "Who may approve refunds, replacements, re-shipments and cancellations?",
      "Which personal data is necessary for the task, and how long should it remain visible?",
    ],
  },
  fr: {
    lang: "fr",
    validationLabel: "Validation prévue",
    verifiedFacts: [
      "Les états de commande, paiement, traitement et retour peuvent évoluer séparément.",
      "Les événements de traitement externe et de transport peuvent être asynchrones, incomplets ou incohérents.",
      "La vente à distance dans l’UE implique des obligations de livraison, réclamation, remboursement et risque de transport.",
      "Les opérations transfrontalières peuvent dépendre de la destination, du régime de TVA et des preuves de sécurité produit.",
    ],
    designAssumptions: [
      "Une file d’exceptions partagée pourrait rendre des preuves dispersées plus faciles à exploiter.",
      "La responsabilité, les échéances, les permissions et une piste d’audit peuvent réduire l’ambiguïté des transmissions.",
      "Relay doit signaler les preuves TVA et sécurité sans prétendre décider de la conformité juridique.",
    ],
    openQuestions: [
      "Quelles exceptions sont les plus fréquentes et les plus risquées ?",
      "Quelle source fait foi quand la boutique, le fournisseur et le transporteur se contredisent ?",
      "Qui peut approuver remboursements, remplacements, réexpéditions et annulations ?",
      "Quelles données personnelles sont nécessaires et combien de temps doivent-elles rester visibles ?",
    ],
  },
};

export function getRelayResearchSummary(lang = "en") {
  return summaries[lang] || summaries.en;
}
