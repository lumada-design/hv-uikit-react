import React, { useMemo, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { clsx } from "clsx";
import BaseDropdownContext from "./BaseDropdownContext";
import {
  ClickAwayListener,
  PopperPlacementType,
  PopperProps,
} from "@mui/material";
import { useControlled, useForkRef, useTheme, useUniqueId } from "@core/hooks";
import { isKeypress, keyboardCodes, setId } from "@core/utils";
import { getFirstAndLastFocus } from "@core/utils/focusableElementFinder";
import { HvBaseProps } from "@core/types";
import {
  StyledAnchor,
  StyledContainer,
  StyledDropDownXS,
  StyledDropUpXS,
  StyledExtension,
  StyledHeaderRoot,
  StyledPanel,
  StyledPlaceholder,
  StyledRoot,
  StyledSelection,
} from "./BaseDropdown.styles";
import { usePopper } from "react-popper";
import { detectOverflow, ModifierArguments, Options } from "@popperjs/core";
import baseDropdownClasses, {
  HvBaseDropdownClasses,
} from "./baseDropdownClasses";

const { Tab, Enter, Esc, Space, ArrowDown } = keyboardCodes;

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

export const HvBaseDropdown = ({
  id,
  className,
  classes,
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
  ...others
}: HvBaseDropdownProps) => {
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

  const modifiers: any = useMemo(
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

  let popperPlacement = "bottom";
  if (attributes.popper) {
    popperPlacement = attributes.popper["data-popper-placement"];
  }

  const handleToggle = useCallback(
    (event) => {
      if (event && !isKeypress(event, Tab)) {
        event.preventDefault();
      }

      // We are checking specifically for false because if "isKeypress" returns true or undefined it should continue
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
      });
    }

    return (
      <StyledHeaderRoot
        id={setId(id, "header")}
        className={clsx(
          baseDropdownClasses.header,
          classes?.header,
          disabled &&
            clsx(baseDropdownClasses.headerDisabled, classes?.headerDisabled),
          readOnly &&
            clsx(baseDropdownClasses.headerReadOnly, classes?.headerReadOnly),
          isOpen && clsx(baseDropdownClasses.headerOpen, classes?.headerOpen),
          isOpen &&
            popperPlacement.includes("top") &&
            clsx(baseDropdownClasses.headerOpenUp, classes?.headerOpenUp),
          isOpen &&
            popperPlacement.includes("bottom") &&
            clsx(baseDropdownClasses.headerOpenDown, classes?.headerOpenDown)
        )}
        $disabled={disabled}
        $readOnly={readOnly}
        $opened={isOpen}
        $openedUp={isOpen && popperPlacement.includes("top")}
        $openedDown={isOpen && popperPlacement.includes("bottom")}
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
        <StyledSelection
          className={clsx(baseDropdownClasses.selection, classes?.selection)}
        >
          {placeholder && typeof placeholder === "string" ? (
            <StyledPlaceholder
              className={clsx(
                baseDropdownClasses.placeholder,
                classes?.placeholder,
                disabled &&
                  clsx(
                    baseDropdownClasses.selectionDisabled,
                    classes?.selectionDisabled
                  )
              )}
              $disabled={disabled}
              variant="body"
            >
              {placeholder}
            </StyledPlaceholder>
          ) : (
            placeholder
          )}
        </StyledSelection>
        {adornment ||
          (isOpen ? (
            <StyledDropUpXS
              iconSize="XS"
              className={clsx(baseDropdownClasses.arrow, classes?.arrow)}
            />
          ) : (
            <StyledDropDownXS
              iconSize="XS"
              className={clsx(baseDropdownClasses.arrow, classes?.arrow)}
              $disabled={disabled}
            />
          ))}
      </StyledHeaderRoot>
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
        onClickOutside?.(event);
        setIsOpen(false);
        onToggle?.(event, false);
      }
    };

    const container = (
      <StyledContainer
        role="tooltip"
        ref={setPopperElement}
        className={clsx(baseDropdownClasses.container, classes?.container)}
        style={popperStyles.popper}
        {...attributes.popper}
      >
        <ClickAwayListener onClickAway={handleOutside}>
          <div onKeyDown={handleContainerKeyDown}>
            {popperPlacement.includes("bottom") && (
              <StyledExtension
                style={{ width: extensionWidth }}
                className={clsx(
                  baseDropdownClasses.inputExtensionOpen,
                  classes?.inputExtensionOpen,
                  popperPlacement.includes("end") &&
                    clsx(
                      baseDropdownClasses.inputExtensionLeftPosition,
                      classes?.inputExtensionLeftPosition
                    )
                )}
                $leftPosition={popperPlacement.includes("end")}
                $openShadow={false}
                $floatLeft={false}
                $floatRight={false}
              />
            )}
            <BaseDropdownContext.Provider value={popperMaxSize}>
              <StyledPanel
                id={setId(elementId, "children-container")}
                className={clsx(baseDropdownClasses.panel, classes?.panel)}
                $popperPlacement={
                  popperPlacement.includes("top") ? "top" : "bottom"
                }
              >
                {children}
              </StyledPanel>
            </BaseDropdownContext.Provider>
            {popperPlacement.includes("top") && (
              <StyledExtension
                style={{ width: extensionWidth }}
                className={clsx(
                  baseDropdownClasses.inputExtensionOpen,
                  classes?.inputExtensionOpen,
                  baseDropdownClasses.inputExtensionOpenShadow,
                  classes?.inputExtensionOpenShadow,
                  popperPlacement.includes("end") &&
                    clsx(
                      baseDropdownClasses.inputExtensionFloatRight,
                      classes?.inputExtensionFloatRight
                    ),
                  popperPlacement.includes("start") &&
                    clsx(
                      baseDropdownClasses.inputExtensionFloatLeft,
                      classes?.inputExtensionFloatLeft
                    )
                )}
                $leftPosition={false}
                $openShadow={true}
                $floatLeft={popperPlacement.includes("start")}
                $floatRight={popperPlacement.includes("end")}
              />
            )}
          </div>
        </ClickAwayListener>
      </StyledContainer>
    );

    if (disablePortal) return container;

    return createPortal(
      container,
      document.getElementById(rootId || "") || document.body
    );
  })();

  return (
    <StyledRoot className={clsx(baseDropdownClasses.root, classes?.root)}>
      <StyledAnchor
        id={id}
        role={ariaRole}
        aria-expanded={!!isOpen}
        aria-owns={isOpen ? setId(elementId, "children-container") : undefined}
        className={clsx(
          className,
          baseDropdownClasses.anchor,
          classes?.anchor,
          disabled &&
            clsx(baseDropdownClasses.rootDisabled, classes?.rootDisabled)
        )}
        $disabled={disabled}
        {...(!readOnly && {
          onKeyDown: handleToggle,
          onClick: handleToggle,
        })}
        // Removes the element from the navigation sequence for keyboard focus
        tabIndex={-1}
        {...others}
      >
        {headerComponent}
      </StyledAnchor>
      {isOpen && containerComponent}
    </StyledRoot>
  );
};
