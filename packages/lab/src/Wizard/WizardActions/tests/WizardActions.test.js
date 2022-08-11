import { fireEvent } from "@testing-library/react";
import React from "react";
import { render, screen } from "testing-utils";
import { HvWizardActions, HvWizardContext } from "../..";

describe("WizardActions", () => {
  it("should render the actions correctly", () => {
    const { rerender } = render(
      <HvWizardContext.Provider
        // eslint-disable-next-line react/jsx-no-constructed-context-values
        value={{ context: { 0: { valid: true }, 1: { valid: false } }, setContext: jest.fn() }}
      >
        <HvWizardActions
          tab={0}
          changeTab={jest.fn()}
          handleClose={jest.fn()}
          onSubmit={jest.fn()}
        />
      </HvWizardContext.Provider>
    );

    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Skip" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Previous" })).toBeDisabled();
    expect(screen.getByText("Next")).toBeInTheDocument();
    expect(screen.queryByText("Submit")).not.toBeInTheDocument();

    rerender(
      <HvWizardContext.Provider
        // eslint-disable-next-line react/jsx-no-constructed-context-values
        value={{ context: { 0: { valid: true }, 1: { valid: false } }, setContext: jest.fn() }}
      >
        <HvWizardActions
          tab={1}
          changeTab={jest.fn()}
          handleClose={jest.fn()}
          onSubmit={jest.fn()}
        />
      </HvWizardContext.Provider>
    );

    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Skip" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Previous" })).toBeEnabled();
    expect(screen.queryByRole("button", { name: "Next" })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
  });

  it("should go to the correct tab when clicking the buttons", () => {
    const mockOnClose = jest.fn();
    const mockChangeTab = jest.fn();
    const mockOnSubmit = jest.fn();
    const { rerender } = render(
      <HvWizardContext.Provider
        // eslint-disable-next-line react/jsx-no-constructed-context-values
        value={{ context: { 0: { valid: true }, 1: { valid: false } }, setContext: jest.fn() }}
      >
        <HvWizardActions
          tab={0}
          changeTab={mockChangeTab}
          handleClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      </HvWizardContext.Provider>
    );

    expect(screen.getByRole("button", { name: "Previous" })).toBeDisabled();

    const cancelBtn = screen.getByRole("button", { name: "Cancel" });
    fireEvent.click(cancelBtn);
    expect(mockOnClose).toHaveBeenCalledTimes(1);

    const nextBtn = screen.getByRole("button", { name: "Next" });
    fireEvent.click(nextBtn);
    expect(mockChangeTab).toHaveBeenCalledTimes(1);

    rerender(
      <HvWizardContext.Provider
        // eslint-disable-next-line react/jsx-no-constructed-context-values
        value={{ context: { 0: { valid: true }, 1: { valid: true } }, setContext: jest.fn() }}
      >
        <HvWizardActions
          tab={1}
          changeTab={mockChangeTab}
          handleClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      </HvWizardContext.Provider>
    );

    expect(screen.getByRole("button", { name: "Previous" })).toBeEnabled();
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();

    const submitBtn = screen.getByRole("button", { name: "Submit" });
    fireEvent.click(submitBtn);
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });

  it("should have the skip button enabled", () => {
    const mockChangeTab = jest.fn();
    const labels = {
      skip: "Go To Last",
      previous: "Return",
    };
    const { rerender } = render(
      <HvWizardContext.Provider
        // eslint-disable-next-line react/jsx-no-constructed-context-values
        value={{ context: { 0: { valid: true }, 1: { valid: false } }, setContext: jest.fn() }}
      >
        <HvWizardActions
          tab={0}
          skippable
          changeTab={mockChangeTab}
          handleClose={jest.fn()}
          onSubmit={jest.fn()}
          labels={labels}
        />
      </HvWizardContext.Provider>
    );

    const skipBtn = screen.getByRole("button", { name: labels.skip });
    fireEvent.click(skipBtn);
    expect(mockChangeTab).toHaveBeenCalledTimes(1);

    rerender(
      <HvWizardContext.Provider
        // eslint-disable-next-line react/jsx-no-constructed-context-values
        value={{ context: { 0: { valid: true }, 1: { valid: false } }, setContext: jest.fn() }}
      >
        <HvWizardActions
          tab={1}
          skippable
          changeTab={mockChangeTab}
          handleClose={jest.fn()}
          onSubmit={jest.fn()}
          labels={labels}
        />
      </HvWizardContext.Provider>
    );

    const previosuBtn = screen.getByRole("button", { name: labels.previous });
    fireEvent.click(previosuBtn);
    expect(mockChangeTab).toHaveBeenCalledTimes(2);
  });
});
