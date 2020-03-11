import React from "react";
import PropTypes, { oneOfType } from "prop-types";
import { SnackbarContent, withStyles } from "@material-ui/core";
import TextTruncate from "./MultiLineEllipsis";
import variantIcon from "./VariantIcons";
import Actions from "../../Actions";
import styles from "./styles";

const HvSnackbarContentWrapper = React.forwardRef((props, ref) => {
  const {
    id,
    classes,
    label,
    showIcon,
    customIcon,
    variant,
    action,
    actionCallback,
    ...other
  } = props;
  const icon = customIcon || (showIcon && variantIcon(variant));
  const innerAction = React.isValidElement(action) ? action : [action];

  return (
    <SnackbarContent
      ref={ref}
      id={id}
      classes={{ root: classes.root, message: classes.message }}
      className={classes[variant]}
      message={
        <div {...(id && { id: `${id}-message` })} className={classes.messageSpan}>
          {icon && <div className={classes.iconVariant}>{icon}</div>}
          <TextTruncate
            {...(id && { id: `${id}-message-text` })}
            containerClassName={classes.messageText}
            line={3}
            text={label}
            textElement="div"
          />
          {action && (
            <div {...(id && { id: `${id}-action` })} className={classes.action}>
              <Actions category="semantic" actions={innerAction} actionsCallback={actionCallback} />
            </div>
          )}
        </div>
      }
      {...other}
    />
  );
});

HvSnackbarContentWrapper.propTypes = {
  /**
   * A Jss Object used to override or extend the styles applied to the button.
   */
  classes: PropTypes.instanceOf(Object).isRequired,
  /**
   * Id to be applied to the root node.
   */
  id: PropTypes.string,
  /**
   * The message to display.
   */
  label: PropTypes.string,
  /**
   * Variant of the snackbar.
   */
  variant: PropTypes.oneOf(["default", "success", "error"]).isRequired,
  /**
   * Controls if the associated icon to the variant should be shown.
   */
  showIcon: PropTypes.bool,
  /**
   * Custom icon to replace the variant default.
   */
  customIcon: PropTypes.node,
  /**
   * Action to display.
   */
  action: oneOfType([
    PropTypes.node,
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      icon: PropTypes.func,
      disabled: PropTypes.bool
    })
  ]),
  /**
   *  The callback function ran when an action is triggered, receiving ´action´ as param
   */
  actionCallback: PropTypes.func
};

HvSnackbarContentWrapper.defaultProps = {
  id: undefined,
  label: "",
  showIcon: false,
  customIcon: null,
  action: null,
  actionCallback: () => {}
};

export default withStyles(styles, { name: "HvSnackbarContentWrapper" })(HvSnackbarContentWrapper);
