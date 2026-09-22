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

test("mobile More closes with Escape and restores focus", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const primaryNavigation = page.getByRole("navigation", { name: "Primary navigation" });
  await expect(primaryNavigation.getByRole("link", { name: "Work", exact: true })).toBeVisible();
  await expect(primaryNavigation.getByRole("link", { name: "About", exact: true })).toBeVisible();

  const trigger = page.getByRole("button", { name: /more|tools|menu/i });
  await trigger.click();
  await expect(page.getByRole("navigation", { name: "More" }).getByRole("link", { name: "Labs", exact: true })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
});

test("every exposed non-case route returns a visible heading", async ({ page }) => {
  for (const path of [
    "/work",
    "/labs",
    "/about",
    "/fr",
    "/fr/work",
    "/fr/labs",
    "/fr/about",
  ]) {
    await page.goto(path);
    await expect(page.locator("main h1")).toBeVisible();
  }
});

test("external profile links are isolated from the opener", async ({ page }) => {
  await page.goto("/");
  const externalLinks = page.locator('a[target="_blank"]');
  await expect(externalLinks).not.toHaveCount(0);
  const relValues = await externalLinks.evaluateAll((links) => links.map((link) => link.rel));
  expect(relValues.every((rel) => rel.includes("noopener") && rel.includes("noreferrer"))).toBe(true);
});
