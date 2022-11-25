import React, { useCallback, useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Dialog } from "@mui/material";
import { withStyles } from "@mui/styles";
import { Close } from "@hitachivantara/uikit-react-icons";
import isNil from "lodash/isNil";
import Button from "../Button";
import { isKeypress, KeyboardCodes, setId } from "../utils";
import styles from "./styles";
import withTooltip from "../withTooltip";
import { getFocusableList } from "../utils/focusableElementFinder";

/**
 * The Dialog component provides a solid foundation for creating dialogs, popovers, lightboxes, etc.
 * It is created by the composition of DialogTitle, DialogContent and DialogActions components, passed as child elements.
 */
const HvDialog = ({
  classes,
  className,
  id,
  children,
  open,
  onClose,
  firstFocusable,
  buttonTitle = "Close",
  fullscreen = false,
  disableBackdropClick = false,
  ...others
}) => {
  const [focusableQueue, setFocusableQueue] = useState(null);

  // Because the `disableBackdropClick` property was deprecated in MUI5
  // and we want to maintain that funcionality to the user we're wrapping
  // the onClose call here to make that check.
  const wrappedClose = (event, reason, bypassValidation = false) => {
    if (bypassValidation) {
      onClose?.(event, reason);
    } else if (!disableBackdropClick) {
      onClose?.(event, reason);
    }
  };

  const measuredRef = useCallback(
    (node) => {
      if (node) {
        const focusableList = getFocusableList(node);
        setFocusableQueue({
          first: focusableList[1],
          last: focusableList[focusableList.length - 2],
        });
        if (isNil(firstFocusable)) focusableList[1].focus();
        else {
          const element = document.getElementById(firstFocusable);
          if (element) element.focus();
          else {
            // eslint-disable-next-line no-console
            console.warn(`firstFocusable element ${firstFocusable} not found.`);
            focusableList[1].focus();
          }
        }
      }
    },
    [firstFocusable]
  );

  const keyDownHandler = (event) => {
    if (isKeypress(event, KeyboardCodes.Tab) && !isNil(event.target) && !isNil(focusableQueue)) {
      if (event.shiftKey && event.target === focusableQueue.first) {
        focusableQueue.last.focus();
        event.preventDefault();
      }
      if (!event.shiftKey && event.target === focusableQueue.last) {
        focusableQueue.first.focus();
        event.preventDefault();
      }
    }
    // Needed as this handler overrides the one in the material ui Modal.
    else if (isKeypress(event, KeyboardCodes.Esc)) {
      if (others.onEscapeKeyDown) {
        others.onEscapeKeyDown(event);
      }

      if (!others.disableEscapeKeyDown) {
        // Swallow the event, in case someone is listening for the escape key on the body.
        event.stopPropagation();

        wrappedClose(event, "escapeKeyDown", true);
      }
    }
  };

  const closeButtonDisplay = () => <Close role="presentation" />;

  const CloseButtonTooltipWrapper = buttonTitle
    ? withTooltip(closeButtonDisplay, buttonTitle, "top")
    : closeButtonDisplay;

  return (
    <Dialog
      className={clsx(classes.root, className)}
      id={id}
      ref={measuredRef}
      open={open}
      PaperProps={{
        classes: {
          root: clsx(classes.paper, { [classes.fullscreen]: fullscreen }),
        },
      }}
      fullScreen={fullscreen}
      BackdropProps={{
        classes: {
          root: classes.background,
        },
      }}
      onClose={(event, reason) => wrappedClose(event, reason)}
      onKeyDown={keyDownHandler}
      aria-modal
      {...others}
    >
      <Button
        id={setId(id, "close")}
        className={classes.closeButton}
        category="ghost"
        onClick={(event) => wrappedClose(event, undefined, true)}
        aria-label={buttonTitle}
      >
        <CloseButtonTooltipWrapper />
      </Button>
      {children}
    </Dialog>
  );
};

HvDialog.propTypes = {
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
     * Style applied to the paper component.
     */
    paper: PropTypes.string,
    /**
     * Style applied to the paper component when it's fullscreen.
     */
    fullscreen: PropTypes.string,
    /**
     * Style applied to the close button.
     */
    closeButton: PropTypes.string,
  }).isRequired,
  /**
   * Components of the Dialog.
   */
  children: PropTypes.node.isRequired,
  /**
   * Current state of the Dialog.
   */
  open: PropTypes.bool.isRequired,
  /**
   * Function executed on close.
   */
  onClose: PropTypes.func,
  /**
   * Element id that should be focus when the Dialog opens.
   */
  firstFocusable: PropTypes.string,
  /**
   * Title for the button close.
   */
  buttonTitle: PropTypes.string,
  /**
   * Set the dialog to fullscreen mode.
   */
  fullscreen: PropTypes.bool,
  /**
   * Prevent closing the dialog when clicking on the backdrop.
   */
  disableBackdropClick: PropTypes.bool,
};

export default withStyles(styles, { name: "HvDialog" })(HvDialog);
