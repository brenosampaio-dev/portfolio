# Swiss Editorial Landing Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver a visibly redesigned, locally reviewable landing-page foundation that combines Swiss editorial typography and grid discipline with the current portfolio's motion, orientation, accessibility, and truthful content.

**Architecture:** Migrate the global design tokens, add one late-loaded scoped landing stylesheet, preserve the existing Lenis/GSAP and navigation responsibilities, extract the hero and editorial work card into focused components, and expose any unselected-case mock only behind a server-side local preview flag plus query parameter. The normal public route remains truthful when `work.items` is empty.

**Tech Stack:** Next.js 16 App Router, React 19, CSS custom properties, GSAP 3, Lenis, Vitest, Testing Library, Playwright, Axe.

**Spec:** [`docs/superpowers/specs/2026-10-03-swiss-editorial-landing-foundation-design.md`](../specs/2026-10-03-swiss-editorial-landing-foundation-design.md)

## Global Constraints

- Work from the parent Git root: `/media/sampaioreimao/BRENO - SSD/10 - Projetos ativos/Meus projetos`.
- Stage only explicit `portfolio/**` paths. Do not stage sibling `docs/`, `hertwill-shopify-store-ops/`, `triageai/`, or generated `portfolio/output/` files.
- Preserve `SmoothScroll`, `Reveal`, `Scramble`, `ScrollProgress`, `SectionJumpNav`, mobile dock gestures, adaptive header contrast, locale routing, theme controls, and CV/contact behaviour.
- Keep the Swiss-army-knife concept out of this phase.
- Do not invent a case study, metric, employer claim, or project image.
- The editorial placeholder card may appear only when both `PORTFOLIO_DESIGN_PREVIEW=1` and `?design=swiss-landing` are present.
- Do not deploy or push. Breno reviews local desktop/mobile evidence first and authorizes deployment separately.
- Keep all meaningful visible text at 12px or above and all interactive targets at least 44px.
- Make reduced-motion and no-animation fallbacks fully readable; animation may enhance content but never gate it.

## Review Focus

- Font loading failure: the Helvetica/Arial/system fallbacks must retain hierarchy without clipping or layout collapse.
- Empty/paused work data: the normal route must show honest, non-interactive status; the placeholder must never leak without both preview gates.
- Touch/coarse pointer: native scroll and the existing mobile dock remain usable with no hover dependency.
- Reduced motion or JavaScript failure: hero, card, labels, and actions remain visible and usable.
- Narrow and enlarged layouts: verify 320px, 390px, 1440px, and effective 200% zoom with long English and French strings.

---

## Task 1: Capture the baseline and install the Swiss token foundation

**Files:**

- Modify: `portfolio/tests/unit/design-tokens.test.js`
- Modify: `portfolio/design-system/tokens/fonts.css`
- Modify: `portfolio/design-system/tokens/colors.css`
- Modify: `portfolio/design-system/tokens/typography.css`
- Modify: `portfolio/design-system/tokens/spacing.css`
- Modify: `portfolio/design-system/tokens/motion.css`
- Modify: `portfolio/src/components/site/SiteDocument.jsx`
- Generate but do not commit: `portfolio/output/visual-baseline/swiss-landing-before/`

**Interfaces and invariants:**

- `--font-display` resolves to Inter Tight with narrow sans-serif fallbacks.
- `--font-sans` resolves to Inter with system sans-serif fallbacks.
- `--font-mono` resolves to IBM Plex Mono with system monospace fallbacks.
- Light theme: paper `#F5F3ED`, surface `#EBE8E0`, ink `#151515`, muted `#5C5C58`, hairline `#CECBC3`, signal `#B4232B`.
- Dark theme: paper `#11110F`, surface `#1B1B18`, ink `#F5F3ED`, muted `#AAA69E`, hairline `#353531`, signal `#D14A50`.
- Preserve aliases still consumed outside the redesigned scope by pointing them to the new semantic tokens instead of deleting them.

