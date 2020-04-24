import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { IconButton, Popper, useTheme, withStyles } from "@material-ui/core";
import FocusTrap from "focus-trap-react";
import OutsideClickHandler from "react-outside-click-handler";
import isNil from "lodash/isNil";
import MoreVert from "@hv/uikit-react-icons/dist/MoreOptionsVertical";
import { isKeypress, KeyboardCodes } from "../utils";
import List from "../List";
import { setId, getPrevNextFocus } from "..";
import styles from "./styles";
import withId from "../withId";

/**
 * A drop-down menu is a graphical control element, similar to a list box, that allows the user to choose one value from a list.
 */
const DropDownMenu = ({
  id,
  classes,
  className,
  icon,
  placement = "left",
  dataList,
  disablePortal = false,
  onToggleOpen,
  onClick,
  keepOpened = true,
  disabled = false,
  expanded = false,
  ...others
}) => {
  const didMountRef = useRef(false);
  const [open, setOpen] = useState(expanded && !disabled);
  const [applyFocus, setApplyFocus] = useState(false);
  const anchorRef = React.useRef(null);
  const focusNodes = getPrevNextFocus(setId(id, "icon-button"));
  const theme = useTheme();

  useEffect(() => {
    if (didMountRef.current) {
      onToggleOpen?.(open);
    } else didMountRef.current = true;
  }, [open]);

  useEffect(() => {
    if (expanded !== open) {
      setOpen(expanded && !disabled);
    }
  }, [expanded, disabled]);

  const bottom = `bottom-${placement === "right" ? "start" : "end"}`;

  const handleToggle = (event, status = null) => {
    if (event.keycode !== undefined) {
      setApplyFocus(true);
    } else {
      setApplyFocus(false);
    }

    if (isNil(status) && status) setOpen(status);
    else setOpen(prevOpen => !prevOpen);
  };

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    handleToggle(event, false);
  };

  // If the ESCAPE key is pressed the close handler must be called.
  const handleKeyDown = event => {
    if (isKeypress(event, KeyboardCodes.Esc)) {
      handleClose(event);
    }
    if (isKeypress(event, KeyboardCodes.Tab)) {
      const node = event.shiftKey ? focusNodes.prevFocus : focusNodes.nextFocus;
      if (node) setTimeout(() => node.focus(), 0);
      handleToggle(event);
    }
    event.preventDefault();
  };

  const handleKeyboardToggle = event => {
    if (
      isKeypress(event, KeyboardCodes.SpaceBar) ||
      isKeypress(event, KeyboardCodes.Enter) ||
      (isKeypress(event, KeyboardCodes.ArrowDown) && !open) ||
      (isKeypress(event, KeyboardCodes.ArrowUp) && open)
    ) {
      handleToggle(event, null);
      event.preventDefault();
    }
  };

  return (
    <div id={id} className={clsx(className, classes.root)}>
      <IconButton
        id={setId(id, "icon-button")}
        buttonRef={anchorRef}
        aria-label="Dropdown menu"
        aria-controls={open ? `${id}` : undefined}
        aria-haspopup="true"
        aria-expanded={open ? true : undefined}
        onClick={handleToggle}
        onKeyDown={handleKeyboardToggle}
        className={clsx(classes.icon, {
          [classes.iconSelected]: open
        })}
        disabled={disabled}
        {...others}
      >
        {icon || <MoreVert color={disabled ? "atmo7" : undefined} />}
      </IconButton>
      <Popper
        disablePortal={disablePortal}
        open={open}
        anchorEl={anchorRef.current}
        placement={bottom}
        popperOptions={{}}
        style={{ zIndex: theme.zIndex.tooltip }}
      >
        <OutsideClickHandler onOutsideClick={handleClose}>
          <FocusTrap
            active={applyFocus}
            createOptions={{
              escapeDeactivates: false,
              allowOutsideClick: true,
              fallbackFocus: document.getElementById(setId(id, "icon-button"))
            }}
          >
            {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
            <div className={classes.menuList} onKeyDown={handleKeyDown}>
              <List
                id={setId(id, "list")}
                values={dataList}
                selectable={false}
                onClick={(event, item) => {
                  if (!keepOpened) handleToggle(event, false);
                  onClick?.(event, item);
                }}
              />
            </div>
          </FocusTrap>
        </OutsideClickHandler>
      </Popper>
    </div>
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
     * Styles applied to the root of the component.
     */
    root: PropTypes.string,
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
    menuList: PropTypes.string
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
