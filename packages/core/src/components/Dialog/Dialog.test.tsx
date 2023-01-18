import { render, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { HvDialog } from "./Dialog";
import { HvDialogActions, HvDialogContent, HvDialogTitle } from "./index";

describe("Dialog", () => {
  it("should be defined", () => {
    const { container } = render(<HvDialog open />);
    expect(container).toBeDefined();
  });

  it("should render correctly", () => {
    const { container } = render(<HvDialog open />);
    expect(container).toMatchSnapshot();
  });

  it("should render all components correctly", () => {
    const { container, getByText } = render(
      <HvDialog open>
        <HvDialogTitle>mockTitle</HvDialogTitle>
        <HvDialogContent>mockContent</HvDialogContent>
        <HvDialogActions>mockActions</HvDialogActions>
      </HvDialog>
    );
    expect(getByText("mockTitle")).toBeInTheDocument();
    expect(getByText("mockContent")).toBeInTheDocument();
    expect(getByText("mockActions")).toBeInTheDocument();
    expect(container).toMatchSnapshot();
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
