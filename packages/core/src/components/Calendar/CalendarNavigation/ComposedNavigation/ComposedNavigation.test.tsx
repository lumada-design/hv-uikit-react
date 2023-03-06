import { render } from "@testing-library/react";
import { describe } from "vitest";
import { HvComposedNavigation } from "./ComposedNavigation";

describe("<Navigation />", () => {
  it("should render correctly", () => {
    const { container } = render(
      <HvComposedNavigation
        locale="en"
        visibleYear={2020}
        visibleMonth={4}
        onViewModeChange={() => {}}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
