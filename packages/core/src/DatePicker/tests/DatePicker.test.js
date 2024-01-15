import React from "react";
import { mount } from "enzyme";

import { Calendar as CalendarIcon } from "@hitachivantara/uikit-react-icons";
import HvProvider from "../../Provider";
import Typography from "../../Typography";

import { convertISOStringDateToDate, getFormattedDate } from "../Calendar/utils";

import Actions from "../Actions";
import Calendar from "../Calendar";

import DatePicker from "../index";

describe("<DatePicker /> with minimum configuration", () => {
  let wrapper;
  let DatePickerComponent;
  let DatePickerInstance;

  beforeEach(async () => {
    wrapper = mount(
      <HvProvider>
        <DatePicker />
      </HvProvider>
    );
    DatePickerComponent = wrapper.find("HvDatePicker");
    DatePickerInstance = DatePickerComponent.instance();
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper.find(DatePicker)).toMatchSnapshot();
  });

  it("should not render an actions component", () => {
    expect(DatePickerComponent.find(Actions).length).toBe(0);
  });

  it("should not render any Calendar component", () => {
    expect(wrapper.find(Calendar).length).toBe(0);
  });

  it("should have an empty value on the input", () => {
    expect(DatePickerComponent.find("input").instance().value).toBe("");
  });

  it("should have the state property `calendarOpen` set to `false`", () => {
    expect(DatePickerInstance.state.calendarOpen).toBe(false);
  });

  it("should have the state property `selectedDate` as `null`", () => {
    expect(DatePickerInstance.state.selectedDate).toBe(null);
  });

  it("should add change the state property `calendarOpen` to `true` when clicking on the calendar icon", () => {
    DatePickerComponent.find(CalendarIcon).simulate("click");
    expect(DatePickerInstance.state.calendarOpen).toBe(true);
  });

  it("should add a <Calendar /> component to the container when clicking on the calendar icon", () => {
    DatePickerComponent.find(CalendarIcon).simulate("click");
    expect(wrapper.find(Calendar).length).toBe(1);
  });

  it("should open the calendar when clicking the calendar icon", () => {
    wrapper.find(CalendarIcon).simulate("click");

    expect(wrapper.find(Calendar).length).toBe(1);
  });

  it("should not show an Actions component when opening the calendar", () => {
    wrapper.find(CalendarIcon).simulate("click");

    expect(wrapper.find(Actions).length).toBe(0);
  });
});

