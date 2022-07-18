import React, { useContext } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@mui/styles";
import { HvFormElementContext } from "../FormElement";
import { findDescriptors } from "../FormElement/utils/FormUtils";
import { HvTypography } from "../..";
import { setId } from "../../utils";
import styles from "./styles";

/**
 * Provides the user with a recognizable name for a given form element.
 */
const HvLabel = (props) => {
  const {
    label,
    children,
    classes,
    className,
    id,
    disabled,
    required,
    htmlFor: htmlForProp,
    ...others
  } = props;
  const { elementId, elementDisabled, elementRequired } = useContext(HvFormElementContext);

  const localDisabled = disabled || elementDisabled;
  const localRequired = required || elementRequired;

  const localId = id ?? setId(elementId, "label");

  const forId = htmlForProp || findDescriptors(children)?.input?.[0]?.id;

  return (
    <>
      <HvTypography
        id={localId}
        className={clsx(className, classes.root, {
          [classes.labelDisabled]: localDisabled,
          [classes.childGutter]: children && label,
        })}
        variant="highlightText"
        component="label"
        htmlFor={forId}
        {...others}
      >
        {label}
        {localRequired && <span aria-hidden="true">*</span>}
      </HvTypography>
      {children}
    </>
  );
};

HvLabel.formElementType = "label";

HvLabel.propTypes = {
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
    labelDisabled: PropTypes.string,
    /**
     * Separation between the label and the children.
     */
    childGutter: PropTypes.string,
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
   * The id of the form element the label is bound to.
   */
  htmlFor: PropTypes.string,
  /**
   * If `true` the label is displayed with a disabled style.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the label will indicate that the form element is required (an `*` after the label text).
   */
  required: PropTypes.bool,
};

export default withStyles(styles, { name: "HvLabel" })(HvLabel);
