import React from "react";
import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
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
