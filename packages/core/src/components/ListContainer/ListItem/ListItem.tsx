import React, { useCallback, useContext, useMemo } from "react";
import clsx from "clsx";
import { HvBaseProps } from "../../../types";
import { StyledListItem, StyledFocus } from "./ListItem.styles";
import HvListContext from "../ListContext";
import { theme } from "@hitachivantara/uikit-styles";

export type HvListItemProps = HvBaseProps<HTMLLIElement, { role }> & {
  /**
   * Overrides the implicit list item role.
   * It defaults to "option" if unspecified and the container list role is "listbox".
   */
  role?: string;
  /** Indicates if the list item is selected. */
  selected?: boolean;
  /** If true, the list item will be disabled. */
  disabled?: boolean;
  /**
   * If the list item is focusable and reacts to mouse over events.
   * Defaults to true if the container list is interactive, false otherwise.
   */
  interactive?: boolean;
  /**
   * If `true` compacts the vertical spacing intended to separate the list items.
   * Defaults to the value set in container list.
   */
  condensed?: boolean;
  /**
   * If `true`, the left and right padding is removed.
   * Defaults to the value set in container list.
   */
  disableGutters?: boolean;
  /**
   * Element placed before the children.
   * Also removes the left padding (gutter).
   *
   * Some modifications are applied, assuming that it is either an icon (changing the color when the item is disabled)
   * or a selector (preventing the double focus ring, propagating the checked and disabled states and wiring the onChange event).
   * If unwanted, the element should be placed directly as a child.
   */
  startAdornment?: React.ReactNode;
  /**
   * Element placed after the children and aligned next to the margin.
   * Also removes the right padding (gutter).
   *
   * Some modifications are applied, assuming that it is an icon (changing the color when the item is disabled).
   * If unwanted, the element should be placed directly as a child.
   */
  endAdornment?: React.ReactNode;
  /** A Jss Object used to override or extend the styles applied to the empty state component. */
  classes?: {
    root?: string;
    focus?: string;
    startAdornment?: string;
    endAdornment?: string;
    gutters?: string;
    condensed?: string;
    interactive?: string;
    selected?: string;
    disabled?: string;
    withStartAdornment?: string;
    withEndAdornment?: string;
  };
};

const applyClassNameAndStateToElement = (
  element,
  selected,
  disabled,
  onClick,
  className,
  externalClassname
) => {
  if (element != null) {
    return React.cloneElement(element, {
      className: clsx(className, externalClassname, element?.props?.className),
      checked: !!selected,
      disabled,
      onChange: (evt) => onClick?.(evt),
    });
  }

  return null;
};

const applyClassNameToElement = (element, className, externalClassname) => {
  if (element != null) {
    return React.cloneElement(element, {
      className: clsx(className, externalClassname, element?.props?.className),
    });
  }

  return null;
};

/**
 * ListItem description/documentation paragraph
 */
export const HvListItem = ({
  id,
  classes,
  className,
  role,
  selected,
  disabled,
  interactive: interactiveProp,
  condensed: condensedProp,
  disableGutters: disableGuttersProp,
  startAdornment,
  endAdornment,
  onClick,
  children,
  tabIndex,
  ...others
}: HvListItemProps) => {
  const {
    topContainerRef,
    condensed: condensedContext,
    disableGutters: disableGuttersContext,
    interactive: interactiveContext,
  } = useContext<any>(HvListContext);

  const condensed = condensedProp != null ? condensedProp : condensedContext;
  const disableGutters =
    disableGuttersProp != null ? disableGuttersProp : disableGuttersContext;
  const interactive =
    interactiveProp != null ? interactiveProp : interactiveContext;

  const handleOnClick = useCallback(
    (evt) => {
      if (!disabled) {
        onClick?.(evt);
      }
    },
    [disabled, onClick]
  );

  const clonedStartAdornment = useMemo(
    () =>
      applyClassNameAndStateToElement(
        startAdornment,
        selected,
        disabled,
        handleOnClick,
        clsx("startAdornment", disabled && "disabled"),
        classes?.startAdornment
      ),
    [classes?.startAdornment, disabled, handleOnClick, selected, startAdornment]
  );
  const clonedEndAdornment = useMemo(
    () =>
      applyClassNameToElement(
        endAdornment,
        clsx("endAdornment", disabled && "disabled"),
        classes?.endAdornment
      ),
    [classes?.endAdornment, endAdornment]
  );

  const roleOptionAriaProps =
    role === "option" || role === "menuitem"
      ? {
          "aria-disabled": disabled || undefined,
          "aria-selected": selected,
        }
      : {};

  const listItem = (
    <StyledListItem
      id={id}
      role={role}
      onClick={handleOnClick}
      onKeyDown={() => {}}
      className={clsx(
        className,
        classes?.root,
        !disableGutters && classes?.gutters,
        !disableGutters && "gutters",
        condensed && classes?.condensed,
        condensed && "condensed",
        interactive && classes?.interactive,
        interactive && "interactive",
        selected && classes?.selected,
        selected && "selected",
        disabled && classes?.disabled,
        disabled && "disabled",
        startAdornment != null && classes?.withStartAdornment,
        startAdornment != null && "withStartAdornment",
        endAdornment != null && classes?.withEndAdornment,
        endAdornment != null && "withEndAdornment"
      )}
      $gutters={!disableGutters}
      $interactive={interactive}
      $disabled={disabled || false}
      $selected={selected || false}
      $startAdornment={startAdornment != null}
      $endAdornment={endAdornment != null}
      {...roleOptionAriaProps}
      {...others}
    >
      {clonedStartAdornment}
      {children}
      {clonedEndAdornment}
    </StyledListItem>
  );

  return interactiveProp ? (
    <StyledFocus
      rootRef={topContainerRef}
      selected={selected}
      disabledClass={disabled || undefined}
      strategy={role === "option" ? "listbox" : "menu"}
      classes={{ focus: classes?.focus }}
      configuration={{
        tabIndex,
      }}
    >
      {listItem}
    </StyledFocus>
  ) : (
    listItem
  );
};
