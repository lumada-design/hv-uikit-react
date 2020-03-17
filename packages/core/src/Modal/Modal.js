import React, { useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import FocusTrap from "focus-trap-react";
import uniqueId from "lodash/uniqueId";
import { Dialog, withStyles } from "@material-ui/core";
import Close from "@hv/uikit-react-icons/dist/Close";
import Button from "../Button";
import styles from "./styles";

/**
 * Modal component.
 *
 * @param classes
 * @param className
 * @param id
 * @param children
 * @param open
 * @param onClose
 * @param firstFocusable
 * @param buttonTitle
 * @param close
 * @param others
 * @returns {*}
 * @constructor
 */
const Modal = ({
  classes,
  className = "",
  id,
  children,
  open,
  onClose,
  firstFocusable,
  buttonTitle = "Close",
  ...others
}) => {
  const [internalId] = useState(id || uniqueId("hv-modal-"));

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

  return (
    <Dialog
      className={clsx(classes.root, className)}
      id={internalId}
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
            id={`${internalId}-close`}
            className={classes.closeButton}
            category="ghost"
            onClick={event => onClose(event)}
            title={buttonTitle}
          >
            <Close />
          </Button>
          {children}
        </div>
      </FocusTrap>
    </Dialog>
  );
};
Modal.propTypes = {
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

export default withStyles(styles, { name: "HvModal" })(Modal);
