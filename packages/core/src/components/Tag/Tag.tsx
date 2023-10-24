import { HTMLAttributes } from "react";
import { HvColorAny, getColor } from "@hitachivantara/uikit-styles";
import Chip, { ChipProps as MuiChipProps } from "@mui/material/Chip";

import { CloseXS } from "@hitachivantara/uikit-react-icons";

import { useTheme } from "@core/hooks/useTheme";
import { useDefaultProps } from "@core/hooks/useDefaultProps";
import { ExtractNames } from "@core/utils/classes";

import { staticClasses, useClasses } from "./Tag.styles";

export { staticClasses as tagClasses };

export type HvTagClasses = ExtractNames<typeof useClasses>;

export interface HvTagProps extends Omit<MuiChipProps, "color" | "classes"> {
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
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /** Aria properties to apply to delete button in tag
   * @deprecated no longer used
   */
  deleteButtonArialLabel?: string;
  /** Props to apply to delete icon */
  deleteButtonProps?: HTMLAttributes<HTMLDivElement>;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvTagClasses;
  /** @ignore */
  ref?: MuiChipProps["ref"];
  /** @ignore */
  component?: MuiChipProps["component"];
}

const getCategoricalColor = (customColor, colors) => {
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
export const HvTag = (props: HvTagProps) => {
  const {
    classes: classesProp,
    className,
    style,
    label,
    disabled,
    type = "semantic",
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

  const defaultDeleteIcon = (
    <CloseXS
      role="none"
      className={cx(classes.button, classes.tagButton)}
      iconSize="XS"
      color="base_dark"
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

  return (
    <Chip
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
      onClick={disabled ? undefined : onClick}
      {...others}
    />
  );
};
