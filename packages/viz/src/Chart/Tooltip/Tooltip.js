import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import SingleTooltip from "./SingleTooltip";
import MultipleTooltip from "./MultiTooltip";
import styles from "./styles";

const offset = 20;

/**
 * Component responsible for deciding which tooltip should be use and to calculate
 * the exact position where it should be render.
 */
const MainToolTip = ({ classes, coordinates, data, useSingle }) => {
  const { x, y } = coordinates;
  const [style, setStyle] = useState({ left: x, top: y, visibility: "hidden" });
  const ref = useRef(null);

  /**
   * Calculate the position where the tooltip has to render, having in account
   * the dimensions.
   */
  useEffect(() => {
    if (!ref.current || !ref.current.getBoundingClientRect().width) return;

    const { width, height } = ref.current.getBoundingClientRect();

    setStyle({ left: x - width / 2, top: y - height - offset });
  }, [x, y]);

  return (
    <div ref={ref} className={classes.root} style={style}>
      {(useSingle && <SingleTooltip title={data.title} value={data.elements[0].value} />) || (
        <MultipleTooltip data={data} />
      )}
    </div>
  );
};

MainToolTip.propTypes = {
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the barchart root class.
     */
    root: PropTypes.string,
  }).isRequired,
  /**
   * Data of the tooltip.
   */
  data: PropTypes.shape({
    /**
     * Title.
     */
    title: PropTypes.string,
    /**
     * Values of the tooltip.
     */
    elements: PropTypes.arrayOf(
      PropTypes.shape({
        /**
         * Color of the bar.
         */
        color: PropTypes.string,
        /**
         * Name.
         */
        name: PropTypes.string,
        /**
         * Value.
         */
        value: PropTypes.number,
      })
    ),
  }).isRequired,
  /**
   * Coordinates.
   */
  coordinates: PropTypes.shape({
    /**
     * xx's coordinate.
     */
    x: PropTypes.number.isRequired,
    /**
     * yy's coordinate.
     */
    y: PropTypes.number.isRequired,
  }).isRequired,
  /**
   * Defines if should use a single or multiline tooltip.
   */
  useSingle: PropTypes.bool,
};

MainToolTip.defaultProps = {
  useSingle: false,
};

export default withStyles(styles, { name: "HvChartTooltip" })(MainToolTip);
