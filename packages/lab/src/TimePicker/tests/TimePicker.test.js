import React from "react";

import { render } from "testing-utils";
import userEvent from "@testing-library/user-event";

import { Main, CustomDefault } from "../stories/TimePicker.stories";
import HvTimePicker from "../TimePicker";

describe("Timepicker", () => {
  describe("snapshot tests", () => {
    it("Main", () => {
      const { container } = render(<CustomDefault />);
      expect(container).toMatchSnapshot();
    });
  });

  describe("timepicker functionality tests", () => {
    it("renders time in placeholder in 12H format component as expected", () => {
      const { getAllByRole } = render(
        <HvTimePicker hours={14} minutes={35} seconds={45} period="AM" timeFormat={12} />
      );

      const inputs = getAllByRole("textbox");
      const [timepickerInput] = inputs;

      expect(timepickerInput).toBeInTheDocument();
    });

    it("Opens timepicker when dropdown button is clicked", () => {
      const { getByRole, getAllByRole } = render(<Main />);

      const timepickerDropdown = getByRole("combobox");
      expect(timepickerDropdown).toBeInTheDocument();
      expect(timepickerDropdown).toHaveAttribute("aria-expanded", "false");
      userEvent.click(timepickerDropdown); // try to open
      expect(timepickerDropdown).toHaveAttribute("aria-expanded", "true");

      const [pickerTooltip] = getAllByRole("tooltip");
      expect(pickerTooltip).toBeInTheDocument();
    });
  });
});
