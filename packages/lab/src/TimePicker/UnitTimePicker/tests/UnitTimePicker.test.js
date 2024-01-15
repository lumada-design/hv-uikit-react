import React from "react";
import { mount } from "enzyme";
import {
  DropUpXS as AddTimeIcon,
  DropDownXS as SubtractTimeIcon,
} from "@hitachivantara/uikit-react-icons";
import { HvProvider, HvInput } from "@hitachivantara/uikit-react-core";
import UnitTimePicker from "..";
import { TimePickerUnits } from "../../enums";

describe("UnitTimePicker", () => {
  let wrapper;
  let unitTimePickerComponent;
  let unitTimePickerInstance;
  let mockOnChangeUnitTimeValue;
  const defaultUnitValue = 30;

  beforeEach(async () => {
    mockOnChangeUnitTimeValue = jest.fn();
    wrapper = mount(
      <HvProvider>
        <UnitTimePicker
          unit={TimePickerUnits.MINUTE.type}
          unitValue={defaultUnitValue}
          onChangeUnitTimeValue={mockOnChangeUnitTimeValue}
        />
      </HvProvider>
    );
    unitTimePickerComponent = wrapper.find("UnitTimePicker");
    unitTimePickerInstance = unitTimePickerComponent.instance();
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper.find(UnitTimePicker)).toMatchSnapshot();
  });

  it("isUnitTimeValid - should set the state isValid to true when the value is correct", () => {
    const isValid = unitTimePickerInstance.isUnitTimeValid(40);
    expect(unitTimePickerInstance.state.isValid).toBe(true);
    expect(isValid).toBe(true);
  });

  it("isUnitTimeValid - should set the state isValid to false when the value is incorrect", () => {
    const isValid1 = unitTimePickerInstance.isUnitTimeValid(60);
    expect(unitTimePickerInstance.state.isValid).toBe(false);
    expect(isValid1).toBe(false);
    const isValid2 = unitTimePickerInstance.isUnitTimeValid(1);
    expect(unitTimePickerInstance.state.isValid).toBe(true);
    expect(isValid2).toBe(true);
    const isValid3 = unitTimePickerInstance.isUnitTimeValid(-1);
    expect(unitTimePickerInstance.state.isValid).toBe(false);
    expect(isValid3).toBe(false);
  });

  it("changeTimeUnit - should set the state currentValue with the new unit value", () => {
    unitTimePickerInstance.changeTimeUnit(40);
    expect(unitTimePickerInstance.state.currentValue).toBe(40);
  });

  it("changeTimeUnit - should call the onChangeUnitTimeValue callback if the value is valid", () => {
    unitTimePickerInstance.changeTimeUnit(40);
    expect(mockOnChangeUnitTimeValue).toHaveBeenCalledWith(40);
  });

  it("changeTimeUnit - should not call the onChangeUnitTimeValue callback if the value is invalid", () => {
    unitTimePickerInstance.changeTimeUnit(60);
    expect(mockOnChangeUnitTimeValue).not.toHaveBeenCalled();
  });

  it("handleCurrentValueChange - should update the currentValue in the state if the value is valid (has two or less digits)", () => {
    unitTimePickerInstance.handleCurrentValueChange(null, 41);
    expect(unitTimePickerInstance.state.currentValue).toBe(41);
    unitTimePickerInstance.handleCurrentValueChange(null, "42");
    expect(unitTimePickerInstance.state.currentValue).toBe(42);
  });

  it("handleCurrentValueChange - should update the currentValue to empty", () => {
    unitTimePickerInstance.handleCurrentValueChange(null, "");
    expect(unitTimePickerInstance.state.currentValue).toBe("");
  });

  it("handleCurrentValueChange - should not update the currentValue in the state if the value has three digits", () => {
    unitTimePickerInstance.handleCurrentValueChange(100);
    expect(unitTimePickerInstance.state.currentValue).not.toBe(100);
  });

  it("handleCurrentValueChange - should not update the currentValue in the state if the value is not a number", () => {
    unitTimePickerInstance.handleCurrentValueChange("aaa");
    expect(unitTimePickerInstance.state.currentValue).not.toBe("aaa");
  });

  it("handleFocusChange - should update the isFocused in the state to the opposite value", () => {
    unitTimePickerInstance.handleFocusChange();
    expect(unitTimePickerInstance.state.isFocused).toBe(true); // default is false
    unitTimePickerInstance.handleFocusChange();
    expect(unitTimePickerInstance.state.isFocused).toBe(false);
  });

  it("handleAddTime - should update the currentValue in the state by adding 1", () => {
    unitTimePickerInstance.handleAddTime();
    expect(unitTimePickerInstance.state.currentValue).toBe(31);
  });

  it("handleAddTime - should update the currentValue to the minimum possible value when it reaches the maximum", () => {
    unitTimePickerComponent.setState({
      currentValue: TimePickerUnits.MINUTE.max,
    });
    unitTimePickerInstance.handleAddTime();
    expect(unitTimePickerInstance.state.currentValue).toBe(TimePickerUnits.MINUTE.min);
  });

  it("handleSubtractTime - should update the currentValue in the state by subtracting 1", () => {
    unitTimePickerInstance.handleSubtractTime();
    expect(unitTimePickerInstance.state.currentValue).toBe(29);
  });

  it("handleSubtractTime - should update the currentValue to the minimum possible value when it reaches the maximum", () => {
    unitTimePickerComponent.setState({
      currentValue: TimePickerUnits.MINUTE.min,
    });
    unitTimePickerInstance.handleSubtractTime();
    expect(unitTimePickerInstance.state.currentValue).toBe(TimePickerUnits.MINUTE.max);
  });

  it("renderTimeUnit - should return the state currentValue if isFocused", () => {
    unitTimePickerComponent.setState({ currentValue: 20, isFocused: true });
    const timeUnitToRender = unitTimePickerInstance.renderTimeUnit();
    expect(timeUnitToRender).toBe("20");
  });

  it("renderTimeUnit - should return the state currentValue padded with zeros", () => {
    unitTimePickerComponent.setState({ currentValue: 5, isFocused: false });
    const timeUnitToRender = unitTimePickerInstance.renderTimeUnit();
    expect(timeUnitToRender).toBe("05");
  });

  it("render - should render all the components", () => {
    expect(wrapper.find(AddTimeIcon)).toHaveLength(1);
    expect(wrapper.find(HvInput)).toHaveLength(1);
    expect(wrapper.find(SubtractTimeIcon)).toHaveLength(1);
  });
});
