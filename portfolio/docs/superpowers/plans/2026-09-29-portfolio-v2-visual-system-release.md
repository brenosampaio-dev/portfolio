# Portfolio v2 Visual System Implementation and Release Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bring the existing portfolio v2 implementation into full conformance with the approved Shibui Digital / Technical Iki visual specification, preserve every protected interaction, validate the complete English/French experience, and release the verified portfolio publicly through Vercel.

**Architecture:** Keep the current Next.js App Router application, route structure, bilingual content model, GSAP/Lenis enhancement layer, and protected navigation system. Close visual-system gaps at the token layer first, then refine global composition and feature-specific surfaces without changing information architecture. Pin the visual rules with Vitest and Playwright before each implementation slice. Release from `main` only after local QA, GitHub/Vercel checks, a truthful Work-page publication decision, and a signed-out production smoke test.

**Tech Stack:** Next.js 16, React 19, JavaScript/JSX, CSS custom properties, GSAP, Lenis, Vitest, Testing Library, Playwright, `@axe-core/playwright`, GitHub Actions, Vercel.

**Specs:**

- `docs/superpowers/specs/2026-09-21-portfolio-v2-visual-system-design.md`
- `docs/superpowers/specs/2026-09-21-portfolio-v2-information-architecture-design.md`
- `docs/superpowers/specs/2026-09-21-portfolio-v2-delivery-strategy-design.md`
- `docs/portfolio-v2-implementation-log.md`

## Global Constraints

- Work on the current `main` branch. Do not create a long-lived branch or worktree.
- The actual Git root is `.../Meus projetos`; stage only explicit `portfolio/**` paths.
- Preserve the unrelated untracked siblings `docs/`, `hertwill-shopify-store-ops/`, and `triageai/` at the Git root.
- Do not force-push, rewrite history, move the recovery tag, commit secrets, or use destructive resets.
- Preserve the glass header, desktop progress rail, mobile dock, section-location labels, theme and language controls, smooth scrolling, Reveal, masked Reveal, Scramble, ProcessReveal, sticky project scenes, progress fill, collapsibles, image expansion, back-to-top, and reduced-motion fallbacks.
- Preserve all current stable section IDs and localized `data-label`/`aria-label` values consumed by `ScrollProgress`.
- Keep DM Sans, Cormorant Garamond, the system monospace stack, the current warm-neutral light/dark canvases, and Indigo as the single primary accent.
- Do not invent project outcomes, clients, participants, metrics, shipped status, production links, GitHub links, or Figma evidence.
- No meaningful visible text may render below 12px. WCAG 2.2 AA remains the minimum accessibility target.
- Validate 320, 390, 768, 1024, and 1440 pixel widths, light and dark themes, keyboard navigation, no-JavaScript content, and reduced motion.
- Keep Vercel protection enabled until every release gate passes. Removing protection is the final release action, not a development shortcut.
- If the Work page still says `selection paused` and presents no qualifying project, stop before public release. Breno must explicitly select at least one truthful existing case for prominence or explicitly revise the previously approved release gate.

## Review Focus

- The portfolio must look quieter, more deliberate, and more legible without losing its recognizable motion language.
- The desktop rail and mobile dock must still indicate the exact current section after spacing and rhythm changes.
- Long pages and case studies must have clear chapter pacing rather than identical 120px gaps.
- Scramble must resolve within 800–1000ms, never delay comprehension, and never overlap multiple labels in one viewport.
- Work showcase scenes must avoid long empty scroll bands while retaining sticky progress behaviour on desktop and natural flow on mobile.
- Case evidence must remain visually dense but readable, including labels that currently render at 9–11px.
- The public launch must not expose a visually polished but substantively empty Work page.

## Expected Files

### Existing files modified

- `design-system/tokens/typography.css`
- `design-system/tokens/spacing.css`
- `design-system/tokens/motion.css`
- `src/app/globals.css`
- `src/components/site/Scramble.jsx`
- `src/components/site/WorkShowcase.css`
- `src/components/site/CaseVisual.css`
- `tests/unit/design-tokens.test.js`
- `tests/e2e/accessibility.spec.js`
- `tests/e2e/navigation.spec.js`
- `tests/e2e/visual-capture.spec.js`
- `docs/portfolio-v2-implementation-log.md`

