import React, { useCallback, useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Dialog, withStyles } from "@material-ui/core";
import { Close } from "@hitachivantara/uikit-react-icons";
import isNil from "lodash/isNil";
import Button from "../Button";
import { isKeypress, KeyboardCodes, setId } from "../utils";
import styles from "./styles";
import withTooltip from "../withTooltip";
import { getFocusableList } from "../utils/focusableElementFinder";

/**
 * The modal component provides a solid foundation for creating dialogs, popovers, lightboxes, etc.
 * It is created by the composition of ModalTitle, ModalContent and ModalActions, passed as child elements.
 */
const HvModal = ({
  classes,
  className,
  id,
  children,
  open,
  onClose,
  firstFocusable,
  buttonTitle = "Close",
  ...others
}) => {
  const [focusableQueue, setFocusableQueue] = useState(null);

  const measuredRef = useCallback((node) => {
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
  }, []);

  const closeButtonDisplay = () => <Close role="presentation" />;

  const CloseButtonTooltipWrapper = buttonTitle
    ? withTooltip(closeButtonDisplay, buttonTitle, "top")
    : closeButtonDisplay;

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

        if (onClose) {
          onClose(event, "escapeKeyDown");
        }
      }
    }
  };

  return (
    <Dialog
      className={clsx(classes.root, className)}
      id={id}
      ref={measuredRef}
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
      onKeyDown={keyDownHandler}
      {...others}
    >
      <div aria-modal>
        <Button
          id={setId(id, "close")}
          className={classes.closeButton}
          category="ghost"
          onClick={(event) => onClose(event)}
          aria-label={buttonTitle}
        >
          <CloseButtonTooltipWrapper />
        </Button>
        {children}
      </div>
    </Dialog>
  );
};

HvModal.propTypes = {
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
   * Components of the modal.
   */
  children: PropTypes.node.isRequired,
  /**
   * Current state of the modal.
   */
  open: PropTypes.bool.isRequired,
  /**
   * Function executed on close.
   */
  onClose: PropTypes.func.isRequired,
  /**
   * Element id that should be focus when the modal opens.
   */
  firstFocusable: PropTypes.string,
  /**
   * Title for the button close.
   */
  buttonTitle: PropTypes.string,
};

export default withStyles(styles, { name: "HvModal" })(HvModal);
