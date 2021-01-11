import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core";
import { setId, useLabels } from "../utils";
import {
  HvBaseDropdown,
  HvFormElement,
  HvLabel,
  HvInfoMessage,
  HvWarningText,
  HvTypography,
  useUniqueId,
  useControlled,
} from "..";
import List from "./List";
import { getSelected, getSelectionLabel } from "./utils";
import styles from "./styles";

const DEFAULT_LABELS = {
  select: undefined,
  selectAll: "All",
  cancelLabel: "Cancel",
  applyLabel: "Apply",
  searchPlaceholder: "Search",
  multiSelectionConjunction: "/",
};

/**
 * A dropdown list is a graphical control element, similar to a list box, that allows the user to choose one value from a list.
 */
const HvDropdown = (props) => {
  const {
    classes,
    className,

    id,
    name,

    required = false,
    disabled = false,

    label,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    description,
    "aria-describedby": ariaDescribedBy,

    placeholder = "Select...",

    onChange,

    status,
    statusMessage,

    values,
    multiSelect = false,
    showSearch = false,
    expanded = false,
    notifyChangesOnFirstRender = false,
    labels: labelsProp,
    hasTooltips = false,
    disablePortal = false,
    singleSelectionToggle = true,
    placement,
    popperProps = {},
  } = props;

  const labels = useLabels(DEFAULT_LABELS, labelsProp);

  const elementId = useUniqueId(id, "hvdropdown");

  const [validationState, setValidationState] = useControlled(status, "standBy");

  const [validationMessage] = useControlled(statusMessage, "Required");

  const [isOpen, setIsOpen] = useState(expanded);
  const [selectionLabel, setSelectionLabel] = useState(
    getSelectionLabel(values, labels, placeholder, multiSelect)
  );
  const [internalValues, setInternalValues] = useState(values);

  useEffect(() => {
    if (expanded !== isOpen) {
      setIsOpen(expanded && !disabled);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expanded, disabled]);

  useEffect(() => {
    setInternalValues(values);
  }, [values]);

  useEffect(() => {
    setSelectionLabel(getSelectionLabel(values, labels, placeholder, multiSelect));
  }, [labels, multiSelect, placeholder, values]);

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
      setSelectionLabel(getSelectionLabel(listValues, labels, placeholder, multiSelect));

      setValidationState(() => {
        // this will only run if status is uncontrolled
        if (required && selected.length === 0) {
          return "invalid";
        }

        return "valid";
      });
    }
    if (toggle) setIsOpen(false);
    if (notifyChanges) onChange?.(multiSelect ? selected : selected[0]);
  };

  const onToggle = (_e, open) => {
    setIsOpen(open);

    if (!open) {
      // also run built-in validation when closing without changes
      // as the user "touched" the input
      setValidationState(() => {
        // this will only run if status is uncontrolled
        if (required) {
          const hasSelection = getSelected(internalValues).length > 0;

          if (!hasSelection) {
            return "invalid";
          }
        }

        return "valid";
      });
    }
  };

  const setFocusToContent = (containerRef) => {
    const inputs = containerRef?.getElementsByTagName("input");
    if (inputs?.length > 0) {
      inputs[0].focus();
      return;
    }
    const listItems = [...containerRef?.getElementsByTagName("li")];
    listItems.every((listItem) => {
      if (listItem.tabIndex >= 0) {
        listItem.focus();
        return false;
      }
      return true;
    });
  };

  const buildHeaderLabel = () => {
    const hasSelection = getSelected(internalValues).length > 0;
    return labels.select || !multiSelect ? (
      <HvTypography
        noWrap
        variant={isOpen || hasSelection ? "normalText" : "placeholderText"}
        className={clsx(classes.placeholder, {
          [classes.selectionDisabled]: disabled,
        })}
      >
        {selectionLabel.selected}
      </HvTypography>
    ) : (
      <HvTypography
        noWrap
        className={clsx(classes.placeholder, {
          [classes.selectionDisabled]: disabled,
        })}
        variant="normalText"
      >
        <b>{selectionLabel.selected}</b>
        {` ${labels.multiSelectionConjunction} ${selectionLabel.total}`}
      </HvTypography>
    );
  };

  const hasLabel = label != null;
  const hasDescription = description != null;

  // error message area will only be needed if the status is being controlled
  // or if required is true
  const canShowError = status !== undefined || required;

  return (
    <HvFormElement
      id={id}
      name={name}
      status={validationState}
      disabled={disabled}
      required={required}
      className={clsx(className, classes.root)}
    >
      {(hasLabel || hasDescription) && (
        <div className={classes.labelContainer}>
          {hasLabel && (
            <HvLabel id={setId(elementId, "label")} label={label} className={classes.label} />
          )}

          {hasDescription && (
            <HvInfoMessage id={setId(elementId, "description")} className={classes.description}>
              {description}
            </HvInfoMessage>
          )}
        </div>
      )}
      <HvBaseDropdown
        id={setId(id, "dropdown")}
        classes={{ root: classes.dropdown, arrow: classes.arrow }}
        expanded={isOpen}
        disabled={disabled}
        disablePortal={disablePortal}
        placement={placement}
        popperProps={popperProps}
        placeholder={buildHeaderLabel()}
        onToggle={onToggle}
        onContainerCreation={setFocusToContent}
        role="combobox"
        aria-label={ariaLabel}
        aria-labelledby={
          [label && setId(elementId, "label"), ariaLabelledBy].join(" ").trim() || undefined
        }
        aria-invalid={validationState === "invalid" ? true : undefined}
        aria-errormessage={validationState === "invalid" ? setId(elementId, "error") : undefined}
        aria-describedby={
          [description && setId(elementId, "description"), ariaDescribedBy].join(" ").trim() ||
          undefined
        }
      >
        <List
          id={setId(elementId, "values")}
          classes={{
            rootList: classes.rootList,
          }}
          values={internalValues}
          multiSelect={multiSelect}
          showSearch={showSearch}
          onChange={handleSelection}
          labels={labels}
          notifyChangesOnFirstRender={notifyChangesOnFirstRender}
          hasTooltips={hasTooltips}
          singleSelectionToggle={singleSelectionToggle}
          aria-labelledby={hasLabel ? setId(elementId, "label") : undefined}
        />
      </HvBaseDropdown>
      {canShowError && (
        <HvWarningText id={setId(elementId, "error")} disableBorder className={classes.error}>
          {validationMessage}
        </HvWarningText>
      )}
    </HvFormElement>
  );
};

