import React, { useContext } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { isNil } from "lodash";
import { Fail } from "@hv/uikit-react-icons";
import { withStyles } from "@material-ui/core";
import { HvFormElementContext } from "../FormElement";
import { HvTypography } from "../..";
import { setId } from "../../utils";
import styles from "./styles";

/**
 * Component used in conjunction with other form elements, to give extra information about status.
 */
const HvWarningText = props => {
  const {
    children,
    adornment,
    isVisible,
    classes,
    className,
    id,
    disabled,
    disableGutter = false,
    ...others
  } = props;

  const { elementId, elementStatus, elementDisabled } = useContext(HvFormElementContext);
  const localDisabled = disabled || elementDisabled;
  const localVisible = !isNil(isVisible) ? isVisible : elementStatus === "invalid";
  const localId = id ?? setId(elementId, "text");
  const showWarning = localVisible && !localDisabled;
  const content = showWarning ? children : "";
  const localAdornment = adornment || <Fail className={classes.defaultIcon} semantic="sema4" />;

  return (
    <div
      className={clsx(classes.root, {
        [classes.showText]: showWarning
      })}
    >
      {localAdornment}
      <HvTypography
        id={setId(localId, "notification")}
        className={clsx(className, classes.warningText, {
          [classes.topGutter]: !disableGutter
        })}
        aria-live="polite"
        aria-atomic="true"
        aria-relevant="additions text"
        {...others}
      >
        {content}
      </HvTypography>
    </div>
  );
};

HvWarningText.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
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
     * Styles applied to the component root class.
     */
    root: PropTypes.string,
    /**
     * Styles applied to the default icon.
     */
    defaultIcon: PropTypes.string,
    /**
     * Styles applied to the warning text.
     */
    warningText: PropTypes.string,
    /**
     * Styles applied when the text should be shown.
     */
    showText: PropTypes.string,
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
   * Icon to be rendered alongside the warning text.
   */
  adornment: PropTypes.node,
  /**
   * If `true` the text is not rendered.
   */
  isVisible: PropTypes.bool,
  /**
   * If `true` the text is disabled.
   */
  disabled: PropTypes.bool,
  /**
   * If `true` the text won't include a gutter.
   */
  disableGutter: PropTypes.bool
};

export default withStyles(styles, { name: "HvWarningText" })(HvWarningText);
