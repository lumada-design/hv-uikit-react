import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import clamp from "lodash/clamp";
import { HvTypography } from "@hitachivantara/uikit-react-core";

import { withStyles } from "@material-ui/core";

import styles from "./styles";

/**
 * ProgressBar provides feedback about a process that is taking place in the application.
 */
const HvProgressBar = (props) => {
  const {
    className,
    classes,
    value = 0,
    status,
    undeterminate = false,
    labelProps,
    ...others
  } = props;

  const clampedValue = clamp(value, 0, 100);

  return (
    <div
      className={clsx(className, classes.root, classes.progress)}
      role="progressbar"
      status="inProgress"
      aria-valuenow={clampedValue} // it only makes sense to put this in ariaProps if the min and max values of the progress bar are intended to be changed by the user
      aria-valuemin="0"
      aria-valuemax="100"
      {...others}
    >
      <div className={classes.progressContainer}>
        <HvTypography
          variant="vizText"
          style={{ width: `${clampedValue}%` }}
          className={clsx(
            classes.progressBarLabel,
            status === "completed" && classes.progressDone,
            undeterminate && classes.progressBarLabelHidden
          )}
          {...labelProps}
        >
          {`${clampedValue}%`}
        </HvTypography>
        <div className={classes.progressBarContainer}>
          <div
            style={{ width: `${clampedValue}%` }}
            className={clsx(
              classes.progressBar,
              status === "completed" && classes.progressDone,
              status === "error" && classes.progressError
            )}
          />
        </div>
      </div>
    </div>
  );
};

HvProgressBar.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the component root class.
     */
    root: PropTypes.string,

    /**
     * Style applied to the overall container when in progress mode.
     */
    progress: PropTypes.string,
    /**
     * Style applied to the specifc container when in progress mode.
     */
    progressContainer: PropTypes.string,
    /**
     * Style applied to progress bar container.
     */
    progressBarContainer: PropTypes.string,
    /**
     * Style applied to the progress bar.
     */
    progressBar: PropTypes.string,
    /**
     * Style applied to the progress bar when the loading is done.
     */
    progressDone: PropTypes.string,
    /**
     * Style applied to the progress bar when an error occurs.
     */
    progressError: PropTypes.string,
    /**
     * Style applied to the progress bar label.
     */
    progressBarLabel: PropTypes.string,
    /**
     * Style applied to the progress bar label.
     */
    progressBarLabelHidden: PropTypes.string,
  }).isRequired,

  /**
   * The value of the progress bar.
   */
  value: PropTypes.number,
  /**
   * The status of the progress bar.
   *
   * inProgress is black, error is red and completed is green.
   *
   * When uncontrolled and unspecified it will default to "inProgress".
   */
  status: PropTypes.oneOf(["inProgress", "completed", "error"]),
  /**
   * If `true` the progress bar will not show the percentage label.
   */
  undeterminate: PropTypes.bool,
  /**
   * Aria Properties passed on to the progress bar.
   */
  labelProps: PropTypes.instanceOf(Object),
};

export default withStyles(styles, { name: "HvProgressBar" })(HvProgressBar);
