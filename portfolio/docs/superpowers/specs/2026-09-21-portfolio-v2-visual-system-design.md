# Portfolio v2 — Visual System Specification

**Status:** Draft for Breno's review

**Date:** 2026-09-21

**Selected direction:** Shibui Digital / Technical Iki

**Scope:** Visual foundations, colour, typography, spacing, layout rhythm, shape, materiality, elevation, motion cadence, responsive behaviour, accessibility, component-level visual rules, migration boundaries, and visual acceptance criteria.

**Out of scope:** Copy changes, case-study content, information architecture changes, wireframes, component implementation, new imagery, deployment, and removal or replacement of the existing motion/navigation system.

**Companion specifications:** `2026-09-21-portfolio-v2-information-architecture-design.md` remains the source of truth for page hierarchy, content, recruiter journeys, URLs, and evidence gates. `2026-09-21-portfolio-v2-delivery-strategy-design.md` governs access protection, direct work on `main`, recovery, phase order, the case-study freeze, and release sequencing. This document governs the visual layer. If the documents appear to conflict, preserve the information architecture for product truth, the delivery strategy for execution order, and this specification for presentation.

## 1. Purpose

Portfolio v2 should feel calm, precise, crafted, contemporary, and technically credible without becoming another generic minimalist portfolio or another rounded SaaS landing page.

The visual system must communicate:

1. Breno can exercise visual judgment, not only apply components.
2. Breno understands the relationship between design and implementation.
3. The interface respects evidence, accessibility, and user orientation.
4. Japanese aesthetic principles influence the system structurally rather than appearing as decorative cultural references.
5. The current motion and progress-navigation identity remains recognizable.

The target impression is:

> **Quiet confidence, technical clarity, and visible craft.**

The site must not imitate traditional Japanese objects, calligraphy, temples, paper textures, or symbols. The influence comes from proportion, restraint, asymmetry, timing, useful craft, and the relationship between filled and empty space.

## 2. Success Criteria

The visual redesign succeeds when:

- the portfolio remains immediately recognizable as the same product;
- the desktop progress rail, mobile case dock, sticky project scenes, glass header, reveals, Scramble, smooth scrolling, collapsibles, image expansion, and back-to-top behaviour remain present;
- empty space creates hierarchy instead of length for its own sake;
- the palette feels warmer and more material without losing the technical slate/indigo identity;
- rounded shapes become intentional exceptions rather than the default treatment for every container;
- typography remains editorial but stops repeating the same sans-plus-italic formula in every major heading;
- no meaningful visible text is smaller than 12px;
- long case studies develop a visible beginning, progression, and conclusion;
- light and dark themes feel like the same system rather than separate brands;
- the interface remains comfortable at 320px, 390px, 768px, 1024px, and 1440px;
- WCAG 2.2 AA requirements and reduced-motion behaviour remain release gates.

## 3. Current-State Assessment

### 3.1 Design-system maturity

The current system is **Level 2 — Defined, approaching Level 3 — Managed**.

Evidence:

- primitive colour, type, spacing, radius, elevation, and motion tokens exist;
- reusable design-system components exist;
- light and dark themes exist;
- responsive and reduced-motion behaviours exist;
- global components share a recognizable visual language;
- app-level overrides currently replace foundational design-system values;
- some component values remain hardcoded outside the token layer;
- the visual rules are described in comments but not yet governed by one normative specification.

The v2 implementation should consolidate the system rather than create a second parallel layer.

### 3.2 Strengths to retain

- restrained colour usage;
- DM Sans, Cormorant Garamond, and monospace roles;
- editorial scale and strong heading contrast;
- asymmetric About composition;
- generous reading line-height;
- project-card sticky scenes;
- visible section progress and exact location awareness;
- glass header and dock;
- dark/light adaptation over contrasting content;
- mobile reflow without horizontal overflow;
- reduced-motion fallbacks;
- large invisible hit areas around visually small dots.

### 3.3 Problems to correct

- 120px section spacing is applied too uniformly;
- project cards can contain more empty vertical area than meaningful content;
- the documented washi/clay material intent is overridden by neutral white and cool slate in production;
- large radii, capsules, glass, and soft shadows appear too frequently;
- mixed sans/serif headings repeat with insufficient variation;
- some technical labels are 10–11px despite the system claiming a higher minimum;
- borders can become too faint to establish meaningful grouping;
- long case studies maintain one tempo for almost their entire length;
- Scramble can keep nonessential labels visibly unresolved for too long;
- polished surfaces show little evidence of process, construction, or useful irregularity.

