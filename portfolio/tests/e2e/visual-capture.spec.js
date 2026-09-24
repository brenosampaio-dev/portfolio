import { expect, test } from "@playwright/test";

const widths = [320, 390, 768, 1024, 1440];
const routes = ["/", "/work", "/labs", "/about", "/fr", "/fr/work", "/fr/labs", "/fr/about"];

function routeName(route) {
  return route === "/" ? "home" : route.slice(1).replaceAll("/", "-");
}

async function settleAndReveal(page) {
  await page.waitForTimeout(1100);
  await page.evaluate(async () => {
    const step = Math.max(240, Math.floor(window.innerHeight * 0.72));
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((resolve) => window.setTimeout(resolve, 70));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(900);
}

for (const route of routes) {
  for (const width of widths) {
    for (const theme of ["light", "dark"]) {
      test(`capture ${route} ${width} ${theme}`, async ({ page }) => {
        await page.setViewportSize({ width, height: width <= 390 ? 844 : 900 });
        await page.addInitScript((value) => localStorage.setItem("theme", value), theme);
        await page.goto(route);
        await expect(page.locator("main h1")).toBeVisible();
        await settleAndReveal(page);
        await page.screenshot({
          path: `artifacts/visual/${theme}-${width}-${routeName(route)}.png`,
          fullPage: true,
        });
      });
    }
  }
}

test("capture protected interaction surfaces", async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const page = await context.newPage();
  await page.goto("/");
  await page.screenshot({ path: "artifacts/visual/surface-mobile-initial.png" });
  await page.waitForTimeout(1100);
  await page.screenshot({ path: "artifacts/visual/surface-mobile-settled.png" });

  await page.getByRole("button", { name: /more|tools|menu/i }).click();
  await page.screenshot({ path: "artifacts/visual/surface-mobile-header-open.png" });
  await page.keyboard.press("Escape");

  await page.locator(".hero__media").evaluate((element) => window.scrollTo(0, element.offsetTop - 500));
  await page.waitForTimeout(800);
  await page.screenshot({ path: "artifacts/visual/surface-mobile-dock-dark-region.png" });

  await page.locator(".section-jump-nav a").first().focus();
  await page.waitForTimeout(300);
  await page.screenshot({ path: "artifacts/visual/surface-jump-navigation.png" });

  await page.locator("#contact").evaluate((element) => {
    element.tabIndex = -1;
    element.focus();
    window.scrollTo(0, element.offsetTop - 96);
  });
  await page.waitForTimeout(700);
  await page.screenshot({ path: "artifacts/visual/surface-mobile-contact-dock.png" });
  await context.close();
});

test("capture desktop progress and reduced-motion states", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await page.locator("#approach").evaluate((element) => window.scrollTo(0, element.offsetTop - 110));
  await page.waitForTimeout(1100);
  await page.screenshot({ path: "artifacts/visual/surface-desktop-rail.png" });

  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.reload();
  await page.screenshot({ path: "artifacts/visual/surface-reduced-motion.png" });
});

test("capture desktop code veil in light and dark themes", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await settleAndReveal(page);

  const veil = page.locator(".code-veil");
  await page.mouse.move(690, 600);
  await expect(veil).toHaveAttribute("data-active", "true");
  await page.screenshot({ path: "artifacts/visual/surface-code-veil-light.png" });

  await page.getByRole("button", { name: "Switch to dark mode" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.reload();
  await settleAndReveal(page);
  await page.mouse.move(760, 600);
  await expect(veil).toHaveAttribute("data-active", "true");
  await page.screenshot({ path: "artifacts/visual/surface-code-veil-dark.png" });
});

test("capture effective 200-percent reflow", async ({ page }) => {
  await page.setViewportSize({ width: 160, height: 720 });
  await page.goto("/");
  await page.waitForTimeout(1100);
  await page.screenshot({ path: "artifacts/visual/surface-200-percent-reflow.png" });
});
