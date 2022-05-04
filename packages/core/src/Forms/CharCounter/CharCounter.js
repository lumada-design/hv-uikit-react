import React, { useContext } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@mui/styles";
import { HvFormElementContext } from "../FormElement";
import { HvTypography } from "../..";
import { setId } from "../../utils";
import styles from "./styles";

/**
 * Displays the capacity and current usage of a text input box (character count by default).
 *
 * Use the character counter when there is a character or word limit.
 * By itself it doesn't block the user from going above the limit.
 */
const HvCharCounter = (props) => {
  const {
    separator = "/",
    maxCharQuantity,
    currentCharQuantity = 0,
    classes,
    className,
    id,
    disabled,
    disableGutter = false,
    ...others
  } = props;
  const { elementId, elementDisabled } = useContext(HvFormElementContext);
  const localDisabled = disabled || elementDisabled;
  const localId = id ?? setId(elementId, "counter");
  const currentId = setId(localId, "currentQuantity");
  const maxQuantityId = setId(localId, "maxQuantity");
  const isOverloaded = currentCharQuantity > maxCharQuantity;

  return (
    <div
      id={localId}
      className={clsx(className, classes.root, {
        [classes.counterDisabled]: localDisabled,
        [classes.gutter]: !disableGutter,
      })}
      aria-live="polite"
      aria-disabled={localDisabled}
      {...others}
    >
      <HvTypography
        id={currentId}
        className={clsx({
          [classes.overloaded]: isOverloaded && !localDisabled,
          [classes.counterDisabled]: localDisabled,
        })}
        variant="highlightText"
        component="label"
      >
        {currentCharQuantity}
      </HvTypography>
      <HvTypography
        id={maxQuantityId}
        className={clsx({
          [classes.overloaded]: isOverloaded && !localDisabled,
          [classes.counterDisabled]: localDisabled,
        })}
        variant="normalText"
        component="label"
      >
        {` ${separator} ${maxCharQuantity}`}
      </HvTypography>
    </div>
  );
};

HvCharCounter.formElementType = "controlled";

HvCharCounter.propTypes = {
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
     * Styles applied to the char counter root container.
     */
    root: PropTypes.string,
    /**
     * Styles applied to the char counter root container when the current char counter higher than the max.
     */
    overloaded: PropTypes.string,
    /**
     * Styles applied when the char counter is disabled.
     */
    counterDisabled: PropTypes.string,
    /**
     * Separation for the counter.
     */
    gutter: PropTypes.string,
  }).isRequired,
  /**
   * The string that separtes the current char quantity from the max quantity.
   */
  separator: PropTypes.string,
  /**
   * The maximum allowed length of the characters.
   */
  maxCharQuantity: PropTypes.number.isRequired,
  /**
   * The current char quantity to be rendered.
   */
  currentCharQuantity: PropTypes.number,
  /**
   * If `true` the counter is disabled.
   */
  disabled: PropTypes.bool,
  /**
   * If `true` the info message won't have margins.
   */
  disableGutter: PropTypes.bool,
};

export default withStyles(styles, { name: "HvCharCounter" })(HvCharCounter);
