# Swiss Editorial Landing Foundation — Design Specification

**Status:** Ready for Breno's review

**Date:** 2026-10-03

**Scope:** The visual and structural foundation for the first viewport and the transition into Selected Work: global header, desktop progress rail, mobile progress dock, hero, the opening of Selected Work, and one representative editorial project card.

**Out of scope:** Full landing-page implementation, case-study redesign, final case selection, new biographical claims, the Swiss-army-knife concept, production deployment, domain changes, and replacement of the existing routing or localization architecture.

## 1. Approved Direction

This is an evolutionary redesign, not a reskin and not a clean-sheet rebuild.

The implementation will preserve the current portfolio's motion engine, orientation logic, accessibility foundations, content truth, and technical structure. It will replace the current visual identity with an elegant Swiss editorial system derived from the three October 2026 portfolio documents.

The intended result combines:

- Swiss discipline in typography, grid, proportion, asymmetry, and restrained colour;
- Apple-like precision in feedback, continuity, easing, and directness;
- Awwwards-level authorship through composition and motion rather than spectacle;
- Breno's current honest positioning as a Product Designer building with code.

The site must feel more distinctive and visibly redesigned while remaining immediately usable by recruiters, design leads, and engineers.

## 2. Sources of Truth

The redesign reconciles these sources in this order:

1. verified content and functionality in the repository;
2. `02_ARQUITETURA_PORTFOLIO_BRENO.md` for page and case hierarchy;
3. `01_INVESTIGACAO_PORTFOLIO_BRENO.md` for positioning, evidence, and honesty;
4. `03_BRIEF_CODEX_SWISS_PRECISION_PORTFOLIO_BRENO.md` for the Swiss visual direction and working contract;
5. the current portfolio for protected motion and orientation behaviour.

No concept, placeholder, or example from the attached documents becomes a public biographical or project claim without repository evidence or Breno's confirmation.

## 3. Success Criteria

The first implementation succeeds when:

- a side-by-side comparison makes the visual change obvious without explanation;
- the interface still has the life, fluidity, orientation, and accessibility of the current portfolio;
- typography, palette, grid, composition, spacing, cards, and chrome visibly belong to one Swiss editorial system;
- the hero communicates `Product Designer`, location, positioning, and primary actions within ten seconds;
- Selected Work becomes the next visual priority after the hero;
- the progress rail remains recognizable while becoming a functional Swiss instrument scale;
- the representative project card reads as editorial evidence, not a SaaS dashboard tile;
- no meaningful visible text is smaller than 12px;
- the composition works at 390px and 1440px before the design expands to the rest of the site;
- reduced-motion, keyboard, contrast, semantics, and touch behaviour remain release gates;
- nothing is deployed before Breno reviews the local result and explicitly authorizes deployment.

## 4. What Is Preserved

### 4.1 Motion and orientation

Preserve the behaviour and responsibilities of:

- `SmoothScroll` and Lenis on pointer devices;
- native scrolling on touch and reduced-motion devices;
- `Reveal` and masked title reveals;
- `Scramble` as a rare technical accent, not a default effect;
- the route-aware `ScrollProgress` system;
- desktop active-section tracking, hover preview, and section labels;
- the mobile/touch progress dock, tap navigation, and swipe navigation;
- header and dock adaptation over contrasting content;
- visible focus, skip navigation, back-to-top, and reduced-motion fallbacks.

The implementation may refine timing, shape, and appearance. It must not remove these behaviours or create a parallel navigation system.

### 4.2 Technical and content structure

Preserve:

- Next.js App Router and current locale routes;
- English and French content architecture;
- current CV, contact, GitHub, LinkedIn, theme, and language functionality;
- semantic `main section[id]` regions used by progress tracking;
- current SEO and structured-data foundations;
- truthful public project status.

## 5. What Changes

The first implementation changes:

- the complete type system;
- light and dark palettes;
- hero composition and spacing;
- header surface language;
- desktop rail geometry and active-state treatment;
- mobile dock visual language;
- page grid and responsive margins;
- Selected Work opening and card anatomy;
- border, radius, surface, and image-frame rules;
- reveal sequencing and transition cadence within the scoped area.