## 4. Aesthetic Principles and Their Digital Translation

These principles are design constraints, not decorative themes.

| Principle | Meaning in this system | Required translation |
|---|---|---|
| Ma / Yohaku | Meaningful interval and surrounding field | Space varies according to hierarchy; empty space must separate, frame, or build anticipation |
| Kanso | Complete simplicity | Remove redundant decoration, not evidence, navigation, or useful states |
| Fukinsei | Intentional asymmetry | Major layouts use unequal but balanced column relationships tied to content priority |
| Shizen | Naturalness without pretense | Avoid ornamental effects that call attention to themselves or imitate physical materials literally |
| Shibui | Quiet, discoverable sophistication | Use restrained colour, precise detail, and depth that becomes visible through interaction |
| Iki | Technical refinement with tension | Preserve one controlled accent, crisp type, and contrast between soft and sharp forms |
| Yugen | Depth through suggestion | Reveal detail progressively; do not expose every layer with equal emphasis |
| Kire | Cut and continuity | Use decisive separators, section endings, crop boundaries, and transitions |
| Seijaku | Calm | Motion and colour never compete with evidence or reading |
| Datsuzoku | Controlled break from convention | Each major page receives one intentional visual interruption rather than repeating a template indefinitely |
| Jo-Ha-Kyu | Beginning, development, acceleration | Page and motion cadence must visibly progress rather than remain uniformly slow |
| Mingei | Honest usefulness and craft | Interfaces, states, components, and implementation evidence are presented as valuable artefacts |
| Omotenashi | Anticipatory care | Orientation, touch targets, contrast, focus, language, theme, and reduced motion work without user effort |
| Kansei | Feelings translated into specifications | “Calm, precise, crafted, technical” must map to measurable tokens and component rules |

## 5. Non-Negotiable Continuity Requirements

The following are protected. Implementation may refine tokens and cadence within this specification but must not remove, replace, or fundamentally redesign them:

### 5.1 Global motion and orientation

- desktop `ScrollProgress` rail in the left gutter;
- rail line, dots, active pulse, hover preview, and active label;
- active-section tracking based on viewport progress;
- compact mobile/touch dock;
- active section name that follows the active dot;
- tap and horizontal-swipe navigation between case sections;
- dock light/dark adaptation;
- smooth scrolling;
- route-aware entrances;
- back-to-top behaviour.

### 5.2 Reveal and interaction language

- `Reveal` and masked title reveals;
- `Scramble` as a restrained technical accent;
- `ProcessReveal`;
- sticky project-card scenes;
- project visual transitions, hover response, and progress fill;
- case-section entrances and collapsible behaviour;
- image expansion;
- reduced-motion alternatives.

### 5.3 Global chrome

- glass header;
- header dark/light adaptation;
- logo placement and core navigation model;
- language and theme controls;
- visible Work and About links at 390px;
- resume as the strongest header utility action.

### 5.4 Implementation contract

Every tracked page area remains a semantic `main section[id]` with a stable localized `data-label` or `aria-label`. Visual restructuring must plug into `ScrollProgress`; it must not bypass or duplicate it.

## 6. Token Architecture

The v2 system uses three levels:

1. **Primitive tokens:** raw colour, spacing, type, radius, shadow, and motion values.
2. **Semantic tokens:** page, surface, text, border, accent, focus, and spacing roles.
3. **Component tokens:** header, dock, project card, case section, button, tag, and media-frame values.

Rules:

- semantic tokens must reference primitives;
- component tokens must reference semantic or primitive tokens;
- components must not introduce unique hardcoded colours, radii, shadows, or durations without an explicit documented exception;
- theme changes redefine semantic roles, not component logic;
- deprecated aliases may remain temporarily during migration but cannot be used in new work;
- the app-level palette must not silently contradict the design-system foundations.

## 7. Colour System

### 7.1 Direction

Retain technical indigo as the single brand accent, but restore a subtle paper warmth to the neutral foundation. The system should feel more tactile than pure `#FAFAFA` without becoming beige, nostalgic, or rustic.

Approximate distribution:

