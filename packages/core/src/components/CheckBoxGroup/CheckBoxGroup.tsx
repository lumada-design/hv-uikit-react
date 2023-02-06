import { HvFormStatus } from "../Forms";
import { HvBaseProps } from "../../types";
import {
  StyledFormElement,
  StyledGroupContainer,
  StyledLabel,
} from "./CheckBoxGroup.styles";
import clsx from "clsx";
import { useControlled, useUniqueId } from "hooks";
import { multiSelectionEventHandler, setId } from "utils";
import { HvCheckBox, HvInfoMessage, HvWarningText } from "components";
import { Children, cloneElement, useCallback, useMemo, useRef } from "react";
import checkBoxGroupClasses, {
  HvCheckBoxGroupClasses,
} from "./checkBoxGroupClasses";

const computeSelectAllState = (selected, total) => {
  if (selected === 0) {
    return "none";
  }

  if (selected === total) {
    return "all";
  }

  return "some";
};

const getValueFromSelectedChildren = (children: React.ReactNode) => {
  const selectedValues = Children.toArray(children)
    .map((child: any) => {
      const childIsControlled = child?.props?.checked !== undefined;
      const childIsSelected = childIsControlled
        ? child?.props?.checked
        : child?.props?.defaultChecked;

      return childIsSelected ? child?.props?.value : undefined;
    })
    .filter((v) => v !== undefined);

  return selectedValues;
};

export type HvCheckBoxGroupProps = HvBaseProps<HTMLDivElement, { onChange }> & {
  /**
   * The form element name.
   *
   * It is propagated to the children checkboxes, unless they already have one.
   */
  name?: string;
  /**
   * The value of the form element. An array of values represented in the child checkboxes.
   *
   * When defined the checkbox group state becomes controlled.
   */
  value?: any[];
  /**
   * When uncontrolled, defines the initial value.
   */
  defaultValue?: any[];
  /**
   * The label of the form element.
   *
   * The form element must be labeled for accessibility reasons.
   * If not provided, an aria-label or aria-labelledby must be provided instead.
   */
  label?: React.ReactNode;
  /**
   * Provide additional descriptive text for the form element.
   */
  description?: React.ReactNode;
  /**
   * Indicates that the form element is disabled.
   * If `true` the state is propagated to the children checkboxes.
   */
  disabled?: boolean;
  /**
   * Indicates that the form element is not editable.
   * If `true` the state is propagated to the children checkboxes.
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
  status?: HvFormStatus;
  /**
   * The error message to show when the validation status is "invalid".
   *
   * Defaults to "Required" when the status is uncontrolled and no `aria-errormessage` is provided.
   */
  statusMessage?: React.ReactNode;
  /**
   * The callback fired when the value changes.
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, value: any[]) => void;
  /**
   * Indicates whether the checkbox group's orientation is horizontal or vertical.
   *
   * Defaults to vertical.
   */
  orientation?: "vertical" | "horizontal";
  /**
   * Indicates if an additional select all checkbox should be shown.
   */
  showSelectAll?: boolean;
  /**
   * The label of the select all checkbox. Defaults to "All".
   */
  selectAllLabel?: string;
  /**
   * Custom label for select all checkbox conjunction
   */
  selectAllConjunctionLabel?: string;
  /**
   * A Jss Object used to override or extend the component styles applied.
   */
  classes?: HvCheckBoxGroupClasses;
};

/**
 * A group of checkboxes.
 *
 * A checkbox group is a type of selection list that allows the user to select multiple options through the use of checkboxes.
 */
