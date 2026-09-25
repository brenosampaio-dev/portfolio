# Portfolio v2 Protected Non-Case Transformation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the protected portfolio directly on `main` into an honest Product Designer-to-frontend experience, implementing the approved visual system and non-case information architecture while leaving all case-study selection and content frozen.

**Architecture:** Keep the existing Next.js App Router application and protected motion/navigation system. Consolidate visual primitives in the existing design-system token files, introduce URL-aware English/French routing for non-case pages, add a dedicated bilingual v2 content module, and build Home, Work, Labs, and About from focused reusable components. Establish unit, browser, accessibility, and visual QA before changing the visual foundations; preserve legacy case routes and components untouched until a separate case plan.

**Tech Stack:** Next.js 16, React 19, JavaScript/JSX, CSS custom properties, GSAP, Lenis, Vitest, Testing Library, Playwright, `@axe-core/playwright`, Vercel Deployment Protection, GitHub Actions.

**Specs:**

- `docs/superpowers/specs/2026-09-21-portfolio-v2-delivery-strategy-design.md`
- `docs/superpowers/specs/2026-09-21-portfolio-v2-information-architecture-design.md`
- `docs/superpowers/specs/2026-09-21-portfolio-v2-visual-system-design.md`

## Global Constraints

- Work directly on the existing `main` branch; do not create a long-lived implementation branch or worktree.
- Actual Git root is `.../Meus projetos`; stage only explicit `portfolio/**` paths and preserve untracked siblings `docs/`, `hertwill-shopify-store-ops/`, and `triageai/`.
- Protect production with Vercel Authentication set to All Deployments before the first product-code push.
- Tag the last verified public application commit `d8877d697ef7637921571726f11f65e5eb2bd500` as `portfolio-public-pre-v2-2026-09-21` before product-code changes.
- Do not force-push, rewrite history, commit secrets, purchase Password Protection, or create a custom password gate.
- Do not select, rewrite, feature, relabel, or remove case studies in this plan; preserve all current case routes and case source files.
- Do not label any unfinished project `Built` or `Shipped`, and do not invent clients, participants, metrics, Live, GitHub, Figma, production, or outcome evidence.
- Transitional identity is Product Designer building accessible interfaces in React; Design Engineer remains a target, not the primary current title.
- Preserve the glass header, desktop progress rail, compact indicator, mobile dock, active labels, tap/swipe navigation, smooth scrolling, Reveal, masked reveals, Scramble, ProcessReveal, sticky work scenes, collapsibles, image expansion, back-to-top, dark/light adaptation, and reduced-motion fallbacks.
- Retain DM Sans, Cormorant Garamond, system monospace, and one Indigo accent.
- WCAG 2.2 AA is the minimum target; no meaningful non-case text may render below 12px.
- Required viewport coverage is 320, 390, 768, 1024, and 1440 pixels in light, dark, and reduced-motion conditions.
- Run lint, unit tests, production build, production dependency audit, browser tests, accessibility checks, and visual capture as separate commands with attributable exit status.
- Keep Vercel protection enabled at the end of this plan; public release belongs to the later case-and-release plan.

## Review Focus

- A visitor opening the production domain while signed out must see Vercel authentication, while an authorized session must reach the portfolio; Task 1 verifies both paths.
- A visitor switching language on Home, Work, Labs, or About must land on a shareable equivalent URL, while a frozen legacy case must remain reachable and keep its current client-side translation; Tasks 3 and 8 pin both behaviours.
- A visitor using keyboard-only navigation must reach every global destination, close the mobile More panel with Escape, recover focus on its trigger, and access an alternative to the decorative progress rail; Tasks 7 and 10 test these paths.
- A visitor using reduced motion or a failed JavaScript enhancement must receive complete visible content and working section navigation; Tasks 6 and 10 exercise both conditions.
- A visitor at 320px, 200% zoom, or over dark imagery must not encounter horizontal overflow, covered content, missing focus, or unreadable controls; Tasks 6, 10, and 12 verify these states.

## File Structure

### Existing files modified

- `package.json`, `package-lock.json`: test commands and locked QA dependencies.
- `.gitignore`: generated browser and visual artifacts within the portfolio app.
- `design-system/tokens/colors.css`: light/dark primitives and semantic colour roles.
- `design-system/tokens/typography.css`: approved type scale and 12px minimum technical text.
- `design-system/tokens/spacing.css`: semantic spacing, radius, and elevation roles.
- `design-system/tokens/motion.css`: approved duration and easing roles.
- `design-system/tokens/base.css`: focus, selection, canvas, and no-JS foundations.
- `src/app/globals.css`: page layouts and component styling only; remove foundation overrides.
- `src/app/layout.jsx`: retained through the foundation tasks, then replaced by locale-specific root layouts in Task 9.
- `src/context/AppContext.jsx`: route-aware language behaviour while preserving theme state.
- `src/lib/i18n.js`: legacy case translations remain; only shared chrome compatibility keys change.
- `src/lib/useI18n.js`: expose route-aware language utilities.
- `src/lib/content.js`: retain legacy case sources; canonical profile facts move to the v2 module without deletion.
- `src/components/site/Header.jsx`, `Footer.jsx`, `LanguageSwitcher.jsx`, `LocaleMetadata.jsx`: v2 navigation, focus behaviour, localized URLs, and route-aware metadata.
- `src/components/site/HomeContent.jsx`, `AboutContent.jsx`: non-case v2 content and rhythm.
- `src/components/site/ScrollProgress.jsx`, `Scramble.jsx`, `Reveal.jsx`: accessibility and cadence refinements without removing behaviours.
- `src/components/ds/Button.jsx`, `Text.jsx`, `Tag.jsx`, `Status.jsx`, `Divider.jsx`, `ProjectCard.jsx`: approved microtype, radius, target, and status rules.
- `src/app/page.jsx`, `src/app/about/page.jsx`, `src/app/sitemap.js`, `src/app/robots.js`, `src/app/not-found.jsx`, `src/app/opengraph-image.js`: route metadata and non-case architecture.

### New application files

- `src/lib/locales.js`: locale parsing and localized-path contract.
- `src/lib/portfolioV2.js`: canonical bilingual non-case content and status vocabulary.
- `src/lib/siteNavigation.js`: global navigation descriptors independent from rendering.
- `src/components/site/PageIntro.jsx`: shared editorial page opening.
- `src/components/site/CapabilityGroup.jsx`: truthful `Strong now`, `Building now`, and `Next` lists.
- `src/components/site/WorkStatusPanel.jsx`: honest non-interactive case-free work state.
- `src/components/site/SectionJumpNav.jsx`: keyboard-accessible alternative to the decorative rail.
- `src/components/site/SiteDocument.jsx`: shared root-document shell parameterized by server-rendered language.
- `src/components/site/WorkContent.jsx`: Work hub shell with no selected cases.
- `src/components/site/LabsContent.jsx`: learning and experiment hub without case claims.
- `src/app/(en)/layout.jsx`: English root layout with server-rendered `lang="en-CA"`.
- `src/app/(en)/page.jsx`, `src/app/(en)/work/page.jsx`, `src/app/(en)/labs/page.jsx`, `src/app/(en)/about/page.jsx`: unprefixed English routes.
- `src/app/(en)/work/{access-restored,missing-reservation,connectivity-broke,service-operations,triageai}/page.jsx`: unchanged legacy route entrypoints moved under the English route group so URLs remain stable.
- `src/app/fr/layout.jsx`: French root layout with server-rendered `lang="fr-CA"`.
- `src/app/fr/page.jsx`, `src/app/fr/work/page.jsx`, `src/app/fr/labs/page.jsx`, `src/app/fr/about/page.jsx`: indexable French non-case routes.

### New test and QA files

- `vitest.config.mjs`, `vitest.setup.js`: unit/component test environment.
- `playwright.config.mjs`: local production-browser test environment.
- `tests/unit/locales.test.js`: locale and URL contract.
- `tests/unit/portfolio-content.test.js`: truth/status/content contract.
- `tests/unit/design-tokens.test.js`: normative token values and minimum text sizes.
- `tests/components/global-navigation.test.jsx`: navigation semantics and status components.
- `tests/e2e/navigation.spec.js`: routes, language, keyboard, menu, section navigation, and frozen cases.
- `tests/e2e/accessibility.spec.js`: axe, focus, reflow, reduced motion, and no-JS visibility.
- `tests/e2e/visual-capture.spec.js`: required route/viewport/theme screenshot matrix.
- `docs/portfolio-v2-implementation-log.md`: commit, deployment protection, validation, and stop-condition evidence.

