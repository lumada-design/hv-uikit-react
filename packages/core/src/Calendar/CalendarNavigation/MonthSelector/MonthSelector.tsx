import { isKey } from "../../../utils/keyboardUtils";

import { HvTypography } from "../../../Typography";
import { ExtractNames } from "../../../utils/classes";

import { getMonthNamesList } from "../../utils";
import { ViewMode } from "../../enums";
import { DateRangeProp, VisibilitySelectorActions } from "../../types";

import { staticClasses, useClasses } from "./MonthSelector.styles";

export { staticClasses as monthSelectorClasses };

export type HvMonthSelectorClasses = ExtractNames<typeof useClasses>;

export const HvMonthSelector = ({
  classes: classesProp,
  id,
  locale,
  onChange,
  onViewModeChange,
  rangeMode,
  visibleMonth,
  ...others
}: HvMonthSelectorProps) => {
  const { classes, cx } = useClasses(classesProp);

  const listMonthNamesShort = getMonthNamesList(locale, "short");
  const onKeyDownHandler = (event: any, index: number) => {
    if (isKey(event, "Enter")) {
      onChange?.(event, "month", index + 1);
      onViewModeChange("calendar");
    }
  };
  return (
    <div
      className={cx(classes.calendarMonthlyGrid, {
        [classes.rangeModeWidth]: rangeMode,
        [classes.normalWidth]: !rangeMode,
      })}
    >
      {listMonthNamesShort.map((monthName, index) => (
        <div
          className={classes.focusSelection}
          key={monthName}
          role="button"
          onClick={(event) => {
            onChange?.(event, "month", index + 1);
            onViewModeChange("calendar");
          }}
          onKeyDown={(event) => onKeyDownHandler(event, index)}
          tabIndex={0}
          {...others}
        >
          <HvTypography
            className={cx(classes.calendarMonthlyCell, {
              [classes.calendarMonthlyCellSelected]: index + 1 === visibleMonth,
            })}
          >
            {monthName}
          </HvTypography>
        </div>
      ))}
    </div>
  );
};

export interface HvMonthSelectorProps {
  /**
   * A Jss Object used to override or extend the component styles.
   */
  classes?: HvMonthSelectorClasses;
  /**
   * Identifier.
   */
  id?: string;
  /**
   * Locale to be used by the calendar.
   */
  locale?: string;
  /**
   * Callback to define the input date.
   */
  onChange?: (
    event: any,
    action: VisibilitySelectorActions,
    value: Date | DateRangeProp | number
  ) => void;
  /**
   * Callback to define the input date.
   */
  onViewModeChange: (viewMode: ViewMode) => void;
  /**
   * Controls the visible month of the Calendar
   */
  visibleMonth: number;
  /**
   * Controls the visible month of the Calendar
   */
  visibleYear?: number;
  rangeMode?: boolean;
}
