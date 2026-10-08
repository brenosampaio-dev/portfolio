# Relay Product Proof Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Research, design, build and publish Relay as an honest bilingual independent Product Design case with a functional core workflow and real implemented interface evidence.

**Architecture:** Keep the portfolio shell unchanged. Add one canonical bilingual case source, a focused Relay prototype isolated under `components/relay`, and shared case routes that reuse the existing case shells. Image generation is a visual-direction gate only; published product evidence comes from the implemented prototype and captured browser states.

**Tech Stack:** Next.js 16, React 19, CSS Modules/shared tokens, Vitest, Testing Library, Playwright, Axe, built-in GPT image generation.

**Spec:** `docs/superpowers/specs/2026-10-07-portfolio-lapidation-and-cases-design.md`

## Global Constraints

- Publish Relay as `Independent Product / 2026` with the truthful status `Research prototype` until participant testing is actually complete.
- Use only public desk-research sources and synthetic order data; label both explicitly.
- Never invent a client, team, participant, launch, production use, adoption, business impact, revenue, cost saving or efficiency gain.
- Label real test findings `Validation results`; label unperformed research and usability work `Planned validation`.
- Keep the current portfolio architecture, header, portrait, cards, responsive foundation and editorial character.
- Do not change motion, transitions, durations, easing, delays, scroll behavior, sticky behavior, reduced-motion behavior or protected motion files.
- Keep Geist, Instrument Serif and Geist Mono token-driven; Relay UI consumes existing aliases rather than introducing page-local fonts.
- Preserve the approved light palette `#FFFFFF`, `#F3F2EE`, `#DEDCD6`, `#5F5B56`, `#1F1C1B`, `#C74624` and its existing dark equivalents.
- Create exactly three independent `1440×1024` visual directions and stop for the user's selection before implementing UI.
- Generated UI directions are design targets, never evidence of a working product. Published interface captures must come from the coded prototype.
- Every English case route has a French equivalent using the same slug, with reciprocal canonical/alternate metadata and locale switching.
- Stage only explicit `portfolio/**` paths from the parent Git root. Preserve unrelated untracked directories.

## Review Focus

- A direct visit to `/fr/work/relay` must render only French case content and map back to `/work/relay` without losing the route.
- A user without approval authority must see the sensitive resolution as blocked and must not be able to approve it.
- Empty, loading, error, blocked and resolved states must communicate status with text, not color alone, and remain keyboard reachable.
- Synthetic order records must never resemble real customer data or lose their synthetic-data disclosure in the case or prototype.
- At 360px, 601px, 768px, 1280px and 1440px, the dense queue and detail workflow must reflow without horizontal page overflow.

---

### Task 1: Build the source-backed Relay research foundation

**Files:**
- Create: `docs/research/relay/2026-10-08-desk-research.md`
- Create: `src/lib/relayResearch.js`
- Create: `tests/unit/relay-research.test.js`

**Interfaces:**
- Consumes: Relay problem, users, MVP and honesty contract from the master spec.
- Produces: `relayResearchSources`, `relayWorkflow`, `relayResearchDisclosure` for case content and prototype decisions.

- [ ] **Step 1: Write the failing source-contract test**

Require at least one dated primary/public source for ecommerce orders, carrier tracking, consumer/customer-service handling and cross-border/compliance context; require every source to expose `title`, `url`, `publisher`, `accessedOn`, `supports` and `kind`; require `accessedOn` to equal `2026-10-08`; reject invented interview or impact claims.

- [ ] **Step 2: Run the test and confirm RED**

Run: `npm run test:unit -- --run tests/unit/relay-research.test.js`

Expected: FAIL because `relayResearch.js` does not exist.

- [ ] **Step 3: Browse and write the research register**

Use current primary sources only. Separate verified workflow facts, reasonable design assumptions and unanswered interview questions in the Markdown note. Do not treat the Parloa marketing site as domain research; it is visual context only.

- [ ] **Step 4: Implement the exported research model**

Export:

```js
export const relayResearchDisclosure
export const relayResearchSources
export const relayWorkflow
export function getRelayResearchSummary(lang = "en")
```

The workflow stages are exactly `queue`, `investigate`, `assign`, `resolve`, `approve`, `close`.

- [ ] **Step 5: Run GREEN and verify links**

Run: `npm run test:unit -- --run tests/unit/relay-research.test.js && npm run lint`

