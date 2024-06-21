/* eslint-disable @typescript-eslint/no-use-before-define */
import { useRef, useState } from "react";
import { Popper } from "@mui/base/Popper";
import { SelectOption } from "@mui/base/useOption";
import {
  SelectProvider,
  useSelect,
  UseSelectParameters,
} from "@mui/base/useSelect";
import { useControlled, useForkRef } from "@mui/material/utils";
import type { Placement } from "@popperjs/core";
import clsx from "clsx";

import { HvButtonProps } from "../Button";
import { HvDropdownButton } from "../DropdownButton";
import {
  HvFormElement,
  HvFormElementProps,
  HvFormStatus,
  HvInfoMessage,
  HvLabel,
  HvWarningText,
} from "../Forms";
import { useDefaultProps } from "../hooks/useDefaultProps";
import { useTheme } from "../hooks/useTheme";
import { useUniqueId } from "../hooks/useUniqueId";
import { HvListContainer } from "../ListContainer";
import { HvPanel } from "../Panel";
import { fixedForwardRef } from "../types/generic";
import { ExtractNames } from "../utils/classes";
import { setId } from "../utils/setId";
import { staticClasses, useClasses } from "./Select.styles";

function defaultRenderValue<Value>(
  options: SelectOption<Value> | SelectOption<Value>[] | null,
) {
  if (Array.isArray(options)) {
    if (options.length === 0) return null;
    return <>{options.map((o) => o.label).join(", ")}</>;
  }

  return options?.label ?? null;
}

const mergeIds = (...ids: clsx.ClassValue[]) => clsx(ids) || undefined;

export { staticClasses as selectClasses };

export type HvSelectClasses = ExtractNames<typeof useClasses>;

export interface HvSelectProps<
  OptionValue extends {},
  Multiple extends boolean = false,
> extends Omit<HvFormElementProps, "value" | "defaultValue" | "onChange">,
    Pick<
      UseSelectParameters<OptionValue, Multiple>,
      | "name"
      | "required"
      | "disabled"
      | "multiple"
      | "open"
      | "defaultOpen"
      | "value"
      | "defaultValue"
      | "buttonRef"
      | "options"
      | "getSerializedValue"
      | "onChange"
      | "onOpenChange"
    >,
    Pick<HvButtonProps, "size" | "variant"> {
  classes?: HvSelectClasses;
  placeholder?: React.ReactNode;
  autoComplete?: string;
  /** Whether the width of the select panel can vary independently. */
  variableWidth?: boolean;
  /**
   * Properties passed on to the input element.
   */
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  /**  If enabled the panel will be rendered using a portal , if disabled will be under the DOM hierarchy of the parent component. */
  enablePortal?: boolean;
}

/**
 * The `HvSelect` component is a form control element that allows selection from a list of options.
 *
 * It aims to be aligned with the native HTML `<select>` and `<option>` APIs and be easily integrated with forms.
 *
 * @example
 * <HvSelect name="pets">
 *   <HvOption value="dog">Dog</HvOption>
 *   <HvOption value="cat">Cat</HvOption>
 * </HvSelect>
 * */
