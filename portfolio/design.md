# Design — Breno Sampaio Portfolio

A locked visual system for the portfolio and its independent product cases.
Every page and case must preserve the portfolio's existing identity while using
Swiss editorial discipline to make hierarchy, evidence, and actions clearer.

## Design intent

- Audience: European product-design and product-minded frontend hiring teams.
- Primary job: prove that complex product decisions can become coherent,
  accessible working software.
- Tone: precise, editorial, restrained, warm, and quietly confident.
- Reference: Parloa informs grid, spacing rhythm, contrast, and editorial
  restraint only. Its brand, layout, typography, photography, orange, and
  conversation motifs are not copied.

## Genre

Editorial modern-minimal. The portfolio uses Swiss clarity as a system, not as
poster decoration.

## Macrostructure families

- Portfolio pages: preserve the existing page composition and route ownership;
  refine alignment, density, copy, and vertical rhythm in place.
- Product cases: long-form editorial case with implemented evidence alternating
  between prose and full-width artifacts.
- Product interfaces: editorial operations index. A primary work list leads to
  one focused dossier; avoid simultaneous dashboard panels.

## Grid

- Desktop: 12 columns, 32px gutters, 48px outer margin, max width 1240px.
- Tablet: 8 columns, 24px gutters and outer margin.
- Mobile: 4 columns, 16px gutters and outer margin.
- Align headings, prose, evidence, captions, and actions to shared column edges.
- Asymmetry is allowed only when reading order remains obvious.
- Use negative space or a hairline to establish groups before adding a surface.

## Colour

Existing tokens are authoritative:

- Paper: `#FFFFFF`
- Soft surface: `#F3F2EE`
- Rule: `#DEDCD6`
- Secondary text: `#5F5B56`
- Ink: `#1F1C1B`
- Accent: `#C74624`
- Accent hover: `#A93618`

Rules:

- Ink and paper dominate every viewport.
- Vermilion is punctuation: target at most 5% of a normal viewport.
- Soft surface groups genuine related content; it is not a default card fill.
- State never relies on colour alone.
- Do not introduce gradients, decorative glows, glass surfaces, or extra brand
  colours.

## Typography — frozen

- Primary: DM Sans for headings, body, navigation, labels, and interface text.
- Editorial accent: Cormorant Garamond for rare pull quotes or deliberate
  editorial moments only.
- Technical metadata: the existing system-monospace alias.
- Preserve the current font loading, scale, leading, tracking, weights, and
  `Text` component mappings.
- Do not introduce Geist, Instrument Serif, a new font, or page-local type.
- Do not use uppercase mono labels as decoration; labels must carry information.

## Spacing

Use only the existing 4px-based scale:

`4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64 · 80 · 96 · 120`

Extended editorial intervals may use `128` and `192` when they separate major
arguments or close a long-form page.

- Micro: 4–12px, only inside a control or compact evidence row.
- Component: 16–32px.
- Content group: 40–64px.
- Section: 64–128px, varied by narrative weight rather than repeated equally.
- Major transition: 128–192px.
- Repetition must create rhythm, not make every section identical.

## Shape and surface

- Default radius: 0–2px for frames and editorial surfaces.
- Controls: 6px.
- Contained functional surface: up to 8px when grouping is necessary.
- Pills are reserved for true status, compact filters, or the existing navigation
  element. They are never decorative labels.
- Avoid nested cards, floating panels, ornamental shadows, and card grids used
  merely to fill space.
- Prefer hairlines and alignment; use shadow only for a genuinely lifted layer.

## Product-interface voice

- A list should read like an editorial index, not a SaaS data table template.
- Selecting an item opens one focused dossier, not a permanent third column.
- Evidence is chronological and source-labelled.
- One decisive action receives accent emphasis; secondary actions remain quiet.
- Status, risk, ownership, evidence completeness, and permission are written in
  plain language.
- Synthetic data is labelled at the interface and case level.

## Motion — frozen

- Preserve all existing motion, transitions, duration, easing, scroll, sticky,
  reduced-motion, and language-transition behaviour byte-for-byte.
- New product UI does not introduce decorative motion.
- Functional state changes may use existing transition tokens only when already
  supported by the system.

## Anti-patterns

Do not ship:

- three-panel admin dashboards;
- KPI strips or invented analytics;
- rows of decorative filter pills;
- nested card inventories;
- oversized rounded containers;
- fake browser or device chrome;
- generic AI-SaaS imagery;
- Swiss-poster cosplay, flags, crosses, or gratuitous numbered labels;
- orange or vermilion used as background decoration;
- new typography or motion declarations.

## Responsive and accessibility contract

- Verify at 320, 360, 375, 414, 601, 768, 1280, and 1440px.
- No horizontal page overflow.
- Reading order remains coherent without the desktop grid.
- Focus is visible, states have text equivalents, and controls remain keyboard
  reachable.
- Touch targets are 44px where practical and never below WCAG 2.2 minimums.
- Light and dark themes use the same hierarchy and information architecture.

## System maturity

The portfolio is at the Defined level: foundations and shared components exist,
but case-specific product patterns are still being consolidated. Relay creates
the first real consumer; Basis will document and extract the reusable component
contracts from implemented needs rather than inventing a gallery in advance.