---

### Task 1: Protect Production and Establish Recovery

**Files:**
- Create: `docs/portfolio-v2-implementation-log.md`

**Interfaces:**
- Consumes: approved delivery strategy and canonical production URL `https://brenosampaio.vercel.app`.
- Produces: protected production, immutable recovery tag, recorded baseline SHA, and a verified safe state for all later tasks.

- [ ] **Step 1: Confirm the external-impact stop condition**

Ask Breno to confirm that no active application requires unauthenticated access to `https://brenosampaio.vercel.app` or its resume PDFs. If an active application does depend on those URLs, stop this task and arrange an approved alternate public resume location before enabling protection.

- [ ] **Step 2: Verify repository identity and the clean scope boundary**

Run from `.../Meus projetos`:

```bash
git status --short --branch
git remote -v
git rev-parse HEAD
git rev-parse origin/main
git diff --check
```

Expected: branch is `main`; remote is `https://github.com/brenosampaio-dev/portfolio.git`; only the known sibling directories are untracked; no product-code changes exist; local documentation commits may be ahead of `origin/main`.

- [ ] **Step 3: Create and verify the immutable recovery tag**

```bash
git tag --list portfolio-public-pre-v2-2026-09-21
git rev-list -n 1 portfolio-public-pre-v2-2026-09-21 2>/dev/null || true
```

If the tag does not exist, create it. If it already exists at the expected SHA, continue without recreating it. If it resolves anywhere else, stop and investigate rather than moving or deleting it.

```bash
git tag -a portfolio-public-pre-v2-2026-09-21 d8877d697ef7637921571726f11f65e5eb2bd500 -m "Last verified public portfolio before v2"
git show --no-patch --decorate portfolio-public-pre-v2-2026-09-21
```

Expected: the tag resolves to `d8877d697ef7637921571726f11f65e5eb2bd500`.

- [ ] **Step 4: Enable Vercel Authentication before pushing**

In the Vercel dashboard open the portfolio project, then `Security → Deployment Protection`, choose `Vercel Authentication`, select `All Deployments`, and save. Do not enable paid Password Protection.

- [ ] **Step 5: Verify denied and authorized access**

Open the canonical production URL in a signed-out private window and verify that portfolio content is unavailable. Open it again in Breno's authorized Vercel session and verify that the current portfolio loads. Record the date, protection method, scope, and observed result; do not record cookies, tokens, or bypass secrets.

- [ ] **Step 6: Write the implementation log**

Create the file with this initial structure and actual observed values:

```markdown
# Portfolio v2 Implementation Log

## Recovery
- Public baseline: d8877d697ef7637921571726f11f65e5eb2bd500
- Recovery tag: portfolio-public-pre-v2-2026-09-21

## Deployment protection
- Method: Vercel Authentication
- Scope: All Deployments
- Signed-out verification: protected
- Authorized verification: accessible

## Phase validation
| Phase | Commit | Lint | Unit | Build | Audit | Browser | Axe | Visual | Status |
|---|---|---|---|---|---|---|---|---|---|
| Lock and recovery | documentation-only | n/a | n/a | n/a | n/a | protected | n/a | current baseline | complete |
```

- [ ] **Step 7: Commit only protection documentation**

```bash
git add -- portfolio/docs/portfolio-v2-implementation-log.md
git diff --cached --check
git commit -m "docs: record portfolio v2 protection baseline"
```

- [ ] **Step 8: Push the protected main and recovery tag**

```bash
git push origin main
git push origin portfolio-public-pre-v2-2026-09-21
```

Expected: GitHub CI and the Vercel deployment complete while the canonical site remains protected in a signed-out session.

### Task 2: Add the Automated Test Baseline

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Create: `.gitignore`
- Create: `vitest.config.mjs`
- Create: `vitest.setup.js`
- Create: `playwright.config.mjs`
- Create: `tests/unit/smoke.test.js`
- Create: `tests/e2e/navigation.spec.js`

**Interfaces:**
- Consumes: existing Next.js commands and Node 24 CI.
- Produces: `npm run test:unit`, `npm run test:e2e`, and `npm run test:a11y` gates used by every later task.

- [ ] **Step 1: Install locked test dependencies**

```bash
npm install --save-dev vitest jsdom @testing-library/react @testing-library/jest-dom @playwright/test @axe-core/playwright
```

Expected: `package.json` and `package-lock.json` change; no production dependency is added.

- [ ] **Step 2: Add exact package scripts**

Add to `scripts` in `package.json`:

```json
"test:unit": "vitest run",
"test:unit:watch": "vitest",
"test:e2e": "playwright test tests/e2e/navigation.spec.js",
"test:a11y": "playwright test tests/e2e/accessibility.spec.js",
"test:visual": "playwright test tests/e2e/visual-capture.spec.js"
```

- [ ] **Step 3: Configure Vitest**

Create `vitest.config.mjs`:

```js
import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

export default defineConfig({
  resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.js"],
    include: ["tests/unit/**/*.test.js", "tests/components/**/*.test.jsx"],
  },
});
```

Create `vitest.setup.js`:

```js
import "@testing-library/jest-dom/vitest";
```

- [ ] **Step 4: Configure Playwright against a production build**

Create `playwright.config.mjs`:

```js
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: false,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: "http://127.0.0.1:3000",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "npm run build && npm run start",
    url: "http://127.0.0.1:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 240_000,
  },
});
```

- [ ] **Step 5: Write tests that pass on the current application**

Create `tests/unit/smoke.test.js`:

```js
import { describe, expect, it } from "vitest";
import { getT } from "@/lib/i18n";

describe("translation baseline", () => {
  it("keeps supported dictionaries available", () => {
    expect(getT("en").nav.work).toBeTruthy();
    expect(getT("fr").nav.work).toBeTruthy();
    expect(getT("unknown")).toBe(getT("en"));
  });
});
```

Create the initial `tests/e2e/navigation.spec.js`:

```js
import { expect, test } from "@playwright/test";

test("current portfolio exposes core navigation and content", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("main h1")).toBeVisible();
  await expect(page.getByRole("navigation").first()).toBeVisible();
  await expect(page.locator("#contact")).toBeAttached();
});

test("legacy case routes remain reachable", async ({ page }) => {
  for (const path of [
    "/work/access-restored",
    "/work/missing-reservation",
    "/work/connectivity-broke",
  ]) {
    await page.goto(path);
    await expect(page.locator("main h1")).toBeVisible();
  }
});
```

- [ ] **Step 6: Ignore generated artifacts**

Create the app-local `.gitignore`:

```gitignore
playwright-report/
test-results/
artifacts/visual/
```

- [ ] **Step 7: Install the local Chromium runtime**

```bash
npx playwright install chromium
```

Expected: Chromium is available to Playwright without creating a tracked repository file.

- [ ] **Step 8: Run and commit the baseline**

```bash
npm run lint
npm run test:unit
npm run build
npm audit --omit=dev --audit-level=high
npm run test:e2e
git add -- portfolio/.gitignore portfolio/package.json portfolio/package-lock.json portfolio/vitest.config.mjs portfolio/vitest.setup.js portfolio/playwright.config.mjs portfolio/tests/unit/smoke.test.js portfolio/tests/e2e/navigation.spec.js
git diff --cached --check
git commit -m "test: add portfolio regression baseline"
```

Expected: every command exits zero; the commit contains no generated browser artifacts.

### Task 3: Define URL-Aware Locale Contracts

**Files:**
- Create: `src/lib/locales.js`
- Create: `tests/unit/locales.test.js`
- Modify: `src/context/AppContext.jsx`
- Modify: `src/lib/useI18n.js`
- Modify: `src/components/site/LanguageSwitcher.jsx`

**Interfaces:**
- Produces: `languageFromPath(pathname)`, `localizedPath(pathname, lang)`, `isLocalizedHub(pathname)`, and `setLang(lang)` that navigates on non-case hubs but preserves legacy case behaviour.

