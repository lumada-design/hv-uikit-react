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
import AddIcon from "@hv/uikit-react-icons/dist/DropUp.XS";
import SubIcon from "@hv/uikit-react-icons/dist/DropDown.XS";
import PeriodPickerWithStyles from "../index";
import PeriodPicker from "../PeriodPicker";
import { PeriodPickerOptions } from "../../enums";

describe("PeriodPicker", () => {
  let wrapper;
  let periodPickerComponent;
  let periodPickerInstance;
  let mockOnChangePeriod;
  const defaultPeriod = PeriodPickerOptions.AM;

  beforeEach(async () => {
    mockOnChangePeriod = jest.fn();
    wrapper = mount(
      <HvProvider>
        <PeriodPickerWithStyles
          period={defaultPeriod}
          onChangePeriod={mockOnChangePeriod}
        />
      </HvProvider>
    );
    periodPickerComponent = wrapper.find(PeriodPicker);
    periodPickerInstance = periodPickerComponent.instance();
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("handleChangePeriod - should call selectDifferentPeriod and onChangePeriod with the new value", () => {
    const spy = jest.spyOn(periodPickerInstance, "selectDifferentPeriod");
    periodPickerInstance.handleChangePeriod();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(mockOnChangePeriod).toHaveBeenCalledWith(PeriodPickerOptions.PM);
  });

  it("selectDifferentPeriod - should return the opposite period to the one in the state", () => {
    const period1 = periodPickerInstance.selectDifferentPeriod();
    expect(period1).toBe(PeriodPickerOptions.PM);
    periodPickerComponent.setState({ currentPeriod: PeriodPickerOptions.PM });
    const period2 = periodPickerInstance.selectDifferentPeriod();
    expect(period2).toBe(PeriodPickerOptions.AM);
  });

  it("render - should render all the elements", () => {
    expect(periodPickerComponent.find(AddIcon)).toHaveLength(1);
    expect(
      periodPickerComponent
        .find("div")
        .at(0)
        .text()
    ).toBe(periodPickerInstance.state.currentPeriod);
    expect(periodPickerComponent.find(SubIcon)).toHaveLength(1);
  });
});
