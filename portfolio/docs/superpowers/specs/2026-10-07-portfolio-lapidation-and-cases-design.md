# Portfolio Lapidation and Independent Case Ecosystem

**Date:** 2026-10-07

**Status:** Design specification for review

**Product:** Breno Sampaio portfolio

## 1. Objective

Refine the existing portfolio so it presents Breno first as a Product Designer who can simplify complex products, build coherent systems, and turn design decisions into working software.

This initiative is a lapidation of the existing product, not a structural redesign. The current page architecture, typography, motion language, fluidity, light/dark behavior, responsive foundation, header, portrait, and overall editorial character remain the base.

The portfolio will be rebuilt around three new independent projects:

1. **Product:** a complex B2B workflow.
2. **System:** an accessible design system extracted from real interface needs.
3. **Build:** a 0-to-1 AI/data product with a functional prototype.

The intended professional narrative is:

> problem -> system -> software

## 2. Success Criteria

The work is successful when:

- a recruiter understands `Product Designer` as the primary identity within the first screen;
- selected work is discoverable from Home and Work without passing through learning or support content;
- each case proves a distinct capability and can be defended without invented facts;
- code, React, SQL, and AI appear as tools used to make product decisions tangible;
- the portfolio no longer foregrounds Frontend, junior Design Engineer, Scrimba, or support simulations;
- the site feels more rigorous, spacious, and editorial through grid, alignment, scale, density, imagery, and editing;
- typography and motion are demonstrably unchanged;
- English and French surfaces remain coherent and accessible;
- all published routes pass the existing unit, build, navigation, accessibility, and responsive checks.

## 3. Non-negotiable Constraints

### 3.1 Typography is frozen

Do not change font families, font loading, font sizes, line heights, tracking, text scales, or typographic component variants.

Protected areas include:

- `design-system/tokens/fonts.css`
- `design-system/tokens/typography.css`
- typography declarations in `design-system/tokens/base.css`
- `src/components/ds/Text.jsx`
- font loading in `src/components/site/SiteDocument.jsx`
- typographic declarations in `src/app/globals.css`
- typographic declarations in `src/components/site/WorkShowcase.css`
- typographic declarations in `src/components/site/CaseVisual.css`
- social-image typography in `src/app/opengraph-image/route.js`

If a new component needs typography, it must consume an existing `Text` variant or an existing token without changing that token.

### 3.2 Motion and fluidity are frozen

Do not change animation behavior, scroll behavior, transitions, durations, easing, delays, transforms used by motion, sticky behavior, or reduced-motion behavior.

Protected areas include:

- `design-system/tokens/motion.css`
- `src/lib/motion.js`
- `Reveal.jsx`
- `Scramble.jsx`, except for a semantics-only accessibility wrapper that leaves the visual output identical
- `SmoothScroll.jsx`
- `ScrollProgress.jsx`
- `ProcessReveal.jsx`
- `CodeVeil.jsx`
- `ToTop.jsx`
- language-transition behavior in `AppContext.jsx`
- the existing GSAP behavior in `WorkShowcase.jsx`
- all existing animation, transition, duration, easing, and keyframe declarations

Existing wrappers and their delays must be preserved when content is replaced.

### 3.3 Honesty is part of the product

Every new case must state:

- `Independent Product / 2026`;
- the real status: Concept, Research prototype, Usability-tested prototype, or Functional prototype;
- the real role and activities completed;
- whether data is public, synthetic, or participant-generated;
- the limits of the validation.

Never invent a client, team, launch, adoption, production use, business impact, revenue, cost reduction, or efficiency gain.

Test findings are labeled `Validation results`, never `Business impact`.

## 4. Delivery Strategy

### Considered approaches

#### A. Build all three cases before touching the portfolio

This produces a complete reveal, but keeps the current positioning contradiction public for too long and increases the risk of three shallow cases.

#### B. Progressive proof, one complete case at a time — selected

