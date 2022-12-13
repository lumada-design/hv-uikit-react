import { Lock, Unlock } from "@hitachivantara/uikit-icons";
import { act, render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ToggleButton } from "./ToggleButton";

describe("ToggleButton", () => {
  it("should be defined", () => {
    const { container } = render(<ToggleButton />);
    expect(container).toBeDefined();
  });

  it("should render correctly", () => {
    const { container } = render(<ToggleButton />);
    expect(container).toMatchSnapshot();
  });

  it("should render the unselected icon", () => {
    const { queryByTestId } = render(
      <ToggleButton
        aria-label="Lock"
        notSelectedIcon={<Unlock data-testid="logo-unlock" />}
        selectedIcon={<Lock data-testid="logo-lock" />}
      />
    );
    expect(queryByTestId("logo-unlock")).toBeInTheDocument();
    expect(queryByTestId("logo-lock")).not.toBeInTheDocument();
  });

  it("should call onClick", () => {
    const onClickMock = vi.fn(() => "mock");

    const { getByRole } = render(
      <ToggleButton
        aria-label="Lock"
        notSelectedIcon={<Unlock data-testid="logo-unlock" />}
        selectedIcon={<Lock data-testid="logo-lock" />}
        onClick={onClickMock}
      />
    );
    const btn = getByRole("button");
    act(() => btn.click());
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
