import { CloseXS } from "@hitachivantara/uikit-react-icons";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { HvAdornment } from "@core/components";

describe("Adornment", () => {
  it("should render the passed icon", () => {
    render(
      <HvAdornment icon={<CloseXS role="img" aria-label="close icon" />} />
    );
    expect(screen.getByRole("img", { name: "close icon" })).toBeInTheDocument();
  });

  it("should render a button if a 'onClick' is passed", async () => {
    const mockFn = vi.fn();
    render(<HvAdornment icon={<CloseXS />} onClick={mockFn} />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();

    await userEvent.click(button);
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