- 86–90% neutral background and surfaces;
- 8–11% ink, graphite, and typography;
- no more than 3% brand indigo on a typical viewport;
- alert colour only for genuine exceptions or status meaning.

### 7.2 Light-theme primitives

| Token role | Target | Purpose |
|---|---:|---|
| Paper | `#F8F6F1` | Primary canvas; warm but near-neutral |
| Silk | `#EFEAE2` | Secondary surfaces and quiet grouping |
| Mist | `#D8D2C9` | Decorative hairlines and nonessential separation |
| Pebble | `#6D675F` | Lowest permitted visible text tier; use sparingly |
| Stone | `#69635C` | Secondary text and metadata |
| Graphite | `#3F3B36` | Body text and strong surface text |
| Ink | `#1B1A18` | Primary headings and highest emphasis |
| Indigo | `#3D4B66` | Active state, links, progress, focus, primary action |
| Indigo dark | `#2E3950` | Hover and pressed state |
| Indigo light | `#8794AE` | Controlled accents on dark imagery |
| Alert | `#B4452D` | Genuine warning/error only |

All normal-size text tokens used on Paper or Silk must maintain at least 4.5:1 contrast. `Pebble` cannot be made lighter unless it is removed from meaningful text.

### 7.3 Dark-theme primitives

| Token role | Target | Purpose |
|---|---:|---|
| Paper | `#0E1118` | Primary dark canvas |
| Silk | `#171B25` | Raised and grouped surfaces |
| Mist | `#252B39` | Decorative hairlines |
| Pebble | `#8E96AA` | Lowest visible text tier |
| Stone | `#A3A9B9` | Secondary text |
| Graphite | `#C3C8D4` | Body text |
| Ink | `#F0F2F7` | Primary text |
| Indigo | `#8399C4` | Active state, progress, focus, primary action |
| Indigo light | `#A0B0D3` | Hover and high-emphasis accent |
| Alert | `#F07A61` | Genuine warning/error only |

Dark mode must preserve hierarchy rather than invert every light-theme value directly.

### 7.4 Colour usage rules

- Indigo represents action, orientation, or selected state; it is not decorative filler.
- Alert red cannot be used as a second brand accent.
- Case visuals may contain project-specific colours, but surrounding UI remains neutral.
- Large gradients are not part of the system.
- Glass may use subtle tonal gradients caused by transparency; it must not introduce a new chromatic palette.
- Meaning cannot depend on colour alone.
- Text over imagery requires a tested solid or translucent backing layer.

## 8. Typography

### 8.1 Families

- **DM Sans:** primary interface, headings, body, navigation, and controls.
- **Cormorant Garamond:** editorial emphasis, selected title fragments, pull quotes, and rare reflective moments.
- **System monospace:** labels, section numbers, metadata, code, and technical evidence.

No new type family is introduced in v2.

### 8.2 Size scale

| Role | Desktop target | Mobile target | Notes |
|---|---:|---:|---|
| Display | 64–72px | 40–44px | Page-defining statement only |
| H1 | 48–56px | 36–40px | Case and page title |
| H2 | 34–40px | 28–32px | Major section |
| H3 | 22–26px | 20–22px | Subsection/card title |
| Lead | 18–20px | 17–18px | Introductory paragraph |
| Body | 16px | 16px | Default reading size |
| Small | 14px | 14px | Caption and metadata |
| Micro | 12–13px | 12–13px | Short labels only |
| Mono | 12–13px | 12px | Technical labels; never 10–11px for meaningful content |

### 8.3 Leading and measure

- display: 0.96–1.02;
- headings: 1.05–1.15;
- lead: 1.5–1.65;
- body: 1.6–1.75;
- long-form prose: up to 1.8;
- body measure: 58–68ch;
- lead measure: 42–54ch;
- captions: no more than 56ch.

### 8.4 Mixed serif treatment

The mixed sans/serif title remains a signature, with these limits:

- permitted on the page hero and selected case titles;
- no more than half of H2 headings on a long page use mixed treatment;
- two consecutive major headings cannot repeat the same mixed construction;
- the serif fragment should normally contain no more than 35% of the heading's words;
- plain sans headings are the default for technical evidence and dense sections;
- serif is never used to make ordinary labels appear important.

### 8.5 Tracking

