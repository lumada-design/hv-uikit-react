/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { ClickAwayListener, Popper, useTheme, withStyles } from "@material-ui/core";
import clsx from "clsx";
import { DropUpXS, DropDownXS } from "@hv/uikit-react-icons";
import { HvFormElementContext, HvTypography } from "..";
import { getFirstAndLastFocus, isKeypress, KeyboardCodes, setId, useUpdated } from "../utils";
import withId from "../withId";
import styles from "./styles";

const { Tab, Enter, Esc, Space, ArrowDown } = KeyboardCodes;

const HvBaseDropdown = ({
  id,
  classes,
  className,
  placeholder,
  disabled = false,
  expanded = false,
  placement = "right",
  popperProps,
  onToggle,
  onFlip,
  onClickOutside,
  disablePortal = false,
  component,
  adornment,
  children,
  ...others
}) => {
  const [isOpen, setIsOpen] = useState(expanded);
  const [positionUp, setPositionUp] = useState(false);
  const [widthInput, setWidthInput] = useState(null);

  const [created, setCreated] = useUpdated(false);
  const [updated, setUpdated] = useUpdated();
  const anchorHeaderRef = useRef(null);

  const { elementId, elementDisabled, descriptors = {} } = useContext(HvFormElementContext);

  const { HvLabel } = descriptors;

  const localId = elementId ?? id;
  const localDisabled = disabled ?? elementDisabled;

  const theme = useTheme();

  const bottom = placement && `bottom-${placement === "right" ? "start" : "end"}`;

  useEffect(() => {
    if (expanded !== isOpen) {
      const value = expanded && !(disabled || elementDisabled);
      setIsOpen(value);
      onToggle?.(null, value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expanded, disabled, elementDisabled]);

  /**
   * If closes focus on the header component.
   */
  useEffect(() => {
    if (!updated) {
      setUpdated();
      return;
    }

    if (!isOpen) anchorHeaderRef.current?.focus({ preventScroll: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  /**
   *
   * Set the extension of the container to follow the header width.
   */
  useEffect(() => {
    const width = anchorHeaderRef?.current?.getBoundingClientRect()?.width;
    if (width) setWidthInput(width);
  }, []);

  const handleOutside = event => {
    const isButtonClick = anchorHeaderRef.current?.contains(event.target);
    if (!isButtonClick) {
      setIsOpen(false);
      onToggle?.(event, false);
      onClickOutside?.(event);
    }
  };

  const handleToggle = event => {
    if (event && !isKeypress(event, Tab)) {
      event.stopPropagation();
      event.preventDefault();
    }

    // we are checking specifically for false because if "isKeypress" returns true or undefined it should continue
    const notControlKey = [Tab, Enter, Esc, ArrowDown, Space].every(
      key => isKeypress(event, key) === false
    );

    const ignoredCombinations =
      (isKeypress(event, Esc) && !isOpen) ||
      (isKeypress(event, ArrowDown) && isOpen) ||
      (isKeypress(event, Tab) && !isOpen);

    if (localDisabled || notControlKey || ignoredCombinations) return;

    const newOpen = !isOpen;
    setIsOpen(newOpen);
    onToggle?.(event, newOpen);
  };

  const buildHeaderLabel = () => (
    <div className={classes.selection}>
      {placeholder && typeof placeholder === "string" ? (
        <HvTypography
          id={setId(localId, "selectionPlaceholder")}
          className={clsx(classes.truncate, {
            [classes.selectionDisabled]: localDisabled
          })}
          variant="placeholderText"
        >
          {placeholder}
        </HvTypography>
      ) : (
        placeholder
      )}
    </div>
  );
  const renderAdornment = () =>
    adornment ||
    (isOpen ? (
      <DropUpXS iconSize="XS" className={classes.arrow} />
    ) : (
      <DropDownXS
        iconSize="XS"
        className={classes.arrow}
        color={localDisabled ? "atmo5" : undefined}
      />
    ));

  const labelledby =
    others["aria-labelledby"] ??
    HvLabel?.[0]?.id ??
    (!component && setId(localId, "selectionPlaceholder"));

  const renderHeader = () => {
    return (
      <div
        id={setId(localId, "header")}
        className={clsx(classes.header, {
          [classes.headerDisabled]: localDisabled,
          [classes.headerOpen]: isOpen,
          [classes.headerOpenUp]: isOpen && positionUp,
          [classes.headerOpenDown]: isOpen && !positionUp
        })}
        role="textbox"
        style={localDisabled ? { pointerEvents: "none" } : undefined}
        aria-labelledby={labelledby || undefined}
        aria-label={others["aria-label"] ?? undefined}
      >
        {buildHeaderLabel()}
        {renderAdornment()}
      </div>
    );
  };

  /**
   * Sets the position, notifying the dropdown of the change.
   *
   * @param position
   */
  const setterPosition = position => {
    setPositionUp(position);
    onFlip?.(position);
  };

  /**
   * When the container flips updates its position.
   *
   * @param data
   */
  const handleContainerFlip = data => {
    const position = data.flipped;
    if (positionUp !== position) {
      setterPosition(position);
    }
  };

  /**
   * Setter of position on creation and focus on the first focusable element of the container.
   *
   * @param data
   */
  const handleContainerCreate = data => {
    getFirstAndLastFocus(
      document.getElementById(setId(localId, "children-container"))
    )?.first?.focus();
    if (!created) {
      const position = data.flipped;
      setterPosition(position);
      setCreated();
    }
  };

  /**
   *  Handle keyboard inside children container.
   */
  const handleContainerKeyDown = event => {
    if (isKeypress(event, Esc)) {
      handleToggle(event);
    }
    if (isKeypress(event, Tab)) {
      const focusList = getFirstAndLastFocus(
        document.getElementById(setId(localId, "children-container"))
      );
      if (document.activeElement === focusList?.last) {
        event.preventDefault();
        focusList?.first?.focus();
      }
    }
  };

  const renderContainer = () => (
    <Popper
      disablePortal={disablePortal}
      open={isOpen}
      anchorEl={anchorHeaderRef.current}
      placement={bottom}
      popperOptions={{
        onUpdate: handleContainerFlip,
        onCreate: handleContainerCreate
      }}
      style={{ zIndex: theme.zIndex.tooltip }}
      {...popperProps}
    >
      <ClickAwayListener onClickAway={handleOutside}>
        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
        <div onKeyDown={handleContainerKeyDown}>
          {!positionUp && (
            <div
              className={clsx(classes.inputExtensionOpen, {
                [classes.inputExtensionLeftPosition]: placement === "left"
              })}
              style={{ width: widthInput }}
            />
          )}
          <div id={setId(localId, "children-container")} className={classes.panel}>
            {children}
          </div>
          {positionUp && (
            <div
              className={clsx(classes.inputExtensionOpen, classes.inputExtensionOpenShadow, {
                [classes.inputExtensionFloatRight]: placement === "right",
                [classes.inputExtensionFloatLeft]: placement === "left"
              })}
              style={{ width: widthInput }}
            />
          )}
        </div>
      </ClickAwayListener>
    </Popper>
  );

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div
        id={localId}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-owns={setId(localId, "children-container")}
        aria-controls={isOpen ? setId(localId, "children-container") : undefined}
        aria-labelledby={labelledby || undefined}
        aria-label={labelledby ? undefined : others["aria-label"] || undefined}
        ref={anchorHeaderRef}
        className={clsx(className, classes.root)}
        onKeyDown={handleToggle}
        onClick={handleToggle}
        tabIndex={disabled ? -1 : 0}
        {...others}
      >
        {component || renderHeader()}
      </div>
      {renderContainer()}
    </>
  );
};

HvBaseDropdown.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * Id to be applied to the root node.
   */
  id: PropTypes.string,
  /**
   * A Jss Object used to override or extend the component styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the root.
     */
    root: PropTypes.string,
    /**
     * Styles applied to the header
     */
    header: PropTypes.string,
    /**
     * Styles applied to the component when is open.
     */
    headerOpen: PropTypes.string,
    /**
     * Styles applied to the header when the container is opened up.
     */
    headerOpenUp: PropTypes.string,
    /**
     * Styles applied to the header when the container is opened down.
     */
    headerOpenDown: PropTypes.string,
    /**
     * Styles applied to the header when is disable.
     */
    headerDisabled: PropTypes.string,
    /**
     * Styles applied to the arrow
     */
    arrow: PropTypes.string,
    /**
     * Styles applied to the selection
     */
    selection: PropTypes.string,
    /**
     * Styles applied for truncating the container elements.
     */
    truncate: PropTypes.string,
    /**
     * Styles applied when the selection is disabled.
     */
    selectionDisabled: PropTypes.string,
    /**
     * Styles applied to the dropdown panel.
     */
    panel: PropTypes.string,
    /**
     * Styles applied to the extension when open.
     */
    inputExtensionOpen: PropTypes.string,
    /**
     * Styles applied when position is left.
     */
    inputExtensionLeftPosition: PropTypes.string,
    /**
     * Styles applied to set the shadow when open.
     */
    inputExtensionOpenShadow: PropTypes.string,
    /**
     * Styles applied when position is right and the position is up.
     */
    inputExtensionFloatRight: PropTypes.string,
    /**
     * Styles applied when position is left and the position is up.
     */
    inputExtensionFloatLeft: PropTypes.string
  }).isRequired,
  /**
   * Header placeholder. String or node.
   */
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  /**
   * If `true` the dropdown is disabled unable to be interacted, if `false` it is enabled.
   */
  disabled: PropTypes.bool,
  /**
   * Disable the portal behavior.
   * The children stay within it's parent DOM hierarchy.
   */
  disablePortal: PropTypes.bool,
  /**
   * If `true` the dropdown starts opened if `false` it starts closed.
   */
  expanded: PropTypes.bool,
  /**
   * An object containing props to be wired to the popper component.
   */
  popperProps: PropTypes.shape(),
  /**
   * Node to be rendered.
   */
  children: PropTypes.node,
  /**
   * Placement of the dropdown.
   */
  placement: PropTypes.oneOf(["left", "right"]),
  /**
   * Replacement for the header component.
   */
  component: PropTypes.node,
  /**
   * Adornment to replace the default arrows.
   */
  adornment: PropTypes.node,
  /**
   * When dropdown changes the expanded state.
   */
  onToggle: PropTypes.func,
  /**
   * When user click outside the open container.
   */
  onClickOutside: PropTypes.func,
  /**
   * When expanded dropdown flips position.
   */
  onFlip: PropTypes.func
};

export default withStyles(styles, { name: "HvBaseDropdown" })(withId(HvBaseDropdown));
