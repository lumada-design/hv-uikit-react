import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { HvLoading } from "./Loading";

describe("Loading", () => {
  const mockLabel = "mockLabel";

  it("should render correctly", () => {
    const { container } = render(<HvLoading label={mockLabel} />);
    expect(container).toBeDefined();
  });

  it("should cont§§in the correct the label", () => {
    const { getByText } = render(<HvLoading label={mockLabel} />);
    expect(getByText(mockLabel)).toBeInTheDocument();
  });

  it("should be hidden if set to hidden", () => {
    const { container } = render(<HvLoading label={mockLabel} hidden />);
    expect(
      (container.firstChild as HTMLElement).classList.contains("hidden")
    ).toBe(true);
  });

  it("should be small if set to small", () => {
    const { container } = render(<HvLoading label={mockLabel} small />);
    expect(container.querySelectorAll("[class*=small]").length).toBe(3);
  });
});
