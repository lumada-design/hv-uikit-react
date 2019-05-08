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
import DatePickerDS from "../DatePickerDS";
import Calendar from "../Calendar";
import DatePickerDSWithStyles from "../index";

describe("DatePickerDS", () => {
  /**
   * Component wrapper
   */
  let wrapper;

  /**
   * The DatePickerDS Instance (includes styles)
   * @type {DatePickerDSWithStyles}
   */
  let DatePickerDsInstance;

  /**
   * Tests the component state
   * @param calendarVisible value to check for the calendarVisible state
   */
  const testState = (calendarVisible, date) => {
    expect(DatePickerDsInstance.state.calendarVisible).toBe(calendarVisible);
    expect(DatePickerDsInstance.state.value).toBe(date);
  };

  /**
   * Gets the DatePickerDS component
   * @param ParentElement The parent element where the DatePickerDS is inserted
   * @returns {DatePickerDSWithStyles} the component
   */
  const getDatePickerDS = ParentElement =>
    ParentElement.find(DatePickerDS).instance();

  beforeEach(async () => {
    wrapper = mount(
      <HvProvider>
        <DatePickerDSWithStyles />
      </HvProvider>
    );
    DatePickerDsInstance = getDatePickerDS(wrapper);
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render the DatePickerDS component", () => {
    expect(wrapper.find(DatePickerDS).length).toBe(1);
  });

  it("should remove document mouse down at component unmount", () => {
    class DummyCalendar extends DatePickerDSWithStyles {
      handleClickOutside = jest.fn();

      componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
      }

      componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
      }
    }

    wrapper = mount(
      <div>
        <HvProvider>
          <DummyCalendar />
        </HvProvider>
        <div>
          <a href="dummy.dummy" className="any-element-outside">
            Anylink
          </a>
        </div>
      </div>
    );

    const dummyInstance = wrapper.find(DummyCalendar).instance();
    wrapper.find(CalendarIcon).simulate("click");

    let event = new Event("mousedown");
    document.dispatchEvent(event);
    wrapper.unmount();

    event = new Event("mousedown");
    document.dispatchEvent(event);

    expect(dummyInstance.handleClickOutside.mock.calls.length).toBe(1);
  });

  it("should pass props to child input component (Calendar)", () => {
    const calendarVisible = true;
    const showActions = true;
    wrapper = mount(
      <HvProvider>
        <DatePickerDSWithStyles
          value="2019-01-01"
          locale="PT-pt"
          showActions={showActions}
          calendarVisible={calendarVisible}
        />
      </HvProvider>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("should change state at show calendar at icon click ", () => {
    wrapper.find(CalendarIcon).simulate("click");
    testState(true, "");

    wrapper.update();
    expect(wrapper.find(Calendar).length).toBe(1);
  });

  it("should change state with a calendar visible and a clearInput", () => {
    wrapper.find(CalendarIcon).simulate("click");
    testState(true, "");

    DatePickerDsInstance.clearInput();
    testState(false, "");
    wrapper.update();
    expect(wrapper.find(Calendar).length).toBe(0);
  });

  it("should change the input value and hide the calendar after selecting a date", () => {
    const dummyDateString = "2018-11-10";
    const dummyDate = new Date(dummyDateString);
    wrapper.find(CalendarIcon).simulate("click");
    testState(true, "");

    DatePickerDsInstance.setDate(dummyDate);
    wrapper.update();

    expect(wrapper.find(Calendar).length).toBe(0);
    expect(DatePickerDsInstance.state.value).toBe(dummyDateString);
  });

  it("Should apply the default properties when empty component is created", () => {
    expect(DatePickerDsInstance.state.value).toBe(
      DatePickerDS.defaultProps.value
    );
    expect(wrapper.find("input").instance().placeholder).toBe(
      DatePickerDS.defaultProps.placeholder
    );
    expect(wrapper.find(Calendar).length).toBe(0);

    wrapper.find(CalendarIcon).simulate("click");
    wrapper.update();
    expect(wrapper.find(Calendar).instance().props.locale).toBe(
      DatePickerDS.defaultProps.locale
    );
  });

  it("Should apply placeholder prop when passed", () => {
    wrapper = mount(
      <HvProvider>
        <DatePickerDSWithStyles placeholder="DD-MM-YYYY" />
      </HvProvider>
    );
    expect(wrapper.find("input").instance().placeholder).toBe("DD-MM-YYYY");
  });

  it("Should have a calendar visible when calendarVisible prop is passed", () => {
    const calendarVisible = true;
    wrapper = mount(
      <HvProvider>
        <DatePickerDSWithStyles calendarVisible={calendarVisible} />
      </HvProvider>
    );
    expect(wrapper.find(Calendar).length).toBe(1);
  });

  it("Should have a value when value prop is passed", () => {
    wrapper = mount(
      <HvProvider>
        <DatePickerDSWithStyles value="2019-01-01" />
      </HvProvider>
    );
    expect(wrapper.find("input").instance().value).toBe("2019-01-01");
  });

  it("should hide the calendar when click outside", () => {
    wrapper = mount(
      <div>
        <HvProvider>
          <DatePickerDSWithStyles />
        </HvProvider>
        <div>
          <a href="dummy.dummy" className="any-element-outside">
            Anylink
          </a>
        </div>
      </div>
    );

    DatePickerDsInstance = getDatePickerDS(wrapper);
    wrapper.find(CalendarIcon).simulate("click");
    testState(true, "");

    const event = new Event("mousedown");
    document.dispatchEvent(event);
    wrapper.update();
    expect(wrapper.find(Calendar).length).toBe(0);
  });

  it("should (when showActions=true) not hide the calendar at date click when", () => {
    wrapper = mount(
      <HvProvider>
        <DatePickerDSWithStyles showActions calendarVisible />
      </HvProvider>
    );
    DatePickerDsInstance = getDatePickerDS(wrapper);
    testState(true, "");

    DatePickerDsInstance.handleCalendarDateChange(new Date());
    testState(true, "");
  });

  it("should (when showActions=true) ignore date selections and hide the calendar only at apply action", () => {
    wrapper = mount(
      <HvProvider>
        <DatePickerDSWithStyles showActions calendarVisible />
      </HvProvider>
    );
    DatePickerDsInstance = getDatePickerDS(wrapper);
    testState(true, "");

    DatePickerDsInstance.handleCalendarDateChange(new Date("2019-01-01"));
    testState(true, "");
    DatePickerDsInstance.handleCalendarApplyAction(new Date("2019-01-02"));
    testState(false, "2019-01-02");
  });

  it("should (when showActions=false) set the date and hide the calendar", () => {
    wrapper = mount(
      <HvProvider>
        <DatePickerDSWithStyles showActions={false} calendarVisible />
      </HvProvider>
    );
    DatePickerDsInstance = getDatePickerDS(wrapper);
    testState(true, "");
    DatePickerDsInstance.handleCalendarDateChange(new Date("2019-01-01"));
    testState(false, "2019-01-01");
  });

  it("should not change date when cancel action is triggered", () => {
    wrapper = mount(
      <HvProvider>
        <DatePickerDSWithStyles
          value="2019-01-01"
          calendarVisible
          showActions
        />
      </HvProvider>
    );
    DatePickerDsInstance = getDatePickerDS(wrapper);
    // Date is not changed when showActions = true
    DatePickerDsInstance.handleCalendarDateChange(new Date("2019-01-02"));
    testState(true, "2019-01-01");
    DatePickerDsInstance.handleCalendarCancelAction();
    testState(false, "2019-01-01");
  });

  it("should not change date when cancel action is triggered (2)", () => {
    wrapper = mount(
      <HvProvider>
        <DatePickerDSWithStyles
          value="2019-01-01"
          calendarVisible
          showActions
        />
      </HvProvider>
    );
    DatePickerDsInstance = getDatePickerDS(wrapper);
    // Date is not changed when showActions = true
    DatePickerDsInstance.handleCalendarCancelAction();
    testState(false, "2019-01-01");
  });
});
