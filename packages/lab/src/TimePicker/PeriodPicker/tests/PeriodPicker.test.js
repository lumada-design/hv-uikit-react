import React from "react";
import { mount } from "enzyme";
import HvProvider from "@hv/uikit-react-core/dist/Provider";
import AddIcon from "@hv/uikit-react-icons/dist/Generic/DropUpXS";
import SubIcon from "@hv/uikit-react-icons/dist/Generic/DropDownXS";
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