The current portrait remains available for the hero during this phase. It may be repositioned or recropped, but it will not be replaced by a decorative concept object.

## 6. Typography

### 6.1 Families

Use an open-licensed Swiss-inspired grotesk system:

- **Inter Tight Variable:** display headings and page-defining statements;
- **Inter Variable:** body, navigation, controls, and functional headings;
- **IBM Plex Mono:** indices, coordinates, status, metadata, and technical evidence only.

Remove Cormorant Garamond from the redesigned scoped area. Do not introduce commercial fonts such as Suisse Int'l or Neue Haas Grotesk without a verified applicable web licence.

### 6.2 Typographic roles

| Role | Desktop | Mobile | Weight | Leading |
|---|---:|---:|---:|---:|
| Hero display | `clamp(4.75rem, 7.4vw, 7.25rem)` | `clamp(3rem, 13vw, 4.25rem)` | 350–420 | 0.94–1.00 |
| Section H2 | `clamp(2.75rem, 4.6vw, 4.75rem)` | `clamp(2.25rem, 9vw, 3.25rem)` | 400–500 | 1.00–1.08 |
| Card title | 28–38px | 24–30px | 400–500 | 1.05–1.12 |
| Lead | 18–20px | 17–18px | 400 | 1.50–1.62 |
| Body | 17–18px | 16–17px | 400 | 1.55–1.68 |
| Metadata | 12–13px | 12px | 450–550 | 1.35–1.50 |

Rules:

- display tracking ranges from `-0.045em` to `-0.025em` after visual inspection;
- body copy remains between 58 and 72 characters per line;
- uppercase is limited to short eyebrows, indices, and technical metadata;
- mono never becomes the primary body or heading face;
- hierarchy comes from scale, weight, placement, and space before colour.

## 7. Colour

### 7.1 Light theme

| Role | Value | Use |
|---|---:|---|
| Paper | `#F5F3ED` | primary canvas |
| Surface | `#EBE8E0` | quiet grouped areas and image backing |
| Ink | `#151515` | primary type and decisive rules |
| Muted | `#5C5C58` | secondary copy and metadata |
| Hairline | `#CECBC3` | functional separators |
| Signal | `#B4232B` | active progress, focus, selection, or one critical cue |

### 7.2 Dark theme

| Role | Value | Use |
|---|---:|---|
| Paper | `#11110F` | primary canvas |
| Surface | `#1B1B18` | quiet grouped areas |
| Ink | `#F5F3ED` | primary type |
| Muted | `#AAA69E` | secondary copy and metadata |
| Hairline | `#353531` | functional separators |
| Signal | `#D14A50` | accessible active and focus state |

Rules:

- signal red is functional and normally occupies less than 3% of a viewport;
- project images keep their original colours;
- large decorative gradients are excluded;
- colour never acts as the only state indicator;
- all meaningful text and controls must pass WCAG 2.2 AA contrast.

## 8. Grid and Spacing

### 8.1 Grid

- desktop: 12 columns, 20–24px gutters;
- tablet: 6 columns, 18–20px gutters;
- mobile: 4 columns or a single readable content flow, 12–16px gutters;
- maximum content width: approximately 1440px;
- page margin: `clamp(20px, 4.5vw, 76px)`;
- the desktop progress rail occupies the outer orientation gutter and does not steal a content column;
- the grid remains invisible by default.

### 8.2 Spacing

Use an 8px base with the scale `8, 16, 24, 32, 48, 64, 96, 128, 160`.

Spacing is semantic, not uniform:

- hero receives the largest opening field;
- the transition from hero to Selected Work is shorter and more decisive;
- section headings, images, metadata, and body copy use different intervals based on hierarchy;
- desktop section spacing may range from 96px to 160px;
- mobile section spacing may range from 64px to 88px;
- repeating the same section padding across the landing is prohibited.

## 9. Landing Structure

The complete landing will follow the architecture below, although the first implementation covers only items 1 and 2:

1. **Hero / positioning**
2. **Selected Work**
3. **How I Think & Work**
4. **From Design to Build**, only when supported by real evidence
5. **About & Experience**
6. **Contact / Next Step**

