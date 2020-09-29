import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import Navigation from "../Navigation";
import { setId } from "../../../utils";
import { isPreviousDateValid, isNextDateValid, getMonthNamesList } from "../../utils";
import { NAV_OPTIONS, VIEW_MODE, REPRESENTATION_VALUES } from "../../enums";
import styles from "./styles";

const HvComposedNavigation = ({
  classes,
  id,
  locale,
  onChange,
  onViewModeChange,
  visibleYear,
  visibleMonth,
  ...others
}) => {
  const listMonthNamesLong = getMonthNamesList(locale, REPRESENTATION_VALUES.LONG);
  const monthName = listMonthNamesLong[visibleMonth - 1];
  const previousYearValid = isPreviousDateValid(visibleYear, 1);
  const nextYearValid = isNextDateValid(visibleYear, 12);
  const previousMonthValid = isPreviousDateValid(visibleYear, visibleMonth);
  const nextMonthValid = isNextDateValid(visibleYear, visibleMonth);

  return (
    <div className={classes.navigationContainer} {...others}>
      <div className={classes.navigationMonth}>
        <Navigation
          id={setId(id, "navigation-month")}
          navigationText={monthName}
          onNavigatePrevious={(event) => {
            onChange?.(event, NAV_OPTIONS.PREVIOUS_MONTH);
          }}
          onNavigateNext={(event) => {
            onChange?.(event, NAV_OPTIONS.NEXT_MONTH);
          }}
          onTextClick={() => {
            onViewModeChange(VIEW_MODE.MONTHLY);
          }}
          className={classes.navigationMonth}
          isPreviousEnabled={previousMonthValid}
          isNextEnabled={nextMonthValid}
        />
      </div>

      <Navigation
        id={setId(id, "navigation-year")}
        navigationText={visibleYear.toString()}
        onNavigatePrevious={(event) => {
          onChange?.(event, NAV_OPTIONS.PREVIOUS_YEAR);
        }}
        onNavigateNext={(event) => {
          onChange?.(event, NAV_OPTIONS.NEXT_YEAR);
        }}
        isPreviousEnabled={previousYearValid}
        isNextEnabled={nextYearValid}
      />
    </div>
  );
};

HvComposedNavigation.propTypes = {
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
};

export default withStyles(styles, { name: "HvComposedNavigation" })(HvComposedNavigation);