- display and large headings retain tight tracking;
- body remains neutral;
- monospace labels use approximately `0.04em–0.07em` for multiword text;
- `0.10em–0.12em` is reserved for very short eyebrows at 12–13px;
- tracking cannot be used to compensate for text that is too small.

## 9. Spacing and Vertical Rhythm

### 9.1 Primitive scale

Retain the existing 4px/8px-based scale:

`4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 120`

### 9.2 Semantic spacing

| Role | Desktop | Tablet | Mobile |
|---|---:|---:|---:|
| Inline micro gap | 8px | 8px | 8px |
| Component gap | 16px | 16px | 12–16px |
| Content cluster | 24px | 24px | 20–24px |
| Content block | 40–48px | 32–40px | 28–32px |
| Compact section | 64px | 56px | 48px |
| Standard section | 80px | 64px | 56px |
| Emphasis section | 120px | 96px | 72–80px |

### 9.3 Ma rules

- 120px is reserved for page openings, major chapter changes, and deliberate endings.
- Consecutive sections cannot all use emphasis spacing.
- Dense evidence clusters use compact spacing.
- A section's internal spacing must be smaller than the spacing separating it from the next section.
- Empty space must perform at least one job: frame, separate, reveal, or build anticipation.
- A large empty region that performs none of those jobs must be reduced.
- Major pages should alternate compact, standard, and emphasis rhythm rather than repeat a single value.

### 9.4 Work showcase

- Preserve sticky scenes and scroll-led transition.
- Desktop scenes should normally occupy approximately 88–100svh, not a fixed 112svh everywhere.
- The final scene may be shorter to create forward momentum into the next section.
- Card height should be content-aware, generally within 520–600px on standard desktop viewports.
- Avoid an uninterrupted empty band larger than approximately 160px inside a card unless it supports the sticky transition or focal image.
- Mobile cards remain natural-height and never simulate desktop sticky spacing.

### 9.5 Case-study rhythm

- Major chapters use emphasis spacing.
- Evidence, decisions, and state documentation use compact or standard spacing.
- Visuals can break the prose rhythm, but repeated full-width frames must not appear at identical intervals throughout the page.
- The outcome and next-action sequence should feel faster and more decisive than the opening.

## 10. Grid, Composition, and Asymmetry

### 10.1 Grid

- Desktop: 12-column mental model within the existing content width.
- Tablet: 6-column mental model.
- Mobile: 4-column mental model with a 20px default outer gutter.
- Existing maximum widths remain the starting point: approximately 1100px for standard content and up to 1280px for the work showcase.
- The progress rail remains outside the primary content grid.

### 10.2 Fukinsei rules

- Each major page needs at least one intentionally asymmetric composition.
- Asymmetry must express priority, not random offset.
- Unequal columns should still share baseline, edge, or axis relationships.
- Do not alternate left/right mechanically from section to section.
- Mobile may collapse to one column without recreating desktop asymmetry artificially.

### 10.3 Kire rules

- Section endings should be visible through a decisive separator, shift in scale, crop, or spacing change.
- Hairlines need a clear start and end; avoid lines that decorate without separating.
- Full-bleed visuals may act as cuts between prose chapters.
- A cut must preserve continuity through shared alignment, label, colour, or motion.

## 11. Shape, Radius, Borders, and Elevation

### 11.1 Radius scale

| Token | Target | Use |
|---|---:|---|
| XS | 2px | Hairline frames and editorial cuts |
| SM | 6px | Buttons, inputs, small controls |
| MD | 10px | Media frames and standard cards |
| LG | 16px | Major project surfaces |
| Full | 999px | Tags, toggles, header, dock, and true pills |

Rules:

- 20–32px radii are not default card values in v2.
- The glass header and mobile dock retain full capsule geometry.
- Tags and status chips remain pills.
- Standard buttons use 6px unless their function is specifically a pill/toggle.
- Avoid multiple nested rounded containers with similar radii.
- Editorial separators and flat evidence groups may use 0–2px radius.

### 11.2 Borders

- Decorative hairline: 1px at subdued contrast.
- Meaningful control or state boundary: visually distinguishable at WCAG non-text contrast requirements when the boundary is needed to understand the control.
- Focus: at least 2px, clearly offset, and visible on Paper, Silk, imagery, and dark surfaces.
- Active progress elements use solid Indigo rather than only a change in opacity.

### 11.3 Shadows

Shadows are reserved for genuinely floating or sticky layers:

