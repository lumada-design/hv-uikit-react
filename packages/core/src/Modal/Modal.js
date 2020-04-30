/*
 * Copyright 2019 Hitachi Vantara Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { useEffect, useState } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import uniqueId from "lodash/uniqueId";
import Dialog from "@material-ui/core/Dialog";
import { isKeypress, KeyboardCodes } from "@hv/uikit-common-utils/dist";
import isNil from "lodash/isNil";
import Close from "@hv/uikit-react-icons/dist/Generic/Close";
import { getFirstAndLastFocus } from "../utils/focusableElementFinder";
import Button from "../Button";

/**
 * Modal component.
 *
 * @param classes
 * @param children
 * @param open
 * @param onClose
 * @param others
 * @returns {*}
 * @constructor
 */
const Main = ({
  classes,
  className,
  id,
  children,
  open,
  onClose,
  firstFocusable,
  buttonTitle,
  ...others
}) => {
  const [internalId] = useState(id || uniqueId("hv-modal-"));
  const [focusableQueue, setFocusableQueue] = useState(null);

  const setFocus = () => {
    const focusable = getFirstAndLastFocus(document.getElementById(internalId));
    setFocusableQueue(focusable);
    if (isNil(firstFocusable)) {
      focusable.first.focus();
    } else {
      const focusElement = document.getElementById(firstFocusable);
      if (!isNil(focusElement)) focusElement.focus();
      // eslint-disable-next-line no-console
      else console.warn(`firstFocusable element ${firstFocusable} not found.`);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (open) {
        setFocus();
      }
    });
  }, [open]);

  const keyDownHandler = event => {
    if (
      isKeypress(event, KeyboardCodes.Tab) &&
      !isNil(event.target) &&
      !isNil(focusableQueue)
    ) {
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
      className={classNames(classes.root, className)}
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
      onKeyDown={keyDownHandler}
      {...others}
    >
      <div aria-modal>
        <Button
          id={`${internalId}-close`}
          className={classes.closeButton}
          category="ghost"
          onClick={event => onClose(event)}
          title={buttonTitle}
        >
          <Close className={classes.iconContainer} />
        </Button>
        {children}
      </div>
    </Dialog>
  );
};
Main.propTypes = {
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

Main.defaultProps = {
  className: "",
  id: undefined,
  firstFocusable: undefined,
  buttonTitle: "Close"
};

export default Main;
