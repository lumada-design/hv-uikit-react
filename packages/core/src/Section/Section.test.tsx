import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { HvButton } from "../Button";
import { HvSection } from "./Section";

describe("Section", () => {
  it("should contain all the steps", () => {
    render(<HvSection title="Section Title" />);
    expect(screen.getByText("Section Title")).toBeInTheDocument();
  });

  it("should render the content when it's not expandable", () => {
    render(
      <HvSection title="Section Title" expanded>
        <div>Child Content</div>
      </HvSection>,
    );
    expect(screen.getByText("Child Content")).toBeInTheDocument();
  });

  it("should render the content when it's expandable and is expanded by default", () => {
    render(
      <HvSection title="Section Title" expandable defaultExpanded>
        <div>Child Content</div>
      </HvSection>,
    );
    expect(screen.queryByText("Child Content")).toBeInTheDocument();
  });

  it("should not render the content when it's expandable and is not expanded by default", () => {
    render(
      <HvSection title="Section Title" expandable defaultExpanded={false}>
        <div>Child Content</div>
      </HvSection>,
    );
    expect(screen.queryByText("Child Content")).not.toBeVisible();
  });

  it("should toggle the expanded state when the expand button is clicked", async () => {
    render(
      <HvSection title="Section Title" expandable defaultExpanded={false}>
        <div>Child Content</div>
      </HvSection>,
    );

    expect(screen.queryByText("Child Content")).not.toBeVisible();

    const expandButton = screen.getByRole("button");
    fireEvent.click(expandButton);

    expect(screen.queryByText("Child Content")).toBeVisible();

    fireEvent.click(expandButton);

    expect(screen.queryByText("Child Content")).not.toBeVisible();
  });

  it("should render the actions prop", () => {
    const actions = <HvButton>Action 1</HvButton>;
    render(<HvSection title="Section Title" actions={actions} />);

    expect(screen.getByText("Action 1")).toBeInTheDocument();
  });
});
