import { clsx } from "clsx";
import { isKeypress, keyboardCodes } from "@core/utils";
import { getMonthNamesList } from "../../utils";
import { ViewMode } from "../../enums";
import monthSelectorClasses, {
  HvMonthSelectorClasses,
} from "./monthSelectorClasses";
import {
  StyledCalendarMonthlyCell,
  StyledCalendarMonthlyGrid,
  StyledFocusSelection,
} from "./MonthSelector.styles";
import { DateRangeProp, VisibilitySelectorActions } from "../../Calendar";

export const HvMonthSelector = ({
  classes,
  id,
  locale,
  onChange,
  onViewModeChange,
  rangeMode,
  visibleMonth,
  ...others
}: HvMonthSelectorProps) => {
  const listMonthNamesShort = getMonthNamesList(locale, "short");
  const onKeyDownHandler = (event, index) => {
    if (isKeypress(event, keyboardCodes.Enter)) {
      onChange?.(event, "month", index + 1);
      onViewModeChange("calendar");
    }
  };
  return (
    <StyledCalendarMonthlyGrid
      className={clsx(
        monthSelectorClasses.calendarMonthlyGrid,
        classes?.calendarMonthlyGrid,
        rangeMode
          ? clsx(monthSelectorClasses.rangeModeWidth, classes?.rangeModeWidth)
          : clsx(monthSelectorClasses.normalWidth, classes?.normalWidth)
      )}
    >
      {listMonthNamesShort.map((monthName, index) => (
        <StyledFocusSelection
          className={clsx(
            monthSelectorClasses.focusSelection,
            classes?.focusSelection
          )}
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
          <StyledCalendarMonthlyCell
            className={clsx(
              monthSelectorClasses.calendarMonthlyCell,
              classes?.calendarMonthlyCell,
              index + 1 === visibleMonth &&
                clsx(
                  monthSelectorClasses.calendarMonthlyCellSelected,
                  classes?.calendarMonthlyCellSelected
                )
            )}
          >
            {monthName}
          </StyledCalendarMonthlyCell>
        </StyledFocusSelection>
      ))}
    </StyledCalendarMonthlyGrid>
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
