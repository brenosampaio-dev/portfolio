# Swiss Portfolio Foundation Implementation Plan

> **For Codex:** REQUIRED SUB-SKILL: Use `superpowers:executing-plans` to implement this plan task-by-task.

**Goal:** Lapidar o portfólio existente com uma base suíça contemporânea — tipografia editorial, fundo mais claro, paleta acessível, copy de Product Designer e grid mais disciplinado — sem substituir sua arquitetura, seus cards ou seu comportamento de motion.

**Architecture:** Manter os componentes e rotas atuais; concentrar fonte, cor e ritmo nos tokens compartilhados; manter `portfolioV2.js` como fonte canônica para a narrativa global EN/FR; fazer apenas ajustes de composição e superfície no CSS existente. Casos, protótipos e imagens geradas ficam fora deste primeiro release.

**Tech Stack:** Next.js 16 App Router, React 19, CSS tokens, `next/font/google`, Vitest, Testing Library, Playwright, axe-core.

**Spec:** `docs/superpowers/specs/2026-10-07-portfolio-lapidation-and-cases-design.md`

**Global Constraints:** Alterar somente caminhos em `portfolio/**`; preservar arquivos não rastreados e projetos irmãos; não mudar animações, transições, durações, easings, transformações de motion, Lenis, GSAP, scroll ou reduced-motion; não alterar a estrutura macro, famílias de cards, header, portrait ou rotas; não publicar Relay, Basis ou Signalroom nesta fase; não inventar projetos, clientes, pesquisa ou resultados.

**Review Focus:** Hierarquia editorial sem imitação literal da Parloa; contraste WCAG 2.2 AA; coerência EN/FR; fundo realmente mais claro; remoção de posicionamento Frontend/Support como objetivo principal; ausência de regressão visual em 360, 601, 768, 1280 e 1440 px; diff de motion vazio.

**Execution roots:** Run all `npm` commands from `portfolio/`. Run all `git` commands from the parent repository root, `/media/sampaioreimao/BRENO - SSD/10 - Projetos ativos/Meus projetos`, and stage only explicit `portfolio/**` paths.

---

## Approved foundation

### Typography roles

- Display and page headings: `Instrument Serif`, weight 400.
- Body, UI, navigation, functional headings: `Geist`, weights 400–600.
- Labels, numbers and metadata: `Geist Mono`, weights 400–500.
- Load all three through Next font variables; no Google CSS `@import`, preconnect or runtime stylesheet.
- Proposed scale:
  - display: `clamp(3.5rem, 5.625vw, 4.5rem)` / `1.02` / `-0.02em`;
  - h1: `clamp(2.75rem, 4.22vw, 3.375rem)` / `1.05` / `-0.015em`;
  - h2: `clamp(2.25rem, 3.75vw, 3rem)` / `1.08` / `-0.012em`;
  - h3: `1.25rem` / `1.25` / `-0.01em` in Geist;
  - body large: `1.125rem` / `1.55`;
  - body: `1rem` / `1.6`;
  - small: `0.875rem` / `1.5`;
  - mono and micro: `0.75rem` / `1.4` / `0.02em`.
- Eyebrows use restrained title case by default. Uppercase remains only where the content itself requires it.

### Color roles

| Role | Light | Dark |
|---|---:|---:|
| page | `#FFFFFF` | `#0F0F0E` |
| surface | `#F3F2EE` | `#191817` |
| border | `#DEDCD6` | `#302E2A` |
| secondary text | `#5F5B56` | `#B9B4AC` |
| primary text | `#1F1C1B` | `#F8F6F1` |
| accent | `#C74624` | `#FF7A52` |
| accent hover | `#A93618` | `#FF9474` |
| on accent | `#FFFFFF` | `#1F1C1B` |
| alert | `#B4232C` | `#FF8A8F` |

The light combinations planned for normal text meet AA: ink on white is about 16.9:1, secondary text on white about 6.7:1, and white on the light accent about 4.85:1. Encode the calculation in tests rather than trusting this note.

### Copy position

