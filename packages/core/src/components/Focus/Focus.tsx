import React, { RefObject, useState } from "react";
import isNil from "lodash/isNil";

import { HvBaseProps } from "@core/types/generic";
import { isKey, isOneOfKeys } from "@core/utils/keyboardUtils";
import { isBrowser } from "@core/utils/browser";
import { ConditionalWrapper } from "@core/utils/ConditionalWrapper";
import { ExtractNames } from "@core/utils/classes";

import { getFocusableChildren, setFocusTo } from "./utils";
import { staticClasses, useClasses } from "./Focus.styles";

export { staticClasses as focusClasses };
export type HvFocusClasses = ExtractNames<typeof useClasses>;

export type HvFocusStrategies = "listbox" | "menu" | "card" | "grid";

export interface HvFocusProps extends HvBaseProps<HTMLElement, "children"> {
  children: React.ReactElement;
  /** Extra configuration for the child element. */
  configuration?: {
    tabIndex?: number;
  };
  /** Indicates that the disabled class should be applied. */
  disabledClass?: boolean;
  /** Whether the focus is selected. */
  selected?: boolean;
  /** Whether the focus is disabled. */
  disabled?: boolean;
  /** The reference to the root element to hold all Focus' context. */
  rootRef?: RefObject<HTMLElement>;
  /** Show focus when click element. v */
  focusOnClick?: boolean;
  /** Show focus when click element. v */
  focusDisabled?: boolean;
  /** Focus and navigation strategy to be used. v */
  strategy?: HvFocusStrategies;
  /** Uses an absolute positioned div as a focus. v */
  useFalseFocus?: boolean;
  /** Narrows the results of the focus to only theses class v */
  filterClass?: string;
  /** How much the navigation will skip when using the arrows. v */
  navigationJump?: number;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvFocusClasses;
}

