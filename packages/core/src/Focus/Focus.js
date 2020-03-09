import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import isNil from "lodash/isNil";
import { withStyles } from "@material-ui/core";
import { KeyboardCodes, isBrowser } from "../utils";
import ConditionalWrapper from "../utils/ConditionalWrapper";
import { isKey, isOneOfKeys, setFocusTo, getFocusableChildren } from "./utils";
import styles from "./styles";

/* eslint-disable no-param-reassign */
const Focus = props => {
  const {
    classes,
    children,
    configuration,
    selected,
    disabled,
    rootRef,
    focusOnClick,
    focusDisabled,
    strategy,
    useArrows,
    useFalseFocus
  } = props;
  const [showFocus, setShowFocus] = useState(null);
  const [childFocus, setChildFocus] = useState(null);
  const [hasRunConfig, setHasRunConfig] = useState(false);

  const getFocuses = () =>
    rootRef.current
      ? Array.from(rootRef.current.getElementsByClassName(classes.root))
      : [];

  const setTabIndex = (el, tabIndex = 0) => {
    const elChildFocus = getFocusableChildren(el)[0];
    if (elChildFocus) {
      el.tabIndex = -1;
      elChildFocus.tabIndex = tabIndex;
    } else {
      el.tabIndex = tabIndex;
    }
  };

  const setSelectedTabIndex = () => {
    const focuses = getFocuses();
    const firstSelected = focuses.find(focus =>
      focus.classList.contains(classes.selected)
    );

    if (!firstSelected) return;
    focuses.forEach(focus => setTabIndex(focus, -1));
    setTabIndex(firstSelected, 0);
  };

  const clearTabSiblings = el => {
    getFocuses().forEach(focus => setTabIndex(focus, -1));
    setTabIndex(el, 0);
  };

  const onFocusStrategy = evt => {
    if (strategy === "listbox") {
      clearTabSiblings(evt.currentTarget);
    }
  };

  const onBlurStrategy = () => {
    if (
      strategy === "listbox" &&
      rootRef.current &&
      !rootRef.current.contains(document.activeElement)
    ) {
      setTimeout(() => {
        setSelectedTabIndex();
      }, 10);
    }
  };

  const config = el => {
    const { tabIndex } = configuration;
    if (!el || hasRunConfig) return;
    if (strategy === "card") {
      setChildFocus(children);
      return;
    }

    const focusableChildren = getFocusableChildren(el);
    if (focusableChildren.length) {
      focusableChildren.forEach(child => setTabIndex(child, -1));
      setChildFocus(focusableChildren[0]);
    }

    if (!isNil(tabIndex)) setTabIndex(el, tabIndex);
    setHasRunConfig(true);
  };

  const onFocus = evt => {
    if (!useFalseFocus) evt.currentTarget.classList.add(classes.focused);
    setShowFocus(true);
    // give focus to child element if any focusable

    if (childFocus && childFocus.focus) childFocus.focus();
    onFocusStrategy(evt);
  };

  const onBlur = evt => {
    setShowFocus(false);
    if (!useFalseFocus) evt.currentTarget.classList.remove(classes.focused);
    onBlurStrategy(evt);
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
    const { SpaceBar, ArrowUp, ArrowDown, Enter, Home, End } = KeyboardCodes;

    if (isOneOfKeys(evt, [SpaceBar, ArrowUp, ArrowDown, Home, End])) {
      evt.preventDefault();
      evt.stopPropagation();
    }

    if (isOneOfKeys(evt, [Enter, SpaceBar]) || !useArrows) {
      // trigger click on enter unless child focus is input
      if ((!childFocusIsInput && isKey(evt, Enter)) || isKey(evt, SpaceBar)) {
        evt.currentTarget.click();
      }
      return;
    }

    const isDisabledFocusable = strategy === "menu";
    const focusesList = getFocuses().filter(
      el => isDisabledFocusable || !el.classList.contains(classes.disabled)
    );

    const currentFocus = focusesList.indexOf(evt.currentTarget);

    const focuses = {
      first: focusesList[0],
      last: focusesList[focusesList.length - 1],
      previous: focusesList[currentFocus - 1],
      next: focusesList[currentFocus + 1]
    };

    switch (evt.keyCode) {
      case ArrowUp:
        setFocusTo(focuses.previous || focuses.last);
        setTabIndex(evt.currentTarget, -1);
        break;
      case ArrowDown:
        setFocusTo(focuses.next || focuses.first);
        setTabIndex(evt.currentTarget, -1);
        break;
      case Home:
        setFocusTo(focuses.first);
        setTabIndex(evt.currentTarget, -1);
        break;
      case End:
        setFocusTo(focuses.last);
        setTabIndex(evt.currentTarget, -1);
        break;
      default:
    }
  };

  const onKeyUp = evt => {
    if (isBrowser("firefox")) evt.preventDefault();
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
        className: clsx(children.props.className, classes.root, {
          [classes.selected]: selected,
          [classes.disabled]: disabled,
          [classes.focusDisabled]: focusDisabled
        }),
        ref: config,
        onFocus,
        onBlur,
        onMouseDown,
        onKeyDown,
        onKeyUp,
        selected
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
     * Styles applied to the root.
     */
    root: PropTypes.string,
    /**
     * Styles applied when component is selected.
     */
    selected: PropTypes.string,
    /**
     * Styles applied when component is disabled.
     */
    disabled: PropTypes.string,
    /**
     * Styles applied to external reference.
     */
    externalReference: PropTypes.string,
    /**
     * Styles applied when using the false focus.
     */
    falseFocus: PropTypes.string,
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
   * The reference to the root element to hold all Focus' context.
   */
  rootRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any })
  ]),
  /**
   * Extra configuration for the child element.
   */
  configuration: PropTypes.instanceOf(Object),
  /**
   * Whether the focus is selected.
   */
  selected: PropTypes.bool,
  /**
   * Whether the focus is disabled.
   */
  disabled: PropTypes.bool,
  /**
   * Child node to set the focus.
   */
  children: PropTypes.node.isRequired,
  /**
   * Focus and navigation strategy to be used.
   */
  strategy: PropTypes.oneOf(["listbox", "menu", "card"]),
  /**
   * Show focus when click element.
   */
  focusOnClick: PropTypes.bool,
  /**
   * Show focus when click element.
   */
  focusDisabled: PropTypes.bool,
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
  rootRef: {},
  focusOnClick: false,
  focusDisabled: true,
  useArrows: true,
  useFalseFocus: false,
  strategy: "listbox",
  configuration: {},
  selected: false,
  disabled: false
};

export default withStyles(styles)(Focus);
