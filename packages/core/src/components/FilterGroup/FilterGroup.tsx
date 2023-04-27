import {
  HvFormElement,
  HvFormElementProps,
  HvFormStatus,
  HvInfoMessage,
  HvLabel,
  HvWarningText,
} from "@core/components";
import filterGroupClasses, { HvFilterGroupClasses } from "./filterGroupClasses";
import {
  HvFilterGroupContent,
  HvFilterGroupContentProps,
} from "./FilterContent";
import { clsx } from "clsx";
import { useControlled, useLabels, useUniqueId } from "@core/hooks";
import { styles } from "./FilterGroup.styles";
import { setId } from "@core/utils";
import { HvFilterGroupProvider } from "./FilterGroupContext";
import { ClassNames } from "@emotion/react";

export type HvFilterGroupValue = (string | number)[][];

export interface HvFilterGroupLabels {
  /** Apply button label. */
  applyLabel?: string;
  /** Cancel button label. */
  cancelLabel?: string;
  /** Cancel button label. */
  clearLabel?: string;
  /** Placeholder label. */
  placeholder?: string;
  /** SearchBox placeholder label. */
  searchBoxPlaceholder?: string;
  /** Select All placeholder label. */
  selectAll?: string;
  /** Multi selection conjunction placeholder label. */
  multiSelectionConjunction?: string;
}

export type HvFilterGroupFilters = {
  id: string;
  name: string;
  data: {
    id: string | number;
    name: string;
  }[];
}[];

export type HvFilterGroupHorizontalPlacement = "left" | "right";

export interface HvFilterGroupProps
  extends Omit<
    HvFormElementProps,
    "onChange" | "defaultValue" | "statusMessage"
  > {
  /** The initial value of the input when in single calendar mode. */
  filters: HvFilterGroupFilters;
  /** The form element name. */
  name?: string;
  /**
   * The label of the form element.
   *
   * The form element must be labeled for accessibility reasons.
   * If not provided, an aria-label or aria-labelledby must be provided instead.
   */
  label?: React.ReactNode;
  /**  Provide additional descriptive text for the form element. */
  description?: React.ReactNode;
  /** Indicates that the form element is disabled. */
  disabled?: boolean;
  /** Indicates that user input is required on the form element. */
  required?: boolean;
  /**
   * The status of the form element.
   *
   * Valid is correct, invalid is incorrect and standBy means no validations have run.
   *
   * When uncontrolled and unspecified it will default to "standBy" and change to either "valid"
   * or "invalid" after any change to the state.
   */
  status?: HvFormStatus;
  /**  The error message to show when `status` is "invalid". Defaults to "Required". */
  statusMessage?: React.ReactNode;
  /** The callback fired when the cancel button is clicked. */
  onCancel?: (event: React.MouseEvent<HTMLButtonElement> | Event) => void;
  /** The callback fired when the clear filters button is clicked. */
  onClear?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** The callback fired when the value changes. */
  onChange?: (
    event: React.MouseEvent<HTMLButtonElement>,
    value?: HvFilterGroupValue
  ) => void;
  /** An Object containing the various text associated with the input. */
  labels?: HvFilterGroupLabels;
  /** The placeholder value when nothing is selected. */
  placeholder?: string;
  /** The default value of the filter group. If defined the clear action will reset to it. */
  defaultValue?: HvFilterGroupValue;
  /** The value of the filter group. */
  value?: HvFilterGroupValue;
  /** The placement where the filter group should be placed according to the input. Options are `left` or `right`. */
  horizontalPlacement?: HvFilterGroupHorizontalPlacement;
  /** Disable the portal behavior. The children stay within it's parent DOM hierarchy. */
  disablePortal?: boolean;
  /** Sets if the filter container should be out of the screen or stay visible. */
  escapeWithReference?: boolean;
  /** The height of the filter panel, between 295 and 425. Defaults to 350 */
  height?: number | string;
  /** The filter content props */
  filterContentProps?: Partial<HvFilterGroupContentProps>;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvFilterGroupClasses;
}

const DEFAULT_LABELS: HvFilterGroupLabels = {
  applyLabel: "Apply",
  cancelLabel: "Cancel",
  clearLabel: "Clear Filters",
  placeholder: "Filters",
  searchBoxPlaceholder: "Search",
  selectAll: "All",
  multiSelectionConjunction: "/",
};

/**
 * This component implements one potential use-case of the Filter Group pattern Design System Specifies.
 * Due to the enormous variety of capabilities required for this, we strongly recommend checking the code of the component and extend it yourself,
 * while we do not provide a better approach for building this component with smaller and more composable parts.
 */
export const HvFilterGroup = ({
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
  defaultValue,
  value,
  filters,
  horizontalPlacement = "right",
  disablePortal = true,
  escapeWithReference = true,
  height = 350,
  filterContentProps,
  classes,
  ...others
}: HvFilterGroupProps) => {
  const [validationMessage] = useControlled(statusMessage, "Required");

  const elementId = useUniqueId(id, "hvfiltergroup");

  const labels = useLabels(DEFAULT_LABELS, labelsProp);

  const hasLabel = label != null;

  const hasDescription = description != null;

  // Error message area will only be needed if the status is being controlled
  // or if required is true
  const canShowError = status !== undefined || required;

  return (
    <ClassNames>
      {({ css }) => (
        <HvFormElement
          id={id}
          name={name}
          value={value}
          status={status}
          disabled={disabled}
          required={required}
          className={clsx(className, classes?.root, filterGroupClasses.root)}
          {...others}
        >
          {(hasLabel || hasDescription) && (
            <div
              className={clsx(
                classes?.labelContainer,
                filterGroupClasses.labelContainer,
                css(styles.labelContainer)
              )}
            >
              {hasLabel && (
                <HvLabel
                  id={setId(elementId, "label")}
                  htmlFor={setId(elementId, "input")}
                  label={label}
                  className={clsx(
                    classes?.label,
                    filterGroupClasses.label,
                    css(styles.label)
                  )}
                />
              )}

              {hasDescription && (
                <HvInfoMessage
                  id={setId(elementId, "description")}
                  className={clsx(
                    classes?.description,
                    filterGroupClasses.description
                  )}
                >
                  {description}
                </HvInfoMessage>
              )}
            </div>
          )}
          <HvFilterGroupProvider
            defaultValue={defaultValue}
            value={value}
            filters={filters}
          >
            <HvFilterGroupContent
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
              <HvWarningText
                id={setId(elementId, "error")}
                disableBorder
                className={clsx(classes?.error, filterGroupClasses.error)}
              >
                {validationMessage}
              </HvWarningText>
            )}
          </HvFilterGroupProvider>
        </HvFormElement>
      )}
    </ClassNames>
  );
};
