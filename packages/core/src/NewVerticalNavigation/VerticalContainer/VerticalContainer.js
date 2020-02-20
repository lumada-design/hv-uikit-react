/*
 * Copyright 2020 Hitachi Vantara Corporation
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

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import PropTypes from "prop-types";
import isNil from "lodash/isNil";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import classNames from "classnames";
import { isKeypress, KeyboardCodes } from "@hv/uikit-common-utils/dist";
import Menu from "@hv/uikit-react-icons/dist/Generic/Menu";
import Button from "../../Button";

import useUniqueId from "../../useUniqueId";

import { getFirstAndLastFocus } from "../../utils/focusableElementFinder";

/**
 * Vertical Container.
 *
 * @constructor
 */
const VerticalContainer = ({
  id,
  className,
  classes,
  isAnchorBarVisible,
  isOpen,
  toggleOpenCallback,
  buttonAriaLabel,
  children,
  position,
  closeOnExit
}) => {
  const internalId = useUniqueId(id, "hv-verticalnavigation-verticalcontainer");

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
        focusableList.current = getFirstAndLastFocus(containerRef);
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
        setOpen(prevState => !prevState);
      }
      if (toggleOpenCallback) toggleOpenCallback(open);
    },
    [toggleOpenCallback, open]
  );

  /**
   * Handler of keyboard clicks.
   */
  const handlerKeyContainer = useCallback(
    event => {
      if(closeOnExit) {
        if (
          isKeypress(event, KeyboardCodes.Tab) &&
          !isNil(event.target) &&
          !isNil(focusableList.current) && !isNil(focusableList.current.first)
        ) {
          if (
            (event.shiftKey &&
              event.target.id === focusableList.current.first.id) ||
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
      <div id={`${internalId}-anchor-bar`} className={classes.anchorBar}>
        <Button
          id={`${internalId}-hamburger-button`}
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
    [
      buttonAriaLabel,
      classes.anchorBar,
      classes.button,
      internalId,
      open,
      toggleOpen
    ]
  );

  const renderedContainer = useMemo(
    () => (
      <>
        {isAnchorBarVisible && <div className={classes.separator} />}
        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
        <div
          id={`${internalId}-container`}
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
      internalId,
      isAnchorBarVisible
    ]
  );

  return (
    <div
      className={classNames([
        classes.root,
        {
          [classes.withAnchorBar]: isAnchorBarVisible,
          [classes.static]: position === "static",
          [classes.relative]: position === "relative",
          [classes.fixed]: position === "fixed",
          [classes.absolute]: position === "absolute"
        },
        className
      ])}
    >
      <ClickAwayListener onClickAway={() => closeOnExit && toggleOpen(false)}>
        <div id={`${internalId}`} className={classes.verticalContainer}>
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
    contentContainer: PropTypes.string
  }).isRequired,

  /**
   * Position of the component.
   */
  position: PropTypes.oneOf([
    "static",
    "relative",
    "fixed",
    "absolute"
  ]),

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
  closeOnExit: PropTypes.bool
};

VerticalContainer.defaultProps = {
  className: "",
  position: "static",
  isOpen: false,
  isAnchorBarVisible: true,
  id: undefined,
  buttonAriaLabel: undefined,
  toggleOpenCallback: () => {},
  closeOnExit: true
};

export default VerticalContainer;