Expected: PASS; every source URL resolves or has a documented access limitation.

- [ ] **Step 6: Commit**

```bash
git add -- portfolio/docs/research/relay/2026-10-08-desk-research.md portfolio/src/lib/relayResearch.js portfolio/tests/unit/relay-research.test.js
git commit -m "docs(portfolio): ground Relay in public research"
```

---

### Task 2: Generate and select the Relay visual direction

**Files:**
- Create: `docs/design/relay/references/portfolio-home-1440.png`
- Create: `docs/design/relay/references/parloa-home-1440.png`
- Create: `docs/design/relay/visual-directions/2026-10-08/option-1.png`
- Create: `docs/design/relay/visual-directions/2026-10-08/option-2.png`
- Create: `docs/design/relay/visual-directions/2026-10-08/option-3.png`
- Create: `docs/design/relay/visual-directions/2026-10-08/selection.md`

**Interfaces:**
- Consumes: current portfolio capture, captured Parloa reference, Relay brief, current design tokens and Task 1 workflow.
- Produces: one user-selected visual target with its displayed option number and immutable saved image path.

- [ ] **Step 1: Capture both references**

Capture the current local Home at `1440×1024` and the current Parloa homepage at the same width. Inspect both images directly. Record that Parloa supplies grid/spacing/editorial principles only—not its brand, components, orange palette, conversation motif, photography or layout.

- [ ] **Step 2: Generate exactly three independent directions**

Use the Product Design ideation workflow and built-in Image Gen. Issue three separate calls, each for one `1440×1024` focused Relay exception-queue screen. Attach both captures. Preserve the portfolio palette/type roles and vary information hierarchy, workflow emphasis and layout strategy—not superficial decoration.

- [ ] **Step 3: Save every displayed result in authoritative display order**

Copy the first, second and third visible Image Gen results to `option-1.png`, `option-2.png` and `option-3.png`. Do not infer numbering from request order.

- [ ] **Step 4: Stop for selection**

Ask only: `Which option should I build: 1, 2, or 3? Or tell me what you'd like to refine or personalize first.`

- [ ] **Step 5: Record the selection and constraints**

After the user chooses, write `selection.md` with the selected displayed option, chosen image path, accepted qualities, rejected qualities and the reminder that it is a target—not product evidence.

- [ ] **Step 6: Commit the visual gate**

```bash
git add -- portfolio/docs/design/relay
git commit -m "design(portfolio): select the Relay visual direction"
```

---

### Task 3: Create the canonical bilingual case contract

**Files:**
- Create: `src/lib/portfolioCases.js`
- Create: `tests/unit/portfolio-cases.test.js`
- Modify: `src/lib/portfolioV2.js`
- Modify: `tests/unit/portfolio-content.test.js`

**Interfaces:**
- Consumes: Task 1 research exports and selected Task 2 direction metadata.
- Produces: `CASE_STATUSES`, `getPortfolioCases(lang)`, `getPortfolioCase(slug, lang)` and a published Relay summary consumed by Home, Work and routes.

- [ ] **Step 1: Write failing case-contract tests**

Assert the slug `relay`, localized titles/copy, `Independent Product / 2026`, status `research-prototype`, role, activities, `synthetic` data disclosure, research-source references, planned-validation disclosure, `/work/relay`, `/fr/work/relay`, and no client/impact/adoption fields.

- [ ] **Step 2: Confirm RED**

Run: `npm run test:unit -- --run tests/unit/portfolio-cases.test.js tests/unit/portfolio-content.test.js`

- [ ] **Step 3: Implement the canonical source**

Keep Relay's structured sections focused on problem, constraints, workflow, decisions, prototype and planned validation. Change global Work status from paused to one published research prototype plus Basis/Signalroom as explicit future work.

- [ ] **Step 4: Run GREEN**

Run: `npm run test:unit -- --run tests/unit/portfolio-cases.test.js tests/unit/portfolio-content.test.js`

- [ ] **Step 5: Commit**

```bash
git add -- portfolio/src/lib/portfolioCases.js portfolio/src/lib/portfolioV2.js portfolio/tests/unit/portfolio-cases.test.js portfolio/tests/unit/portfolio-content.test.js
git commit -m "feat(portfolio): define the Relay case contract"
```

---

### Task 4: Model synthetic exceptions and permission rules

