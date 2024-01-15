import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { IconButton, Popper, withStyles } from "@material-ui/core";
import OutsideClickHandler from "react-outside-click-handler";
import { MoreOptionsVertical as MoreVert } from "@hitachivantara/uikit-react-icons";
import { isKeypress, KeyboardCodes } from "../utils";
import List from "../List";
import { getPrevNextFocus, setId } from "..";
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
  placement = "right",
  dataList,
  disablePortal = false,
  onToggleOpen,
  onClick,
  keepOpened = true,
  disabled = false,
  expanded = false,
  popperProps,
  ...others
}) => {
  const didMountRef = useRef(false);
  const [open, setOpen] = useState(expanded && !disabled);
  const [positionUp, setPositionUp] = useState(false);
  const anchorRef = React.useRef(null);
  const listContainerRef = React.useRef(null);
  const focusNodes = getPrevNextFocus(setId(id, "icon-button"));

  const getFirstListItem = () =>
    listContainerRef?.current
      ? Array.from(listContainerRef.current.getElementsByTagName("li"))[0]
      : undefined;

  const handleFocusOnToggle = () => {
    if (open) {
      setTimeout(() => {
        const itemToFocus = getFirstListItem();
        itemToFocus?.focus();
      });
    } else {
      setTimeout(() => {
        anchorRef.current.focus();
      });
    }
  };

  useEffect(() => {
    if (didMountRef.current) {
      handleFocusOnToggle();
      onToggleOpen?.(open);
    } else {
      didMountRef.current = true;
    }
  }, [open, onToggleOpen]);

  useEffect(() => {
    if (expanded !== open) {
      setOpen(expanded && !disabled);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expanded, disabled]);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    const isButtonClick = anchorRef.current?.contains(event.target);
    if (!isButtonClick) {
      setOpen(false);
    }
  };

  // If the ESCAPE key is pressed the close handler must be called.
  const handleKeyDown = (event) => {
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

  const handleKeyboardToggle = (event) => {
    if (
      isKeypress(event, KeyboardCodes.SpaceBar) ||
      isKeypress(event, KeyboardCodes.Enter) ||
      (isKeypress(event, KeyboardCodes.ArrowDown) && !open) ||
      (isKeypress(event, KeyboardCodes.ArrowUp) && open)
    ) {
      handleToggle(event);
      event.preventDefault();
      event.stopPropagation();
    }
  };

  const handleListFlip = (data) => {
    const position = data.flipped;
    if (positionUp !== position) {
      setPositionUp(position);
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
          [classes.iconSelected]: open,
        })}
        disabled={disabled}
        {...others}
      >
        {icon || <MoreVert color={disabled ? "atmo7" : undefined} />}
      </IconButton>
      <Popper
        className={classes.popper}
        disablePortal={disablePortal}
        open={open}
        anchorEl={anchorRef.current}
        placement={`bottom-${placement === "left" ? "end" : "start"}`}
        popperOptions={{
          onUpdate: (data) => handleListFlip(data),
          onCreate: (data) => handleListFlip(data),
        }}
        {...popperProps}
      >
        <OutsideClickHandler onOutsideClick={handleClose}>
          <div>
            {!positionUp && (
              <div
                className={clsx(classes.inputExtensionOpen, {
                  [classes.inputExtensionLeftPosition]: placement === "left",
                })}
              />
            )}
            {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
            <div className={classes.menuList} onKeyDown={handleKeyDown} ref={listContainerRef}>
              <List
                id={setId(id, "list")}
                values={dataList}
                selectable={false}
                condensed
                onClick={(event, item) => {
                  if (!keepOpened) setOpen(false);
                  onClick?.(event, item);
                }}
              />
            </div>
            {positionUp && (
              <div
                className={clsx(classes.inputExtensionOpen, classes.inputExtensionOpenShadow, {
                  [classes.inputExtensionFloatRight]: placement === "right",
                  [classes.inputExtensionFloatLeft]: placement === "left",
                })}
              />
            )}
          </div>
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
     * Styles applied to the popper.
     */
    popper: PropTypes.string,
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
    /**
     * Styles applied to the extension of the button.
     */
    inputExtensionOpen: PropTypes.string,
    /**
     * Styles applied to the extension shadow.
     */
    inputExtensionOpenShadow: PropTypes.string,
    /**
     * Styles applied to the extension to go right when open down.
     */
    inputExtensionFloatRight: PropTypes.string,
    /**
     * Styles applied to the extension to go right when open up.
     */
    inputExtensionFloatLeft: PropTypes.string,
    /**
     * Styles applied to the extension to go left when open up.
     */
    inputExtensionLeftPosition: PropTypes.string,
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
  expanded: PropTypes.bool,
  /**
   *
   */
  popperProps: PropTypes.instanceOf(Object),
};

export default withStyles(styles, { name: "HvDropDownMenu" })(withId(DropDownMenu));
