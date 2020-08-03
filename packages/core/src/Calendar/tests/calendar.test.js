import React from "react";
import { mount } from "enzyme";
import HvProvider from "../../Provider";

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
        <Calendar id="calendar" />
      </HvProvider>
    );


    calendarComponent = wrapper.find("HvCalendar");
    calendarInstance = calendarComponent.instance();
  });


  /**
   *
   * it("should navigate to the next month when invoking `navigateTo(NAV_OPTIONS.NEXT_MONTH)`", () => {
    calendarModelInstance.navigateTo(NAV_OPTIONS.NEXT_MONTH);

    expect(calendarModelInstance.month).toBe(2);
  });

   it("should navigate to the next year when invoking `navigateTo(NAV_OPTIONS.NEXT_YEAR)`", () => {
    calendarModelInstance.navigateTo(NAV_OPTIONS.NEXT_YEAR);

    expect(calendarModelInstance.year).toBe(2001);
  });


   it("should navigate to the previous month when invoking `navigateTo(NAV_OPTIONS.PREVIOUS_MONTH)`", () => {
    calendarModelInstance = new CalendarModel(3, 2000);
    calendarModelInstance.navigateTo(NAV_OPTIONS.PREVIOUS_MONTH);

    expect(calendarModelInstance.month).toBe(2);
  });

   it("should navigate to the previous year when invoking `navigateTo(NAV_OPTIONS.PREVIOUS_YEAR)`", () => {
    calendarModelInstance.navigateTo(NAV_OPTIONS.PREVIOUS_MONTH);

    expect(calendarModelInstance.year).toBe(1999);
  });

   it("should navigate to the previous month and year when invoking `navigateTo(NAV_OPTIONS.PREVIOUS_MONTH)` and the current month is 1", () => {
    calendarModelInstance.navigateTo(NAV_OPTIONS.PREVIOUS_MONTH);

    expect(calendarModelInstance.month).toBe(12);
    expect(calendarModelInstance.year).toBe(1999);
  });

   it("should navigate to the next month and year when invoking `navigateTo(NAV_OPTIONS.NEXT_MONTH)` and the current month is 12", () => {
    calendarModelInstance = new CalendarModel(12, 2000);
    calendarModelInstance.navigateTo(NAV_OPTIONS.NEXT_MONTH);

    expect(calendarModelInstance.month).toBe(1);
    expect(calendarModelInstance.year).toBe(2001);
  });

   it("should navigate to the specified month when invoking `navigateTo(NAV_OPTIONS.MONTH, MONTH)`", () => {
    calendarModelInstance = new CalendarModel(12, 2000);
    calendarModelInstance.navigateTo(NAV_OPTIONS.MONTH, 3);

    expect(calendarModelInstance.month).toBe(3);
    expect(calendarModelInstance.year).toBe(2000);
  });
   * */



  it("should render two navigation components", () => {
    expect(calendarComponent.find(Navigation).length).toBe(2);
  });
/**
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
  });*/
});


describe("<Calendar /> with configurations", () => {
  let wrapper;
  let calendarComponent;

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
    calendarComponent = wrapper.find(Calendar);
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper.find(Calendar)).toMatchSnapshot();
  });

  it("should render a header component", () => {
    expect(calendarComponent.find(Header).length).toBe(1);
  });
});