**Files:**
- Create: `src/lib/relayPrototype.js`
- Create: `tests/unit/relay-prototype.test.js`

**Interfaces:**
- Consumes: Task 1 workflow stages.
- Produces: `RELAY_ROLES`, `RELAY_STATES`, `relaySyntheticCases`, `getVisibleActions(role, exception)`, `applyRelayAction(state, action, actor)`.

- [ ] **Step 1: Write failing domain tests**

Cover prioritized queue ordering, overdue/SLA risk, evidence completeness, assignment, escalation, sensitive-resolution approval, unauthorized approval rejection, audit entries and transitions to blocked/resolved. Assert every record uses synthetic identifiers and `dataOrigin: "synthetic"`.

- [ ] **Step 2: Confirm RED**

Run: `npm run test:unit -- --run tests/unit/relay-prototype.test.js`

- [ ] **Step 3: Implement the smallest deterministic model**

Use plain JavaScript data/functions with no network calls or backend. Include enough records to demonstrate ordinary, urgent, blocked and resolved paths without creating an ERP-sized dataset.

- [ ] **Step 4: Run GREEN**

Run: `npm run test:unit -- --run tests/unit/relay-prototype.test.js`

- [ ] **Step 5: Commit**

```bash
git add -- portfolio/src/lib/relayPrototype.js portfolio/tests/unit/relay-prototype.test.js
git commit -m "feat(portfolio): model Relay exception decisions"
```

---

### Task 5: Build the accessible Relay queue

**Files:**
- Create: `src/components/relay/RelayPrototype.jsx`
- Create: `src/components/relay/RelayPrototype.module.css`
- Create: `tests/unit/relay-prototype-ui.test.jsx`

**Interfaces:**
- Consumes: Task 4 model and selected Task 2 visual target.
- Produces: `<RelayPrototype lang initialRole initialCaseId initialState />` with a keyboard-operable queue and selected-case region.

- [ ] **Step 1: Write failing UI tests**

Test semantic table/list structure, synthetic-data notice, textual status/SLA labels, filter controls, saved-view selection, keyboard row selection, loading/empty/error rendering and a live selected-case heading. Pin the 360px review focus with no fixed minimum width on the page container.

- [ ] **Step 2: Confirm RED**

Run: `npm run test:unit -- --run tests/unit/relay-prototype-ui.test.jsx`

- [ ] **Step 3: Implement the selected direction faithfully**

Use the existing color/type/spacing tokens and closest existing icon components. Do not add a new font, global radius language, nested-card inventory or motion declaration.

- [ ] **Step 4: Run GREEN and inspect both themes**

Run: `npm run test:unit -- --run tests/unit/relay-prototype-ui.test.jsx && npm run lint`

Inspect light/dark at 360, 768 and 1440 before committing.

- [ ] **Step 5: Commit**

```bash
git add -- portfolio/src/components/relay portfolio/tests/unit/relay-prototype-ui.test.jsx
git commit -m "feat(portfolio): build the Relay exception queue"
```

---

### Task 6: Complete investigation, resolution and approval

**Files:**
- Modify: `src/components/relay/RelayPrototype.jsx`
- Modify: `src/components/relay/RelayPrototype.module.css`
- Modify: `tests/unit/relay-prototype-ui.test.jsx`

**Interfaces:**
- Consumes: Task 4 actions and Task 5 selected-case state.
- Produces: the complete primary workflow from queue through audit record.

- [ ] **Step 1: Add failing interaction tests**

Test evidence inspection, assignment, escalation, resolution selection, manager approval, blocked permission copy, closure and chronological audit entries. Confirm Escape/focus return for any dialog or drawer and text equivalents for visual status.

- [ ] **Step 2: Confirm RED**

Run: `npm run test:unit -- --run tests/unit/relay-prototype-ui.test.jsx`

- [ ] **Step 3: Implement only the primary workflow**

Keep ERP replacement, consumer portal, live integrations and AI out of scope. Preserve the selected direction while prioritizing readable evidence and action consequences.

- [ ] **Step 4: Run GREEN**

Run: `npm run test:unit -- --run tests/unit/relay-prototype-ui.test.jsx tests/unit/relay-prototype.test.js`

- [ ] **Step 5: Commit**

```bash
git add -- portfolio/src/components/relay portfolio/tests/unit/relay-prototype-ui.test.jsx
git commit -m "feat(portfolio): complete the Relay resolution workflow"
```

