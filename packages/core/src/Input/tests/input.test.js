/* eslint-env jest */

import React from "react";
import { render, screen } from "@testing-library/react";

import { Map } from "@hitachivantara/uikit-react-icons";
import { HvInput, HvProvider } from "../..";

const labels = {
  inputLabel: "inputLabel",
  placeholder: "placeholder",
  infoText: "infoText",
  warningText: "warningText",
  maxCharQuantityWarningText: "maxCharQuantityWarningText",
  minCharQuantityWarningText: "minCharQuantityWarningText",
  requiredWarningText: "requiredWarningText",
};

describe("Input", () => {
  it("renders the input element", () => {
    render(
      <HvProvider cssBaseline="none">
        <HvInput />
      </HvProvider>
    );

    const input = screen.getByRole("textbox");

    expect(input).toBeVisible();
    expect(input).toBeEnabled();
  });

  it("renders the disabled input element", () => {
    render(
      <HvProvider cssBaseline="none">
        <HvInput disabled />
      </HvProvider>
    );

    const input = screen.getByRole("textbox");

    expect(input).toBeVisible();
    expect(input).toBeDisabled();
  });

  it("renders the custom icon", () => {
    render(
      <HvProvider cssBaseline="none">
        <HvInput labels={labels} endAdornment={<Map role="presentation" />} />
      </HvProvider>
    );

    expect(screen.getByRole("presentation")).toBeVisible();
  });
});
