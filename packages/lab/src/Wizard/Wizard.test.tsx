import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { HvWizard } from "./Wizard";

describe("HvWizard", () => {
  const mockOnClose = vi.fn();
  const mockOnSubmit = vi.fn();

  it("renders the component as expected", () => {
    const { getByText, queryByText, getByRole } = render(
      <HvWizard
        open
        handleSubmit={mockOnSubmit}
        onClose={mockOnClose}
        title="Mock Wizard"
      >
        <div>First Component</div>
        <div>Second Component</div>
        <div>Third Component</div>
      </HvWizard>,
    );

    const container = getByText("Mock Wizard");
    expect(container).toBeInTheDocument();
    expect(getByText("First Component")).toBeInTheDocument();
    expect(queryByText("Second Component")).not.toBeInTheDocument();

    const cancelBtn = getByRole("button", { name: "Cancel" });
    fireEvent.click(cancelBtn);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("should move across the pages when clicking the wizard actions", () => {
    const { getByText, queryByText, getByRole, queryByRole } = render(
      <HvWizard
        open
        handleSubmit={mockOnSubmit}
        onClose={mockOnClose}
        title="Mock Wizard"
      >
        <div>First Component</div>
        <div>Second Component</div>
        <div>Third Component</div>
      </HvWizard>,
    );

    expect(getByRole("button", { name: "Previous" })).toBeDisabled();
    expect(getByText("First Component")).toBeInTheDocument();
    expect(queryByText("Second Component")).not.toBeInTheDocument();

    const nextBtn = getByRole("button", { name: "Next" });
    fireEvent.click(nextBtn);

    expect(getByRole("button", { name: "Previous" })).toBeEnabled();
    expect(queryByText("First Component")).not.toBeInTheDocument();
    expect(getByText("Second Component")).toBeInTheDocument();

    fireEvent.click(nextBtn);

    expect(queryByRole("button", { name: "Next" })).not.toBeInTheDocument();
    expect(queryByText("First Component")).not.toBeInTheDocument();
    expect(queryByText("Second Component")).not.toBeInTheDocument();
    expect(getByText("Third Component")).toBeInTheDocument();
    expect(getByRole("button", { name: "Submit" })).toBeInTheDocument();

    const previousBtn = getByRole("button", { name: "Previous" });
    fireEvent.click(previousBtn);

    expect(getByRole("button", { name: "Next" })).toBeInTheDocument();
    expect(queryByText("First Component")).not.toBeInTheDocument();
    expect(getByText("Second Component")).toBeInTheDocument();
    expect(queryByText("Third Component")).not.toBeInTheDocument();
    expect(queryByRole("button", { name: "Submit" })).not.toBeInTheDocument();

    fireEvent.click(nextBtn);

    const submitBtn = getByRole("button", { name: "Submit" });
    fireEvent.click(submitBtn);
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });
});