---

### Task 7: Publish bilingual case routes with the shared renderer

**Files:**
- Create: `src/components/site/PortfolioCaseContent.jsx`
- Create: `src/app/(en)/work/relay/page.jsx`
- Create: `src/app/fr/work/relay/page.jsx`
- Modify: `src/lib/locales.js`
- Modify: `tests/unit/locales.test.js`
- Modify: `tests/e2e/navigation.spec.js`

**Interfaces:**
- Consumes: Tasks 1, 3, 5 and 6.
- Produces: `/work/relay` and `/fr/work/relay`, localized metadata, direct locale mapping and the shared future-case renderer.

- [ ] **Step 1: Write failing route/locale tests**

Assert reciprocal route mapping, one localized H1, exact disclosure/status/data-origin copy, canonical/alternate metadata, direct access without JavaScript and no untranslated section strings.

- [ ] **Step 2: Confirm RED**

Run: `npm run test:unit -- --run tests/unit/locales.test.js tests/unit/portfolio-cases.test.js && npm run test:e2e -- --grep "Relay"`

- [ ] **Step 3: Build the shared case renderer**

Reuse `CaseHero`, `CaseSnapshot`, `CaseSection`, `DecisionsLedger`, `Collapsible` and `BrowserFrame`. Preserve all existing reveal/scramble wrappers and delays. Embed the functional prototype as implemented evidence; do not use the generated direction image as proof.

- [ ] **Step 4: Add both routes and metadata**

Use the same slug in both locales and map locale switching directly between them. Keep validation copy explicitly planned until tests occur.

- [ ] **Step 5: Run GREEN**

Run: `npm run test:unit -- --run tests/unit/locales.test.js tests/unit/portfolio-cases.test.js && npm run test:e2e -- --grep "Relay" && npm run build`

- [ ] **Step 6: Commit**

```bash
git add -- portfolio/src/components/site/PortfolioCaseContent.jsx portfolio/src/app/'(en)'/work/relay/page.jsx portfolio/src/app/fr/work/relay/page.jsx portfolio/src/lib/locales.js portfolio/tests/unit/locales.test.js portfolio/tests/e2e/navigation.spec.js
git commit -m "feat(portfolio): publish the bilingual Relay case"
```

---

### Task 8: Capture real prototype evidence and disclosed context imagery

**Files:**
- Create: `tests/e2e/relay-capture.spec.js`
- Create: `public/images/case-studies/relay/queue.png`
- Create: `public/images/case-studies/relay/investigation.png`
- Create: `public/images/case-studies/relay/approval.png`
- Create: `public/images/case-studies/relay/context-concept.png`
- Modify: `src/lib/caseVisuals.js`
- Test: `tests/unit/portfolio-cases.test.js`

**Interfaces:**
- Consumes: implemented Task 7 routes and Task 2 art direction.
- Produces: actual coded-screen captures for published evidence plus one clearly disclosed conceptual context image.

- [ ] **Step 1: Write failing visual-registry assertions**

Require queue, investigation and approval images to be labeled `Implemented prototype capture`; require the context image to be labeled `Generated conceptual context`; require localized alt/caption text and actual pixel dimensions.

- [ ] **Step 2: Capture real coded states with Playwright**

Use a fixed `1440×1024` viewport and deterministic synthetic state. Capture only the prototype surface, not browser/device mockup decoration. Repeat after any UI change that affects the published images.

- [ ] **Step 3: Generate one context image if the selected direction needs it**

Use built-in Image Gen, save it to the project path, and disclose it. Do not generate a dashboard, participant artifact, research evidence or fake operational photograph.

- [ ] **Step 4: Register and verify assets**

Run: `npm run test:unit -- --run tests/unit/portfolio-cases.test.js && env -u NO_COLOR node node_modules/@playwright/test/cli.js test tests/e2e/relay-capture.spec.js`

- [ ] **Step 5: Commit**

```bash
git add -- portfolio/tests/e2e/relay-capture.spec.js portfolio/public/images/case-studies/relay portfolio/src/lib/caseVisuals.js portfolio/tests/unit/portfolio-cases.test.js
git commit -m "feat(portfolio): add honest Relay case evidence"
```

---

### Task 9: Integrate Relay into Home and Work

