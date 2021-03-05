import React from "react";
import { render, fireEvent, waitFor } from "testing-utils";
import userEvent from "@testing-library/user-event";
import { Main } from "../stories/BaseDropdown.stories.test";

describe("BaseDropDown", () => {
  describe("Selection List Snapshot testing", () => {
    it("Selection List Container", () => {
      const { container } = render(<Main />);
      expect(container).toMatchSnapshot();
    });
  });

  it("opens on click", async () => {
    const { getByRole } = render(<Main />);

    const baseDropdownHeader = getByRole("combobox");
    expect(baseDropdownHeader).toHaveAttribute("aria-expanded", "false");

    userEvent.click(baseDropdownHeader); // open

    await waitFor(() => {
      expect(baseDropdownHeader).toHaveAttribute("aria-expanded", "true");
    });
  });

  it("closes on double click", async () => {
    const { getByRole } = render(<Main />);

    const baseDropdownHeader = getByRole("combobox");
    expect(baseDropdownHeader).toHaveAttribute("aria-expanded", "false");

    userEvent.click(baseDropdownHeader); // open
    userEvent.click(baseDropdownHeader); // close

    await waitFor(() => {
      expect(baseDropdownHeader).toHaveAttribute("aria-expanded", "false");
    });
  });

  it("opens on Enter", async () => {
    const { getByRole } = render(<Main />);

    const baseDropdownHeader = getByRole("combobox");
    expect(baseDropdownHeader).toHaveAttribute("aria-expanded", "false");

    fireEvent.keyDown(baseDropdownHeader, { key: "Enter", keyCode: 13 });
    await waitFor(() => {
      expect(baseDropdownHeader).toHaveAttribute("aria-expanded", "true");
    });
  });

  it("closes on double Enter", async () => {
    const { getByRole } = render(<Main />);

    const baseDropdownHeader = getByRole("combobox");
    expect(baseDropdownHeader).toHaveAttribute("aria-expanded", "false");

    fireEvent.keyDown(baseDropdownHeader, { key: "Enter", keyCode: 13 });
    fireEvent.keyDown(baseDropdownHeader, { key: "Enter", keyCode: 13 });

    await waitFor(() => {
      expect(baseDropdownHeader).toHaveAttribute("aria-expanded", "false");
    });
  });

  it("opens on Space", async () => {
    const { getByRole } = render(<Main />);

    const baseDropdownHeader = getByRole("combobox");
    expect(baseDropdownHeader).toHaveAttribute("aria-expanded", "false");

    fireEvent.keyDown(baseDropdownHeader, { key: " ", keyCode: 32 });

    await waitFor(() => {
      expect(baseDropdownHeader).toHaveAttribute("aria-expanded", "true");
    });
  });

  it("closes on double Space", async () => {
    const { getByRole } = render(<Main />);

    const baseDropdownHeader = getByRole("combobox");
    expect(baseDropdownHeader).toHaveAttribute("aria-expanded", "false");

    fireEvent.keyDown(baseDropdownHeader, { key: " ", keyCode: 32 });
    fireEvent.keyDown(baseDropdownHeader, { key: " ", keyCode: 32 });

    await waitFor(() => {
      expect(baseDropdownHeader).toHaveAttribute("aria-expanded", "false");
    });
  });

  it("opens and closes mixing mouse click, Enter, and Space", async () => {
    const { getByRole } = render(<Main />);

    const baseDropdownHeader = getByRole("combobox");
    expect(baseDropdownHeader).toHaveAttribute("aria-expanded", "false");

    userEvent.click(baseDropdownHeader); // open
    await waitFor(() => {
      expect(baseDropdownHeader).toHaveAttribute("aria-expanded", "true");
    });

    fireEvent.keyDown(baseDropdownHeader, { key: "Enter", keyCode: 13 }); // close
    await waitFor(() => {
      expect(baseDropdownHeader).toHaveAttribute("aria-expanded", "false");
    });

    fireEvent.keyDown(baseDropdownHeader, { key: " ", keyCode: 32 }); // open
    await waitFor(() => {
      expect(baseDropdownHeader).toHaveAttribute("aria-expanded", "true");
    });

    userEvent.click(baseDropdownHeader); // open
    await waitFor(() => {
      expect(baseDropdownHeader).toHaveAttribute("aria-expanded", "false");
    });
  });
});
