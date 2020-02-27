import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import useUniqueId from "../useUniqueId";
import styles from "./styles";

const Header = ({ id, classes, position, children }) => {
  const uniqueId = useUniqueId(id, "hv-header-");

  return (
    <div className={classes.root}>
      <div id={uniqueId} className={classes.header} style={{ position }}>
        {children}
      </div>
    </div>
  );
};

Header.propTypes = {
  /**
   * Id to be applied to the root node.
   */
  id: PropTypes.string,
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the component root class.
     */
    root: PropTypes.string,
    /**
     * Styles applied to the component header class.
     */
    header: PropTypes.string
  }).isRequired,
  /**
   * Position of the component.
   */
  position: PropTypes.oneOf([
    "static",
    "relative",
    "fixed",
    "absolute",
    "sticky"
  ]),
  /**
   * Children to be rendered.
   */
  children: PropTypes.node.isRequired
};

Header.defaultProps = {
  id: null,
  position: "fixed"
};

export default withStyles(styles, { name: "HvHeader" })(Header);
