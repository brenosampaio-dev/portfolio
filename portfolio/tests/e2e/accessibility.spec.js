import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const nonCaseRoutes = ["/", "/work", "/labs", "/about", "/fr", "/fr/work", "/fr/labs", "/fr/about"];

test("@a11y home has no serious or critical axe findings", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations.filter((violation) =>
    ["serious", "critical"].includes(violation.impact)
  )).toEqual([]);
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

test("@a11y section jump panel fits at 320px and 200% zoom", async ({ page }) => {
  // A 320px viewport at 200% browser zoom exposes an effective 160 CSS px layout viewport.
  await page.setViewportSize({ width: 160, height: 720 });
  await page.goto("/");
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);

  const headerReport = await page.locator(".site-header").evaluate((header) => {
    const controls = [...header.querySelectorAll("a, button")].filter((element) => {
      const rect = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      return style.display !== "none" && style.visibility !== "hidden" && rect.width > 0 && rect.height > 0;
    });
    const rectangles = controls.map((element) => {
      const rect = element.getBoundingClientRect();
      return { label: element.textContent?.trim() || element.getAttribute("aria-label"), left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom };
    });
    const overlaps = [];
    for (let i = 0; i < rectangles.length; i += 1) {
      for (let j = i + 1; j < rectangles.length; j += 1) {
        const a = rectangles[i];
        const b = rectangles[j];
        if (Math.min(a.right, b.right) - Math.max(a.left, b.left) > 1 && Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top) > 1) {
          overlaps.push(`${a.label} / ${b.label}`);
        }
      }
    }
    return {
      outside: rectangles.filter(({ left, right }) => left < 0 || right > window.innerWidth).map(({ label }) => label),
      overlaps,
    };
  });
  expect(headerReport.outside).toEqual([]);
  expect(headerReport.overlaps).toEqual([]);

  await page.getByRole("button", { name: "More" }).click();
  await expect(page.locator(".mobile-tools__actions").getByRole("link", { name: "Work", exact: true })).toBeVisible();
  await expect(page.locator(".mobile-tools__actions").getByRole("link", { name: "About", exact: true })).toBeVisible();
  await page.keyboard.press("Escape");

  const nav = page.locator(".section-jump-nav");
  await expect(nav).toHaveAttribute("aria-label", "Page sections");
  await nav.getByRole("link").first().focus();
  const box = await nav.boundingBox();
  expect(box).not.toBeNull();
  expect(box.x).toBeGreaterThanOrEqual(0);
  expect(box.x + box.width).toBeLessThanOrEqual(160);
});

test("@a11y reduced motion keeps every jump label visible and navigates immediately", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const nav = page.locator(".section-jump-nav");
  await expect(nav).toHaveAttribute("aria-label", "Page sections");
  await nav.getByRole("link").first().focus();
  await expect(nav.getByRole("link")).toHaveCount(7);
  for (const link of await nav.getByRole("link").all()) await expect(link).toBeVisible();
  await nav.getByRole("link", { name: "Contact", exact: true }).press("Enter");
  await expect(page.locator("#contact")).toBeFocused();
});

for (const route of nonCaseRoutes) {
  test(`@a11y ${route} reflows and keeps interactive targets usable at 320px`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 844 });
    await page.goto(route);
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);

    const report = await page.locator("a, button").evaluateAll((elements) => {
      const visible = elements.filter((element) => {
        const rect = element.getBoundingClientRect();
        let current = element;
        while (current) {
          const style = getComputedStyle(current);
          if (style.display === "none" || style.visibility === "hidden" || Number(style.opacity) === 0) return false;
          current = current.parentElement;
        }
        return rect.width > 0 && rect.height > 0 && !(element.classList.contains("skip-link") && rect.bottom <= 0);
      });
      const tooSmall = [];
      const unreachable = [];
      const rectangles = visible.map((element) => {
        const rect = element.getBoundingClientRect();
        return { element, left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom };
      });

      visible.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const isInlineText = getComputedStyle(element).display === "inline";
        if (!isInlineText && (rect.width < 24 || rect.height < 24)) tooSmall.push(element.textContent?.trim() || element.getAttribute("aria-label"));
        element.focus();
        if (document.activeElement !== element) unreachable.push(element.textContent?.trim() || element.getAttribute("aria-label"));
      });

      const overlaps = [];
      for (let i = 0; i < rectangles.length; i += 1) {
        for (let j = i + 1; j < rectangles.length; j += 1) {
          const a = rectangles[i];
          const b = rectangles[j];
          const width = Math.min(a.right, b.right) - Math.max(a.left, b.left);
          const height = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
          if (width > 1 && height > 1 && !a.element.contains(b.element) && !b.element.contains(a.element)) {
            overlaps.push(`${a.element.textContent?.trim()} / ${b.element.textContent?.trim()}`);
          }
        }
      }
      return { tooSmall, unreachable, overlaps };
    });

    expect(report.tooSmall, `${route} target sizes`).toEqual([]);
    expect(report.unreachable, `${route} keyboard reachability`).toEqual([]);
    expect(report.overlaps, `${route} overlapping targets`).toEqual([]);

    const primaryActions = page.locator('.hero__actions a, .page-intro__actions a:not([style*="min-height: auto"])');
    for (const action of await primaryActions.all()) {
      if (!(await action.isVisible())) continue;
      const box = await action.boundingBox();
      expect(box.height, `${route} primary action height`).toBeGreaterThanOrEqual(44);
    }
  });
}
