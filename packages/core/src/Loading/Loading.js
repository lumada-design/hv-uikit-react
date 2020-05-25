import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import range from "lodash/range";
import { withStyles } from "@material-ui/core";
import { HvTypography } from "../..";
import styles from "./styles";

const Loading = ({
  className,
  classes,
  small = false,
  text,
  isActive = false,
  color,
  children,
  others
}) => {
  const [overlayPosition, setOverlayPosition] = useState({});
  const ref = useRef();

  const size = small ? "small" : "regular";

  const specificColor = color ? "-color" : "";

  useEffect(() => {
    if (children && ref.current) {
      const { clientHeight, clientWidth, offsetTop, offsetLeft } = ref.current;
      setOverlayPosition({
        top: offsetTop,
        left: offsetLeft,
        height: clientHeight,
        width: clientWidth
      });
    }
  }, []);
  const barsRender = () => (
    <>
      {isActive && (
        <div className={clsx(className, classes.root)} {...others}>
          <div className={classes.barContainer}>
            {range(0, 3).map(e => (
              <div key={e} className={clsx(classes.loadingBar, `${size}${specificColor}`)} />
            ))}
          </div>
          {text && (
            <div className={classes.loadingText}>
              <HvTypography>{text}</HvTypography>
            </div>
          )}
        </div>
      )}
    </>
  );

  const hocRender = () => (
    <>
      <div
        style={{ ...overlayPosition }}
        className={clsx(classes.overlay, { [classes.blur]: isActive })}
      >
        {barsRender()}
      </div>
      {React.cloneElement(children, { ref })}
    </>
  );

  return children ? hocRender() : barsRender();
};
Loading.propTypes = {
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
     * Style applied to the text.
     */
    loadingText: PropTypes.string,
    /**
     * Style applied to the overlay
     */
    overlay: PropTypes.string,
    /**
     * Style to display overlay.
     */
    blur: PropTypes.string
  }).isRequired,
  /**
   * Indicates if the component should be render in a small size.
   */
  small: PropTypes.bool,
  /**
   * The text to be displayed.
   */
  text: PropTypes.string,
  /**
   * Activates the loading visualization.
   */
  isActive: PropTypes.bool,
  /**
   * Color applied to the bars.
   */
  color: PropTypes.string,
  /**
   * Children
   */
  children: PropTypes.node
};

export default withStyles(styles, { name: "HvLoading" })(Loading);