- Primary identity: Product Designer.
- Professional promise: simplifying complex workflows, interfaces and systems.
- Code: implementation and prototyping capability, not the target role.
- Operations: domain depth and product judgment, not an IT-support destination.
- Work: honest in-progress status until the new independent cases are publishable.
- Labs: Systems Lab direction; Scrimba remains learning context only.

---

## Task 1: Establish regression guards and a clean baseline

**Files:**

- Reference only: `design-system/tokens/motion.css`
- Reference only: `src/lib/motion.js`
- Reference only: `src/components/site/Reveal.jsx`
- Reference only: `src/components/site/Scramble.jsx`
- Reference only: `src/components/site/SmoothScroll.jsx`
- Reference only: `src/components/site/ScrollProgress.jsx`
- Reference only: `src/components/site/ProcessReveal.jsx`
- Reference only: `src/components/site/CodeVeil.jsx`
- Reference only: `src/components/site/ToTop.jsx`
- Reference only: `src/components/site/WorkShowcase.jsx`

### Step 1: Run the current automated baseline

Run:

```bash
npm run lint
npm run test:unit
npm run build
```

Expected: PASS. Record any pre-existing failure before editing; do not attribute it to Release 0 or work around it silently.

### Step 2: Record the baseline commit and motion surface

Run:

```bash
git rev-parse HEAD
git status --short
```

Save the commit id in the final evidence note. Do not stage or modify the existing unrelated untracked directories.

### Step 3: Record the current motion diff for review

Run from the parent Git root:

```bash
git diff --no-ext-diff HEAD -- portfolio/design-system/tokens/motion.css portfolio/src/lib/motion.js portfolio/src/components/site/Reveal.jsx portfolio/src/components/site/Scramble.jsx portfolio/src/components/site/SmoothScroll.jsx portfolio/src/components/site/ScrollProgress.jsx portfolio/src/components/site/ProcessReveal.jsx portfolio/src/components/site/CodeVeil.jsx portfolio/src/components/site/ToTop.jsx portfolio/src/components/site/WorkShowcase.jsx portfolio/src/components/site/WorkShowcase.css
```

Expected: no task-created diff before implementation. Repeat this exact command before every visual commit.

---

## Task 2: Correct the product definition and canonical narrative

**Files:**

- Modify: `PRODUCT.md`
- Modify: `src/lib/portfolioV2.js`
- Modify: `tests/unit/portfolio-content.test.js`

### Step 1: Write the failing positioning assertions

Change the content tests to require, in English and French:

- current identity is Product Designer / Designer produit;
- target describes Product Design roles and does not contain `Frontend`, `Design Engineer`, `support`, or French equivalents as the target;
- hero primary action is selected work;
- GitHub is not the hero secondary action;
- Labs is framed as system experiments rather than Scrimba;
- Work remains `paused` and its item list remains empty until cases exist;
- no invented client, launch or impact language is introduced.

### Step 2: Run the focused test and verify it fails

```bash
npm run test:unit -- tests/unit/portfolio-content.test.js
```

Expected: FAIL on target, hero action and Labs assertions.

### Step 3: Rewrite `PRODUCT.md`

Replace the obsolete IT-support brief with:

- users: European/remote Product Design recruiters, hiring managers and product/engineering peers;
- purpose: demonstrate the ability to clarify complex products, design coherent systems and prototype decisions in code;
- personality: precise, calm, editorial, human and technically credible;
- principles: evidence before decoration, complexity made legible, honest independent work, accessible implementation, responsive clarity;
- anti-references: copied Parloa branding, generic AI-SaaS, invented business outcomes, decorative Swiss poster tropes, portfolio-theatre language.

### Step 4: Update `portfolioV2.js` as the global narrative source

Use concise bilingual copy with these meanings:

- hero eyebrow: `Product Designer · Systems · Prototypes` / `Designer produit · Systèmes · Prototypes`;
- hero title: `Complex products, made clear.` / `Des produits complexes, rendus clairs.`;
- primary CTA: `View selected work` / `Voir les projets`;
- secondary CTA: About/practice, not GitHub;
- Work copy: three independent cases are being built from scratch and will be published only with explicit scope, decisions and evidence;
- Labs copy: interface-system experiments and accessibility behavior;
- About copy: Product Design is the present identity; operations explain judgment; React makes decisions tangible.

