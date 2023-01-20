import { CloseXS } from "@hitachivantara/uikit-icons";
import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { HvAdornment } from "components";

describe("Adornment", () => {
  it("should be defined", () => {
    const { container } = render(<HvAdornment icon={<CloseXS />} />);
    expect(container).toBeDefined();
  });

  it("should render correctly", () => {
    const { container } = render(<HvAdornment icon={<CloseXS />} />);
    expect(container).toMatchSnapshot();
  });

  it("should render a button if a 'onClick' is passed", () => {
    const mockFn = vi.fn();
    const { getByRole } = render(
      <HvAdornment icon={<CloseXS />} onClick={mockFn} />
    );
    expect(getByRole("button")).toBeInTheDocument();
  });
});
