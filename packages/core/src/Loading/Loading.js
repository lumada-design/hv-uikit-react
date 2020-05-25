import React, { useEffect, useRef, useState } from "react";
import useResizeAware from "react-resize-aware";
import PropTypes from "prop-types";
import clsx from "clsx";
import range from "lodash/range";
import { useTheme, withStyles } from "@material-ui/core";
import { HvTypography } from "../..";
import styles from "./styles";

/**
 * The Loading component as two forms of working:
 * - As a normal component inline when no children is passed;
 * - As a HOC when a children is passed
 */
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
  const [resizeListener, sizes] = useResizeAware();
  const [overlayPosition, setOverlayPosition] = useState({});
  const ref = useRef();
  const theme = useTheme();

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
  }, [children, sizes.width, sizes.height]);

  const getColor = noColor => (color ? theme.palette[color] || color : theme.palette[noColor]);

  const size = small ? "small" : "regular";
  const colorVariant = color ? "Color" : "";
  const variant = `${size}${colorVariant}`;

  const inline = { background: getColor(small ? "acce1" : "acce3") };

  const barsRender = () => (
    <>
      {isActive && (
        <div className={clsx(className, classes.root)} {...others}>
          <div className={classes.barContainer}>
            {range(0, 3).map(e => (
              <div key={e} style={inline} className={clsx(classes.loadingBar, classes[variant])} />
            ))}
          </div>
          {text && <HvTypography className={classes.loadingText}>{text}</HvTypography>}
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
      {resizeListener}
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