- [ ] **Step 1: Write failing URL-contract tests**

Create `tests/unit/locales.test.js`:

```js
import { describe, expect, it } from "vitest";
import { isLocalizedHub, languageFromPath, localizedPath } from "@/lib/locales";

describe("locale routes", () => {
  it.each([
    ["/", "en"], ["/work", "en"], ["/fr", "fr"], ["/fr/about", "fr"],
  ])("derives %s", (path, lang) => expect(languageFromPath(path)).toBe(lang));

  it.each([
    ["/", "fr", "/fr"],
    ["/#contact", "fr", "/fr#contact"],
    ["/fr/about", "en", "/about"],
    ["/work", "fr", "/fr/work"],
    ["/work/access-restored", "fr", "/work/access-restored"],
  ])("maps %s to %s", (path, lang, expected) => {
    expect(localizedPath(path, lang)).toBe(expected);
  });

  it("localizes only the non-case hubs", () => {
    expect(isLocalizedHub("/labs")).toBe(true);
    expect(isLocalizedHub("/fr/work")).toBe(true);
    expect(isLocalizedHub("/work/access-restored")).toBe(false);
  });
});
```

- [ ] **Step 2: Verify the tests fail because the module is absent**

```bash
npm run test:unit -- tests/unit/locales.test.js
```

Expected: FAIL resolving `@/lib/locales`.

- [ ] **Step 3: Implement the locale helpers**

Create `src/lib/locales.js`:

```js
export const SUPPORTED_LANGS = ["en", "fr"];
const HUBS = new Set(["/", "/work", "/labs", "/about"]);

function splitHash(pathname) {
  const [path, hash = ""] = pathname.split("#");
  return { path: path || "/", hash: hash ? `#${hash}` : "" };
}

export function stripFrenchPrefix(pathname) {
  const { path, hash } = splitHash(pathname);
  const stripped = path.replace(/^\/fr(?=\/|$)/, "") || "/";
  return `${stripped}${hash}`;
}

export function languageFromPath(pathname) {
  return /^\/fr(?:\/|$)/.test(splitHash(pathname).path) ? "fr" : "en";
}

export function isLocalizedHub(pathname) {
  return HUBS.has(splitHash(stripFrenchPrefix(pathname)).path);
}

export function localizedPath(pathname, lang) {
  if (!SUPPORTED_LANGS.includes(lang) || !isLocalizedHub(pathname)) return pathname;
  const base = stripFrenchPrefix(pathname);
  const { path, hash } = splitHash(base);
  if (lang === "en") return `${path}${hash}`;
  return `${path === "/" ? "/fr" : `/fr${path}`}${hash}`;
}
```

- [ ] **Step 4: Run the URL-contract tests**

```bash
npm run test:unit -- tests/unit/locales.test.js
```

Expected: PASS.

- [ ] **Step 5: Make language state route-aware without breaking cases**

Modify `AppContext.jsx` to use `usePathname` and `useRouter`. For localized hubs, derive language from the URL and navigate with `router.push(localizedPath(...))`; for frozen case routes, keep the existing in-place language state. Keep reduced-motion handling for the state-only legacy path.

The `changeLang` contract must be:

```js
const changeLang = useCallback((nextLang) => {
  if (!SUPPORTED_LANGS.includes(nextLang)) return;
  if (isLocalizedHub(pathname)) {
    router.push(localizedPath(`${pathname}${window.location.hash}`, nextLang));
    return;
  }
  setLangWithTransition(nextLang);
}, [pathname, router, setLangWithTransition]);
```

Define the transition helper before `changeLang`:

```js
const setLangWithTransition = useCallback((nextLang) => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduceMotion && document.startViewTransition) {
    document.startViewTransition(() => setLang(nextLang));
    return;
  }
  setLang(nextLang);
}, []);
```

Sync `lang` from `languageFromPath(pathname)` only when `isLocalizedHub(pathname)` is true.

- [ ] **Step 6: Commit the locale contract**

```bash
npm run test:unit -- tests/unit/locales.test.js
npm run lint
git add -- portfolio/src/lib/locales.js portfolio/src/context/AppContext.jsx portfolio/src/lib/useI18n.js portfolio/src/components/site/LanguageSwitcher.jsx portfolio/tests/unit/locales.test.js
git diff --cached --check
git commit -m "feat: add shareable non-case locale routes"
```

### Task 4: Consolidate the Visual Foundations

**Files:**
- Modify: `design-system/tokens/colors.css`
- Modify: `design-system/tokens/typography.css`
- Modify: `design-system/tokens/spacing.css`
- Modify: `design-system/tokens/motion.css`
- Modify: `design-system/tokens/base.css`
- Modify: `src/app/globals.css`
- Create: `tests/unit/design-tokens.test.js`

**Interfaces:**
- Produces: one governed primitive/semantic token source consumed by all later page and component work.

- [ ] **Step 1: Write failing normative-token tests**

Create `tests/unit/design-tokens.test.js`:

```js
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const read = (file) => readFileSync(new URL(`../../${file}`, import.meta.url), "utf8");

describe("portfolio v2 tokens", () => {
  it("defines the approved light and dark canvases and accent", () => {
    const css = read("design-system/tokens/colors.css");
    expect(css).toContain("--paper: #F8F6F1");
    expect(css).toContain("--indigo: #3D4B66");
    expect(css).toContain("--paper: #0E1118");
    expect(css).toContain("--indigo: #8399C4");
  });

  it("keeps meaningful microtype at twelve pixels or above", () => {
    const css = read("design-system/tokens/typography.css");
    expect(css).toContain("--text-micro: 12px");
    expect(css).toContain("--text-mono: 12px");
    expect(css).not.toMatch(/--text-(?:micro|mono):\s*(?:10|11)px/);
  });

  it("defines semantic section rhythm and restrained radii", () => {
    const css = read("design-system/tokens/spacing.css");
    expect(css).toContain("--section-compact: 64px");
    expect(css).toContain("--section-standard: 80px");
    expect(css).toContain("--section-emphasis: 120px");
    expect(css).toContain("--radius-lg: 16px");
  });
});
```

- [ ] **Step 2: Verify the token tests fail**

```bash
npm run test:unit -- tests/unit/design-tokens.test.js
```

Expected: FAIL on the current Paper, Indigo naming, mono size, or semantic spacing values.

- [ ] **Step 3: Replace light and dark colour primitives in the token source**

In `colors.css`, define the approved primitives and semantic aliases. Keep temporary Clay aliases pointing to Indigo so existing components continue to render during migration:

```css
:root {
  --paper: #F8F6F1;
  --silk: #EFEAE2;
  --mist: #D8D2C9;
  --pebble: #6D675F;
  --stone: #69635C;
  --graphite: #3F3B36;
  --ink: #1B1A18;
  --indigo: #3D4B66;
  --indigo-dark: #2E3950;
  --indigo-light: #8794AE;
  --alert: #B4452D;
  --accent: var(--indigo);
  --accent-hover: var(--indigo-dark);
  --focus: var(--indigo);
  --bg-page: var(--paper);
  --surface-card: var(--silk);
  --text-primary: var(--ink);
  --text-secondary: var(--stone);
  --border: var(--mist);
  --clay: var(--indigo);
  --clay-dark: var(--indigo-dark);
  --clay-light: var(--indigo-light);
}

