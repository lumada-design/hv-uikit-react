import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HvGlobalActions } from "./GlobalActions";

describe("GlobalActions", () => {
  it("should render the header with the correct title and heading level", () => {
    const headingLevel = 3;

    const { container, getByText } = render(
      <HvGlobalActions title="mockTitle" headingLevel={headingLevel} />
    );

    expect(getByText("mockTitle")).toBeInTheDocument();
    expect(container.querySelector(`h${headingLevel}`)).toBeDefined();
  });

  it("should render the back button", () => {
    const backButton = <div>mockBackButton</div>;

    const { getByText } = render(<HvGlobalActions backButton={backButton} />);

    expect(getByText("mockBackButton")).toBeInTheDocument();
  });
});
