import React from "react";
import { mount } from "enzyme";
import HvProvider from "../../Provider";
import { HvComposedNavigation } from "../CalendarNavigation";
import { HvCalendar } from "..";

describe("<Calendar /> with minimum configuration", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = mount(
      <HvProvider disableCssBaseline>
        <HvCalendar id="calendar" locale="en-US" />
      </HvProvider>
    );
  });

  it("should render composed navigation components", () => {
    expect(wrapper.find(HvComposedNavigation).length).toBe(1);
  });
});

describe("<Calendar /> with configurations", () => {
  let wrapper;
  const selectedDate = new Date(1970, 0, 1);

  const handleDateChangeMock = jest.fn();

  beforeEach(async () => {
    wrapper = mount(
      <HvProvider disableCssBaseline>
        <HvCalendar
          id="default"
          value={selectedDate}
          locale="en-US"
          onChange={handleDateChangeMock}
        />
      </HvProvider>
    );
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper.find(HvCalendar).length).toMatchSnapshot();
  });
});
