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
  });
});
