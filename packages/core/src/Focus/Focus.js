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
import {
  KeyboardCodes,
  isKeypress as isKey
} from "@hv/uikit-common-utils/dist";
import ConditionalWrapper from "../utils/ConditionalWrapper";

/* eslint-disable no-param-reassign */
const Focus = props => {
  const {
    classes,
    children,
    enabled,
    focusOnClick,
    strategy,
    useArrows,
    useFalseFocus
  } = props;
  const [showFocus, setShowFocus] = useState(null);
  const [childFocus, setChildFocus] = useState(null);
  const [hasRunConfig, setHasRunConfig] = useState(false);

  const setTabIndex = (el, tabIndex) => {
    if (childFocus) {
      el.tabIndex = -1;
      childFocus.tabIndex = tabIndex;
    } else {
      el.tabIndex = tabIndex;
    }
  };

  const setFocusTo = el => {
    el.focus();
  };

  const config = el => {
    if (!el || hasRunConfig) return;
    if (strategy === "card") {
      setChildFocus(children);
      return;
    }

    const focusableChildren =
      el.querySelectorAll("input, button, select, textarea, a[href]") || [];

    if (focusableChildren.length) {
      focusableChildren.forEach(child => setTabIndex(child, -1));
      setChildFocus(focusableChildren[0]);
    }

    setTabIndex(el, enabled ? 0 : -1);
    setHasRunConfig(true);
  };

  const clearTabSiblings = el => {
    const siblings = el.parentElement.children;
    siblings.forEach(sibling => setTabIndex(sibling, -1));
    setTabIndex(el, 0);
  };

  const onFocus = evt => {
    if (!useFalseFocus) evt.currentTarget.classList.add(classes.focused);
    setShowFocus(true);
    // give focus to child element if any focusable

    if (childFocus && childFocus.focus) childFocus.focus();
    clearTabSiblings(evt.currentTarget);
  };

  const onBlur = evt => {
    setShowFocus(false);
    if (!useFalseFocus) evt.currentTarget.classList.remove(classes.focused);
  };

  const onMouseDown = evt => {
    evt.preventDefault();
    setFocusTo(evt.currentTarget);
    setTabIndex(evt.currentTarget, 0);
    // remove focus outline unless explicitly enabled
    if (!focusOnClick) {
      if (!useFalseFocus) evt.currentTarget.classList.remove(classes.focused);
      setShowFocus(false);
    }
  };

  const onKeyDown = evt => {
    const childFocusIsInput = childFocus && childFocus.nodeName === "INPUT";
    const { SpaceBar, ArrowUp, ArrowDown, Enter } = KeyboardCodes;

    // TODO: review side effects
    if (isKey(evt, SpaceBar) || isKey(evt, ArrowUp) || isKey(evt, ArrowDown)) {
      evt.preventDefault();
    }

    if (isKey(evt, Enter) || isKey(evt, SpaceBar) || !useArrows) {
      // trigger click on enter unless child focus is input
      if ((!childFocusIsInput && isKey(evt, Enter)) || isKey(evt, SpaceBar)) {
        evt.currentTarget.click();
      }
      return;
    }

    const {
      parentElement: { firstElementChild, lastElementChild },
      previousElementSibling,
      nextElementSibling
    } = evt.currentTarget;

    switch (evt.keyCode) {
      case ArrowUp:
        setFocusTo(previousElementSibling || lastElementChild);
        setTabIndex(evt.currentTarget, -1);
        break;
      case ArrowDown:
        setFocusTo(nextElementSibling || firstElementChild);
        setTabIndex(evt.currentTarget, -1);
        break;
      default:
    }
  };

  const focusWrapper = childrenToWrap => (
    <div className={classes.externalReference}>
      {childrenToWrap}
      {showFocus && <div className={classes.falseFocus} />}
    </div>
  );

  return (
    <ConditionalWrapper condition={useFalseFocus} wrapper={focusWrapper}>
      {React.cloneElement(children, {
        className: classNames(children.props.className, classes.focusDisabled),
        ref: config,
        onFocus,
        onBlur,
        onMouseDown,
        onKeyDown
      })}
    </ConditionalWrapper>
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
   * Whether the focus is enabled.
   */
  enabled: PropTypes.bool,
  /**
   *
   * Child node to set the focus.
   */
  children: PropTypes.node.isRequired,
  /**
   *
   * Focus and navigatino strategy to be used.
   */
  strategy: PropTypes.oneOf("list", "card"),
  /**
   * Show focus when click element.
   */
  focusOnClick: PropTypes.bool,
  /**
   * Use up/ down keyboard arrows to control focus.
   */
  useArrows: PropTypes.bool,
  /**
   * Uses an absolute positioned div as a focus.
   */
  useFalseFocus: PropTypes.bool
};

Focus.defaultProps = {
  focusOnClick: false,
  useArrows: true,
  useFalseFocus: false,
  strategy: "list",
  enabled: true
};

export default Focus;
