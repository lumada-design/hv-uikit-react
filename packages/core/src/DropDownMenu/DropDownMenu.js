import React, { useMemo } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import deprecatedPropType from "@material-ui/core/utils/deprecatedPropType";
import { withStyles, useTheme } from "@material-ui/core";
import { MoreOptionsVertical } from "@hv/uikit-react-icons";
import { getPrevNextFocus, isKeypress, KeyboardCodes, useControlled } from "../utils";
import { HvButton, HvList, HvPanel, HvBaseDropdown, setId } from "..";
import styles from "./styles";
import withId from "../withId";

/**
 * A drop-down menu is a graphical control element, similar to a list box, that allows the user to choose a value from a list.
 */
const DropDownMenu = ({
  id,
  classes,
  className,
  icon,
  placement = "right",
  dataList,
  disablePortal = false,
  onToggle,
  onToggleOpen,
  onClick,
  keepOpened = true,
  disabled = false,
  expanded,
  defaultExpanded = false,
  // eslint-disable-next-line
  category,
  ...others
}) => {
  const [open, setOpen] = useControlled(expanded, Boolean(defaultExpanded));
  const theme = useTheme();
  const focusNodes = getPrevNextFocus(setId(id, "icon-button"));

  const listId = setId(id, "list");

  const handleClose = (event) => {
    // this will only run if uncontrolled
    setOpen(false);
    onToggleOpen?.(false);
    onToggle?.(event, false);
  };

  // If the ESCAPE key is pressed inside the list, the close handler must be called.
  const handleKeyDown = (event) => {
    if (isKeypress(event, KeyboardCodes.Tab)) {
      const node = event.shiftKey ? focusNodes.prevFocus : focusNodes.nextFocus;
      if (node) setTimeout(() => node.focus(), 0);
      handleClose(event);
    }
    event.preventDefault();
  };

  const setFocusToContent = (containerRef) => {
    containerRef?.getElementsByTagName("li")[0]?.focus();
  };

  const headerComponent = (
    <HvButton
      icon
      category={category}
      id={setId(id, "icon-button")}
      className={clsx(classes.icon, {
        [classes.iconSelected]: open,
      })}
      aria-expanded={open}
      disabled={disabled}
      aria-label="Dropdown menu"
    >
      {icon || <MoreOptionsVertical color={disabled ? "atmo5" : undefined} />}
    </HvButton>
  );

  const condensed = useMemo(() => dataList.every((el) => !el.icon), [dataList]);
  const popperStyle = {
    style: { zIndex: theme.zIndex.tooltip, width: null },
  };

  return (
    <HvBaseDropdown
      id={id}
      className={clsx(className, classes.container)}
      classes={{ root: classes.root }}
      expanded={open && !disabled}
      component={headerComponent}
      aria-haspopup="menu"
      placement={placement}
      variableWidth
      disablePortal={disablePortal}
      onToggle={(e, s) => {
        // this will only run if uncontrolled
        setOpen(s);
        onToggleOpen?.(s);
        onToggle?.(e, s);
      }}
      disabled={disabled}
      onContainerCreation={setFocusToContent}
      popperProps={popperStyle}
      {...others}
    >
      <HvPanel>
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
          classes={{ root: classes.menuList }}
        />
      </HvPanel>
    </HvBaseDropdown>
  );
};

DropDownMenu.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * Id to be applied to the root node.
   */
  id: PropTypes.string,
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the root.
     */
    root: PropTypes.string,
    /**
     * Styles applied to the container.
     */
    container: PropTypes.string,
    /**
     * Styles applied to the icon.
     */
    icon: PropTypes.string,
    /**
     * Styles applied to the icon when selected.
     */
    iconSelected: PropTypes.string,
    /**
     * Styles applied to the list.
     */
    menuList: PropTypes.string,
  }).isRequired,
  /**
   * Icon.
   */
  icon: PropTypes.element,
  /**
   * A list containing the elements to be rendered.
   *
   * - label: The label of the element to be rendered.
   * - selected: The selection state of the element.
   * - disabled: The disabled state of the element.
   * - icon: The icon node to be rendered on the left.
   * - showNavIcon: If true renders the navigation icon on the right.
   */
  dataList: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      selected: PropTypes.bool,
      disabled: PropTypes.bool,
      icon: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
      showNavIcon: PropTypes.bool,
    })
  ).isRequired,
  /**
   * Placement of the dropdown.
   */
  placement: PropTypes.oneOf(["left", "right"]),
  /**
   * Disable the portal behavior. The children stay within it's parent DOM hierarchy.
   */
  disablePortal: PropTypes.bool,
  /**
   * Function executed on toggle of the dropdown. Should receive the open status.
   */
  onToggleOpen: deprecatedPropType(
    PropTypes.func,
    "Instead use the onToggle prop which receives the event"
  ),
  /**
   * Function executed on toggle of the dropdown. Should receive the open status.
   */
  onToggle: PropTypes.func,
  /**
   * Function executed in each onClick. Should received the clicked element.
   */
  onClick: PropTypes.func,
  /**
   * Keep the Dropdown Menu opened after clicking one option
   */
  keepOpened: PropTypes.bool,
  /**
   * Defines if the component is disabled.
   */
  disabled: PropTypes.bool,
  /**
   * If true it should be displayed open.
   */
  expanded: PropTypes.bool,
  /**
   * When uncontrolled, defines the initial expanded state.
   */
  defaultExpanded: PropTypes.bool,
};

export default withStyles(styles, { name: "HvDropDownMenu" })(withId(DropDownMenu));
