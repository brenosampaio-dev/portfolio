# Relay desk research register

**Accessed:** 2026-10-08  
**Project:** Independent Product / 2026  
**Current status:** Research prototype  
**Data policy:** Product records used in the prototype are synthetic. No participant research or usability testing has been completed yet.

## Research boundary

This register grounds Relay in current public documentation. It supports the domain model and identifies plausible operational states; it does not prove that the proposed product solves a frequent or severe user problem. Shopify and DHL document their own systems rather than a universal ecommerce workflow. European Union guidance establishes a regulatory context but is not a substitute for legal advice or applicable national rules.

## Public source register

| Source | Publisher | Kind | What it supports |
| --- | --- | --- | --- |
| [Managing orders](https://help.shopify.com/en/manual/fulfillment/managing-orders) | Shopify Help Center | Platform documentation | Order operations span payment, fulfillment, tracking, changes, cancellation, returns and refunds. |
| [Understanding your order statuses](https://help.shopify.com/en/manual/fulfillment/managing-orders/order-status) | Shopify Help Center | Platform documentation | Order, payment, fulfillment and return are separate state dimensions that can require different actions. |
| [Fulfilling orders using a fulfillment service with an app](https://help.shopify.com/en/manual/fulfillment/fulfilling-orders/app-fulfillment) | Shopify Help Center | Platform documentation | Third-party fulfillment includes requests, acceptance or rejection, cancellation and timeline communication; local and external states can diverge. |
| [Order tracking at Shopify](https://help.shopify.com/en/manual/fulfillment/setup/order-status-page/order-tracking) | Shopify Help Center | Platform documentation | Tracking can arrive automatically or manually and may be missing or attached to an incorrect carrier. |
| [Shipment Tracking — Unified](https://developer.dhl.com/tracking) | DHL API Developer Portal | Carrier documentation | Carrier data can provide current status, timestamps, locations, delivery estimates, history and delay information. |
| [B2C e-commerce, distance and off-premises selling](https://europa.eu/youreurope/business/selling-in-eu/selling-goods-services/ecommerce-distance-selling/index_en.htm) | European Union — Your Europe | Public guidance | Delivery, complaint, withdrawal, refund and transport-risk responsibilities affect post-purchase operations. |
| [General Product Safety Regulation](https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=CELEX:32023R0988) | EUR-Lex | Binding regulation | Distance-sale offers may need traceable manufacturer, responsible-person, product and safety information. |
| [VAT special schemes — One Stop Shop](https://taxation-customs.ec.europa.eu/taxation/vat/vat-special-schemes/vat-special-schemes-oss_en) | European Commission — Taxation and Customs Union | Public guidance | Cross-border B2C ecommerce can involve OSS/IOSS records and destination-dependent VAT context. |
| [GDPR processing principles](https://commission.europa.eu/law/law-topic/data-protection/reform/rules-business-and-organisations/principles-gdpr/overview-principles/what-data-can-we-process-and-under-which-conditions_en) | European Commission | Public guidance | Operational interfaces should expose only personal data necessary for the stated purpose. |

Every source above was accessed on 2026-10-08.

## Verified workflow facts

- A single order can carry independent payment, fulfillment, return and overall statuses.
- An external fulfillment service may accept, reject, cancel or continue work asynchronously.
- Tracking evidence can be incomplete, delayed or inconsistent with the store record.
- Carrier histories may contain multiple timestamped events and delay information.
- Post-purchase handling includes delivery problems, withdrawal, returns, refunds and complaints.
- Cross-border work may require destination, VAT and product-safety context.
- Personal data should be limited to what the operational task requires.

## Design assumptions — not yet validated

- Operators will benefit from a shared exception queue spanning store, fulfillment, carrier, customer contact and compliance evidence.
- Priority should combine promised date, customer urgency, operational deadline, financial exposure and compliance risk.
- A dedicated exception case will be clearer than forcing every decision into the underlying order record.
- Provenance and confidence labels will help people reconcile conflicting events.
- Ownership, SLA, role-based permissions, approval and audit history are the right controls.
- Relay should surface VAT and product-safety flags but must not calculate or declare legal compliance.

## Questions for participant research

1. Which exception types happen most often, and which create the greatest risk?
2. Is the first useful scope conventional DTC, multi-supplier ecommerce or a marketplace?
3. Which system is treated as the source of truth when records disagree?
4. Who may approve refunds, replacements, re-shipments and cancellation?
5. Which deadlines are operational and which follow a legal or contractual requirement?
6. What minimum evidence is needed before choosing a resolution?
7. Which VAT or product-safety signals are useful without turning the tool into legal advice?
8. Which personal data is necessary, and when should it be hidden or removed?
9. Which integrations should be simulated and which are worth implementing?

## Planned validation

- Recruit five to seven ecommerce, customer-experience, logistics or adjacent operators and disclose participant fit.
- Map the present workflow and the sources consulted during a real exception.
- Run two task-based prototype rounds.
- Report task completion as raw counts, median time, critical errors, hesitations and design changes.
- Do not report business impact, cost reduction, production use or organizational adoption without real evidence.
