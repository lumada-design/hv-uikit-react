import React from "react";
import { mount } from "enzyme";

import { Calendar as CalendarIcon } from "@hv/uikit-react-icons";
import { HvActionContainer, HvProvider, HvCalendar, HvDatePicker, HvTypography } from "../..";
import { convertISOStringDateToDate } from "../../Calendar/utils";

describe("<DatePicker /> with minimum configuration", () => {
  let wrapper;
  let DatePickerComponent;

  beforeEach(async () => {
    wrapper = mount(
      <HvProvider>
        <HvDatePicker />
      </HvProvider>
    );
    DatePickerComponent = wrapper.find("HvDatePicker");
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper.find(HvDatePicker)).toMatchSnapshot();
  });

  it("should not render an actions component", () => {
    expect(DatePickerComponent.find(HvActionContainer).length).toBe(0);
  });

  it("should not render any Calendar component", () => {
    expect(wrapper.find(HvCalendar).length).toBe(0);
  });

  it("should have an empty value on the input", () => {
    expect(DatePickerComponent.find("input").instance().value).toBe("");
  });

  it("should add a <Calendar /> component to the container when clicking on the calendar icon", () => {
    DatePickerComponent.find(CalendarIcon).simulate("click");
    expect(wrapper.find(HvCalendar).length).toBe(1);
  });

  it("should open the calendar when clicking the calendar icon", () => {
    wrapper.find(CalendarIcon).simulate("click");

    expect(wrapper.find(HvCalendar).length).toBe(1);
  });

  it("should not show an Actions component when opening the calendar", () => {
    wrapper.find(CalendarIcon).simulate("click");

    expect(wrapper.find(HvActionContainer).length).toBe(0);
  });
});

describe("<DatePicker /> with Single Calendar mode", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = mount(
      <HvProvider>
        <HvDatePicker rangeMode={false} value="2019-01-01" locale="en-US" />
      </HvProvider>
    );
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper.find(HvDatePicker)).toMatchSnapshot();
  });

  it("should not render any Calendar component", () => {
    expect(wrapper.find(HvCalendar).length).toBe(0);
  });

  it("should open the calendar when clicking the calendar icon", () => {
    wrapper.find(CalendarIcon).simulate("click");

    expect(wrapper.find(HvCalendar).length).toBe(1);
  });

  it("should not show an Actions component when opening the calendar", () => {
    wrapper.find(CalendarIcon).simulate("click");

    expect(wrapper.find(HvActionContainer).length).toBe(0);
  });

  it("should have the Calendar component with the same selected date as the received value property", () => {
    wrapper.find(CalendarIcon).simulate("click");
    const calendarInstance = wrapper.find(HvCalendar);

    expect(calendarInstance.prop("selectedDate")).toEqual(convertISOStringDateToDate("2019-01-01"));
  });
});

describe("<DatePicker /> with Range Calendar mode", () => {
  let wrapper;
  let DatePickerComponent;

  beforeEach(async () => {
    wrapper = mount(
      <HvProvider>
        <HvDatePicker rangeMode locale="en-US" startValue="2019-01-05" endValue="2019-01-10" />
      </HvProvider>
    );
    DatePickerComponent = wrapper.find("HvDatePicker");
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper.find(HvDatePicker)).toMatchSnapshot();
  });

  it("should not render any Calendar component", () => {
    expect(wrapper.find(HvCalendar).length).toBe(0);
  });

  it("should open two calendars when clicking the calendar icon", () => {
    wrapper.find(CalendarIcon).simulate("click");

    expect(wrapper.find(HvCalendar).length).toBe(2);
  });

  it("should show an Actions component when opening the calendars", () => {
    wrapper.find(CalendarIcon).simulate("click");

    expect(wrapper.find(HvActionContainer).length).toBe(1);
  });

  it("should not have a Typography component if the `title` props is not passed inside the labels object", () => {
    expect(DatePickerComponent.find(HvTypography).length).toBe(0);
  });
});

describe("<DatePicker /> with custom properties", () => {
  let wrapper;
  let DatePickerComponent;
  const labels = {
    applyLabel: "OK",
    cancelLabel: "GO BACK",
    title: "TESTING LABEL",
    placeholder: "I'M THE PLACEHOLDER"
  };

  beforeEach(async () => {
    wrapper = mount(
      <HvProvider>
        <HvDatePicker
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
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper.find(HvDatePicker)).toMatchSnapshot();
  });

  it("should show an Actions component when opening the calendar", () => {
    wrapper.find(CalendarIcon).simulate("click");

    expect(wrapper.find(HvActionContainer).length).toBe(1);
  });

  it("should add the correct placeholder to the input", () => {
    expect(wrapper.find("input").instance().placeholder).toBe(labels.placeholder);
  });

  it("should have a Typography component if the `title` props is passed inside the labels object", () => {
    expect(DatePickerComponent.find(HvTypography).length).toBe(1);
  });

  it("should have the Typography component with the same text as the one passed on the `title` prop", () => {
    const typographyElement = wrapper.find(HvTypography);
    expect(typographyElement.prop("children")).toBe(labels.title);
  });
});
