/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import ReactDOM from "react-dom";
import React, { useState, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { ClickAwayListener, withStyles } from "@material-ui/core";
import { usePopper } from "react-popper";
import clsx from "clsx";
import { DropUpXS, DropDownXS } from "@hv/uikit-react-icons";
import { HvTypography, useUniqueId } from "..";
import { getFirstAndLastFocus, isKeypress, KeyboardCodes, setId, useControlled } from "../utils";
import styles from "./styles";

const { Tab, Enter, Esc, Space, ArrowDown } = KeyboardCodes;

const HvBaseDropdown = ({
  id,
  role,
  classes,
  className,
  placeholder,
  disabled = false,
  expanded,
  defaultExpanded = false,
  placement = "right",
  popperProps = {},
  onToggle,
  onClickOutside,
  onContainerCreation,
  disablePortal = false,
  component,
  adornment,
  children,
  variableWidth = false,
  dropdownHeaderProps,
  ...others
}) => {
  const [isOpen, setIsOpen] = useControlled(expanded, Boolean(defaultExpanded));

  const bottom = placement && `bottom-${placement === "right" ? "start" : "end"}`;

  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);

  const extensionWidth = referenceElement ? referenceElement.offsetWidth : "inherit";
  const { modifiers: popperPropsModifiers = [], ...otherPopperProps } = popperProps;

  const onFirstUpdate = useCallback(() => {
    if (onContainerCreation) onContainerCreation(popperElement);
  }, [onContainerCreation, popperElement]);

  const widthCalculator = useCallback(({ state }) => {
    // eslint-disable-next-line no-param-reassign
    state.styles.popper.width = `${state.rects.reference.width}px`;
  }, []);

  const modifiers = useMemo(
    () => [
      {
        name: "variableWidth",
        enabled: !variableWidth,
        phase: "beforeWrite",
        requires: ["computeStyles"],
        fn: widthCalculator,
      },
      ...popperPropsModifiers,
    ],
    [popperPropsModifiers, variableWidth, widthCalculator]
  );

  const { styles: popperStyles, attributes } = usePopper(referenceElement, popperElement, {
    placement: bottom,
    modifiers,
    onFirstUpdate,
    ...otherPopperProps,
  });

  const elementId = useUniqueId(id, "hvbasedropdown");

  const ariaRole = role || (component == null ? "combobox" : undefined);

  let popperPlacement = "bottom";
  if (attributes.popper) {
    popperPlacement = attributes.popper["data-popper-placement"];
  }

  const handleToggle = useCallback(
    (event) => {
      if (event && !isKeypress(event, Tab)) {
        event.preventDefault();
      }

      // we are checking specifically for false because if "isKeypress" returns true or undefined it should continue
      const notControlKey = [Tab, Enter, Esc, ArrowDown, Space].every(
        (key) => isKeypress(event, key) === false
      );

      const ignoredCombinations =
        (isKeypress(event, Esc) && !isOpen) ||
        (isKeypress(event, ArrowDown) && isOpen) ||
        (isKeypress(event, Tab) && !isOpen);

      if (disabled || notControlKey || ignoredCombinations) return;

      const newOpen = !isOpen;

      /* If about to close focus on the header component. */
      const focusHeader = () => {
        if (!newOpen) {
          referenceElement.focus({ preventScroll: true });
        }

        return newOpen;
      };
      setIsOpen(focusHeader());

      onToggle?.(event, newOpen);
    },
    [isOpen, disabled, setIsOpen, onToggle, referenceElement]
  );

  const headerComponent = (() => {
    if (component) {
      return React.cloneElement(component, {
        ref: setReferenceElement,
      });
    }

    return (
      <div
        id={setId(id, "header")}
        className={clsx(classes.header, {
          [classes.headerDisabled]: disabled,
          [classes.headerOpen]: isOpen,
          [classes.headerOpenUp]: isOpen && popperPlacement.includes("top"),
          [classes.headerOpenDown]: isOpen && popperPlacement.includes("bottom"),
        })}
        role={ariaRole === "combobox" ? "textbox" : undefined}
        style={disabled ? { pointerEvents: "none" } : undefined}
        aria-controls={isOpen ? setId(elementId, "children-container") : undefined}
        aria-label={others["aria-label"] ?? undefined}
        aria-labelledby={others["aria-labelledby"] ?? undefined}
        tabIndex={disabled ? -1 : 0}
        ref={setReferenceElement}
        {...dropdownHeaderProps}
      >
        <div className={classes.selection}>
          {placeholder && typeof placeholder === "string" ? (
            <HvTypography
              noWrap
              className={clsx(classes.placeholder, {
                [classes.selectionDisabled]: disabled,
              })}
              variant="placeholderText"
            >
              {placeholder}
            </HvTypography>
          ) : (
            placeholder
          )}
        </div>
        {adornment ||
          (isOpen ? (
            <DropUpXS iconSize="XS" className={classes.arrow} />
          ) : (
            <DropDownXS
              iconSize="XS"
              className={classes.arrow}
              color={disabled ? "atmo5" : undefined}
            />
          ))}
      </div>
    );
  })();

  const containerComponent = (() => {
    /**
     *  Handle keyboard inside children container.
     */
    const handleContainerKeyDown = (event) => {
      if (isKeypress(event, Esc)) {
        handleToggle(event);
      }
      if (isKeypress(event, Tab) && !event.shiftKey) {
        const focusList = getFirstAndLastFocus(popperElement);
        if (document.activeElement === focusList?.last) {
          event.preventDefault();
          focusList?.first?.focus();
        }
      }
    };

    const handleOutside = (event) => {
      const isButtonClick = referenceElement?.contains(event.target);
      if (!isButtonClick) {
        setIsOpen(false);
        onToggle?.(event, false);
        onClickOutside?.(event);
      }
    };

    const container = (
      <div
        role="tooltip"
        ref={setPopperElement}
        className={clsx(classes.container)}
        style={popperStyles.popper}
        {...attributes.popper}
      >
        <ClickAwayListener onClickAway={handleOutside}>
          {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
          <div onKeyDown={handleContainerKeyDown}>
            {popperPlacement.includes("bottom") && (
              <div
                style={{ width: extensionWidth }}
                className={clsx(classes.inputExtensionOpen, {
                  [classes.inputExtensionLeftPosition]: popperPlacement.includes("end"),
                })}
              />
            )}
            <div id={setId(elementId, "children-container")} className={classes.panel}>
              {children}
            </div>
            {popperPlacement.includes("top") && (
              <div
                style={{ width: extensionWidth }}
                className={clsx(classes.inputExtensionOpen, classes.inputExtensionOpenShadow, {
                  [classes.inputExtensionFloatRight]: popperPlacement.includes("start"),
                  [classes.inputExtensionFloatLeft]: popperPlacement.includes("end"),
                })}
              />
            )}
          </div>
        </ClickAwayListener>
      </div>
    );

    if (disablePortal) return container;

    return ReactDOM.createPortal(container, document.body);
  })();

  return (
    <>
      <div className={classes.root}>
        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
        <div
          id={id}
          role={ariaRole}
          aria-expanded={!!isOpen}
          aria-owns={isOpen ? setId(elementId, "children-container") : undefined}
          className={clsx(className, classes.anchor, {
            [classes.rootDisabled]: disabled,
          })}
          onKeyDown={handleToggle}
          onClick={handleToggle}
          tabIndex={-1}
          {...others}
        >
          {headerComponent}
        </div>
        {isOpen ? containerComponent : <></>}
      </div>
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
   * The role of the element that triggers the popup.
   *
   * Defaults to "combobox" if `component` and the default
   * "textbox" header is used, undefined otherwise.
   */
  role: PropTypes.string,
  /**
   * A Jss Object used to override or extend the component styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the root.
     */
    root: PropTypes.string,
    /**
     * Styles applied to the root when disabled.
     */
    rootDisabled: PropTypes.string,
    /**
     * Styles applied to the element that serves as reference for the popper when disabled.
     */
    anchor: PropTypes.string,
    /**
     * Styles applied to the popper element when it is inside the root element hierarchy.
     */
    container: PropTypes.string,
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
    placeholder: PropTypes.string,
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
    inputExtensionFloatLeft: PropTypes.string,
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
   * If `true` the dropdown width depends size of content if `false` the width depends on the header size.
   * Defaults to `false`.
   */
  variableWidth: PropTypes.bool,
  /**
   * If `true` the dropdown starts opened if `false` it starts closed.
   */
  expanded: PropTypes.bool,
  /**
   * When uncontrolled, defines the initial expanded state.
   */
  defaultExpanded: PropTypes.bool,
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
   * Callback called when the dropdown is opened and ready,
   * commonly used to set focus to the content.
   */
  onContainerCreation: PropTypes.func,
  /**
   * When expanded dropdown flips position.
   */
  onFlip: PropTypes.func,
  /**
   * An object containing props to be passed onto the baseDropdown.
   */
  dropdownHeaderProps: PropTypes.instanceOf(Object),
};

export default withStyles(styles, { name: "HvBaseDropdown" })(HvBaseDropdown);