Keep `work.items` empty and `work.status` paused. Do not add the future cases prematurely.

### Step 5: Run the focused test

```bash
npm run test:unit -- tests/unit/portfolio-content.test.js
```

Expected: PASS.

### Step 6: Commit the product contract and copy source

```bash
git add -- portfolio/PRODUCT.md portfolio/src/lib/portfolioV2.js portfolio/tests/unit/portfolio-content.test.js
git commit -m "feat(portfolio): center the Product Designer narrative"
```

---

## Task 3: Replace remote font loading with the approved type system

**Files:**

- Create: `src/lib/fonts.js`
- Modify: `src/components/site/SiteDocument.jsx`
- Modify: `design-system/tokens/fonts.css`
- Modify: `design-system/tokens/typography.css`
- Modify: `src/components/ds/Text.jsx`
- Create: `tests/unit/swiss-foundation.test.js`
- Modify: `tests/unit/design-tokens.test.js`

### Step 1: Write the failing test for font ownership

Require:

- `src/lib/fonts.js` exports three configured Next fonts;
- the HTML element receives all three `.variable` classes;
- the old `<link rel="preconnect">` and Google stylesheet are absent;
- `fonts.css` contains aliases only, with no network import;
- display, h1 and h2 use `var(--font-serif)`; h3/body use `var(--font-sans)`; mono/eyebrow use `var(--font-mono)`.

### Step 2: Run and confirm failure

```bash
npm run test:unit -- tests/unit/swiss-foundation.test.js tests/unit/design-tokens.test.js
```

Expected: FAIL because the new loader and mappings do not exist.

### Step 3: Implement `next/font` once at the document boundary

In `src/lib/fonts.js`, configure:

```js
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";

export const geistSans = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-sans",
});

export const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
});

export const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-instrument-serif",
});
```

Import these objects into `SiteDocument.jsx`, compose their variable classes on `<html>`, and delete the three runtime font links from `<head>`. Keep every other document behavior unchanged.

### Step 4: Replace font aliases and type tokens

- `fonts.css`: document the three roles and define no remote import.
- `typography.css`: implement the approved responsive scale and readable measures.
- `Text.jsx`: remap display/h1/h2 to Instrument Serif; h3 and body to Geist; mono and eyebrow to Geist Mono; remove default uppercase and overtracking from eyebrow; keep semantic default tags and the public variant API stable.

Do not add transitions or animation declarations.

### Step 5: Run type-system tests and build

```bash
npm run test:unit -- tests/unit/swiss-foundation.test.js tests/unit/design-tokens.test.js
npm run build
```

Expected: PASS. The build must prove the selected Next font exports and options are valid.

### Step 6: Verify the motion diff is empty

Run the motion fingerprint command from Task 1. Expected: no diff.

### Step 7: Commit the type system

```bash
git add -- portfolio/src/lib/fonts.js portfolio/src/components/site/SiteDocument.jsx portfolio/design-system/tokens/fonts.css portfolio/design-system/tokens/typography.css portfolio/src/components/ds/Text.jsx portfolio/tests/unit/swiss-foundation.test.js portfolio/tests/unit/design-tokens.test.js
git commit -m "feat(portfolio): introduce the Swiss editorial type system"
```

---

## Task 4: Implement the lighter accessible palette and disciplined spatial tokens

**Files:**

- Modify: `design-system/tokens/colors.css`
- Modify: `design-system/tokens/spacing.css`
- Modify: `design-system/tokens/base.css`
- Modify: `tests/unit/swiss-foundation.test.js`
- Modify: `tests/unit/design-tokens.test.js`

### Step 1: Add failing semantic-token and contrast assertions

Require all approved light/dark values and calculate contrast for:

- ink/page;
- secondary text/page;
- on-accent/accent;
- dark ink/dark page;
- dark on-accent/dark accent.

Assert normal-text combinations are at least 4.5:1 and large/decorative combinations are never used to justify a failing UI label.

