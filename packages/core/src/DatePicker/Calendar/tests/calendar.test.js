import React from "react";
import { mount } from "enzyme";
import HvProvider from "../../../Provider";

import Header from "../Header";
import Navigation from "../Navigation";

import { VIEW_MODE } from "../enums";
import { makeUTCDate } from "../utils";

import Calendar from "..";

describe("<Calendar /> with minimum configuration", () => {
  let wrapper;
  let calendarComponent;
  let calendarInstance;
  const selectedDate = makeUTCDate(1970, 1, 1);

  beforeEach(async () => {
    wrapper = mount(
      <HvProvider>
        <Calendar id="default" selectedDate={selectedDate} />
      </HvProvider>
    );
    calendarComponent = wrapper.find("Calendar");
    calendarInstance = calendarComponent.instance();
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render a header component", () => {
    expect(calendarComponent.find(Header).length).toBe(1);
  });

  it("should render two navigation components", () => {
    expect(calendarComponent.find(Navigation).length).toBe(2);
  });

  it("should have the selectedDate in the state be the same as the selectedDate", () => {
    expect(calendarInstance.state.selectedDate).toBe(selectedDate);
  });

  it("should have the month in the state be the same as the one set in the selectedDate", () => {
    expect(calendarInstance.state.calendarModel.month).toBe(selectedDate.getUTCMonth() + 1);
  });

  it("should have the year in the state be the same as the one set in the selectedDate", () => {
    expect(calendarInstance.state.calendarModel.year).toBe(selectedDate.getUTCFullYear());
  });

  it("should have the viewMode in the state set to Calendar", () => {
    expect(calendarInstance.state.viewMode).toBe(VIEW_MODE.CALENDAR);
  });
});

describe("<Calendar /> with configurations", () => {
  let wrapper;

  const selectedDate = makeUTCDate(1970, 1, 1);

  const handleDateChangeMock = jest.fn();

  beforeEach(async () => {
    wrapper = mount(
      <HvProvider>
        <Calendar
          id="default"
          selectedDate={selectedDate}
          locale="en-US"
          handleDateChange={handleDateChangeMock}
        />
      </HvProvider>
    );
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