export const HvFocus = ({
  classes: classesProp,
  children,
  configuration = {},
  disabledClass = false,
  selected = false,
  disabled = false,
  rootRef = undefined,
  focusOnClick = false,
  focusDisabled = true,
  strategy = "listbox",
  useFalseFocus = false,
  filterClass,
  navigationJump = 4,
}: HvFocusProps) => {
  const [showFocus, setShowFocus] = useState<boolean>(false);
  const [childFocus, setChildFocus] = useState<any>();
  const [hasRunConfig, setHasRunConfig] = useState(false);
  const { classes, cx } = useClasses(classesProp);

  const getFocuses = () => {
    const focuses = rootRef?.current
      ? Array.from(
          rootRef.current.getElementsByClassName(
            filterClass || staticClasses.root || "root"
          )
        )
      : [];
    return focuses;
  };

  const setTabIndex = (el, tabIndex = 0) => {
    if (!el) return;
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
    const firstSelected = focuses.find((focus) =>
      focus.classList.contains(classes.selected || "selected")
    );

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
      rootRef &&
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
      // evt.currentTarget.classList.add(classes.focused);
      classes.focused
        .split(" ")
        .forEach((c) => evt.currentTarget.classList.add(c));
      // add global class HvIsFocused as a marker
      // not to be styled directly, only as helper in specific css queries
      evt.currentTarget.classList.add("HvIsFocused");
      classes?.focus
        ?.split(" ")
        .forEach((c) => evt.currentTarget.classList.add(c));
    }
  };

  const removeFocusClass = () => {
    if (!useFalseFocus) {
      getFocuses().forEach((element) => {
        // element.classList.remove(classes.focused);
        classes.focused.split(" ").forEach((c) => element.classList.remove(c));
        // remove the global class HvIsFocused
        element.classList.remove("HvIsFocused");
        classes?.focus?.split(" ").forEach((c) => element.classList.remove(c));
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

  const onBlur = () => {
    setShowFocus(false);
    removeFocusClass();
    onBlurStrategy();
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
      removeFocusClass();
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
    right:
      (currentFocusIndex + 1) % jump === 0 ||
      currentFocusIndex + 1 > listSize - 1,
    left: currentFocusIndex % jump === 0,
    up: currentFocusIndex - jump < 0,
    down:
      currentFocusIndex + jump > listSize ||
      currentFocusIndex + jump > listSize - 1,
  });

  const onGridKeyDownHandler = (
    evt,
    focuses,
    focusesList,
    currentFocusIndex,
    jump
  ) => {
    const childFocusIsInput = childFocus && childFocus.nodeName === "INPUT";

    if (
      !isOneOfKeys(evt, [
        "ArrowUp",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
        "Home",
        "End",
        "Space",
        "Enter",
      ]) ||
      (childFocusIsInput && isKey(evt, "Enter"))
    ) {
      // nothing to do
      return;
    }

    // we'll do something with the key so prevent default and stop propagation
    // except for Enter and SpaceBar
    if (!isOneOfKeys(evt, ["Enter", "Space"])) {
      evt.preventDefault();
      evt.stopPropagation();
    }

    const blockedKeys = getEnabledKeys(
      currentFocusIndex,
      jump,
      focusesList.length
    );

    switch (evt.code) {
      case "Space":
      case "Enter":
        if (isBrowser("firefox")) {
          evt.target.click();
        } else {
          evt.currentTarget.click();
        }
        break;
      case "ArrowUp":
        if (!blockedKeys.up) {
          focusAndUpdateIndex(
            focuses.jump || focuses.last,
            evt.current,
            focusesList
          );
        }
        break;
      case "ArrowDown":
        if (!blockedKeys.down) {
          focusAndUpdateIndex(
            focuses.fall || focuses.first,
            evt.current,
            focusesList
          );
        }
        break;
      case "ArrowLeft":
        if (!blockedKeys.left) {
          focusAndUpdateIndex(
            focuses.previous || focuses.last,
            evt.current,
            focusesList
          );
        }
        break;
      case "ArrowRight":
        if (!blockedKeys.right) {
          focusAndUpdateIndex(
            focuses.next || focuses.first,
            evt.current,
            focusesList
          );
        }
        break;
      case "Home":
        focusAndUpdateIndex(focuses.first, evt.current, focusesList);
        break;
      case "End":
        focusAndUpdateIndex(focuses.last, evt.current, focusesList);
        break;
      default:
    }
  };

  const onVerticalArrangementHandler = (evt, focuses, focusesList) => {
    const childFocusIsInput = childFocus && childFocus.nodeName === "INPUT";

    if (
      !isOneOfKeys(evt, [
        "ArrowUp",
        "ArrowDown",
        "Home",
        "End",
        "Space",
        "Enter",
      ]) ||
      (childFocusIsInput && isKey(evt, "Enter"))
    ) {
      // nothing to do
      return;
    }

    // we'll do something with the key so prevent default and stop propagation
    evt.preventDefault();
    evt.stopPropagation();

    switch (evt.code) {
      case "Space":
      case "Enter":
        evt.target.click();
        break;
      case "ArrowUp":
        focusAndUpdateIndex(
          focuses.previous || focuses.last,
          evt.current,
          focusesList
        );
        break;
      case "ArrowDown":
        focusAndUpdateIndex(
          focuses.next || focuses.first,
          evt.current,
          focusesList
        );
        break;
      case "Home":
        focusAndUpdateIndex(focuses.first, evt.current, focusesList);
        break;
      case "End":
        focusAndUpdateIndex(focuses.last, evt.current, focusesList);
        break;
      default:
    }
  };

  const onSingleHandler = (evt) => {
    const childFocusIsInput = childFocus && childFocus.nodeName === "INPUT";

    if (
      !isOneOfKeys(evt, ["Space", "Enter"]) ||
      (childFocusIsInput && isKey(evt, "Enter"))
    ) {
      // nothing to do
      return;
    }

    // we'll do something with the key so prevent default and stop propagation
    evt.preventDefault();
    evt.stopPropagation();

    evt.currentTarget.click();
  };

  const onKeyDown = (evt) => {
    if (rootRef?.current == null) {
      // operating outside of a composite widget
      // nothing to manage, just style and trigger clicks
      onSingleHandler(evt);
      return;
    }

    // TODO keep the smart default, but allow to explicitly override if disabled elements should be focusable
    const isDisabledFocusable = strategy === "menu";
    const focusesList = getFocuses().filter(
      (el) =>
        isDisabledFocusable ||
        !el.classList.contains(classes?.disabled as string)
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
      onGridKeyDownHandler(
        evt,
        focuses,
        focusesList,
        currentFocus,
        navigationJump
      );
      return;
    }

    // TODO add property for specifying the composite widget orientation
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
        className: cx(
          [classes.root, filterClass],
          {
            [classes.selected]: selected,
            [classes.disabled]: disabledClass,
            [classes.focusDisabled]: focusDisabled,
          },
          children.props.className
        ),
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
