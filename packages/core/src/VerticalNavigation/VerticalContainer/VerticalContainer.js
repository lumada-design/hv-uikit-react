import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import isNil from "lodash/isNil";
import { ClickAwayListener, withStyles } from "@material-ui/core";
import clsx from "clsx";
import { Menu } from "@hitachivantara/uikit-react-icons";
import { isKeypress, KeyboardCodes } from "../../utils/KeyboardUtils";
import Button from "../../Button";
import { setId } from "../../utils";
import { getFirstAndLastFocus } from "../../utils/focusableElementFinder";

import styles from "./styles";

/**
 * Vertical Container.
 *
 * @constructor
 */
const VerticalContainer = ({
  id,
  className,
  classes,
  isAnchorBarVisible = true,
  isOpen = false,
  toggleOpenCallback,
  buttonAriaLabel,
  children,
  position = "static",
  closeOnExit,
  ...others
}) => {
  const [open, setOpen] = useState(isOpen);
  const [prevPropOpen, setPrevPropOpen] = useState(null);
  const containerRef = useRef(null);
  const buttonRef = useRef(null);
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
      }
    });
  }, [open]);

  /**
   * Toggle the open state based on the received paramenter.
   *
   * @type {(...args: any[]) => any}
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
      toggleOpenCallback?.(open);
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
        buttonRef.current.focus();
        toggleOpen(false);
      }
    },
    [closeOnExit, toggleOpen]
  );
  const renderedAnchorBar = useMemo(
    () => (
      <div id={setId(id, "anchor-bar")} className={classes.anchorBar}>
        <Button
          id={setId(id, "hamburger-button")}
          className={classes.button}
          buttonRef={buttonRef}
          onClick={() => toggleOpen()}
          aria-label={buttonAriaLabel || (open && "close") || (!open && "open")}
          category="icon"
        >
          <Menu />
        </Button>
      </div>
    ),
    [buttonAriaLabel, classes.anchorBar, classes.button, id, open, toggleOpen]
  );

  const renderedContainer = useMemo(
    () => (
      <>
        {isAnchorBarVisible && <div className={classes.separator} />}
        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
        <div
          id={setId(id, "container")}
          ref={containerRef}
          className={classes.contentContainer}
          onKeyDown={handlerKeyContainer}
        >
          {children}
        </div>
      </>
    ),
    [
      children,
      classes.contentContainer,
      classes.separator,
      handlerKeyContainer,
      id,
      isAnchorBarVisible,
    ]
  );

  return (
    <div
      className={clsx(className, classes.root, {
        [classes.withAnchorBar]: isAnchorBarVisible,
        [classes.static]: position === "static",
        [classes.relative]: position === "relative",
        [classes.fixed]: position === "fixed",
        [classes.absolute]: position === "absolute",
      })}
    >
      <ClickAwayListener onClickAway={() => closeOnExit && toggleOpen(false)}>
        <div id={id} className={classes.verticalContainer} {...others}>
          {isAnchorBarVisible && renderedAnchorBar}
          {open && renderedContainer}
        </div>
      </ClickAwayListener>
    </div>
  );
};

VerticalContainer.propTypes = {
  /**
   * Identifier.
   */
  id: PropTypes.string,
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * Styles applied to the element.
   */
  classes: PropTypes.shape({
    /**
     *  Styles applied to the root container.
     */
    root: PropTypes.string,
    /**
     * Styles applied when the component is in fixed positioning.
     */
    fixed: PropTypes.string,
    /**
     * Styles applied when the component is in relative positioning.
     */
    relative: PropTypes.string,
    /**
     * Styles applied when the component is in absolute positioning.
     */
    absolute: PropTypes.string,
    /**
     * Styles applied when the component is in static positioning.
     */
    static: PropTypes.string,
    /**
     * Styles applied when the component has anchor bar.
     */
    withAnchorBar: PropTypes.string,
    /**
     *  Styles applied to the vertical container.
     */
    verticalContainer: PropTypes.string,
    /**
     *  Styles applied to the anchor bar.
     */
    anchorBar: PropTypes.string,
    /**
     *  Styles applied to the button.
     */
    button: PropTypes.string,
    /**
     *  Styles applied to the separator.
     */
    separator: PropTypes.string,
    /**
     *  Styles applied to the content container.
     */
    contentContainer: PropTypes.string,
  }).isRequired,

  /**
   * Position of the component.
   */
  position: PropTypes.oneOf(["static", "relative", "fixed", "absolute"]),

  /**
   * Defines if a anchor bar is visible,
   */
  isAnchorBarVisible: PropTypes.bool,
  /**
   * Is the navigation open.
   */
  isOpen: PropTypes.bool,
  /**
   * Aria-label for the button.
   */
  buttonAriaLabel: PropTypes.string,
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
};

export default withStyles(styles, {
  name: "HvVerticalNavigationVerticalContainer",
})(VerticalContainer);