Build the core workflow for Case 01, integrate it into Home and Work, then build the system and the 0-to-1 product. This creates a usable portfolio improvement at every stage and lets later work emerge from earlier product needs.

#### C. Redesign the portfolio shell first

This creates visible movement quickly but solves the least urgent problem. It also conflicts with the user's request to preserve the current structure, typography, and motion.

### Selected sequence

1. Correct the product definition and establish canonical content sources.
2. Design, validate, and publish Case 01.
3. Integrate Case 01 into Home and Work and correct the surrounding positioning.
4. Build Case 02 from actual interface needs revealed by Case 01.
5. Turn Labs into a small Systems Lab using implemented components.
6. Design, build, and validate Case 03 using the system where appropriate.
7. Complete the contemporary Swiss-inspired surface refinement.
8. Finish metadata, localization, accessibility, performance, and release QA.

## 5. Case 01 — Relay

### Editorial title

**Resolving cross-border order exceptions before they become customer failures**

### Purpose

Prove that Breno can receive a complex B2B workflow with fragmented data, multiple roles, permissions, deadlines, edge cases, and operational risk, then turn it into a usable product.

### Product concept

Relay is an independent B2B workspace for small and medium European ecommerce operations to coordinate order exceptions across store, supplier, carrier, customer support, and compliance.

### Primary users

- Operations lead
- Customer-support specialist
- Compliance reviewer
- Manager with approval authority

### Core problem

An order exception is spread across order records, email, tracking, documents, and notes. The team cannot quickly determine ownership, deadline risk, missing evidence, or permitted action.

### MVP

- prioritized exception queue;
- dense table with filters, saved views, and bulk actions;
- case detail with evidence and timeline;
- assignment, ownership, and SLA;
- role-based permissions;
- approval for sensitive actions;
- loading, empty, error, blocked, and resolved states;
- audit trail.

Out of scope: ERP replacement, consumer portal, live integrations, and AI.

### Primary workflow

`Exception queue -> investigate evidence -> assign or escalate -> choose resolution -> approve when required -> close with audit record`

### Research and validation

- desk research using public ecommerce, fulfillment, carrier, and customer-service documentation;
- five to seven interviews with ecommerce, customer-experience, logistics, or adjacent operators, with participant fit disclosed;
- current-workflow map;
- two task-based usability rounds;
- entirely synthetic order data, clearly labeled.

### Publishable outcomes

- raw participant task completion;
- median task time;
- critical errors and hesitation points;
- decisions changed between rounds;
- steps or ambiguities removed.

## 6. Case 02 — Basis

### Editorial title

**Turning dense operational interfaces into an accessible product system**

### Purpose

Prove that Breno can transform interface needs into an accessible, documented system shared by design and engineering.

### Product concept

Basis is an independent design system created from a real inventory of components needed by Relay and later exercised by Signalroom. It has real consumers without pretending organizational adoption.

### Primary users

- Product designers
- Front-end developers
- Accessibility and quality reviewers

### Core problem

Dense operational products accumulate duplicated values, inconsistent states, and components that work alone but fail in tables, forms, and multi-step workflows.

### Scope

- primitive, semantic, and component tokens;
- color, spacing, radius, elevation, and layout foundations;
- data table, filters, combobox, inputs, select, status, alert, drawer, modal, bulk-action bar, and navigation;
- form, filtering, review/approval, and system-state patterns;
- Figma variables and component properties;
- React/TypeScript and Storybook;
- keyboard, focus, contrast, semantics, and screen-reader behavior;
- contribution, documentation, versioning, and breaking-change process.

Typography uses the existing portfolio families or aliases. No font change is part of Basis.

### Validation

- real inventory of built interfaces;
- duplication and inconsistency matrix;
- keyboard, axe, contrast, and manual semantics checks;
- screen-reader testing when an appropriate environment is available;
- critical review with recruited designers or developers when available;
- controlled before/after composition exercise.

### Publishable outcomes

