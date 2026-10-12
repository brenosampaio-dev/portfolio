import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { RelayPrototype } from "@/components/relay/RelayPrototype";
import { RELAY_ROLES, relaySyntheticCases } from "@/lib/relayPrototype";

afterEach(cleanup);

describe("RelayPrototype exception index", () => {
  it("renders a semantic queue with an explicit synthetic-data disclosure", () => {
    render(<RelayPrototype />);

    expect(screen.getByRole("heading", { level: 2, name: "Exception index" })).toBeVisible();
    expect(screen.getByText(/all records in this prototype are synthetic/i)).toBeVisible();

    const table = screen.getByRole("table", { name: "Order exceptions" });
    expect(within(table).getAllByRole("columnheader").map((cell) => cell.textContent)).toEqual([
      "Exception",
      "Route",
      "Owner",
      "Evidence",
      "SLA",
      "State",
    ]);
    expect(within(table).getAllByRole("row")).toHaveLength(relaySyntheticCases.length + 1);
    expect(screen.getByText("Overdue by 3h")).toBeVisible();
    expect(screen.getAllByText("Open").length).toBeGreaterThan(0);
  });

  it("filters through a labelled saved view without hiding the result count", () => {
    render(<RelayPrototype />);

    fireEvent.change(screen.getByRole("combobox", { name: "Saved view" }), {
      target: { value: "blocked" },
    });

    expect(screen.getByText("1 exception")).toBeVisible();
    expect(screen.getByRole("button", { name: /refund proposal exceeds specialist authority/i })).toBeVisible();
    expect(screen.queryByRole("button", { name: /delivery promise passed/i })).not.toBeInTheDocument();
  });

  it("opens a focused dossier from the queue with keyboard input", () => {
    render(<RelayPrototype />);
    const target = screen.getByRole("button", { name: /replacement shipment needs a confirmed owner/i });

    target.focus();
    fireEvent.keyDown(target, { key: "Enter" });

    expect(screen.getByRole("heading", { level: 3, name: /replacement shipment needs a confirmed owner/i })).toBeVisible();
    expect(screen.getByRole("region", { name: "Selected exception" })).toHaveAttribute("aria-live", "polite");
  });

  it.each([
    ["loading", "Loading exceptions"],
    ["empty", "No exceptions match this view"],
    ["error", "Exceptions could not be loaded"],
  ])("renders the %s system state in text", (initialState, expectedText) => {
    render(<RelayPrototype initialState={initialState} />);
    expect(screen.getByText(expectedText)).toBeVisible();
  });

  it("supports French labels and a manager role without changing the data disclosure", () => {
    render(<RelayPrototype lang="fr" initialRole={RELAY_ROLES.manager} />);

    expect(screen.getByRole("heading", { name: "Index des exceptions" })).toBeVisible();
    expect(screen.getByText(/tous les dossiers de ce prototype sont synthétiques/i)).toBeVisible();
    expect(screen.getByRole("columnheader", { name: "Responsable" })).toBeVisible();
    expect(screen.getByText("En retard de 3 h")).toBeVisible();
  });

  it("keeps the page container shrinkable for the 360px review target", () => {
    render(<RelayPrototype />);
    expect(screen.getByTestId("relay-prototype")).toHaveStyle({ minWidth: "0" });
  });
});