describe("<DatePicker /> with Single Calendar mode", () => {
  let wrapper;
  let DatePickerComponent;
  let DatePickerInstance;

  beforeEach(async () => {
    wrapper = mount(
      <HvProvider>
        <DatePicker rangeMode={false} value="2019-01-01" locale="en-US" />
      </HvProvider>
    );
    DatePickerComponent = wrapper.find("HvDatePicker");
    DatePickerInstance = DatePickerComponent.instance();
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper.find(DatePicker)).toMatchSnapshot();
  });

  it("should not render any Calendar component", () => {
    expect(wrapper.find(Calendar).length).toBe(0);
  });

  it("should have the value showing on the input with the correct format", () => {
    expect(DatePickerComponent.find("input").instance().value).toBe(
      getFormattedDate(convertISOStringDateToDate("2019-01-01"), DatePickerInstance.props.locale)
    );
  });

  it("should have the property `rangeMode` set to `false`", () => {
    expect(DatePickerInstance.props.rangeMode).toBe(false);
  });

  it("should have the state property `selectedDate` defined with the correct value", () => {
    expect(DatePickerInstance.state.selectedDate).toEqual(convertISOStringDateToDate("2019-01-01"));
  });

  it("should open the calendar when clicking the calendar icon", () => {
    wrapper.find(CalendarIcon).simulate("click");

    expect(wrapper.find(Calendar).length).toBe(1);
  });

  it("should not show an Actions component when opening the calendar", () => {
    wrapper.find(CalendarIcon).simulate("click");

    expect(wrapper.find(Actions).length).toBe(0);
  });

  it("should close the calendar when selecting a date on the calendar", () => {
    const dummyDateString = "2018-11-10";
    const dummyDate = convertISOStringDateToDate(dummyDateString);

    wrapper.find(CalendarIcon).simulate("click");

    DatePickerInstance.handleSingleCalendarDateChange(dummyDate);
    wrapper.update();

    expect(wrapper.find(Calendar).length).toBe(0);
    expect(DatePickerInstance.state.calendarOpen).toBe(false);
  });

  it("should show the new date on the input when selecting a date on the calendar", () => {
    const dummyDateString = "2018-11-10";
    const dummyDate = convertISOStringDateToDate(dummyDateString);

    wrapper.find(CalendarIcon).simulate("click");

    DatePickerInstance.handleSingleCalendarDateChange(dummyDate);
    wrapper.update();

    expect(DatePickerComponent.find("input").instance().value).toBe(
      getFormattedDate(dummyDate, DatePickerInstance.props.locale)
    );
  });

  it("should hide the calendar when selecting a new date on the calendar", () => {
    const dummyDateString = "2018-11-10";
    const dummyDate = convertISOStringDateToDate(dummyDateString);

    wrapper.find(CalendarIcon).simulate("click");

    DatePickerInstance.handleSingleCalendarDateChange(dummyDate);
    wrapper.update();

    expect(wrapper.find(Calendar).length).toBe(0);
    expect(DatePickerInstance.state.calendarOpen).toBe(false);
  });

  it("should have the Calendar component with the same selected date as the received value property", () => {
    wrapper.find(CalendarIcon).simulate("click");
    const calendarInstance = wrapper.find(Calendar);

    expect(calendarInstance.prop("selectedDate")).toEqual(convertISOStringDateToDate("2019-01-01"));
  });
});

describe("<DatePicker /> with simple Calendar with actions ", () => {
  let wrapper;
  let DatePickerComponent;
  let DatePickerInstance;
  const originalDateString = "2019-01-01";

  beforeEach(async () => {
    wrapper = mount(
      <HvProvider>
        <DatePicker rangeMode={false} value={originalDateString} locale="en-US" showActions />
      </HvProvider>
    );
    DatePickerComponent = wrapper.find("HvDatePicker");
    DatePickerInstance = DatePickerComponent.instance();
  });

  it("should apply a new date using the apply action", () => {
    const dummyDateString = "2018-11-10";
    const dummyDate = convertISOStringDateToDate(dummyDateString);

    wrapper.find(CalendarIcon).simulate("click");

    DatePickerInstance.handleSingleCalendarDateChange(dummyDate);
    wrapper.update();

    DatePickerInstance.handleApplyAction();

    expect(DatePickerInstance.state.selectedDate).toMatchObject(dummyDate);
  });

  it("should maintain the old date using the cancel action", () => {
    const dummyDateString = "2018-11-10";
    const dummyDate = convertISOStringDateToDate(dummyDateString);

    wrapper.find(CalendarIcon).simulate("click");

    DatePickerInstance.handleSingleCalendarDateChange(dummyDate);
    wrapper.update();

    DatePickerInstance.handleCancelAction();

    expect(DatePickerInstance.state.selectedDate).toMatchObject(
      convertISOStringDateToDate(originalDateString)
    );
  });
});

