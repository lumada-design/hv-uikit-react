/*
 * Copyright 2019 Hitachi Vantara Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from "react";
import { mount } from "enzyme";
import HvProvider from "@hv/uikit-react-core/dist/Provider";

import Header from "../Header";
import Navigation from "../Navigation";

import { VIEW_MODE, REPRESENTATION_VALUES } from "../enums";
import { getFormattedDate, getWeekdayName, makeUTCDate } from "../utils";

import CalendarWithStyles from "../index";
import Calendar from "../Calendar";

describe("<Calendar /> with minimum configuration", () => {
  let wrapper;
  let calendarComponent;
  let calendarInstance;
  const selectedDate = makeUTCDate(1970, 1, 1);

  beforeEach(async () => {
    wrapper = mount(
      <HvProvider>
        <CalendarWithStyles selectedDate={selectedDate} />
      </HvProvider>
    );
    calendarComponent = wrapper.find(Calendar);
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
    expect(calendarInstance.state.calendarModel.month).toBe(
      selectedDate.getUTCMonth() + 1
    );
  });

  it("should have the year in the state be the same as the one set in the selectedDate", () => {
    expect(calendarInstance.state.calendarModel.year).toBe(
      selectedDate.getUTCFullYear()
    );
  });

  it("should have the weekDayName be the same as the one from the selectedDate", () => {
    const initialSelectedDateWeekdayName = getWeekdayName(
      selectedDate,
      calendarInstance.props.locale,
      REPRESENTATION_VALUES.SHORT
    );
    const selectedDateWeekdayName = getWeekdayName(
      calendarInstance.state.selectedDate,
      calendarInstance.props.locale,
      REPRESENTATION_VALUES.SHORT
    );

    expect(selectedDateWeekdayName).toBe(initialSelectedDateWeekdayName);
  });

  it("should have the formattedDate be the same as the one from the selectedDate", () => {
    const selectedDateFormatted = getFormattedDate(
      selectedDate,
      calendarInstance.props.locale
    );
    expect(calendarInstance.state.formattedDate).toBe(selectedDateFormatted);
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
        <CalendarWithStyles
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
