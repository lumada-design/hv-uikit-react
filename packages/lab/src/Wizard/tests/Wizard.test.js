/* eslint-env jest */

import React from "react";
import { render, fireEvent, screen } from "testing-utils";
import { HvWizard } from "../..";

describe("Wizard", () => {
  it("renders the component as expected", () => {
    jest.spyOn(console, "error").mockImplementation();
    const mockOnClose = jest.fn();
    render(
      <HvWizard open onClose={mockOnClose} handleSubmit={jest.fn()} title="Mock Wizard">
        <div>First Component</div>
        <div>Second Component</div>
        <div>Third Component</div>
      </HvWizard>
    );

    const container = screen.getByText("Mock Wizard");
    expect(container).toBeInTheDocument();
    expect(screen.getByText("First Component")).toBeInTheDocument();
    expect(screen.queryByText("Second Component")).not.toBeInTheDocument();

    const cancelBtn = screen.getByRole("button", { name: "Cancel" });
    fireEvent.click(cancelBtn);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("should move across the pages when clicking the wizard actions", () => {
    jest.spyOn(console, "error").mockImplementation();
    const mockOnClose = jest.fn();
    const mockHandleSubmit = jest.fn();
    render(
      <HvWizard open onClose={mockOnClose} handleSubmit={mockHandleSubmit} title="Mock Wizard">
        <div>First Component</div>
        <div>Second Component</div>
        <div>Third Component</div>
      </HvWizard>
    );

    expect(screen.getByRole("button", { name: "Previous" })).toBeDisabled();
    expect(screen.getByText("First Component")).toBeInTheDocument();
    expect(screen.queryByText("Second Component")).not.toBeInTheDocument();

    const nextBtn = screen.getByRole("button", { name: "Next" });
    fireEvent.click(nextBtn);

    expect(screen.getByRole("button", { name: "Previous" })).toBeEnabled();
    expect(screen.queryByText("First Component")).not.toBeInTheDocument();
    expect(screen.getByText("Second Component")).toBeInTheDocument();

    fireEvent.click(nextBtn);

    expect(screen.queryByRole("button", { name: "Next" })).not.toBeInTheDocument();
    expect(screen.queryByText("First Component")).not.toBeInTheDocument();
    expect(screen.queryByText("Second Component")).not.toBeInTheDocument();
    expect(screen.getByText("Third Component")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();

    const previousBtn = screen.getByRole("button", { name: "Previous" });
    fireEvent.click(previousBtn);

    expect(screen.getByRole("button", { name: "Next" })).toBeInTheDocument();
    expect(screen.queryByText("First Component")).not.toBeInTheDocument();
    expect(screen.getByText("Second Component")).toBeInTheDocument();
    expect(screen.queryByText("Third Component")).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Submit" })).not.toBeInTheDocument();

    fireEvent.click(nextBtn);

    const submitBtn = screen.getByRole("button", { name: "Submit" });
    fireEvent.click(submitBtn);
    expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
  });
});