[data-theme="dark"] {
  --paper: #0E1118;
  --silk: #171B25;
  --mist: #252B39;
  --pebble: #8E96AA;
  --stone: #A3A9B9;
  --graphite: #C3C8D4;
  --ink: #F0F2F7;
  --indigo: #8399C4;
  --indigo-dark: #A0B0D3;
  --indigo-light: #A0B0D3;
  --alert: #F07A61;
}
```

Retain the existing alert washes and compatibility aliases, but derive them from these primitives.

- [ ] **Step 4: Implement approved type, spacing, radius, elevation, and motion roles**

Set `--text-mono: 12px`; add `--section-compact`, `--section-standard`, and `--section-emphasis`; use `--radius-lg: 16px`; keep Full only for true pills; add named motion roles `--duration-instant`, `--duration-micro`, `--duration-hover`, `--duration-morph`, `--duration-reveal`, and `--duration-illustrative` mapped to the approved ranges.

- [ ] **Step 5: Remove app-level foundation overrides**

Delete the root colour override block and the dark primitive block from `globals.css`. Keep layout-specific `--grid-dot` declarations, but derive their opacity from the theme. No unique page colour may replace the token source.

- [ ] **Step 6: Run token and production checks**

```bash
npm run test:unit -- tests/unit/design-tokens.test.js
npm run lint
npm run build
```

Expected: all exit zero; light and dark pages render from `colors.css` rather than app overrides.

- [ ] **Step 7: Commit the foundation**

```bash
git add -- portfolio/design-system/tokens/colors.css portfolio/design-system/tokens/typography.css portfolio/design-system/tokens/spacing.css portfolio/design-system/tokens/motion.css portfolio/design-system/tokens/base.css portfolio/src/app/globals.css portfolio/tests/unit/design-tokens.test.js
git diff --cached --check
git commit -m "refactor: consolidate portfolio v2 visual tokens"
```

### Task 5: Bring Shared Components onto the v2 Contract

**Files:**
- Modify: `src/components/ds/Button.jsx`
- Modify: `src/components/ds/Text.jsx`
- Modify: `src/components/ds/Tag.jsx`
- Modify: `src/components/ds/Status.jsx`
- Modify: `src/components/ds/Divider.jsx`
- Modify: `src/components/ds/ProjectCard.jsx`
- Create: `tests/components/global-navigation.test.jsx`

**Interfaces:**
- Produces: accessible shared components with 12px minimum labels, 44px preferred targets, 6px standard action radius, and honest non-interactive project states.

- [ ] **Step 1: Write failing component-contract tests**

Start `tests/components/global-navigation.test.jsx` with:

```jsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button, Tag, Status, ProjectCard } from "@/components/ds";

describe("shared v2 components", () => {
  it("renders a link action and honest non-interactive project state", () => {
    render(
      <>
        <Button href="/work">Work</Button>
        <ProjectCard title="Cases in review" role="Selection pending" upcoming />
      </>
    );
    expect(screen.getByRole("link", { name: "Work" })).toBeVisible();
    expect(screen.queryByRole("link", { name: /Cases in review/ })).not.toBeInTheDocument();
  });

  it("keeps explicit status text", () => {
    render(<><Tag>Building now</Tag><Status>In progress</Status></>);
    expect(screen.getByText("Building now")).toBeVisible();
    expect(screen.getByText("In progress")).toBeVisible();
  });
});
```

- [ ] **Step 2: Normalize component values**

Replace hardcoded `10px` and `11px` label sizes in these shared components with `var(--text-micro)` or `var(--text-mono)`. Set standard buttons to `minHeight: "44px"` and `borderRadius: "var(--radius-sm)"`; remove whole-target pressed scaling. Keep pills only for Tag and Status. Give `ProjectCard` a `status` prop rendered as explicit text and keep `upcoming` non-interactive.

- [ ] **Step 3: Run shared-component tests and lint**

```bash
npm run test:unit -- tests/components/global-navigation.test.jsx
npm run lint
```

Expected: PASS with no warnings.

- [ ] **Step 4: Commit the shared component contract**

```bash
git add -- portfolio/src/components/ds/Button.jsx portfolio/src/components/ds/Text.jsx portfolio/src/components/ds/Tag.jsx portfolio/src/components/ds/Status.jsx portfolio/src/components/ds/Divider.jsx portfolio/src/components/ds/ProjectCard.jsx portfolio/tests/components/global-navigation.test.jsx
git diff --cached --check
git commit -m "refactor: align shared components with v2 accessibility"
```

### Task 6: Implement Semantic Rhythm and Protected Visual Chrome

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.jsx`
- Modify: `src/components/site/Reveal.jsx`
- Modify: `src/components/site/Scramble.jsx`
- Modify: `src/components/site/SmoothScroll.jsx`
- Modify: `src/components/site/ToTop.jsx`
- Modify: `tests/e2e/accessibility.spec.js`

**Interfaces:**
- Produces: `.section--compact`, `.section--standard`, `.section--emphasis`, governed glass, focus, canvas grid, and fail-open/reduced-motion behaviour used by every page.

- [ ] **Step 1: Add browser tests for enhancement failure and reduced motion**

Create `tests/e2e/accessibility.spec.js` with these initial tests:

```js
import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("@a11y home has no serious or critical axe findings", async ({ page }) => {
  await page.goto("/");
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations.filter((v) => ["serious", "critical"].includes(v.impact))).toEqual([]);
});

test("@a11y reduced motion leaves content visible", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator("main h1")).toBeVisible();
  await expect(page.locator("main section").last()).toBeVisible();
});

test("@a11y no JavaScript still exposes primary content", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.locator("main h1")).toBeVisible();
  await context.close();
});
```

- [ ] **Step 2: Add semantic section rhythm**

Replace the single uniform section rule with:

```css
.section--compact { padding-block: var(--section-compact); }
.section,
.section--standard { padding-block: var(--section-standard); }
.section--emphasis { padding-block: var(--section-emphasis); }
```

At 900px and below map these roles to 56px, 64px, and 96px; at 600px and below map them to 48px, 56px, and 80px.

- [ ] **Step 3: Refine protected chrome without changing its identity**

Reduce header and dock backdrop blur to 20px; keep capsule geometry, adaptive light/dark classes, shadows only on floating layers, and existing rail/dock behaviour. Update focus to a solid 2px Indigo outline with at least 3px offset. Keep the grid at 0.03–0.04 light opacity and 0.02–0.03 dark opacity.

- [ ] **Step 4: Refine cadence and fail-open behaviour**

Set Scramble's default resolution to 900ms and maximum normal delay to 200ms. Preserve server-rendered text. Ensure Reveal only hides content under the `.js` flag and immediately resolves under reduced motion. Do not animate body copy with blur.

- [ ] **Step 5: Run targeted browser checks**

```bash
npm run test:a11y
npm run test:e2e
npm run lint
```

Expected: reduced motion and no-JS content are visible; existing legacy case routes remain reachable.

- [ ] **Step 6: Commit semantic rhythm and chrome**

```bash
git add -- portfolio/src/app/globals.css portfolio/src/app/layout.jsx portfolio/src/components/site/Reveal.jsx portfolio/src/components/site/Scramble.jsx portfolio/src/components/site/SmoothScroll.jsx portfolio/src/components/site/ToTop.jsx portfolio/tests/e2e/accessibility.spec.js
git diff --cached --check
git commit -m "feat: apply v2 rhythm and protected visual chrome"
```

### Task 7: Build the Global Navigation Contract

**Files:**
- Create: `src/lib/siteNavigation.js`
- Modify: `src/components/site/Header.jsx`
- Modify: `src/components/site/Footer.jsx`
- Modify: `src/components/site/LanguageSwitcher.jsx`
- Modify: `src/components/site/Wordmark.jsx`
- Create: `src/app/work/page.jsx`
- Create: `src/app/labs/page.jsx`
- Create: `src/app/fr/page.jsx`
- Create: `src/app/fr/work/page.jsx`
- Create: `src/app/fr/labs/page.jsx`
- Create: `src/app/fr/about/page.jsx`
- Modify: `tests/components/global-navigation.test.jsx`
- Modify: `tests/e2e/navigation.spec.js`

**Interfaces:**
- Consumes: `localizedPath`, current language, current pathname, canonical profile links.
- Produces: desktop and mobile navigation for Work, Labs, About, Contact, GitHub, Resume, language, and theme, with focus restoration and correct `aria-current`.

- [ ] **Step 1: Define navigation data independently from rendering**

Create `src/lib/siteNavigation.js`:

```js
export const GITHUB_URL = "https://github.com/brenosampaio-dev";
export const LINKEDIN_URL = "https://www.linkedin.com/in/brenosampaio";

export function navigationFor(lang) {
  const fr = lang === "fr";
  return [
    { id: "work", label: fr ? "Projets" : "Work", href: fr ? "/fr/work" : "/work" },
    { id: "labs", label: "Labs", href: fr ? "/fr/labs" : "/labs" },
    { id: "about", label: fr ? "Profil" : "About", href: fr ? "/fr/about" : "/about" },
    { id: "contact", label: "Contact", href: fr ? "/fr#contact" : "/#contact" },
  ];
}
```

