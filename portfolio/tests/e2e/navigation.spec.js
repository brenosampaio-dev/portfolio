import { expect, test } from "@playwright/test";

test("current portfolio exposes core navigation and content", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("main h1")).toBeVisible();
  await expect(page.getByRole("navigation").first()).toBeVisible();
  await expect(page.locator("#contact")).toBeAttached();
});

test("hero portrait remains editorially secondary across responsive layouts", async ({ page }) => {
  for (const viewport of [
    { width: 1440, height: 900, maximumPortraitWidth: 380 },
    { width: 768, height: 900, maximumPortraitWidth: 320 },
    { width: 390, height: 844, maximumPortraitWidth: 270 },
  ]) {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto("/");
    const portrait = await page.locator(".hero__media--photo").boundingBox();
    expect(portrait).not.toBeNull();
    expect(portrait.width).toBeLessThanOrEqual(viewport.maximumPortraitWidth);
  }
});

test("hero primary action reveals the working method in both languages", async ({ page }) => {
  for (const path of ["/", "/fr"]) {
    await page.goto(path);
    const primaryAction = page.locator(".hero__actions a").first();
    await expect(primaryAction).toHaveAttribute("href", "#approach");
    await primaryAction.click();
    await expect(page).toHaveURL(/#approach$/);
    await expect(page.locator("#approach")).toBeInViewport();
  }
});

test("desktop pointer reveals a decorative code layer without intercepting the page", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const veil = page.locator(".code-veil");
  await expect(veil).toHaveAttribute("aria-hidden", "true");
  await expect(veil).toHaveCSS("pointer-events", "none");

  await page.mouse.move(620, 420);
  await expect(veil).toHaveAttribute("data-active", "true");
  const box = await veil.boundingBox();
  expect(box).not.toBeNull();
  expect(Math.abs(box.x + box.width / 2 - 620)).toBeLessThanOrEqual(2);
  expect(Math.abs(box.y + box.height / 2 - 420)).toBeLessThanOrEqual(2);
});

test("desktop code reveal remains a compact accent around the pointer", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await page.mouse.move(620, 420);

  const box = await page.locator(".code-veil").boundingBox();
  expect(box).not.toBeNull();
  expect(box.width).toBeLessThanOrEqual(180);
  expect(box.height).toBeLessThanOrEqual(180);
});

test("desktop code reveal follows pointer coordinates in the same event", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const veil = page.locator(".code-veil");
  let warmup = 0;
  await expect.poll(async () => {
    warmup += 1;
    await page.mouse.move(620 + (warmup % 2), 420);
    return veil.getAttribute("data-active");
  }).toBe("true");

  const center = await page.evaluate(() => {
    const target = { x: 873, y: 517 };
    window.dispatchEvent(new PointerEvent("pointermove", {
      bubbles: true,
      clientX: target.x,
      clientY: target.y,
      pointerType: "mouse",
    }));
    const rect = document.querySelector(".code-veil").getBoundingClientRect();
    return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
  });

  expect(Math.abs(center.x - 873)).toBeLessThanOrEqual(1);
  expect(Math.abs(center.y - 517)).toBeLessThanOrEqual(1);
});

test("decorative code reveal stays off for reduced motion and narrow layouts", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const veil = page.locator(".code-veil");
  await page.mouse.move(620, 420);
  await expect(veil).toHaveAttribute("data-active", "false");
  await expect(veil).toHaveCSS("display", "none");

  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.reload();
  await page.mouse.move(180, 360);
  await expect(veil).toHaveAttribute("data-active", "false");
  await expect(veil).toHaveCSS("display", "none");
});

test("saved dark theme survives hydration", async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("theme", "dark"));
  await page.goto("/");
  await page.waitForTimeout(1100);

  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  expect(await page.evaluate(() => localStorage.getItem("theme"))).toBe("dark");
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