- glass header;
- mobile dock;
- sticky project surface;
- modal or expanded image;
- temporary popover/menu.

Static content cards should prefer border, surface tone, or spacing. No page should contain several different shadow personalities.

## 12. Materiality

The system should feel constructed, not decorated.

### 12.1 Canvas grid

- Retain the faint technical dot grid as a bridge to design engineering.
- Limit it to the top-level page canvas.
- Target light opacity around `0.03–0.04`; dark opacity around `0.02–0.03`.
- The grid must fade before dense case visuals and never reduce text clarity.

### 12.2 Evidence as texture

Wabi, sabi, and mingei should come from real process artefacts:

- component states;
- implementation details;
- sketches or decision fragments when genuine;
- annotated flows;
- testing evidence;
- before/after states;
- imperfect or rejected alternatives when useful.

Do not add fake paper grain, ink splashes, Japanese characters, brush marks, distressed edges, or ornamental kintsugi.

### 12.3 Imagery

- Preserve crisp project evidence.
- Avoid forcing every visual into the same 3:2 crop.
- Use aspect ratio to reflect the artefact: wide flow, tall mobile screen, compact state comparison, or full interface.
- Maintain consistent framing tokens while allowing project-specific composition.
- Captions remain visible, factual, and at least 12px.

## 13. Motion System

Every animation must serve responsiveness, spatial continuity, understanding, orientation, or rare delight. If it has no clear job, it is not added.

### 13.1 Motion tokens

| Role | Target | Use |
|---|---:|---|
| Instant | 0–80ms | Keyboard-driven state and immediate feedback |
| Micro | 120ms | Press, quick fade, active indicator |
| Hover | 150–160ms | Colour, opacity, border |
| Enter small | 180ms | Menu, tooltip, small surface |
| Morph | 240–300ms | Accordion, label movement, on-screen reposition |
| Reveal | 420–520ms | Content entrance and masked reveal |
| Illustrative | 640–1000ms | Scramble and rare page-opening flourish |
| Rail introduction | 1200–1400ms | First-load signature only |

### 13.2 Easing roles

- enter/exit: strong ease-out;
- on-screen movement/morph: ease-in-out;
- hover/focus colour: standard ease;
- actual progress: linear;
- gesture/swipe: interruptible spring or existing native-feeling implementation, with no decorative bounce;
- keyboard navigation: instant or near-instant.

### 13.3 Jo-Ha-Kyu cadence

#### Jo — opening

- rail draw and hero title establish the page calmly;
- page-opening motion may be the slowest moment;
- only one dominant reveal competes for attention;
- the primary action becomes usable immediately.

#### Ha — development

- project, process, and evidence transitions become quicker;
- repeated reveals use 300–480ms rather than repeating the hero's full ceremony;
- scroll progress remains continuous and responsive;
- dense technical sections favour clarity over spectacle.

#### Kyu — conclusion

- outcome, related work, and contact appear with shorter, decisive transitions;
- the user should never wait for a decorative animation before taking the next action;
- the final section visually closes the case rather than dissolving into another long pause.

### 13.4 Scramble

- Preserve Scramble as a recognizable technical signature.
- Use it only on short, nonessential labels.
- Default visual resolution target: approximately 800–1000ms.
- Reveal delay should normally remain at or below 200ms.
- Do not run Scramble on body copy, primary navigation, primary actions, or text required to understand the page.
- Avoid more than one simultaneous Scramble in a viewport.
- Server-rendered text remains correct before enhancement and under reduced motion.

### 13.5 Reveal

- Masked title reveal remains available for page-defining headings.
- Standard content reveal uses opacity and a small transform only.
- Avoid blur on reading-critical text.
- Trigger once unless an interaction explicitly requires replay.
- Content must remain visible if JavaScript, GSAP, or ScrollTrigger fails.

### 13.6 Performance

- Prefer transform and opacity.
- Avoid animating layout properties when a transform can express the same movement.
- Use `will-change` only during active animation.
- Retain glass, but review 40–48px backdrop blurs; target a visually equivalent 16–20px blur where possible.
- Scroll-linked work must remain smooth on an average mobile device, not only a desktop GPU.

### 13.7 Reduced motion

Under `prefers-reduced-motion: reduce`:

