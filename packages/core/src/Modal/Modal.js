import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import FocusTrap from "focus-trap-react";
import { Dialog, withStyles } from "@material-ui/core";
import Close from "@hv/uikit-react-icons/dist/Close";
import Button from "../Button";
import { setId } from "../utils";
import styles from "./styles";
import withTooltip from "../withTooltip";

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
  const initialFocus = firstFocusable
    ? () => {
        if (!document.getElementById(firstFocusable)) {
          // eslint-disable-next-line no-console
          console.warn(`firstFocusable element ${firstFocusable} not found.`);
          return null;
        }
        return document.getElementById(firstFocusable);
      }
    : undefined;

  const closeButtonDisplay = () => <Close role="presentation" />;

  const CloseButtonTooltipWrapper = buttonTitle
    ? withTooltip(closeButtonDisplay, buttonTitle, "right")
    : closeButtonDisplay;

  return (
    <Dialog
      className={clsx(classes.root, className)}
      id={id}
      open={open}
      PaperProps={{
        classes: {
          root: classes.paper
        }
      }}
      BackdropProps={{
        classes: {
          root: classes.background
        }
      }}
      onClose={(event, reason) => onClose(event, reason)}
      {...others}
    >
      <FocusTrap
        focusTrapOptions={{
          escapeDeactivates: false,
          clickOutsideDeactivates: true,
          initialFocus
        }}
      >
        <div aria-modal>
          <Button
            id={setId(id, "close")}
            className={classes.closeButton}
            category="ghost"
            onClick={event => onClose(event)}
            aria-label={buttonTitle}
          >
            <CloseButtonTooltipWrapper />
          </Button>
          {children}
        </div>
      </FocusTrap>
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
    closeButton: PropTypes.string
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
  buttonTitle: PropTypes.string
};

export default withStyles(styles, { name: "HvModal" })(HvModal);
