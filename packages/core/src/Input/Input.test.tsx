import { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Map } from "@hitachivantara/uikit-react-icons";

import { HvInput, HvInputProps } from ".";

const Suggestions = ({ ...others }: Partial<HvInputProps>) => {
  const [value, setValue] = useState("");

  const suggestionHandler: HvInputProps["suggestionListCallback"] = (
    val: string,
  ) => {
    if (!val && value) return null; // cleared
    return [{ id: "value", label: "value" }]; // all other cases
  };

  return (
    <HvInput
      label="Select a country"
      value={value}
      onChange={(event, val) => setValue(val)}
      suggestionListCallback={suggestionHandler}
      {...others}
    />
  );
};

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
    const adornment = screen.getByLabelText("Search"); // role can't be used since the parent has aria-hidden
    expect(adornment).toHaveAttribute("aria-disabled", "true");
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
    const adornment = screen.getByLabelText("Reveal password"); // roles can't be used since the parent has aria-hidden
    expect(adornment).toHaveAttribute("aria-disabled", "true");
  });

  it("does not trigger the suggestions on focus by default", async () => {
    const user = userEvent.setup();
    render(<Suggestions />);

    const input = screen.getByRole("textbox", {
      name: "Select a country",
    });
    await user.click(input);
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("triggers the suggestions on focus when suggestOnFocus is true", async () => {
    const user = userEvent.setup();
    render(<Suggestions suggestOnFocus />);

    const input = screen.getByRole("textbox", {
      name: "Select a country",
    });
    await user.click(input);
    expect(screen.getByRole("tooltip")).toBeInTheDocument();
  });
});