- content is immediately visible;
- Scramble does not run;
- masked reveals resolve without translation;
- rail and dock still identify the current section;
- scroll navigation remains functional without animated travel;
- no information, state, or affordance disappears;
- autoplaying or looping decorative motion is absent.

## 14. Component-Level Visual Rules

### 14.1 Header

- Preserve capsule shape, glass, shadow, and adaptive contrast.
- Maintain one visually dominant utility action: Resume.
- Navigation links remain quieter than the active/current state.
- The header cannot become taller merely to accommodate visual decoration.
- On mobile, logo, Work, About, and More remain visible at 390px.

### 14.2 Buttons and links

- One filled primary action per decision cluster.
- Secondary action uses text, underline, or low-emphasis border.
- Buttons use 6px radius by default; pills are reserved for toggles/tags.
- Minimum interaction height is 44px where layout permits.
- Hover may move a child icon, not the complete hit target.
- Focus cannot depend on the subtle Clay/Indigo wash alone.

### 14.3 Tags and metadata

- Tags remain compact pills.
- Tags cannot replace a clear heading hierarchy.
- Metadata uses 12–14px; 10px text is removed.
- Long technical disclosures use sentence case where uppercase tracking would reduce legibility.

### 14.4 Work showcase

- Preserve sticky cards, image/copy split, hover response, and progress fill.
- Reduce internal empty height before reducing content size.
- Allow controlled variation in image proportion or copy placement between projects.
- Do not create a different card style for every project.
- Project-specific colour lives inside the visual; the card frame remains systemic.

### 14.5 Case hero

- Preserve back link, metadata chips, mixed editorial title option, summary, lead visual, and dock.
- The first viewport should establish identity and evidence without requiring animation completion.
- Hero media may vary in ratio by project.
- The visual-open action remains clear on light and dark imagery.

### 14.6 Case sections

- Preserve collapsibles and stable section IDs.
- Use compact rhythm for evidence and standard/emphasis rhythm for chapter changes.
- Alternate presentation modes intentionally: prose, state grid, comparison, visual, decision, outcome.
- Do not repeat full-width rounded evidence frames at identical intervals.
- Section headers remain readable and correctly oriented when collapsed.

### 14.7 Progress rail and mobile dock

- Preserve appearance, active movement, pulse, label, click/tap, and swipe behaviour.
- Active state uses solid Indigo plus shape/scale, not colour alone.
- Visual dots may remain small if invisible target areas meet or exceed 24px and spacing prevents overlap; 44px remains preferred on touch.
- Keyboard users receive a visible, direct navigation alternative even if the decorative desktop rail remains `aria-hidden`.

### 14.8 About composition

- Preserve portrait-led asymmetry.
- Avoid repeating the homepage portrait at the same crop and scale.
- Facts remain aligned and scannable without turning into a dashboard.
- Narrative sections may be quieter than the case studies.

## 15. Page-Level Rhythm

### 15.1 Home

1. **Jo:** calm hero, rail introduction, one dominant statement.
2. **Ha:** featured work becomes more compact and interactive.
3. Capabilities and experience use denser, quieter structure.
4. Process introduces one controlled visual interruption.
5. About preview creates a larger pause.
6. **Kyu:** contact is concise and decisive.

The homepage must not use emphasis spacing for every section.

### 15.2 Work hub

- opening remains editorial;
- project groups use clear kire separators;
- flagship work receives scale, not extra decoration;
- archive work becomes denser;
- the page accelerates toward project selection.

### 15.3 Flagship case studies

- executive summary remains calm and spacious;
- problem and constraints establish structure;
- exploration uses variation and controlled asymmetry;
- implementation and evidence become denser;
- validation introduces a clear visual cut;
- outcome and next action shorten the rhythm.

### 15.4 Operational archive cases

- retain existing visual identity;
- adopt the new token foundation and spacing rhythm;
- do not pretend to be visually larger or more important than flagships;
- keep progress navigation and evidence legibility intact.

### 15.5 About

- portrait and title remain the strongest composition;
- narrative uses restrained editorial rhythm;
- factual sections become denser than the opening;
- final actions are explicit and compact.

## 16. Responsive Behaviour

### 16.1 Desktop

- rail visible only when sufficient outer gutter exists;
- content cannot be compressed to make room for the rail;
- sticky scenes account for real viewport height;
- large typography scales fluidly without creating single-word orphan lines.

### 16.2 Tablet and narrow desktop

