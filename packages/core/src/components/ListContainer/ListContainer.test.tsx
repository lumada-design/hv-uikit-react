import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HvListItem } from "components";
import { HvListContainer } from "./ListContainer";

describe("ListContainer", () => {
  it("should be defined", () => {
    const { container } = render(<HvListContainer />);
    expect(container).toBeDefined();
  });

  it("should render correctly", () => {
    const { container } = render(<HvListContainer />);
    expect(container).toMatchSnapshot();
  });

  it("should render all the items", () => {
    const { container, getAllByRole } = render(
      <HvListContainer>
        <HvListItem role="option">Item 1</HvListItem>
        <HvListItem role="option">Item 2</HvListItem>
        <HvListItem role="option">Item 3</HvListItem>
      </HvListContainer>
    );
    expect(getAllByRole("option")).toHaveLength(3);
    expect(container).toMatchSnapshot();
  });
});
