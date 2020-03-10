import React from "react";
import PropTypes, { oneOfType } from "prop-types";
import clsx from "clsx";
import { SnackbarContent } from "@material-ui/core";
import { mapSeverityToVariant, severityIcon } from "./VariantUtils";
import MessageContainer from "./MessageContainer";
import ActionContainer from "./ActionContainer";
import withStyles from "../../styles/withStyles";
import styles from "./styles";

/**
 * Container of banner.
 *
 * @param props
 * @returns {*}
 * @constructor
 */
const HvBannerContentWrapper = React.forwardRef((props, ref) => {
  const {
    id,
    classes,
    showIcon,
    customIcon,
    variant,
    onClose,
    actions,
    actionsCallback,
    actionsPosition,
    content,
    ...other
  } = props;
  const icon =
    customIcon || (showIcon && severityIcon(mapSeverityToVariant(variant)));

  let effectiveActionsPosition = actionsPosition;
  if (actionsPosition === "auto") {
    // default to inline
    // this might try to be more inteligent in the future,
    // taking into account the content lenght, available space,
    // number of actions, etc..
    effectiveActionsPosition = "inline";
  }

  return (
    <div className={classes.outContainer}>
      <SnackbarContent
        ref={ref}
        id={id}
        classes={{
          root: classes.root,
          message: classes.message,
          action: classes.action
        }}
        className={clsx(classes[variant], classes.baseVariant)}
        message={
          <MessageContainer
            id={id}
            icon={icon}
            {...(effectiveActionsPosition === "inline" && {
              actionsOnMessage: actions,
              actionsOnMessageCallback: actionsCallback
            })}
            message={content}
          />
        }
        action={
          <ActionContainer
            id={id}
            onClose={onClose}
            {...(effectiveActionsPosition === "bottom-right" && {
              action: actions,
              actionCallback: actionsCallback
            })}
          />
        }
        {...other}
      />
    </div>
  );
});

HvBannerContentWrapper.propTypes = {
  /**
   * Identifier.
   */
  id: PropTypes.string,
  /**
   * A Jss Object used to override or extend the styles applied to the component.
   */
  classes: PropTypes.instanceOf(Object),
  /**
   * The message to display.
   */
  content: PropTypes.node,
  /**
   * Variant of the snackbar.
   */
  variant: PropTypes.oneOf(["success", "warning", "error", "info", "default"])
    .isRequired,
  /**
   * Controls if the associated icon to the variant should be shown.
   */
  showIcon: PropTypes.bool,
  /**
   * Custom icon to replace the variant default.
   */
  customIcon: PropTypes.node,
  /**
   * onClose function.
   */
  onClose: PropTypes.func.isRequired,
  /**
   * Actions to display on the right side.
   */
  actions: oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        icon: PropTypes.func,
        disabled: PropTypes.bool
      })
    )
  ]),
  /**
   *  The callback function ran when an action is triggered, receiving ´action´ as param
   */
  actionsCallback: PropTypes.func,
  /**
   * The position property of the header.
   */
  actionsPosition: PropTypes.PropTypes.oneOf(["auto", "inline", "bottom-right"])
};

HvBannerContentWrapper.defaultProps = {
  id: null,
  classes: null,
  content: "",
  showIcon: false,
  customIcon: null,
  actions: null,
  actionsCallback: () => {},
  actionsPosition: "auto"
};

export default withStyles(styles, { name: "HvBannerContentWrapper" })(
  HvBannerContentWrapper
);