### Step 2: Run and confirm failure

```bash
npm run test:unit -- tests/unit/swiss-foundation.test.js tests/unit/design-tokens.test.js
```

### Step 3: Replace primitives while preserving semantic aliases

In `colors.css`:

- replace warm beige/indigo primitives with the approved light/dark values;
- add clearly named vermilion primitives while retaining compatibility aliases used by existing components;
- point `--accent`, `--focus`, `--on-accent`, washes and rings to the new accessible roles;
- keep alert semantically distinct from accent;
- update comments so they describe the current system.

Compatibility aliases may remain temporarily to prevent broad component churn, but their destination must be the new semantic system.

### Step 4: Calibrate spacing and surfaces without restructuring

In `spacing.css`:

- remove the Japanese-direction comment;
- retain the 4/8 px base and public token names;
- make section rhythm and container width responsive with `clamp()` where necessary;
- preserve radii that existing components depend on;
- favor hairlines over new shadows.

In `base.css`, change only foundation color/type/measure declarations required by the new tokens. Do not edit transitions, animation or layout structure.

### Step 5: Run focused tests, lint and build

```bash
npm run test:unit -- tests/unit/swiss-foundation.test.js tests/unit/design-tokens.test.js
npm run lint
npm run build
```

Expected: PASS.

### Step 6: Verify motion diff and commit

```bash
git add -- portfolio/design-system/tokens/colors.css portfolio/design-system/tokens/spacing.css portfolio/design-system/tokens/base.css portfolio/tests/unit/swiss-foundation.test.js portfolio/tests/unit/design-tokens.test.js
git commit -m "feat(portfolio): brighten and rebalance the color system"
```

---

## Task 5: Apply the new copy to the existing page composition

**Files:**

- Modify: `src/components/site/HomeContent.jsx`
- Modify: `src/components/site/WorkContent.jsx`
- Modify: `src/components/site/LabsContent.jsx`
- Modify: `src/components/site/AboutContent.jsx`
- Modify: `src/components/site/ContactForm.jsx`
- Modify: `src/app/api/contact/route.js`
- Modify: `tests/unit/contact-route.test.js`
- Modify: `tests/e2e/navigation.spec.js`
- Modify: `tests/components/global-navigation.test.jsx`

### Step 1: Write failing CTA and contact-intent tests

Require:

- hero primary CTA resolves to Work, not Approach;
- hero secondary CTA resolves to About/practice, not GitHub;
- Contact offers `product-design-role` and no `frontend-role`;
- API maps the new value to `Product Design role`;
- Work remains an honest in-progress state;
- Labs no longer renders Scrimba as its primary artifact.

### Step 2: Run focused tests and confirm failure

```bash
npm run test:unit -- tests/unit/contact-route.test.js tests/unit/portfolio-content.test.js tests/components/global-navigation.test.jsx
```

Expected: FAIL on existing hard-coded links and reason value.

### Step 3: Connect existing components to the canonical content

- In `HomeContent.jsx`, point the existing buttons to Work and About while keeping `Reveal`, `Scramble`, their order and all delays untouched.
- Edit headings and supporting copy through `portfolioV2.js` where possible; keep local labels only where they are truly component-specific.
- In Work, present the planned Product → System → Build sequence as honest upcoming proof, not clickable fake cases.
- In Labs, frame the page as Systems Lab in preparation and move course learning to supporting context.
- In About, reduce repeated transition language; state the current identity once and use operational history as evidence of product judgment.
- Keep the existing DOM sections, portrait, cards and wrappers.

### Step 4: Update the contact intent end to end

Replace the `frontend-role` value with `product-design-role` in the form, API allowlist, unit fixture and Playwright navigation test. Keep validation, honeypot, rate limiting, focus management and Formspree delivery unchanged.

### Step 5: Run relevant tests

```bash
npm run test:unit -- tests/unit/contact-route.test.js tests/unit/portfolio-content.test.js tests/components/global-navigation.test.jsx
npm run test:e2e
```

Expected: PASS.

### Step 6: Verify motion diff and commit

