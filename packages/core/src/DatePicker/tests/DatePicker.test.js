import React from "react";
import { mount } from "enzyme";

import { Calendar as CalendarIcon } from "@hv/uikit-react-icons";
import { HvActionContainer, HvProvider, HvCalendar, HvDatePicker } from "../..";
import SingleCalendar from "../../Calendar/SingleCalendar";
import { isSameDay } from "../../Calendar/utils";

describe("<DatePicker /> with minimum configuration", () => {
  let wrapper;
  let DatePickerComponent;

  beforeEach(async () => {
    wrapper = mount(
      <HvProvider>
        <HvDatePicker />
      </HvProvider>
    );
    DatePickerComponent = wrapper.find(HvDatePicker);
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should not render an actions component", () => {
    expect(DatePickerComponent.find(HvActionContainer).length).toBe(0);
  });

  it("should not render any Calendar component", () => {
    expect(wrapper.find(HvCalendar).length).toBe(0);
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
        <HvDatePicker value={new Date(2019, 1, 1, 12)} locale="en-US" />
      </HvProvider>
    );
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
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
    const calendarInstance = wrapper.find(HvDatePicker);

    const sameDay = isSameDay(calendarInstance.prop("value"), new Date(2019, 1, 1, 12));
    expect(sameDay).toEqual(true);
  });
});

describe("<DatePicker /> with Range Calendar mode", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = mount(
      <HvProvider>
        <HvDatePicker
          rangeMode
          locale="en-US"
          startValue={new Date(2019, 1, 5, 12)}
          endValue={new Date(2019, 1, 10, 12)}
        />
      </HvProvider>
    );
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should not render any Calendar component", () => {
    expect(wrapper.find(HvCalendar).length).toBe(0);
  });

  it("should open two calendars when clicking the calendar icon", () => {
    wrapper.find(CalendarIcon).simulate("click");

    expect(wrapper.find(SingleCalendar).length).toBe(2);
  });

  it("should show an Actions component when opening the calendars", () => {
    wrapper.find(CalendarIcon).simulate("click");

    expect(wrapper.find(HvActionContainer).length).toBe(1);
  });
});

describe("<DatePicker /> with custom properties", () => {
  let wrapper;
  const labels = {
    applyLabel: "OK",
    cancelLabel: "GO BACK",
    title: "TESTING LABEL",
    placeholder: "I'M THE PLACEHOLDER",
  };

  beforeEach(async () => {
    wrapper = mount(
      <HvProvider>
        <HvDatePicker
          locale="en-US"
          value={new Date(2019, 1, 5, 12)}
          labels={labels}
          horizontalPlacement="left"
          showActions
          id="testingDatePicker"
        />
      </HvProvider>
    );
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should show an Actions component when opening the calendar", () => {
    wrapper.find(CalendarIcon).simulate("click");
    expect(wrapper.find(HvActionContainer).length).toBe(1);
  });
});
