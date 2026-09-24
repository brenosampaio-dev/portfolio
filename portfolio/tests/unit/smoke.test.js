import { describe, expect, it } from "vitest";
import { getT } from "@/lib/i18n";

describe("translation baseline", () => {
  it("keeps supported dictionaries available", () => {
    expect(getT("en").nav.work).toBeTruthy();
    expect(getT("fr").nav.work).toBeTruthy();
    expect(getT("unknown")).toBe(getT("en"));
  });
});
