import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { Box, withStyles } from "@material-ui/core";

import { HvTypography } from "@hv/uikit-react-core";

import styles from "./styles";

const CookiesConsentBanner = (props) => {
  const { className, classes, title, description, buttons, ...others } = props;

  return (
    <Box className={clsx(className, classes.root)} {...others}>
      <div className={clsx(classes.content)}>
        <HvTypography className={clsx(classes.title)} variant="highlightText">
          {title}
        </HvTypography>
        <HvTypography variant="normalText">{description}</HvTypography>
      </div>
      <div className={clsx(classes.actions)}>{buttons}</div>
    </Box>
  );
};

CookiesConsentBanner.propTypes = {
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
     * Styles applied to the content's area.
     */
    content: PropTypes.string,
    /**
     * Styles applied to the title.
     */
    title: PropTypes.string,
    /**
     * Styles applied to the buttons' area.
     */
    actions: PropTypes.string,
  }).isRequired,
  /**
   * The title of the dialog
   */
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  /**
   * The content of the dialog, can be a string or a composition of nodes
   */
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  /**
   * The buttons of the dialog
   */
  buttons: PropTypes.node.isRequired,
};

export default withStyles(styles, { name: "CookiesConsentBanner" })(CookiesConsentBanner);
