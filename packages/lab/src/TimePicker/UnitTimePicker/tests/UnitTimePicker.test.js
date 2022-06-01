import React from "react";
import { mount } from "enzyme";
import { HvProvider, HvInput } from "@hitachivantara/uikit-react-core";
import {
  DropUpXS as AddTimeIcon,
  DropDownXS as SubtractTimeIcon,
} from "@hitachivantara/uikit-react-icons";
import UnitTimePicker from "..";
import { TimePickerUnits } from "../../enums";

describe("UnitTimePicker", () => {
  let wrapper;
  let mockOnChangeUnitTimeValue;
  const defaultUnitValue = 30;

  beforeEach(async () => {
    mockOnChangeUnitTimeValue = jest.fn();
    wrapper = mount(
      <HvProvider disableCssBaseline>
        <UnitTimePicker
          unit={TimePickerUnits.MINUTE.type}
          unitValue={defaultUnitValue}
          onChangeUnitTimeValue={mockOnChangeUnitTimeValue}
        />
      </HvProvider>
    );
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper.find(UnitTimePicker)).toMatchSnapshot();
  });

  it("render - should render all the components", () => {
    expect(wrapper.find(AddTimeIcon)).toHaveLength(1);
    expect(wrapper.find(HvInput)).toHaveLength(1);
    expect(wrapper.find(SubtractTimeIcon)).toHaveLength(1);
  });
});
