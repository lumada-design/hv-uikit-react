import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { HvDropdown } from "./Dropdown";

describe("Dropdown", () => {
  it("should open dropdown on click", async () => {
    render(
      <HvDropdown
        aria-label="Main sample"
        multiSelect
        showSearch
        values={[
          { label: "value 1" },
          { label: "value 2", selected: true },
          { label: "value 3" },
          { label: "value 4" },
        ]}
      />
    );

    const dropdown = screen.getByRole("combobox");

    expect(dropdown).toHaveAttribute("aria-expanded", "false");

    await userEvent.click(dropdown);

    expect(dropdown).toHaveAttribute("aria-expanded", "true");
  });

  it("should be disabled", async () => {
    const { container, getByRole } = render(
      <div style={{ width: 310 }}>
        <HvDropdown
          aria-label="Main sample"
          multiSelect
          showSearch
          disabled
          values={[
            { label: "value 1" },
            { label: "value 2", selected: true },
            { label: "value 3" },
            { label: "value 4" },
          ]}
        />
      </div>
    );
    expect(
      container.getElementsByClassName("HvBaseDropdown-rootDisabled")
    ).toHaveLength(1);

    const DropdownHeader = getByRole("combobox");

    expect(DropdownHeader).toHaveAttribute("aria-expanded", "false");

    expect(DropdownHeader).toHaveAttribute("aria-expanded", "false");
  });

  it("should be invalid", async () => {
    const { getByRole } = render(
      <div style={{ width: 310 }}>
        <HvDropdown
          aria-label="Main sample"
          multiSelect
          showSearch
          status="invalid"
          values={[
            { label: "value 1" },
            { label: "value 2", selected: true },
            { label: "value 3" },
            { label: "value 4" },
          ]}
        />
      </div>
    );

    const DropdownHeader = getByRole("combobox");

    expect(DropdownHeader).toHaveAttribute("aria-invalid", "true");
  });

  it("should select one", async () => {
    const { getByRole, getAllByRole } = render(
      <div style={{ width: 310 }}>
        <HvDropdown
          aria-label="Main sample"
          multiSelect
          showSearch
          values={[
            { label: "value 1" },
            { label: "value 2" },
            { label: "value 3" },
            { label: "value 4" },
          ]}
        />
      </div>
    );

    const DropdownHeader = getByRole("combobox");

    expect(DropdownHeader).toHaveAttribute("aria-expanded", "false");

    await userEvent.click(DropdownHeader);

    expect(DropdownHeader).toHaveAttribute("aria-expanded", "true");

    const options = getAllByRole("option");

    expect(options).toHaveLength(4);

    expect(options[0]).toHaveAttribute("aria-selected", "false");

    await userEvent.click(options[0]);

    expect(options[0]).toHaveAttribute("aria-selected", "true");
  });

  it("read Only", async () => {
    const { getByRole } = render(
      <div style={{ width: 310 }}>
        <HvDropdown
          aria-label="Main sample"
          multiSelect
          showSearch
          readOnly
          values={[
            { label: "value 1" },
            { label: "value 2" },
            { label: "value 3" },
            { label: "value 4" },
          ]}
        />
      </div>
    );

    const DropdownHeader = getByRole("combobox");

    expect(DropdownHeader).toHaveAttribute("aria-expanded", "false");

    await userEvent.click(DropdownHeader);

    expect(DropdownHeader).toHaveAttribute("aria-expanded", "false");
  });
});
