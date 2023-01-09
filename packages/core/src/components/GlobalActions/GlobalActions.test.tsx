import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { GlobalActions } from "./GlobalActions";

describe("GlobalActions", () => {
  it("should be defined", () => {
    const { container } = render(<GlobalActions />);
    expect(container).toBeDefined();
  });

  it("should render correctly", () => {
    const { container } = render(<GlobalActions />);
    expect(container).toMatchSnapshot();
  });

  it("should render the header with the correct title and heading level", () => {
    const headingLevel = 3;

    const { container, getByText } = render(
      <GlobalActions title="mockTitle" headingLevel={headingLevel} />
    );

    expect(getByText("mockTitle")).toBeInTheDocument();
    expect(container.querySelector(`h${headingLevel}`)).toBeDefined();
  });

  it("should render the back button", () => {
    const backButton = <div>mockBackButton</div>;

    const { getByText } = render(<GlobalActions backButton={backButton} />);

    expect(getByText("mockBackButton")).toBeInTheDocument();
  });
});
