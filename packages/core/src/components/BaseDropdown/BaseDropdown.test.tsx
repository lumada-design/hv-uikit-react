import userEvent from "@testing-library/user-event";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HvBaseDropdown } from "./BaseDropdown";

const Main = () => (
  <div style={{ width: 121 }}>
    <HvBaseDropdown placeholder="Placeholder..." aria-label="Main sample" />
  </div>
);

describe("BaseDropDown", () => {
  it("should open on click", async () => {
    render(<Main />);

    const baseDropdownHeader = screen.getByRole("combobox");

    expect(baseDropdownHeader).toHaveAttribute("aria-expanded", "false");

    // Open
    await userEvent.click(baseDropdownHeader);

    expect(baseDropdownHeader).toHaveAttribute("aria-expanded", "true");
  });

  it("should close on double click", async () => {
    render(<Main />);

    const baseDropdownHeader = screen.getByRole("combobox");

    expect(baseDropdownHeader).toHaveAttribute("aria-expanded", "false");

    // Open
    await userEvent.click(baseDropdownHeader);

    // Close
    await userEvent.click(baseDropdownHeader);

    expect(baseDropdownHeader).toHaveAttribute("aria-expanded", "false");
  });

  it("should open on Enter", async () => {
    render(<Main />);

    const baseDropdownHeader = screen.getByRole("combobox");

    expect(baseDropdownHeader).toHaveAttribute("aria-expanded", "false");

    // Open
    fireEvent.keyDown(baseDropdownHeader, { key: "Enter", keyCode: 13 });

    expect(baseDropdownHeader).toHaveAttribute("aria-expanded", "true");
  });

  it("should close on double Enter", async () => {
    render(<Main />);

    const baseDropdownHeader = screen.getByRole("combobox");

    expect(baseDropdownHeader).toHaveAttribute("aria-expanded", "false");

    // Open
    fireEvent.keyDown(baseDropdownHeader, { key: "Enter", keyCode: 13 });

    // Close
    fireEvent.keyDown(baseDropdownHeader, { key: "Enter", keyCode: 13 });

    expect(baseDropdownHeader).toHaveAttribute("aria-expanded", "false");
  });

  it("should open on Space", async () => {
    render(<Main />);

    const baseDropdownHeader = screen.getByRole("combobox");

    expect(baseDropdownHeader).toHaveAttribute("aria-expanded", "false");

    // Open
    fireEvent.keyDown(baseDropdownHeader, { key: " ", keyCode: 32 });

    expect(baseDropdownHeader).toHaveAttribute("aria-expanded", "true");
  });

  it("should close on double Space", async () => {
    render(<Main />);

    const baseDropdownHeader = screen.getByRole("combobox");

    expect(baseDropdownHeader).toHaveAttribute("aria-expanded", "false");

    // Open
    fireEvent.keyDown(baseDropdownHeader, { key: " ", keyCode: 32 });

    // Close
    fireEvent.keyDown(baseDropdownHeader, { key: " ", keyCode: 32 });

    expect(baseDropdownHeader).toHaveAttribute("aria-expanded", "false");
  });

  it("should open and close mixing mouse click, Enter, and Space", async () => {
    render(<Main />);

    const baseDropdownHeader = screen.getByRole("combobox");

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
