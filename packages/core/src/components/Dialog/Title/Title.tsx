import { DialogTitleProps as MuiDialogTitleProps } from "@mui/material/DialogTitle";
import { clsx } from "clsx";
import { HvTypography } from "@core/components";
import { HvBaseProps } from "@core/types";
import { iconVariant } from "@core/utils";
import {
  StyledTitle,
  StyledMessageContainer,
  StyledTextWithIcon,
} from "./Title.styles";
import dialogTitleClasses, { HvDialogTitleClasses } from "./titleClasses";
import { useTheme } from "@core/hooks";

export type HvDialogTitleVariant =
  | "success"
  | "warning"
  | "error"
  | "info"
  | "default";

export interface HvDialogTitleProps
  extends Omit<MuiDialogTitleProps, "variant" | "classes">,
    HvBaseProps<HTMLSpanElement, "color"> {
  /** Variant of the Dialog. */
  variant?: HvDialogTitleVariant;
  /** Controls if the associated icon to the variant should be shown. */
  showIcon?: boolean;
  /** Custom icon to replace the variant default. */
  customIcon?: React.ReactNode;
  classes?: HvDialogTitleClasses;
}

export const HvDialogTitle = ({
  classes,
  className,
  children,
  variant = "default",
  showIcon = true,
  customIcon = null,
  ...others
}: HvDialogTitleProps) => {
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
