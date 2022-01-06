/* eslint-env jest */

import React from "react";

import { render } from "testing-utils";

import { HvInlineEditor } from "../..";

describe("InlineEditor", () => {
  it("renders the component as expected", () => {
    const value = "VALUE123";
    const { getByText } = render(<HvInlineEditor defaultValue={value} />);

    const container = getByText(value);

    expect(container).toBeInTheDocument();
    expect(container).toBeVisible();
  });
});
