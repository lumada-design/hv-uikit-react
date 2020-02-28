import React from "react";
import PropTypes from "prop-types";
import HvTypography from "@hv/uikit-react-core/dist/Typography";

const HvFooter = ({ classes, labelLeftName, labelRightName }) => (
  <div className={classes.root}>
    <HvTypography className={classes.labelLeft}>{labelLeftName}</HvTypography>
    <HvTypography className={classes.labelRight}>{labelRightName}</HvTypography>
  </div>
);

HvFooter.propTypes = {
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the component root class.
     */
    root: PropTypes.string,
    /**
     * Styles applied to label on the left.
     */
    labelLeft: PropTypes.string,
    /**
     *  Styles applied to label on the right.
     */
    labelRight: PropTypes.string
  }).isRequired,
  labelLeftName: PropTypes.string,
  labelRightName: PropTypes.string
};

HvFooter.defaultProps = {
  labelLeftName: "Hitachi Vantara",
  labelRightName: `© Hitachi Vantara Corporation ${new Date().getFullYear()}. All Rights Reserved.`
};

export default HvFooter;
