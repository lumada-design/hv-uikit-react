import React, { SyntheticEvent, useCallback, useMemo } from "react";
import clsx from "clsx";
import { useControlled } from "hooks";
import { DropDownXS, DropUpXS } from "@hitachivantara/uikit-icons";
import { HvBaseProps } from "../../types";
import { setId } from "utils";
import { StyledContainer, StyledLabel, StyledRoot } from "./Accordion.styles";
import accordionClasses, { HvAccordionClasses } from "./accordionClasses";

export type HvAccordionProps = HvBaseProps & {
  /**
   * Id to be applied to the root node of the accordion.
   */
  id?: string;
  /**
   * Class names to be applied to the accordion.
   */
  className?: string;
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes?: HvAccordionClasses;
  /**
   * The accordion label button.
   */
  label?: any;
  /**
   * The function that will be executed whenever the accordion toggles it will receive the state of the accordion
   */
  onChange?: any;
  /**
   * Whether the accordion is open or not, if this property is defined the accordion must be fully controlled.
   */
  expanded?: boolean;
  /**
   * When uncontrolled, defines the initial expanded state.
   */
  defaultExpanded?: boolean;
  /**
   * An object containing props to be passed onto container holding the accordion children.
   */
  containerProps?: Object;
  /**
   * Heading Level to apply to accordion button if ´undefined´ the button won't have a header wrapper.
   */
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  /**
   * Is the accordion disabled.
   */
  disabled?: boolean;
};

/**
 * A accordion is a design element that expands in place to expose hidden information.
 */
export const HvAccordion = ({
  id,
  className,
  classes,
  disabled = false,
  label,
  onChange,
  children,
  expanded,
  headingLevel,
  defaultExpanded = false,
  containerProps,
  ...others
}: HvAccordionProps) => {
  const [isOpen, setIsOpen] = useControlled(expanded, Boolean(defaultExpanded));

  const handleAction = useCallback(
    (event: SyntheticEvent) => {
      if (!disabled) {
        onChange?.(event, isOpen);
        setIsOpen(!isOpen);
        return true;
      }
      return false;
    },
    [disabled, onChange, isOpen, setIsOpen]
  );

  const handleClick = useCallback(
    (event: SyntheticEvent) => {
      handleAction(event);
      event.preventDefault();
      event.stopPropagation();
    },
    [handleAction]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      let isEventHandled = false;
      const { key } = event;

      if (
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        event.currentTarget !== event.target
      ) {
        return;
      }
      switch (key) {
        case "Enter":
        case " ":
          isEventHandled = handleAction(event);
          break;
        default:
          return;
      }

      if (isEventHandled) {
        event.preventDefault();
        event.stopPropagation();
      }
    },
    [handleAction]
  );

  const accordionHeaderId = setId(id, "button");
  const accordionContainer = setId(id, "container");
  const accordionHeader = useMemo(() => {
    const color = (disabled && ["atmo5"]) || undefined;
    const accordionButton = (
      <StyledLabel
        id={accordionHeaderId}
        as="div"
        role="button"
        className={clsx(accordionClasses.label, classes?.label)}
        disabled={disabled}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onClick={handleClick}
        variant={"label"}
        aria-expanded={isOpen}
        aria-disabled={disabled}
      >
        {isOpen ? <DropUpXS color={color} /> : <DropDownXS color={color} />}
        {label}
      </StyledLabel>
    );
    const result =
      headingLevel === undefined ? (
        accordionButton
      ) : (
        <StyledLabel as={`h${headingLevel}`}>{accordionButton}</StyledLabel>
      );
    return result;
  }, [
    classes,
    handleClick,
    handleKeyDown,
    label,
    accordionHeaderId,
    disabled,
    headingLevel,
    isOpen,
  ]);

  return (
    <StyledRoot
      id={id}
      className={clsx(className, accordionClasses.root, classes?.root)}
      {...others}
    >
      {accordionHeader}
      <StyledContainer
        id={accordionContainer}
        role="region"
        aria-labelledby={accordionHeaderId}
        className={clsx(accordionClasses.container, classes?.container)}
        hidden={!isOpen}
        {...containerProps}
      >
        {children}
      </StyledContainer>
    </StyledRoot>
  );
};
