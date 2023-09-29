import { useMemo, useState } from "react";

import * as Popover from "@radix-ui/react-popover";
import { UseSelectStateChange, useSelect } from "downshift";

import { DropDownXS, DropUpXS } from "@hitachivantara/uikit-react-icons";
import { theme } from "@hitachivantara/uikit-styles";

import { ExtractNames, setId } from "@core/utils";
import { useControlled, useLabels, useTheme, useUniqueId } from "@core/hooks";
import { HvTypography } from "@core/components/Typography";
import {
  HvFormElement,
  HvFormElementProps,
  HvInfoMessage,
  HvLabel,
  HvWarningText,
  isInvalid,
} from "@core/components/Forms";
import { HvCheckBox } from "@core/components/CheckBox";

import { staticClasses, useClasses } from "./Dropdown.styles";
import { HvSelectValue } from "./Select";

export { staticClasses as dropdownClasses };

export type HvDropdownClasses = ExtractNames<typeof useClasses>;

export interface HvDropdownLabels {
  /** Label used for the select all checkbox action. */
  selectAll?: string;
  /** The label used in the middle of the multiple count. */
  multiple?: string;
}

export interface HvDropdownProps
  extends Omit<HvFormElementProps, "onChange" | "classes"> {
  /** The list of values to be rendered by the dropdown. */
  values?: HvSelectValue[];
  /** Disable the portal behavior. The children stay within it's parent DOM hierarchy. */
  disablePortal?: boolean;
  /** The placeholder value when nothing is selected. */
  placeholder?: string;
  /** If `true`, the dropdown starts expanded. Otherwise it's not expanded. */
  expanded?: boolean;
  /** When uncontrolled, defines the initial expanded state. */
  defaultExpanded?: boolean;
  /** If `true`, it's possible to select multiple values. */
  multiple?: boolean;
  /** Labels. */
  labels?: HvDropdownLabels;
  /** Callback called when the dropdown changes the expanded state. */
  onToggle?: (open?: boolean) => void;
  /** The callback fired when the value changes. */
  onChange?: (value?: HvSelectValue | HvSelectValue[]) => void;
  /** Callback called when the user clicks outside the component. */
  onClickOutside?: (event: Event) => void;
  /** A Jss Object used to override or extend the component styles. */
  classes?: HvDropdownClasses;
}

const DEFAULT_LABELS: HvDropdownLabels = {
  selectAll: "All",
  multiple: "/",
};

const SELECT_ALL_VALUE = "hv-select-all";

const allOption: HvSelectValue = { label: "", value: SELECT_ALL_VALUE };

const itemToString = (item: HvSelectValue | null) => {
  return item ? item.label : "";
};

