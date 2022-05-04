import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import isNil from "lodash/isNil";
import PropTypes from "prop-types";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { withStyles } from "@mui/styles";

import { getFirstAndLastFocus, isKeypress, KeyboardCodes } from "../utils";
import styles from "./styles";
import Typography from "../Typography";

/**
 * User preferences are a group of configurable settings that can be customized for a particular user.
 *
 * Our implementation of the User Preferences component is divided in:
 * <ul>
 * <li>Actions - container for actions</li>
 * <li>Action - action button</li>
 * <li>Options - container for options</li>
 * <li>Group - creates a division between different sets of option, with the possibility of setting a label</li>
 * <li>Label - Label typography.</li>
 * <li>Option - Option button</li>
 * </ul>
 * To build the User Preferences component, a composition of these elements should be used.
 *
 */
const HvUserPreferences = ({
  className,
  classes,
  isOpen = false,
  toggleOpenCallback,
  children,
  position = "static",
  closeOnExit = false,
  userInfo,
  ...others
}) => {
  const [open, setOpen] = useState(isOpen);
  const [prevPropOpen, setPrevPropOpen] = useState(null);
  const containerRef = useRef(null);
  const focusableList = useRef(null);

  if (isOpen !== prevPropOpen) {
    setOpen(isOpen);
    setPrevPropOpen(isOpen);
  }

  /**
   * Fills the object with the first and last focusable element inside the container.
   * When the container is open the first focusable element is focus.
   */
  useEffect(() => {
    setTimeout(() => {
      if (open) {
        focusableList.current = getFirstAndLastFocus(containerRef.current);
        if (focusableList.current.first) focusableList.current.first.focus();
      }
    });
  }, [open]);

  /**
   * Toggle the open state based on the received parameter.
   */
  const toggleOpen = useCallback(
    (newState = null) => {
      if (newState !== null) {
        if (newState !== open) {
          setOpen(newState);
        } else {
          return;
        }
      } else {
        setOpen((prevState) => !prevState);
      }
      toggleOpenCallback?.(newState);
    },
    [toggleOpenCallback, open]
  );

  /**
   * Handler of keyboard clicks.
   */
  const handlerKeyContainer = useCallback(
    (event) => {
      if (closeOnExit) {
        if (
          isKeypress(event, KeyboardCodes.Tab) &&
          !isNil(event.target) &&
          !isNil(focusableList.current) &&
          !isNil(focusableList.current.first)
        ) {
          if (
            (event.shiftKey && event.target.id === focusableList.current.first.id) ||
            (!event.shiftKey && event.target.id === focusableList.current.last.id)
          ) {
            toggleOpen(false);
          }
        }
        if (isKeypress(event, KeyboardCodes.Esc) === false) {
          return;
        }
        toggleOpen(false);
      }
    },
    [closeOnExit, toggleOpen]
  );

  const renderedContainer = useMemo(
    () => (
      <ClickAwayListener onClickAway={() => closeOnExit && toggleOpen(false)}>
        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
        <div
          ref={containerRef}
          className={classes.contentContainer}
          onKeyDown={handlerKeyContainer}
        >
          {userInfo && (
            <div className={classes.userInfo}>
              <Typography variant="highlightText">{userInfo.label1}</Typography>
              <Typography>{userInfo.label2}</Typography>
            </div>
          )}
          {children}
        </div>
      </ClickAwayListener>
    ),
    [
      children,
      classes.userInfo,
      classes.contentContainer,
      handlerKeyContainer,
      userInfo,
      closeOnExit,
      toggleOpen,
    ]
  );

  return (
    <div
      className={clsx([
        classes.root,
        {
          [classes.static]: position === "static",
          [classes.relative]: position === "relative",
          [classes.fixed]: position === "fixed",
          [classes.absolute]: position === "absolute",
        },
        className,
      ])}
    >
      <div className={classes.container} {...others}>
        {open && renderedContainer}
      </div>
    </div>
  );
};

HvUserPreferences.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the component root class.
     */
    root: PropTypes.string,
    /**
     * Styles applied when position is fixed.
     */
    fixed: PropTypes.string,
    /**
     * Styles applied when position is relative.
     */
    relative: PropTypes.string,
    /**
     * Styles applied when position is absolute.
     */
    absolute: PropTypes.string,
    /**
     * Styles applied when position is static.
     */
    static: PropTypes.string,
    /**
     * Styles applied to the container.
     */
    container: PropTypes.string,
    /**
     * Styles applied to the inside of the container.
     */
    contentContainer: PropTypes.string,
    /**
     * Styles applied to the user information.
     */
    userInfo: PropTypes.string,
  }).isRequired,
  /**
   * Defines if the user preferences is shown.
   */
  isOpen: PropTypes.bool,
  /**
   * Position of the component.
   */
  position: PropTypes.oneOf(["static", "relative", "fixed", "absolute"]),
  /**
   * Children component.
   */
  children: PropTypes.node.isRequired,
  /**
   * Callback when the navigation toggles between open and close.
   */
  toggleOpenCallback: PropTypes.func,
  /**
   * Defines if the content pane should close when losing focus / clicking outside.
   */
  closeOnExit: PropTypes.bool,
  /**
   * User information.
   */
  userInfo: PropTypes.shape({
    label1: PropTypes.string,
    label2: PropTypes.string,
  }),
};

export default withStyles(styles, { name: "HvUserPreferences" })(HvUserPreferences);
