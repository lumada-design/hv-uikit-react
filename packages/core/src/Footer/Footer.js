import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { withStyles } from "@mui/styles";
import { HvTypography } from "..";
import styles from "./styles";

/**
 * A Footer is a way of providing extra information at the end of a page.
 */
const HvFooter = (props) => {
  const {
    className,
    classes,
    name = "Hitachi Vantara",
    copyright = `© Hitachi Vantara Corporation ${new Date().getFullYear()}. All Rights Reserved.`,
    links,
    ...others
  } = props;

  return (
    <footer className={clsx(className, classes.root)} {...others}>
      <HvTypography variant="highlightText" className={classes.name}>
        {name}
      </HvTypography>
      <div className={classes.rightContainer}>
        <HvTypography className={classes.copyright}>{copyright}</HvTypography>
        {links && <div className={classes.separator} />}
        {links}
      </div>
    </footer>
  );
};

HvFooter.propTypes = {
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
    /**
     * Styles applied to name label on the left.
     */
    name: PropTypes.string,
    /**
     * Styles applied to right container, with copyright and links.
     */
    rightContainer: PropTypes.string,
    /**
     *  Styles applied to copyright label on the right.
     */
    copyright: PropTypes.string,
    /**
     * Styles applied to the links node on the right
     */
    links: PropTypes.string,
    /**
     * Styles applied to the separator between copyright and links
     */
    separator: PropTypes.string,
  }).isRequired,
  name: PropTypes.node,
  copyright: PropTypes.node,
  links: PropTypes.node,
};

export default withStyles(styles, { name: "HvFooter" })(HvFooter);