export const HvDropdown = ({
  id,
  name,
  readOnly,
  disabled,
  required,
  status,
  statusMessage,
  label,
  description,

  labels: labelsProp,
  multiple,
  disablePortal,
  expanded,
  defaultExpanded,
  values = [],
  "aria-errormessage": ariaErrorMessageProp,
  "aria-labelledby": ariaLabelledByProp,
  "aria-label": ariaLabelProp,
  "aria-describedby": ariaDescribedByProp,
  placeholder = "Select...",
  onToggle: onToggleProp,
  onChange: onChangeProp,
  onClickOutside: onClickOutsideProp,
  classes: classesProp,
  ...others
}: HvDropdownProps) => {
  const { classes, cx, css } = useClasses(classesProp);

  const { rootId } = useTheme();

  const elementId = useUniqueId(id, "hvselect");
  const labelId = setId(elementId, "label");
  const descriptionId = setId(elementId, "description");

  const labels = useLabels(DEFAULT_LABELS, labelsProp);

  // The error message appears if:
  //   - an external element that provides an error message isn't identified via aria-errormessage AND
  //   - both status and statusMessage properties are being controlled OR
  //   - status is uncontrolled and required is true
  const canShowError =
    ariaErrorMessageProp == null &&
    ((status !== undefined && statusMessage !== undefined) ||
      (status === undefined && required));
  const hasLabel = label != null;
  const hasDescription = description != null;

  const [validationState, setValidationState] = useControlled(
    status,
    "standBy"
  );
  const [validationMessage] = useControlled(statusMessage, "Required");

  const ariaLabelledBy =
    [hasLabel ? labelId : undefined, ariaLabelledByProp].join(" ").trim() ||
    undefined;
  const ariaDescribedBy =
    [hasDescription ? descriptionId : undefined, ariaDescribedByProp]
      .join(" ")
      .trim() || undefined;

  const handleValidationState = (
    currValue?: HvSelectValue | HvSelectValue[] | null
  ) => {
    setValidationState(() => {
      if (
        required &&
        (currValue == null ||
          (Array.isArray(currValue) && currValue.length === 0))
      ) {
        return "invalid";
      }

      return "valid";
    });
  };

  const handleChange = (changes: UseSelectStateChange<HvSelectValue>) => {
    onChangeProp?.(changes.selectedItem || undefined);

    handleValidationState(changes.selectedItem);
  };

  const [selectedItems, setSelectedItems] = useState<HvSelectValue[]>([]);

  const handleToggle = (changes: UseSelectStateChange<HvSelectValue>) => {
    if (!readOnly && !disabled) {
      onToggleProp?.(changes.isOpen);

      if (!changes.isOpen) {
        handleValidationState(multiple ? selectedItems : changes.selectedItem);
      }
    }
  };

  const isAllSelected = useMemo(
    () => selectedItems.find((obj) => obj.value === SELECT_ALL_VALUE),
    [selectedItems]
  );

  const items: HvSelectValue[] = useMemo(
    () => (multiple ? [allOption, ...values] : values),
    [multiple, values]
  );

  const {
    isOpen,
    selectedItem,
    highlightedIndex,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getItemProps,
  } = useSelect<HvSelectValue>({
    labelId,
    items,
    itemToString,
    defaultIsOpen: defaultExpanded,
    isOpen: expanded,
    onIsOpenChange: handleToggle,
    ...(!multiple && {
      onSelectedItemChange: handleChange,
    }),
    ...(multiple && {
      selectedItem: null,
      stateReducer: (state, actionAndChanges) => {
        const { changes, type } = actionAndChanges;
        switch (type) {
          case useSelect.stateChangeTypes.ToggleButtonKeyDownEnter:
          case useSelect.stateChangeTypes.ToggleButtonKeyDownSpaceButton:
            return {
              ...changes,
              highlightedIndex: state.highlightedIndex,
              isOpen: true, // Keep the menu open after selection.
            };
          case useSelect.stateChangeTypes.ItemClick:
            return {
              ...changes,
              isOpen: true, // Keep the menu open after selection.
            };
          default:
            return changes;
        }
      },
      onStateChange: ({ type, selectedItem: newSelectedItem }) => {
        switch (type) {
          case useSelect.stateChangeTypes.ToggleButtonKeyDownEnter:
          case useSelect.stateChangeTypes.ToggleButtonKeyDownSpaceButton:
          case useSelect.stateChangeTypes.ItemClick:
          case useSelect.stateChangeTypes.ToggleButtonBlur:
            if (newSelectedItem) {
              const isAllOpt = newSelectedItem.value === SELECT_ALL_VALUE;
              const index = selectedItems.findIndex(
                (obj) => obj.value === newSelectedItem.value
              );
              const alreadySelected = index !== -1;

              if (isAllOpt) {
                if (alreadySelected) {
                  setSelectedItems([]);
                } else {
                  setSelectedItems(items);
                }
                break;
              }

              if (index > 0) {
                const newItems = [
                  ...selectedItems.slice(0, index),
                  ...selectedItems.slice(index + 1),
                ].filter((obj) => obj.value !== SELECT_ALL_VALUE);

                setSelectedItems(newItems);
              } else if (index === 0) {
                const newItems = [...selectedItems.slice(1)].filter(
                  (obj) => obj.value !== SELECT_ALL_VALUE
                );

                setSelectedItems(newItems);
              } else {
                const newItems = [...selectedItems, newSelectedItem];

                if (
                  selectedItems.length - (isAllSelected ? 1 : 0) ===
                  values.length - 1
                ) {
                  newItems.push(allOption);
                }

                setSelectedItems(newItems);
              }
            }
            break;
          default:
            break;
        }
      },
    }),
  });

  const handleClickOutside = (event: Event) => {
    if (isOpen) {
      onClickOutsideProp?.(event);
    }
  };

  const contentContainer = (() => {
    const content = (
      // Popper: https://www.radix-ui.com/primitives/docs/components/select#change-the-positioning-mode
      <Popover.Content
        sideOffset={-1}
        onPointerDownOutside={handleClickOutside}
        className={cx(
          classes.contentContainer,
          css({
            display: isOpen && !readOnly && !disabled ? "flex" : "none",
          })
        )}
        aria-labelledby={ariaLabelledBy}
      >
        <ul
          {...getMenuProps()}
          className={classes.listContainer}
          aria-labelledby={ariaLabelledBy}
        >
          {isOpen &&
            !readOnly &&
            !disabled &&
            items.map((item, index) => {
              if (multiple) {
                const isAllOpt = item.value === SELECT_ALL_VALUE;
                const totalSelected =
                  selectedItems.length - (isAllSelected ? 1 : 0);
                const optChecked = !!selectedItems.find(
                  (obj) => obj.value === item.value
                );
                const optIndeterminate = isAllOpt
                  ? totalSelected > 0 && !optChecked
                  : undefined;
                const optLabelId = setId(elementId, `option-${item.value}`);

                return (
                  <li
                    {...getItemProps({ item, index })}
                    key={`hv-select-${item.value}`}
                    className={cx(classes.itemContainer, {
                      [classes.selectedItem]: !isAllOpt && optChecked,
                      [classes.highlightedItem]: highlightedIndex === index,
                    })}
                  >
                    <HvCheckBox
                      aria-labelledby={optLabelId}
                      checked={optChecked}
                      indeterminate={optIndeterminate}
                      onClick={() => null}
                    />
                    <HvLabel
                      id={optLabelId}
                      className={classes.checkboxLabel}
                      label={
                        isAllOpt ? (
                          totalSelected === 0 ? (
                            <>
                              <b>{labels?.selectAll}</b>
                              &nbsp;({values.length})
                            </>
                          ) : (
                            <>
                              <b>{totalSelected}</b>
                              {`\xa0${labels?.multiple}\xa0`}
                              {values.length}
                            </>
                          )
                        ) : (
                          <>
                            {item.icon}
                            {item.label}
                          </>
                        )
                      }
                    />
                  </li>
                );
              }

              return (
                <li
                  {...getItemProps({ item, index })}
                  key={`hv-select-${item.value}`}
                  className={cx(classes.itemContainer, {
                    [classes.selectedItem]: selectedItem?.value === item.value,
                    [classes.highlightedItem]: highlightedIndex === index,
                  })}
                >
                  {item.icon && (
                    <div className={classes.itemIcon}>{item.icon}</div>
                  )}
                  <div className={classes.itemLabel}>{item.label}</div>
                </li>
              );
            })}
        </ul>
      </Popover.Content>
    );

    if (disablePortal) return content;

    return (
      <Popover.Portal
        container={document.getElementById(rootId || "") || document.body}
      >
        {content}
      </Popover.Portal>
    );
  })();

  const isStateInvalid = isInvalid(validationState);
  let errorMessageId;
  if (isStateInvalid) {
    errorMessageId = canShowError
      ? setId(elementId, "error")
      : ariaErrorMessageProp;
  }

  return (
    <HvFormElement
      id={elementId}
      name={name}
      status={validationState}
      disabled={disabled}
      readOnly={readOnly}
      required={required}
      {...others}
    >
      {(hasLabel || hasDescription) && (
        <div>
          {hasLabel && (
            <HvLabel
              {...getLabelProps()}
              label={label}
              className={classes.label}
            />
          )}

          {hasDescription && (
            <HvInfoMessage id={descriptionId}>{description}</HvInfoMessage>
          )}
        </div>
      )}
      <Popover.Root open>
        <Popover.Trigger asChild>
          <div
            {...getToggleButtonProps()}
            className={cx(classes.triggerContainer, {
              [classes.invalidTriggerContainer]: isStateInvalid,
              [classes.readOnlyTriggerContainer]: readOnly,
              [classes.disabledTriggerContainer]: disabled,
            })}
            aria-readonly={readOnly}
            aria-label={ariaLabelProp}
            aria-invalid={isStateInvalid ? true : undefined}
            aria-errormessage={errorMessageId}
            aria-describedby={ariaDescribedBy}
            aria-labelledby={ariaLabelledBy}
          >
            {multiple ? (
              <HvTypography
                component="div"
                className={classes.multipleValueContainer}
              >
                <b>{selectedItems.length - (isAllSelected ? 1 : 0)}</b>
                <p>
                  &nbsp;{labels?.multiple} {values.length}
                </p>
              </HvTypography>
            ) : selectedItem ? (
              <>
                {selectedItem?.icon && <div>{selectedItem.icon}</div>}
                <HvTypography>{selectedItem?.label}</HvTypography>
              </>
            ) : (
              <HvTypography className={classes.placeholder}>
                {placeholder}
              </HvTypography>
            )}
            <div>
              {isOpen && !readOnly && !disabled ? (
                <DropUpXS role="none" />
              ) : (
                <DropDownXS
                  color={disabled ? theme.colors.secondary_60 : undefined}
                  role="none"
                />
              )}
            </div>
          </div>
        </Popover.Trigger>
        {contentContainer}
      </Popover.Root>
      {canShowError && (
        <HvWarningText id={setId(elementId, "error")} disableBorder>
          {validationMessage}
        </HvWarningText>
      )}
    </HvFormElement>
  );
};
