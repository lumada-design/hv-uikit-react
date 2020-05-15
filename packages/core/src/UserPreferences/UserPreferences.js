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

import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import isNil from "lodash/isNil";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import {isKeypress, KeyboardCodes} from "@hv/uikit-common-utils/dist";
import {getFirstAndLastFocus} from "../utils/focusableElementFinder";
import Typography from "../Typography";

const HvUserPreferences = ({
  className,
  classes,
  isOpen,
  toggleOpenCallback,
  children,
  position,
  closeOnExit,
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
   *
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
      if (closeOnExit) {
        if (
          isKeypress(event, KeyboardCodes.Tab) &&
          !isNil(event.target) &&
          !isNil(focusableList.current) &&
          !isNil(focusableList.current.first)
        ) {
          if (
            (event.shiftKey &&
              event.target.id === focusableList.current.first.id) ||
            (!event.shiftKey &&
              event.target.id === focusableList.current.last.id)
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

  const userInfoRender = useMemo(
    () =>
      userInfo && (
        <div className={classes.userInfo}>
          {userInfo.label1 && (
            <Typography variant="highlightText">{userInfo.label1}</Typography>
          )}
          {userInfo.label2 && (
            <Typography variant="sText">{userInfo.label2}</Typography>
          )}
        </div>
      ),
    [userInfo]
  );

  const renderedContainer = useMemo(
    () => (
      <>
        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
        <div
          ref={containerRef}
          className={classes.contentContainer}
          onKeyDown={handlerKeyContainer}
        >
          {userInfoRender}
          {children}
        </div>
      </>
    ),
    [children, classes.contentContainer, handlerKeyContainer, userInfo]
  );

  return (
    <div
      className={classNames([
        classes.root,
        {
          [classes.static]: position === "static",
          [classes.relative]: position === "relative",
          [classes.fixed]: position === "fixed",
          [classes.absolute]: position === "absolute"
        },
        className
      ])}
    >
      <ClickAwayListener onClickAway={() => closeOnExit && toggleOpen(false)}>
        <div className={classes.container} {...others}>
          {open && renderedContainer}
        </div>
      </ClickAwayListener>
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
     * Style applied to the inside of the container.
     */
    contentContainer: PropTypes.string,
    /**
     * Style applied to the user information.
     */
    userInfo: PropTypes.string
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
    label2: PropTypes.string
  })
};

HvUserPreferences.defaultProps = {
  className: undefined,
  isOpen: false,
  toggleOpenCallback: () => {},
  position: "static",
  closeOnExit: false,
  userInfo: undefined
};

export default HvUserPreferences;