export const HvSelect = fixedForwardRef(function HvSelect<
  OptionValue extends {},
  Multiple extends boolean = false,
>(
  props: HvSelectProps<OptionValue, Multiple>,
  ref: React.Ref<HTMLButtonElement>,
) {
  const {
    children,
    classes: classesProp,
    className,
    id: idProp,
    size,
    variant = "secondarySubtle",
    name,
    required,
    disabled: disabledProp,
    readOnly,
    label,
    open: openProp,
    defaultOpen,
    multiple,
    autoComplete,
    options: optionsProp,
    variableWidth,
    value: valueProp,
    defaultValue,
    placeholder,
    inputProps,
    enablePortal,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    description,
    "aria-describedby": ariaDescribedBy,
    status,
    statusMessage,
    "aria-errormessage": ariaErrorMessage,
    getSerializedValue,
    onClick,
    onChange,
    onOpenChange,
    ...others
  } = useDefaultProps("HvSelect", props);
  const { classes, cx } = useClasses(classesProp);

  const { rootId } = useTheme();

  const [placement, setPlacement] = useState<Placement>("bottom-start");

  const buttonRef = useRef<HTMLButtonElement>(null);
  const handleButtonRef = useForkRef(ref, buttonRef);

  const {
    contextValue,
    disabled,
    getButtonProps,
    getListboxProps,
    getHiddenInputProps,
    getOptionMetadata,
    value,
    open,
  } = useSelect<OptionValue, Multiple>({
    componentName: "HvSelect",
    name,
    required,
    disabled: disabledProp,
    multiple,
    open: openProp,
    defaultOpen,
    value: valueProp,
    defaultValue,
    options: optionsProp,
    buttonRef: handleButtonRef,
    getSerializedValue,
    onChange,
    onOpenChange: handleOpenChange,
  });

  const id = useUniqueId(idProp);
  const labelId = useUniqueId(setId(idProp, "label"));
  const descriptionId = useUniqueId(setId(idProp, "description"));
  const errorMessageId = useUniqueId(setId(idProp, "error"));

  const [validationMessage] = useControlled({
    name: "HvSelect.statusMessage",
    controlled: statusMessage,
    default: "Required",
  });
  const [validationState, setValidationState] = useControlled<HvFormStatus>({
    name: "HvSelect.status",
    controlled: status,
    default: "standBy",
  });

  function handleOpenChange(newOpen: boolean) {
    if (!newOpen) {
      const hasValue = multiple ? (value as OptionValue[]).length > 0 : !!value;
      setValidationState(required && !hasValue ? "invalid" : "valid");
    }
    onOpenChange?.(newOpen);
  }

  // the error message area will only be created if:
  // - an external element that provides an error message isn't identified via aria-errormessage AND
  //   - both status and statusMessage properties are being controlled OR
  //   - status is uncontrolled and required is true
  const canShowError =
    ariaErrorMessage == null &&
    ((status !== undefined && statusMessage !== undefined) ||
      (status === undefined && required));

  const isInvalid = validationState === "invalid";

  const actualValue = multiple
    ? (value as OptionValue[])
        .map((v) => getOptionMetadata(v))
        .filter((v): v is SelectOption<OptionValue> => v !== undefined)
    : getOptionMetadata(value as OptionValue) ?? null;

  const isOpen = open && !!children;

  return (
    <HvFormElement
      name={name}
      required={required}
      disabled={disabled}
      readOnly={readOnly}
      status={validationState}
      className={cx(classes.root, className, {
        [classes.disabled]: disabled,
        [classes.readOnly]: readOnly,
      })}
      {...others}
    >
      {(label || description) && (
        <div className={classes.labelContainer}>
          {label && (
            <HvLabel
              id={labelId}
              htmlFor={id}
              label={label}
              className={classes.label}
            />
          )}
          {description && (
            <HvInfoMessage id={descriptionId} className={classes.description}>
              {description}
            </HvInfoMessage>
          )}
        </div>
      )}
      <HvDropdownButton
        id={id}
        open={isOpen}
        disabled={disabled}
        readOnly={readOnly}
        className={cx(classes.select, {
          [classes.invalid]: validationState === "invalid",
        })}
        placement={placement}
        size={size}
        variant={variant}
        aria-label={ariaLabel}
        aria-labelledby={mergeIds(ariaLabelledBy, { [labelId]: label })}
        aria-invalid={isInvalid ? true : undefined}
        aria-errormessage={errorMessageId}
        aria-describedby={mergeIds(ariaDescribedBy, {
          [descriptionId]: description,
        })}
        {...getButtonProps()}
      >
        {defaultRenderValue(actualValue) ?? placeholder}
      </HvDropdownButton>
      <Popper
        open={isOpen}
        keepMounted
        disablePortal={!enablePortal}
        container={
          enablePortal
            ? document.getElementById(rootId || "") || document.body
            : undefined
        }
        anchorEl={buttonRef.current}
        className={classes.popper}
        placement={placement}
        modifiers={[
          {
            enabled: true,
            phase: "main",
            fn: ({ state }) => setPlacement(state.placement),
          },
        ]}
      >
        <HvPanel
          style={{
            width: variableWidth
              ? "auto"
              : (buttonRef.current?.clientWidth || 0) + 2,
          }}
          className={cx(classes.panel, className, {
            [classes.panelOpenedUp]: placement.includes("top"),
            [classes.panelOpenedDown]: placement.includes("bottom"),
          })}
        >
          <SelectProvider value={contextValue}>
            <HvListContainer condensed selectable {...getListboxProps()}>
              {children}
            </HvListContainer>
          </SelectProvider>
        </HvPanel>
      </Popper>
      <input
        {...getHiddenInputProps()}
        autoComplete={autoComplete}
        {...inputProps}
      />
      {canShowError && (
        <HvWarningText
          id={errorMessageId}
          disableBorder
          className={classes.error}
        >
          {validationMessage}
        </HvWarningText>
      )}
    </HvFormElement>
  );
});
