import React, { memo } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import Typography from "../../../Typography";
import styles from "./styles";

/**
 * Tooltip with color representation.
 *
 * @param classes
 * @param data
 * @returns {*}
 * @constructor
 */
const MultiTooltip = ({ classes, data }) => (
  <div className={classes.root}>
    <div className={classes.title}>
      <div>
        <Typography variant="labelText">{data.title}</Typography>
      </div>
    </div>
    <div className={classes.valuesContainer}>
      {data.elements.map(element => (
        <div key={element.name} className={classes.values}>
          <div
            className={classes.color}
            style={{ backgroundColor: element.color }}
          />
          <div className={classes.separatorColor} />
          <div>
            <Typography variant="labelText">{element.name}</Typography>
          </div>
          <div className={classes.separator} />
          <div>
            <Typography variant="sText">{element.value}</Typography>
          </div>
        </div>
      ))}
    </div>
  </div>
);

MultiTooltip.propTypes = {
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the root.
     */
    root: PropTypes.string,
    /**
     * Styles applied to the title.
     */
    title: PropTypes.string,
    /**
     * Styles applied to the values container.
     */
    valuesContainer: PropTypes.string,
    /**
     * Styles applied to the values.
     */
    values: PropTypes.string,
    /**
     * Styles applied to the color.
     */
    color: PropTypes.string,
    /**
     * Styles applied to the separator between color and title.
     */
    separatorColor: PropTypes.string,
    /**
     * Styles applied to the separator.
     */
    separator: PropTypes.string
  }).isRequired,
  /**
   * Data of the tooltip.
   */
  data: PropTypes.shape({
    /**
     * Styles applied to the barchart root class.
     */
    title: PropTypes.string,
    /**
     * Values of tooltip
     */
    elements: PropTypes.arrayOf(
      PropTypes.shape({
        /**
         * Color (in hex).
         */
        color: PropTypes.string,
        /**
         * Name.
         */
        name: PropTypes.string,
        /**
         * Value.
         */
        value: PropTypes.number
      })
    )
  }).isRequired
};

const arePropsEqual = (prevProps, nextProps) =>
  prevProps.data === nextProps.data;

export default withStyles(styles, { name: "HvChartMultiTooltip" })(
  memo(MultiTooltip, arePropsEqual)
);
