import React, {
  useMemo,
  useState,
  useCallback,
  KeyboardEventHandler,
} from "react";

import { createPortal } from "react-dom";

import {
  ClickAwayListener,
  ClickAwayListenerProps,
  PopperPlacementType,
  PopperProps,
} from "@mui/material";

import { theme } from "@hitachivantara/uikit-styles";
import { DropDownXS, DropUpXS } from "@hitachivantara/uikit-react-icons";

import { usePopper } from "react-popper";
import { detectOverflow, ModifierArguments, Options } from "@popperjs/core";

import { HvTypography } from "@core/components/Typography";
import { useUniqueId } from "@core/hooks/useUniqueId";
import { useTheme } from "@core/hooks/useTheme";
import { useForkRef } from "@core/hooks/useForkRef";
import { useControlled } from "@core/hooks/useControlled";
import { useDefaultProps } from "@core/hooks/useDefaultProps";
import { isKey, isOneOfKeys } from "@core/utils/keyboardUtils";
import { setId } from "@core/utils/setId";
import { getFirstAndLastFocus } from "@core/utils/focusableElementFinder";
import { HvBaseProps } from "@core/types/generic";
import { ExtractNames } from "@core/utils/classes";

import { staticClasses, useClasses } from "./BaseDropdown.styles";
import BaseDropdownContext from "./BaseDropdownContext";

export { staticClasses as baseDropdownClasses };

export type HvBaseDropdownClasses = ExtractNames<typeof useClasses>;

export interface HvBaseDropdownProps
  extends HvBaseProps<HTMLDivElement, "placeholder"> {
  /**
   * The role of the element that triggers the popup.
   *
   * Defaults to "combobox" if `component` and the default
   * "textbox" header is used, undefined otherwise.
   */
  role?: string;
  /**
   * Header placeholder.
   */
  placeholder?: string | React.ReactNode;
  /**
   * If `true` the dropdown is disabled unable to be interacted, if `false` it is enabled.
   */
  disabled?: boolean;
  /**
   * If `true` the dropdown will be in read only mode, unable to be interacted.
   */
  readOnly?: boolean;
  /**
   * Disable the portal behavior.
   * The children stay within it's parent DOM hierarchy.
   */
  disablePortal?: boolean;
  /**
   * If `true` the dropdown width depends size of content if `false` the width depends on the header size.
   * Defaults to `false`.
   */
  variableWidth?: boolean;
  /**
   * If `true` the dropdown starts opened if `false` it starts closed.
   */
  expanded?: boolean;
  /**
   * When uncontrolled, defines the initial expanded state.
   */
  defaultExpanded?: boolean;
  /**
   * An object containing props to be wired to the popper component.
   */
  popperProps?: Partial<PopperProps>;
  /**
   * Placement of the dropdown.
   */
  placement?: "left" | "right";
  /**
   * Replacement for the header component.
   */
  component?: React.ReactNode;
  /**
   * Adornment to replace the default arrows.
   */
  adornment?: React.ReactNode;
  /**
   * When dropdown changes the expanded state.
   */
  onToggle?: (event: Event, open: boolean) => void;
  /**
   * When user click outside the open container.
   */
  onClickOutside?: (event: Event) => void;
  /**
   * Callback called when the dropdown is opened and ready,
   * commonly used to set focus to the content.
   */
  onContainerCreation?: (container: HTMLElement | null) => void;
  /**
   * Attributes applied to the dropdown header element.
   */
  dropdownHeaderProps?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >;
  /**
   * Pass a ref to the dropdown header element.
   */
  dropdownHeaderRef?: React.Ref<any>;
  /**
   * A Jss Object used to override or extend the component styles applied.
   */
  classes?: HvBaseDropdownClasses;
}

