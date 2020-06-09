import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core";
import { isNil } from "lodash";
import { HvFormElementContextConsumer } from "../FormElement";
import { getDescriptorMap } from "../FormElement/utils/FormUtils";
import HvTypography from "../../Typography";

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
const HvLabelText = props => {
  const { label, children, classes, id, disabled, ...others } = props;
  const childId = children ? getChildIdToLabel(children, "HvBaseInput") : undefined;
  return (
    <HvFormElementContextConsumer>
      {formContext => {
        const { elementDisabled } = formContext;
        const localDisabled = disabled || elementDisabled;
        return (
          <>
            <HvTypography
              id={id}
              className={clsx(classes.root, {
                [classes.labelDisabled]: localDisabled,
                [classes.childGutter]: !isNil(children)
              })}
              variant="labelText"
              component="label"
              htmlFor={childId}
              {...others}
            >
              {label}
            </HvTypography>
            {children}
          </>
        );
      }}
    </HvFormElementContextConsumer>
  );
};

HvLabelText.propTypes = {
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
  label: PropTypes.string,
  /**
   * If ´true´ the input is disabled.
   */
  disabled: PropTypes.bool
};

export default withStyles(styles, { name: "HvInfoText" })(HvLabelText);
