import React from "react";
import PropTypes from "prop-types";
import { LinearProgress } from "@material-ui/core";

import useStyles from "./styles";

export const normalizeProgressBar = (value, max) => {
  return max > 0 ? Math.floor((value * 100) / max) : 0;
};

const HvProgressColumnCell = ({ partial, total, color = "primary" }) => {
  const classes = useStyles();
  const percentage = normalizeProgressBar(partial, total);

  return (
    <div className={classes.root}>
      <div className={classes.linearProgressContainer}>
        <LinearProgress
          className={classes.linearProgress}
          classes={{
            colorPrimary: classes.linearProgressColorPrimary,
            barColorPrimary: classes.linearProgressBarColorPrimary,
            barColorSecondary: classes.linearProgressBarColorSecondary,
          }}
          color={color}
          variant="determinate"
          value={percentage}
        />
      </div>
    </div>
  );
};

HvProgressColumnCell.propTypes = {
  /**
   * Current value of the bar.
   */
  partial: PropTypes.number,
  /**
   * Maximum value of the bar.
   */
  total: PropTypes.number,
  /**
   * The color of the bar.
   */
  color: PropTypes.oneOf(["primary", "secondary"]),
};

export default HvProgressColumnCell;
