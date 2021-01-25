import React from "react";
import PropTypes from "prop-types";
import { Box, withStyles } from "@material-ui/core";
import { HvTypography } from "@hv/uikit-react-core";
import clsx from "clsx";
import { bannerStyles } from "./styles";

const CookiesConsentBanner = ({ classes, title, description, buttons, ...others }) => {
  return (
    <Box className={clsx(classes.root)} {...others}>
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
   * A Jss Object used to override or extend the styles applied to the form composer.
   */
  classes: PropTypes.instanceOf(Object).isRequired,
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

export default withStyles(bannerStyles, { name: "CookiesConsentBanner" })(CookiesConsentBanner);