- [ ] From `portfolio/`, build/start the untouched current app and capture baseline screenshots of `/` at 390x844 and 1440x900, light and dark, into `output/visual-baseline/swiss-landing-before/`. Record the current commit SHA in a small text manifest beside the captures.
- [ ] Update `tests/unit/design-tokens.test.js` first so it expects the approved font stacks, both new palettes, the 8px-derived spacing scale, the display/body/metadata floors, and the existing readable motion cadence.
- [ ] Run `npm run test:unit -- tests/unit/design-tokens.test.js` and confirm it fails on the old DM Sans/Cormorant and old canvas/accent values.
- [ ] Update the six token files. Add semantic aliases rather than broad search-and-replace changes in unrelated component CSS.
- [ ] In `SiteDocument.jsx`, replace the current DM Sans/Cormorant Google Fonts request with one request for Inter Tight, Inter, and IBM Plex Mono using `display=swap`; keep preconnects and the existing theme bootstrap.
- [ ] Remove any duplicate remote `@import` from `fonts.css` so fonts are requested once.
- [ ] Run `npm run test:unit -- tests/unit/design-tokens.test.js` and confirm it passes.
- [ ] Run `npm run lint` and inspect `/` with network font requests blocked to confirm fallback text is not clipped.
- [ ] Commit only these files with `git commit -m "feat(portfolio): establish Swiss editorial tokens"`.

## Task 2: Turn the header and progress system into a Swiss instrument

**Files:**

- Create: `portfolio/src/app/swiss-landing.css`
- Modify: `portfolio/src/components/site/SiteDocument.jsx`
- Modify: `portfolio/src/components/site/ScrollProgress.jsx`
- Create: `portfolio/tests/unit/swiss-landing-contract.test.js`

**Interfaces and invariants:**

- `SiteDocument` imports `swiss-landing.css` after `globals.css` and `signature.css`, making it the narrow override layer.
- Each desktop rail anchor contains a visible `.rail__index` with `01`, `02`, etc.; the existing section collection, href, hover state, and active logic remain unchanged.
- The desktop header is one coherent surface with restrained hairlines and an emphasized CV utility action; its existing controls and responsive collapse remain intact.
- The mobile dock retains the same links, labels, swipe path, and active state; only its visual language changes.

- [ ] Add `tests/unit/swiss-landing-contract.test.js` with file-level assertions that the stylesheet is imported last, the rail renders `.rail__index`, the stylesheet defines a 12-column desktop grid, a 6-column tablet grid, a 4-column/mobile flow, the approved page margin, and pointer/reduced-motion media queries.
- [ ] Run `npm run test:unit -- tests/unit/swiss-landing-contract.test.js` and confirm failure because the stylesheet and rail indices do not exist.
- [ ] Create `src/app/swiss-landing.css` with scoped header, `.rail`, `.rail-mini`, and `.case-dock` overrides. Reuse existing DOM/classes; do not create another navigation system.
- [ ] Add two-digit rail indices in `ScrollProgress.jsx`, mark decorative numerals consistently with the rail's existing `aria-hidden`, and leave the accessible `SectionJumpNav` untouched.
- [ ] Import the new stylesheet last in `SiteDocument.jsx`.
- [ ] At coarse-pointer and mobile breakpoints, hide the desktop rail and retain the dock. Ensure all dock anchors keep 44px effective hit areas.
- [ ] Run the focused unit contract and `npm run test:unit`.
- [ ] Run `npm run lint`.
- [ ] Commit with `git commit -m "feat(portfolio): refine header and progress instrument"`.

## Task 3: Extract and rebuild the hero as the Swiss editorial opening

**Files:**

- Create: `portfolio/src/components/site/SwissHero.jsx`
- Modify: `portfolio/src/components/site/HomeContent.jsx`
- Modify: `portfolio/src/app/swiss-landing.css`
- Modify: `portfolio/src/lib/portfolioV2.js`
- Create: `portfolio/tests/components/swiss-hero.test.jsx`
- Modify: `portfolio/tests/unit/portfolio-content.test.js`

**Component contract:**

```jsx
<SwissHero
  content={content.hero}
  resume={legacy.resume}
  lang={lang}
/>
```

`SwissHero` owns only the `#top` section and composes the existing `LocationTime`, `Scramble`, `Reveal`, `Text`, `Button`, and current portrait. It does not own global scrolling or animation orchestration.

