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
import CalendarIcon from "@hv/uikit-react-icons/dist/Calendar.S";
import Typography from "@hv/uikit-react-core/dist/Typography";

import {
  convertISOStringDateToDate,
  getFormattedDate
} from "../Calendar/utils";

import Actions from "../Actions";
import Calendar from "../Calendar";

import DatePickerDSWithStyles from "../index";
import DatePickerDS from "../DatePickerDS";

describe("<DatePickerDS /> with minimum configuration", () => {
  let wrapper;
  let datePickerDSComponent;
  let datePickerDSInstance;

  beforeEach(async () => {
    wrapper = mount(
      <HvProvider>
        <DatePickerDSWithStyles />
      </HvProvider>
    );
    datePickerDSComponent = wrapper.find(DatePickerDS);
    datePickerDSInstance = datePickerDSComponent.instance();
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should not render an actions component", () => {
    expect(datePickerDSComponent.find(Actions).length).toBe(0);
  });

  it("should not render any Calendar component", () => {
    expect(wrapper.find(Calendar).length).toBe(0);
  });

  it("should have an empty value on the input", () => {
    expect(datePickerDSComponent.find("input").instance().value).toBe("");
  });

  it("should have the state property `calendarOpen` set to `false`", () => {
    expect(datePickerDSInstance.state.calendarOpen).toBe(false);
  });

  it("should have the state property `selectedDate` as `null`", () => {
    expect(datePickerDSInstance.state.selectedDate).toBe(null);
  });

  it("should add change the state property `calendarOpen` to `true` when clicking on the calendar icon", () => {
    datePickerDSComponent.find(CalendarIcon).simulate("click");
    expect(datePickerDSInstance.state.calendarOpen).toBe(true);
  });

  it("should add a <Calendar /> component to the container when clicking on the calendar icon", () => {
    datePickerDSComponent.find(CalendarIcon).simulate("click");
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

  it("should apply the default properties", () => {
    expect(datePickerDSInstance.props.rangeMode).toBe(
      DatePickerDS.defaultProps.rangeMode
    );
    expect(datePickerDSInstance.props.horizontalPlacement).toBe(
      DatePickerDS.defaultProps.horizontalPlacement
    );
    expect(datePickerDSInstance.props.value).toBe(
      DatePickerDS.defaultProps.value
    );
    expect(datePickerDSInstance.props.locale).toBe(
      DatePickerDS.defaultProps.locale
    );
    expect(datePickerDSInstance.props.showActions).toBe(
      DatePickerDS.defaultProps.showActions
    );
    expect(datePickerDSInstance.props.onChange).toBe(
      DatePickerDS.defaultProps.onChange
    );
  });
});

describe("<DatePickerDS /> with Single Calendar mode", () => {
  let wrapper;
  let datePickerDSComponent;
  let datePickerDSInstance;

  beforeEach(async () => {
    wrapper = mount(
      <HvProvider>
        <DatePickerDSWithStyles
          rangeMode={false}
          value="2019-01-01"
          locale="en-US"
        />
      </HvProvider>
    );
    datePickerDSComponent = wrapper.find(DatePickerDS);
    datePickerDSInstance = datePickerDSComponent.instance();
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should not render any Calendar component", () => {
    expect(wrapper.find(Calendar).length).toBe(0);
  });

  it("should have the value showing on the input with the correct format", () => {
    expect(datePickerDSComponent.find("input").instance().value).toBe(
      getFormattedDate(convertISOStringDateToDate("2019-01-01"))
    );
  });

  it("should have the property `rangeMode` set to `false`", () => {
    expect(datePickerDSInstance.props.rangeMode).toBe(false);
  });

  it("should have the state property `selectedDate` defined with the correct value", () => {
    expect(datePickerDSInstance.state.selectedDate).toEqual(
      convertISOStringDateToDate("2019-01-01")
    );
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

    datePickerDSInstance.handleSingleCalendarDateChange(dummyDate);
    wrapper.update();

    expect(wrapper.find(Calendar).length).toBe(0);
    expect(datePickerDSInstance.state.calendarOpen).toBe(false);
  });

  it("should show the new date on the input when selecting a date on the calendar", () => {
    const dummyDateString = "2018-11-10";
    const dummyDate = convertISOStringDateToDate(dummyDateString);

    wrapper.find(CalendarIcon).simulate("click");

    datePickerDSInstance.handleSingleCalendarDateChange(dummyDate);
    wrapper.update();

    expect(datePickerDSComponent.find("input").instance().value).toBe(
      getFormattedDate(dummyDate)
    );
  });

  it("should hide the calendar when selecting a new date on the calendar", () => {
    const dummyDateString = "2018-11-10";
    const dummyDate = convertISOStringDateToDate(dummyDateString);

    wrapper.find(CalendarIcon).simulate("click");

    datePickerDSInstance.handleSingleCalendarDateChange(dummyDate);
    wrapper.update();

    expect(wrapper.find(Calendar).length).toBe(0);
    expect(datePickerDSInstance.state.calendarOpen).toBe(false);
  });

  it("should have the Calendar component with the same selected date as the received value property", () => {
    wrapper.find(CalendarIcon).simulate("click");
    const calendarInstance = wrapper.find(Calendar).instance();

    expect(calendarInstance.props.selectedDate).toEqual(
      convertISOStringDateToDate("2019-01-01")
    );
  });
});

describe("<DatePickerDS /> with Range Calendar mode", () => {
  let wrapper;
  let datePickerDSComponent;
  let datePickerDSInstance;

  beforeEach(async () => {
    wrapper = mount(
      <HvProvider>
        <DatePickerDSWithStyles
          rangeMode
          locale="en-US"
          startValue="2019-01-05"
          endValue="2019-01-10"
        />
      </HvProvider>
    );
    datePickerDSComponent = wrapper.find(DatePickerDS);
    datePickerDSInstance = datePickerDSComponent.instance();
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should not render any Calendar component", () => {
    expect(wrapper.find(Calendar).length).toBe(0);
  });

  it("should have the values showing on the input with the correct format", () => {
    expect(datePickerDSComponent.find("input").instance().value).toBe(
      `${getFormattedDate(
        convertISOStringDateToDate("2019-01-05")
      )} - ${getFormattedDate(convertISOStringDateToDate("2019-01-10"))}`
    );
  });

  it("should have the property `rangeMode` set to `true`", () => {
    expect(datePickerDSInstance.props.rangeMode).toBe(true);
  });

  it("should have the correct locale defined on the props", () => {
    expect(datePickerDSInstance.props.locale).toBe("en-US");
  });

  it("should have the state property `startSelectedDate` defined with the correct date", () => {
    expect(datePickerDSInstance.state.startSelectedDate).toEqual(
      convertISOStringDateToDate("2019-01-05")
    );
  });

  it("should have the state property `endSelectedDate` defined with the correct date", () => {
    expect(datePickerDSInstance.state.endSelectedDate).toEqual(
      convertISOStringDateToDate("2019-01-10")
    );
  });

  it("should have the state property `tempStartSelectedDate` defined with the correct date", () => {
    expect(datePickerDSInstance.state.tempStartSelectedDate).toEqual(
      convertISOStringDateToDate("2019-01-05")
    );
  });

  it("should have the state property `tempEndSelectedDate` defined with the correct date", () => {
    expect(datePickerDSInstance.state.tempEndSelectedDate).toEqual(
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
    expect(datePickerDSComponent.find(Typography).length).toBe(0);
  });
});

describe("<DatePickerDS /> with custom properties", () => {
  let wrapper;
  let datePickerDSComponent;
  let datePickerDSInstance;
  const labels = {
    applyLabel: "OK",
    cancelLabel: "GO BACK",
    title: "TESTING LABEL",
    placeholder: "I'M THE PLACEHOLDER"
  };

  beforeEach(async () => {
    wrapper = mount(
      <HvProvider>
        <DatePickerDSWithStyles
          locale="en-US"
          value="2019-01-05"
          labels={labels}
          horizontalPlacement="left"
          showActions
        />
      </HvProvider>
    );
    datePickerDSComponent = wrapper.find(DatePickerDS);
    datePickerDSInstance = datePickerDSComponent.instance();
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should show an Actions component when opening the calendar", () => {
    wrapper.find(CalendarIcon).simulate("click");

    expect(wrapper.find(Actions).length).toBe(1);
  });

  it("should add the correct placeholder to the input", () => {
    expect(wrapper.find("input").instance().placeholder).toBe(
      labels.placeholder
    );
  });

  it("should not hide the calendar when selecting a new date on the calendar", () => {
    const dummyDateString = "2018-11-10";
    const dummyDate = convertISOStringDateToDate(dummyDateString);

    wrapper.find(CalendarIcon).simulate("click");

    datePickerDSInstance.handleSingleCalendarDateChange(dummyDate);
    wrapper.update();

    expect(wrapper.find(Calendar).length).toBe(1);
    expect(datePickerDSInstance.state.calendarOpen).toBe(true);
  });

  it("should not change date when the cancel action is triggered", () => {
    const dummyDateString = "2018-11-10";
    const dummyDate = convertISOStringDateToDate(dummyDateString);

    wrapper.find(CalendarIcon).simulate("click");

    datePickerDSInstance.handleSingleCalendarDateChange(dummyDate);
    datePickerDSInstance.handleCancelAction();

    expect(datePickerDSInstance.state.selectedDate).toEqual(
      convertISOStringDateToDate("2019-01-05")
    );
  });

  it("should have a Typography component if the `title` props is passed inside the labels object", () => {
    expect(datePickerDSComponent.find(Typography).length).toBe(1);
  });

  it("should have the Typography component with the same text as the one passed on the `title` prop", () => {
    const typographyElement = wrapper.find(Typography);
    expect(typographyElement.props().children).toBe(labels.title);
  });

  it("should call the onChange callback if defined", () => {
    const handleOnchange = jest.fn();
    wrapper = mount(
      <HvProvider>
        <DatePickerDSWithStyles onChange={handleOnchange} />
      </HvProvider>
    );
    datePickerDSInstance = wrapper.find(DatePickerDS).instance();
    datePickerDSInstance.setSingleDate(
      convertISOStringDateToDate("2018-11-10")
    );
    expect(handleOnchange.mock.calls.length).toBe(1);
  });

  it("should close the calendar and keep the same date when the `handleCalendarClickAway` is triggered", () => {
    const dummyDateString = "2018-11-10";
    const dummyDate = convertISOStringDateToDate(dummyDateString);

    wrapper.find(CalendarIcon).simulate("click");

    datePickerDSInstance.handleSingleCalendarDateChange(dummyDate);
    datePickerDSInstance.handleCalendarClickAway();

    expect(datePickerDSInstance.state.selectedDate).toEqual(
      convertISOStringDateToDate("2019-01-05")
    );
    expect(datePickerDSInstance.state.calendarOpen).toBe(false);
  });
});
