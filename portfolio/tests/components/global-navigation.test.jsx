import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button, ProjectCard, Status, Tag } from "@/components/ds";
import { navigationFor } from "@/lib/siteNavigation";

describe("shared v2 components", () => {
  it("renders an accessible link action and honest non-interactive project state", () => {
    render(
      <>
        <Button href="/work">Work</Button>
        <ProjectCard
          title="Cases in review"
          role="Product design"
          status="Selection pending"
          upcoming
        />
      </>,
    );

    const action = screen.getByRole("link", { name: "Work" });
    expect(action).toBeVisible();
    expect(action).toHaveStyle({ minHeight: "44px", borderRadius: "var(--radius-sm)" });
    expect(screen.queryByRole("link", { name: /Cases in review/ })).not.toBeInTheDocument();
    expect(screen.getByText("Selection pending")).toBeVisible();
  });

  it("keeps explicit status text", () => {
    render(
      <>
        <Tag>Building now</Tag>
        <Status>In progress</Status>
      </>,
    );
    expect(screen.getByText("Building now")).toBeVisible();
    expect(screen.getByText("In progress")).toBeVisible();
  });
});

describe("global navigation data", () => {
  it("keeps English and French destinations shareable", () => {
    expect(navigationFor("en").map(({ href }) => href)).toEqual([
      "/work",
      "/labs",
      "/about",
      "/#contact",
    ]);
    expect(navigationFor("fr").map(({ href }) => href)).toEqual([
      "/fr/work",
      "/fr/labs",
      "/fr/about",
      "/fr#contact",
    ]);
  });
});