- [ ] Write `tests/components/swiss-hero.test.jsx` first. Assert one accessible H1, location/status presence, portrait alt text, `#work` primary CTA, localized downloadable CV CTA, and no GitHub action in the hero.
- [ ] Extend `portfolio-content.test.js` to expect `View selected work` / `Voir les projets sélectionnés` and `Download CV` / `Télécharger le CV` hero actions while retaining verified identity and location content.
- [ ] Run the two focused test files and confirm they fail before `SwissHero` exists and while old action labels remain.
- [ ] Create `SwissHero.jsx`. Preserve the portrait asset and protected reveal primitives, but use editorial wrappers and explicit class names rather than inline layout styles.
- [ ] Replace only the current hero block in `HomeContent.jsx` with `SwissHero`; leave the remaining sections in place.
- [ ] Implement the asymmetric 12-column desktop composition and the single-flow mobile composition in `swiss-landing.css`: oversized Inter Tight display, readable lead width, mono metadata, squared/low-radius portrait frame, and large intentional negative space.
- [ ] Sequence motion with transform/opacity only: metadata, headline, lead/actions, then portrait. Reuse `Reveal`/`Scramble`; do not add a second animation library or looping spectacle.
- [ ] Ensure the content is already visible when reduced motion is requested and remains readable if the font request fails.
- [ ] Run the focused tests, `npm run test:unit`, and `npm run lint`.
- [ ] Commit with `git commit -m "feat(portfolio): rebuild the landing hero"`.

## Task 4: Build Selected Work without publishing invented evidence

**Files:**

- Create: `portfolio/src/components/site/EditorialWorkCard.jsx`
- Create: `portfolio/src/components/site/SelectedWorkFoundation.jsx`
- Create: `portfolio/src/lib/designPreview.js`
- Modify: `portfolio/src/components/site/HomeContent.jsx`
- Modify: `portfolio/src/app/(en)/page.jsx`
- Modify: `portfolio/src/app/fr/page.jsx`
- Modify: `portfolio/src/app/swiss-landing.css`
- Modify: `portfolio/tests/components/global-navigation.test.jsx`
- Create: `portfolio/tests/unit/design-preview.test.js`

**Component contracts:**

```jsx
<SelectedWorkFoundation
  content={content.work}
  statusLabel={content.statusLabels[content.work.status]}
  href={`${prefix}/work`}
  previewMode={previewMode}
/>
```

```jsx
<EditorialWorkCard
  index="01"
  title="[PLACEHOLDER — CASE NOT SELECTED]"
  role="Product design"
  status="Internal visual preview"
  summary="Layout preview only. Not a published case study."
  preview
/>
```

`EditorialWorkCard` renders a semantic `article`. When `preview` is true it must not render an anchor or imply a completed case. Future real cards may receive an `href`, but this task does not wire one.

- [ ] Write `design-preview.test.js` first for `resolveSwissLandingPreview(searchParams, env)`. Assert false with no env, false with no matching query, and true only with both gates.
- [ ] Extend the component test first to assert that the preview card is an `article`, contains the explicit placeholder/status language, and has no link or button.
- [ ] Run the focused tests and confirm failure.
- [ ] Implement `src/lib/designPreview.js` as a pure resolver that accepts the awaited query object and an injected environment value, so it is deterministic and testable.
- [ ] Make both locale page components async, await `searchParams`, resolve the preview flag, and pass `previewMode` to `HomeContent`.
- [ ] Create `EditorialWorkCard` and `SelectedWorkFoundation`. In normal mode, reuse `WorkStatusPanel` and the real work-index link. In preview mode, place the clearly labelled internal card beneath the same truthful section heading.
- [ ] Recompose `#work` in `HomeContent` through `SelectedWorkFoundation`; do not change `content.work.items` and do not promote existing support cases as Product Design work.
- [ ] Style the card as a wide editorial band with an image/prototype placeholder area, title, role, status, summary, and index. Use hierarchy, hairlines, and offset grid placement instead of dashboard-card chrome.
- [ ] Configure Playwright's local `webServer.command` in Task 5 to set `PORTFOLIO_DESIGN_PREVIEW=1`; production and ordinary local routes without `?design=swiss-landing` remain truthful.
- [ ] Run the focused tests, `npm run test:unit`, and `npm run lint`.
- [ ] Commit with `git commit -m "feat(portfolio): add truthful selected-work foundation"`.

## Task 5: Integrate motion, responsive behaviour, and accessibility gates

