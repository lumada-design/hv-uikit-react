/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useContext, useMemo } from "react";
import PropTypes from "prop-types";

import clsx from "clsx";

import { withStyles } from "@material-ui/core";
import styles from "./styles";

import Focus from "../../Focus";

import HvListContext from "../ListContext";

const applyClassNameAndStateToElement = (element, selected, disabled, onClick, className) => {
  if (element != null) {
    return React.cloneElement(element, {
      className: clsx(className, element?.props?.className),
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
      className: clsx(className, element?.props?.className),
    });
  }

  return null;
};

/**
 * ListItem description/documentation paragraph
 */
const HvListItem = (props) => {
  const {
    id,
    className,
    classes,
    role,
    interactive: interactiveProp,
    selected,
    disabled,
    condensed: condensedProp,
    disableGutters: disableGuttersProp,
    startAdornment,
    endAdornment,
    onClick,
    children,
    tabIndex,
    ...others
  } = props;

  const {
    topContainerRef,
    containerRole,
    condensed: condensedContext,
    disableGutters: disableGuttersContext,
    interactive: interactiveContext,
    selectable,
  } = useContext(HvListContext);

  const condensed = condensedProp != null ? condensedProp : condensedContext;
  const disableGutters = disableGuttersProp != null ? disableGuttersProp : disableGuttersContext;
  const interactive = interactiveProp != null ? interactiveProp : interactiveContext;

  const itemRole = role || (containerRole === "listbox" ? "option" : undefined);

  const clonedStartAdornment = useMemo(
    () =>
      applyClassNameAndStateToElement(
        startAdornment,
        selected,
        disabled,
        onClick,
        classes.startAdornment
      ),
    [classes.startAdornment, disabled, onClick, selected, startAdornment]
  );
  const clonedEndAdornment = useMemo(
    () => applyClassNameToElement(endAdornment, classes.endAdornment),
    [classes.endAdornment, endAdornment]
  );

  const listItemContent = useMemo(
    () => (
      <>
        {clonedStartAdornment}
        {children}
        {clonedEndAdornment}
      </>
    ),
    [children, clonedEndAdornment, clonedStartAdornment]
  );

  const listItem = useMemo(
    () => (
      <li
        id={id}
        aria-disabled={disabled || undefined}
        // "option": A selectable item in a select list.
        // Authors MUST ensure elements with role "option" are contained in, or owned by, an element with the role "listbox".
        // Elements with the role "option" have an implicit aria-selected value of "false".
        role={itemRole}
        aria-selected={selectable ? selected : undefined}
        onClick={onClick}
        onKeyDown={() => {}}
        className={clsx(className, classes.root, {
          [classes.gutters]: !disableGutters,
          [classes.condensed]: condensed,
          [classes.interactive]: interactive,
          [classes.selected]: selected,
          [classes.disabled]: disabled,
          [classes.withStartAdornment]: startAdornment != null,
          [classes.withEndAdornment]: endAdornment != null,
        })}
        {...others}
      >
        {listItemContent}
      </li>
    ),
    [
      id,
      disabled,
      itemRole,
      selectable,
      selected,
      onClick,
      className,
      classes.root,
      classes.gutters,
      classes.condensed,
      classes.interactive,
      classes.selected,
      classes.disabled,
      classes.withStartAdornment,
      classes.withEndAdornment,
      disableGutters,
      condensed,
      interactive,
      startAdornment,
      endAdornment,
      others,
      listItemContent,
    ]
  );

  return interactive ? (
    <Focus
      rootRef={topContainerRef}
      selected={selected}
      disabledClass={disabled || undefined}
      strategy={containerRole === "listbox" ? "listbox" : "menu"}
      classes={{ focus: classes.focus }}
      configuration={{
        tabIndex,
      }}
    >
      {listItem}
    </Focus>
  ) : (
    listItem
  );
};

HvListItem.propTypes = {
  /**
   * The id of the root element
   */
  id: PropTypes.string,
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
    gutters: PropTypes.string,

    /**
     * Styles applied to the list item when it's focusable and reacts to mouse over events.
     */
    interactive: PropTypes.string,

    /**
     * Styles applied to the selected list item.
     */
    selected: PropTypes.string,
    /**
     * Styles applied to the list item when disabled.
     */
    disabled: PropTypes.string,

    /**
     * Styles applied to the list item when condensed.
     */
    condensed: PropTypes.string,

    /**
     * @ignore
     */
    withStartAdornment: PropTypes.string,
    /**
     * @ignore
     */
    withEndAdornment: PropTypes.string,

    /**
     * Styles applied to the start adornment.
     */
    startAdornment: PropTypes.string,
    /**
     * Styles applied to the end adornment.
     */
    endAdornment: PropTypes.string,

    /**
     * Styles applied when the item is focused.
     */
    focus: PropTypes.string,
  }).isRequired,
  /**
   * Overrides the implicit list item role.
   * It defaults to "option" if unspecified and the container list role is "listbox".
   */
  role: PropTypes.string,
  /**
   * If the list item is focusable and reacts to mouse over events.
   * Defaults to true if the container list is interactive, false otherwise.
   */
  interactive: PropTypes.bool,
  /**
   * Indicates if the list item is selected.
   */
  selected: PropTypes.bool,
  /**
   * If true, the list item will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * If `true` compacts the vertical spacing intended to separate the list items.
   * Defaults to the value set in container list.
   */
  condensed: PropTypes.bool,
  /**
   * If `true`, the left and right padding is removed.
   * Defaults to the value set in container list.
   */
  disableGutters: PropTypes.bool,
  /**
   * Element placed before the children.
   * Also removes the left padding (gutter).
   *
   * Some modifications are applied, assuming that it is either an icon (changing the color when the item is disabled)
   * or a selector (preventing the double focus ring, propagating the checked and disabled states and wiring the onChange event).
   * If unwanted, the element should be placed directly as a child.
   */
  startAdornment: PropTypes.node,
  /**
   * Element placed after the children and aligned next to the margin.
   * Also removes the right padding (gutter).
   *
   * Some modifications are applied, assuming that it is an icon (changing the color when the item is disabled).
   * If unwanted, the element should be placed directly as a child.
   */
  endAdornment: PropTypes.node,
  /**
   * The function executed when the item is pressed.
   * @param event React.MouseEvent<HTMLElement>
   */
  onClick: PropTypes.func,
  /**
   * The list item content.
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  tabIndex: PropTypes.number,
};

export default withStyles(styles, { name: "HvListItem" })(HvListItem);
