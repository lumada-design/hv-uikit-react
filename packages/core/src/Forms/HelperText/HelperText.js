import React, { useContext } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core";
import { isEmpty } from "lodash";
import { HvFormElementContext } from "../FormElement";
import { HvTypography } from "../..";
import { setId } from "../../utils";
import styles from "./styles";

/**
 * Component used in conjunction with other form elements, to give extra information about status.
 */
const HvHelperText = props => {
  const {
    children,
    notification = "",
    classes,
    id,
    disabled,
    disableGutter = false,
    ...others
  } = props;
  const { elementId, elementDisabled } = useContext(HvFormElementContext);
  const isVisible = !isEmpty(notification);
  const localDisabled = disabled || elementDisabled;
  const localId = id ?? setId(elementId, "text");

  return (
    <>
      <HvTypography
        id={localId}
        variant="infoText"
        className={clsx({
          [classes.showText]: !isVisible,
          [classes.helperDisabled]: localDisabled,
          [classes.helperText]: !localDisabled,
          [classes.topGutter]: !disableGutter
        })}
        {...others}
      >
        {children}
      </HvTypography>
      <HvTypography
        id={setId(localId, "notification")}
        variant="infoText"
        className={clsx({
          [classes.showText]: isVisible,
          [classes.helperDisabled]: localDisabled,
          [classes.helperText]: !localDisabled,
          [classes.topGutter]: !disableGutter
        })}
        aria-live="polite"
        aria-atomic="true"
        aria-relevant="additions text"
        {...others}
      >
        {notification}
      </HvTypography>
    </>
  );
};

HvHelperText.propTypes = {
  /**
   * The description to be shown by this helper text
   */
  children: PropTypes.node.isRequired,
  /**
   * Id to be applied to the root node.
   */
  id: PropTypes.string,
  /**
   * A Jss Object used to override or extend the component styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the information text.
     */
    helperText: PropTypes.string,
    /**
     * Styles applied when the text should be shown.
     */
    showText: PropTypes.string,
    /**
     * Styles applied when the text is disabled.
     */
    helperDisabled: PropTypes.string,
    /**
     * Separation between text and upper element.
     */
    topGutter: PropTypes.string,
    /**
     * IE11 specific styling.
     */
    "@global": PropTypes.string
  }).isRequired,
  /**
   * The text to replace the description to shown an alert to the user.
   */
  notification: PropTypes.string,
  /**
   * If ´true´ the text is disabled.
   */
  disabled: PropTypes.bool,
  /**
   * If ´true´ the text won't include a top gutter.
   */
  disableGutter: PropTypes.bool
};

export default withStyles(styles, { name: "HvHelperText" })(HvHelperText);
