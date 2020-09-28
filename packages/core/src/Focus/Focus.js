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
    useArrows = true,
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
      classes.focus.split(" ").forEach((c) => evt.currentTarget.classList.add(c));
    }
  };

  const removeFocusClass = (evt) => {
    if (!useFalseFocus) {
      evt.currentTarget.classList.remove(classes.focused);
      classes.focus.split(" ").forEach((c) => evt.currentTarget.classList.remove(c));
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
    const hasCard = !!evt.currentTarget?.querySelector(".HvCard-root");
    if (strategy === "grid" && hasCard) return;

    setFocusTo(evt.currentTarget);
    setTabIndex(evt.currentTarget, 0);
    // remove focus outline unless explicitly enabled
    if (!focusOnClick) {
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

    if (isOneOfKeys(evt, [ArrowUp, ArrowDown, Home, End])) {
      evt.preventDefault();
      evt.stopPropagation();
    }

    if (isOneOfKeys(evt, [Enter, SpaceBar]) || !useArrows) {
      // trigger click on enter unless child focus is input
      if ((!childFocusIsInput && isKey(evt, Enter)) || isKey(evt, SpaceBar))
        if (isBrowser("firefox")) evt.target.click();
        else evt.currentTarget.click();
      return;
    }

    const blockedKeys = getEnabledKeys(currentFocusIndex, jump, focusesList.length);

    switch (true) {
      case ArrowUp === evt.keyCode && !blockedKeys.up:
        focusAndUpdateIndex(focuses.jump || focuses.last, evt.current, focusesList);
        break;
      case ArrowDown === evt.keyCode && !blockedKeys.down:
        focusAndUpdateIndex(focuses.fall || focuses.first, evt.current, focusesList);
        break;
      case ArrowLeft === evt.keyCode && !blockedKeys.left:
        focusAndUpdateIndex(focuses.previous || focuses.last, evt.current, focusesList);
        break;
      case ArrowRight === evt.keyCode && !blockedKeys.right:
        focusAndUpdateIndex(focuses.next || focuses.first, evt.current, focusesList);
        break;
      case Home === evt.keyCode:
        focusAndUpdateIndex(focuses.first, evt.current, focusesList);
        break;
      case End === evt.keyCode:
        focusAndUpdateIndex(focuses.last, evt.current, focusesList);
        break;
      default:
    }
  };

  const onListHandler = (evt, focuses, focusesList) => {
    const { ArrowUp, ArrowDown, Home, End, Enter, SpaceBar } = KeyboardCodes;
    const childFocusIsInput = childFocus && childFocus.nodeName === "INPUT";

    if (isOneOfKeys(evt, [ArrowUp, ArrowDown, Home, End, SpaceBar])) {
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

    switch (evt.keyCode) {
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

  const onKeyDown = (evt) => {
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
    onListHandler(evt, focuses, focusesList);
  };

  const onKeyUp = (evt) => {
    if (isBrowser("firefox")) evt.preventDefault();
  };

  const focusWrapper = (childrenToWrap) => (
    <div className={classes.externalReference}>
      {childrenToWrap}
      {showFocus && <div className={classes.falseFocus} />}
    </div>
  );

  if (disabled) return children;

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
  rootRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({ current: PropTypes.any })]),
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
   * Use up/ down keyboard arrows to control focus.
   */
  useArrows: PropTypes.bool,
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
