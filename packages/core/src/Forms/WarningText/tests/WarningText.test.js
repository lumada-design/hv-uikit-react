/* eslint-env jest */

import React from "react";
import { render, screen } from "@testing-library/react";

import { HvProvider, HvWarningText } from "../../..";

const TEXT = "text-content";

const setup = (props) =>
  render(
    <HvProvider cssBaseline="none">
      <HvWarningText {...props}>{TEXT}</HvWarningText>
    </HvProvider>
  );

describe("HelperText", () => {
  it("doesn't render component when not visible", () => {
    setup({ isVisible: false });
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    expect(screen.queryByText(TEXT)).not.toBeInTheDocument();
  });

  it("renders component and value when visible", () => {
    setup({ isVisible: true });
    const component = screen.getByRole("status");
    const content = screen.getByText(TEXT);
    expect(component).toBeVisible();
    expect(content).toBeVisible();
  });

  it("renders custom adornment", () => {
    setup({ isVisible: true, adornment: "FAKE-ICON" });
    expect(screen.getByText("FAKE-ICON")).toBeVisible();
  });
});