```bash
git add -- portfolio/src/components/site/HomeContent.jsx portfolio/src/components/site/WorkContent.jsx portfolio/src/components/site/LabsContent.jsx portfolio/src/components/site/AboutContent.jsx portfolio/src/components/site/ContactForm.jsx portfolio/src/app/api/contact/route.js portfolio/src/lib/portfolioV2.js portfolio/tests/unit/contact-route.test.js portfolio/tests/e2e/navigation.spec.js portfolio/tests/components/global-navigation.test.jsx
git commit -m "feat(portfolio): align every hub with Product Design"
```

---

## Task 6: Refine grid, surfaces and density inside the existing shell

**Files:**

- Modify: `src/app/globals.css`
- Modify: `src/app/signature.css`
- Modify: `design-system/components/work/ProjectCard.jsx` only if token adoption requires it
- Modify: `src/components/ds/ProjectCard.jsx` only if token adoption requires it
- Modify: `tests/unit/swiss-foundation.test.js`
- Modify: `tests/e2e/visual-capture.spec.js`
- Reference only: all motion-protected files from Task 1

### Step 1: Add a failing surface contract and visual-capture coverage

In `swiss-foundation.test.js`, require the global grid to use the calmer `2%` ink mix and require shared section/container tokens to remain the source of spacing. Run the focused unit test and confirm it fails against the current `4%` grid.

Then expand visual capture targets to cover light and dark modes at:

Expand visual capture targets to cover light and dark modes at:

- 360 × 800;
- 601 × 900, specifically guarding the historical overflow breakpoint;
- 768 × 1024;
- 1280 × 900;
- 1440 × 1000.

Capture Home, Work, Labs, About and the Contact section. Add horizontal-overflow assertions for every target.

### Step 2: Run the new checks before CSS changes

```bash
npm run test:unit -- tests/unit/swiss-foundation.test.js
npm run test:visual
```

Expected: the unit test FAILS on the old grid contrast. The visual run produces baseline captures for deliberate review; do not treat generated screenshots as approval by themselves.

### Step 3: Refine only composition and surface declarations

In existing selectors:

- reduce the decorative dot grid contrast on the white canvas;
- establish consistent left edges and max text measures;
- increase major-section negative space using shared tokens;
- reduce card washes and shadows in favor of white/neutral fields and hairlines;
- use accent for action, focus and small orientation signals, not whole-page decoration;
- simplify surface layering while preserving each component and its geometry;
- retain portrait position and crop;
- preserve header, dock, rail, mobile composition and breakpoints unless a non-motion spacing fix is required;
- do not add Swiss flags, crosses, posters, oversized numerals as decoration or copied Parloa modules.

Never edit declarations containing `animation`, `transition`, `duration`, `easing`, motion transforms, sticky behavior, or scroll behavior in this task. If an intended visual adjustment requires one, defer it.

### Step 4: Inspect every required viewport

Run:

```bash
npm run test:unit -- tests/unit/swiss-foundation.test.js
npm run test:visual
```

Open the generated captures and compare:

- no horizontal overflow;
- no clipped serif headings;
- coherent EN/FR wrapping;
- readable body measure;
- stronger left-edge alignment;
- lighter canvas and calmer cards;
- unchanged motion behavior.

### Step 5: Run accessibility and navigation checks

```bash
npm run test:a11y
npm run test:e2e
```

Expected: PASS.

### Step 6: Verify motion diff and commit

Run the Task 1 motion command. Expected: no diff. Then:

```bash
git add -- portfolio/src/app/globals.css portfolio/src/app/signature.css portfolio/design-system/components/work/ProjectCard.jsx portfolio/src/components/ds/ProjectCard.jsx portfolio/tests/unit/swiss-foundation.test.js portfolio/tests/e2e/visual-capture.spec.js
git commit -m "feat(portfolio): refine Swiss grid and surfaces"
```

Stage only files that actually changed.

---

## Task 7: Align metadata and social sharing

**Files:**

- Modify: `src/app/(en)/layout.jsx`
- Modify: `src/app/fr/layout.jsx`
- Modify: `src/app/opengraph-image/route.js`
- Modify: `src/components/site/SiteDocument.jsx`
- Modify: `tests/unit/swiss-foundation.test.js`

