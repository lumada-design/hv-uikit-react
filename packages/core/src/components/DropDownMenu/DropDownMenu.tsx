import clsx from "clsx";
import { useControlled } from "hooks";
import { HvBaseProps } from "../../types";
import {
  StyledRoot,
  StyledBaseDropDown,
  StyledButton,
  StyledPanel,
} from "./DropDownMenu.styles";
import dropDownMenuClasses, {
  HvDropDownMenuClasses,
} from "./dropDownMenuClasses";
import { isKeypress, keyboardCodes, setId } from "utils";
import getPrevNextFocus from "utils/focusableElementFinder";
import { MoreOptionsVertical } from "@hitachivantara/uikit-icons";
import { HvButtonVariant, HvList, HvListValue } from "components";
import { useMemo } from "react";
import { theme } from "@hitachivantara/uikit-styles";
import { withId } from "hocs";

export type HvDropDownMenuProps = HvBaseProps<HTMLDivElement, { onClick }> & {
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
  /** The variant to be used in the header. */
  category?: HvButtonVariant;
  /** A Jss Object used to override or extend the styles applied to the empty state component. */
  classes?: HvDropDownMenuClasses;
};

/**
 * A drop-down menu is a graphical control element, similar to a list box, that allows the user to choose a value from a list.
 */
export const HvDropDownMenu = withId(
  ({
    id,
    classes,
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
    category = "secondaryGhost",
    ...others
  }: HvDropDownMenuProps) => {
    const [open, setOpen] = useControlled(expanded, Boolean(defaultExpanded));
    const focusNodes = getPrevNextFocus(setId(id, "icon-button"));

    const listId = setId(id, "list");

    const handleClose = (event) => {
      // this will only run if uncontrolled
      setOpen(false);
      onToggle?.(event, false);
    };

    // If the ESCAPE key is pressed inside the list, the close handler must be called.
    const handleKeyDown = (event) => {
      if (isKeypress(event, keyboardCodes.Tab)) {
        const node = event.shiftKey
          ? focusNodes.prevFocus
          : focusNodes.nextFocus;
        if (node) setTimeout(() => node.focus(), 0);
        handleClose(event);
      }
      event.preventDefault();
    };

    const setFocusToContent = (containerRef) => {
      containerRef?.getElementsByTagName("li")[0]?.focus();
    };

    const headerComponent = (
      <StyledButton
        icon
        variant={category}
        id={setId(id, "icon-button")}
        className={clsx(
          dropDownMenuClasses.icon,
          classes?.icon,
          open && clsx(dropDownMenuClasses.iconSelected, classes?.iconSelected)
        )}
        aria-expanded={open}
        disabled={disabled}
        aria-label="Dropdown menu"
        $open={open}
      >
        {icon || <MoreOptionsVertical color={disabled ? "atmo5" : undefined} />}
      </StyledButton>
    );

    const condensed = useMemo(
      () => dataList.every((el) => !el.icon),
      [dataList]
    );
    const popperStyle = {
      style: {
        zIndex: theme.zIndices.tooltip,
        width: "auto",
        position: "relative",
      },
    };

    return (
      <StyledRoot>
        <StyledBaseDropDown
          id={id}
          className={clsx(
            className,
            dropDownMenuClasses.container,
            classes?.container
          )}
          classes={{
            root: clsx(dropDownMenuClasses.root, classes?.root),
            container: clsx(
              dropDownMenuClasses.baseContainer,
              classes?.baseContainer
            ),
          }}
          expanded={open && !disabled}
          component={headerComponent}
          aria-haspopup="menu"
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
          popperProps={popperStyle}
          {...others}
        >
          <StyledPanel>
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
                root: clsx(dropDownMenuClasses.menuList, classes?.menuList),
              }}
            />
          </StyledPanel>
        </StyledBaseDropDown>
      </StyledRoot>
    );
  }
);
