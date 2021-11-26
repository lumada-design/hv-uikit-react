/* eslint-env jest */

import React from "react";

import userEvent from "@testing-library/user-event";

import { render } from "testing-utils";
import { HvDatePicker } from "../..";
import { makeUTCDate } from "../../Calendar/utils";
import { Main } from "../stories/Datepicker.stories";

describe("HvDatepicker", () => {
  jest.setTimeout(30000);
  describe("sample snapshot testing", () => {
    it("Main", () => {
      const { container } = render(<Main />);
      expect(container).toMatchSnapshot();
    });
  });

  describe("with minimum configuration", () => {
    it("should render correctly", () => {
      const { container } = render(<HvDatePicker />);
      expect(container).toMatchSnapshot();
    });
    it("should not be open", () => {
      const { queryAllByRole, queryAllByText, getByRole } = render(<HvDatePicker />);
      const calendarButtons = queryAllByRole("button");
      const firstDayOfTheMonth = queryAllByText("1");
      const datePickerDropdown = getByRole("combobox");

      expect(datePickerDropdown).toBeInTheDocument();
      expect(calendarButtons.length).toBe(0);
      expect(firstDayOfTheMonth.length).toBe(0);
    });
    it("should render a calendar component", async () => {
      const { queryAllByRole, queryAllByText, getByRole, findAllByRole, findAllByText } = render(
        <HvDatePicker />
      );
      let calendarButtons = queryAllByRole("button");
      let firstDayOfTheMonth = queryAllByText("1");
      const datePickerDropdown = getByRole("combobox");

      expect(datePickerDropdown).toBeInTheDocument();
      expect(calendarButtons.length).toBe(0);
      expect(firstDayOfTheMonth.length).toBe(0);

      userEvent.click(datePickerDropdown);

      calendarButtons = await findAllByRole("button");
      firstDayOfTheMonth = await findAllByText("1");
      expect(calendarButtons.length).toBe(42);
      expect(firstDayOfTheMonth.length).toBe(2);
    });
  });

  describe("single calendar", () => {
    it("should render correctly", () => {
      const { container } = render(
        <HvDatePicker value={makeUTCDate(2019, 0, 1, 12)} locale="en-US" />
      );
      expect(container).toMatchSnapshot();
    });
    it("should have a value and not be open", () => {
      const { queryAllByRole, queryAllByText, getByRole, getByText, queryByDisplayValue } = render(
        <HvDatePicker value={makeUTCDate(2019, 0, 1, 12)} locale="en-US" />
      );
      const calendarButtons = queryAllByRole("button");
      const firstDayOfTheMonth = queryAllByText("1");
      const datePickerDropdown = getByRole("combobox");
      const datepickerDropdownValue = getByText("1 Jan 2019");
      const dateInput = queryByDisplayValue("1 Jan 2019");

      expect(datePickerDropdown).toBeInTheDocument();
      expect(datepickerDropdownValue).toBeInTheDocument();
      expect(dateInput).not.toBeInTheDocument();
      expect(calendarButtons.length).toBe(0);
      expect(firstDayOfTheMonth.length).toBe(0);
    });
    it("should render a calendar component with a value", async () => {
      const {
        queryAllByRole,
        queryAllByText,
        getByRole,
        findAllByRole,
        findAllByText,
        getByText,
        queryByDisplayValue,
        findByDisplayValue,
      } = render(<HvDatePicker value={makeUTCDate(2019, 0, 1, 12)} locale="en-US" />);
      let calendarButtons = queryAllByRole("button");
      let firstDayOfTheMonth = queryAllByText("1");
      const datePickerDropdown = getByRole("combobox");
      let datepickerDropdownValue = getByText("1 Jan 2019");
      let dateInput = queryByDisplayValue("1 Jan 2019");

      expect(datePickerDropdown).toBeInTheDocument();
      expect(datepickerDropdownValue).toBeInTheDocument();
      expect(dateInput).not.toBeInTheDocument();
      expect(calendarButtons.length).toBe(0);
      expect(firstDayOfTheMonth.length).toBe(0);

      userEvent.click(datePickerDropdown);

      calendarButtons = await findAllByRole("button");
      firstDayOfTheMonth = await findAllByText("1");
      datepickerDropdownValue = await findAllByText("1 Jan 2019");
      dateInput = await findByDisplayValue("1 Jan 2019");
      expect(calendarButtons.length).toBe(42);
      expect(firstDayOfTheMonth.length).toBe(2);
      expect(datepickerDropdownValue.length).toBe(1);
      expect(dateInput).toBeInTheDocument();
    });
  });

  describe("ranged calendar", () => {
    it("should render correctly", () => {
      const { container } = render(
        <HvDatePicker
          rangeMode
          locale="en-US"
          startValue={new Date(2019, 0, 5, 12)}
          endValue={new Date(2019, 0, 10, 12)}
        />
      );
      expect(container).toMatchSnapshot();
    });
    it("should have a value and not be open", () => {
      const { queryAllByRole, queryAllByText, getByRole, getByText, queryByDisplayValue } = render(
        <HvDatePicker
          rangeMode
          locale="en-US"
          startValue={new Date(2019, 0, 5, 12)}
          endValue={new Date(2019, 0, 10, 12)}
        />
      );
      const calendarButtons = queryAllByRole("button");
      const firstDayOfTheMonth = queryAllByText("1");
      const datePickerDropdown = getByRole("combobox");
      const datepickerDropdownValue = getByText("5 - 10 Jan 2019");
      const dateInputLeft = queryByDisplayValue("5 Jan 2019");
      const dateInputRight = queryByDisplayValue("10 Jan 2019");

      expect(datePickerDropdown).toBeInTheDocument();
      expect(datepickerDropdownValue).toBeInTheDocument();
      expect(dateInputLeft).not.toBeInTheDocument();
      expect(dateInputRight).not.toBeInTheDocument();
      expect(calendarButtons.length).toBe(0);
      expect(firstDayOfTheMonth.length).toBe(0);
    });
    it("should render a calendar component with a value", async () => {
      const {
        queryAllByRole,
        queryAllByText,
        getByRole,
        findAllByRole,
        findAllByText,
        getByText,
        queryByDisplayValue,
        findByDisplayValue,
      } = render(
        <HvDatePicker
          rangeMode
          locale="en-US"
          startValue={new Date(2019, 0, 5, 12)}
          endValue={new Date(2019, 0, 10, 12)}
        />
      );
      let calendarButtons = queryAllByRole("button");
      let firstDayOfTheMonth = queryAllByText("1");
      const datePickerDropdown = getByRole("combobox");
      let datepickerDropdownValue = getByText("5 - 10 Jan 2019");
      let dateInputLeft = queryByDisplayValue("5 Jan 2019");
      let dateInputRight = queryByDisplayValue("10 Jan 2019");

      expect(datePickerDropdown).toBeInTheDocument();
      expect(datepickerDropdownValue).toBeInTheDocument();
      expect(dateInputLeft).not.toBeInTheDocument();
      expect(dateInputRight).not.toBeInTheDocument();
      expect(calendarButtons.length).toBe(0);
      expect(firstDayOfTheMonth.length).toBe(0);

      userEvent.click(datePickerDropdown);

      calendarButtons = await findAllByRole("button");
      firstDayOfTheMonth = await findAllByText("1");
      datepickerDropdownValue = await findAllByText("5 - 10 Jan 2019");
      dateInputLeft = await findByDisplayValue("5 Jan 2019");
      dateInputRight = await findByDisplayValue("10 Jan 2019");
      expect(calendarButtons.length).toBe(86);
      expect(firstDayOfTheMonth.length).toBe(4);
      expect(datepickerDropdownValue.length).toBe(1);
      expect(dateInputLeft).toBeInTheDocument();
      expect(dateInputRight).toBeInTheDocument();
    });
  });

  describe("calendar custom properties", () => {
    const labels = {
      applyLabel: "OK",
      cancelLabel: "GO BACK",
      title: "TESTING LABEL",
      placeholder: "I'M THE PLACEHOLDER",
    };

    it("should render correctly", () => {
      const { container } = render(
        <HvDatePicker
          locale="en-US"
          labels={labels}
          placeholder={labels.placeholder}
          horizontalPlacement="left"
          showActions
          id="testingDatePicker"
        />
      );
      expect(container).toMatchSnapshot();
    });
    it("should have a value and not be open", () => {
      const {
        queryAllByRole,
        queryAllByText,
        getByRole,
        getByText,
        queryByDisplayValue,
        queryByText,
      } = render(
        <HvDatePicker
          locale="en-US"
          labels={labels}
          placeholder={labels.placeholder}
          horizontalPlacement="left"
          showActions
          id="testingDatePicker"
        />
      );
      const calendarButtons = queryAllByRole("button");
      const firstDayOfTheMonth = queryAllByText("1");
      const datePickerDropdown = getByRole("combobox");
      const datepickerPlaceholder = getByText(labels.placeholder);
      const dateInput = queryByDisplayValue("MM/DD/YYYY");
      const applyButton = queryByText(labels.applyLabel);
      const cancelButton = queryByText(labels.cancelLabel);

      expect(datePickerDropdown).toBeInTheDocument();
      expect(dateInput).not.toBeInTheDocument();
      expect(applyButton).not.toBeInTheDocument();
      expect(cancelButton).not.toBeInTheDocument();
      expect(datepickerPlaceholder).toBeInTheDocument();
      expect(calendarButtons.length).toBe(0);
      expect(firstDayOfTheMonth.length).toBe(0);
    });
    it("should render a calendar component with a value", async () => {
      const {
        queryAllByRole,
        queryAllByText,
        queryByText,
        getByRole,
        findAllByRole,
        findAllByText,
        findByText,
        getByText,
        queryByDisplayValue,
        findByPlaceholderText,
      } = render(
        <HvDatePicker
          locale="en-US"
          labels={labels}
          placeholder={labels.placeholder}
          horizontalPlacement="left"
          showActions
          id="testingDatePicker"
        />
      );
      let calendarButtons = queryAllByRole("button");
      let firstDayOfTheMonth = queryAllByText("1");
      const datePickerDropdown = getByRole("combobox");
      const datepickerPlaceholder = getByText(labels.placeholder);
      let dateInput = queryByDisplayValue("MM/DD/YYYY");
      let applyButton = queryByText(labels.applyLabel);
      let cancelButton = queryByText(labels.cancelLabel);

      expect(datePickerDropdown).toBeInTheDocument();
      expect(dateInput).not.toBeInTheDocument();
      expect(applyButton).not.toBeInTheDocument();
      expect(cancelButton).not.toBeInTheDocument();
      expect(datepickerPlaceholder).toBeInTheDocument();
      expect(calendarButtons.length).toBe(0);
      expect(firstDayOfTheMonth.length).toBe(0);

      userEvent.click(datePickerDropdown);

      calendarButtons = await findAllByRole("button");
      firstDayOfTheMonth = await findAllByText("1");
      dateInput = await findByPlaceholderText("MM/DD/YYYY");
      applyButton = await findByText(labels.applyLabel);
      cancelButton = await findByText(labels.cancelLabel);
      expect(calendarButtons.length).toBe(44);
      expect(firstDayOfTheMonth.length).toBe(2);
      expect(dateInput).toBeInTheDocument();
      expect(applyButton).toBeInTheDocument();
      expect(cancelButton).toBeInTheDocument();
    });
  });
});
