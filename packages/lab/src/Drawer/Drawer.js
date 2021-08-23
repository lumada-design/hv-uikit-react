import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Drawer, withStyles } from "@material-ui/core";
import { Close } from "@hv/uikit-react-icons";
import Button from "../../../core/src/Button";
import { setId } from "../../../core/src/utils";
import styles from "./styles";
import withTooltip from "../../../core/src/withTooltip";

/**
 * The Drawer component provides a foundation to create a sliding pane.
 * It only provides the pane with a close button, the rest of the
 * content can be customized.
 */
const HvDrawer = ({
  className,
  classes,
  id,
  children,
  open,
  onClose,
  anchor = "right",
  buttonTitle = "Close",
  ...others
}) => {
  const closeButtonDisplay = () => <Close role="presentation" />;

  const CloseButtonTooltipWrapper = buttonTitle
    ? withTooltip(closeButtonDisplay, buttonTitle, "top")
    : closeButtonDisplay;

  return (
    <Drawer
      className={clsx(classes.root, className)}
      id={id}
      anchor={anchor}
      open={open}
      PaperProps={{
        classes: {
          root: classes.paper,
        },
      }}
      BackdropProps={{
        classes: {
          root: classes.background,
        },
      }}
      onClose={(event, reason) => onClose(event, reason)}
      {...others}
    >
      <Button
        id={setId(id, "close")}
        className={classes.closeButton}
        category="ghost"
        onClick={onClose}
        aria-label={buttonTitle}
      >
        <CloseButtonTooltipWrapper />
      </Button>
      {children}
    </Drawer>
  );
};

HvDrawer.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * Id to be applied to the root node.
   */
  id: PropTypes.string,
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Style applied to the root of the component.
     */
    root: PropTypes.string,
    /**
     * Style applied to the background (outside) of the component.
     */
    background: PropTypes.string,
    /**
     * Style applied to the component (root).
     */
    paper: PropTypes.string,
    /**
     * Style applied to the close button.
     */
    closeButton: PropTypes.string,
  }).isRequired,
  /**
   * Components of the Drawer.
   */
  children: PropTypes.node.isRequired,
  /**
   * Current state of the Drawer.
   */
  open: PropTypes.bool.isRequired,
  /**
   * Function executed on close.
   * Extended from Modal from material-ui
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"escapeKeyDown"`, `"backdropClick"`.
   */
  onClose: PropTypes.func.isRequired,
  /**
   * The side the drawer opens from.
   */
  anchor: PropTypes.oneOf(["left", "top", "right", "bottom"]),
  /**
   * Title for the button close.
   */
  buttonTitle: PropTypes.string,
};

export default withStyles(styles, { name: "HvDrawer" })(HvDrawer);