test("mobile More closes after same-page Contact navigation in both languages", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });

  for (const route of [
    { path: "/", more: "More", hash: /\/#contact$/ },
    { path: "/fr", more: "Plus", hash: /\/fr#contact$/ },
  ]) {
    await page.goto(route.path);
    await page.getByRole("button", { name: route.more, exact: true }).click();
    const moreNavigation = page.getByRole("navigation", { name: route.more, exact: true });
    await moreNavigation.getByRole("link", { name: "Contact", exact: true }).click();
    await expect(moreNavigation).toHaveCount(0);
    await expect(page).toHaveURL(route.hash);
    await expect(page.locator("#contact")).toBeInViewport();
  }
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

test("About contact actions return to the localized Home contact section", async ({ page }) => {
  for (const route of [
    { path: "/about", href: "/#contact" },
    { path: "/fr/about", href: "/fr#contact" },
  ]) {
    await page.goto(route.path);
    await expect(page.locator(`#about-actions a[href="${route.href}"]`)).toBeVisible();
  }
});

test("external profile links are isolated from the opener", async ({ page }) => {
  await page.goto("/");
  const externalLinks = page.locator('a[target="_blank"]');
  await expect(externalLinks).not.toHaveCount(0);
  const relValues = await externalLinks.evaluateAll((links) => links.map((link) => link.rel));
  expect(relValues.every((rel) => rel.includes("noopener") && rel.includes("noreferrer"))).toBe(true);
});

test("keyboard section navigation reaches and focuses Contact", async ({ page }) => {
  await page.goto("/");
  const jumpNav = page.locator(".section-jump-nav");
  await expect(jumpNav).toHaveAttribute("aria-label", "Page sections");
  const firstLink = jumpNav.getByRole("link").first();
  for (let index = 0; index < 16; index += 1) {
    await page.keyboard.press("Tab");
    if (await firstLink.evaluate((link) => document.activeElement === link)) break;
  }
  await expect(firstLink).toBeFocused();

  const contactLink = jumpNav.getByRole("link", { name: "Contact", exact: true });
  await contactLink.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("#contact")).toBeFocused();
  await expect(page).toHaveURL(/#contact$/);
});

test("mobile dock advances one section only on horizontal swipe", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const pill = page.locator(".case-dock__pill");

  await pill.dispatchEvent("touchstart", { touches: [{ identifier: 0, clientX: 220, clientY: 760 }] });
  await pill.dispatchEvent("touchend", { changedTouches: [{ identifier: 0, clientX: 210, clientY: 680 }] });
  await expect(page).not.toHaveURL(/#work$/);

  await pill.dispatchEvent("touchstart", { touches: [{ identifier: 1, clientX: 260, clientY: 760 }] });
  await pill.dispatchEvent("touchend", { changedTouches: [{ identifier: 1, clientX: 180, clientY: 756 }] });
  await expect(page).toHaveURL(/#work$/);
  await expect(page.locator("#work")).toBeInViewport();
});

test("non-case metadata is localized, reciprocal and truthful", async ({ page }) => {
  const titles = new Set();
  const descriptions = new Set();

  for (const { path, lang } of nonCaseRoutes) {
    await page.goto(path);
    const title = await page.title();
    const description = await page.locator('meta[name="description"]').getAttribute("content");
    expect(title).toBeTruthy();
    expect(description).toBeTruthy();
    expect(titles.has(title), `duplicate title at ${path}`).toBe(false);
    expect(descriptions.has(description), `duplicate description at ${path}`).toBe(false);
    titles.add(title);
    descriptions.add(description);

    await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
    await expect(page.locator('link[rel="alternate"][hreflang="en-CA"]')).toHaveCount(1);
    await expect(page.locator('link[rel="alternate"][hreflang="fr-CA"]')).toHaveCount(1);
    await expect(page.locator("html")).toHaveAttribute("lang", lang);

    const schema = JSON.parse(await page.locator("#person-schema").textContent());
    expect(schema.jobTitle).toBe("Product Designer");
    expect(schema.sameAs).toContain("https://github.com/brenosampaio-dev");
    expect(schema.sameAs).toContain("https://www.linkedin.com/in/brenosampaio");
  }
});

test("localized 404 offers Home and Work recovery", async ({ page }) => {
  for (const route of [
    { path: "/missing-route", home: "/", work: "/work" },
    { path: "/fr/missing-route", home: "/fr", work: "/fr/work" },
  ]) {
    await page.goto(route.path);
    await expect(page.locator("main h1")).toBeVisible();
    await expect(page.locator(`main a[href="${route.home}"]`)).toBeVisible();
    await expect(page.locator(`main a[href="${route.work}"]`)).toBeVisible();
  }
});

test("localized 404 is server-rendered and recoverable without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();

  for (const route of [
    { path: "/missing-without-javascript", lang: "en-CA", home: "/", work: "/work" },
    { path: "/fr/missing-without-javascript", lang: "fr-CA", home: "/fr", work: "/fr/work" },
  ]) {
    const response = await page.goto(route.path);
    expect(response?.status()).toBe(404);
    await expect(page.locator("html")).toHaveAttribute("lang", route.lang);
    await expect(page.locator("main h1")).toBeVisible();
    await expect(page.locator(`main a[href="${route.home}"]`)).toBeVisible();
    await expect(page.locator(`main a[href="${route.work}"]`)).toBeVisible();
  }

  await context.close();
});
