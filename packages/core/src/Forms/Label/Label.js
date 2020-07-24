import React, { useContext } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core";
import isNil from "lodash/isNil";
import { HvFormElementContext } from "../FormElement";
import { getDescriptorMap } from "../FormElement/utils/FormUtils";
import { HvTypography } from "../..";
import { setId } from "../../utils";
import styles from "./styles";

const getChildIdToLabel = (children, childName) => {
  let childId = "";
  if (Array.isArray(children)) {
    childId = React.Children.forEach(child => {
      const foundId = getDescriptorMap(child, childName)?.id;
      if (!isNil(foundId)) {
        childId = childId.concat(`${foundId} `);
      }
    });
  } else {
    childId = getDescriptorMap(children, childName)?.id;
  }
  return childId;
};

/**
 * Component used in conjunction with other form elements, to give extra information about status.
 * If it receives a children, the component will set itself as a label for the children.
 */
const HvLabel = props => {
  const { label, children, classes, className, id, disabled, ...others } = props;
  const { elementId, elementDisabled } = useContext(HvFormElementContext);
  const childId = children ? getChildIdToLabel(children, "HvBaseInput") : undefined;
  const localDisabled = disabled || elementDisabled;
  const localId = id ?? setId(elementId, "label");

  return (
    <>
      <HvTypography
        id={localId}
        className={clsx(className, classes.root, {
          [classes.labelDisabled]: localDisabled,
          [classes.childGutter]: !isNil(children)
        })}
        variant="highlightText"
        component="label"
        htmlFor={childId}
        {...others}
      >
        {label}
      </HvTypography>
      {children}
    </>
  );
};

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
    childGutter: PropTypes.string
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
   * If ´true´ the label is disabled.
   */
  disabled: PropTypes.bool
};

export default withStyles(styles, { name: "HvLabel" })(HvLabel);
