import React, { useContext } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core";
import { HvFormElementContext } from "../FormElement";
import { HvTypography } from "../..";
import { setId } from "../../utils";
import styles from "./styles";

/**
 * Provides the user with additional descriptive text for the form element.
 */
const HvInfoMessage = (props) => {
  const {
    label,
    children,
    classes,
    className,
    id,
    disabled,
    disableGutter = false,
    ...others
  } = props;
  const { elementId, elementDisabled } = useContext(HvFormElementContext);
  const localDisabled = disabled || elementDisabled;
  const localId = id ?? setId(elementId, "description");

  return (
    <HvTypography
      id={localId}
      className={clsx(className, classes.root, {
        [classes.infoDisabled]: localDisabled,
        [classes.gutter]: !disableGutter,
      })}
      variant="normalText"
      component="label"
      {...others}
    >
      {children}
    </HvTypography>
  );
};

HvInfoMessage.formElementType = "description";

HvInfoMessage.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
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
    root: PropTypes.string,
    /**
     * Styles applied when the text should be shown.
     */
    infoDisabled: PropTypes.string,
    /**
     * Separation for the message.
     */
    gutter: PropTypes.string,
  }).isRequired,
  /**
   * The children to label.
   * If defined the aria-labelledby prop will be overriden for this element id.
   */
  children: PropTypes.node,
  /**
   * The text to be shown by the label.
   */
  label: PropTypes.node,
  /**
   * If `true` the label is disabled.
   */
  disabled: PropTypes.bool,
  /**
   * If `true` the info message won't have margins.
   */
  disableGutter: PropTypes.bool,
};

export default withStyles(styles, { name: "HvInfoMessage" })(HvInfoMessage);
