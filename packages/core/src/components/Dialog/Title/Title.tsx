// import clsx from "clsx";
import { DialogTitleProps as MuiDialogTitleProps } from "@mui/material/DialogTitle";
import clsx from "clsx";
import { HvTypography } from "components";
import { HvBaseProps, HvExtraProps } from "../../../types";
import { iconVariant } from "utils";
import {
  StyledTitle,
  StyledMessageContainer,
  StyledTextWithIcon,
} from "./Title.styles";

export type HvDialogTitleVariant =
  | "success"
  | "warning"
  | "error"
  | "info"
  | "default";

export type HvTitleProps = Omit<MuiDialogTitleProps, "variant"> &
  HvBaseProps & {
    /** Variant of the Dialog. */
    variant?: HvDialogTitleVariant;
    /** Controls if the associated icon to the variant should be shown. */
    showIcon?: boolean;
    /** Custom icon to replace the variant default. */
    customIcon?: React.ReactNode;
    classes?: {
      root?: string;
    };
  } & HvExtraProps;

export const HvTitle = ({
  classes,
  className,
  children,
  variant = "default",
  showIcon = true,
  customIcon = null,
  ...others
}: HvTitleProps) => {
  const isString = typeof children === "string";
  const { fullscreen } = others;

  // prevent the `fullscreen` prop from being passed to the `DialogTitle` component
  delete others.fullscreen;

  const icon = customIcon || (showIcon && iconVariant(variant, "", ""));

  return (
    <StyledTitle
      className={clsx(classes?.root, className, fullscreen ? "fullscreen" : "")}
      {...others}
    >
      <StyledMessageContainer>
        {icon}

        <StyledTextWithIcon $hasIcon={!!icon}>
          {!isString && children}
          {isString && <HvTypography variant="title4">{children}</HvTypography>}
        </StyledTextWithIcon>
      </StyledMessageContainer>
    </StyledTitle>
  );
};