describe("<DatePicker /> with range Calendar with actions ", () => {
  let wrapper;
  let DatePickerComponent;
  let DatePickerInstance;
  const originalStartDateString = "2018-01-01";
  const originalEndDateString = "2018-01-02";
  const dummyStartDateString = "2018-11-10";
  const dummyStartDate = convertISOStringDateToDate(dummyStartDateString);

  const dummyEndDateString = "2018-11-11";
  const dummyEndDate = convertISOStringDateToDate(dummyEndDateString);

  beforeEach(async () => {
    wrapper = mount(
      <HvProvider>
        <DatePicker
          rangeMode
          locale="en-US"
          startValue={originalStartDateString}
          endValue={originalEndDateString}
          showActions
        />
      </HvProvider>
    );
    DatePickerComponent = wrapper.find("HvDatePicker");
    DatePickerInstance = DatePickerComponent.instance();
  });

  it("should apply a new dates using the apply action", () => {
    wrapper.find(CalendarIcon).simulate("click");

    DatePickerInstance.handleRangeCalendarDateStartChange(dummyStartDate);
    wrapper.update();

    DatePickerInstance.handleRangeCalendarDateEndChange(dummyEndDate);
    wrapper.update();

    DatePickerInstance.handleApplyAction();
    wrapper.update();

    expect(DatePickerInstance.state.startSelectedDate).toMatchObject(dummyStartDate);

    expect(DatePickerInstance.state.endSelectedDate).toMatchObject(dummyEndDate);
  });

  it("should maintain the old dates using the cancel action", () => {
    wrapper.find(CalendarIcon).simulate("click");

    DatePickerInstance.handleRangeCalendarDateStartChange(dummyStartDate);
    wrapper.update();

    DatePickerInstance.handleRangeCalendarDateEndChange(dummyEndDate);
    wrapper.update();

    expect(DatePickerInstance.state.startSelectedDate).toMatchObject(
      convertISOStringDateToDate(originalStartDateString)
    );

    expect(DatePickerInstance.state.endSelectedDate).toMatchObject(
      convertISOStringDateToDate(originalEndDateString)
    );
  });
});

describe("<DatePicker /> with Range Calendar mode", () => {
  let wrapper;
  let DatePickerComponent;
  let DatePickerInstance;

  beforeEach(async () => {
    wrapper = mount(
      <HvProvider>
        <DatePicker rangeMode locale="en-US" startValue="2019-01-05" endValue="2019-01-10" />
      </HvProvider>
    );
    DatePickerComponent = wrapper.find("HvDatePicker");
    DatePickerInstance = DatePickerComponent.instance();
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper.find(DatePicker)).toMatchSnapshot();
  });

  it("should not render any Calendar component", () => {
    expect(wrapper.find(Calendar).length).toBe(0);
  });

  it("should have the values showing on the input with the correct format", () => {
    expect(DatePickerComponent.find("input").instance().value).toBe(
      `${getFormattedDate(
        convertISOStringDateToDate("2019-01-05"),
        DatePickerInstance.props.locale
      )} - ${getFormattedDate(
        convertISOStringDateToDate("2019-01-10"),
        DatePickerInstance.props.locale
      )}`
    );
  });

  it("should have the property `rangeMode` set to `true`", () => {
    expect(DatePickerInstance.props.rangeMode).toBe(true);
  });

  it("should have the correct locale defined on the props", () => {
    expect(DatePickerInstance.props.locale).toBe("en-US");
  });

  it("should have the state property `startSelectedDate` defined with the correct date", () => {
    expect(DatePickerInstance.state.startSelectedDate).toEqual(
      convertISOStringDateToDate("2019-01-05")
    );
  });

  it("should have the state property `endSelectedDate` defined with the correct date", () => {
    expect(DatePickerInstance.state.endSelectedDate).toEqual(
      convertISOStringDateToDate("2019-01-10")
    );
  });

  it("should have the state property `tempStartSelectedDate` defined with the correct date", () => {
    expect(DatePickerInstance.state.tempStartSelectedDate).toEqual(
      convertISOStringDateToDate("2019-01-05")
    );
  });

  it("should have the state property `tempEndSelectedDate` defined with the correct date", () => {
    expect(DatePickerInstance.state.tempEndSelectedDate).toEqual(
      convertISOStringDateToDate("2019-01-10")
    );
  });

  it("should open two calendars when clicking the calendar icon", () => {
    wrapper.find(CalendarIcon).simulate("click");

    expect(wrapper.find(Calendar).length).toBe(2);
  });

  it("should show an Actions component when opening the calendars", () => {
    wrapper.find(CalendarIcon).simulate("click");

    expect(wrapper.find(Actions).length).toBe(1);
  });

  it("should not have a Typography component if the `title` props is not passed inside the labels object", () => {
    expect(DatePickerComponent.find(Typography).length).toBe(0);
  });
});

