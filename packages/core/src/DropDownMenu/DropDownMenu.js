import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { IconButton, withStyles } from "@material-ui/core";
import MoreVert from "@hv/uikit-react-icons/dist/MoreOptionsVertical";
import { getPrevNextFocus, isKeypress, KeyboardCodes } from "../utils";
import { setId } from "..";
import styles from "./styles";
import withId from "../withId";
import HvBaseDropdown from "../BaseDropdown";
import List from "../List";

/**
 * A drop-down menu is a graphical control element, similar to a list box, that allows the user to choose one value from a list.
 */
const DropDownMenu = ({
  id,
  classes,
  className,
  icon,
  placement = "right",
  dataList,
  disablePortal = false,
  onToggleOpen,
  onClick,
  keepOpened = true,
  disabled = false,
  expanded = false,
  ...others
}) => {
  const [open, setOpen] = useState(expanded && !disabled);
  const focusNodes = getPrevNextFocus(setId(id, "icon-button"));

  useEffect(() => {
    if (expanded !== open) {
      setOpen(expanded && !disabled);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expanded, disabled]);

  const listId = setId(id, "list");

  const handleClose = () => {
    onToggleOpen?.(false);
    setOpen(false);
  };

  // If the ESCAPE key is pressed inside the list, the close handler must be called.
  const handleKeyDown = event => {
    if (isKeypress(event, KeyboardCodes.Tab)) {
      const node = event.shiftKey ? focusNodes.prevFocus : focusNodes.nextFocus;
      if (node) setTimeout(() => node.focus(), 0);
      handleClose();
    }
    event.preventDefault();
  };

  const headerComponent = (
    <IconButton
      id={setId(id, "icon-button")}
      className={clsx(classes.icon, {
        [classes.iconSelected]: open
      })}
      disabled={disabled}
      aria-label="Dropdown menu"
    >
      {icon || <MoreVert color={disabled ? "atmo5" : undefined} />}
    </IconButton>
  );

  return (
    <HvBaseDropdown
      id={id}
      className={className}
      classes={{ root: classes.root }}
      expanded={open}
      component={headerComponent}
      placement={placement}
      disablePortal={disablePortal}
      onToggle={(e, s) => {
        setOpen(s);
        onToggleOpen?.(s);
      }}
      disabled={disabled}
      {...others}
    >
      <List
        id={listId}
        values={dataList}
        selectable={false}
        onClick={(event, item) => {
          if (!keepOpened) handleClose();
          onClick?.(event, item);
        }}
        onKeyDown={handleKeyDown}
      />
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
     * Styles applied to the icon.
     */
    icon: PropTypes.string,
    /**
     * Styles applied to the icon when selected.
     */
    iconSelected: PropTypes.string
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
   * - iconCallback: The icon node to be rendered on the left.
   * - showNavIcon: If true renders the navigation icon on the right.
   */
  dataList: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      selected: PropTypes.bool,
      disabled: PropTypes.bool,
      iconCallback: PropTypes.func,
      showNavIcon: PropTypes.bool
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
  onToggleOpen: PropTypes.func,
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
  expanded: PropTypes.bool
};

export default withStyles(styles, { name: "HvDropDownMenu" })(withId(DropDownMenu));