- duplicated values and patterns actually consolidated;
- implemented components and states;
- accessibility defects found and corrected;
- workflow coverage;
- measured time from the controlled exercise;
- qualitative reviewer feedback.

## 7. Case 03 — Signalroom

### Editorial title

**Turning product signals into evidence-backed decisions**

### Purpose

Prove that Breno can conceive, design, and build a technical 0-to-1 product in which AI amplifies judgment without replacing it.

### Product concept

Signalroom is an independent workspace for product teams to investigate behavioral changes across events, cohorts, feedback, and AI with traceable evidence.

It is not a chatbot attached to a dashboard. Its product core is the chain between signal, evidence, and decision.

### Primary users

- Product managers
- Product designers
- Growth and product analysts in small SaaS teams

### Core problem

Dashboards show that something changed, but the investigation becomes fragmented across analytics, feedback, support records, and documents. The final decision loses its evidence and assumptions.

### MVP

- anomaly inbox;
- metric drill-down;
- cohort and segment comparison;
- natural-language query;
- AI answers with source, query, and confidence;
- evidence board;
- decision record containing hypothesis, evidence, assumptions, and next step;
- published synthetic event schema and real SQL queries;
- functional React/TypeScript prototype.

Out of scope: automatic forecasting, magical recommendations, universal integrations, and autonomous actions.

### Primary workflow

`Open signal -> inspect metric -> compare cohort -> ask grounded question -> verify sources -> pin evidence -> record decision`

### Research and validation

- five to six interviews with product managers, designers, or analysts;
- comprehension tests for charts and cohorts;
- incomplete and ambiguous AI-response scenarios;
- controlled comparison with and without AI assistance;
- observation of whether sources are verified before a decision is recorded.

### Publishable outcomes

- raw task completion;
- time to locate sufficient evidence;
- interpretation errors;
- source-verification behavior;
- traceable answers and decision records;
- changes made after testing;
- verified functional and accessibility behavior.

## 8. Portfolio Information Architecture

### Home

Preserve the current macro structure and motion wrappers. Change content hierarchy so that:

1. Product Designer is the primary identity.
2. The lead communicates complex-product and systems capability.
3. The primary CTA leads to selected work.
4. GitHub moves from hero proof to supporting evidence.
5. Selected Work presents the published cases in Product -> System -> Build order.
6. Capabilities, experience, approach, About, and Contact support rather than repeat the same narrative.

### Work

Replace the paused-state page with:

- concise positioning intro;
- published cases;
- honest status for work not yet published;
- no support-simulation archive in the primary recruiter path.

The page should use the existing WorkShowcase behavior without editing its GSAP or responsive motion.

### Labs -> Systems Lab

Replace course-first content with a small set of implemented experiments. Initial candidates:

- data table;
- combobox;
- complex form or review/approval pattern.

Each experiment shows design behavior, system decisions, accessibility, and code. Scrimba may remain in About or the resume as learning context, but not as the page's main evidence.

### About

Keep the operational background, but frame it as domain depth that informs product judgment. Remove repetitive transition language and make Product Design the present identity.

### Contact

Replace `Frontend / Design Engineer role` with Product Design-aligned intent. Keep the current form structure, focus behavior, validation, delivery path, and touch-target behavior.

## 9. Content Architecture

Create one canonical source for the new portfolio narrative and cases instead of extending conflicting legacy stores.

Recommended structure:

- `src/lib/portfolioV2.js` for global bilingual portfolio content;
- `src/lib/portfolioCases.js` for case summaries, disclosure, status, metadata, and structured sections;
- `src/components/site/PortfolioCaseContent.jsx` for the shared case renderer;
- English routes at `/work/relay`, `/work/basis`, and `/work/signalroom`;
- French equivalents at `/fr/work/relay`, `/fr/work/basis`, and `/fr/work/signalroom`;
- localized case content in the canonical source and language switching that preserves the current case;
- `public/images/case-studies/<slug>/` for final case assets.

