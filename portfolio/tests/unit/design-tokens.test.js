import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const read = (file) => readFileSync(resolve(process.cwd(), file), "utf8");

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
    expect(css).not.toMatch(/--radius-xl:\s*(?:2[0-9]|3[0-2])px/);
  });

  it("uses the approved semantic motion cadence", () => {
    const css = read("design-system/tokens/motion.css");
    expect(css).toContain("--duration-hover: 160ms");
    expect(css).toContain("--duration-reveal: var(--duration-lg)");
  });

  it("keeps the protected scramble inside the approved readable window", () => {
    const source = read("src/components/site/Scramble.jsx");
    expect(source).toContain("const resolvedDuration = Math.min(Math.max(duration, 0.8), 1)");
    expect(source).toContain("duration: resolvedDuration");
    expect(source).toContain("revealDelay: 0.18");
    expect(source).toContain("Math.min(Math.max(delay, 0), 200)");
  });

  it("keeps dormant work showcase geometry within the approved bands", () => {
    const css = read("src/components/site/WorkShowcase.css");
    expect(css).toContain("border-radius: var(--radius-lg)");
    expect(css).toContain("font-size: 12px");
    expect(css).toContain("min-height: 96svh");
    expect(css).toContain("min-height: 72svh");
    expect(css).toContain("min-height: min(600px, calc(100svh - 152px))");
    expect(css).not.toMatch(/border-radius:\s*clamp\(20px/);
  });

  it("keeps case visual disclosure labels at the microtype floor", () => {
    const css = read("src/components/site/CaseVisual.css");
    expect(css).toMatch(/\.case-visual-cover__label\s*\{[\s\S]*?font-size:\s*12px/);
  });
});