### Conditional files

- `src/components/site/WorkContent.jsx`
- `src/lib/portfolioV2.js`

These two files change only after Breno makes the release-gate decision about which existing truthful case, if any, should receive prominence. Visual implementation must not silently make that editorial decision.

---

### Task 1: Pin the Approved Visual Contract with Failing Tests

**Files:**

- Modify: `tests/unit/design-tokens.test.js`
- Modify: `tests/e2e/accessibility.spec.js`
- Modify: `tests/e2e/navigation.spec.js`

**Interfaces:**

- Consumes: approved token, motion, minimum-type, section-tracking, and protected-surface requirements.
- Produces: focused failures for every confirmed gap before product CSS changes.

- [ ] **Step 1: Extend the token assertions**

Add exact assertions for:

```js
expect(motion).toContain("--duration-hover: 160ms");
expect(motion).toContain("--duration-reveal: var(--duration-lg)");
expect(spacing).toContain("--radius-md: 10px");
expect(spacing).toContain("--radius-lg: 16px");
expect(spacing).not.toMatch(/--radius-xl:\s*(?:2[0-9]|3[0-2])px/);
```

Read `src/components/site/Scramble.jsx`, `WorkShowcase.css`, `CaseVisual.css`, and `src/app/globals.css` in the same test file. Assert a 0.8–1.0 second default Scramble, a maximum 200ms delay, 12px disclosure/case labels, restrained card radii, and the approved desktop WorkShowcase height bands.

- [ ] **Step 2: Add rendered microtype coverage**

In `accessibility.spec.js`, inspect visible non-decorative labels on Home and each English case route. Fail when a visible label, tag, metadata item, form label, disclosure, or evidence caption computes below 12px. Exclude visually hidden text and icon-only decorative elements explicitly rather than using a broad selector exception.

- [ ] **Step 3: Extend protected-surface navigation coverage**

In `navigation.spec.js`, verify after real scrolling that:

- the desktop rail changes its active label;
- the mobile dock changes its active section;
- the target section receives focus after keyboard activation;
- case collapsibles open and close without changing stable section IDs;
- reduced motion leaves the current-section indicator functional.

- [ ] **Step 4: Run the focused RED tests**

```bash
npm run test:unit
npm run test:a11y
npm run test:e2e
```

Expected: new visual-contract assertions fail for the known 9–11px labels, oversized WorkShowcase radii/heights, and 220ms hover timing. Existing navigation and accessibility checks must remain green; unexpected failures stop implementation for diagnosis.

- [ ] **Step 5: Commit the test contract**

From the Git root:

```bash
git add -- portfolio/tests/unit/design-tokens.test.js portfolio/tests/e2e/accessibility.spec.js portfolio/tests/e2e/navigation.spec.js
git diff --cached --check
git commit -m "test(portfolio): pin visual system release contract"
```

---

### Task 2: Correct Tokens and Global Visual Foundations

**Files:**

- Modify: `design-system/tokens/typography.css`
- Modify: `design-system/tokens/spacing.css`
- Modify: `design-system/tokens/motion.css`
- Modify: `src/app/globals.css`
- Test: `tests/unit/design-tokens.test.js`
- Test: `tests/e2e/accessibility.spec.js`

**Interfaces:**

- Consumes: semantic tokens already used across the site.
- Produces: one authoritative scale for typography, spacing, radii, glass, shadows, and motion.

- [ ] **Step 1: Remove remaining token drift**

Implement these exact roles:

```css
--duration-hover: 160ms;
--section-compact: 64px;
--section-standard: 80px;
--section-emphasis: 120px;
--radius-xs: 2px;
--radius-sm: 6px;
--radius-md: 10px;
--radius-lg: 16px;
```

Remove or alias oversized general-purpose radius tokens so 20–32px is not the default card language. Preserve `--radius-full` for pills and the header/mobile dock.

- [ ] **Step 2: Correct every meaningful sub-12px rule**

