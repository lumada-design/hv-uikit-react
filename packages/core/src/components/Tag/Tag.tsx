import { useState } from "react";
import { HvColorAny, theme } from "@hitachivantara/uikit-styles";
import Chip, { ChipProps as MuiChipProps } from "@mui/material/Chip";
import { HvBaseProps } from "@core/types/generic";
import { useTheme } from "@core/hooks/useTheme";
import { useDefaultProps } from "@core/hooks/useDefaultProps";
import { HvButton, HvButtonProps } from "@core/components/Button";

import { ExtractNames } from "@core/utils/classes";
import { CloseXS } from "@hitachivantara/uikit-react-icons";
import { staticClasses, useClasses } from "./Tag.styles";
import { getOnDeleteCallback, hasDeleteAction, hasClickAction } from "./utils";

export { staticClasses as tagClasses };

export type HvTagClasses = ExtractNames<typeof useClasses>;

export interface HvTagProps
  extends Omit<MuiChipProps, "color" | "classes">,
    HvBaseProps<HTMLDivElement, "children"> {
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
  /** The role of the element with an attributed event. */
  role?: string;
  /** Aria properties to apply to delete button in tag */
  deleteButtonArialLabel?: string; // TODO: fix typo "ArialLabel" in next version
  /** Props to apply to delete button */
  deleteButtonProps?: HvButtonProps;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvTagClasses;
  /** @ignore */
  ref?: MuiChipProps["ref"];
  /** @ignore */
  component?: MuiChipProps["component"];
}

const getColor = (customColor, type, colors) => {
  const defaultSemanticColor = theme.colors.neutral_20;
  const defaultCategoricalColor = colors.cat1;

  let backgroundColor;

  if (type === "semantic") {
    backgroundColor =
      theme.colors[customColor] || customColor || defaultSemanticColor;
  }
  if (type === "categorical") {
    backgroundColor =
      colors[customColor] || customColor || defaultCategoricalColor;
  }
  return backgroundColor;
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
    role,
    deleteButtonArialLabel = "Delete tag",
    deleteButtonProps = {},
    ...others
  } = useDefaultProps("HvTag", props);
  const { colors } = useTheme();
  const { classes, cx, css } = useClasses(classesProp);

  const getDeleteIcon = () => {
    const disabledSemanticColor =
      type === "semantic" ? "secondary_60" : "base_dark";
    const { tabIndex = 0 } = deleteButtonProps;

    const closeIconStyles = css({
      ...(disabled ? { cursor: "not-allowed" } : undefined),
      height: 16,
      "& svg .color0": {
        fill: theme.colors[disabled ? disabledSemanticColor : "base_dark"],
      },
    });
    return (
      <HvButton
        classes={{
          startIcon: classes.tagButton,
          focusVisible: classes.focusVisible,
          root: classes.button,
        }}
        aria-label={deleteButtonArialLabel}
        tabIndex={tabIndex}
        variant="secondaryGhost"
        {...deleteButtonProps}
      >
        <CloseXS
          iconSize="XS"
          className={closeIconStyles}
          color={disabled ? disabledSemanticColor : "base_dark"}
        />
      </HvButton>
    );
  };

  const inlineStyle = {
    ...style,
  };

  const categoricalBackgroundColor =
    type === "categorical" ? getColor(color, type, colors) : undefined;

  if (type === "semantic") {
    inlineStyle.backgroundColor = getColor(color, type, {});
  } else if (type === "categorical") {
    inlineStyle.backgroundColor = `${categoricalBackgroundColor}30`;
  }

  const [hover, setHover] = useState(false);

  return (
    <Chip
      label={label}
      className={cx(classes.root, className)}
      onMouseEnter={() => {
        setHover(!!onClick);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
      style={{
        ...(disabled ? null : inlineStyle),
        ...(hover && !disabled
          ? { boxShadow: `0 0 0 1pt ${categoricalBackgroundColor}` }
          : null),
      }}
      classes={{
        root: cx(classes.chipRoot, {
          [classes.disabled]: disabled,
          [classes.clickable]: !!onClick,
          [classes.categorical]: type === "categorical",
          [classes.categoricalFocus]: type === "categorical" && !disabled,
          [classes.categoricalDisabled]: type === "categorical" && disabled,
        }),
        label: classes.label,
        deleteIcon: cx(classes.deleteIcon, {
          [classes.disabledDeleteIcon]: disabled,
        }),
      }}
      deleteIcon={(hasDeleteAction(onDelete) && deleteIcon) || getDeleteIcon()}
      onDelete={getOnDeleteCallback(disabled, onDelete)}
      onClick={disabled ? undefined : onClick}
      role={role || (hasClickAction(onClick) ? "button" : undefined)}
      tabIndex={hasDeleteAction(onDelete) ? undefined : 0}
      {...others}
    />
  );
};