- [ ] **Step 2: Update desktop and mobile header structure**

Desktop order must be Work, Labs, About, Contact, GitHub, Resume, Language, Theme. At 390px keep logo, Work, About, and More visible. More contains Labs, Contact, GitHub, Resume, Language, and Theme.

Add a ref to the More trigger and return focus to it after Escape. When the panel opens, focus its first link. Keep `aria-expanded`, `aria-controls`, outside-click close, route-change close, and adaptive dark styling.

- [ ] **Step 3: Create honest route stubs before exposing new links**

Create the six new route entrypoints before running browser tests. Each stub renders one semantic section with a localized H1 and explicit protected-rebuild message; it contains no project card or case claim. The English Work stub is:

```jsx
export const metadata = { title: "Work" };

export default function WorkPage() {
  return (
    <section id="work" data-label="Work" className="container section section--emphasis">
      <h1>Work</h1>
      <p>Case-study selection is paused while the portfolio foundation is rebuilt.</p>
    </section>
  );
}
```

Use the same structure for Labs, `/fr`, `/fr/work`, `/fr/labs`, and `/fr/about`; the French rebuild sentence is `La sélection des études de cas est en pause pendant la refonte des fondations du portfolio.` Task 9 replaces these stubs with the complete page components.

- [ ] **Step 4: Expand the footer contract**

Render the transitional positioning line, Valencia, factual work arrangement, canonical email, LinkedIn, GitHub, both resume links, and Work/Labs/About links. Use `navigationFor(lang)` so routes stay localized.

- [ ] **Step 5: Pin keyboard and route behaviour in Playwright**

Add tests that:

```js
test("mobile More closes with Escape and restores focus", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const trigger = page.getByRole("button", { name: /more|tools|menu/i });
  await trigger.click();
  await expect(page.getByRole("link", { name: "Labs" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
});
```

Also assert that Work and About remain visible at 390px, every newly exposed internal route returns a visible H1, and external links use `noopener`/`noreferrer`.

- [ ] **Step 6: Run and commit navigation**

```bash
npm run test:unit -- tests/components/global-navigation.test.jsx
npm run test:e2e -- tests/e2e/navigation.spec.js
npm run lint
git add -- portfolio/src/lib/siteNavigation.js portfolio/src/components/site/Header.jsx portfolio/src/components/site/Footer.jsx portfolio/src/components/site/LanguageSwitcher.jsx portfolio/src/components/site/Wordmark.jsx portfolio/src/app/work/page.jsx portfolio/src/app/labs/page.jsx portfolio/src/app/fr/page.jsx portfolio/src/app/fr/work/page.jsx portfolio/src/app/fr/labs/page.jsx portfolio/src/app/fr/about/page.jsx portfolio/tests/components/global-navigation.test.jsx portfolio/tests/e2e/navigation.spec.js
git diff --cached --check
git commit -m "feat: rebuild portfolio v2 global navigation"
```

### Task 8: Create the Canonical Bilingual Non-Case Content Model

**Files:**
- Create: `src/lib/portfolioV2.js`
- Create: `tests/unit/portfolio-content.test.js`
- Modify: `src/lib/content.js`

**Interfaces:**
- Produces: `getPortfolioV2(lang)` and status values `strong`, `building`, `next`, and `paused`; later page components consume only this module for non-case copy.

- [ ] **Step 1: Write failing content-truth tests**

Create `tests/unit/portfolio-content.test.js`:

```js
import { describe, expect, it } from "vitest";
import { getPortfolioV2, PROJECT_STATUSES } from "@/lib/portfolioV2";

describe("portfolio v2 non-case content", () => {
  it.each(["en", "fr"])("has complete %s hubs", (lang) => {
    const content = getPortfolioV2(lang);
    expect(content.hero.title).toBeTruthy();
    expect(content.capabilities).toHaveLength(3);
    expect(content.process).toHaveLength(5);
    expect(content.work.status).toBe(PROJECT_STATUSES.paused);
    expect(content.links.github).toMatch(/^https:\/\/github\.com\/brenosampaio-dev/);
  });

  it("does not claim Design Engineer as the current identity", () => {
    expect(getPortfolioV2("en").identity.current).toBe("Product Designer");
    expect(getPortfolioV2("en").identity.target).toContain("Design Engineer");
  });

  it("does not expose invented project evidence", () => {
    const work = getPortfolioV2("en").work;
    expect(work.items).toEqual([]);
    expect(work.liveUrl).toBeUndefined();
  });
});
```

- [ ] **Step 2: Implement exact status and identity fields**

Create `src/lib/portfolioV2.js` with:

```js
export const PROJECT_STATUSES = Object.freeze({
  strong: "strong",
  building: "building",
  next: "next",
  paused: "paused",
});

const shared = {
  links: {
    github: "https://github.com/brenosampaio-dev",
    linkedin: "https://www.linkedin.com/in/brenosampaio",
    email: "sampayobreno@gmail.com",
  },
  location: "Valencia, Spain",
};
```

Implement the complete English non-case object:

```js
const en = {
  ...shared,
  statusLabels: {
    strong: "Strong now",
    building: "Building now",
    next: "Next",
    paused: "Case selection paused",
  },
  identity: {
    current: "Product Designer",
    transition: "Building accessible interfaces in React",
    target: "Frontend and junior Design Engineer opportunities",
  },
  hero: {
    eyebrow: "Product Designer · Frontend in progress",
    title: "I design and build accessible product interfaces for complex, real-world workflows.",
    lead: "Product designer building in React and JavaScript, grounded in 8+ years of multilingual operations across Spain and France.",
    targets: "Product Design · Frontend · UX Engineering",
    primaryAction: "Explore the work structure",
    secondaryAction: "View GitHub",
  },
  work: {
    status: PROJECT_STATUSES.paused,
    heading: "The next case studies will be selected after the portfolio foundation is complete.",
    body: "No unfinished project is presented as shipped work. The current rebuild focuses on the system, navigation and reading experience first.",
    items: [],
    builtHeading: "Built products",
    systemsHeading: "Design systems and component work",
    archiveHeading: "Operational reasoning archive",
    archiveBody: "The existing simulations remain preserved while their future role is decided. They are not presented as client or production work.",
  },
  capabilities: [
    {
      id: "product",
      title: "Product and operations",
      status: PROJECT_STATUSES.strong,
      items: ["Workflow mapping", "Requirements and constraints", "Edge cases and handoffs", "Multilingual service context"],
    },
    {
      id: "design",
      title: "Design",
      status: PROJECT_STATUSES.strong,
      items: ["Interaction design", "UI systems", "Prototyping", "Accessibility", "Usability testing"],
    },
    {
      id: "building",
      title: "Building",
      status: PROJECT_STATUSES.building,
      items: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Git"],
    },
  ],
  process: [
    { id: "understand", title: "Understand", body: "Understand the workflow, users and business constraint." },
    { id: "define", title: "Define", body: "Define states, risks, requirements and success signals." },
    { id: "explore", title: "Explore", body: "Explore and prototype alternatives before committing to one direction." },
    { id: "build", title: "Build and validate", body: "Build the interface, test normal and failure paths, and validate with people." },
    { id: "iterate", title: "Measure and iterate", body: "Document evidence, measure what is available, and improve without inventing impact." },
  ],
  labs: {
    eyebrow: "Learning in public, selectively",
    title: "Labs are for questions worth testing, not copied course output.",
    lead: "The Scrimba Frontend Career Path is in progress. Experiments appear here only when they include an adaptation, design decision or technical reflection.",
    current: "Scrimba Frontend Career Path",
    currentStatus: PROJECT_STATUSES.building,
  },
  about: {
    eyebrow: "Operations → Product → Code",
    title: "I learned products from the moments where real workflows break.",
    lead: "Eight-plus years in multilingual operations shaped how I investigate ambiguity, ownership, handoffs and service recovery. Product design gave that reasoning structure; frontend development is helping me carry it into working interfaces.",
    learning: "I am currently strengthening HTML, CSS, JavaScript, React and accessible implementation through Scrimba and independent practice.",
  },
};
```

Implement the complete French counterpart instead of an English fallback:

