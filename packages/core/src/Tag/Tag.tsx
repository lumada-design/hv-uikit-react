import { cloneElement, forwardRef, isValidElement } from "react";
import {
  Checkbox,
  CheckboxCheck,
  CloseXS,
} from "@hitachivantara/uikit-react-icons";
import {
  mergeStyles,
  useDefaultProps,
  type ExtractNames,
} from "@hitachivantara/uikit-react-utils";
import { getColor, HvColorAny, theme } from "@hitachivantara/uikit-styles";

import { HvButtonBase, HvButtonBaseProps } from "../ButtonBase";
import { useControlled } from "../hooks/useControlled";
import { HvTypography } from "../Typography";
import { isDeleteKey } from "../utils/keyboardUtils";
import { staticClasses, useClasses } from "./Tag.styles";

export { staticClasses as tagClasses };

export type HvTagClasses = ExtractNames<typeof useClasses>;

export interface HvTagProps
  extends Omit<
    HvButtonBaseProps,
    "type" | "color" | "classes" | "onClick" | "onToggle"
  > {
  /** The label of the tag element. */
  label?: React.ReactNode;
  /** Indicates that the form element is disabled. */
  disabled?: boolean;
  /** The type of the tag element. A tag can be of semantic or categoric type. */
  type?: "semantic" | "categorical";
  /** The color variant of the tag */
  color?: HvColorAny;
  /** Icon used to customize the delete icon */
  deleteIcon?: React.ReactElement;
  /**
   * The callback fired when the delete icon is pressed.
   * This function has to be provided to the component, in order to render the delete icon
   * */
  onDelete?: React.EventHandler<any>;
  /** Callback triggered when any item is clicked. */
  onClick?: (event: React.MouseEvent<HTMLElement>, selected?: boolean) => void;
  /** Aria properties to apply to delete button in tag
   * @deprecated no longer used
   */
  deleteButtonArialLabel?: string;
  /** Props to apply to delete icon */
  deleteButtonProps?: React.HTMLAttributes<HTMLDivElement>;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvTagClasses;
  /** Determines whether or not the tag is selectable. */
  selectable?: boolean;
  /** Defines if the tag is selected. When defined the tag state becomes controlled. */
  selected?: boolean;
  /** When uncontrolled, defines the initial selected state. */
  defaultSelected?: boolean;
}

/**
 * A Tag is one word that describes a specific aspect of an asset. A single asset can have
 * multiple tags.
 * Use tags to highlight an item's status for quick recognition and navigation
 * Use color to indicate meanings that users can learn and recognize across products.
 */
export const HvTag = forwardRef<
  // no-indent
  HTMLElement,
  HvTagProps
>(function HvTag(props, ref) {
  const {
    classes: classesProp,
    className,
    component,
    style,
    label,
    disabled,
    type = "semantic",
    selectable,
    selected,
    defaultSelected = false,
    color,
    deleteIcon: deleteIconProp,
    onDelete,
    onClick,
    onKeyDown,
    onKeyUp,
    // TODO: remove from API
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    deleteButtonArialLabel = "Delete tag",
    deleteButtonProps = {},
    ...others
  } = useDefaultProps("HvTag", props);
  const { classes, cx } = useClasses(classesProp);

  const [isSelected, setIsSelected] = useControlled(
    selected,
    Boolean(defaultSelected),
  );

  const handleDeleteClick = (event: React.MouseEvent) => {
    // Stop the event from bubbling up to the tag
    event.stopPropagation();
    onDelete?.(event);
  };

  const backgroundColor =
    (type === "semantic" && getColor(color, "neutral_20")) ||
    (type === "categorical" && theme.alpha(getColor(color, "cat1")!, 0.2)) ||
    undefined;

  const isClickable = !!(onClick || onDelete || selectable);

  const CheckboxIcon = isSelected ? CheckboxCheck : Checkbox;

  const deleteIcon =
    deleteIconProp && isValidElement(deleteIconProp) ? (
      cloneElement<any>(deleteIconProp, {
        className: cx(classes.deleteIcon, {
          [classes.disabledDeleteIcon]: disabled,
        }),
        onClick: handleDeleteClick,
      })
    ) : (
      <CloseXS
        size="XS"
        onClick={handleDeleteClick}
        className={cx(classes.deleteIcon, classes.button, classes.tagButton)}
        {...deleteButtonProps}
      />
    );

  return (
    <HvButtonBase
      ref={ref as any}
      component={isClickable ? HvButtonBase : "div"}
      disabled={disabled}
      data-color={color}
      style={mergeStyles(style, {
        "--bgColor": backgroundColor,
      })}
      className={cx(classes.root, classes.chipRoot, className, {
        [classes.disabled]: disabled,
        [classes.selected]: isSelected,
        [classes.clickable]: isClickable && !disabled,
        [classes.categorical]: type === "categorical",
        [classes.categoricalFocus]: type === "categorical" && !disabled,
        [classes.categoricalDisabled]: type === "categorical" && disabled,
      })}
      onKeyUp={(event: React.KeyboardEvent<HTMLButtonElement>) => {
        // Ignore events from children.
        if (event.currentTarget === event.target && isDeleteKey(event)) {
          onDelete?.(event);
        }

        onKeyUp?.(event);
      }}
      onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
        if (disabled) return;
        if (selectable) setIsSelected(!isSelected);
        onClick?.(event, !isSelected);
      }}
      selected={isClickable && isSelected}
      {...others}
    >
      {selectable && type === "semantic" && (
        <CheckboxIcon
          className={classes.icon}
          color={(disabled && ["atmo3", "secondary_60"]) || undefined}
          size="XS"
        />
      )}
      <HvTypography
        noWrap
        variant="caption2"
        component="span"
        className={classes.label}
      >
        {label}
      </HvTypography>
      {onDelete && deleteIcon}
    </HvButtonBase>
  );
});
