import { useMemo } from "react";
import { ClassNames } from "@emotion/react";
import { theme } from "@hitachivantara/uikit-styles";
import { MoreOptionsVertical } from "@hitachivantara/uikit-react-icons";
import { useControlled } from "@core/hooks";
import { HvBaseProps } from "@core/types";
import withId from "@core/hocs/withId";
import {
  isKeypress,
  keyboardCodes,
  setId,
  getPrevNextFocus,
} from "@core/utils";
import {
  HvBaseDropdown,
  HvBaseDropdownProps,
  HvButton,
  HvButtonVariant,
  HvList,
  HvListValue,
  HvPanel,
} from "@core/components";
import { styles } from "./DropDownMenu.styles";
import dropDownMenuClasses, {
  HvDropDownMenuClasses,
} from "./dropDownMenuClasses";

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
  /** The variant to be used in the header. */
  category?: HvButtonVariant;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvDropDownMenuClasses;
}

/**
 * A drop-down menu is a graphical control element, similar to a list box, that allows the user to choose a value from a list.
 */
const HvDropDownMenu = ({
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
      const node = event.shiftKey ? focusNodes.prevFocus : focusNodes.nextFocus;
      if (node) setTimeout(() => node.focus(), 0);
      handleClose(event);
    }
    event.preventDefault();
  };

  const setFocusToContent = (containerRef) => {
    containerRef?.getElementsByTagName("li")[0]?.focus();
  };

  const condensed = useMemo(() => dataList.every((el) => !el.icon), [dataList]);
  const popperStyle: HvBaseDropdownProps["popperProps"] = {
    style: {
      zIndex: theme.zIndices.tooltip,
      width: "auto",
      position: "relative",
    },
  };

  return (
    <ClassNames>
      {({ css, cx }) => (
        <HvBaseDropdown
          id={id}
          className={cx(
            dropDownMenuClasses.container,
            css(styles.container),
            className,
            classes?.container
          )}
          classes={{
            root: cx(dropDownMenuClasses.root, css(styles.root), classes?.root),
            container: cx(
              dropDownMenuClasses.baseContainer,
              classes?.baseContainer
            ),
          }}
          expanded={open && !disabled}
          component={
            <HvButton
              icon
              variant={category}
              id={setId(id, "icon-button")}
              className={cx(
                dropDownMenuClasses.icon,
                open && dropDownMenuClasses.iconSelected,
                css(styles.icon),
                open && css(styles.iconSelected),
                classes?.icon,
                open && classes?.iconSelected
              )}
              aria-expanded={open}
              disabled={disabled}
              aria-label="Dropdown menu"
            >
              {icon || (
                <MoreOptionsVertical
                  color={disabled ? "secondary_60" : undefined}
                />
              )}
            </HvButton>
          }
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
          <HvPanel
            className={cx(
              dropDownMenuClasses.menuListRoot,
              css(styles.menuListRoot),
              classes?.menuListRoot
            )}
          >
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
                root: cx(dropDownMenuClasses.menuList, classes?.menuList),
              }}
            />
          </HvPanel>
        </HvBaseDropdown>
      )}
    </ClassNames>
  );
};

export default withId(HvDropDownMenu);
