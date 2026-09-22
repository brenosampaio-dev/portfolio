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
