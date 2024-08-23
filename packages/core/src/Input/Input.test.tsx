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

  it("renders the adornment as disabled for the search when the input is disabled", () => {
    render(
      <HvInput
        disabled
        type="search"
        label="My input"
        placeholder="Type something..."
        onEnter={() => {}}
      />,
    );

    expect(screen.getByRole("searchbox")).toBeDisabled();
    expect(screen.getByLabelText("Search")).toBeDisabled(); // role can't be used since the parent has aria-hidden
  });

  it("renders the adornment as disabled for the password when the input is disabled", () => {
    render(
      <HvInput
        disabled
        type="password"
        label="My input"
        placeholder="Type something..."
        onEnter={() => {}}
      />,
    );

    expect(screen.getByLabelText("My input")).toBeDisabled(); // can't find by role searchbox since password inputs don't have a role...
    expect(screen.getByLabelText("Reveal password")).toBeDisabled(); // role can't be used since the parent has aria-hidden
  });
});
