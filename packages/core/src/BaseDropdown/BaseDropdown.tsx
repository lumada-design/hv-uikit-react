import React, {
  useMemo,
  useState,
  useCallback,
  KeyboardEventHandler,
  AriaAttributes,
  forwardRef,
} from "react";

import { ClickAwayListenerProps } from "@mui/material/ClickAwayListener";
import { PopperProps, usePopper } from "react-popper";
import {
  detectOverflow,
  ModifierArguments,
  Options,
  Placement,
} from "@popperjs/core";

import { useUniqueId } from "../hooks/useUniqueId";
import { useForkRef } from "../hooks/useForkRef";
import { useControlled } from "../hooks/useControlled";
import { useDefaultProps } from "../hooks/useDefaultProps";
import { isKey, isOneOfKeys } from "../utils/keyboardUtils";
import { setId } from "../utils/setId";
import { getFirstAndLastFocus } from "../utils/focusableElementFinder";
import { HvBaseProps } from "../types/generic";
import { ExtractNames } from "../utils/classes";

import { staticClasses, useClasses } from "./BaseDropdown.styles";
import BaseDropdownContext from "./BaseDropdownContext";
import { HvDropdownButton, HvDropdownButtonProps } from "./DropdownButton";
import { HvDropdownContainer } from "./DropdownContainer";
import { HvDropdownPanel } from "./DropdownPanel";

export { staticClasses as baseDropdownClasses };

export type HvBaseDropdownClasses = ExtractNames<typeof useClasses>;

export interface HvBaseDropdownProps extends HvBaseProps {
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
  placeholder?: React.ReactNode;
  /**
   * If `true` the dropdown is disabled unable to be interacted, if `false` it is enabled.
   */
  disabled?: boolean;
  /**
   * If `true` the dropdown will be in read only mode, unable to be interacted.
   */
  readOnly?: boolean;
  /**
   * Indicates that user input is required on the form element.
   */
  required?: boolean;
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
  popperProps?: Partial<PopperProps<any>>;
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
    HvDropdownButtonProps,
    HTMLDivElement
  >;
  /**
   * Pass a ref to the dropdown header element.
   */
  dropdownHeaderRef?: React.Ref<HTMLDivElement>;
  /**
   * A Jss Object used to override or extend the component styles applied.
   */
  classes?: HvBaseDropdownClasses;
  /** @ignore */
  ref?: React.Ref<HTMLDivElement>;
}

