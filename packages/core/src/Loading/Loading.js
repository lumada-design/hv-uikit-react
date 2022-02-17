import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import range from "lodash/range";
import clamp from "lodash/clamp";
import { useTheme, withStyles } from "@material-ui/core";
import { HvTypography } from "..";
import styles from "./styles";

/**
 * Loading provides feedback about a process that is taking place in the application.
 */
const HvLoading = ({
  className,
  classes,
  small = false,
  label,
  hidden = false,
  color,
  progress = false,
  value = 0,
  error = false,
  ...others
}) => {
  const theme = useTheme();

  const getColor = (colorName) =>
    color ? theme.palette[color] || color : theme.palette[colorName];

  const size = small ? "small" : "regular";
  const colorVariant = color ? "Color" : "";
  const variant = `${size}${colorVariant}`;

  const inline = { backgroundColor: getColor(small ? "acce1" : "acce3") };

  const clampedValue = clamp(value, 0, 100);
  return (
    <div
      className={clsx(className, classes.root, {
        [classes.hidden]: hidden,
        [classes.progress]: progress,
      })}
      {...others}
    >
      {!progress ? (
        <div className={classes.barContainer}>
          {range(0, 3).map((e) => (
            <div key={e} style={inline} className={clsx(classes.loadingBar, classes[variant])} />
          ))}
        </div>
      ) : (
        <div className={classes.progressContainer}>
          <div
            style={{ width: `${clampedValue}%` }}
            className={clsx(classes.progressBarLabel, clampedValue === 100 && classes.progressDone)}
          >
            <HvTypography variant="vizText">{`${clampedValue}%`}</HvTypography>
          </div>
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
        </div>
      )}
      {!progress && label && <HvTypography className={classes.label}>{label}</HvTypography>}
    </div>
  );
};

HvLoading.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   *  Styles applied to the Drawer Paper element.
   */
  classes: PropTypes.PropTypes.shape({
    /**
     * Style applied to the root of the component
     */
    root: PropTypes.string,
    /**
     * Style applied to the container.
     */
    barContainer: PropTypes.string,
    /**
     * Style applied to the loading bar.
     */
    loadingBar: PropTypes.string,
    /**
     * Style applied to the label text.
     */
    label: PropTypes.string,
    /**
     * Style applied to the overlay
     */
    overlay: PropTypes.string,
    /**
     * Style to display overlay.
     */
    blur: PropTypes.string,
    /**
     * Style applied when when animation is hidden.
     */
    hidden: PropTypes.string,
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
   * Indicates if the component should be render in a small size.
   */
  small: PropTypes.bool,
  /**
   * The label to be displayed.
   */
  label: PropTypes.node,
  /**
   * Whether the loading animation is hidden.
   */
  hidden: PropTypes.bool,
  /**
   * Color applied to the bars.
   */
  color: PropTypes.string,
  /**
   * Indicates if the component should be rendered as a progress bar.
   */
  progress: PropTypes.bool,
  /**
   * The value of the progress bar.
   */
  value: PropTypes.number,
  /**
   * Indicates if there was an error while loading.
   */
  error: PropTypes.bool,
};

export default withStyles(styles, { name: "HvLoading" })(HvLoading);
