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
import {
  getColor,
  theme,
  type HvColorAny,
  type HvSize,
} from "@hitachivantara/uikit-styles";

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
  /** @deprecated */
  variant?: "filled" | "outlined";
  size?: Extract<HvSize, "xs" | "sm" | "md">;
  icon?: React.ReactNode;
  /** Whether to show the select icon checkbox. */
  showSelectIcon?: boolean;
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
  /** Aria properties to apply to delete button in tag. @deprecated no longer used */
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
    size = "xs",
    variant,
    type = "semantic",
    selectable,
    selected,
    defaultSelected = false,
    showSelectIcon = selectable,
    color,
    icon: iconProp,
    deleteIcon: deleteIconProp,
    onDelete,
    onClick,
    onKeyDown,
    onKeyUp,
    deleteButtonArialLabel,
    deleteButtonProps,
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

  const tagColor =
    // backwards-compatibility for `type` prop
    (type === "categorical" && theme.alpha(color || "cat1", 0.2)) ||
    // use the palette color if it matches
    theme.palette[color as keyof typeof theme.palette]?.[600] ||
    getColor(color);

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
        "--tagColor": tagColor,
      })}
      className={cx(classes.root, classes.chipRoot, classes[size], className, {
        [classes.hasIcon]: iconProp || (selectable && showSelectIcon),
        [classes.clickable]: isClickable && !disabled,
        [classes.selected]: isSelected,
        [classes.disabled]: disabled,
        [classes.outlined]: variant === "outlined",
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
      {iconProp}
      {selectable && showSelectIcon && (
        <CheckboxIcon
          className={classes.icon}
          color={(disabled && ["bgPageSecondary", "textDisabled"]) || undefined}
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
      {onDelete && !disabled && deleteIcon}
    </HvButtonBase>
  );
});