Raise remaining visible 9px, 10px, and 11px declarations in `globals.css` to the appropriate 12–13px role. Cover language controls, case metadata, dashboard specimens, review tags, draft labels, and responsive overrides. Do not enlarge purely decorative measurements or hidden accessibility helpers.

- [ ] **Step 3: Restrain material effects**

Keep the canvas dot grid within 3–4% light and 2–3% dark opacity. Keep glass blur within 16–20px where visually equivalent. Retain only functional elevation on header, dock, menus, sticky cards, and expanded media. Remove duplicated decorative shadows from nested flat surfaces.

- [ ] **Step 4: Apply semantic section rhythm**

Map page openings and decisive closing sections to emphasis spacing, ordinary content chapters to standard spacing, and dense evidence/utility chapters to compact spacing. Ensure consecutive sections do not all use 120px and each section’s internal gap remains smaller than its external separation.

- [ ] **Step 5: Run focused GREEN checks**

```bash
npm run test:unit
npm run test:a11y
npm run lint
```

Expected: token and rendered-type assertions pass; there is no new horizontal overflow or target-size regression.

- [ ] **Step 6: Commit foundations**

```bash
git add -- portfolio/design-system/tokens/typography.css portfolio/design-system/tokens/spacing.css portfolio/design-system/tokens/motion.css portfolio/src/app/globals.css
git diff --cached --check
git commit -m "style(portfolio): refine visual foundations and rhythm"
```

---

### Task 3: Refine Motion Cadence Without Removing Effects

**Files:**

- Modify: `src/components/site/Scramble.jsx`
- Modify: `src/app/globals.css`
- Test: `tests/unit/design-tokens.test.js`
- Test: `tests/e2e/navigation.spec.js`

**Interfaces:**

- Consumes: server-rendered text plus optional GSAP/ScrollTrigger enhancement.
- Produces: faster, calmer motion with identical no-JavaScript and reduced-motion meaning.

- [ ] **Step 1: Lock the Scramble timing**

Keep the default at `0.9` seconds, cap passed duration to 0.8–1.0 seconds, keep delay capped at 200ms, and reduce `revealDelay` so short labels never remain unreadable for most of the animation. Preserve one-shot activation, plain-text fallback, cleanup, and reduced-motion early return.

- [ ] **Step 2: Normalize entrance cadence**

Use 420–520ms for content reveals, 240–300ms for state morphs, 150–160ms for hover response, and 640–1000ms only for rare illustrative sequences. Replace the shared 700ms sequential reveal duration where it affects normal content, while preserving intentional dashboard illustration timing.

- [ ] **Step 3: Prevent simultaneous noise**

Keep Scramble only on short eyebrow/section labels. Stagger or suppress nearby triggers so one viewport does not visibly run several Scramble effects at once. Do not apply it to body copy, navigation, primary actions, or essential instructions.

- [ ] **Step 4: Verify fallbacks**

```bash
npm run test:unit
npm run test:e2e
npm run test:a11y
```

Expected: normal motion preserves rail/dock tracking; reduced motion and no-JavaScript expose complete text and navigation.

- [ ] **Step 5: Commit motion refinement**

```bash
git add -- portfolio/src/components/site/Scramble.jsx portfolio/src/app/globals.css
git diff --cached --check
git commit -m "style(portfolio): tune protected motion cadence"
```

---

### Task 4: Refine Work and Case-Study Surfaces

**Files:**

- Modify: `src/components/site/WorkShowcase.css`
- Modify: `src/components/site/CaseVisual.css`
- Modify: `src/app/globals.css`
- Test: `tests/unit/design-tokens.test.js`
- Test: `tests/e2e/accessibility.spec.js`

**Interfaces:**

- Consumes: existing WorkShowcase markup, current case routes, case collapsibles, evidence visuals, and ScrollProgress section IDs.
- Produces: compact, legible project/case presentation without changing claims or case content.

- [ ] **Step 1: Correct WorkShowcase geometry**

On desktop, use scene bands in the 88–100svh range, a shorter final scene, and sticky cards in the 520–600px target range. Use 16px card radius and 10px media radius. Keep mobile cards in natural document flow with no forced scene height.

