import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import isNil from "lodash/isNil";
import { withStyles } from "@mui/styles";
import { KeyboardCodes, isBrowser, refType } from "../utils";
import ConditionalWrapper from "../utils/ConditionalWrapper";
import { isKey, isOneOfKeys, setFocusTo, getFocusableChildren } from "./utils";
import styles from "./styles";

/* eslint-disable no-param-reassign */
const Focus = (props) => {
  const {
    classes,
    children,
    configuration = {},
    disabledClass = false,
    selected = false,
    disabled = false,
    rootRef = {},
    focusOnClick = false,
    focusDisabled = true,
    strategy = "listbox",
    useFalseFocus = false,
    filterClass,
    navigationJump = 4,
  } = props;
  const [showFocus, setShowFocus] = useState(null);
  const [childFocus, setChildFocus] = useState(null);
  const [hasRunConfig, setHasRunConfig] = useState(false);

  const getFocuses = () =>
    rootRef.current
      ? Array.from(rootRef.current.getElementsByClassName(filterClass || classes.root))
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
    const firstSelected = focuses.find((focus) => focus.classList.contains(classes.selected));

    if (!firstSelected) return;
    focuses.forEach((focus) => setTabIndex(focus, -1));
    setTabIndex(firstSelected, 0);
  };

  const clearTabSiblings = (el) => {
    getFocuses().forEach((focus) => setTabIndex(focus, -1));
    setTabIndex(el, 0);
  };

  const onFocusStrategy = (evt) => {
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

  const config = (el) => {
    const { tabIndex } = configuration;
    if (!el || hasRunConfig) return;
    if (strategy === "card") {
      setChildFocus(children);
      return;
    }

    if (strategy === "grid") {
      return;
    }

    const focusableChildren = getFocusableChildren(el);
    if (focusableChildren.length) {
      focusableChildren.forEach((child) => setTabIndex(child, -1));
      setChildFocus(focusableChildren[0]);
    }

    if (!isNil(tabIndex)) setTabIndex(el, tabIndex);
    setHasRunConfig(true);
  };

  const addFocusClass = (evt) => {
    if (!useFalseFocus) {
      evt.currentTarget.classList.add(classes.focused);
      // add global class HvIsFocused as a marker
      // not to be styled directly, only as helper in specific css queries
      evt.currentTarget.classList.add("HvIsFocused");
      classes.focus.split(" ").forEach((c) => evt.currentTarget.classList.add(c));
    }
  };

  const removeFocusClass = () => {
    if (!useFalseFocus) {
      getFocuses().forEach((element) => {
        element.classList.remove(classes.focused);
        // remove the global class HvIsFocused
        element.classList.remove("HvIsFocused");
        classes.focus.split(" ").forEach((c) => element.classList.remove(c));
      });
    }
  };

  const onFocus = (evt) => {
    addFocusClass(evt);
    setShowFocus(true);
    // give focus to child element if any focusable

    if (childFocus && childFocus.focus) childFocus.focus();
    onFocusStrategy(evt);
  };

  const onBlur = (evt) => {
    setShowFocus(false);
    removeFocusClass(evt);
    onBlurStrategy(evt);
  };

  const onMouseDown = (evt) => {
    const hasCard = !!evt.currentTarget?.querySelector(".HvIsCardGridElement");
    if (strategy === "grid" && hasCard) return;

    setFocusTo(evt.currentTarget);
    setTabIndex(evt.currentTarget, 0);
    // remove focus outline unless explicitly enabled
    if (!focusOnClick) {
      // TODO this piece of code works only because onMouseDown is happening after the focus event
      // There is nothing in here that guarantees the order of these events, so it may present a problem in the future
      removeFocusClass(evt);
      setShowFocus(false);
    }
  };

  const focusAndUpdateIndex = (nextFocus, previousFocus, focusesList) => {
    if (focusesList?.includes(previousFocus)) {
      setTabIndex(previousFocus, -1);
    }
    setTabIndex(nextFocus, 0);
    setFocusTo(nextFocus);
  };

  const getEnabledKeys = (currentFocusIndex, jump, listSize) => ({
    right: (currentFocusIndex + 1) % jump === 0 || currentFocusIndex + 1 > listSize - 1,
    left: currentFocusIndex % jump === 0,
    up: currentFocusIndex - jump < 0,
    down: currentFocusIndex + jump > listSize || currentFocusIndex + jump > listSize - 1,
  });

  const onGridKeyDownHandler = (evt, focuses, focusesList, currentFocusIndex, jump) => {
    const { ArrowUp, ArrowDown, Home, End, ArrowLeft, ArrowRight, Enter, SpaceBar } = KeyboardCodes;
    const childFocusIsInput = childFocus && childFocus.nodeName === "INPUT";

    if (
      !isOneOfKeys(evt, [ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Home, End, SpaceBar, Enter]) ||
      (childFocusIsInput && isKey(evt, Enter))
    ) {
      // nothing to do
      return;
    }

    // we'll do something with the key so prevent default and stop propagation
    // except for Enter and SpaceBar
    if (!isOneOfKeys(evt, [Enter, SpaceBar])) {
      evt.preventDefault();
      evt.stopPropagation();
    }

    const blockedKeys = getEnabledKeys(currentFocusIndex, jump, focusesList.length);

    switch (evt.keyCode) {
      case SpaceBar:
      case Enter:
        if (isBrowser("firefox")) {
          evt.target.click();
        } else {
          evt.currentTarget.click();
        }
        break;
      case ArrowUp:
        if (!blockedKeys.up) {
          focusAndUpdateIndex(focuses.jump || focuses.last, evt.current, focusesList);
        }
        break;
      case ArrowDown:
        if (!blockedKeys.down) {
          focusAndUpdateIndex(focuses.fall || focuses.first, evt.current, focusesList);
        }
        break;
      case ArrowLeft:
        if (!blockedKeys.left) {
          focusAndUpdateIndex(focuses.previous || focuses.last, evt.current, focusesList);
        }
        break;
      case ArrowRight:
        if (!blockedKeys.right) {
          focusAndUpdateIndex(focuses.next || focuses.first, evt.current, focusesList);
        }
        break;
      case Home:
        focusAndUpdateIndex(focuses.first, evt.current, focusesList);
        break;
      case End:
        focusAndUpdateIndex(focuses.last, evt.current, focusesList);
        break;
      default:
    }
  };

  const onVerticalArrangementHandler = (evt, focuses, focusesList) => {
    const { ArrowUp, ArrowDown, Home, End, Enter, SpaceBar } = KeyboardCodes;
    const childFocusIsInput = childFocus && childFocus.nodeName === "INPUT";

    if (
      !isOneOfKeys(evt, [ArrowUp, ArrowDown, Home, End, SpaceBar, Enter]) ||
      (childFocusIsInput && isKey(evt, Enter))
    ) {
      // nothing to do
      return;
    }

    // we'll do something with the key so prevent default and stop propagation
    evt.preventDefault();
    evt.stopPropagation();

    switch (evt.keyCode) {
      case SpaceBar:
      case Enter:
        evt.target.click();
        break;
      case ArrowUp:
        focusAndUpdateIndex(focuses.previous || focuses.last, evt.current, focusesList);
        break;
      case ArrowDown:
        focusAndUpdateIndex(focuses.next || focuses.first, evt.current, focusesList);
        break;
      case Home:
        focusAndUpdateIndex(focuses.first, evt.current, focusesList);
        break;
      case End:
        focusAndUpdateIndex(focuses.last, evt.current, focusesList);
        break;
      default:
    }
  };

  const onSingleHandler = (evt) => {
    const { Enter, SpaceBar } = KeyboardCodes;
    const childFocusIsInput = childFocus && childFocus.nodeName === "INPUT";

    if (!isOneOfKeys(evt, [SpaceBar, Enter]) || (childFocusIsInput && isKey(evt, Enter))) {
      // nothing to do
      return;
    }

    // we'll do something with the key so prevent default and stop propagation
    evt.preventDefault();
    evt.stopPropagation();

    evt.currentTarget.click();
  };

  const onKeyDown = (evt) => {
    if (rootRef.current == null) {
      // operating outside of a composite widget
      // nothing to manage, just style and trigger clicks
      onSingleHandler(evt);
      return;
    }

    // TODO keep the smart default, but allow to explictly override if disabled elements should be focusable
    const isDisabledFocusable = strategy === "menu";
    const focusesList = getFocuses().filter(
      (el) => isDisabledFocusable || !el.classList.contains(classes.disabled)
    );

    const currentFocus = focusesList.indexOf(evt.currentTarget);

    const focuses = {
      first: focusesList[0],
      last: focusesList[focusesList.length - 1],
      previous: focusesList[currentFocus - 1],
      next: focusesList[currentFocus + 1],
      fall: focusesList[currentFocus + navigationJump],
      jump: focusesList[currentFocus - navigationJump],
    };

    if (strategy === "grid") {
      onGridKeyDownHandler(evt, focuses, focusesList, currentFocus, navigationJump);
      return;
    }

    // TODO add property for specifing the composite widget orientation
    // TODO implement handler for horizontal orientation
    onVerticalArrangementHandler(evt, focuses, focusesList);
  };

  const onKeyUp = (evt) => {
    if (isBrowser("firefox")) evt.preventDefault();
  };

  if (disabled) return children;

  const focusWrapper = (childrenToWrap) => (
    <div className={classes.externalReference}>
      {childrenToWrap}
      {showFocus && <div className={classes.falseFocus} />}
    </div>
  );

  return (
    <ConditionalWrapper condition={useFalseFocus} wrapper={focusWrapper}>
      {React.cloneElement(children, {
        className: clsx(children.props.className, [classes.root, filterClass], {
          [classes.selected]: selected,
          [classes.disabled]: disabledClass,
          [classes.focusDisabled]: focusDisabled,
        }),
        ref: config,
        onFocus,
        onBlur,
        onMouseDown,
        onKeyDown,
        onKeyUp,
        selected,
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
    focusGridDisabled: PropTypes.string,
    /**
     * Styles applied when focus active.
     */
    focused: PropTypes.string,
    /**
     * Styles applied when focus customization is passed.
     */
    focus: PropTypes.string,
  }).isRequired,
  /**
   * The reference to the root element to hold all Focus' context.
   */
  rootRef: refType,
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
  strategy: PropTypes.oneOf(["listbox", "menu", "card", "grid"]),
  /**
   * Show focus when click element.
   */
  focusOnClick: PropTypes.bool,
  /**
   * Show focus when click element.
   */
  focusDisabled: PropTypes.bool,
  /**
   * Indicates that the disabled class should be applied.
   */
  disabledClass: PropTypes.bool,
  /**
   * Uses an absolute positioned div as a focus.
   */
  useFalseFocus: PropTypes.bool,
  /**
   * Narrows the results of the focus to only theses class
   */
  filterClass: PropTypes.string,
  /**
   * How much the navigation will skip when using the arrows.
   */
  navigationJump: PropTypes.number,
};

export default withStyles(styles, { name: "HvFocus" })(Focus);
