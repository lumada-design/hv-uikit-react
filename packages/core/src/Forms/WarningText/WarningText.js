import React, { useContext } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import isNil from "lodash/isNil";
import { Fail } from "@hitachivantara/uikit-react-icons";
import { withStyles } from "@mui/styles";
import { HvFormElementContext } from "../FormElement";
import { HvTypography } from "../..";
import { setId } from "../../utils";
import styles from "./styles";

/**
 * Provides the user with a descriptive text, signaling an error, for when the form element is in an invalid state.
 */
const HvWarningText = (props) => {
  const {
    children,
    adornment,
    isVisible,
    classes,
    className,
    id,
    disabled,
    disableGutter = false,
    disableBorder = false,
    disableAdornment = false,
    hideText = false,
    ...others
  } = props;

  const { elementId, elementStatus, elementDisabled } = useContext(HvFormElementContext);
  const localDisabled = disabled || elementDisabled;
  const localVisible = !isNil(isVisible) ? isVisible : elementStatus === "invalid";
  const localId = id ?? setId(elementId, "error");
  const showWarning = localVisible && !localDisabled;
  const content = showWarning ? children : "";
  const localAdornment = adornment || <Fail className={classes.defaultIcon} semantic="sema4" />;

  return (
    <div
      className={clsx(className, classes.root, {
        [classes.show]: showWarning,
        [classes.topBorder]: !disableBorder,
      })}
    >
      {!disableAdornment && localAdornment}
      <HvTypography
        id={localId}
        className={clsx(classes.warningText, {
          [classes.topGutter]: !disableGutter,
          [classes.hideText]: hideText,
        })}
        aria-live="polite"
        aria-atomic="true"
        aria-relevant="additions text"
        {...others}
      >
        {showWarning && content}
      </HvTypography>
    </div>
  );
};

HvWarningText.formElementType = "errormessage";

HvWarningText.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * The description to be shown by this helper text
   */
  children: PropTypes.node,
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
    show: PropTypes.string,
    /**
     * Separation between text and upper element.
     */
    topGutter: PropTypes.string,
    /**
     * The top border.
     */
    topBorder: PropTypes.string,
    /**
     * Styles applied to the text when the error are is active
     * but the text is to be not visible.
     */
    hideText: PropTypes.string,
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
  disableGutter: PropTypes.bool,
  /**
   * If `true` the text won't include the top border.
   */
  disableBorder: PropTypes.bool,
  /**
   * If `true` the adornment icon isn't shown.
   */
  disableAdornment: PropTypes.bool,
  /**
   * If `true` the text isn't shown.
   */
  hideText: PropTypes.bool,
};

export default withStyles(styles, { name: "HvWarningText" })(HvWarningText);
