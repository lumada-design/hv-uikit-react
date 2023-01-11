import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HvTabs } from "components";
import { Main } from "./Tabs.stories";

describe("Tabs", () => {
  it("should render correctly", () => {
    const { container } = render(<HvTabs />);

    expect(container).toMatchSnapshot();
  });

  it("should render correctly all components", () => {
    const { container } = render(<Main />);

    expect(container).toMatchSnapshot();
  });
});
