import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core";
import { setId } from "../utils";
import { HvBaseDropdown, HvFormElement, HvLabel, HvTypography } from "..";
import withLabels from "../withLabels";
import withId from "../withId";
import List from "./List";
import { getSelected, getSelectionLabel } from "./utils";
import styles from "./styles";

const DEFAULT_LABELS = {
  select: undefined,
  selectAll: undefined,
  cancelLabel: "Cancel",
  applyLabel: "Apply",
  multiSelectionConjunction: "/",
  // internal label, used when no select is passed.
  selectSingle: "Select..."
};

/**
 * A drop-down list is a graphical control element, similar to a list box, that allows the user to choose one value from a list.
 */
const HvDropdown = ({
  className,
  id,
  classes,
  values,
  multiSelect = false,
  showSearch = false,
  disabled = false,
  expanded = false,
  onChange,
  notifyChangesOnFirstRender = false,
  labels,
  hasTooltips = false,
  disablePortal = false,
  singleSelectionToggle = true,
  placement,
  popperProps = {}
}) => {
  const [isOpen, setIsOpen] = useState(expanded);
  const [selectionLabel, setSelectionLabel] = useState(
    getSelectionLabel(values, labels, multiSelect)
  );
  const [internalValues, setInternalValues] = useState(values);

  useEffect(() => {
    if (expanded !== isOpen) {
      setIsOpen(expanded && !disabled);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expanded, disabled]);

  /**
   * Applies the selected values to the state
   *
   * @param {Array} listValues - An array containing the selected values.
   * @param {Boolean} commitChanges - If `true` the selection if finally committed the dropdown header text should reflect the new selection
   * @param {Boolean} toggle -If `true` the dropdown should toggle it's current state
   * @param {Boolean} notifyChanges -If `true` the dropdown will call onChange.
   */
  const handleSelection = (listValues, commitChanges, toggle, notifyChanges = true) => {
    const selected = getSelected(listValues);
    if (commitChanges) {
      setInternalValues(listValues);
      setSelectionLabel(getSelectionLabel(listValues, labels, multiSelect));
    }
    if (toggle) setIsOpen(false);
    if (notifyChanges) onChange?.(multiSelect ? selected : selected[0]);
  };

  const buildHeaderLabel = () => {
    const hasSelection = getSelected(internalValues).length > 0;
    return labels.select || !multiSelect ? (
      <HvTypography
        variant={isOpen || hasSelection ? "normalText" : "placeholderText"}
        className={clsx(classes.truncate, {
          [classes.selectionDisabled]: disabled
        })}
      >
        {selectionLabel.selected}
      </HvTypography>
    ) : (
      <HvTypography
        className={clsx(classes.truncate, {
          [classes.selectionDisabled]: disabled
        })}
        variant="normalText"
      >
        <b>{selectionLabel.selected}</b>
        {` ${labels.multiSelectionConjunction} ${selectionLabel.total}`}
      </HvTypography>
    );
  };

  return (
    <HvFormElement
      id={id}
      className={clsx(className, classes.root)}
      disabled={disabled}
      value={getSelected(internalValues)}
    >
      {labels.title && (
        <HvLabel
          htmlFor={id}
          aria-disabled={disabled}
          className={classes.label}
          label={labels.title}
        />
      )}
      <HvBaseDropdown
        classes={{ root: classes.dropdown, arrow: classes.arrow }}
        expanded={isOpen}
        disabled={disabled}
        disablePortal={disablePortal}
        placement={placement}
        popperProps={popperProps}
        placeholder={buildHeaderLabel()}
        onToggle={(e, s) => setIsOpen(s)}
        role="combobox"
      >
        <List
          id={setId(id, "values")}
          classes={{
            rootList: classes.rootList
          }}
          values={internalValues}
          multiSelect={multiSelect}
          showSearch={showSearch}
          onChange={handleSelection}
          labels={labels}
          notifyChangesOnFirstRender={notifyChangesOnFirstRender}
          hasTooltips={hasTooltips}
          singleSelectionToggle={singleSelectionToggle}
          aria-labelledby={labels.title ? setId(id, "label") : undefined}
        />
      </HvBaseDropdown>
    </HvFormElement>
  );
};

HvDropdown.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * Id to be applied to the root node.
   */
  id: PropTypes.string,
  /**
   * A Jss Object used to override or extend the component styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the component root class.
     */
    root: PropTypes.string,
    /**
     * Styles applied to the dropdown.
     */
    dropdown: PropTypes.string,
    /**
     * Styles applied to the label.
     */
    label: PropTypes.string,
    /**
     * Styles applied to the arrow
     */
    arrow: PropTypes.string,
    /**
     * Styles applied for truncating the list elements.
     */
    truncate: PropTypes.string,
    /**
     * Styles applied when the selection is disabled.
     */
    selectionDisabled: PropTypes.string,
    /**
     * Styles applied to the list.
     */
    rootList: PropTypes.string
  }).isRequired,
  /**
   * The list to be rendered by the dropdown.
   */
  values: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.node.isRequired,
      value: PropTypes.any,
      selected: PropTypes.bool
    })
  ),
  /**
   * If `true` the dropdown is multiSelect, if `false` the dropdown is single select.
   */
  multiSelect: PropTypes.bool,
  /**
   * If `true` the dropdown is rendered with a search bar, if `false` there won't be a search bar.
   */
  showSearch: PropTypes.bool,
  /**
   * If `true` the dropdown is disabled unable to be interacted, if `false` it is enabled.
   */
  disabled: PropTypes.bool,
  /**
   * If `true` the dropdown starts opened if `false` it starts closed.
   */
  expanded: PropTypes.bool,
  /**
   * A function to be executed whenever a item is selected in the dropdown, the function receives the selected item(s).
   */
  onChange: PropTypes.func,
  /**
   * If 'true' the dropdown will notify on the first render.
   */
  notifyChangesOnFirstRender: PropTypes.bool,
  /**
   * An object containing all the labels for the dropdown.
   */
  labels: PropTypes.shape({
    /**
     * Title for the dropdown.
     */
    title: PropTypes.string,
    /**
     * Label for overwrite the default header behaviour.
     */
    select: PropTypes.string,
    /**
     * Label used for the All checkbox action.
     */
    selectAll: PropTypes.string,
    /**
     * Cancel button label.
     */
    cancelLabel: PropTypes.string,
    /**
     * Apply button label.
     */
    applyLabel: PropTypes.string,
    /**
     * The label used in the middle of the multiSelection count.
     */
    multiSelectionConjunction: PropTypes.string
  }),
  /**
   * If `true` the dropdown will show tooltips when user mouseenter text in list
   */
  hasTooltips: PropTypes.bool,
  /**
   * Disable the portal behavior.
   * The children stay within it's parent DOM hierarchy.
   */
  disablePortal: PropTypes.bool,
  /**
   * If `true`, selection can be toggled when single selection.
   */
  singleSelectionToggle: PropTypes.bool,
  /**
   * Placement of the dropdown.
   */
  placement: PropTypes.oneOf(["left", "right"]),
  /**
   * An object containing props to be wired to the popper component.
   */
  popperProps: PropTypes.shape()
};

export default withStyles(styles, { name: "HvDropdown" })(
  withLabels(DEFAULT_LABELS)(withId(HvDropdown))
);