```js
const fr = {
  ...shared,
  location: "Valence, Espagne",
  statusLabels: {
    strong: "Solide aujourd’hui",
    building: "En développement",
    next: "Prochaine étape",
    paused: "Sélection des études de cas en pause",
  },
  identity: {
    current: "Designer produit",
    transition: "Développement d’interfaces accessibles en React",
    target: "Opportunités frontend et junior Design Engineer",
  },
  hero: {
    eyebrow: "Designer produit · Frontend en développement",
    title: "Je conçois et développe des interfaces produit accessibles pour des processus réels et complexes.",
    lead: "Designer produit développant en React et JavaScript, avec plus de huit ans d’expérience en opérations multilingues en Espagne et en France.",
    targets: "Design produit · Frontend · UX Engineering",
    primaryAction: "Explorer la structure des projets",
    secondaryAction: "Voir GitHub",
  },
  work: {
    status: PROJECT_STATUSES.paused,
    heading: "Les prochaines études de cas seront sélectionnées après la finalisation des fondations du portfolio.",
    body: "Aucun projet inachevé n’est présenté comme un produit livré. La refonte se concentre d’abord sur le système, la navigation et l’expérience de lecture.",
    items: [],
    builtHeading: "Produits développés",
    systemsHeading: "Design systems et composants",
    archiveHeading: "Archive de raisonnement opérationnel",
    archiveBody: "Les simulations existantes restent préservées pendant que leur rôle futur est décidé. Elles ne sont pas présentées comme du travail client ou de production.",
  },
  capabilities: [
    {
      id: "product",
      title: "Produit et opérations",
      status: PROJECT_STATUSES.strong,
      items: ["Cartographie des processus", "Exigences et contraintes", "Cas limites et transferts", "Contexte de service multilingue"],
    },
    {
      id: "design",
      title: "Design",
      status: PROJECT_STATUSES.strong,
      items: ["Design d’interaction", "Systèmes d’interface", "Prototypage", "Accessibilité", "Tests d’utilisabilité"],
    },
    {
      id: "building",
      title: "Développement",
      status: PROJECT_STATUSES.building,
      items: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Git"],
    },
  ],
  process: [
    { id: "understand", title: "Comprendre", body: "Comprendre le processus, les utilisateurs et la contrainte métier." },
    { id: "define", title: "Définir", body: "Définir les états, les risques, les exigences et les signaux de réussite." },
    { id: "explore", title: "Explorer", body: "Explorer et prototyper plusieurs options avant de retenir une direction." },
    { id: "build", title: "Développer et valider", body: "Développer l’interface, tester les parcours normaux et les erreurs, puis valider avec des personnes." },
    { id: "iterate", title: "Mesurer et itérer", body: "Documenter les preuves, mesurer ce qui est disponible et améliorer sans inventer d’impact." },
  ],
  labs: {
    eyebrow: "Apprendre publiquement, avec sélection",
    title: "Les Labs servent à tester des questions utiles, pas à publier des exercices copiés.",
    lead: "Le parcours Frontend Career Path de Scrimba est en cours. Une expérience n’apparaît ici que si elle comporte une adaptation, une décision de design ou une réflexion technique.",
    current: "Scrimba Frontend Career Path",
    currentStatus: PROJECT_STATUSES.building,
  },
  about: {
    eyebrow: "Opérations → Produit → Code",
    title: "J’ai appris les produits dans les moments où les processus réels se brisent.",
    lead: "Plus de huit ans en opérations multilingues ont façonné ma manière d’analyser l’ambiguïté, la responsabilité, les transferts et la reprise de service. Le design produit a structuré ce raisonnement ; le développement frontend m’aide à le transformer en interfaces fonctionnelles.",
    learning: "Je renforce actuellement HTML, CSS, JavaScript, React et l’implémentation accessible grâce à Scrimba et à une pratique indépendante.",
  },
};

export function getPortfolioV2(lang) {
  return lang === "fr" ? fr : en;
}
```

- [ ] **Step 3: Keep legacy data isolated**

Leave `projects` and current case facts in `content.js` for legacy case compatibility. Import canonical profile contact facts from `portfolioV2.js` or re-export them; do not duplicate different email, location, GitHub, or LinkedIn values.

- [ ] **Step 4: Run and commit content tests**

```bash
npm run test:unit -- tests/unit/portfolio-content.test.js
npm run lint
git add -- portfolio/src/lib/portfolioV2.js portfolio/src/lib/content.js portfolio/tests/unit/portfolio-content.test.js
git diff --cached --check
git commit -m "feat: add truthful bilingual portfolio v2 content"
```

### Task 9: Build Home, Work, Labs, About, and French Routes

**Files:**
- Create: `src/components/site/PageIntro.jsx`
- Create: `src/components/site/CapabilityGroup.jsx`
- Create: `src/components/site/WorkStatusPanel.jsx`
- Create: `src/components/site/WorkContent.jsx`
- Create: `src/components/site/LabsContent.jsx`
- Create: `src/components/site/SiteDocument.jsx`
- Modify: `src/components/site/HomeContent.jsx`
- Modify: `src/components/site/AboutContent.jsx`
- Create: `src/app/(en)/layout.jsx`
- Move: `src/app/page.jsx` → `src/app/(en)/page.jsx`
- Move: `src/app/about/page.jsx` → `src/app/(en)/about/page.jsx`
- Move: `src/app/work/page.jsx` → `src/app/(en)/work/page.jsx`
- Move: `src/app/labs/page.jsx` → `src/app/(en)/labs/page.jsx`
- Move unchanged: `src/app/work/*/page.jsx` → `src/app/(en)/work/*/page.jsx`
- Create: `src/app/fr/layout.jsx`
- Modify: `src/app/fr/page.jsx`
- Modify: `src/app/fr/work/page.jsx`
- Modify: `src/app/fr/labs/page.jsx`
- Modify: `src/app/fr/about/page.jsx`
- Delete after extraction: `src/app/layout.jsx`
- Modify: `tests/e2e/navigation.spec.js`

**Interfaces:**
- Consumes: `getPortfolioV2(lang)`, localized navigation, DS components, Reveal, Scramble, and stable `section[id]` labels.
- Produces: indexable non-case English/French routes and complete honest empty states, with cases still unselected.

- [ ] **Step 1: Create focused shared page components**

`PageIntro` accepts `eyebrow`, `title`, `lead`, and `actions`; `CapabilityGroup` accepts `title`, `status`, and `items`; `WorkStatusPanel` accepts `heading`, `body`, and `status` and renders no link. Each component uses DS tokens, semantic headings, and no internal translation lookup.

The Work status markup must include:

```jsx
<section className="work-status" aria-labelledby="work-status-title">
  <Status>{status}</Status>
  <Text as="h2" variant="h2" id="work-status-title">{heading}</Text>
  <Text variant="body">{body}</Text>
</section>
```

- [ ] **Step 2: Rewrite Home with stable semantic sections**

Use this order and stable IDs:

```text
top          Hero and identity
work         Case-free work status and Work CTA
capabilities Product, Design, Building evidence groups
experience   Transferable operations-to-product timeline
approach     Five-stage product-delivery model
about        Operations-to-product-to-code preview
contact      Target roles, location, email, LinkedIn, GitHub, resume
```

Every section must include localized `data-label` or `aria-label`. Keep portrait-led asymmetry, Reveal, restrained Scramble, and ProcessReveal; do not render WorkShowcase while `work.items` is empty.

- [ ] **Step 3: Build Work and Labs honest empty-state hubs**

Work contains page introduction, Built products empty state, Design systems/component work empty state, and Operational archive migration note. Do not render or link the three current case cards yet. Labs contains the verified Scrimba learning status and the rule that unmodified tutorial work is not portfolio evidence; it has no fabricated experiment links.

- [ ] **Step 4: Rewrite About around the approved four questions**

Order: positioning and portrait; operations-to-product-to-code narrative; transferable strengths; current learning; factual timeline; languages/location; actions. Keep Canada as a supporting mobility note, not the headline. Do not claim current Design Engineer employment or seniority.

- [ ] **Step 5: Extract the shared document shell**

