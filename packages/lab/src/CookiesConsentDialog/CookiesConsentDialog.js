import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import styles from "./styles";
import {HvDialog, HvDialogActions, HvDialogContent, HvDialogTitle} from "@hv/uikit-react-core";

/**
 * CookiesConsentDialog description/documentation paragraph
 */
const HvCookiesConsentDialog = (props) => {
  const {
    className,
    classes,
    title,
    description,
    buttons,
    ...others
  } = props;

  return (
    <HvDialog {...others}>
      <HvDialogTitle>{title}</HvDialogTitle>
      <HvDialogContent>{description}</HvDialogContent>
      <HvDialogActions>{buttons}</HvDialogActions>
    </HvDialog>

  );
};

HvCookiesConsentDialog.propTypes = {
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
   * A title
   */
  title: PropTypes.string.isRequired,
  /**
   * A description
   */
  description: PropTypes.oneOfType(PropTypes.string, PropTypes.node).isRequired,
  /**
   * The buttons
   */
  buttons: PropTypes.node.isRequired
};

export default withStyles(styles, { name: "HvCookiesConsentDialog" })(HvCookiesConsentDialog);
