import { render, screen } from "@testing-library/react";
import { describe } from "vitest";

import { HvComposedNavigation } from "./ComposedNavigation";

describe("<Navigation />", () => {
  it("should render year and month", () => {
    render(
      <HvComposedNavigation
        locale="en"
        visibleYear={2020}
        visibleMonth={4}
        onViewModeChange={() => {}}
      />
    );
    expect(screen.getByText("2020")).toBeInTheDocument();
    expect(screen.getByText("April")).toBeInTheDocument();
  });
});
