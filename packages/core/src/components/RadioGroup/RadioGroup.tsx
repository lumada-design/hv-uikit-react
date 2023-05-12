import { Children, useMemo, useCallback, cloneElement } from "react";
import { HvFormStatus, HvInfoMessage, HvWarningText } from "../Forms";
import { HvBaseProps } from "@core/types";
import {
  StyledFormElement,
  StyledGroup,
  StyledLabel,
} from "./RadioGroup.styles";
import { clsx } from "clsx";
import { useControlled, useUniqueId } from "@core/hooks";
import { setId } from "@core/utils";
import radioGroupClasses, { HvRadioGroupClasses } from "./radioGroupClasses";

export interface HvRadioGroupProps
  extends HvBaseProps<HTMLDivElement, "onChange"> {
  /**
   * The form element name.
   *
   * It is propagated to the children radio buttons, unless they already have one (which they shouldn't).
   */
  name?: string;
  /**
   * The value of the form element, represented in one of the child radio buttons values.
   *
   * When defined the radio button group state becomes controlled.
   */
  value?: any;
  /**
   * When uncontrolled, defines the initial value.
   */
  defaultValue?: any;
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
   * If `true` the state is propagated to the children radio buttons.
   */
  disabled?: boolean;
  /**
   * Indicates that the form element is not editable.
   * If `true` the state is propagated to the children radio buttons.
   */
  readOnly?: boolean;
  /**
   * Indicates that user input is required on the form element.
   * If `true` the state is propagated to the children radio buttons' input element.
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
   * The error message to show when `status` is "invalid".
   */
  statusMessage?: React.ReactNode;
  /**
   * The callback fired when the value changes.
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, value: any) => void;
  /**
   * Indicates whether the radio buttons group's orientation is horizontal or vertical.
   *
   * Defaults to vertical.
   */
  orientation?: "vertical" | "horizontal";
  /**
   * A Jss Object used to override or extend the component styles applied.
   */
  classes?: HvRadioGroupClasses;
}

const getValueFromSelectedChildren = (children: React.ReactNode) => {
  const childrenArray = Children.toArray(children);
  const childrenCount = childrenArray.length;
  for (let i = 0; i !== childrenCount; i += 1) {
    const child: any = childrenArray[i];

    const childIsControlled = child?.props?.checked !== undefined;
    const childIsSelected = childIsControlled
      ? child?.props?.checked
      : child?.props?.defaultChecked;

    if (childIsSelected) {
      return child?.props?.value;
    }
  }

  return null;
};

/**
 * A group of radio buttons.
 *
 * A radio group is a type of selection list that can only have a single entry checked at any one time.
 */
export const HvRadioGroup = ({
  id,
  classes,
  className,
  children,
  name,
  value: valueProp,
  defaultValue,
  label,
  description,
  status,
  statusMessage,
  required = false,
  readOnly = false,
  disabled = false,
  orientation = "vertical",
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy,
  "aria-errormessage": ariaErrorMessage,
  onChange,
  ...others
}: HvRadioGroupProps) => {
  const elementId = useUniqueId(id, "hvradiogroup");

  const [value, setValue] = useControlled(
    valueProp,
    defaultValue !== undefined
      ? defaultValue
      : // When uncontrolled and no default value is given,
        // extract the initial selected values from the children own state
        () => getValueFromSelectedChildren(children)
  );

  const onChildChangeInterceptor = useCallback(
    (
      childOnChange: (
        event: React.ChangeEvent<HTMLInputElement>,
        checked: boolean,
        value: any
      ) => void,
      event: React.ChangeEvent<HTMLInputElement>,
      isChecked: boolean,
      newValue: any
    ) => {
      childOnChange?.(event, isChecked, newValue);

      onChange?.(event, newValue);

      setValue(newValue);
    },
    [onChange, setValue]
  );

  const modifiedChildren = useMemo(() => {
    return Children.map(children, (child: any) => {
      const childValue = child?.props?.value ?? "on";

      const childIsSelected = childValue === value;

      return cloneElement(child, {
        checked: childIsSelected,
        name: child?.props?.name || name || elementId,
        onChange: (
          event: React.ChangeEvent<HTMLInputElement>,
          isChecked: boolean,
          newValue: any
        ) =>
          onChildChangeInterceptor(
            child?.props?.onChange,
            event,
            isChecked,
            newValue
          ),
        inputProps: {
          ...child?.props?.inputProps,
          // Set the required attribute directly in the input
          // the radio form element context shouldn't be aware so the
          // label doesn't show redundant asterisk
          required,
        },
        disabled: disabled || child?.props?.disabled,
        readOnly: readOnly || child?.props?.readOnly,
      });
    });
  }, [
    children,
    disabled,
    elementId,
    name,
    onChildChangeInterceptor,
    readOnly,
    required,
    value,
  ]);

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
      status={status || "standBy"}
      disabled={disabled}
      required={required}
      readOnly={readOnly}
      className={clsx(className, classes?.root, radioGroupClasses.root)}
    >
      {label && (
        <StyledLabel
          id={setId(elementId, "label")}
          label={label}
          className={clsx(classes?.label, radioGroupClasses.label)}
        />
      )}

      {description && (
        <HvInfoMessage id={setId(elementId, "description")}>
          {description}
        </HvInfoMessage>
      )}

      <StyledGroup
        role="radiogroup"
        aria-label={ariaLabel}
        aria-labelledby={
          ariaLabelledBy || (label && setId(elementId, "label")) || undefined
        }
        aria-invalid={status === "invalid" ? true : undefined}
        aria-errormessage={status === "invalid" ? errorMessageId : undefined}
        aria-describedby={
          [description && setId(elementId, "description"), ariaDescribedBy]
            .join(" ")
            .trim() || undefined
        }
        className={clsx(
          classes?.group,
          radioGroupClasses.group,
          orientation === "vertical" &&
            clsx(classes?.vertical, radioGroupClasses.vertical),
          orientation === "horizontal" &&
            clsx(classes?.horizontal, radioGroupClasses.horizontal),
          status === "invalid" &&
            clsx(classes?.invalid, radioGroupClasses.invalid)
        )}
        $vertical={orientation === "vertical"}
        $horizontal={orientation === "horizontal"}
        $invalid={status === "invalid"}
        {...others}
      >
        {modifiedChildren}
      </StyledGroup>

      {canShowError && (
        <HvWarningText
          id={setId(elementId, "error")}
          disableBorder
          className={clsx(classes?.error, radioGroupClasses.error)}
        >
          {statusMessage}
        </HvWarningText>
      )}
    </StyledFormElement>
  );
};
