import { render, fireEvent, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { HvDialog } from "./Dialog";
import { HvDialogActions, HvDialogContent, HvDialogTitle } from "./index";

describe("Dialog", () => {
  it("should render all components correctly", () => {
    render(
      <HvDialog open>
        <HvDialogTitle>mockTitle</HvDialogTitle>
        <HvDialogContent>mockContent</HvDialogContent>
        <HvDialogActions>mockActions</HvDialogActions>
      </HvDialog>
    );
    expect(screen.getByText("mockTitle")).toBeInTheDocument();
    expect(screen.getByText("mockContent")).toBeInTheDocument();
    expect(screen.getByText("mockActions")).toBeInTheDocument();
  });

  it("should call the onClose function when the close button is clicked", () => {
    const mockFn = vi.fn();
    const mockBtnTitle = "closeBtn";

    const { getByRole } = render(
      <HvDialog open onClose={mockFn} buttonTitle={mockBtnTitle} />
    );
    const btn = getByRole("button", { name: mockBtnTitle });
    fireEvent.click(btn);
    expect(mockFn).toHaveBeenCalled();
  });
});
