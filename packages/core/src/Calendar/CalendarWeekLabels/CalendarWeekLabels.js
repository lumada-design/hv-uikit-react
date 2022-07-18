import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@mui/styles";
import { HvTypography } from "../..";
import styles from "./styles";

const HvCalendarWeekLabel = ({ classes, labels = [] }) => {
  return labels.map((dayName, index) => {
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
   * Localized day of week labels.
   */
  labels: PropTypes.arrayOf(PropTypes.string),
  /**
   * Callback to define the input date.
   */
  onChange: PropTypes.func,
};

export default withStyles(styles, { name: "HvCalendarWeekLabel" })(HvCalendarWeekLabel);