Capabilities must not become a large duplicated inventory section if Product, Systems, and Build are already demonstrated through work and evidence. The full landing should favour proof over lists of skills.

## 10. Header

Preserve the current header's functional content, responsive controls, language, theme, CV, and adaptive contrast.

Redesign its surface as follows:

- lighter visual weight and fewer nested pills;
- one coherent container rather than a collection of capsules;
- restrained blur may remain as material feedback, but glass is not the main visual concept;
- hairline separators follow the Swiss grid;
- active navigation uses position, weight, or a small signal marker rather than a filled decorative chip;
- the CV remains the strongest utility action;
- header height, hit targets, and responsive collapse remain accessible.

## 11. Hero

### 11.1 Content hierarchy

The hero communicates, in order:

1. `Product Designer · Based in Spain`;
2. one positioning headline grounded in verified experience;
3. one short supporting statement;
4. `View selected work` and `Download CV`;
5. restrained evidence of Product, Systems, and Build as supported capabilities, not job-title inflation.

The public title remains `Product Designer`. `Design Engineer` may describe a direction or target only where the wording remains honest.

### 11.2 Composition

- desktop uses an asymmetric 7/5 or 8/4 relationship;
- headline leads and may cross multiple grid columns without centring;
- the portrait sits in the secondary field and is recropped to support, not compete with, positioning;
- whitespace is an active compositional element;
- CTA placement follows reading order and remains immediately recognizable;
- mobile uses a single-column reading sequence, with the portrait following the primary message and actions.

## 12. Progress Rail and Mobile Dock

The current progress system becomes a restrained Swiss instrument scale.

Desktop treatment:

- one hairline vertical axis;
- numbered section stops;
- small calibrated ticks only where they clarify position;
- one signal-red active marker;
- the current active label continues to track the marker;
- hover preview and click navigation remain available;
- no ornamental chronograph arcs, dials, or continuous motion.

Mobile treatment:

- preserve the compact bottom dock, tap navigation, swipe navigation, and active name;
- simplify its surface to a single precise control;
- do not reproduce the vertical rail on a small screen;
- preserve safe-area spacing and minimum touch targets.

## 13. Selected Work and Project Card

### 13.1 Section opening

Selected Work follows the hero directly and receives the landing's second-highest visual priority.

Its opening contains:

- indexed section label;
- decisive H2;
- one sentence describing the evidence standard;
- optional `View all work` link when the destination contains meaningful work.

### 13.2 Card anatomy

The representative card is an editorial project band, not a floating dashboard tile.

Desktop anatomy:

- 7–8 columns for the real product image or internal placeholder;
- 4–5 columns for problem-led title, verified project type, role, status, contribution, and action;
- visible index and year/status metadata;
- one clear action: `View case study`;
- 1px structural rules instead of a full rounded container;
- no decorative tags that duplicate the summary.

Mobile anatomy:

- image first;
- title and summary second;
- role/status metadata grouped into a readable two-column or stacked list;
- CTA last;
- no horizontal carousel dependency.

### 13.3 Content constraint

The current public selection is paused, and the cases currently present in `caseStudies.js` are support simulations rather than the Product Design work prioritized by the new brief.

Therefore:

- the local visual implementation may use `[PLACEHOLDER — CASE NOT SELECTED]` inside the card;
- the placeholder must be visibly marked as internal preview content;
- no placeholder or simulated support case is published as Product Design evidence;
- the public Selected Work state remains truthful until Breno selects and supplies an appropriate case.

## 14. Motion Direction

Motion is organized into four reusable families:

1. **Reveal:** masks and opacity reveal type and imagery according to reading order.
2. **Continuity:** existing elements transform or move into their next state instead of disappearing and reappearing.
3. **Orientation:** rail, dock, header, and section state continuously communicate location.
4. **Response:** pointer, keyboard focus, press, and scroll receive brief, precise feedback.

### 14.1 Scoped sequence

Hero entrance:

- metadata resolves first;
- headline rises through a grid-aligned mask;
- supporting copy and CTAs follow with restrained stagger;
- portrait reveals through one controlled crop transition;
- rail draws once and settles into navigation state.

