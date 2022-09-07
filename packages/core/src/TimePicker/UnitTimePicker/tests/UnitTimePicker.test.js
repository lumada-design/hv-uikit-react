import React from "react";
import { render } from "testing-utils";
import { HvProvider } from "../../..";
import UnitTimePicker from "..";
import { TimePickerUnits } from "../../enums";

describe("UnitTimePicker", () => {
  let mockOnChangeUnitTimeValue;
  const defaultUnitValue = 30;

  beforeEach(async () => {
    mockOnChangeUnitTimeValue = jest.fn();
  });

  it("should render correctly", () => {
    const { container } = render(
      <UnitTimePicker
        unit={TimePickerUnits.MINUTE.type}
        unitValue={defaultUnitValue}
        onChangeUnitTimeValue={mockOnChangeUnitTimeValue}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it("should render the input with the correct unit value", () => {
    const { getByRole } = render(
      <HvProvider cssBaseline={false}>
        <UnitTimePicker
          id="unittimepicker"
          unit={TimePickerUnits.MINUTE.type}
          unitValue={defaultUnitValue}
          onChangeUnitTimeValue={mockOnChangeUnitTimeValue}
        />
      </HvProvider>
    );
    expect(getByRole("spinbutton")).toHaveValue(30);
  });
});
