import React, { useCallback, useContext, useMemo } from "react";
import clsx from "clsx";
import { HvBaseProps } from "../../../types";
import { StyledListItem, StyledFocus } from "./ListItem.styles";
import HvListContext from "../ListContext";
import listItemClasses, { HvListItemClasses } from "./listItemClasses";

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
  /** The value to be set on the 'li' element */
  value?: any;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvListItemClasses;
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
  value,
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
        clsx(
          listItemClasses.startAdornment,
          disabled && listItemClasses.disabled
        ),
        clsx(classes?.startAdornment, disabled && classes?.disabled)
      ),
    [classes?.startAdornment, disabled, handleOnClick, selected, startAdornment]
  );
  const clonedEndAdornment = useMemo(
    () =>
      applyClassNameToElement(
        endAdornment,
        clsx(
          listItemClasses.endAdornment,
          disabled && listItemClasses.disabled
        ),
        clsx(classes?.endAdornment, disabled && classes?.disabled)
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
      value={value}
      onClick={handleOnClick}
      onKeyDown={() => {}}
      className={clsx(
        className,
        listItemClasses.root,
        classes?.root,
        !disableGutters && clsx(listItemClasses.gutters, classes?.gutters),
        condensed && clsx(listItemClasses.condensed, classes?.condensed),
        interactive && clsx(listItemClasses.interactive, classes?.interactive),
        selected && clsx(listItemClasses.selected, classes?.selected),
        disabled && clsx(listItemClasses.disabled, classes?.disabled),
        startAdornment != null &&
          clsx(listItemClasses.withStartAdornment, classes?.withStartAdornment),
        endAdornment != null &&
          clsx(listItemClasses.withEndAdornment, classes?.withEndAdornment)
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
      classes={{ focus: clsx(classes?.focus, listItemClasses.focus) }}
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
