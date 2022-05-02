/* eslint-env jest */
import React from "react";

import { render } from "testing-utils";
import { HvStack } from "../..";

// eslint-disable-next-line react/prop-types
const Stack = ({ divider }) => (
  <HvStack divider={divider}>
    <div data-testid="child">1</div>
    <div data-testid="child">2</div>
    <div data-testid="child">3</div>
  </HvStack>
);

describe("<Stack />", () => {
  it("should be defined", () => {
    const { container } = render(<Stack />);
    expect(container).toMatchSnapshot();
  });

  it("should match snapshot", () => {
    const { container } = render(<Stack />);
    expect(container).toMatchSnapshot();
  });

  it("should include all children", () => {
    const { queryAllByTestId, getByText } = render(<Stack />);
    expect(queryAllByTestId("child")).toHaveLength(3);
    expect(getByText("1")).toBeInTheDocument();
    expect(getByText("2")).toBeInTheDocument();
    expect(getByText("3")).toBeInTheDocument();
  });

  it("should include the dividers", () => {
    const { queryAllByTestId, queryAllByRole } = render(<Stack divider />);
    expect(queryAllByTestId("child")).toHaveLength(3);
    expect(queryAllByRole("separator").length).toBe(2);
  });
});
