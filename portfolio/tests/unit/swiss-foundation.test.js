import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createElement } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Text } from "@/components/ds/Text";

const pathFor = (file) => resolve(process.cwd(), file);
const read = (file) => readFileSync(pathFor(file), "utf8");

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
});
