import { render, screen } from "@testing-library/react";

import { Map } from "@hitachivantara/uikit-react-icons";

import { HvInput } from ".";

describe("Input", () => {
  it("renders the input element", () => {
    render(<HvInput />);

    const input = screen.getByRole("textbox");

    expect(input).toBeVisible();
    expect(input).toBeEnabled();
  });

  it("renders the disabled input element", () => {
    render(<HvInput disabled />);

    const input = screen.getByRole("textbox");

    expect(input).toBeVisible();
    expect(input).toBeDisabled();
  });

  it("renders the custom icon", () => {
    render(<HvInput endAdornment={<Map role="presentation" />} />);

    expect(screen.getByRole("presentation")).toBeVisible();
  });
});
