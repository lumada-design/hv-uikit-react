import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import styles from "./styles";
import background from "./resources/background.svg";

/**
 * Container layout for the login form.
 */
const LoginContainer = ({ id, className, classes, children, customBackground, ...others }) => {
  return (
    <div
      id={id}
      className={clsx(className, classes.root)}
      style={{
        backgroundImage: `url(${customBackground || background})`
      }}
      {...others}
    >
      <div className={classes.formContainer}>{children}</div>
    </div>
  );
};

LoginContainer.propTypes = {
  /**
   * Id to be applied to the root node.
   */
  id: PropTypes.string,
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to root.
     */
    root: PropTypes.string,
    /**
     * Styles applied to the form container.
     */
    formContainer: PropTypes.string
  }).isRequired,
  /**
   *  The form to be rendered.
   */
  children: PropTypes.node.isRequired,
  /**
   *  The path for the custom background image.
   */
  customBackground: PropTypes.string
};

export default withStyles(styles, { name: "HvLoginContainer" })(LoginContainer);
