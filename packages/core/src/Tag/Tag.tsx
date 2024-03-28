import { forwardRef } from "react";
import Chip, { ChipProps as MuiChipProps } from "@mui/material/Chip";
import {
  Checkbox,
  CheckboxCheck,
  CloseXS,
} from "@hitachivantara/uikit-react-icons";
import { getColor, HvColorAny } from "@hitachivantara/uikit-styles";

import { useControlled } from "../hooks/useControlled";
import { useDefaultProps } from "../hooks/useDefaultProps";
import { useTheme } from "../hooks/useTheme";
import { ExtractNames } from "../utils/classes";
import { staticClasses, useClasses } from "./Tag.styles";

export { staticClasses as tagClasses };

export type HvTagClasses = ExtractNames<typeof useClasses>;

export interface HvTagProps
  extends Omit<MuiChipProps, "color" | "classes" | "onSelect"> {
  /** The label of the tag element. */
  label?: React.ReactNode;
  /** Indicates that the form element is disabled. */
  disabled?: boolean;
  /** The type of the tag element. A tag can be of semantic or categoric type. */
  type?: "semantic" | "categorical";
  /** Background color to be applied to the tag */
  color?: HvColorAny;
  /** Icon used to customize the delete icon in the Chip element */
  deleteIcon?: React.ReactElement;
  /**
   * The callback fired when the delete icon is pressed.
   * This function has to be provided to the component, in order to render the delete icon
   * */
  onDelete?: (event: React.MouseEvent<HTMLElement>) => void;
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
  /** @ignore */
  ref?: MuiChipProps["ref"];
  /** @ignore */
  component?: MuiChipProps["component"];
  /** Determines whether or not the tag is selectable. */
  selectable?: boolean;
  /** Defines if the tag is selected. When defined the tag state becomes controlled. */
  selected?: boolean;
  /** When uncontrolled, defines the initial selected state. */
  defaultSelected?: boolean;
}

const getCategoricalColor = (customColor?: HvColorAny, colors?: any) => {
  return (customColor && colors?.[customColor]) || customColor || colors?.cat1;
};

/**
 * A Tag is one word that describes a specific aspect of an asset. A single asset can have
 * multiple tags.
 * Use tags to highlight an item's status for quick recognition and navigation
 * Use color to indicate meanings that users can learn and recognize across products
 *
 * It leverages the Chip component from Material UI
 */
export const HvTag = forwardRef<HTMLDivElement, HvTagProps>((props, ref) => {
  const {
    classes: classesProp,
    className,
    style,
    label,
    disabled,
    type = "semantic",
    selectable,
    selected,
    defaultSelected = false,
    color,
    deleteIcon,
    onDelete,
    onClick,
    // TODO: remove from API
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    deleteButtonArialLabel = "Delete tag",
    deleteButtonProps = {},
    ...others
  } = useDefaultProps("HvTag", props);
  const { colors } = useTheme();
  const { classes, cx, css } = useClasses(classesProp);

  const [isSelected, setIsSelected] = useControlled(
    selected,
    Boolean(defaultSelected),
  );

  const defaultDeleteIcon = (
    <CloseXS
      role="none"
      className={cx(classes.button, classes.tagButton)}
      iconSize="XS"
      {...deleteButtonProps}
    />
  );

  const categoricalBackgroundColor =
    type === "categorical" ? getCategoricalColor(color, colors) : undefined;

  const backgroundColor =
    (type === "semantic" && getColor(color, "neutral_20")) ||
    (type === "categorical" && `${categoricalBackgroundColor}30`) ||
    undefined;

  const isClickable = !!(onClick || onDelete) && !disabled;

  const clickableClass = css({
    "&:hover": {
      boxShadow: `0 0 0 1pt ${categoricalBackgroundColor}`,
    },
  });

  const colorOverride = (disabled && ["atmo3", "secondary_60"]) || undefined;

  const avatarIcon = isSelected ? (
    <CheckboxCheck color={colorOverride} iconSize="XS" />
  ) : (
    <Checkbox color={colorOverride} iconSize="XS" />
  );

  return (
    <Chip
      ref={ref}
      label={label}
      disabled={disabled}
      className={cx({ [clickableClass]: isClickable }, className)}
      style={{
        ...(disabled ? null : { backgroundColor }),
        ...style,
      }}
      classes={{
        root: cx(classes.root, classes.chipRoot, {
          [classes.disabled]: disabled,
          [classes.clickable]: isClickable,
          [classes.categorical]: type === "categorical",
          [classes.categoricalFocus]: type === "categorical" && !disabled,
          [classes.categoricalDisabled]: type === "categorical" && disabled,
        }),
        label: classes.label,
        deleteIcon: cx(classes.deleteIcon, {
          [classes.disabledDeleteIcon]: disabled,
        }),
      }}
      deleteIcon={deleteIcon || defaultDeleteIcon}
      onDelete={disabled ? undefined : onDelete}
      onClick={(event) => {
        if (disabled) return;
        if (selectable) setIsSelected(!isSelected);
        onClick?.(event, !isSelected);
      }}
      aria-pressed={isSelected}
      {...(selectable &&
        type === "semantic" && {
          avatar: avatarIcon,
        })}
      {...others}
    />
  );
});