**Files:**
- Modify: `src/components/site/HomeContent.jsx`
- Modify: `src/components/site/WorkContent.jsx`
- Modify: `src/lib/portfolioV2.js`
- Modify: `tests/unit/portfolio-content.test.js`
- Modify: `tests/e2e/navigation.spec.js`

**Interfaces:**
- Consumes: published Relay summary and registered implemented capture.
- Produces: selected-work entry points on Home and Work while Basis and Signalroom remain visibly future work.

- [ ] **Step 1: Write failing integration tests**

Assert Relay appears first, links to the correct localized route, carries `Research prototype`/`Prototype de recherche`, and identifies `Independent Product / 2026`. Assert Basis and Signalroom are not clickable finished cases.

- [ ] **Step 2: Confirm RED**

Run: `npm run test:unit -- --run tests/unit/portfolio-content.test.js && npm run test:e2e -- --grep "selected work"`

- [ ] **Step 3: Replace the empty Work state**

Use `WorkShowcase` without changing its JSX motion effect, GSAP, breakpoints or CSS motion declarations. On Home, add a concise selected-work preview inside the existing Work section and preserve its section ID/wrappers.

- [ ] **Step 4: Run GREEN and inspect responsive flow**

Run: `npm run test:unit -- --run tests/unit/portfolio-content.test.js && npm run test:e2e`

Inspect Home and Work in EN/FR, light/dark, mobile/desktop.

- [ ] **Step 5: Commit**

```bash
git add -- portfolio/src/components/site/HomeContent.jsx portfolio/src/components/site/WorkContent.jsx portfolio/src/lib/portfolioV2.js portfolio/tests/unit/portfolio-content.test.js portfolio/tests/e2e/navigation.spec.js
git commit -m "feat(portfolio): feature Relay across selected work"
```

---

### Task 10: Complete discovery, accessibility and Release A evidence

**Files:**
- Modify: `src/app/sitemap.js`
- Modify: `src/app/robots.js`
- Modify: `tests/e2e/accessibility.spec.js`
- Modify: `tests/e2e/visual-capture.spec.js`
- Create: `docs/superpowers/evidence/2026-10-08-relay-product-proof.md`

**Interfaces:**
- Consumes: every prior task.
- Produces: a fully verified, discoverable Release A with explicit remaining validation limits.

- [ ] **Step 1: Add failing discovery/responsive assertions**

Require localized sitemap entries, reciprocal alternates, allowed indexing, no page overflow at all five target widths, keyboard access to the primary workflow, text-equivalent system states and stable reduced-motion rendering.

- [ ] **Step 2: Confirm RED, then implement discovery changes**

Run the targeted sitemap, navigation and accessibility tests first; update only sitemap/robots and test matrices needed for Relay.

- [ ] **Step 3: Run the complete release gate**

```bash
npm run lint
npm run test:unit
npm run build
npm run test:e2e
npm run test:a11y
npm run test:visual
git diff --check
```

- [ ] **Step 4: Prove protected motion remains unchanged**

Compare every protected file and all animation/transition/easing/duration/scroll declarations with the Release 0 head `e81aa11`. Expected: no task-created diff.

- [ ] **Step 5: Perform manual QA**

Inspect both routes, Home and Work in EN/FR, light/dark, keyboard-only and the five target widths. Verify the full queue-to-close workflow for both an authorized manager and an unauthorized specialist. Do not claim manual screen-reader testing unless performed.

- [ ] **Step 6: Write and commit the evidence note**

Record exact commit range, commands/results, reviewed captures, real source list, synthetic-data disclosure, selected visual direction, actual validation performed and the participant research/usability work still pending.

```bash
git add -- portfolio/src/app/sitemap.js portfolio/src/app/robots.js portfolio/tests/e2e/accessibility.spec.js portfolio/tests/e2e/visual-capture.spec.js portfolio/docs/superpowers/evidence/2026-10-08-relay-product-proof.md
git commit -m "docs(portfolio): record Relay product proof verification"
```

---

## Release A done means

- Relay is discoverable from Home and Work as the first Product proof.
- The case exists in complete English and French routes with truthful metadata and direct locale switching.
- The implemented prototype supports the primary exception workflow, permissions and system states using synthetic data.
- Published product images are captures of that implementation, not generated dashboards.
- Public research sources, assumptions and missing participant evidence are clearly separated.
- Basis and Signalroom remain honest future work.
- Portfolio architecture and motion remain recognizably unchanged.
- All automated and manual Release A gates pass.
