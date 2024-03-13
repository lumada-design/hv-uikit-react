import React, {
  SyntheticEvent,
  useCallback,
  useMemo,
  HTMLAttributes,
} from "react";

import { DropDownXS, DropUpXS } from "@hitachivantara/uikit-react-icons";

import { useDefaultProps } from "../hooks/useDefaultProps";
import { useControlled } from "../hooks/useControlled";
import { useUniqueId } from "../hooks/useUniqueId";

import { HvBaseProps } from "../types/generic";
import { setId } from "../utils/setId";
import { HvTypographyVariants, HvTypography } from "../Typography";
import { ExtractNames } from "../utils/classes";

import { staticClasses, useClasses } from "./Accordion.styles";

export { staticClasses as accordionClasses };

export type HvAccordionClasses = ExtractNames<typeof useClasses>;

export interface HvAccordionProps
  extends HvBaseProps<HTMLDivElement, "onChange" | "children"> {
  /**
   * Content to be rendered
   */
  children: React.ReactNode;
  /**
   * The accordion label button.
   */
  label?: string;
  /**
   * The function that will be executed whenever the accordion toggles it will receive the state of the accordion
   */
  onChange?: (event: React.SyntheticEvent, value: boolean) => void;
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
  containerProps?: HTMLAttributes<HTMLDivElement>;
  /**
   * Heading Level to apply to accordion button if ´undefined´ the button won't have a header wrapper.
   */
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  /**
   * Is the accordion disabled.
   */
  disabled?: boolean;
  /**
   * Typography variant for the label.
   */
  labelVariant?: HvTypographyVariants;
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes?: HvAccordionClasses;
}

/**
 * A accordion is a design element that expands in place to expose hidden information.
 */
export const HvAccordion = (props: HvAccordionProps) => {
  const {
    id: idProp,
    className,
    classes: classesProp,
    disabled = false,
    label,
    onChange,
    children,
    expanded,
    headingLevel,
    defaultExpanded = false,
    containerProps,
    labelVariant = "label",
    ...others
  } = useDefaultProps("HvAccordion", props);

  const id = useUniqueId(idProp);

  const { classes, cx } = useClasses(classesProp);

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
    const color = disabled ? "secondary_60" : undefined;

    const accordionButton = (
      <HvTypography
        id={accordionHeaderId}
        component="div"
        role="button"
        className={cx(classes.label, { [classes.disabled]: disabled })}
        disabled={disabled}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onClick={handleClick}
        variant={labelVariant}
        aria-expanded={isOpen}
        aria-disabled={disabled}
      >
        {isOpen ? <DropUpXS color={color} /> : <DropDownXS color={color} />}
        {label}
      </HvTypography>
    );

    return headingLevel === undefined ? (
      accordionButton
    ) : (
      <HvTypography component={`h${headingLevel}`} variant={labelVariant}>
        {accordionButton}
      </HvTypography>
    );
  }, [
    cx,
    classes,
    handleClick,
    handleKeyDown,
    label,
    accordionHeaderId,
    disabled,
    headingLevel,
    isOpen,
    labelVariant,
  ]);

  return (
    <div id={id} className={cx(classes.root, className)} {...others}>
      {accordionHeader}
      <div
        id={accordionContainer}
        role="region"
        aria-labelledby={accordionHeaderId}
        className={cx(classes.container, { [classes.hidden]: !isOpen })}
        hidden={!isOpen}
        {...containerProps}
      >
        {children}
      </div>
    </div>
  );
};
