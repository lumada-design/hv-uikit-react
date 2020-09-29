import React, { useContext } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core";
import { HvFormElementContext } from "../FormElement";
import styles from "./styles";

const HvAdornment = (props) => {
  const {
    id,
    classes,
    className,
    icon,
    showWhen = "",
    onClick,
    isVisible = undefined,
    ...others
  } = props;
  const { elementStatus = "", descriptors = {} } = useContext(HvFormElementContext);
  const { HvBaseInput } = descriptors;

  const displayIcon = isVisible ?? (showWhen === "" || elementStatus === showWhen);

  const isClickable = !!onClick;

  return isClickable ? (
    <button
      id={id}
      type="button"
      tabIndex={-1}
      aria-controls={HvBaseInput?.[0]?.id}
      className={clsx(className, classes.root, classes.adornment, classes.adornmentButton, {
        [classes.hideIcon]: !displayIcon,
      })}
      onClick={onClick}
      onKeyDown={() => {}}
      {...others}
    >
      <div className={classes.icon}>{icon}</div>
    </button>
  ) : (
    <div
      id={id}
      className={clsx(className, classes.root, classes.adornment, classes.adornmentIcon, {
        [classes.hideIcon]: !displayIcon,
      })}
      role="presentation"
      {...others}
    >
      <div className={classes.icon}>{icon}</div>
    </div>
  );
};

HvAdornment.propTypes = {
  /**
   * Id to be applied to the root node.
   */
  id: PropTypes.string,
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * A Jss Object used to override or extend the component styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the root container of the input.
     */
    root: PropTypes.string,
    /**
     * Styles applied to all adornments
     */
    adornment: PropTypes.string,
    /**
     * Styles applied to the adornment when acting as a button.
     */
    adornmentIcon: PropTypes.string,
    /**
     * Styles applied to the adornment when acting as a button.
     */
    adornmentButton: PropTypes.string,
    /**
     * Styles applied to icon on action.
     */
    iconAction: PropTypes.string,
    /**
     * Styles applied to the icon.
     */
    icon: PropTypes.string,
    /**
     * Styles applied to the icon when it's supposed to be hidden.
     */
    hideIcon: PropTypes.string,
  }),
  /**
   * The icon to be added into the input.
   */
  icon: PropTypes.node.isRequired,
  /**
   * When the adornment should be displayed.
   */
  showWhen: PropTypes.oneOf(["standBy", "valid", "invalid"]),
  /**
   * Function to be executed when this element is clicked.
   */
  onClick: PropTypes.func,
  /**
   * If this property is defined the adornment visibility will be exclusively controlled by this value.
   */
  isVisible: PropTypes.bool,
};

export default withStyles(styles, { name: "HvAdornment" })(HvAdornment);
