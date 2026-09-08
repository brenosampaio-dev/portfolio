// Generated reconstructions of the documented synthetic scenarios.
// These images illustrate the written records; they are not captured lab evidence.
const visuals = {
  "access-restored": {
    overview: {
      file: "access-overview",
      en: {
        title: "The incident starts with a sign-in loop",
        caption: "One employee can open Windows but cannot continue in Outlook or Teams. This reconstruction introduces the reported symptom and incident scope before the diagnostic checks.",
        alt: "Reconstructed Windows desktop showing an Outlook sign-in interruption beside incident INC-1047: one user, one device, repeated prompts after a password change.",
      },
      fr: {
        title: "L’incident commence par une boucle de connexion",
        caption: "Une personne peut ouvrir Windows, mais ne peut pas poursuivre dans Outlook ou Teams. Cette reconstitution présente le symptôme signalé et la portée de l’incident avant les contrôles diagnostiques.",
        alt: "Bureau Windows reconstitué montrant une interruption de connexion Outlook et le billet INC-1047 : une personne, un poste, des demandes répétées après un changement de mot de passe.",
      },
    },
    investigation: {
      file: "access-investigation",
      en: {
        title: "The device clock becomes the lead",
        caption: "Windows Time is running and TCP 443 is reachable. Comparing the device clock with the reference reveals the +08:14 drift described in the investigation.",
        alt: "Reconstructed Windows desktop with PowerShell checks and incident INC-1047 notes comparing device time 08:29:14 with reference time 08:21:00.",
      },
      fr: {
        title: "L’horloge du poste devient la piste principale",
        caption: "Windows Time fonctionne et le port TCP 443 est accessible. La comparaison avec l’heure de référence révèle le décalage de +08:14 décrit dans l’enquête.",
        alt: "Bureau Windows reconstitué avec les contrôles PowerShell et les notes du billet INC-1047 : heure du poste 08:29:14, heure de référence 08:21:00.",
      },
    },
    resolution: {
      file: "access-resolution",
      en: {
        title: "Resynchronize, then validate the user’s workflow",
        caption: "The reconstruction pairs the time-service correction with the scenario’s closure checks: clock difference under one second, browser sign-in, Outlook and Teams.",
        alt: "Reconstructed PowerShell resynchronization beside the INC-1047 validation record showing the clock, browser, Outlook and Teams checks completed in simulation.",
      },
      fr: {
        title: "Resynchroniser, puis valider le parcours utilisateur",
        caption: "La reconstitution relie la correction du service de temps aux contrôles de clôture du scénario : décalage inférieur à une seconde, connexion web, Outlook et Teams.",
        alt: "Resynchronisation PowerShell reconstituée à côté du dossier INC-1047 montrant les contrôles de l’horloge, du navigateur, d’Outlook et de Teams dans la simulation.",
      },
    },
  },
  "missing-reservation": {
    overview: {
      file: "reservation-overview",
      en: {
        title: "Accepted upstream, absent downstream",
        caption: "The event trace connects the accepted API request to a rejected webhook. A read-only query finds no reservation row: the starting point for investigating delivery without creating a duplicate.",
        alt: "Reconstructed integration workspace showing req_9c7f2a accepted with HTTP 202, event evt_7a31 rejected with HTTP 422 after three attempts, and a SQL query returning zero rows for RSV-8F31C.",
      },
      fr: {
        title: "Acceptée en amont, absente en aval",
        caption: "La trace relie la requête API acceptée au webhook rejeté. Une requête en lecture seule ne trouve aucune réservation : le point de départ pour enquêter sans créer de doublon.",
        alt: "Espace d’intégration reconstitué montrant req_9c7f2a accepté avec HTTP 202, evt_7a31 rejeté avec HTTP 422 après trois tentatives, et une requête SQL sans résultat pour RSV-8F31C.",
      },
    },
    investigation: {
      file: "reservation-investigation",
      en: {
        title: "The rejected field, in context",
        caption: "The webhook receives check_in as 23/09/2026 and rejects it with HTTP 422. The event and correlation IDs connect this response to the ticket and SQL record below.",
        alt: "Reconstructed API client showing reservation RSV-8F31C, check_in 23/09/2026, and a 422 response requiring YYYY-MM-DD; event evt_7a31, correlation req_9c7f2a.",
      },
      fr: {
        title: "Le champ rejeté, dans son contexte",
        caption: "Le webhook reçoit check_in au format 23/09/2026 et le rejette avec HTTP 422. Les identifiants d’événement et de corrélation relient cette réponse au billet et au dossier SQL ci-dessous.",
        alt: "Client API reconstitué montrant la réservation RSV-8F31C, check_in 23/09/2026 et une réponse 422 exigeant YYYY-MM-DD ; événement evt_7a31, corrélation req_9c7f2a.",
      },
    },
    resolution: {
      file: "reservation-resolution",
      en: {
        title: "One corrected event. One reservation.",
        caption: "The corrected date is 2026-09-23. A processed response and exactly one stored reservation illustrate the result checked after replay, including duplicate protection.",
        alt: "Reconstructed API and SQL workspace showing the corrected ISO date, event evt_7a31 processed, and one reservation record after the repeated idempotent replay.",
      },
      fr: {
        title: "Un événement corrigé. Une seule réservation.",
        caption: "La date corrigée est 2026-09-23. La réponse de traitement et l’unique réservation enregistrée illustrent la validation après relance, y compris la protection contre les doublons.",
        alt: "Espace API et SQL reconstitué montrant la date ISO corrigée, l’événement evt_7a31 traité et une seule réservation après la relance idempotente répétée.",
      },
    },
  },
  "connectivity-broke": {
    overview: {
      file: "network-overview",
      en: {
        title: "A shared setting connects three affected clients",
        caption: "The modeled LAN places the three Windows clients, gateway, retired DNS server and active resolver in one view. DHCP option 6 still points to 192.168.10.53, while the active resolver is 192.168.10.10.",
        alt: "Reconstructed network lab topology with three VLAN 10 clients, gateway 192.168.10.1, stale DHCP DNS 192.168.10.53, active DNS 192.168.10.10 and internal portal 192.168.20.25 on port 443.",
      },
      fr: {
        title: "Un paramètre partagé relie les trois postes touchés",
        caption: "Le réseau modélisé réunit les trois postes Windows, la passerelle, l’ancien DNS et le résolveur actif. L’option DHCP 6 désigne encore 192.168.10.53, alors que le résolveur actif est 192.168.10.10.",
        alt: "Topologie de labo reconstituée avec trois postes du VLAN 10, la passerelle 192.168.10.1, l’ancien DNS DHCP 192.168.10.53, le DNS actif 192.168.10.10 et le portail 192.168.20.25 sur le port 443.",
      },
    },
    investigation: {
      file: "network-investigation",
      en: {
        title: "IP connectivity works. Name resolution does not.",
        caption: "The gateway and public IP respond while nslookup times out against 192.168.10.53. The contrast isolates the DNS path before the shared DHCP setting is corrected.",
        alt: "Reconstructed Windows terminal with successful gateway and public IP pings, followed by a DNS timeout at 192.168.10.53 for portal.supportlab.test.",
      },
      fr: {
        title: "La connectivité IP fonctionne. La résolution de noms échoue.",
        caption: "La passerelle et l’IP publique répondent, tandis que nslookup expire sur 192.168.10.53. Ce contraste isole le chemin DNS avant la correction du paramètre DHCP partagé.",
        alt: "Terminal Windows reconstitué montrant des pings réussis vers la passerelle et l’IP publique, puis un délai DNS dépassé sur 192.168.10.53 pour portal.supportlab.test.",
      },
    },
    resolution: {
      file: "network-resolution",
      en: {
        title: "The renewed lease points to the active resolver",
        caption: "After renewal and cache clearing, the client uses DNS 192.168.10.10. The internal hostname resolves to 192.168.20.25 and the TCP 443 check succeeds.",
        alt: "Reconstructed Windows terminal showing DNS server 192.168.10.10, portal.supportlab.test resolving to 192.168.20.25, and a successful TCP 443 test; three clients validated in simulation.",
      },
      fr: {
        title: "Le bail renouvelé désigne le résolveur actif",
        caption: "Après le renouvellement et le vidage du cache, le poste utilise le DNS 192.168.10.10. Le nom interne se résout en 192.168.20.25 et le contrôle TCP 443 réussit.",
        alt: "Terminal Windows reconstitué montrant le serveur DNS 192.168.10.10, portal.supportlab.test résolu en 192.168.20.25 et un test TCP 443 réussi ; trois postes validés en simulation.",
      },
    },
  },
};

export function getCaseVisual(slug, phase, lang = "en") {
  const visual = visuals[slug]?.[phase];
  if (!visual) return null;
  return {
    src: `/images/case-studies/${visual.file}.webp`,
    width: 1536,
    height: 1024,
    ...visual[lang === "fr" ? "fr" : "en"],
  };
}

export const caseVisualLabels = {
  en: {
    disclosure: "AI-generated reconstruction · synthetic data",
    enlarge: "View full-size image",
    newTab: "opens in a new tab",
  },
  fr: {
    disclosure: "Reconstitution générée par IA · données synthétiques",
    enlarge: "Voir l’image en grand",
    newTab: "s’ouvre dans un nouvel onglet",
  },
};