export const HvBaseDropdown = (props: HvBaseDropdownProps) => {
  const {
    id,
    className,
    classes: classesProp,
    children,
    role,
    placeholder,
    component,
    adornment,
    expanded,
    dropdownHeaderProps,
    defaultExpanded = false,
    disabled = false,
    readOnly = false,
    disablePortal = false,
    variableWidth = false,
    placement = "right",
    popperProps = {},
    dropdownHeaderRef: dropdownHeaderRefProp,
    onToggle,
    onClickOutside,
    onContainerCreation,
    "aria-expanded": ariaExpandedProp,
    ...others
  } = useDefaultProps("HvBaseDropdown", props);
  const { classes, cx } = useClasses(classesProp);

  const { rootId } = useTheme();

  const [isOpen, setIsOpen] = useControlled(expanded, Boolean(defaultExpanded));

  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(
    null
  );
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
  const [popperMaxSize, setPopperMaxSize] = useState<{
    width?: number;
    height?: number;
  }>({});

  const handleDropdownHeaderRefProp = useForkRef(
    dropdownHeaderRefProp,
    dropdownHeaderProps?.ref
  );
  const handleDropdownHeaderRef = useForkRef(
    setReferenceElement,
    handleDropdownHeaderRefProp
  );

  const ariaRole = role || (component == null ? "combobox" : undefined);

  const ariaExpanded = ariaExpandedProp ?? (ariaRole ? !!isOpen : undefined);

  const elementId = useUniqueId(id, "hvbasedropdown");

  const bottom: PopperPlacementType =
    placement && `bottom-${placement === "right" ? "start" : "end"}`;

  const extensionWidth = referenceElement
    ? referenceElement?.offsetWidth
    : "inherit";

  const { modifiers: popperPropsModifiers = [], ...otherPopperProps } =
    popperProps;

  const onFirstUpdate = useCallback(() => {
    if (onContainerCreation) onContainerCreation(popperElement);
  }, [onContainerCreation, popperElement]);

  const widthCalculator = useCallback(
    ({ state }: ModifierArguments<Options>) => {
      state.styles.popper.width = `${state.rects.reference.width}px`;
    },
    []
  );

  const widthCalculatorEffect = useCallback(
    ({ state }: ModifierArguments<Options>) => {
      state.elements.popper.style.width = `${
        (state.elements.reference as any).offsetWidth
      }px`;
    },
    []
  );

  const applyMaxSizeCalculator = useCallback(
    ({ state }: ModifierArguments<Options>) => {
      // The `maxSize` modifier provides this data
      const { width, height } = state.modifiersData.maxSize;
      if (width !== popperMaxSize?.width || height !== popperMaxSize?.height) {
        setPopperMaxSize({ width, height });
      }

      state.styles.popper = {
        ...state.styles.popper,
        maxWidth: `${width}px`,
        maxHeight: `${height}px`,
      };
    },
    [popperMaxSize]
  );

  const maxSizeCalculator = useCallback(
    ({ state, name, options }: ModifierArguments<Options>) => {
      const overflow = detectOverflow(state, options);

      const x = state.modifiersData.preventOverflow?.x || 0;
      const y = state.modifiersData.preventOverflow?.y || 0;

      const popperWidth = state.rects.popper.width;
      const popperHeight = state.rects.popper.height;

      const basePlacement = state.placement.split("-")[0];

      const widthProp = basePlacement === "left" ? "left" : "right";
      const heightProp = basePlacement === "top" ? "top" : "bottom";

      state.modifiersData[name] = {
        width: popperWidth - overflow[widthProp] - x,
        height: popperHeight - overflow[heightProp] - y,
      };
    },
    []
  );

  const modifiers: PopperProps["modifiers"] = useMemo(
    () => [
      {
        name: "variableWidth",
        enabled: !variableWidth,
        phase: "beforeWrite",
        requires: ["computeStyles"],
        fn: widthCalculator,
        effect: widthCalculatorEffect,
      },
      {
        name: "maxSize",
        enabled: true,
        phase: "main",
        requiresIfExists: ["offset", "preventOverflow", "flip"],
        fn: maxSizeCalculator,
      },
      {
        name: "applyMaxSize",
        enabled: true,
        phase: "beforeWrite",
        requires: ["maxSize"],
        fn: applyMaxSizeCalculator,
      },
      ...popperPropsModifiers,
    ],
    [
      maxSizeCalculator,
      applyMaxSizeCalculator,
      popperPropsModifiers,
      variableWidth,
      widthCalculator,
      widthCalculatorEffect,
    ]
  );

  const { styles: popperStyles, attributes } = usePopper(
    referenceElement,
    popperElement,
    {
      placement: bottom,
      modifiers,
      onFirstUpdate,
      ...otherPopperProps,
    }
  );

  const popperPlacement =
    attributes.popper?.["data-popper-placement"] ?? "bottom";

  const handleToggle = useCallback(
    (event) => {
      if (event && !isKey(event, "Tab")) {
        event.preventDefault();
      }

      const notControlKey =
        !!event?.code &&
        !isOneOfKeys(event, ["Tab", "Enter", "Esc", "ArrowDown", "Space"]);

      const ignoredCombinations =
        (isKey(event, "Esc") && !isOpen) ||
        (isKey(event, "ArrowDown") && isOpen) ||
        (isKey(event, "Tab") && !isOpen);

      if (disabled || notControlKey || ignoredCombinations) return;

      const newOpen = !isOpen;

      /* If about to close focus on the header component. */
      const focusHeader = () => {
        if (!newOpen) {
          // Focus-ring won't be visible even if using the keyboard:
          // https://github.com/WICG/focus-visible/issues/88
          referenceElement?.focus({ preventScroll: true });
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
      return React.cloneElement(component as React.ReactElement, {
        ref: handleDropdownHeaderRef,
        "aria-controls": isOpen
          ? setId(elementId, "children-container")
          : undefined,
      });
    }

    const ExpanderComponent = isOpen ? DropUpXS : DropDownXS;

    return (
      <div
        id={setId(id, "header")}
        className={cx(classes.header, {
          [classes.headerDisabled]: disabled,
          [classes.headerReadOnly]: readOnly,
          [classes.headerOpen]: isOpen,
          [classes.headerOpenUp]: isOpen && popperPlacement.includes("top"),
          [classes.headerOpenDown]:
            isOpen && popperPlacement.includes("bottom"),
        })}
        role={ariaRole === "combobox" ? "textbox" : undefined}
        style={disabled || readOnly ? { pointerEvents: "none" } : undefined}
        aria-controls={
          isOpen ? setId(elementId, "children-container") : undefined
        }
        aria-label={others["aria-label"] ?? undefined}
        aria-labelledby={others["aria-labelledby"] ?? undefined}
        // Removes the element from the navigation sequence for keyboard focus if disabled
        tabIndex={disabled ? -1 : 0}
        ref={handleDropdownHeaderRef}
        {...dropdownHeaderProps}
      >
        <div className={classes.selection}>
          {placeholder && typeof placeholder === "string" ? (
            <HvTypography
              className={cx(classes.placeholder, {
                [classes.selectionDisabled]: disabled,
              })}
              variant="body"
            >
              {placeholder}
            </HvTypography>
          ) : (
            placeholder
          )}
        </div>
        <div className={classes.arrowContainer}>
          {adornment || (
            <ExpanderComponent
              iconSize="XS"
              color={disabled ? theme.colors.secondary_60 : undefined}
              className={classes.arrow}
            />
          )}
        </div>
      </div>
    );
  })();

  const containerComponent = (() => {
    /**
     *  Handle keyboard inside children container.
     */
    const handleContainerKeyDown: KeyboardEventHandler = (event) => {
      if (isKey(event, "Esc")) {
        handleToggle(event);
      }
      if (isKey(event, "Tab") && !event.shiftKey) {
        const focusList = getFirstAndLastFocus(popperElement);
        if (document.activeElement === focusList?.last) {
          event.preventDefault();
          focusList?.first?.focus();
        }
      }
    };

    const handleOutside: ClickAwayListenerProps["onClickAway"] = (event) => {
      const isButtonClick = referenceElement?.contains(event.target as any);
      if (!isButtonClick) {
        onClickOutside?.(event);
        setIsOpen(false);
        onToggle?.(event, false);
      }
    };

    const container = (
      <div
        role="tooltip"
        ref={setPopperElement}
        className={classes.container}
        style={popperStyles.popper}
        {...attributes.popper}
      >
        <ClickAwayListener onClickAway={handleOutside}>
          {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
          <div onKeyDown={handleContainerKeyDown}>
            {popperPlacement.includes("bottom") && (
              <div
                style={{ width: extensionWidth }}
                className={cx(classes.inputExtensionOpen, {
                  [classes.inputExtensionLeftPosition]:
                    popperPlacement.includes("end"),
                })}
              />
            )}
            <BaseDropdownContext.Provider value={popperMaxSize}>
              <div
                id={setId(elementId, "children-container")}
                className={cx(classes.panel, {
                  [classes.panelOpenedUp]: popperPlacement.includes("top"),
                  [classes.panelOpenedDown]: popperPlacement.includes("bottom"),
                })}
              >
                {children}
              </div>
            </BaseDropdownContext.Provider>
            {popperPlacement.includes("top") && (
              <div
                style={{ width: extensionWidth }}
                className={cx(
                  classes.inputExtensionOpen,
                  classes.inputExtensionOpenShadow,
                  {
                    [classes.inputExtensionFloatRight]:
                      popperPlacement.includes("end"),
                    [classes.inputExtensionFloatLeft]:
                      popperPlacement.includes("start"),
                  }
                )}
              />
            )}
          </div>
        </ClickAwayListener>
      </div>
    );

    if (disablePortal) return container;

    return createPortal(
      container,
      document.getElementById(rootId || "") || document.body
    );
  })();

  return (
    <div className={classes.root}>
      <div
        id={id}
        role={ariaRole}
        aria-expanded={ariaExpanded}
        aria-owns={isOpen ? setId(elementId, "children-container") : undefined}
        className={cx(
          classes.anchor,
          { [classes.rootDisabled]: disabled },
          className
        )}
        {...(!readOnly && {
          onKeyDown: handleToggle,
          onClick: handleToggle,
        })}
        // Removes the element from the navigation sequence for keyboard focus
        tabIndex={-1}
        {...others}
      >
        {headerComponent}
      </div>
      {isOpen && containerComponent}
    </div>
  );
};
