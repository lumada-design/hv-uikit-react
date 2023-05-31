import { useState } from "react";
import clsx from "clsx";
import {
  DropUpXS as UpIcon,
  DropDownXS as DownIcon,
} from "@hitachivantara/uikit-react-icons";
import { HvToggleButton } from "../..";
import { PeriodOptions } from "../enums";

type PeriodPickerClasses =
  | "periodContainer"
  | "icon"
  | "subtractIcon"
  | "periodToggle";

export interface PeriodPickerProps {
  classes?: Partial<Record<PeriodPickerClasses, string>>;
  /**
   * Callback function called when the period value changes
   */
  onChangePeriod: (value: unknown) => void;
  /** Default period value */
  period?: PeriodOptions;
}

export const PeriodPicker = ({
  classes = {},
  period,
  onChangePeriod,
}: PeriodPickerProps) => {
  const [currentPeriod, setCurrentPeriod] = useState(period ?? "AM");

  /**
   * Gets the new value for the period
   * @returns the new value for the period
   * @memberof UnitTimePicker
   */
  const selectDifferentPeriod = () => {
    return currentPeriod === "AM" ? "PM" : "AM";
  };

  /**
   * Handles the period change
   * @memberof PeriodPicker
   */
  const handleChangePeriod = () => {
    const newPeriod = selectDifferentPeriod();
    setCurrentPeriod(newPeriod);
    onChangePeriod(newPeriod);
  };

  /**
   * Renders the PeriodPicker
   * @memberof UnitTimePicker
   */
  return (
    <div className={classes.periodContainer}>
      <UpIcon className={classes.icon} onClick={handleChangePeriod} />
      <HvToggleButton
        className={classes.periodToggle}
        selected={currentPeriod === "PM"}
        onClick={handleChangePeriod}
      >
        {currentPeriod}
      </HvToggleButton>
      <DownIcon
        className={clsx(classes.icon, classes.subtractIcon)}
        onClick={handleChangePeriod}
      />
    </div>
  );
};