Move the global imports, font links, structured-data script, `.js` flag, Providers, Header, Footer, ScrollProgress, SmoothScroll, SkipLink, and ToTop from `src/app/layout.jsx` into `SiteDocument({ children, lang })`. Its outer contract is:

```jsx
export function SiteDocument({ children, lang }) {
  const htmlLang = lang === "fr" ? "fr-CA" : "en-CA";
  return (
    <html lang={htmlLang} data-lang={lang} suppressHydrationWarning>
      <body>
        <Providers initialLang={lang}>
          <LocaleMetadata />
          <SmoothScroll />
          <ScrollProgress />
          <SkipLink />
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <ToTop />
        </Providers>
      </body>
    </html>
  );
}
```

Preserve the existing no-flash theme script and exact font request inside this component. Update `Providers` to accept `initialLang` and use it as the initial state. Do not duplicate the shell between locale layouts.

- [ ] **Step 6: Create static locale-specific root layouts**

Use two root layouts so the initial server HTML carries the correct language without a dynamic `headers()` call:

```jsx
// src/app/(en)/layout.jsx
import { SiteDocument } from "@/components/site/SiteDocument";
export default function EnglishRootLayout({ children }) {
  return <SiteDocument lang="en">{children}</SiteDocument>;
}
```

```jsx
// src/app/fr/layout.jsx
import { SiteDocument } from "@/components/site/SiteDocument";
export default function FrenchRootLayout({ children }) {
  return <SiteDocument lang="fr">{children}</SiteDocument>;
}
```

This follows the Next.js 16 multiple-root-layout convention and preserves static rendering. Do not add Proxy or turn the root layout dynamic merely to determine language.

- [ ] **Step 7: Move English entrypoints without changing URLs**

Run from the portfolio app:

```bash
mkdir -p 'src/app/(en)/about' 'src/app/(en)/work' 'src/app/(en)/labs'
git mv src/app/page.jsx 'src/app/(en)/page.jsx'
git mv src/app/about/page.jsx 'src/app/(en)/about/page.jsx'
git mv src/app/work/page.jsx 'src/app/(en)/work/page.jsx'
git mv src/app/labs/page.jsx 'src/app/(en)/labs/page.jsx'
for slug in access-restored connectivity-broke missing-reservation service-operations triageai; do
  mkdir -p "src/app/(en)/work/$slug"
  git mv "src/app/work/$slug/page.jsx" "src/app/(en)/work/$slug/page.jsx"
done
```

Delete the now-empty English route directories and delete `src/app/layout.jsx` only after `SiteDocument` and both locale root layouts exist. Route groups must leave `/`, `/about`, `/work`, `/labs`, and all legacy `/work/{slug}` URLs unchanged.

- [ ] **Step 8: Replace route stubs with complete localized pages and metadata**

Each French route renders the focused component with `lang="fr"`; English routes use `lang="en"`. Each `page.jsx` exports a unique title, description, canonical URL, and language alternate. Do not add French case routes.

- [ ] **Step 9: Expand route tests**

Add an assertion matrix for `/`, `/work`, `/labs`, `/about`, `/fr`, `/fr/work`, `/fr/labs`, and `/fr/about`: one visible H1, correct `<html lang>`, stable section IDs, no broken internal links, and no visible `Built` or `Shipped` project status.

- [ ] **Step 10: Run and commit the non-case architecture**

```bash
npm run test:unit
npm run lint
npm run build
npm run test:e2e
git add -- portfolio/src/components/site/PageIntro.jsx portfolio/src/components/site/CapabilityGroup.jsx portfolio/src/components/site/WorkStatusPanel.jsx portfolio/src/components/site/WorkContent.jsx portfolio/src/components/site/LabsContent.jsx portfolio/src/components/site/SiteDocument.jsx portfolio/src/components/site/HomeContent.jsx portfolio/src/components/site/AboutContent.jsx 'portfolio/src/app/(en)/layout.jsx' 'portfolio/src/app/(en)/page.jsx' 'portfolio/src/app/(en)/about/page.jsx' 'portfolio/src/app/(en)/work/page.jsx' 'portfolio/src/app/(en)/labs/page.jsx' 'portfolio/src/app/(en)/work/access-restored/page.jsx' 'portfolio/src/app/(en)/work/connectivity-broke/page.jsx' 'portfolio/src/app/(en)/work/missing-reservation/page.jsx' 'portfolio/src/app/(en)/work/service-operations/page.jsx' 'portfolio/src/app/(en)/work/triageai/page.jsx' portfolio/src/app/fr/layout.jsx portfolio/src/app/fr/page.jsx portfolio/src/app/fr/about/page.jsx portfolio/src/app/fr/work/page.jsx portfolio/src/app/fr/labs/page.jsx portfolio/src/app/layout.jsx portfolio/tests/e2e/navigation.spec.js
git diff --cached --check
git commit -m "feat: build portfolio v2 non-case architecture"
```

### Task 10: Preserve Progress Navigation and Add a Keyboard Alternative

**Files:**
- Create: `src/components/site/SectionJumpNav.jsx`
- Modify: `src/components/site/ScrollProgress.jsx`
- Modify: `src/app/globals.css`
- Modify: `tests/e2e/navigation.spec.js`
- Modify: `tests/e2e/accessibility.spec.js`

**Interfaces:**
- Consumes: the `main section[id]` plus `data-label`/`aria-label` contract.
- Produces: unchanged visual rail/dock behaviour plus a keyboard-visible section navigation generated from the same section list.

- [ ] **Step 1: Create the direct keyboard navigation**

Implement `SectionJumpNav({ sections })`:

```jsx
export function SectionJumpNav({ sections }) {
  if (!sections.length) return null;
  return (
    <nav className="section-jump-nav" aria-label="Page sections">
      <span className="section-jump-nav__title">On this page</span>
      {sections.map((section) => (
        <a key={section.id} href={`#${section.id}`}>{section.label}</a>
      ))}
    </nav>
  );
}
```

Localize the title and accessible label through shared chrome strings rather than hardcoding English in the final component.

- [ ] **Step 2: Reuse ScrollProgress's collected section model**

Render `SectionJumpNav` from `ScrollProgress` using the existing `sections` state. Keep desktop rail `aria-hidden`, mini indicator, mobile dock, active labels, tap, and swipe logic unchanged.

- [ ] **Step 3: Make the keyboard navigation discoverable on focus**

Position it off-canvas visually at rest, then display it as a high-contrast fixed panel when it or a child receives focus. It must not be `display:none`, `visibility:hidden`, or clipped while focused.

- [ ] **Step 4: Test keyboard and swipe regression**

Add Playwright tests that Tab reaches `Page sections`, Enter on the Contact link moves focus/scroll to `#contact`, and a 390px touch swipe advances the dock by one section without triggering vertical navigation.

- [ ] **Step 5: Test responsive and reduced-motion behaviour**

At 320px and 200% zoom verify the jump panel fits the viewport. Under reduced motion verify section links use immediate navigation and all labels remain visible.

- [ ] **Step 6: Commit protected progress navigation**

```bash
npm run test:e2e
npm run test:a11y
npm run lint
git add -- portfolio/src/components/site/SectionJumpNav.jsx portfolio/src/components/site/ScrollProgress.jsx portfolio/src/app/globals.css portfolio/tests/e2e/navigation.spec.js portfolio/tests/e2e/accessibility.spec.js
git diff --cached --check
git commit -m "feat: add accessible section navigation"
```

### Task 11: Align Metadata, Sitemap, and Structured Data

**Files:**
- Modify: `src/components/site/SiteDocument.jsx`
- Modify: `src/app/(en)/layout.jsx`
- Modify: `src/app/fr/layout.jsx`
- Modify: `src/components/site/LocaleMetadata.jsx`
- Modify: `src/app/sitemap.js`
- Modify: `src/app/robots.js`
- Modify: `src/app/not-found.jsx`
- Modify: `src/app/opengraph-image.js`
- Modify: `tests/e2e/navigation.spec.js`

**Interfaces:**
- Consumes: transitional identity, route locale helpers, canonical URLs, and profile links.
- Produces: accurate server-rendered metadata for all non-case routes; cases remain excluded from v2 promotion until their later plan.

- [ ] **Step 1: Replace locale-root metadata and schema with the transitional identity**

