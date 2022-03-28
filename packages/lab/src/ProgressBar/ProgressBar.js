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
    error,
    undeterminate = false,
    "aria-label": ariaLabel,
    ...others
  } = props;

  const clampedValue = clamp(value, 0, 100);

  return (
    <div
      className={clsx(className, classes.root, classes.progress)}
      role="progressbar"
      aria-valuenow={clampedValue}
      aria-valuemin="0"
      aria-valuemax="100"
      aria-busy={clampedValue !== 100}
      aria-label={ariaLabel}
      {...others}
    >
      <div className={classes.progressContainer}>
        {undeterminate ? (
          <div />
        ) : (
          <div
            style={{ width: `${clampedValue}%` }}
            className={clsx(classes.progressBarLabel, clampedValue === 100 && classes.progressDone)}
          >
            <HvTypography variant="vizText">{`${clampedValue}%`}</HvTypography>
          </div>
        )}
        <div className={classes.progressBarContainer}>
          <div
            style={{ width: `${clampedValue}%` }}
            className={clsx(
              classes.progressBar,
              clampedValue === 100 && classes.progressDone,
              error && classes.progressError
            )}
          />
        </div>
        <span
          aria-live="polite"
          style={{ display: "inline-block", width: "1px", height: "1px", overflow: "hidden" }}
          {...(error && { "aria-invalid": true })}
        >
          {clampedValue}
        </span>
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
  }).isRequired,

  /**
   * The value of the progress bar.
   */
  value: PropTypes.number,
  /**
   * Indicates if there was an error while loading.
   */
  error: PropTypes.bool,
  /**
   * Indicates if it shows or not the value label
   */
  undeterminate: PropTypes.bool,
  /**
   * @ignore
   */
  "aria-label": PropTypes.string,
};

export default withStyles(styles, { name: "HvProgressBar" })(HvProgressBar);