- rail may become the current compact indicator;
- two-column compositions collapse before either column becomes unreadable;
- sticky cards may remain only when the viewport can show the complete decision context;
- avoid the current situation in which a narrow desktop receives desktop-scale empty card space.

### 16.3 Mobile

- default outer gutter: 20px;
- body remains 16px;
- section rhythm compresses, but chapter hierarchy remains visible;
- dock remains above safe-area insets;
- controls avoid overlap with browser chrome, dock, or back-to-top;
- visual evidence may scroll horizontally only when the pattern is announced and keyboard-accessible;
- no hidden horizontal page overflow at 320px or 390px.

## 17. Accessibility Requirements

- WCAG 2.2 AA is the minimum target.
- Normal text: minimum 4.5:1 contrast.
- Large text: minimum 3:1 contrast.
- Meaningful control and focus boundaries: minimum 3:1 when necessary to identify the component or state.
- No meaningful visible text below 12px.
- Preferred touch target: 44×44px; minimum target and spacing must satisfy WCAG 2.2.
- Focus treatment must remain visible in light theme, dark theme, and over imagery.
- Motion cannot be the only signal of change.
- Language changes remain programmatically exposed.
- 200% zoom and 320px reflow must preserve content, actions, and orientation.
- Dark mode is tested independently; it is not assumed accessible because it uses light text.
- Reduced-motion QA is mandatory for every protected effect.

## 18. Visual Anti-Patterns

Do not introduce:

- Japanese characters used decoratively;
- fake washi, ink, grain, kintsugi, zen-garden, or brush textures;
- beige-on-beige low-contrast minimalism;
- gradients without semantic purpose;
- neon, cyberpunk, or AI-purple branding;
- a new font family;
- excessive pill-shaped buttons;
- large radius on every container;
- glass on static reading cards;
- parallax;
- bouncing tap interactions;
- infinite content animation;
- animated body copy;
- multiple simultaneous Scramble effects;
- alternating left/right layouts as a formula;
- identical 120px spacing between every section;
- different visual systems for each project;
- decorative data visualisation without real data.

## 19. Migration Boundaries

### 19.1 Allowed in the future visual implementation

- consolidate primitive, semantic, and component tokens;
- replace app-level palette overrides with governed theme tokens;
- adjust spacing values and section rhythm;
- reduce selected radii and shadows;
- raise microtype to 12–13px;
- strengthen meaningful borders and focus treatment;
- refine Scramble duration and reveal cadence within this specification;
- vary case visual proportions and evidence layouts;
- improve glass performance while keeping its appearance and role;
- add regression tests for the protected visual system.

### 19.2 Not authorized by this specification

- change portfolio copy or factual claims;
- change page hierarchy or route strategy;
- remove or replace the rail, dock, glass header, reveals, Scramble, smooth scroll, sticky work scenes, or collapsibles;
- replace DM Sans or Cormorant Garamond;
- create a new logo;
- introduce an additional brand accent;
- add new public pages;
- deploy to production;
- modify resume files;
- change analytics or tracking;
- alter unrelated repositories or untracked sibling folders.

## 20. Recommended Migration Order

This is sequencing guidance, not the implementation plan.

1. **Foundation:** consolidate light/dark colour roles, text minimums, radii, border, shadow, and motion tokens.
2. **Global chrome:** verify header, rail, mini indicator, dock, theme, language, focus, and reduced motion against the new tokens.
3. **Typography and spacing:** correct microtype and replace uniform section spacing with semantic rhythm.
4. **Home and Work:** refine hero cadence, project-card height, and section transitions.
5. **Case studies:** introduce Jo-Ha-Kyu rhythm, kire separators, visual-ratio variation, and faster conclusions.
6. **About:** retain the strongest composition while aligning foundations.
7. **QA and release review:** light/dark, English/French, keyboard, reduced motion, responsive, performance, and visual regression.

No phase proceeds to production merely because the preceding phase builds locally.

## 21. Visual QA Matrix

The future implementation must capture and compare at least:

| Route/type | 320 | 390 | 768 | 1024 | 1440 | Light | Dark | Reduced motion |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Home | Required | Required | Required | Required | Required | Required | Required | Required |
| Work hub | Required | Required | Required | Required | Required | Required | Required | Required |
| About | Required | Required | Required | Required | Required | Required | Required | Required |
| One flagship case | Required | Required | Required | Required | Required | Required | Required | Required |
| Three archive cases | Smoke | Required | Smoke | Required | Required | Required | Required | Required |

