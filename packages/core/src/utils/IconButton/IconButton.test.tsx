import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import { IconButton } from "./IconButton";

const title = "My tooltip button";

const assertTooltipWhenHovered = async () => {
  const user = userEvent.setup();
  const button = screen.getByRole("button", { name: title });
  expect(button).toBeInTheDocument();

  await user.hover(button);
  await waitFor(() => {
    const tooltip = screen.getByRole("tooltip");
    expect(tooltip).toBeInTheDocument();
  });
};

describe("IconButton", () => {
  it("button should be clickable and tooltip should appear when button is hovered", async () => {
    const user = userEvent.setup();
    const buttonSpy = vi.fn();
    render(<IconButton title={title} onClick={buttonSpy} />);

    const button = screen.getByRole("button", { name: title });

    await user.click(button);
    expect(buttonSpy).toHaveBeenCalledTimes(1);

    await user.keyboard("{enter}");
    expect(buttonSpy).toHaveBeenCalledTimes(2);

    assertTooltipWhenHovered();
  });

  it("disabled button should not be clickable and tooltip should appear when button is hovered", async () => {
    const user = userEvent.setup();
    const buttonSpy = vi.fn();
    render(<IconButton disabled title={title} onClick={buttonSpy} />);

    const button = screen.getByRole("button", { name: title });

    await user.click(button);
    expect(buttonSpy).not.toHaveBeenCalled();

    await user.keyboard("{enter}");
    expect(buttonSpy).not.toHaveBeenCalled();

    assertTooltipWhenHovered();
  });
});
