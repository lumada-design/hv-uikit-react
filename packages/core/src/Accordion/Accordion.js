import React, { useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core";
import { DropDownXS, DropUpXS } from "@hv/uikit-react-icons";
import styles from "./styles";
import { setId, useControlled } from "../utils";
import { HvTypography } from "..";

/**
 * A accordion is a design element that expands in place to expose hidden information.
 */
const HvAccordion = ({
  id,
  className,
  classes,
  disabled = false,
  label,
  labelProps,
  onChange = null,
  children,
  expanded,
  containerProps,
  ...others
}) => {
  const [isOpen, setIsOpen] = useControlled(expanded, false);

  const handleAction = useCallback(
    (event) => {
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
    (event) => {
      handleAction(event);
      event.preventDefault();
      event.stopPropagation();
    },
    [handleAction]
  );

  const handleKeyDown = useCallback(
    (event) => {
      let isEventHandled = false;
      const { key } = event;

      if (event.altKey || event.ctrlKey || event.metaKey || event.currentTarget !== event.target) {
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
    return (
      <HvTypography
        id={accordionHeaderId}
        component="div"
        role="button"
        className={clsx(classes.label, {
          [classes.disabled]: disabled,
        })}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onClick={handleClick}
        variant={disabled ? "disabledText" : "highlightText"}
        aria-expanded={isOpen}
        aria-disabled={disabled}
        {...labelProps}
      >
        {isOpen ? <DropUpXS color={color} /> : <DropDownXS color={color} />}
        {label}
      </HvTypography>
    );
  }, [classes, handleClick, handleKeyDown, label, labelProps, accordionHeaderId, disabled, isOpen]);

  return (
    <div id={id} className={clsx(className, classes.root)} {...others}>
      {accordionHeader}
      <div
        id={accordionContainer}
        role="region"
        aria-labelledby={accordionHeaderId}
        className={clsx(classes.container, { [classes.hidden]: !isOpen })}
        {...containerProps}
      >
        {children}
      </div>
    </div>
  );
};

HvAccordion.propTypes = {
  /**
   * Id to be applied to the root node of the accordion.
   */
  id: PropTypes.string,
  /**
   * Class names to be applied to the accordion.
   */
  className: PropTypes.string,
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the component root of the accordion.
     */
    root: PropTypes.string,
    /**
     * Styles applied to the content when it is hidden.
     */
    hidden: PropTypes.string,
    /**
     * Styles applied to the content when it is hidden.
     */
    container: PropTypes.string,
    /**
     * Styles applied to the label button.
     */
    label: PropTypes.string,
    /**
     * Styles applied to the label button when it is disabled.
     */
    disabled: PropTypes.string,
  }).isRequired,
  /**
   * The accordion label button.
   */
  label: PropTypes.node.isRequired,
  /**
   * An object containing props to be passed onto the accordion label button.
   */
  labelProps: PropTypes.instanceOf(Object),
  /**
   * The function that will be executed whenever the accordion toggles it will receive the state of the accordion
   */
  onChange: PropTypes.func,
  /**
   * Whether the accordion is open or not, if this property is defined the accordion must be fully controlled.
   */
  expanded: PropTypes.bool,
  /**
   * An object containing props to be passed onto container holding the accordion children.
   */
  containerProps: PropTypes.instanceOf(Object),
  /**
   * Is the accordion disabled.
   */
  disabled: PropTypes.bool,
  /**
   * The content of the accordion.
   */
  children: PropTypes.node,
};

export default withStyles(styles, { name: "HvAccordion" })(HvAccordion);
