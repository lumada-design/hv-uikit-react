import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@mui/styles";
import HvTypography from "../../Typography";
import styles from "./styles";

const Brand = ({ classes, className, logo, name, ...others }) => {
  return (
    <div className={clsx(className, classes.root)} {...others}>
      {logo}
      {logo && name && <div className={classes.separator} />}
      {name && <HvTypography variant="highlightText">{name}</HvTypography>}
    </div>
  );
};

Brand.propTypes = {
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the component root class.
     */
    root: PropTypes.string,
    /**
     * Styles applied to the separator component class.
     */
    separator: PropTypes.string,
  }).isRequired,
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * The brand image node.
   */
  logo: PropTypes.node,
  /**
   * The brand name string.
   */
  name: PropTypes.string,
};

export default withStyles(styles, { name: "HvHeaderBrand" })(Brand);
