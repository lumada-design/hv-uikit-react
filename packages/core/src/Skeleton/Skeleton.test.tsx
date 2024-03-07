import { render, screen } from "@testing-library/react";

import { HvSkeleton } from "./Skeleton";

describe("Skeleton", () => {
  it("doesn't show the Skeleton element if it's hidden", () => {
    render(<HvSkeleton data-testid="skeleton" hidden />);
    expect(screen.queryByTestId("skeleton")).not.toBeInTheDocument();
  });

  it("has the appropriate role when provided", () => {
    render(<HvSkeleton role="progressbar" aria-label="Loading" />);
    expect(
      screen.getByRole("progressbar", { name: "Loading" })
    ).toBeInTheDocument();
  });
});