describe("<DatePicker /> with custom properties", () => {
  let wrapper;
  let DatePickerComponent;
  let DatePickerInstance;
  const labels = {
    applyLabel: "OK",
    cancelLabel: "GO BACK",
    title: "TESTING LABEL",
    placeholder: "I'M THE PLACEHOLDER",
  };

  beforeEach(async () => {
    wrapper = mount(
      <HvProvider>
        <DatePicker
          locale="en-US"
          value="2019-01-05"
          labels={labels}
          horizontalPlacement="left"
          showActions
          id="testingDatePicker"
        />
      </HvProvider>
    );
    DatePickerComponent = wrapper.find("HvDatePicker");
    DatePickerInstance = DatePickerComponent.instance();
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper.find(DatePicker)).toMatchSnapshot();
  });

  it("should show an Actions component when opening the calendar", () => {
    wrapper.find(CalendarIcon).simulate("click");

    expect(wrapper.find(Actions).length).toBe(1);
  });

  it("should add the correct placeholder to the input", () => {
    expect(wrapper.find("input").instance().placeholder).toBe(labels.placeholder);
  });

  it("should not hide the calendar when selecting a new date on the calendar", () => {
    const dummyDateString = "2018-11-10";
    const dummyDate = convertISOStringDateToDate(dummyDateString);

    wrapper.find(CalendarIcon).simulate("click");

    DatePickerInstance.handleSingleCalendarDateChange(dummyDate);
    wrapper.update();

    expect(wrapper.find(Calendar).length).toBe(1);
    expect(DatePickerInstance.state.calendarOpen).toBe(true);
  });

  it("should not change date when the cancel action is triggered", () => {
    const dummyDateString = "2018-11-10";
    const dummyDate = convertISOStringDateToDate(dummyDateString);

    wrapper.find(CalendarIcon).simulate("click");

    DatePickerInstance.handleSingleCalendarDateChange(dummyDate);
    DatePickerInstance.handleCancelAction();

    expect(DatePickerInstance.state.selectedDate).toEqual(convertISOStringDateToDate("2019-01-05"));
  });

  it("should have a Typography component if the `title` props is passed inside the labels object", () => {
    expect(DatePickerComponent.find(Typography).length).toBe(1);
  });

  it("should have the Typography component with the same text as the one passed on the `title` prop", () => {
    const typographyElement = wrapper.find(Typography);
    expect(typographyElement.prop("children")).toBe(labels.title);
  });

  it("should call the onChange callback if defined", () => {
    const handleOnchange = jest.fn();

    // Hide console error: "Failed prop type: Material-UI: the `anchorEl` prop provided to the component is invalid."
    // In real cases this value is filled if the dropdown is expanded.
    // eslint-disable-next-line no-console
    const originalError = console.error;
    // eslint-disable-next-line no-console
    console.error = jest.fn();

    wrapper = mount(
      <HvProvider>
        <DatePicker onChange={handleOnchange} />
      </HvProvider>
    );
    DatePickerInstance = wrapper.find("HvDatePicker").instance();
    DatePickerInstance.setSingleDate(convertISOStringDateToDate("2018-11-10"));
    expect(handleOnchange.mock.calls.length).toBe(1);

    // eslint-disable-next-line no-console
    console.error = originalError;
  });

  it("should close the calendar and keep the same date when the `handleCalendarClickAway` is triggered", () => {
    const dummyDateString = "2018-11-10";
    const dummyDate = convertISOStringDateToDate(dummyDateString);

    wrapper.find(CalendarIcon).simulate("click");

    DatePickerInstance.handleSingleCalendarDateChange(dummyDate);

    const dummyEvent = {
      target: {
        id: "testingDatePicker-icon-NOT",
      },
    };

    DatePickerInstance.handleCalendarClickAway(dummyEvent);

    expect(DatePickerInstance.state.selectedDate).toEqual(convertISOStringDateToDate("2019-01-05"));
    expect(DatePickerInstance.state.calendarOpen).toBe(false);
  });
});
