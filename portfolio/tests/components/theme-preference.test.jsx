import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Providers } from "@/context/AppContext";
import { ThemePicker } from "@/components/site/ThemePicker";

vi.mock("next/navigation", () => ({ usePathname: () => "/", useRouter: () => ({ push: vi.fn() }) }));
let media;
beforeEach(() => {
  localStorage.clear();
  const listeners = new Set();
  media = { matches: false, addEventListener: (_, callback) => listeners.add(callback), removeEventListener: (_, callback) => listeners.delete(callback), change(value) { this.matches = value; listeners.forEach(callback => callback({ matches: value })); } };
  vi.stubGlobal("matchMedia", () => media);
});
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });
function mount() { return render(<Providers><ThemePicker /></Providers>); }

describe("appearance preference", () => {
  it("keeps an explicit choice across remounts and ignores system changes", async () => {
    const first = mount();
    fireEvent.click(screen.getByRole("radio", { name: "Dark", hidden: true }));
    await waitFor(() => expect(document.documentElement).toHaveAttribute("data-theme", "dark"));
    expect(localStorage.getItem("theme")).toBe("dark");
    first.unmount();
    mount();
    await waitFor(() => expect(screen.getByRole("radio", { name: "Dark", hidden: true })).toBeChecked());
    act(() => media.change(false));
    expect(document.documentElement).toHaveAttribute("data-theme", "dark");
  });
  it("follows live system changes and returns focus when dismissed with Escape", async () => {
    mount();
    act(() => media.change(true));
    await waitFor(() => expect(document.documentElement).toHaveAttribute("data-theme", "dark"));
    const trigger = screen.getByText("System", { selector: "span" }).closest("details").querySelector("summary");
    trigger.closest("details").open = true;
    fireEvent.keyDown(trigger, { key: "Escape" });
    expect(trigger.closest("details")).not.toHaveAttribute("open");
    expect(trigger).toHaveFocus();
    fireEvent.click(screen.getByRole("radio", { name: "Light", hidden: true }));
    fireEvent.click(screen.getByRole("radio", { name: "System", hidden: true }));
    await waitFor(() => expect(document.documentElement).toHaveAttribute("data-theme", "dark"));
    expect(localStorage.getItem("theme")).toBe("system");
    act(() => media.change(false));
    await waitFor(() => expect(document.documentElement).toHaveAttribute("data-theme", "light"));
  });
});