Additional checks:

- first viewport before and after animation settles;
- sticky project transition midpoint;
- case hero;
- dense evidence section;
- collapsed and expanded case section;
- outcome and related-work ending;
- mobile menu open;
- keyboard focus sequence;
- dock over light and dark content;
- 200% zoom;
- slow-device or throttled-motion observation.

## 22. Acceptance Criteria

The visual system is correctly implemented only when all conditions below are true.

### Foundations

- one governed token source controls the app palette;
- light and dark semantic roles are documented and used consistently;
- no meaningful content uses 10–11px text;
- no new component introduces an undocumented colour, radius, shadow, or duration;
- meaningful colour combinations pass their required contrast thresholds.

### Rhythm and composition

- 120px spacing is limited to emphasis moments;
- Work cards no longer contain avoidable large empty bands;
- at least one intentional asymmetric composition remains on every major page;
- long cases visibly progress from calm opening to denser development and decisive close;
- repeated evidence layouts contain controlled variation without losing consistency.

### Protected identity

- desktop rail passes visual and behavioural regression checks;
- compact indicator works at narrower desktop widths;
- mobile dock, active name, dots, tap, and swipe work;
- glass header and dark/light adaptation work;
- Reveal, masked reveal, Scramble, ProcessReveal, sticky project motion, collapsibles, image expansion, and back-to-top remain present;
- all protected effects expose complete content when JavaScript enhancement fails;
- reduced motion preserves content and navigation.

### Responsive and accessibility

- no horizontal overflow at 320px or 390px;
- no overlap between header, dock, back-to-top, content, and safe areas;
- keyboard focus is visible and follows logical order;
- all controls meet target-size or spacing requirements;
- 200% zoom retains functionality and orientation;
- English and French variants retain equivalent visual hierarchy.

### Validation

- lint passes;
- production build passes;
- automated accessibility checks pass without critical violations;
- console checks show no new errors;
- relevant interaction tests pass;
- visual regression review covers the QA matrix;
- performance is compared against the pre-change baseline;
- production deployment occurs only after explicit approval.

## 23. Instructions for a Future Codex Implementation Session

Before modifying code:

1. Read this specification and the companion information-architecture specification completely.
2. Confirm the actual Git root is `.../Meus projetos`, while the app lives in `.../Meus projetos/portfolio`.
3. Inspect current status and preserve unrelated untracked siblings, especially `docs/`, `hertwill-shopify-store-ops/`, and `triageai/` at the Git root.
4. Treat the progress rail, mobile dock, header, reveals, Scramble, sticky project showcase, collapsibles, and reduced-motion behaviour as protected regression surfaces.
5. Create a detailed implementation plan before code changes.
6. Stage only intended `portfolio/**` files.
7. Run lint, build, accessibility, interaction, and visual checks separately so failures remain attributable.
8. Do not deploy or merge merely because local validation passes; request the appropriate explicit approval.

## 24. Decision Record

### Selected direction

**Shibui Digital / Technical Iki** was selected because it develops the existing identity instead of replacing it. It preserves the portfolio's calm editorial foundation and technical accent while correcting uniform whitespace, repeated softness, and flat cadence.

### Alternatives not selected

1. **Pure Wabi-Sabi Editorial:** warmer, more tactile, and more irregular. Rejected as the primary direction because it risks weakening technical clarity and drifting into imitation or decorative texture.
2. **Minimal Technical Modernism:** cleaner, denser, cooler, and more grid-led. Rejected because it would amplify the current corporate/SaaS tendency and reduce Breno's editorial distinctiveness.
3. **Japanese Neo-Maximalism:** information-dense, colourful, and pattern-rich. Rejected because it would conflict with the current identity, recruiter scan requirements, and evidence-first hierarchy.

### Explicitly preserved decision

The visual improvements do not authorize removing or replacing the current effects. Refinement means improved timing hierarchy, performance, spacing, contrast, and integration while preserving the behaviours Breno already approved.

## 25. Review Gate

This document authorizes no implementation by itself. Breno must review and approve the written specification. After approval, the next artifact is a detailed implementation plan identifying exact files, migration steps, tests, visual checkpoints, commit boundaries, and rollback strategy.
