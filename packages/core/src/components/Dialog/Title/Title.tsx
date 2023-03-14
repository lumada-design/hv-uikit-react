import { DialogTitleProps as MuiDialogTitleProps } from "@mui/material/DialogTitle";
import clsx from "clsx";
import { HvTypography } from "components";
import { HvBaseProps } from "../../../types";
import { iconVariant } from "utils";
import {
  StyledTitle,
  StyledMessageContainer,
  StyledTextWithIcon,
} from "./Title.styles";
import dialogTitleClasses, { HvDialogTitleClasses } from "./titleClasses";
import { useTheme } from "hooks";

export type HvDialogTitleVariant =
  | "success"
  | "warning"
  | "error"
  | "info"
  | "default";

export type HvTitleProps = Omit<MuiDialogTitleProps, "variant" | "classes"> &
  HvBaseProps & {
    /** Variant of the Dialog. */
    variant?: HvDialogTitleVariant;
    /** Controls if the associated icon to the variant should be shown. */
    showIcon?: boolean;
    /** Custom icon to replace the variant default. */
    customIcon?: React.ReactNode;
    classes?: HvDialogTitleClasses;
  };

export const HvTitle = ({
  classes,
  className,
  children,
  variant = "default",
  showIcon = true,
  customIcon = null,
  ...others
}: HvTitleProps) => {
  const { activeTheme } = useTheme();

  const isString = typeof children === "string";

  const { fullscreen } = others as any;
  delete (others as any).fullscreen;

  const icon = customIcon || (showIcon && iconVariant(variant, "", ""));

  return (
    <StyledTitle
      className={clsx(
        dialogTitleClasses.root,
        classes?.root,
        className,
        fullscreen && clsx(dialogTitleClasses.fullscreen, classes?.fullscreen)
      )}
      $fullscreen={fullscreen}
      {...others}
    >
      <StyledMessageContainer
        className={clsx(
          dialogTitleClasses.messageContainer,
          classes?.messageContainer
        )}
      >
        {icon}
        <StyledTextWithIcon
          className={
            !!icon
              ? clsx(dialogTitleClasses.textWithIcon, classes?.textWithIcon)
              : undefined
          }
          $hasIcon={!!icon}
        >
          {!isString && children}
          {isString && (
            <HvTypography variant={activeTheme?.dialog.titleVariant}>
              {children}
            </HvTypography>
          )}
        </StyledTextWithIcon>
      </StyledMessageContainer>
    </StyledTitle>
  );
};
