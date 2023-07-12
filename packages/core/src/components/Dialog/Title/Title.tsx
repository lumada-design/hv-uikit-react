import MuiDialogTitle, {
  DialogTitleProps as MuiDialogTitleProps,
} from "@mui/material/DialogTitle";

import { HvTypography } from "@core/components";
import { HvBaseProps } from "@core/types";
import { ExtractNames, iconVariant } from "@core/utils";
import { useTheme } from "@core/hooks";

import { staticClasses, useClasses } from "./Title.styles";

export { staticClasses as dialogTitleClasses };

export type HvDialogTitleClasses = ExtractNames<typeof useClasses>;

export type HvDialogTitleVariant =
  | "success"
  | "warning"
  | "error"
  | "info"
  | "default";

export interface HvDialogTitleProps
  extends Omit<MuiDialogTitleProps, "variant" | "classes">,
    HvBaseProps<HTMLSpanElement, "color"> {
  /** Variant of the dialog title. */
  variant?: HvDialogTitleVariant;
  /** Controls if the associated icon to the variant should be shown. */
  showIcon?: boolean;
  /** Custom icon to replace the variant default. */
  customIcon?: React.ReactNode;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvDialogTitleClasses;
}

export const HvDialogTitle = ({
  classes: classesProp,
  className,
  children,
  variant = "default",
  showIcon = true,
  customIcon = null,
  ...others
}: HvDialogTitleProps) => {
  const { classes, css, cx } = useClasses(classesProp);

  const { activeTheme } = useTheme();

  const isString = typeof children === "string";

  const { fullscreen } = others as any;
  delete (others as any).fullscreen;

  const icon = customIcon || (showIcon && iconVariant(variant));

  return (
    <MuiDialogTitle
      className={cx(
        !fullscreen && css({ flex: 1 }),
        classes.root,
        {
          [classes.fullscreen]: fullscreen,
        },
        className
      )}
      {...others}
    >
      <div className={classes.messageContainer}>
        {icon}
        <div className={cx({ [classes.textWithIcon]: !!icon })}>
          {!isString && children}
          {isString && (
            <HvTypography variant={activeTheme?.dialog.titleVariant}>
              {children}
            </HvTypography>
          )}
        </div>
      </div>
    </MuiDialogTitle>
  );
};
