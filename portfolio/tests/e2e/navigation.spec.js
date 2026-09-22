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

const nonCaseRoutes = [
  { path: "/", lang: "en-CA", sectionIds: ["top", "work", "capabilities", "experience", "approach", "about", "contact"] },
  { path: "/work", lang: "en-CA", sectionIds: ["work-overview", "built-products", "design-systems", "operational-archive"] },
  { path: "/labs", lang: "en-CA", sectionIds: ["labs-overview", "current-learning", "publishing-standard"] },
  { path: "/about", lang: "en-CA", sectionIds: ["about-overview", "about-path", "transferable-strengths", "current-learning", "timeline", "languages-location", "about-actions"] },
  { path: "/fr", lang: "fr-CA", sectionIds: ["top", "work", "capabilities", "experience", "approach", "about", "contact"] },
  { path: "/fr/work", lang: "fr-CA", sectionIds: ["work-overview", "built-products", "design-systems", "operational-archive"] },
  { path: "/fr/labs", lang: "fr-CA", sectionIds: ["labs-overview", "current-learning", "publishing-standard"] },
  { path: "/fr/about", lang: "fr-CA", sectionIds: ["about-overview", "about-path", "transferable-strengths", "current-learning", "timeline", "languages-location", "about-actions"] },
];

test("every exposed non-case route has one localized H1 and stable sections", async ({ page }) => {
  for (const { path, lang, sectionIds } of nonCaseRoutes) {
    await page.goto(path);
    await expect(page.locator("main h1:visible")).toHaveCount(1);
    await expect(page.locator("html")).toHaveAttribute("lang", lang);
    for (const id of sectionIds) {
      await expect(page.locator(`main section#${id}`)).toBeAttached();
    }
    await expect(page.getByText(/^(?:Built|Shipped)$/i)).toHaveCount(0);
  }
});

test("non-case pages have no broken internal links", async ({ page, request }) => {
  for (const { path } of nonCaseRoutes) {
    await page.goto(path);
    const hrefs = await page.locator('main a[href^="/"]').evaluateAll((links) =>
      [...new Set(links.map((link) => link.getAttribute("href")).filter(Boolean))],
    );
    for (const href of hrefs) {
      const response = await request.get(href.split("#")[0]);
      expect(response.ok(), `${path} links to ${href}`).toBe(true);
    }
  }
});

test("external profile links are isolated from the opener", async ({ page }) => {
  await page.goto("/");
  const externalLinks = page.locator('a[target="_blank"]');
  await expect(externalLinks).not.toHaveCount(0);
  const relValues = await externalLinks.evaluateAll((links) => links.map((link) => link.rel));
  expect(relValues.every((rel) => rel.includes("noopener") && rel.includes("noreferrer"))).toBe(true);
});
