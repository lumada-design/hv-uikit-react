import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@mui/styles";
import styles from "./styles";
import Typography from "../../../Typography";

const Label = ({ className, children, classes, ...others }) => (
  <Typography
    component="li"
    variant="highlightText"
    className={clsx(className, classes.root)}
    {...others}
  >
    {children}
  </Typography>
);

Label.propTypes = {
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
  }).isRequired,
  /**
   * Children component.
   */
  children: PropTypes.node.isRequired,
};

export default withStyles(styles, { name: "HvUserPreferencesLabel" })(Label);
