import { useEffect, useRef, useState } from "react";
import { PopperProps } from "@mui/material";
import clsx from "clsx";
import { setId } from "~/utils";
import { useLabels, useUniqueId, useControlled } from "~/hooks";
import { isInvalid } from "../Forms/FormElement/validationStates";
import { getSelected, getSelectionLabel } from "./utils";
import dropdownClasses, { HvDropdownClasses } from "./dropdownClasses";
import { HvDropdownList, HvDropdownListProps } from "./List";
import {
  StyledDropdown,
  StyledHvFormElement,
  StyledLabel,
  StyledLabelContainer,
  StyledTypography,
} from "./Dropdown.styles";
import { HvBaseProps } from "../../types";
import {
  HvBaseDropdownProps,
  HvInfoMessage,
  HvListValue,
  HvWarningText,
} from "~/components";

export type HvDropdownLabelsProps = {
  /**
   * Label for overwrite the default header behavior.
   */
  select?: string;
  /**
   * Label used for the All checkbox action.
   */
  selectAll?: string;
  /**
   * Cancel button label.
   */
  cancelLabel?: string;
  /**
   * Apply button label.
   */
  applyLabel?: string;
  /**
   * The label used in the middle of the multiSelection count.
   */
  multiSelectionConjunction?: string;
  /**
   * The label used in search.
   */
  searchPlaceholder?: string;
};

export type HvDropdownStatus = "standBy" | "valid" | "invalid";

export type HvDropdownProps = HvBaseProps<HTMLDivElement, { onChange }> & {
  /**
   * Class names to be applied.
   */
  className?: string;
  /**
   * A Jss Object used to override or extend the component styles applied.
   */
  classes?: HvDropdownClasses;
  /**
   * Id to be applied to the form element root node.
   */
  id?: string;
  /**
   * The form element name.
   */
  name?: string;
  /**
   * The label of the form element.
   *
   * The form element must be labeled for accessibility reasons.
   * If not provided, an aria-label or aria-labelledby must be provided instead.
   */
  label?: any;
  /**
   * @ignore
   */
  "aria-label"?: string;
  /**
   * @ignore
   */
  "aria-labelledby"?: string;
  /**
   * Provide additional descriptive text for the form element.
   */
  description?: any;
  /**
   * @ignore
   */
  "aria-describedby"?: string;
  /**
   * The placeholder value when nothing is selected.
   */
  placeholder?: string;

  /**
   * Indicates that the form element is disabled.
   */
  disabled?: boolean;
  /**
   * Indicates that the form element is in read only mode.
   */
  readOnly?: boolean;
  /**
   * Indicates that user input is required on the form element.
   */
  required?: boolean;
  /**
   * The status of the form element.
   *
   * Valid is correct, invalid is incorrect and standBy means no validations have run.
   *
   * When uncontrolled and unspecified it will default to "standBy" and change to either "valid"
   * or "invalid" after any change to the state.
   */
  status?: HvDropdownStatus;
  /**
   * The error message to show when the validation status is "invalid".
   *
   * Defaults to "Required" when the status is uncontrolled and no `aria-errormessage` is provided.
   */
  statusMessage?: any;
  /**
   * Identifies the element that provides an error message for the dropdown.
   *
   * Will only be used when the validation status is invalid.
   */
  "aria-errormessage"?: string;

  /**
   * The callback fired when the value changes.
   */
  onChange?: (selected: HvListValue | HvListValue[] | undefined) => void;

  /**
   * The list to be rendered by the dropdown.
   */
  values?: HvListValue[];
  /**
   * If `true` the dropdown is multiSelect, if `false` the dropdown is single select.
   */
  multiSelect?: boolean;
  /**
   * If `true` the dropdown is rendered with a search bar, if `false` there won't be a search bar.
   */
  showSearch?: boolean;
  /**
   * If `true` the dropdown starts opened if `false` it starts closed.
   */
  expanded?: boolean;
  /**
   * When uncontrolled, defines the initial expanded state.
   */
  defaultExpanded?: boolean;
  /**
   * If 'true' the dropdown will notify on the first render.
   */
  notifyChangesOnFirstRender?: boolean;
  /**
   * An object containing all the labels for the dropdown.
   */
  labels?: HvDropdownLabelsProps;
  /**
   * If `true` the dropdown will show tooltips when user mouseenter text in list
   */
  hasTooltips?: boolean;
  /**
   * Disable the portal behavior.
   * The children stay within it's parent DOM hierarchy.
   */
  disablePortal?: boolean;
  /**
   * If `true` the dropdown width depends size of content if `false` the width depends on the header size.
   * Defaults to `false`.
   */
  variableWidth?: boolean;
  /**
   * If `true`, selection can be toggled when single selection.
   */
  singleSelectionToggle?: boolean;
  /**
   * Placement of the dropdown.
   */
  placement?: "left" | "right";
  /**
   * An object containing props to be wired to the popper component.
   */
  popperProps?: Partial<PopperProps>;

  /**
   * Callback called when the user cancels the changes.
   *
   * Called when the cancel button is used and when the user clicks outside the open container.
   *
   * @param {object} event The event source of the callback.
   */
  onCancel?: (event: Event) => void;
  /**
   * Callback called when dropdown changes the expanded state.
   *
   * @param {object} event The event source of the callback.
   * @param {boolean} open If the dropdown new state is open (`true`) or closed (`false`).
   */
  onToggle?: (event: Event, open: boolean) => void;
  /**
   * Callback called when the user clicks outside the open container.
   *
   * @param {object} event The event source of the callback.
   */
  onClickOutside?: (event: Event) => void;
  /**
   * @ignore
   */
  onFocus?: React.FocusEventHandler<any>;
  /**
   * @ignore
   */
  onBlur?: React.FocusEventHandler<any>;
  /**
   * Experimental. Height of the dropdown, in case you want to control it from a prop. Styles can also be used through dropdownListContainer class. Required in case virtualized is used
   */
  height?: number;
  /**
   * Experimental. Height of the dropdown, in case you want to control it from a prop. Styles can also be used through dropdownListContainer class. Required in case virtualized is used
   */
  maxHeight?: number;
  /**
   * Experimental. Uses dropdown in a virtualized form, where not all options are rendered initially. Good for use cases with a lot of options.
   */
  virtualized?: boolean;
  /**
   * Extra props passed to the dropdown.
   */
  baseDropdownProps?: HvBaseDropdownProps;
  /**
   * Extra props passed to the list.
   */
  listProps?: HvDropdownListProps;
};