- [ ] **Step 2: Correct WorkShowcase microtype and elevation**

Raise the disclosure to 12px, keep category/tools at 13–14px, and use one functional sticky-card shadow rather than stacked elevation. Preserve the progress fill and CTA movement.

- [ ] **Step 3: Correct case-study visual labels**

Raise `CaseVisual.css` captions and every case-specific 9–11px metadata rule in `globals.css` to at least 12px. Preserve dense evidence layouts, code formatting, image expansion, collapsibles, mobile section dock, and stable section identifiers.

- [ ] **Step 4: Verify desktop and mobile interaction**

```bash
npm run test:unit
npm run test:a11y
npm run test:e2e
```

Expected: sticky behaviour still works at 1024/1440, mobile uses natural flow at 320/390, the rail/dock tracks sections, and all visible evidence labels meet the minimum.

- [ ] **Step 5: Commit work/case surfaces**

```bash
git add -- portfolio/src/components/site/WorkShowcase.css portfolio/src/components/site/CaseVisual.css portfolio/src/app/globals.css
git diff --cached --check
git commit -m "style(portfolio): refine work and case study surfaces"
```

---

### Task 5: Expand the Visual QA Matrix and Review Artifacts

**Files:**

- Modify: `tests/e2e/visual-capture.spec.js`
- Modify: `.gitignore` only if new generated artifact paths require it

**Interfaces:**

- Consumes: the live-rendered local production build.
- Produces: reviewable screenshots for all specified widths, themes, protected states, and representative case conditions.

- [ ] **Step 1: Add case routes to the capture matrix**

Capture all published English case routes at 320, 390, 768, 1024, and 1440 in light/dark modes. Keep the non-case English/French route matrix. Use deterministic settling that reveals content without leaving the page at an arbitrary scroll position.

- [ ] **Step 2: Add protected state captures**

Capture:

- desktop rail at a middle section;
- mobile dock on light and dark media;
- open mobile More panel;
- focused section-jump navigation;
- reduced-motion Home and one case route;
- collapsed and expanded case section;
- dense evidence section;
- expanded case image;
- code veil on allowed background and hidden over protected content;
- effective 200% reflow.

- [ ] **Step 3: Run the complete visual capture**

```bash
npm run test:visual
```

Expected: every screenshot completes without test errors. Generated images remain untracked.

- [ ] **Step 4: Inspect representative screenshots manually**

Inspect at minimum Home, Work, About, one long case, dark mode, 320px, 1440px, reduced motion, rail, dock, and 200% reflow. Compare against the visual specification, not against pixel identity with the pre-change version. Record defects before continuing.

- [ ] **Step 5: Fix and rerun until the matrix is clean**

Any correction returns to the relevant Task 2–4 test first. Do not hide a defect by deleting a capture or weakening an assertion.

- [ ] **Step 6: Commit QA coverage**

```bash
git add -- portfolio/tests/e2e/visual-capture.spec.js portfolio/.gitignore
git diff --cached --check
git commit -m "test(portfolio): expand visual release coverage"
```

---

### Task 6: Run the Full Local Release Gate

**Files:**

- Modify: `docs/portfolio-v2-implementation-log.md`

**Interfaces:**

- Consumes: final local code and all automated suites.
- Produces: attributable release evidence and an explicit go/no-go result.

- [ ] **Step 1: Confirm repository scope**

From the Git root:

```bash
git status --short --branch
git diff --check
git log --oneline -12
```

Expected: only intended portfolio changes exist; the known untracked sibling directories remain untouched.

- [ ] **Step 2: Run validation as separate commands**

From `portfolio/`:

```bash
npm run lint
npm run test:unit
npm run build
npm audit --omit=dev
npm run test:e2e
npm run test:a11y
npm run test:visual
```

Record each command and exit status separately. A passing build does not substitute for browser, accessibility, or visual QA.

- [ ] **Step 3: Check truthful publication state**

Review Home, Work, Labs, About, every public case route, metadata, links, and resume URLs. Verify that visible status labels match the underlying evidence and no unfinished card exposes a dead or misleading action.

- [ ] **Step 4: Apply the Work-page release stop condition**

