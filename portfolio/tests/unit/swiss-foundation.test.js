import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createElement } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Text } from "@/components/ds/Text";

const pathFor = (file) => resolve(process.cwd(), file);
const read = (file) => readFileSync(pathFor(file), "utf8");

function cssBlock(source, selector) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return source.match(new RegExp(`${escaped}\\s*\\{([\\s\\S]*?)\\}`))?.[1] || "";
}

function cssVariable(block, name) {
  return block.match(new RegExp(`--${name}:\\s*(#[0-9A-Fa-f]{6})`))?.[1]?.toUpperCase();
}

function relativeLuminance(hex) {
  const channels = hex.slice(1).match(/.{2}/g).map((value) => Number.parseInt(value, 16) / 255);
  const linear = channels.map((value) => (value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4));
  return (0.2126 * linear[0]) + (0.7152 * linear[1]) + (0.0722 * linear[2]);
}

function contrastRatio(foreground, background) {
  const lighter = Math.max(relativeLuminance(foreground), relativeLuminance(background));
  const darker = Math.min(relativeLuminance(foreground), relativeLuminance(background));
  return (lighter + 0.05) / (darker + 0.05);
}

describe("Swiss portfolio foundation", () => {
  it("owns the three approved fonts at the document boundary", () => {
    const fontsPath = pathFor("src/lib/fonts.js");
    expect(existsSync(fontsPath)).toBe(true);

    const loader = read("src/lib/fonts.js");
    const document = read("src/components/site/SiteDocument.jsx");
    expect(loader).toContain("Geist_Mono");
    expect(loader).toContain("Instrument_Serif");
    expect(loader).toContain("--font-geist-sans");
    expect(loader).toContain("--font-geist-mono");
    expect(loader).toContain("--font-instrument-serif");
    expect(document).toContain("geistSans.variable");
    expect(document).toContain("geistMono.variable");
    expect(document).toContain("instrumentSerif.variable");
  });

  it("does not load the retired fonts over remote stylesheets", () => {
    const fontTokens = read("design-system/tokens/fonts.css");
    const document = read("src/components/site/SiteDocument.jsx");
    const fontSurface = `${fontTokens}\n${document}`;

    expect(fontSurface).not.toMatch(/fonts\.googleapis\.com|@import\s+url/i);
    expect(fontSurface).not.toMatch(/DM Sans|Cormorant Garamond/i);
  });

  it("maps editorial, functional and technical text to distinct roles", () => {
    const variants = ["display", "h1", "h2", "h3", "body", "mono", "eyebrow"];
    render(createElement("div", null, variants.map((variant) => createElement(
      Text,
      { variant, key: variant, "data-testid": variant },
      variant,
    ))));

    for (const variant of ["display", "h1", "h2"]) {
      expect(screen.getByTestId(variant)).toHaveStyle({ fontFamily: "var(--font-serif)" });
    }
    for (const variant of ["h3", "body"]) {
      expect(screen.getByTestId(variant)).toHaveStyle({ fontFamily: "var(--font-sans)" });
    }
    for (const variant of ["mono", "eyebrow"]) {
      expect(screen.getByTestId(variant)).toHaveStyle({ fontFamily: "var(--font-mono)" });
    }
  });

  it("defines the approved light and dark semantic palette", () => {
    const colors = read("design-system/tokens/colors.css");
    const light = cssBlock(colors, ":root");
    const dark = cssBlock(colors, '[data-theme="dark"]');

    expect({
      page: cssVariable(light, "paper"),
      surface: cssVariable(light, "silk"),
      border: cssVariable(light, "mist"),
      secondary: cssVariable(light, "stone"),
      ink: cssVariable(light, "ink"),
      accent: cssVariable(light, "vermilion"),
      accentHover: cssVariable(light, "vermilion-dark"),
      onAccent: cssVariable(light, "on-accent"),
    }).toEqual({
      page: "#FFFFFF",
      surface: "#F3F2EE",
      border: "#DEDCD6",
      secondary: "#5F5B56",
      ink: "#1F1C1B",
      accent: "#C74624",
      accentHover: "#A93618",
      onAccent: "#FFFFFF",
    });

    expect({
      page: cssVariable(dark, "paper"),
      surface: cssVariable(dark, "silk"),
      secondary: cssVariable(dark, "stone"),
      ink: cssVariable(dark, "ink"),
      accent: cssVariable(dark, "vermilion"),
      onAccent: cssVariable(dark, "on-accent"),
    }).toEqual({
      page: "#0F0F0E",
      surface: "#191817",
      secondary: "#B9B4AC",
      ink: "#F8F6F1",
      accent: "#FF7A52",
      onAccent: "#1F1C1B",
    });
  });

  it("keeps every normal-text palette combination at WCAG AA contrast", () => {
    const combinations = [
      ["#1F1C1B", "#FFFFFF"],
      ["#5F5B56", "#FFFFFF"],
      ["#FFFFFF", "#C74624"],
      ["#F8F6F1", "#0F0F0E"],
      ["#1F1C1B", "#FF7A52"],
    ];

    for (const [foreground, background] of combinations) {
      expect(contrastRatio(foreground, background)).toBeGreaterThanOrEqual(4.5);
    }
  });

  it("keeps the global grid quiet and section rhythm token-driven", () => {
    const globalStyles = read("src/app/globals.css");
    expect(globalStyles).toContain("--grid-dot: color-mix(in srgb, var(--ink) 2%, transparent)");
    expect(globalStyles).toMatch(/\.container\s*\{[\s\S]*?max-width:\s*var\(--max-content\)/);
    expect(globalStyles).toMatch(/\.section,\s*\n\.section--standard\s*\{\s*padding-block:\s*var\(--section-standard\)/);
    expect(globalStyles).toMatch(/\.section--emphasis\s*\{\s*padding-block:\s*var\(--section-emphasis\)/);
  });
});