const DEFAULT_LABELS: HvDropdownLabelsProps = {
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
export const HvDropdown = (props: HvDropdownProps) => {
  const {
    classes,
    className,

    id,
    name,

    required = false,
    disabled = false,
    readOnly = false,

    label,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    description,
    "aria-describedby": ariaDescribedBy,

    placeholder = "Select...",

    onChange,

    status,
    statusMessage,
    "aria-errormessage": ariaErrorMessage,

    onCancel,
    onToggle,
    onClickOutside,

    onFocus,
    onBlur,

    values,
    multiSelect = false,
    showSearch = false,
    expanded,
    defaultExpanded = false,
    notifyChangesOnFirstRender = false,
    labels: labelsProp,
    hasTooltips = false,
    disablePortal = false,
    singleSelectionToggle = true,
    placement,
    variableWidth = false,
    popperProps = {},
    height,
    maxHeight,
    virtualized = false,
    baseDropdownProps = {},
    listProps = {},
    ...others
  } = props;

  const labels = useLabels(DEFAULT_LABELS, labelsProp);

  const elementId = useUniqueId(id, "hvdropdown");

  const [validationState, setValidationState] = useControlled(
    status,
    "standBy"
  );

  const [validationMessage] = useControlled(statusMessage, "Required");

  const [isOpen, setIsOpen] = useControlled(expanded, Boolean(defaultExpanded));
  const [selectionLabel, setSelectionLabel] = useState(
    getSelectionLabel(labels, placeholder, multiSelect, values)
  );
  const [internalValues, setInternalValues] = useState(values);

  useEffect(() => {
    setInternalValues(values);
  }, [values]);

  useEffect(() => {
    setSelectionLabel(
      getSelectionLabel(labels, placeholder, multiSelect, values)
    );
  }, [labels, multiSelect, placeholder, values]);

  if (virtualized && !height && process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.error(
      "Dropdown/List in virtualized mode requires a height. Please define it."
    );
  }

  const dropdownHeaderRef = useRef<HTMLDivElement>();

  const handleToggle = (_e, open) => {
    onToggle?.(_e, open);

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

  /**
   * Applies the selected values to the state
   *
   * @param {Array} listValues - An array containing the selected values.
   * @param {Boolean} commitChanges - If `true` the selection if finally committed the dropdown header text should reflect the new selection
   * @param {Boolean} toggle -If `true` the dropdown should toggle it's current state
   * @param {Boolean} notifyChanges -If `true` the dropdown will call onChange.
   */
  const handleSelection = (
    listValues,
    commitChanges,
    toggle,
    notifyChanges = true
  ) => {
    const selected = getSelected(listValues);

    if (commitChanges) {
      setInternalValues(listValues);
      setSelectionLabel(
        getSelectionLabel(labels, placeholder, multiSelect, listValues)
      );

      setValidationState(() => {
        // this will only run if status is uncontrolled
        if (required && selected.length === 0) {
          return "invalid";
        }

        return "valid";
      });
    }
    if (notifyChanges) onChange?.(multiSelect ? selected : selected[0]);
    if (toggle) {
      handleToggle(undefined, false);

      // focus-ring won't be visible even if using the keyboard:
      // https://github.com/WICG/focus-visible/issues/88
      dropdownHeaderRef.current?.focus({ preventScroll: true });
    }
  };

  /**
   * Handles the `Cancel` action. Both single and ranged modes are handled here.
   */
  const handleCancel = (evt) => {
    onCancel?.(evt);

    handleToggle(evt, false);

    // focus-ring won't be visible even if using the keyboard:
    // https://github.com/WICG/focus-visible/issues/88
    dropdownHeaderRef.current?.focus({ preventScroll: true });
  };

  const handleClickOutside = (evt) => {
    onClickOutside?.(evt);
    onCancel?.(evt);
  };

  const setFocusToContent = (containerRef) => {
    const inputs = containerRef?.getElementsByTagName("input");
    if (inputs?.length > 0) {
      inputs[0].focus();
      return;
    }
    const listItems =
      containerRef != null ? [...containerRef.getElementsByTagName("li")] : [];
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
    return labels?.select || !multiSelect ? (
      <StyledTypography
        component="div"
        $selectionDisabled={disabled}
        $isOpen={isOpen || hasSelection}
        variant="body"
        className={clsx(
          dropdownClasses?.placeholder,
          classes?.placeholder,
          disabled &&
            clsx(dropdownClasses?.selectionDisabled, classes?.selectionDisabled)
        )}
      >
        {selectionLabel.selected}
      </StyledTypography>
    ) : (
      <StyledTypography
        component="div"
        $selectionDisabled={disabled}
        className={clsx(
          dropdownClasses?.placeholder,
          classes?.placeholder,
          disabled &&
            clsx(dropdownClasses?.selectionDisabled, classes?.selectionDisabled)
        )}
        variant="body"
      >
        <b>{selectionLabel.selected}</b>
        {` ${labels?.multiSelectionConjunction} ${selectionLabel.total}`}
      </StyledTypography>
    );
  };

  const hasLabel = label != null;
  const hasDescription = description != null;

  // the error message area will only be created if:
  // - an external element that provides an error message isn't identified via aria-errormessage AND
  //   - both status and statusMessage properties are being controlled OR
  //   - status is uncontrolled and required is true
  const canShowError =
    ariaErrorMessage == null &&
    ((status !== undefined && statusMessage !== undefined) ||
      (status === undefined && required));

  const isStateInvalid = isInvalid(validationState);

  let errorMessageId;
  if (isStateInvalid) {
    errorMessageId = canShowError
      ? setId(elementId, "error")
      : ariaErrorMessage;
  }

  return (
    <StyledHvFormElement
      id={id}
      name={name}
      status={validationState}
      disabled={disabled}
      readOnly={readOnly}
      required={required}
      className={clsx(className, dropdownClasses.root, classes?.root)}
      $selectionDisabled={disabled}
      {...others}
    >
      {(hasLabel || hasDescription) && (
        <StyledLabelContainer
          className={clsx(
            dropdownClasses.labelContainer,
            classes?.labelContainer
          )}
        >
          {hasLabel && (
            <StyledLabel
              id={setId(elementId, "label")}
              label={label}
              className={clsx(classes?.label, dropdownClasses.label)}
            />
          )}

          {hasDescription && (
            <HvInfoMessage
              id={setId(elementId, "description")}
              className={clsx(
                classes?.description,
                dropdownClasses.description
              )}
            >
              {description}
            </HvInfoMessage>
          )}
        </StyledLabelContainer>
      )}
      <StyledDropdown
        id={setId(id, "dropdown")}
        classes={{
          root: clsx(classes?.dropdown, dropdownClasses.dropdown),
          arrow: clsx(classes?.arrow, dropdownClasses.arrow),
          header: clsx(
            dropdownClasses.dropdownHeader,
            classes?.dropdownHeader,
            isStateInvalid &&
              clsx(
                dropdownClasses.dropdownHeaderInvalid,
                classes?.dropdownHeaderInvalid
              )
          ),
          headerOpen: clsx(
            dropdownClasses.dropdownHeaderOpen,
            classes?.dropdownHeaderOpen
          ),
        }}
        $dropdownHeaderInvalid={isStateInvalid}
        $readOnly={readOnly}
        expanded={isOpen}
        disabled={disabled}
        readOnly={readOnly}
        disablePortal={disablePortal}
        placement={placement}
        popperProps={popperProps}
        placeholder={buildHeaderLabel()}
        onToggle={handleToggle}
        onClickOutside={handleClickOutside}
        onContainerCreation={setFocusToContent}
        role="combobox"
        variableWidth={variableWidth}
        aria-label={ariaLabel}
        aria-labelledby={
          [label && setId(elementId, "label"), ariaLabelledBy]
            .join(" ")
            .trim() || undefined
        }
        aria-invalid={isStateInvalid ? true : undefined}
        aria-errormessage={errorMessageId}
        aria-describedby={
          [description && setId(elementId, "description"), ariaDescribedBy]
            .join(" ")
            .trim() || undefined
        }
        onFocus={onFocus}
        onBlur={onBlur}
        dropdownHeaderRef={dropdownHeaderRef}
        {...baseDropdownProps}
      >
        <HvDropdownList
          id={setId(elementId, "values")}
          classes={{
            rootList: clsx(dropdownClasses.rootList, classes?.rootList),
            dropdownListContainer: clsx(
              dropdownClasses.dropdownListContainer,
              classes?.dropdownListContainer
            ),
          }}
          values={internalValues}
          multiSelect={multiSelect}
          showSearch={showSearch}
          onChange={handleSelection}
          onCancel={handleCancel}
          labels={labels}
          notifyChangesOnFirstRender={notifyChangesOnFirstRender}
          hasTooltips={hasTooltips}
          singleSelectionToggle={singleSelectionToggle}
          aria-labelledby={hasLabel ? setId(elementId, "label") : undefined}
          height={height}
          maxHeight={maxHeight}
          virtualized={virtualized}
          {...listProps}
        />
      </StyledDropdown>
      {canShowError && (
        <HvWarningText
          id={setId(elementId, "error")}
          disableBorder
          className={clsx(dropdownClasses.error, classes?.error)}
        >
          {validationMessage}
        </HvWarningText>
      )}
    </StyledHvFormElement>
  );
};