If `WorkContent.jsx` and `portfolioV2.js` still expose `Work · selection paused` with no qualifying project, stop here. Ask Breno to either:

1. select one or more existing truthful cases and their order for prominence; or
2. explicitly approve revising the prior release gate and publishing a portfolio whose Work page states that selection is paused.

Do not select a case silently.

- [ ] **Step 5: Record release evidence**

Append the date, commit SHA, command results, browser matrix result, visual-review result, remaining limitations, Work-page decision, and release status to `docs/portfolio-v2-implementation-log.md`.

- [ ] **Step 6: Commit the QA record**

```bash
git add -- portfolio/docs/portfolio-v2-implementation-log.md
git diff --cached --check
git commit -m "docs(portfolio): record visual release validation"
```

---

### Task 7: Publish, Verify, and Open Production

**Files:**

- Modify: `docs/portfolio-v2-implementation-log.md` after observed production results

**Interfaces:**

- Consumes: a clean local release gate, explicit Work-page decision, and Breno’s request to put the site live.
- Produces: deployed `main`, public canonical domain, and a signed-out verified production experience.

- [ ] **Step 1: Push the verified commits**

From the Git root:

```bash
git push origin main
```

Expected: push succeeds without force and triggers GitHub/Vercel checks.

- [ ] **Step 2: Wait for remote checks**

Verify the exact pushed SHA in GitHub and Vercel. Confirm the deployment is Ready while Vercel Authentication remains active. If any check fails, leave protection on and fix through a new normal commit.

- [ ] **Step 3: Smoke-test the protected deployment**

In an authorized session, verify Home, Work, About, Labs, the selected/promoted case route, one long legacy case, language switching, theme switching, contact form UI, mobile navigation, rail/dock tracking, and resume URLs against the production deployment.

- [ ] **Step 4: Remove Vercel Authentication protection**

Only after Tasks 1–6 and the protected smoke test pass, change Vercel Deployment Protection from `All Deployments` authentication to the approved public-production setting. Do not expose preview deployments more broadly than needed.

- [ ] **Step 5: Perform a signed-out external production smoke test**

From a signed-out/private session, verify the canonical production URL returns portfolio content rather than a Vercel auth redirect. Check the main navigation, Work destination, promoted case, resume files, contact UI, 404 response, theme, language, and one mobile viewport.

- [ ] **Step 6: Record the production result**

Append the public URL, deployed SHA, Vercel Ready state, protection change, signed-out HTTP/browser result, checked routes, resume result, and any non-blocking limitation to `docs/portfolio-v2-implementation-log.md`. Never record cookies, tokens, or bypass values.

- [ ] **Step 7: Commit and push the final release record**

```bash
git add -- portfolio/docs/portfolio-v2-implementation-log.md
git diff --cached --check
git commit -m "docs(portfolio): record public visual release"
git push origin main
```

- [ ] **Step 8: Verify the documentation-only deployment**

Confirm the final SHA reaches Vercel Ready and repeat the signed-out canonical-domain check. The task is complete only when the public URL still serves the verified site.

## Rollback

If a pushed commit causes a release-blocking regression, keep or restore Vercel protection, identify the smallest failing commit, and create a normal revert commit. Validate the reverted state locally before pushing. Use the immutable `portfolio-public-pre-v2-2026-09-21` tag only if incremental reverts cannot restore a stable application. Never discard unrelated files or rewrite shared history.

## Completion Criteria

- approved palette, typography, spacing, radii, materiality, and motion values are present without conflicting overrides;
- all meaningful visible text is at least 12px;
- Home, Work, Labs, About, and case pages show intentional compact/standard/emphasis rhythm;
- WorkShowcase and case evidence remain usable at all required widths;
- all protected effects remain present and functional;
- no-JavaScript and reduced-motion states expose complete content;
- lint, unit, build, production dependency audit, navigation, accessibility, and visual suites pass separately;
- the Work-page publication decision is explicit and truthful;
- the exact pushed SHA is Ready in Vercel;
- the signed-out canonical production URL serves the portfolio and its public resume assets;
- unrelated Git-root siblings remain untouched.