Export the English default title and description from `src/app/(en)/layout.jsx` and their approved French equivalents from `src/app/fr/layout.jsx`. Use English title `Breno Sampaio — Product Designer building accessible interfaces` and description `Product designer building accessible interfaces in React, grounded in multilingual operations across Spain and France.` In the JSON-LD owned by `SiteDocument`, set `Person.jobTitle` to `Product Designer`; add GitHub and LinkedIn to `sameAs`; retain factual location and languages. Keep route-specific metadata in each non-case `page.jsx` from Task 9.

- [ ] **Step 2: Remove client-side mutation for pages with server metadata**

Limit `LocaleMetadata` to frozen legacy case compatibility. Do not let it overwrite metadata for `/`, `/work`, `/labs`, `/about`, or their `/fr` equivalents after hydration.

- [ ] **Step 3: Publish only non-case v2 routes in the interim sitemap**

Return English and French Home, Work, Labs, and About entries with reciprocal language alternates. Exclude unfinished Service Operations, TriageAI, and FieldOps. Remove the three operational simulations from the sitemap until the case phase decides their archive placement; do not delete their routes.

- [ ] **Step 4: Test canonical, hreflang, schema, and 404 recovery**

For every non-case route, assert one canonical URL, English/French alternates, correct document language, unique title/description, and JSON-LD containing Product Designer plus both profile URLs. Verify an unknown route offers Home and Work recovery links in the active locale.

- [ ] **Step 5: Commit metadata alignment**

```bash
npm run test:e2e
npm run build
npm run lint
git add -- portfolio/src/components/site/SiteDocument.jsx 'portfolio/src/app/(en)/layout.jsx' portfolio/src/app/fr/layout.jsx portfolio/src/app/sitemap.js portfolio/src/app/robots.js portfolio/src/app/not-found.jsx portfolio/src/app/opengraph-image.js portfolio/src/components/site/LocaleMetadata.jsx portfolio/tests/e2e/navigation.spec.js
git diff --cached --check
git commit -m "feat: align portfolio v2 metadata and discovery"
```

### Task 12: Complete Responsive, Theme, Accessibility, and Visual QA

**Files:**
- Create: `tests/e2e/visual-capture.spec.js`
- Modify: `tests/e2e/accessibility.spec.js`
- Modify: `src/app/globals.css`
- Modify: `docs/portfolio-v2-implementation-log.md`

**Interfaces:**
- Produces: required 320/390/768/1024/1440 evidence across non-case routes, themes, reduced motion, focus, reflow, and protected chrome.

- [ ] **Step 1: Add overflow, target, and contrast-adjacent browser checks**

For Home, Work, Labs, and About in English and French, assert at 320px that `document.documentElement.scrollWidth <= document.documentElement.clientWidth`, all visible buttons/links are keyboard reachable, and primary controls have at least 24px target size with non-overlapping spacing; check preferred 44px on primary actions.

- [ ] **Step 2: Add the visual capture matrix**

Create `tests/e2e/visual-capture.spec.js`:

```js
import { test } from "@playwright/test";

const widths = [320, 390, 768, 1024, 1440];
const routes = ["/", "/work", "/labs", "/about", "/fr", "/fr/work", "/fr/labs", "/fr/about"];

for (const route of routes) {
  for (const width of widths) {
    for (const theme of ["light", "dark"]) {
      test(`capture ${route} ${width} ${theme}`, async ({ page }) => {
        await page.setViewportSize({ width, height: width <= 390 ? 844 : 900 });
        await page.addInitScript((value) => localStorage.setItem("theme", value), theme);
        await page.goto(route);
        await page.screenshot({
          path: `artifacts/visual/${theme}-${width}-${route.replaceAll("/", "_") || "home"}.png`,
          fullPage: true,
        });
      });
    }
  }
}
```

Generated captures stay ignored; review them manually in chronological route/width/theme order.

- [ ] **Step 3: Inspect the protected visual surfaces**

At minimum capture and inspect: first viewport before and after motion settles; rail active state; 390px header closed/open; mobile dock over light and dark regions; keyboard jump navigation; About portrait composition; Work and Labs empty states; final Contact; 200% zoom; reduced motion.

- [ ] **Step 4: Correct only evidenced defects**

Make targeted changes in `globals.css` for overflow, overlap, hierarchy, contrast, focus, hit areas, or motion. If the evidence reveals a structural component defect, return to the task that owns that component, make the smallest correction there, rerun that task's checks, and stage the exact owning file in Step 6. Do not use this pass for unrelated redesign or case content.

- [ ] **Step 5: Run the complete non-case verification suite separately**

```bash
npm run lint
npm run test:unit
npm run build
npm audit --omit=dev --audit-level=high
npm run test:e2e
npm run test:a11y
npm run test:visual
```

Expected: each command exits zero except `test:visual`, which passes after creating the reviewed capture set. Record exact results and any accepted limitations in the implementation log.

- [ ] **Step 6: Commit QA corrections and evidence log**

```bash
git add -- portfolio/src/app/globals.css portfolio/tests/e2e/accessibility.spec.js portfolio/tests/e2e/visual-capture.spec.js portfolio/docs/portfolio-v2-implementation-log.md
git diff --cached --check
git commit -m "test: validate portfolio v2 non-case experience"
```

If Step 4 changed an owning component, append its exact path to the `git add --` command; never stage an entire directory to capture an incidental fix.

### Task 13: Protected Main Handoff to the Case Phase

**Files:**
- Modify: `docs/portfolio-v2-implementation-log.md`

**Interfaces:**
- Consumes: completed Tasks 1–12 and passing CI/deployment.
- Produces: a protected, verified non-case v2 and an explicit stop before any case selection or public release.

- [ ] **Step 1: Inspect the final direct-main diff and history**

```bash
git status --short --branch
git log --oneline --decorate portfolio-public-pre-v2-2026-09-21..HEAD
git diff --stat portfolio-public-pre-v2-2026-09-21..HEAD -- portfolio
git diff --check portfolio-public-pre-v2-2026-09-21..HEAD -- portfolio
```

Expected: only intended `portfolio/**` changes; no sibling project or Git-root configuration content appears.

- [ ] **Step 2: Push and wait for protected production**

```bash
git push origin main
```

Wait for GitHub CI and Vercel deployment to finish. Do not disable Deployment Protection.

- [ ] **Step 3: Smoke-test the protected deployment**

Verify signed-out denial, authorized Home/Work/Labs/About English/French navigation, theme, language, resume link response, mobile More, progress/dock, console, and no dead action from an unfinished case.

- [ ] **Step 4: Record the stop condition**

Append to the implementation log:

```markdown
## Non-case handoff
- Production protection: still enabled
- Main deployment: verified while authorized
- Case selection: intentionally not started
- Public release: blocked pending case decision, case evidence, full release QA, and Breno approval
```

- [ ] **Step 5: Commit the handoff record**

```bash
git add -- portfolio/docs/portfolio-v2-implementation-log.md
git diff --cached --check
git commit -m "docs: hand off portfolio v2 to case selection"
git push origin main
```

- [ ] **Step 6: Stop before case work**

Report the protected v2 state to Breno and request a separate decision about case selection. Do not begin a case, remove protection, replace resume PDFs, or announce public release under this plan.

## Plan Self-Review Result

- **Spec coverage:** Protection, recovery, direct-main discipline, case freeze, token consolidation, chrome, route architecture, bilingual content, Home/Work/Labs/About, metadata, accessibility, responsive behaviour, protected motion, QA, commit boundaries, and stop conditions all map to Tasks 1–13.
- **Excluded intentionally:** Case selection/content/build, final resume replacement, analytics instrumentation, production unlock, and final recruiter release remain separate because the approved delivery strategy places them after this plan.
- **Placeholder scan:** No implementation placeholder remains; every deferred item is an explicit out-of-scope gate owned by the later case-and-release plan.
- **Type/interface consistency:** `languageFromPath`, `localizedPath`, `isLocalizedHub`, `getPortfolioV2`, `navigationFor`, status values, route IDs, and test commands are defined before their consumers.
- **Review-focus coverage:** Deployment access, localized hubs plus frozen cases, keyboard navigation, reduced/no-JS behaviour, and narrow/zoom/dark-surface conditions each have an owning test task.
