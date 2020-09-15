import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import { getWeekdayNamesList } from "../utils";
import { REPRESENTATION_VALUES } from "../enums";
import HvTypography from "../../Typography";
import styles from "./styles";

const HvCalendarWeekLabel = ({ classes, locale }) => {
  const listWeekdayNamesNarrow = getWeekdayNamesList(locale, REPRESENTATION_VALUES.NARROW);

  return listWeekdayNamesNarrow.map((dayName, index) => {
    const key = `${dayName}-${index}`;
    return (
      <HvTypography variant="highlightText" className={classes.calendarDay} key={key}>
        {dayName}
      </HvTypography>
    );
  });
};

HvCalendarWeekLabel.propTypes = {
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
  onChange: PropTypes.func
};

export default withStyles(styles, { name: "HvCalendarWeekLabel" })(HvCalendarWeekLabel);