HvDropdown.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * A Jss Object used to override or extend the component styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the component root class.
     */
    root: PropTypes.string,

    /**
     * Styles applied to the container of the labels elements.
     */
    labelContainer: PropTypes.string,
    /**
     * Styles applied to the label element.
     */
    label: PropTypes.string,
    /**
     * Styles applied to the icon information text.
     */
    description: PropTypes.string,

    /**
     * Styles applied to the error area.
     */
    error: PropTypes.string,

    /**
     * Styles applied to the dropdown.
     */
    dropdown: PropTypes.string,

    /**
     * Styles applied to the arrow
     */
    arrow: PropTypes.string,
    /**
     * Styles applied for truncating the list elements.
     */
    placeholder: PropTypes.string,
    /**
     * Styles applied when the selection is disabled.
     */
    selectionDisabled: PropTypes.string,
    /**
     * Styles applied to the list.
     */
    rootList: PropTypes.string,
  }).isRequired,

  /**
   * Id to be applied to the form element root node.
   */
  id: PropTypes.string,

  /**
   * The form element name.
   */
  name: PropTypes.string,

  /**
   * The label of the form element.
   *
   * The form element must be labeled for accessibility reasons.
   * If not provided, an aria-label or aria-labelledby must be provided instead.
   */
  label: PropTypes.node,
  /**
   * @ignore
   */
  "aria-label": PropTypes.string,
  /**
   * @ignore
   */
  "aria-labelledby": PropTypes.string,
  /**
   * Provide additional descriptive text for the form element.
   */
  description: PropTypes.node,
  /**
   * @ignore
   */
  "aria-describedby": PropTypes.string,

  /**
   * The placeholder value when nothing is selected.
   */
  placeholder: PropTypes.string,

  /**
   * Indicates that the form element is disabled.
   */
  disabled: PropTypes.bool,
  /**
   * Indicates that user input is required on the form element.
   */
  required: PropTypes.bool,

  /**
   * The status of the form element.
   *
   * Valid is correct, invalid is incorrect and standBy means no validations have run.
   *
   * When uncontrolled and unspecified it will default to "standBy" and change to either "valid"
   * or "invalid" after any change to the state.
   */
  status: PropTypes.oneOf(["standBy", "valid", "invalid"]),
  /**
   * The error message to show when `status` is "invalid". Defaults to "Required".
   */
  statusMessage: PropTypes.node,

  /**
   * The callback fired when the value changes.
   */
  onChange: PropTypes.func,

  /**
   * The list to be rendered by the dropdown.
   */
  values: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.node.isRequired,
      value: PropTypes.any,
      selected: PropTypes.bool,
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
   * If `true` the dropdown starts opened if `false` it starts closed.
   */
  expanded: PropTypes.bool,
  /**
   * If 'true' the dropdown will notify on the first render.
   */
  notifyChangesOnFirstRender: PropTypes.bool,
  /**
   * An object containing all the labels for the dropdown.
   */
  labels: PropTypes.shape({
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
    multiSelectionConjunction: PropTypes.string,
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
  popperProps: PropTypes.shape(),
};

export default withStyles(styles, { name: "HvDropdown" })(HvDropdown);
