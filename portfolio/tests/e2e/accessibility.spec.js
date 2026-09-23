import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

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
