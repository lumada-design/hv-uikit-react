import { ChangeEvent, useMemo } from "react";
import { MoreOptionsVertical } from "@hitachivantara/uikit-react-icons";

import { useDefaultProps } from "../hooks/useDefaultProps";
import { useUniqueId } from "../hooks/useUniqueId";
import { useControlled } from "../hooks/useControlled";
import { HvBaseProps } from "../types/generic";
import { isKey } from "../utils/keyboardUtils";
import { setId } from "../utils/setId";
import { getPrevNextFocus } from "../utils/focusableElementFinder";
import { ExtractNames } from "../utils/classes";
import { HvBaseDropdown, HvBaseDropdownProps } from "../BaseDropdown";
import { HvButton, HvButtonVariant } from "../Button";
import { HvList, HvListProps, HvListValue } from "../List";
import { HvPanel } from "../Panel";
import { staticClasses, useClasses } from "./DropDownMenu.styles";

export { staticClasses as dropDownMenuClasses };

export type HvDropDownMenuClasses = ExtractNames<typeof useClasses>;

export interface HvDropDownMenuProps
  extends HvBaseProps<HTMLDivElement, "onClick"> {
  /** Icon. */
  icon?: React.ReactElement;
  /**
   * A list containing the elements to be rendered.
   *
   * - label: The label of the element to be rendered.
   * - selected: The selection state of the element.
   * - disabled: The disabled state of the element.
   * - icon: The icon node to be rendered on the left.
   * - showNavIcon: If true renders the navigation icon on the right.
   */
  dataList: HvListValue[];
  /** Placement of the dropdown. */
  placement?: "left" | "right";
  /** Disable the portal behavior. The children stay within it's parent DOM hierarchy. */
  disablePortal?: boolean;
  /** Function executed on toggle of the dropdown. Should receive the open status. */
  onToggle?: (event: Event, open: boolean) => void;
  /** Function executed in each onClick. Should received the clicked element. */
  onClick?: (
    event: React.ChangeEvent<HTMLLIElement>,
    value: HvListValue
  ) => void;
  /** Keep the Dropdown Menu opened after clicking one option */
  keepOpened?: boolean;
  /** Defines if the component is disabled. */
  disabled?: boolean;
  /** If true it should be displayed open. */
  expanded?: boolean;
  /** When uncontrolled, defines the initial expanded state. */
  defaultExpanded?: boolean;
  /**
   * The variant to be used in the header.
   * @deprecated Use `variant` instead
   */
  category?: HvButtonVariant;
  /** The variant to be used in the header. */
  variant?: HvButtonVariant;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvDropDownMenuClasses;
}

/**
 * A drop-down menu is a graphical control element, similar to a list box, that allows the user to choose a value from a list.
 */
export const HvDropDownMenu = (props: HvDropDownMenuProps) => {
  const {
    id: idProp,
    classes: classesProp,
    className,
    icon,
    placement = "right",
    dataList,
    disablePortal = false,
    onToggle,
    onClick,
    keepOpened = true,
    disabled = false,
    expanded,
    defaultExpanded = false,
    category = "secondaryGhost", // TODO - remove and update variant default in v6
    variant,
    ...others
  } = useDefaultProps("HvDropDownMenu", props);

  const { classes, cx } = useClasses(classesProp);
  const [open, setOpen] = useControlled(expanded, Boolean(defaultExpanded));
  const id = useUniqueId(idProp, "dropdown-menu");
  const focusNodes = getPrevNextFocus(setId(id, "icon-button"));

  const listId = setId(id, "list");

  const handleClose = (event: ChangeEvent) => {
    // this will only run if uncontrolled
    setOpen(false);
    onToggle?.(event as any, false);
  };

  // If the ESCAPE key is pressed inside the list, the close handler must be called.
  const handleKeyDown: HvListProps["onKeyDown"] = (event) => {
    if (isKey(event, "Tab")) {
      const node = event.shiftKey ? focusNodes.prevFocus : focusNodes.nextFocus;
      if (node) setTimeout(() => node.focus(), 0);
      handleClose(event as any);
    }
    event.preventDefault();
  };

  const setFocusToContent: HvBaseDropdownProps["onContainerCreation"] = (
    containerRef
  ) => {
    containerRef?.getElementsByTagName("li")[0]?.focus();
  };

  const condensed = useMemo(() => dataList.every((el) => !el.icon), [dataList]);

  return (
    <HvBaseDropdown
      id={id}
      className={cx(classes.container, className)}
      classes={{
        root: classes.root,
        container: classes.baseContainer,
      }}
      expanded={open && !disabled}
      component={
        <HvButton
          icon
          variant={variant ?? category}
          id={setId(id, "icon-button")}
          className={cx(classes.icon, { [classes.iconSelected]: open })}
          aria-expanded={open}
          disabled={disabled}
          aria-label="Dropdown menu"
          aria-haspopup="menu"
        >
          {icon || (
            <MoreOptionsVertical
              aria-hidden
              color={disabled ? "secondary_60" : undefined}
            />
          )}
        </HvButton>
      }
      placement={placement}
      variableWidth
      disablePortal={disablePortal}
      onToggle={(e, s) => {
        // this will only run if uncontrolled
        setOpen(s);
        onToggle?.(e, s);
      }}
      disabled={disabled}
      onContainerCreation={setFocusToContent}
      {...others}
    >
      <HvPanel className={classes.menuListRoot}>
        <HvList
          id={listId}
          values={dataList}
          selectable={false}
          condensed={condensed}
          onClick={(event, item) => {
            if (!keepOpened) handleClose(event);
            onClick?.(event, item);
          }}
          onKeyDown={handleKeyDown}
          classes={{
            root: classes.menuList,
          }}
        />
      </HvPanel>
    </HvBaseDropdown>
  );
};
