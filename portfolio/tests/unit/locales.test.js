import { describe, expect, it } from "vitest";
import { isLocalizedHub, languageFromPath, localizedPath } from "@/lib/locales";

describe("locale routes", () => {
  it.each([
    ["/", "en"],
    ["/work", "en"],
    ["/fr", "fr"],
    ["/fr/about", "fr"],
  ])("derives %s", (path, lang) => expect(languageFromPath(path)).toBe(lang));

  it.each([
    ["/", "fr", "/fr"],
    ["/#contact", "fr", "/fr#contact"],
    ["/fr/about", "en", "/about"],
    ["/work", "fr", "/fr/work"],
    ["/work/access-restored", "fr", "/work/access-restored"],
  ])("maps %s to %s", (path, lang, expected) => {
    expect(localizedPath(path, lang)).toBe(expected);
  });

  it("localizes only the non-case hubs", () => {
    expect(isLocalizedHub("/labs")).toBe(true);
    expect(isLocalizedHub("/fr/work")).toBe(true);
    expect(isLocalizedHub("/work/access-restored")).toBe(false);
  });
});