Hero to Selected Work:

- the hero does not vanish abruptly;
- the next section enters through a decisive spatial cut;
- the rail changes active state concurrently;
- no scroll-jacking or mandatory animation blocks reading.

Project-card interaction:

- image crop or scale responds subtly, normally within 1–2%;
- the title, rule, or action receives a short shared-state response;
- signal red communicates focus/selection, not decoration;
- keyboard focus receives equivalent visible feedback;
- touch does not depend on hover.

### 14.2 Timing

- micro feedback: 120–180ms;
- hover/focus morph: 160–240ms;
- layout transition: 300–480ms;
- hero illustrative entrance: up to 700ms for the longest element;
- rail entrance: 1000–1400ms, once per route;
- no indefinite animation on primary content.

## 15. Shape, Surface, and Imagery

- squared or minimally rounded editorial frames are the default;
- large capsules and high radii are reserved for genuinely tactile controls;
- borders define structure only where grouping or sequence requires them;
- shadows are subtle and exceptional;
- the portrait and project imagery remain legible and undistorted;
- client or project screenshots are never recoloured to match the portfolio palette;
- perspective mockups do not replace readable interface evidence.

## 16. Component Boundaries

Implementation should evolve the existing system rather than create a second application.

Expected affected areas include:

- design-system font, colour, typography, spacing, and motion tokens;
- `SiteDocument` font loading;
- `Header` visual styles without changing its behavioural contract;
- landing hero markup and styles;
- `ScrollProgress` and dock styles while preserving current logic;
- `Reveal` timing only if required by the new tokens;
- a focused editorial Selected Work/card component;
- relevant unit, visual, navigation, and accessibility tests.

New visual logic should be componentized. The hero, progress navigation, and project card must remain independently understandable and testable.

## 17. Responsive and Accessibility Requirements

Validate at minimum:

- 390×844 mobile;
- 768×1024 tablet;
- 1440×900 desktop.

Requirements:

- no horizontal overflow;
- no clipped display type;
- minimum 12px meaningful text;
- visible focus and logical focus order;
- minimum accessible control targets;
- semantic headings and landmarks remain intact;
- no information is available only through motion, hover, colour, or pointer position;
- `prefers-reduced-motion` renders all content immediately and preserves navigation;
- touch uses native scrolling and does not inherit pointer-only behaviour;
- contrast passes WCAG 2.2 AA.

## 18. Validation and Review Gates

Before expanding the redesign beyond this foundation:

1. capture the current and proposed states at 390×844 and 1440×900;
2. show Breno the local result side by side;
3. demonstrate hero entrance, scroll transition, rail progress, card hover/focus, touch behaviour, and reduced motion;
4. run lint, unit tests, focused navigation tests, accessibility checks, build, and visual captures;
5. disclose any skipped runtime or browser checks;
6. obtain Breno's approval of the visual foundation.

Only after this gate may the same system expand to the remaining landing sections and case-study templates.

Production deployment requires a separate, explicit authorization after implementation review. A successful local build or commit is not deployment approval.

## 19. Non-Goals and Anti-Patterns

Do not:

- reintroduce the Swiss-army-knife concept during this phase;
- build three complete alternative websites;
- embed token sheets, QA labels, review controls, or design-board annotations inside the portfolio UI;
- reduce Swiss design to boxes, permanent grid lines, tiny mono labels, red decoration, or arbitrary instrument marks;
- preserve the current page composition so closely that the redesign is visually imperceptible;
- replace truthful project status with invented case-study evidence;
- use WebGL, Three.js, or another dependency without a demonstrated need;
- deploy, change domains, or alter production configuration during exploration.

## 20. First Implementation Deliverable

The first implementation deliverable is intentionally narrow:

- redesigned global header;
- Swiss editorial hero using current verified content and portrait;
- redesigned desktop progress rail and mobile dock appearance;
- opening of Selected Work;
- one representative editorial project card using a clearly marked internal placeholder if no case is selected;
- desktop and mobile captures;
- a short motion demonstration;
- before/after evidence;
- no production deployment.

This deliverable becomes the visual contract for the rest of the landing only after Breno approves it.
