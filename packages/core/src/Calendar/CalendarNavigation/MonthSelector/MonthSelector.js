import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@mui/styles";
import { isKeypress, KeyboardCodes } from "../../../utils";
import { getMonthNamesList } from "../../utils";
import { NAV_OPTIONS, VIEW_MODE, REPRESENTATION_VALUES } from "../../enums";
import { HvTypography } from "../../..";
import styles from "./styles";

const HvMonthSelector = ({
  classes,
  id,
  locale,
  onChange,
  onViewModeChange,
  rangeMode,
  visibleMonth,
  ...others
}) => {
  const listMonthNamesShort = getMonthNamesList(locale, REPRESENTATION_VALUES.SHORT);
  const onKeyDownHandler = (event, index) => {
    if (isKeypress(event, KeyboardCodes.Enter)) {
      onChange(event, NAV_OPTIONS.MONTH, index + 1);
      onViewModeChange(VIEW_MODE.CALENDAR);
    }
  };
  return (
    <div
      className={clsx(classes.calendarMonthlyGrid, {
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
            onChange(event, NAV_OPTIONS.MONTH, index + 1);
            onViewModeChange(VIEW_MODE.CALENDAR);
          }}
          onKeyDown={(event) => onKeyDownHandler(event, index)}
          tabIndex={0}
          {...others}
        >
          <HvTypography
            variant="normalText"
            className={clsx(classes.calendarMonthlyCell, {
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

HvMonthSelector.propTypes = {
  /**
   * A Jss Object used to override or extend the component styles.
   */
  classes: PropTypes.instanceOf(Object).isRequired,
  /**
   * Identifier.
   */
  id: PropTypes.string,
  /**
   * Locale to be used by the calendar.
   */
  locale: PropTypes.string,
  /**
   * Callback to define the input date.
   */
  onChange: PropTypes.func,
  /**
   * Callback to define the input date.
   */
  onViewModeChange: PropTypes.func,
  /**
   * Controls the visible month of the Calendar
   */
  visibleMonth: PropTypes.number,
  /**
   * Controls the visible month of the Calendar
   */
  visibleYear: PropTypes.number,
  rangeMode: PropTypes.bool,
};

export default withStyles(styles, { name: "HvMonthSelector" })(HvMonthSelector);
