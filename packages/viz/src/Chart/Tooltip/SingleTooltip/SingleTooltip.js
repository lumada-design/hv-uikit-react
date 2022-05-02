import React, { memo } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import { HvTypography } from "@hitachivantara/uikit-react-core";
import styles from "./styles";

const SingleTooltip = ({ classes, title, value }) => (
  <div className={classes.root}>
    <div>
      <HvTypography variant="highlightText">{title}</HvTypography>
    </div>
    <div className={classes.separator} />
    <div>
      <HvTypography>{value}</HvTypography>
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
    separator: PropTypes.string,
  }).isRequired,
  /**
   * Title of the chart.
   */
  title: PropTypes.string.isRequired,
  /**
   * Value of the chart.
   */
  value: PropTypes.number.isRequired,
};

const arePropsEqual = (prevProps, nextProps) =>
  prevProps.title === nextProps.title && prevProps.value === nextProps.value;

export default withStyles(styles, { name: "HvChartSingleTooltip" })(
  memo(SingleTooltip, arePropsEqual)
);