The new renderer should reuse existing shells such as `CaseHero`, `CaseSnapshot`, `CaseSection`, `DecisionsLedger`, `CaseVisual`, `Collapsible`, and `BrowserFrame`.

Do not expand the support-oriented `caseStudies.js` or revive the large legacy product narratives in `i18n.js`.

## 10. Visual Direction

The design language is contemporary Swiss-inspired editorial design, grounded by the current [Parloa website](https://www.parloa.com/) as a reference for principles rather than a source to copy.

The relevant qualities observed in the reference are:

- a rigorous modular grid with clearly aligned edges;
- generous negative space used to establish hierarchy;
- large editorial statements balanced by compact functional labels;
- predominantly left-aligned composition;
- numbered modules and explicit section logic;
- image and interface artifacts treated as deliberate grid blocks;
- controlled alternation between white space, neutral surfaces, and strong color fields;
- restrained navigation and clear primary actions;
- dense information grouped into legible systems instead of decorative card collections.

The portfolio must interpret these principles through its existing identity. It must not reproduce Parloa's orange palette, AI conversation motif, photography, component shapes, copy, or page composition.

Typography remains technically frozen. Swiss typographic principles are applied through alignment, measure, whitespace, grouping, hierarchy, and the disciplined use of the existing serif, sans, and mono roles. Font families, sizes, line heights, tracking, and text tokens do not change.

Allowed refinements:

- grid columns, alignment, margins, padding, gaps, widths, and grouping;
- content measure and the relationship between text and artifacts;
- borders, hairlines, radius, shadows, and surface colors;
- modular numbering and functional labels using existing text variants;
- density and content reduction;
- case imagery and artifact placement;
- light/dark surface calibration;
- click/touch areas that do not change visual motion.

Priority refinements after content exists:

1. Replace empty Work surfaces with case evidence organized on a clear modular grid.
2. Give every section a deliberate alignment relationship instead of centering content by habit.
3. Use large negative-space intervals to separate arguments and artifacts.
4. Simplify the dock's liquid-glass surface while preserving geometry and motion.
5. Reduce the global grid's visual contrast while making the layout grid more legible through alignment.
6. Reduce heavy card washes in capability and Work surfaces.
7. Prefer editorial hairlines, numbered blocks, and whitespace to nested cards.
8. Remove repeated copy across Home, Capabilities, Experience, and About.

Do not add Swiss flags, red-cross motifs, fake International Typographic Style posters, Bauhaus pastiche, gratuitous Helvetica imitation, or rigid decoration that harms usability.

## 11. Image and Artifact Strategy

Use the built-in GPT image generation workflow for conceptual visual assets and visual-direction exploration. Generated images supplement, but never replace, designed and implemented interface evidence.

### Visual exploration

Before implementation of each product UI:

- create exactly three independent visual directions;
- ground them in the existing portfolio palette and captured visual context;
- preserve the portfolio's existing typography in any direction intended for implementation;
- select one direction before building the real interface.

### Asset kit per case

- one 16:10 hero image;
- one problem-space or context visual;
- one flow or system map;
- two or three captures of real implemented product screens;
- one system/state detail;
- one validation or before/after artifact.

### Image rules

- generated context imagery is disclosed when conceptual;
- product UI is built and captured, not presented as a generated working product;
- no fake clients, company marks, participant evidence, dashboards, or research artifacts;
- the current paper, charcoal, and indigo palette remains the base, with strong color fields used only when they create hierarchy or distinguish case content;
- crisp grid relationships, controlled contrast, and asymmetric editorial composition;
- photography or conceptual imagery must occupy intentional grid modules rather than behave as decoration;
- no glossy AI-SaaS collage, neon gradient, floating glass card, generic Swiss-poster imitation, or device-mockup cliché.

## 12. Accessibility

Target WCAG 2.2 AA fundamentals and preserve the strong existing baseline.

Required checks include:

- semantic heading and landmark order;
- keyboard access and visible focus;
- 200% zoom and responsive reflow;
- meaningful image alt text and captions;
- charts and visual data with text equivalents;
- non-color state communication;
- loading, empty, error, permission, and blocked states;
- 44px comfortable target size where practical, never below WCAG 2.2 minimum;
- reduced-motion behavior preserved exactly.

The Scramble accessibility correction may separate the visual animated copy from a stable screen-reader string only if visual timing, characters, easing, and motion remain unchanged.

Do not claim screen-reader validation until a manual NVDA, VoiceOver, or equivalent test has actually been performed.

## 13. Localization

The public portfolio remains English/French.

Requirements:

- global positioning, Home, Work, Labs, About, Contact, case summaries, metadata, and disclosures exist in both languages;
- case content must not silently mix languages;
- every English case route has a French equivalent using the same slug, and the language switch maps directly between them;
- resume links and locale switching remain functional;
- machine translation is not treated as final editorial copy.

## 14. Metadata and Discovery

Update without changing social-image typography:

- English and French layout metadata;
- hub metadata;
- case metadata;
- `Person` structured data;
- Open Graph copy;
- sitemap entries;
- robots policy;
- canonical and alternate-language links where relevant.

## 15. Testing and Release Gates

Each release increment must pass:

- `npm run lint`
- `npm run test:unit`
- `npm run build`
- `npm run test:e2e`
- `npm run test:a11y`
- representative visual captures in light/dark at mobile and desktop widths
- keyboard-only inspection
- no horizontal overflow
- link, redirect, metadata, and locale checks
- `git diff --check`

Before each commit, verify:

- no protected typography file changed;
- no protected motion file changed;
- no font, size, line-height, tracking, transition, animation, easing, duration, or motion transform declaration changed;
- existing unrelated and untracked files remain untouched;
- only explicit `portfolio/**` paths are staged from the parent Git root.

## 16. Release Increments

### Release A — Product proof

- corrected product definition;
- Case 01 Relay;
- Home and Work integration;
- Product Designer positioning across core copy;
- obsolete primary support/front-end cues removed.

### Release B — System proof

- Case 02 Basis;
- Systems Lab foundation;
- About and Contact alignment;
- first real components and accessibility documentation.

### Release C — Build proof and final lapidation

- Case 03 Signalroom;
- functional prototype and data disclosure;
- final imagery;
- contemporary Swiss-inspired grid and surface refinement;
- localization, metadata, performance, and full QA.

## 17. Explicit Non-goals

- redesigning the portfolio shell;
- changing typography;
- changing motion, transitions, scrolling, or fluidity;
- presenting support simulations as Product Design work;
- presenting independent projects as client or production work;
- building a complete ERP, analytics platform, or enterprise design-system organization;
- publishing generated UI images as proof of a functional product;
- inventing research, participants, outcomes, or commercial metrics.

## 18. Primary Risks and Mitigations

### Three shallow projects

Mitigation: build and validate one release increment at a time.

### Fiction presented as experience

Mitigation: persistent Independent Product disclosure and explicit status/data labels.

### Signalroom becomes a generic AI dashboard

Mitigation: make source verification and decision records the core workflow, not chat.

### Basis is created before real needs exist

Mitigation: extract its inventory from Relay first and exercise it in Signalroom.

### Surface work damages the protected experience

Mitigation: isolate new CSS, freeze protected files/declarations, and compare diffs before every commit.

### Generated imagery weakens credibility

Mitigation: use image generation for visual direction and disclosed context assets; use real built-screen captures for product evidence.

## 19. First Implementation Boundary

The first implementation plan covers only Release A:

1. canonical content-model correction;
2. Relay research and product brief;
3. three visual directions for Relay;
4. selected direction translated into a focused prototype;
5. Relay case narrative and artifacts;
6. Home and Work integration;
7. copy alignment needed to remove the strongest positioning contradictions;
8. Release A validation.

Basis, Systems Lab expansion, Signalroom, and final surface refinement remain later plans. This boundary protects depth and prevents an all-at-once portfolio rewrite.
