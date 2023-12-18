import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Lock, Unlock } from "@hitachivantara/uikit-react-icons";

import { HvToggleButton } from "./ToggleButton";

describe("ToggleButton", () => {
  it("should render the unselected icon", () => {
    render(
      <HvToggleButton
        aria-label="Lock"
        notSelectedIcon={<Unlock data-testid="logo-unlock" />}
        selectedIcon={<Lock data-testid="logo-lock" />}
      />
    );
    expect(screen.queryByTestId("logo-unlock")).toBeInTheDocument();
    expect(screen.queryByTestId("logo-lock")).not.toBeInTheDocument();
  });

  it("should call onClick", async () => {
    const onClickMock = vi.fn(() => "mock");

    render(
      <HvToggleButton
        aria-label="Lock"
        notSelectedIcon={<Unlock data-testid="logo-unlock" />}
        selectedIcon={<Lock data-testid="logo-lock" />}
        onClick={onClickMock}
      />
    );
    const btn = screen.getByRole("button");
    await userEvent.click(btn);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