### Step 1: Write failing metadata assertions

Require:

- title and descriptions lead with Product Designer and complex-product clarity;
- no `building with code`, Frontend target or support positioning in root metadata;
- theme color uses the new page color;
- social image copy and colors match the new system;
- Person schema remains factual and uses the canonical hero lead.

### Step 2: Run and confirm failure

```bash
npm run test:unit -- tests/unit/swiss-foundation.test.js
```

### Step 3: Update metadata and social image

- Use concise EN/FR titles centered on Product Design.
- Set light theme color to `#FFFFFF`.
- Update the social card to the new type roles and palette.
- For the social route, use bundled/local font data compatible with `ImageResponse` if available; do not add a second runtime Google Fonts stylesheet. If reliable bundling is not possible in this release, use Satori's deterministic fallback and document the limitation rather than fetching typography at request time.
- Keep the public image URL stable.

### Step 4: Test route and build

```bash
npm run test:unit -- tests/unit/swiss-foundation.test.js
npm run build
```

Expected: PASS and `/opengraph-image` remains buildable.

### Step 5: Commit metadata alignment

```bash
git add -- portfolio/src/app/'(en)'/layout.jsx portfolio/src/app/fr/layout.jsx portfolio/src/app/opengraph-image/route.js portfolio/src/components/site/SiteDocument.jsx portfolio/tests/unit/swiss-foundation.test.js
git commit -m "feat(portfolio): align discovery with Product Design"
```

---

## Task 8: Full verification and Release 0 evidence

**Files:**

- Create: `docs/superpowers/evidence/2026-10-07-swiss-foundation-release.md`
- Modify only if a test finds a regression: files already listed in Tasks 2–7

### Step 1: Run the complete automated gate

```bash
npm run lint
npm run test:unit
npm run build
npm run test:e2e
npm run test:a11y
npm run test:visual
git diff --check
```

Expected: all commands PASS. If one fails, use `superpowers:systematic-debugging`; do not weaken or delete the failing assertion to obtain green output.

### Step 2: Perform manual browser QA

Inspect EN and FR in light and dark modes with keyboard only at the five target widths. Record:

- current identity and first-screen clarity;
- font rendering and fallback behavior;
- no clipped text or overflow;
- focus visibility and contrast;
- Home → Work and Home → About CTA destinations;
- locale switch retention on hub pages;
- Contact reason and validation;
- reduced-motion behavior;
- unchanged header, rail/dock, reveal, scramble and smooth-scroll behavior.

Do not claim manual screen-reader validation unless it is actually performed.

### Step 3: Prove the protected motion surface is unchanged

Run the Task 1 motion command against the pre-Release-0 commit. Inspect output manually. Expected: no change to any protected motion file or motion declaration.

Also run:

```bash
git status --short
git diff --stat HEAD~1..HEAD -- portfolio
```

Confirm that unrelated untracked directories remain untouched.

### Step 4: Write the evidence note

Record:

- exact commit range;
- commands and pass/fail results;
- tested viewport/mode/locale matrix;
- actual manual checks completed;
- any deferred issues;
- explicit statement that Relay, Basis, Signalroom and generated case imagery are not part of Release 0.

### Step 5: Commit the evidence

```bash
git add -- portfolio/docs/superpowers/evidence/2026-10-07-swiss-foundation-release.md
git commit -m "docs(portfolio): record Swiss foundation verification"
```

---

## Release 0 done means

- the deployed UI is still recognizably the current portfolio, not a new template;
- the background is lighter and the surfaces calmer;
- Geist, Instrument Serif and Geist Mono are loaded once and used by role;
- Product Designer is the unambiguous professional target;
- support and frontend remain capabilities/context, not the destination;
- motion and fluidity are unchanged;
- EN/FR, light/dark, keyboard, responsive and build gates pass;
- no future case is presented as finished;
- each task is represented by a small, reviewable Git commit.

The next plan begins Release A: Relay research, exactly three image-based visual directions, prototype implementation, validation and honest case publication.
