import React, { useEffect, useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import styles from "./styles";

/**
 * Loads the default background svg image asynchronously
 */
function useBackground() {
  const [svg, setSvg] = useState();

  useEffect(() => {
    const importIcon = async () => {
      const svgModule = await import(`./resources/background.svg`);
      setSvg(svgModule.default);
    };
    importIcon();
  }, []);

  return svg;
}

/**
 * Container layout for the login form.
 */
const HvLogin = ({ id, className, classes, children, background, ...others }) => {
  const bg = useBackground();

  return (
    <div
      id={id}
      className={clsx(className, classes.root)}
      style={{
        backgroundImage: `url(${background || bg})`,
      }}
      {...others}
    >
      <div className={classes.formContainer}>{children}</div>
    </div>
  );
};

HvLogin.propTypes = {
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
    formContainer: PropTypes.string,
  }).isRequired,
  /**
   *  The form to be rendered.
   */
  children: PropTypes.node.isRequired,
  /**
   *  The path for the background image.
   */
  background: PropTypes.string,
};

export default withStyles(styles, { name: "HvLogin" })(HvLogin);
