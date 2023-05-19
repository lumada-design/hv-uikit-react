import userEvent from "@testing-library/user-event";
import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HvProvider } from "@core/providers";
import { HvBaseDropdown } from "./BaseDropdown";

const Main = () => (
  <HvProvider>
    <div style={{ width: 121 }}>
      <HvBaseDropdown placeholder="Placeholder..." aria-label="Main sample" />
    </div>
  </HvProvider>
);

describe("BaseDropDown", () => {
  it("should be defined", () => {
    const { container } = render(<Main />);

    expect(container).toBeDefined();
  });

  it("should render correctly", () => {
    const { container } = render(<Main />);

    expect(container).toMatchSnapshot();
  });

  it("should open on click", async () => {
    const { getByRole } = render(<Main />);

    const baseDropdownHeader = getByRole("combobox");

    expect(baseDropdownHeader).toHaveAttribute("aria-expanded", "false");

    // Open
    await userEvent.click(baseDropdownHeader);

    expect(baseDropdownHeader).toHaveAttribute("aria-expanded", "true");
  });

  it("should close on double click", async () => {
    const { getByRole } = render(<Main />);

    const baseDropdownHeader = getByRole("combobox");

    expect(baseDropdownHeader).toHaveAttribute("aria-expanded", "false");

    // Open
    await userEvent.click(baseDropdownHeader);

    // Close
    await userEvent.click(baseDropdownHeader);

    expect(baseDropdownHeader).toHaveAttribute("aria-expanded", "false");
  });

  it("should open on Enter", async () => {
    const { getByRole } = render(<Main />);

    const baseDropdownHeader = getByRole("combobox");

    expect(baseDropdownHeader).toHaveAttribute("aria-expanded", "false");

    // Open
    fireEvent.keyDown(baseDropdownHeader, { key: "Enter", keyCode: 13 });

    expect(baseDropdownHeader).toHaveAttribute("aria-expanded", "true");
  });

  it("should close on double Enter", async () => {
    const { getByRole } = render(<Main />);

    const baseDropdownHeader = getByRole("combobox");

    expect(baseDropdownHeader).toHaveAttribute("aria-expanded", "false");

    // Open
    fireEvent.keyDown(baseDropdownHeader, { key: "Enter", keyCode: 13 });

    // Close
    fireEvent.keyDown(baseDropdownHeader, { key: "Enter", keyCode: 13 });

    expect(baseDropdownHeader).toHaveAttribute("aria-expanded", "false");
  });

  it("should open on Space", async () => {
    const { getByRole } = render(<Main />);

    const baseDropdownHeader = getByRole("combobox");

    expect(baseDropdownHeader).toHaveAttribute("aria-expanded", "false");

    // Open
    fireEvent.keyDown(baseDropdownHeader, { key: " ", keyCode: 32 });

    expect(baseDropdownHeader).toHaveAttribute("aria-expanded", "true");
  });

  it("should close on double Space", async () => {
    const { getByRole } = render(<Main />);

    const baseDropdownHeader = getByRole("combobox");

    expect(baseDropdownHeader).toHaveAttribute("aria-expanded", "false");

    // Open
    fireEvent.keyDown(baseDropdownHeader, { key: " ", keyCode: 32 });

    // Close
    fireEvent.keyDown(baseDropdownHeader, { key: " ", keyCode: 32 });

    expect(baseDropdownHeader).toHaveAttribute("aria-expanded", "false");
  });

  it("should open and close mixing mouse click, Enter, and Space", async () => {
    const { getByRole } = render(<Main />);

    const baseDropdownHeader = getByRole("combobox");

    expect(baseDropdownHeader).toHaveAttribute("aria-expanded", "false");

    // Open
    await userEvent.click(baseDropdownHeader);

    expect(baseDropdownHeader).toHaveAttribute("aria-expanded", "true");

    // Close
    fireEvent.keyDown(baseDropdownHeader, { key: "Enter", keyCode: 13 });

    expect(baseDropdownHeader).toHaveAttribute("aria-expanded", "false");

    // Open
    fireEvent.keyDown(baseDropdownHeader, { key: " ", keyCode: 32 });

    expect(baseDropdownHeader).toHaveAttribute("aria-expanded", "true");

    // Close
    await userEvent.click(baseDropdownHeader);

    expect(baseDropdownHeader).toHaveAttribute("aria-expanded", "false");
  });
});
