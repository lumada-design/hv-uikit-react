import React from "react";
import userEvent from "@testing-library/user-event";
import { render } from "testing-utils";
import { HvProvider } from "../../..";
import PeriodPicker from "..";
import { PeriodPickerOptions } from "../../enums";

describe("PeriodPicker", () => {
  let mockOnChangePeriod;
  const defaultPeriod = PeriodPickerOptions.AM;

  beforeEach(async () => {
    mockOnChangePeriod = jest.fn();
  });

  it("should rednder correctly", () => {
    const { container } = render(
      <HvProvider cssBaseline="none">
        <PeriodPicker period={defaultPeriod} onChangePeriod={mockOnChangePeriod} />
      </HvProvider>
    );
    expect(container).toMatchSnapshot();
  });

  it("should change the period after clicking the period selector", () => {
    const { getByRole, getByText, queryByText } = render(
      <HvProvider cssBaseline="none">
        <PeriodPicker period={defaultPeriod} onChangePeriod={mockOnChangePeriod} />
      </HvProvider>
    );
    expect(getByText("AM")).toBeInTheDocument();
    const btn = getByRole("button");
    userEvent.click(btn);
    expect(queryByText("AM")).not.toBeInTheDocument();
    expect(getByText("PM")).toBeInTheDocument();
  });
});
