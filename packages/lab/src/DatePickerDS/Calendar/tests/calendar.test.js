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
import HvButton from "@hv/uikit-react-core/dist/Button";

import Header from "../Header";
import Navigation from "../Navigation";
import Actions from "../Actions";

import { VIEW_MODE, REPRESENTATION_VALUES } from "../enums";
import { getFormattedDate, getWeekdayName } from "../utils";

import CalendarWithStyles from "../index";
import Calendar from "../Calendar";

describe("<Calendar /> with minimum configuration", () => {
  let wrapper;
  let calendarComponent;
  let calendarInstance;
  const initialDate = new Date(1970, 0, 1);

  beforeEach(async () => {
    wrapper = mount(
      <HvProvider>
        <CalendarWithStyles initialDate={initialDate} />
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

  it("should not render an actions component", () => {
    expect(calendarComponent.find(Actions).length).toBe(0);
  });

  it("should have the selectedDate in the state be the same as the initialDate", () => {
    expect(calendarInstance.state.selectedDate).toBe(initialDate);
  });

  it("should have the month in the state be the same as the one set in the initialDate", () => {
    expect(calendarInstance.state.calendarModel.month).toBe(initialDate.getMonth() + 1);
  });

  it("should have the year in the state be the same as the one set in the initialDate", () => {
    expect(calendarInstance.state.calendarModel.year).toBe(initialDate.getFullYear());
  });

  it("should have the weekDayName be the same as the one from the initialDate", () => {
    const initialDateWeekdayName = getWeekdayName(
      initialDate,
      calendarInstance.props.locale,
      REPRESENTATION_VALUES.SHORT
    );
    const selectedDateWeekdayName = getWeekdayName(
      calendarInstance.state.selectedDate,
      calendarInstance.props.locale,
      REPRESENTATION_VALUES.SHORT
    )

    expect(selectedDateWeekdayName).toBe(initialDateWeekdayName);
  });

  it("should have the formattedDate be the same as the one from the initialDate", () => {
    const initialDateFormatted = getFormattedDate(
      initialDate,
      calendarInstance.props.locale
    );
    expect(calendarInstance.state.formattedDate).toBe(initialDateFormatted);
  });

  it("should have the viewMode in the state set to Calendar", () => {
    expect(calendarInstance.state.viewMode).toBe(VIEW_MODE.CALENDAR);
  });
});

describe("<Calendar /> with configurations", () => {
  let wrapper;
  let calendarComponent;

  const initialDate = new Date(1970, 0, 1);
  const labels = {
    applyLabel: "Apply",
    cancelLabel: "Cancel"
  };
  const handleDateChangeMock = jest.fn();
  const handleApplyMock = jest.fn();
  const handleCancelMock = jest.fn();

  beforeEach(async () => {
    wrapper = mount(
      <HvProvider>
        <CalendarWithStyles
          initialDate={initialDate}
          locale="en-US"
          labels={labels}
          showActions
          handleDateChange={handleDateChangeMock}
          handleApply={handleApplyMock}
          handleCancel={handleCancelMock}
        />
      </HvProvider>
    );
    calendarComponent = wrapper.find(Calendar);
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render an actions component", () => {
    expect(calendarComponent.find(Actions).length).toBe(1);
  });

  it("handleCancel is triggered", () => {
    const actionsComponent = calendarComponent.find(Actions);

    actionsComponent
      .find(HvButton)
      .at(0)
      .simulate("click", {
        preventDefault() {}
      });

    expect(handleCancelMock).toBeCalled();
  });

  it("handleApply is triggered", () => {
    const actionsComponent = calendarComponent.find(Actions);

    actionsComponent
      .find(HvButton)
      .at(1)
      .simulate("click", {
        preventDefault() {}
      });

    expect(handleApplyMock).toBeCalled();
  });
});
