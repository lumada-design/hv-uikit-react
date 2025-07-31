import { render, screen } from "@testing-library/react";

import { HvLoading } from "./Loading";

describe("Loading", () => {
  const mockLabel = "mockLabel";

  it("should contain the correct the label", () => {
    render(<HvLoading label={mockLabel} />);
    expect(screen.getByText(mockLabel)).toBeInTheDocument();
  });

  it("should be hidden if set to hidden", () => {
    render(<HvLoading data-testid="loading" label={mockLabel} hidden />);
    expect(screen.queryByTestId("loading")).not.toBeVisible();
  });

  it("should be small if set to small", () => {
    const { container } = render(<HvLoading label={mockLabel} small />);
    expect(container.querySelector("[data-size=small]")).toBeInTheDocument();
  });
});
