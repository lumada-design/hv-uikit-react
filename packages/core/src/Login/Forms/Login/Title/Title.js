import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core";
import HvTypography from "../../../../Typography";
import styles from "./styles";

/**
 * Builds the title component. This component can be render by the props:
 *  - titleText - overrides the default "Welcome" text.
 *  - logo - an url for a icon to be used in junction with the titleText.
 *  - titleComponent - a component to be render, overriding the titleText.
 *
 * @param props
 * @returns {*}
 * @constructor
 */
const Title = ({ classes, logo, titleText, titleComponent }) => {
  if (titleComponent !== null) {
    return <div className={classes.root}>{titleComponent}</div>;
  }

  return (
    <div className={classes.root}>
      {logo != null && <img src={logo} className={classes.logoImage} alt="Company logo" />}

      <HvTypography
        variant="mTitle"
        className={clsx(classes.titleContainer, {
          [classes.titleNoLogoComponent]: !logo
        })}
      >
        {titleText}
      </HvTypography>
    </div>
  );
};

Title.propTypes = {
  /**
   * The classes object to be applied into the root object.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the component root class.
     */
    root: PropTypes.string,
    /**
     * Styles applied to the component title class.
     */
    titleContainer: PropTypes.string,
    /**
     * Styles applied to the component logo image.
     */
    logoImage: PropTypes.string,
    /**
     * Styles applied to the component when no logo component is passed.
     */
    titleNoLogoComponent: PropTypes.string,
    /**
     * Styles applied to the separator.
     */
    separator: PropTypes.string
  }).isRequired,
  /**
   * The welcome message
   */
  titleText: PropTypes.string,
  /**
   * The url for the logo in the welcome message.
   */
  logo: PropTypes.string,
  /**
   * A component to replace the welcome message
   */
  titleComponent: PropTypes.node
};

Title.defaultProps = {
  logo: null,
  titleText: "Welcome",
  titleComponent: null
};

export default withStyles(styles, { name: "HvLoginTitle" })(Title);