export const HvBaseDropdown = forwardRef<HTMLDivElement, HvBaseDropdownProps>(
  (props, ref) => {
    const {
      id: idProp,
      className,
      classes: classesProp,
      children,
      role,
      placeholder,
      component,
      adornment,
      expanded,
      dropdownHeaderProps,
      defaultExpanded,
      disabled,
      readOnly,
      required,
      disablePortal,
      variableWidth,
      placement: placementProp = "right",
      "aria-expanded": ariaExpandedProp,
      "aria-label": ariaLabelProp,
      "aria-labelledby": ariaLabelledByProp,
      popperProps = {},
      dropdownHeaderRef: dropdownHeaderRefProp,
      onToggle,
      onClickOutside,
      onContainerCreation,
      ...others
    } = useDefaultProps("HvBaseDropdown", props);
    const { classes, cx } = useClasses(classesProp);

    const [isOpen, setIsOpen] = useControlled(
      expanded,
      Boolean(defaultExpanded)
    );

    const [referenceElement, setReferenceElement] =
      useState<HTMLElement | null>(null);
    const [popperElement, setPopperElement] = useState<HTMLElement | null>(
      null
    );
    const [popperMaxSize, setPopperMaxSize] = useState<{
      width?: number;
      height?: number;
    }>({});

    const handleDropdownHeaderRefProp = useForkRef(
      dropdownHeaderRefProp,
      dropdownHeaderProps?.ref
    );
    const handleDropdownHeaderRef: any = useForkRef(
      setReferenceElement,
      handleDropdownHeaderRefProp
    );

    const ariaRole = role || (component == null ? "combobox" : undefined);

    const ariaExpanded = ariaExpandedProp ?? (ariaRole ? !!isOpen : undefined);

    const id = useUniqueId(idProp, "hvbasedropdown");
    const containerId = setId(id, "children-container");

    const headerControlArias = {
      "aria-required": required ?? undefined,
      "aria-readonly": readOnly ?? undefined,
      "aria-disabled": disabled ?? undefined,

      "aria-expanded": ariaExpanded,
      "aria-owns": isOpen ? containerId : undefined,
      "aria-controls": isOpen ? containerId : undefined,
    } satisfies AriaAttributes;

    const headerAriaLabels = {
      "aria-label": ariaLabelProp,
      "aria-labelledby": ariaLabelledByProp,
    } satisfies AriaAttributes;

    const placement: Placement = `bottom-${
      placementProp === "right" ? "start" : "end"
    }`;

    const { modifiers: popperPropsModifiers = [], ...otherPopperProps } =
      popperProps;

    const onFirstUpdate = useCallback(() => {
      onContainerCreation?.(popperElement);
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
        if (
          width !== popperMaxSize?.width ||
          height !== popperMaxSize?.height
        ) {
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

    const modifiers = useMemo<Options["modifiers"]>(
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
        placement,
        modifiers,
        onFirstUpdate,
        ...otherPopperProps,
      }
    );

    const popperPlacement =
      (attributes.popper?.["data-popper-placement"] as Placement) ?? "bottom";

    const handleToggle = useCallback(
      (event: any) => {
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
        setIsOpen(() => {
          if (!newOpen) {
            // Focus-ring won't be visible even if using the keyboard:
            // https://github.com/WICG/focus-visible/issues/88
            referenceElement?.focus({ preventScroll: true });
          }

          return newOpen;
        });

        onToggle?.(event, newOpen);
      },
      [isOpen, disabled, setIsOpen, onToggle, referenceElement]
    );

    const defaultHeaderElement = (
      <HvDropdownButton
        ref={handleDropdownHeaderRef}
        id={setId(id, "header")}
        open={isOpen}
        placement={popperPlacement}
        disabled={disabled}
        classes={{
          root: classes.header,
          disabled: classes.headerDisabled,
          readOnly: classes.headerReadOnly,
          open: classes.headerOpen,
          openUp: classes.headerOpenUp,
          openDown: classes.headerOpenDown,
          placeholder: classes.placeholder,
          selection: classes.selection,
          arrowContainer: classes.arrowContainer,
          arrow: classes.arrow,
        }}
        adornment={adornment}
        // TODO: review "textbox" role
        role={ariaRole === "combobox" ? "textbox" : undefined}
        {...headerAriaLabels}
        style={disabled || readOnly ? { pointerEvents: "none" } : undefined}
        // Removes the element from the navigation sequence for keyboard focus if disabled
        tabIndex={disabled ? -1 : 0}
        {...dropdownHeaderProps}
      >
        {placeholder}
      </HvDropdownButton>
    );

    const headerElement =
      component && React.isValidElement(component)
        ? React.cloneElement(component as React.ReactElement, {
            ref: handleDropdownHeaderRef,
            ...headerControlArias,
          })
        : defaultHeaderElement;

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

    const handleClickAway: ClickAwayListenerProps["onClickAway"] = (event) => {
      const isButtonClick = referenceElement?.contains(event.target as any);
      if (!isButtonClick) {
        onClickOutside?.(event);
        setIsOpen(false);
        onToggle?.(event, false);
      }
    };

    const containerElement = (
      <HvDropdownContainer
        onClickAway={handleClickAway}
        onContainerKeyDown={handleContainerKeyDown}
        ref={setPopperElement}
        className={classes.container}
        style={popperStyles.popper}
        {...attributes.popper}
      >
        <HvDropdownPanel
          id={containerId}
          placement={popperPlacement}
          classes={{
            panel: classes.panel,
            extensionFloatLeft: classes.inputExtensionFloatLeft,
            extensionFloatRight: classes.inputExtensionFloatRight,
            extensionLeftPosition: classes.inputExtensionLeftPosition,
            extensionOpen: classes.inputExtensionOpen,
            panelOpenedUp: classes.panelOpenedUp,
            panelOpenedDown: classes.panelOpenedDown,
          }}
        >
          <BaseDropdownContext.Provider value={popperMaxSize}>
            {children}
          </BaseDropdownContext.Provider>
        </HvDropdownPanel>
      </HvDropdownContainer>
    );

    return (
      <div className={classes.root}>
        <div
          ref={ref}
          id={id}
          className={cx(
            classes.anchor,
            { [classes.rootDisabled]: disabled },
            className
          )}
          {...(!readOnly && {
            onKeyDown: handleToggle,
            onClick: handleToggle,
          })}
          {...(ariaRole && {
            role: ariaRole,
            ...headerAriaLabels,
            ...headerControlArias,
          })}
          // Removes the element from the navigation sequence for keyboard focus
          tabIndex={-1}
          {...others}
        >
          {headerElement}
        </div>
        {isOpen && containerElement}
      </div>
    );
  }
);
