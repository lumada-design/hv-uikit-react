import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { HvSelect, HvSelectProps } from "./Select";
import { HvOption } from "./Option";
import { HvOptionGroup } from "./OptionGroup";

const name = "MySelect";

const getSelect = () => screen.getByRole("combobox", { name });

const setup = (props?: HvSelectProps<string, false>) =>
  render(
    <HvSelect name="options" label={name} {...props}>
      <HvOption value="opt1">Option1</HvOption>
      <HvOption value="opt2">Option2</HvOption>
      <HvOption value="opt3">Option3</HvOption>
    </HvSelect>
  );

describe("Select", () => {
  it("renders the select element", () => {
    setup();

    expect(getSelect()).toBeInTheDocument();
  });

  it("shows the options on open", async () => {
    const mockOpen = vi.fn();
    setup({ onOpenChange: mockOpen });

    await userEvent.click(getSelect());

    expect(screen.getByRole("listbox")).toBeInTheDocument();
    expect(screen.getAllByRole("option").length).toBe(3);
    expect(mockOpen).toHaveBeenCalledTimes(1);
  });

  it("selects the option", async () => {
    const mockChange = vi.fn();
    setup({ onChange: mockChange });

    await userEvent.click(getSelect());
    await userEvent.click(screen.getByRole("option", { name: "Option2" }));

    expect(mockChange).toHaveBeenCalledWith(expect.anything(), "opt2");
    expect(getSelect()).toHaveTextContent("Option2");
  });

  it("renders pre-selected values", () => {
    render(
      <HvSelect label={name} multiple defaultValue={["opt1", "opt2"]}>
        <HvOption value="opt1">Option1</HvOption>
        <HvOption value="opt2">Option2</HvOption>
        <HvOption value="opt3">Option3</HvOption>
      </HvSelect>
    );

    expect(getSelect()).toHaveTextContent("Option1, Option2");
  });

  it("renders correctly with groups and multiple section", async () => {
    render(
      <HvSelect multiple label={name}>
        <HvOptionGroup label="Group1">
          <HvOption value="opt1">Option1</HvOption>
          <HvOption value="opt2">Option2</HvOption>
          <HvOption value="opt3">Option3</HvOption>
        </HvOptionGroup>
        <HvOptionGroup label="Group2">
          <HvOption value="opt4">Option4</HvOption>
          <HvOption value="opt5">Option5</HvOption>
        </HvOptionGroup>
      </HvSelect>
    );

    await userEvent.click(getSelect());
    const listbox = screen.getByRole("listbox");
    expect(listbox).toBeInTheDocument();
    expect(listbox).toHaveAttribute("aria-multiselectable", "true");
    expect(screen.getAllByRole("list").length).toBe(2);
    expect(screen.getAllByRole("option").length).toBe(5);

    await userEvent.click(screen.getByRole("option", { name: "Option2" }));
    await userEvent.click(screen.getByRole("option", { name: "Option4" }));

    expect(getSelect()).toHaveTextContent("Option2, Option4");
  });
});
