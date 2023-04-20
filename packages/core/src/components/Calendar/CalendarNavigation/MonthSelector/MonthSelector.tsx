import { clsx } from "clsx";
import { isKeypress, keyboardCodes } from "@core/utils";
import { getMonthNamesList } from "../../utils";
import { NAV_OPTIONS, VIEW_MODE, REPRESENTATION_VALUES } from "../../enums";
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
  const listMonthNamesShort = getMonthNamesList(
    locale,
    REPRESENTATION_VALUES.SHORT
  );
  const onKeyDownHandler = (event, index) => {
    if (isKeypress(event, keyboardCodes.Enter)) {
      if (onChange) onChange(event, NAV_OPTIONS.MONTH, index + 1);
      onViewModeChange(VIEW_MODE.CALENDAR);
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
            if (onChange) onChange(event, NAV_OPTIONS.MONTH, index + 1);
            onViewModeChange(VIEW_MODE.CALENDAR);
          }}
          onKeyDown={(event) => onKeyDownHandler(event, index)}
          tabIndex={0}
          {...others}
        >
          <StyledCalendarMonthlyCell
            variant="normalText"
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
  onViewModeChange: (viewMode: string) => void;
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
