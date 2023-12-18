import React, { forwardRef, useCallback, useContext, useMemo } from "react";

import { HvBaseProps } from "@core/types/generic";
import { useDefaultProps } from "@core/hooks/useDefaultProps";
import { ExtractNames } from "@core/utils/classes";
import { HvFocus } from "@core/Focus";

import HvListContext from "../ListContext";
import { staticClasses, useClasses } from "./ListItem.styles";

export { staticClasses as listItemClasses };

export type HvListItemClasses = ExtractNames<typeof useClasses>;

export interface HvListItemProps extends HvBaseProps<HTMLLIElement> {
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
}

const applyClassNameAndStateToElement = (
  element,
  selected,
  disabled,
  onClick,
  className
) => {
  if (element != null) {
    return React.cloneElement(element, {
      className,
      checked: !!selected,
      disabled,
      onChange: (evt) => onClick?.(evt),
    });
  }

  return null;
};

const applyClassNameToElement = (element, className) => {
  if (element != null) {
    return React.cloneElement(element, {
      className,
    });
  }

  return null;
};

/**
 * ListItem description/documentation paragraph
 */
export const HvListItem = forwardRef<any, HvListItemProps>((props, ref) => {
  const {
    id,
    classes: classesProp,
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
  } = useDefaultProps("HvListItem", props);

  const { classes, cx } = useClasses(classesProp);

  const {
    topContainerRef,
    condensed: condensedContext,
    disableGutters: disableGuttersContext,
    interactive: interactiveContext,
  } = useContext(HvListContext);

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
        cx(
          classes.startAdornment,
          { [classes.disabled]: disabled },
          React.isValidElement(startAdornment)
            ? startAdornment.props.className
            : undefined
        )
      ),
    [
      cx,
      classes?.startAdornment,
      classes?.disabled,
      disabled,
      handleOnClick,
      selected,
      startAdornment,
    ]
  );
  const clonedEndAdornment = useMemo(
    () =>
      applyClassNameToElement(
        endAdornment,
        cx(
          classes.endAdornment,
          { [classes.disabled]: disabled },
          React.isValidElement(endAdornment)
            ? endAdornment.props.className
            : undefined
        )
      ),
    [cx, classes?.endAdornment, classes?.disabled, disabled, endAdornment]
  );

  const roleOptionAriaProps =
    role === "option" || role === "menuitem"
      ? {
          "aria-disabled": disabled || undefined,
          "aria-selected": selected,
        }
      : {};

  const listItem = (
    // For later: this should only have an onClick event if interactive and has the appropriate role.
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <li
      id={id}
      ref={ref}
      role={role}
      value={value}
      className={cx(
        classes.root,
        {
          [classes.gutters]: !disableGutters,
          [classes.condensed]: condensed,
          [classes.interactive]: interactive,
          [classes.selected]: !!selected,
          [classes.disabled]: !!disabled,
          [classes.withStartAdornment]: startAdornment != null,
          [classes.withEndAdornment]: endAdornment != null,
        },
        className
      )}
      onClick={handleOnClick}
      onKeyDown={() => {}} // Needed because of jsx-a11yclick-events-have-key-events
      {...roleOptionAriaProps}
      {...others}
    >
      {clonedStartAdornment}
      {children}
      {clonedEndAdornment}
    </li>
  );

  return interactive ? (
    <HvFocus
      rootRef={topContainerRef}
      selected={selected}
      disabledClass={disabled || undefined}
      strategy={role === "option" ? "listbox" : "menu"}
      classes={{ focus: classes.focus }}
      configuration={{
        tabIndex,
      }}
    >
      {listItem}
    </HvFocus>
  ) : (
    listItem
  );
});
