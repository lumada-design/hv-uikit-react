import React from "react";
import { mount } from "enzyme";
import HvProvider from "../../Provider";

import Header from "../Header";
import Navigation from "../Navigation";

import { makeUTCDate } from "../utils";

import Calendar from "..";

describe("<Calendar /> with minimum configuration", () => {
  let wrapper;
  let calendarComponent;

  beforeEach(async () => {
    wrapper = mount(
      <HvProvider>
        <Calendar id="calendar" />
      </HvProvider>
    );

    calendarComponent = wrapper.find("HvCalendar");
  });

  it("should render two navigation components", () => {
    expect(calendarComponent.find(Navigation).length).toBe(2);
  });
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
