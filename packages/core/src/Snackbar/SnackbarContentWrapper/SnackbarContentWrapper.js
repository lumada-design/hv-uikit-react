import React from "react";
import PropTypes, { oneOfType } from "prop-types";
import { SnackbarContent, withStyles } from "@material-ui/core";
import iconVariant from "../../utils/iconVariant";
import { setId } from "../../utils";
import ActionsGeneric from "../../ActionsGeneric";
import styles from "./styles";

const HvSnackbarContentWrapper = React.forwardRef((props, ref) => {
  const { id, classes, label, showIcon, customIcon, variant, action, actionCallback, ...others } =
    props;
  const icon = customIcon || (showIcon && iconVariant(variant, "base2"));
  const innerAction = React.isValidElement(action) ? action : [action];

  return (
    <SnackbarContent
      ref={ref}
      id={id}
      classes={{ root: classes.root, message: classes.message }}
      className={classes[variant]}
      message={
        <div id={setId(id, "message")} className={classes.messageSpan}>
          {icon && <div className={classes.iconVariant}>{icon}</div>}
          <div className={classes.messageText}>{label}</div>
          {action && (
            <div id={setId(id, "action")} className={classes.action}>
              <ActionsGeneric
                id={id}
                category="semantic"
                actions={innerAction}
                actionsCallback={actionCallback}
              />
            </div>
          )}
        </div>
      }
      {...others}
    />
  );
});

HvSnackbarContentWrapper.propTypes = {
  /**
   * A Jss Object used to override or extend the styles applied to the HvSnackbarContent.
   */
  classes: PropTypes.instanceOf(Object).isRequired,
  /**
   * Id to be applied to the root node.
   */
  id: PropTypes.string,
  /**
   * The message to display.
   */
  label: PropTypes.node,
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
      disabled: PropTypes.bool,
    }),
  ]),
  /**
   *  The callback function ran when an action is triggered, receiving `action` as param
   */
  actionCallback: PropTypes.func,
};

export default withStyles(styles, { name: "HvSnackbarContentWrapper" })(HvSnackbarContentWrapper);
