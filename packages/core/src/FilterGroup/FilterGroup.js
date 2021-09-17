import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { FilterGroupProvider } from "./FilterGroupContext";
import FilterContent from "./FilterContent";
import useStyles from "./styles";
import {
  setId,
  useLabels,
  useUniqueId,
  useControlled,
  HvFormElement,
  HvLabel,
  HvWarningText,
  HvInfoMessage,
} from "..";

const DEFAULT_LABELS = {
  applyLabel: "Apply",
  cancelLabel: "Cancel",
  clearLabel: "Clear Filters",
  placeholder: "Filters",
  searchBoxPlaceholder: "Search",
  selectAll: "All",
  multiSelectionConjunction: "/",
};

const HvFilterGroup = ({
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

  onChange,
  onCancel,
  onClear,

  status,
  statusMessage,

  labels: labelsProp,

  value,
  filters,

  horizontalPlacement = "right",
  disablePortal = true,
  escapeWithReference = true,

  height = 350,
  filterContentProps,

  ...others
}) => {
  const classes = useStyles();

  const [validationMessage] = useControlled(statusMessage, "Required");

  const elementId = useUniqueId(id, "hvfiltergroup");

  const labels = useLabels(DEFAULT_LABELS, labelsProp);

  const hasLabel = label != null;
  const hasDescription = description != null;

  // error message area will only be needed if the status is being controlled
  // or if required is true
  const canShowError = status !== undefined || required;

  return (
    <HvFormElement
      id={id}
      name={name}
      value={value}
      status={status}
      disabled={disabled}
      required={required}
      className={clsx(className, classes.root)}
      {...others}
    >
      {(hasLabel || hasDescription) && (
        <div className={classes.labelContainer}>
          {hasLabel && (
            <HvLabel
              id={setId(elementId, "label")}
              htmlFor={setId(elementId, "input")}
              label={label}
              className={classes.label}
            />
          )}

          {hasDescription && (
            <HvInfoMessage id={setId(elementId, "description")} className={classes.description}>
              {description}
            </HvInfoMessage>
          )}
        </div>
      )}
      <FilterGroupProvider value={value} filters={filters}>
        <FilterContent
          id={elementId}
          disabled={disabled}
          disablePortal={disablePortal}
          variableWidth
          placement={horizontalPlacement}
          escapeWithReference={escapeWithReference}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          status={status}
          onChange={onChange}
          onCancel={onCancel}
          onClear={onClear}
          labels={labels}
          height={height}
          {...filterContentProps}
        />
        {canShowError && (
          <HvWarningText id={setId(elementId, "error")} disableBorder className={classes.error}>
            {validationMessage}
          </HvWarningText>
        )}
      </FilterGroupProvider>
    </HvFormElement>
  );
};

HvFilterGroup.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,

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
   * The callback fired when the cancel button is clicked.
   */
  onCancel: PropTypes.func,

  /**
   * The callback fired when the clear filters button is clicked.
   */
  onClear: PropTypes.func,

  /**
   * An object containing all the labels for the Filter Group.
   */
  labels: PropTypes.shape({
    /**
     * Apply button label.
     */
    applyLabel: PropTypes.string,
    /**
     * Cancel button label.
     */
    cancelLabel: PropTypes.string,
    /**
     * Clear Filters button label.
     */
    clearLabel: PropTypes.string,
    /**
     * Placeholder label.
     */
    placeholder: PropTypes.string,
    /**
     * SearchBox placeholder label.
     */
    searchBoxPlaceholder: PropTypes.string,
    /**
     * Select All placeholder label.
     */
    selectAll: PropTypes.string,
    /**
     * Multi selection conjunction placeholder label.
     */
    multiSelectionConjunction: PropTypes.string,
  }),

  /**
   * The options of the filter group.
   */
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      data: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
          name: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,

  /**
   * The value of the filter group.
   */
  value: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
  ),
  /**
   * The placement where the filter group should be placed according to the input. Options are `left` or `right`.
   */
  horizontalPlacement: PropTypes.oneOf(["left", "right"]),

  /**
   * Disable the portal behavior. The children stay within it's parent DOM hierarchy.
   */
  disablePortal: PropTypes.bool,
  /**
   * Sets if the filter container should be out of the screen or stay visible.
   */
  escapeWithReference: PropTypes.bool,

  /**
   * The Height of the filter panel, between 295 and 425. Defaults to 350
   */
  height: PropTypes.oneOf([PropTypes.number, PropTypes.string]),

  /**
   * The filter content props
   */
  filterContentProps: PropTypes.object,

  /**
   * If `true` the filter group starts opened if `false` it starts closed.
   */
  expanded: PropTypes.bool,
};

export default HvFilterGroup;