**Files:**

- Modify: `portfolio/src/app/swiss-landing.css`
- Modify: `portfolio/playwright.config.js`
- Modify: `portfolio/tests/e2e/navigation.spec.js`
- Modify: `portfolio/tests/e2e/accessibility.spec.js`
- Modify: `portfolio/tests/e2e/visual-capture.spec.js`

**Behavioural gates:**

- Desktop hover/fine pointer keeps Lenis, rail labels, and restrained image/card responses.
- Touch/coarse pointer uses native scrolling and the existing dock; no information depends on hover.
- `prefers-reduced-motion: reduce` removes staged offsets/transitions and exposes final states immediately.
- At 320px, 390px, and effective 200% zoom there is no horizontal document overflow, clipped H1, or header/dock collision.
- EN and FR retain one H1, correct landmarks, focus order, and visible focus.

- [ ] Add failing navigation assertions for the hero `#work` CTA, downloadable CV, rail indices on desktop, and truthful work status on ordinary `/` and `/fr` routes.
- [ ] Add failing preview assertions for `/?design=swiss-landing`: the placeholder card exists only with the test server env and remains non-interactive.
- [ ] Add accessibility coverage for the redesigned `/`, `/fr`, and preview route at 390px and 1440px, including reduced motion and keyboard traversal.
- [ ] Add focused visual captures named `swiss-after-{theme}-{width}-{locale}.png`, plus rail, mobile dock, reduced-motion, and 200%-reflow states. Keep the existing broader capture matrix intact.
- [ ] Change only the Playwright web-server command to run build/start with `PORTFOLIO_DESIGN_PREVIEW=1`; normal route behaviour is still controlled by the absent query parameter.
- [ ] Finish the CSS media queries and focus states until the new tests pass. Prefer transform/opacity for motion and keep signal red under approximately 3% of the viewport.
- [ ] Run `npm run test:e2e`.
- [ ] Run `npm run test:a11y`.
- [ ] Run `npm run test:visual` and inspect the focused Swiss captures; screenshot generation alone is not visual approval.
- [ ] Run `npm run lint`.
- [ ] Commit with `git commit -m "test(portfolio): gate Swiss landing interactions"`.

## Task 6: Produce the local review package and stop before deployment

**Files:**

- Create: `portfolio/docs/reviews/2026-10-03-swiss-editorial-landing-foundation-validation.md`
- Generate but do not commit: `portfolio/output/visual-review/swiss-landing-after/`

- [ ] Run `npm run test:unit` and record exact pass/fail counts.
- [ ] Run `npm run test:e2e` and record exact pass/fail counts.
- [ ] Run `npm run test:a11y` and record exact pass/fail counts.
- [ ] Run `npm run build` and record the route/build result.
- [ ] Run `npm audit --omit=dev` and record the dated result separately from functional quality.
- [ ] Start the local production server with `PORTFOLIO_DESIGN_PREVIEW=1` and capture `/` plus `/?design=swiss-landing` at 390x844 and 1440x900 in both themes.
- [ ] Visually compare each after capture with Task 1's same-size baseline. Check hierarchy, typography, palette, composition, rail/dock, hero motion, work transition, long FR copy, fallback fonts, and reduced motion.
- [ ] Write the validation document with: changed surfaces, preserved behaviours, test evidence, known limitations, screenshot paths, and a clear statement that the placeholder is not public evidence.
- [ ] Inspect `git diff --check`, `git status --short`, and the staged diff. Confirm no generated output or sibling directories are staged.
- [ ] Commit the validation document with `git commit -m "docs(portfolio): record Swiss landing validation"`.
- [ ] Open the local preview for Breno and provide the desktop/mobile before-and-after evidence. Stop here. Do not push, merge, or deploy until Breno explicitly approves the rendered result.

## Completion Criteria

- [ ] The visible redesign is obvious at 390px and 1440px without a verbal explanation.
- [ ] The current motion/orientation system still works and feels intentional.
- [ ] The normal route contains no placeholder or invented project claim.
- [ ] The preview placeholder requires both the server flag and query parameter.
- [ ] Unit, navigation, accessibility, build, and manual visual checks are documented with exact results.
- [ ] The implementation is committed in reviewable units.
- [ ] No remote push or deployment has occurred.
