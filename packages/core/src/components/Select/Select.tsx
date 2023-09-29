import * as Popover from "@radix-ui/react-popover";
import { UseSelectStateChange, useSelect } from "downshift";

import { DropDownXS, DropUpXS } from "@hitachivantara/uikit-react-icons";

import { ExtractNames } from "@core/utils";
import { useTheme } from "@core/hooks";
import { HvBaseProps } from "@core/types";
import { HvTypography } from "@core/components/Typography";

import { staticClasses, useClasses } from "./Select.styles";

export { staticClasses as selectClasses };

export type HvSelectClasses = ExtractNames<typeof useClasses>;

export interface HvSelectValue {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

export interface HvSelectProps extends HvBaseProps<HTMLDivElement, "onChange"> {
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
  /** Callback called when the dropdown changes the expanded state. */
  onToggle?: (open?: boolean) => void;
  /** The callback fired when the value changes. */
  onChange?: (value?: HvSelectValue | HvSelectValue[]) => void;
  /** Callback called when the user clicks outside the component. */
  onClickOutside?: (event: Event) => void;
  /** A Jss Object used to override or extend the component styles. */
  classes?: HvSelectClasses;
}

const itemToString = (item: HvSelectValue | null) => {
  return item ? item.label : "";
};

export const HvSelect = ({
  className,
  disablePortal,
  expanded,
  defaultExpanded,
  values = [],
  placeholder = "Select...",
  onToggle: onToggleProp,
  onChange: onChangeProp,
  onClickOutside: onClickOutsideProp,
  classes: classesProp,
  "aria-labelledby": ariaLabelledByProp,
  "aria-label": ariaLabelProp,
  ...others
}: HvSelectProps) => {
  const { classes, cx, css } = useClasses(classesProp);

  const { rootId } = useTheme();

  const handleChange = (changes: UseSelectStateChange<HvSelectValue>) => {
    onChangeProp?.(changes.selectedItem || undefined);
  };

  const handleToggle = (changes: UseSelectStateChange<HvSelectValue>) => {
    onToggleProp?.(changes.isOpen);
  };

  const {
    isOpen,
    selectedItem,
    highlightedIndex,
    getToggleButtonProps,
    getMenuProps,
    getItemProps,
  } = useSelect<HvSelectValue>({
    items: values,
    defaultIsOpen: defaultExpanded,
    isOpen: expanded,
    itemToString, // Needed to enable the native search through the items list
    onIsOpenChange: handleToggle,
    onSelectedItemChange: handleChange,
  });

  const handleClickOutside = (event: Event) => {
    if (isOpen) {
      onClickOutsideProp?.(event);
    }
  };

  const contentContainer = (() => {
    const { "aria-labelledby": menuAriaLabelledBy, ...otherMenuProps } =
      getMenuProps();

    const content = (
      // Popper: https://www.radix-ui.com/primitives/docs/components/select#change-the-positioning-mode
      <Popover.Content
        sideOffset={-1}
        onPointerDownOutside={handleClickOutside}
        className={cx(
          classes.contentContainer,
          css({
            display: isOpen ? "flex" : "none",
          })
        )}
        aria-labelledby={ariaLabelledByProp}
        aria-label={ariaLabelProp}
      >
        <ul
          {...otherMenuProps}
          aria-labelledby={ariaLabelledByProp}
          aria-label={ariaLabelProp}
          className={classes.listContainer}
        >
          {isOpen &&
            values.map((item, index) => {
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

  const { "aria-labelledby": toggleAriaLabelledBy, ...otherToggleProps } =
    getToggleButtonProps();

  return (
    <Popover.Root open>
      <Popover.Trigger asChild>
        <div
          {...otherToggleProps}
          aria-labelledby={ariaLabelledByProp}
          aria-label={ariaLabelProp}
          className={cx(classes.triggerContainer, className)}
          {...others}
        >
          {selectedItem ? (
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
            {isOpen ? <DropUpXS role="none" /> : <DropDownXS role="none" />}
          </div>
        </div>
      </Popover.Trigger>
      {contentContainer}
    </Popover.Root>
  );
};