export const HvCheckBoxGroup = ({
  id,
  classes,
  className,
  children,
  name,
  label,
  description,
  status,
  statusMessage,
  defaultValue,
  value: valueProp,
  required = false,
  readOnly = false,
  disabled = false,
  showSelectAll = false,
  orientation = "vertical",
  selectAllLabel = "All",
  selectAllConjunctionLabel = "/",
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy,
  "aria-errormessage": ariaErrorMessage,
  onChange,
  ...others
}: HvCheckBoxGroupProps) => {
  const [value, setValue] = useControlled(
    valueProp,
    defaultValue !== undefined
      ? defaultValue
      : // When uncontrolled and no default value is given,
        // extract the initial selected values from the children own state
        () => getValueFromSelectedChildren(children)
  );

  const [validationState, setValidationState] = useControlled(
    status,
    "standBy"
  );

  const [validationMessage] = useControlled(statusMessage, "Required");

  const elementId = useUniqueId(id, "hvcheckboxgroup");

  const selectionAnchor = useRef(undefined);

  const [allValues, selectedState, selectedCount] = useMemo(() => {
    const childValues: any[] = [];
    const childSelectedState: boolean[] = [];
    let childSelectedCounter = 0;

    Children.toArray(children).forEach((child: any, i: number) => {
      const childValue = child?.props?.value;
      const childIsSelected = value.indexOf(childValue) !== -1;

      childValues[i] = childValue;
      childSelectedState[i] = childIsSelected;

      if (childIsSelected) {
        childSelectedCounter += 1;
      }
    });

    return [childValues, childSelectedState, childSelectedCounter];
  }, [children, value]);

  const selectAllState = computeSelectAllState(
    value.length,
    selectedState.length
  );

  const onChildChangeInterceptor = useCallback(
    (
      index: number,
      childOnChange: (
        event: React.ChangeEvent<HTMLInputElement>,
        isChecked: boolean
      ) => void,
      event: React.ChangeEvent<HTMLInputElement>,
      isChecked: boolean
    ) => {
      const newValue = multiSelectionEventHandler(
        event,
        index,
        selectionAnchor,
        allValues,
        selectedState,
        isChecked
      );

      childOnChange?.(event, isChecked);

      onChange?.(event, newValue);

      setValue(() => {
        // This will only run if uncontrolled

        if (required && newValue.length === 0) {
          setValidationState("invalid");
        } else {
          setValidationState("valid");
        }

        return newValue;
      });
    },
    [allValues, onChange, required, selectedState, setValidationState, setValue]
  );

  const modifiedChildren = useMemo(() => {
    return Children.map(children, (child: any, i: number) => {
      const childIsSelected = selectedState[i];

      return cloneElement(child, {
        checked: childIsSelected,
        name: child?.props?.name || name,
        onChange: (
          event: React.ChangeEvent<HTMLInputElement>,
          isChecked: boolean
        ) =>
          onChildChangeInterceptor(i, child?.props?.onChange, event, isChecked),
        disabled: disabled || child?.props?.disabled,
        readOnly: readOnly || child?.props?.readOnly,
      });
    });
  }, [
    children,
    disabled,
    name,
    onChildChangeInterceptor,
    readOnly,
    selectedState,
  ]);

  const handleSelectAll = (
    event: React.ChangeEvent<HTMLInputElement>,
    selectAllChecked: boolean
  ) => {
    let newValue: any[];
    if (selectAllChecked) {
      newValue = [...allValues];
    } else {
      newValue = [];
    }

    onChange?.(event, newValue);

    setValue(() => {
      // This will only run if uncontrolled
      if (required && newValue.length === 0) {
        setValidationState("invalid");
      } else {
        setValidationState("valid");
      }

      return newValue;
    });
  };

  const selectAllLabelComponent = (
    <>
      {selectedCount === 0 ? (
        <>
          <b>{selectAllLabel}</b>
          {` (${Children.toArray(children).length})`}
        </>
      ) : (
        <>
          <b>{selectedCount}</b>
          {` ${selectAllConjunctionLabel} ${Children.toArray(children).length}`}
        </>
      )}
    </>
  );

  // The error message area will only be created if:
  //   - an external element that provides an error message isn't identified via aria-errormessage AND
  //   - both status and statusMessage properties are being controlled OR
  //   - status is uncontrolled and required is true
  const canShowError =
    ariaErrorMessage == null &&
    ((status !== undefined && statusMessage !== undefined) ||
      (status === undefined && required));

  const errorMessageId = canShowError
    ? setId(elementId, "error")
    : ariaErrorMessage;

  return (
    <StyledFormElement
      id={id}
      name={name}
      status={validationState}
      disabled={disabled}
      required={required}
      readOnly={readOnly}
      className={clsx(className, classes?.root, checkBoxGroupClasses.root)}
    >
      {label && (
        <StyledLabel
          id={setId(elementId, "label")}
          label={label}
          className={clsx(classes?.label, checkBoxGroupClasses.label)}
        />
      )}

      {description && (
        <HvInfoMessage id={setId(elementId, "description")}>
          {description}
        </HvInfoMessage>
      )}

      <StyledGroupContainer
        role="group"
        aria-label={ariaLabel}
        aria-labelledby={
          ariaLabelledBy || (label && setId(elementId, "label")) || undefined
        }
        aria-disabled={disabled ? true : undefined}
        aria-invalid={validationState === "invalid" ? true : undefined}
        aria-errormessage={
          validationState === "invalid" ? errorMessageId : undefined
        }
        aria-describedby={
          [description && setId(elementId, "description"), ariaDescribedBy]
            .join(" ")
            .trim() || undefined
        }
        className={clsx(
          classes?.group,
          checkBoxGroupClasses.group,
          orientation === "vertical" &&
            clsx(classes?.vertical, checkBoxGroupClasses.vertical),
          orientation === "horizontal" &&
            clsx(classes?.horizontal, checkBoxGroupClasses.horizontal),
          validationState === "invalid" &&
            clsx(classes?.invalid, checkBoxGroupClasses.invalid)
        )}
        $vertical={orientation === "vertical"}
        $horizontal={orientation === "horizontal"}
        $invalid={validationState === "invalid"}
        {...others}
      >
        {showSelectAll && (
          <HvCheckBox
            checked={selectAllState === "all"}
            indeterminate={selectAllState === "some"}
            label={selectAllLabelComponent}
            disabled={disabled}
            readOnly={readOnly}
            className={clsx(classes?.selectAll, checkBoxGroupClasses.selectAll)}
            onChange={handleSelectAll}
          />
        )}
        {modifiedChildren}
      </StyledGroupContainer>

      {canShowError && (
        <HvWarningText
          id={setId(elementId, "error")}
          disableBorder
          className={clsx(classes?.error, checkBoxGroupClasses.error)}
        >
          {validationMessage}
        </HvWarningText>
      )}
    </StyledFormElement>
  );
};
