import React, { memo } from "react";
import PropTypes from "prop-types";
import withStyles from "../../../styles/withStyles";
import Typography from "../../../Typography";
import styles from "./styles";

/**
 * Tooltip for the cases with a single group.
 *
 * @param classes
 * @param title
 * @param value
 * @returns {*}
 * @constructor
 */
const SingleTooltip = ({ classes, title, value }) => (
  <div className={classes.root}>
    <div>
      <Typography variant="labelText">{title}</Typography>
    </div>
    <div className={classes.separator} />
    <div>
      <Typography variant="sText">{value}</Typography>
    </div>
  </div>
);

SingleTooltip.propTypes = {
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the root class.
     */
    root: PropTypes.string,
    /**
     * Styles applied to the separator between title and value.
     */
    separator: PropTypes.string
  }).isRequired,
  /**
   * Title of the chart.
   */
  title: PropTypes.string.isRequired,
  /**
   * Value of the chart.
   */
  value: PropTypes.number.isRequired
};

const arePropsEqual = (prevProps, nextProps) =>
  prevProps.title === nextProps.title && prevProps.value === nextProps.value;

export default withStyles(styles, { name: "HvChartSingleTooltip" })(
  memo(SingleTooltip, arePropsEqual)
);
