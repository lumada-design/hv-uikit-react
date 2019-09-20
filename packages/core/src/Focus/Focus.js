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

import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const Focus = props => {
  const { classes, children, focusOnClick, useArrows } = props;
  const [childFocus, setChildFocus] = useState(null);
  const [childFocusType, setChildFocusType] = useState(null);

  const config = () => el => {
    // eslint-disable-next-line no-param-reassign
    if (el) el.tabIndex = 0;

    // check if elem has any focusable child
    const focusableChildren =
      (el && el.querySelectorAll("input, button, select, textarea, a[href]")) ||
      [];

    if (focusableChildren.length) {
      setChildFocus(focusableChildren[0]);
      setChildFocusType(focusableChildren[0].nodeName);

      // eslint-disable-next-line no-param-reassign
      el.tabIndex = -1;
    }
  };

  const onFocus = evt => {
    evt.currentTarget.classList.add(classes.focused);
    // give focus to child element if any focusable
    if (childFocus) childFocus.focus();
  };

  const onBlur = evt => {
    evt.currentTarget.classList.remove(classes.focused);
  };

  const onMouseDown = evt => {
    evt.preventDefault();
    evt.currentTarget.focus();
    // remove focus outline unless explicitly enabled
    if (!focusOnClick) evt.currentTarget.classList.remove(classes.focused);
  };

  const onKeyDown = evt => {
    const childFocusIsInput = childFocusType === "INPUT";

    if (
      evt.keyCode === 13 || // enter
      !useArrows
    ) {
      // trigger click on enter unless child focus is input
      if (!childFocusIsInput && evt.keyCode === 13) evt.currentTarget.click();
      return;
    }

    const nextSibling = evt.currentTarget.nextElementSibling;
    const prevSibling = evt.currentTarget.previousElementSibling;

    switch (evt.keyCode) {
      // arrow up
      case 38:
        if (prevSibling) prevSibling.focus();
        break;
      // arrow down
      case 40:
        if (nextSibling) nextSibling.focus();
        break;
      default:
    }
  };

  return (
    <>
      {React.Children.map(children, child =>
        React.cloneElement(child, {
          className: classNames([child.props.className, classes.focusDisabled]),
          ref: config(),
          onFocus,
          onBlur,
          onMouseDown,
          onKeyDown
        })
      )}
    </>
  );
};

Focus.propTypes = {
  /**
   * A Jss Object used to override or extend the component styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied when focus disabled.
     */
    focusDisabled: PropTypes.string,
    /**
     * Styles applied when focus active.
     */
    focused: PropTypes.string
  }).isRequired,
  /**
   * Child node to set the focus.
   */
  children: PropTypes.node.isRequired,
  /**
   * Show focus when click element.
   */
  focusOnClick: PropTypes.bool,
  /**
   * Use up/ down keyboard arrows to control focus.
   */
  useArrows: PropTypes.bool
};

Focus.defaultProps = {
  focusOnClick: false,
  useArrows: true
};

export default Focus;
