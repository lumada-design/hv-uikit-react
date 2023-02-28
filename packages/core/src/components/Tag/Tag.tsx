import clsx from "clsx";
import { CSSProperties, useState, useContext } from "react";
import { theme } from "@hitachivantara/uikit-styles";
import { ChipProps as MuiChipProps } from "@mui/material/Chip";
import { HvBaseProps } from "../../types";
import { StyledChip, StyledButton, StyledCloseXS } from "./Tag.styles";
import { getOnDeleteCallback, hasDeleteAction, hasClickAction } from "./utils";
import { HvSemanticColorKeys, HvCategoricalColorKeys } from "types/tokens";
import { HvThemeContext } from "../../providers";
import { HvButtonProps } from "../Button";
import tagClasses, { HvTagClasses } from "./tagClasses";

export type HvTagProps = Omit<MuiChipProps, "color"> &
  HvBaseProps<HTMLDivElement, { children }> & {
    /** Inline styles to be applied to the root element. */
    style?: CSSProperties;
    /** The label of the tag element. */
    label?: React.ReactNode;
    /** Indicates that the form element is disabled. */
    disabled?: boolean;
    /** The type of the tag element. A tag can be of semantic or categoric type. */
    type?: "semantic" | "categorical";
    /** Background color to be applied to the tag */
    color?: HvSemanticColorKeys | HvCategoricalColorKeys | string;
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
    deleteButtonArialLabel?: string;
    /** Props to apply to delete button */
    deleteButtonProps?: HvButtonProps;
    /** A Jss Object used to override or extend the styles applied to the component. */
    classes?: HvTagClasses;
  };

const getColor = (customColor, type, colors) => {
  const defaultSemanticColor = theme.colors.sema7;
  const defaultCategoricalColor = colors.cviz1;

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
export const HvTag = ({
  classes,
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
}: HvTagProps) => {
  const { activeTheme, selectedMode } = useContext(HvThemeContext);

  const getDeleteIcon = () => {
    const disabledSemanticColor = type === "semantic" ? "atmo5" : "base2";
    // @ts-ignore
    const { tabIndex = 0 } = deleteButtonProps;

    return (
      <StyledButton
        classes={{
          startIcon: clsx(tagClasses.tagButton, classes?.tagButton),
          focusVisible: clsx(tagClasses.focusVisible, classes?.focusVisible),
          primary: clsx(tagClasses.primaryButton, classes?.primaryButton),
        }}
        aria-label={deleteButtonArialLabel}
        tabIndex={tabIndex}
        variant="secondaryGhost"
        {...deleteButtonProps}
      >
        <StyledCloseXS
          iconSize="XS"
          style={{
            ...(disabled ? { cursor: "not-allowed" } : undefined),
            height: 16,
          }}
          color={disabled ? disabledSemanticColor : "base2"}
          $color={disabled ? disabledSemanticColor : "base2"}
        />
      </StyledButton>
    );
  };

  const inlineStyle = {
    ...style,
  };

  let categoricalBackgroundColor;

  if (type === "semantic") {
    inlineStyle.backgroundColor = getColor(color, type, {});
  } else if (type === "categorical") {
    categoricalBackgroundColor = getColor(
      color,
      type,
      activeTheme?.colors?.modes[selectedMode]
    );

    inlineStyle.backgroundColor = `${categoricalBackgroundColor}30`;
  }

  const [hover, setHover] = useState(false);

  return (
    <StyledChip
      label={label}
      className={clsx(classes?.root, className, tagClasses.root)}
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
        root: clsx(
          tagClasses.chipRoot,
          classes?.chipRoot,
          type === "categorical" &&
            clsx(tagClasses.categorical, classes?.categorical),
          disabled && clsx(tagClasses.disabled, classes?.disabled),
          !!onClick && clsx(tagClasses.clickable, classes?.clickable),
          type === "categorical" &&
            !disabled &&
            clsx(tagClasses.categoricalFocus, classes?.categoricalFocus),
          type === "categorical" &&
            disabled &&
            clsx(tagClasses.categoricalDisabled, classes?.categoricalDisabled)
        ),
        label: clsx(tagClasses.label, classes?.label),
        deleteIcon: clsx(
          classes?.deleteIcon,
          tagClasses.deleteIcon,
          disabled &&
            clsx(tagClasses.disabledDeleteIcon, classes?.disabledDeleteIcon)
        ),
      }}
      deleteIcon={(hasDeleteAction(onDelete) && deleteIcon) || getDeleteIcon()}
      onDelete={getOnDeleteCallback(disabled, onDelete)}
      onClick={disabled ? undefined : onClick}
      role={role || (hasClickAction(onClick) ? "button" : undefined)}
      tabIndex={hasDeleteAction(onDelete) ? undefined : 0}
      $type={type}
      $disabled={disabled || false}
      $categoricalFocus={type === "categorical" && !disabled}
      $categoricalDisabled={(type === "categorical" && disabled) || false}
      $base1Color={
        activeTheme?.colors?.modes[selectedMode].base1 || theme.colors.base1
      }
      {...others}
    />
  );
};
