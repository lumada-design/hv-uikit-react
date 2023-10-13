import MuiDialogTitle, {
  DialogTitleProps as MuiDialogTitleProps,
} from "@mui/material/DialogTitle";
import { useDefaultProps } from "@core/hooks/useDefaultProps";

import { HvTypography } from "@core/components/Typography";
import { ExtractNames } from "@core/utils/classes";
import { iconVariant } from "@core/utils/iconVariant";

import { staticClasses, useClasses } from "./Title.styles";
import { useDialogContext } from "../context";

export { staticClasses as dialogTitleClasses };

export type HvDialogTitleClasses = ExtractNames<typeof useClasses>;

export type HvDialogTitleVariant =
  | "success"
  | "warning"
  | "error"
  | "info"
  | "default";

export interface HvDialogTitleProps
  extends Omit<MuiDialogTitleProps, "variant" | "classes"> {
  /** Variant of the dialog title. */
  variant?: HvDialogTitleVariant;
  /** Controls if the associated icon to the variant should be shown. */
  showIcon?: boolean;
  /** Custom icon to replace the variant default. */
  customIcon?: React.ReactNode;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvDialogTitleClasses;
}

export const HvDialogTitle = (props: HvDialogTitleProps) => {
  const {
    classes: classesProp,
    className,
    children,
    variant = "default",
    showIcon = true,
    customIcon = null,
    ...others
  } = useDefaultProps("HvDialogTitle", props);

  const { classes, css, cx } = useClasses(classesProp);
  const { fullscreen } = useDialogContext();

  const isString = typeof children === "string";

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
          {!isString ? (
            children
          ) : (
            <HvTypography variant="title4" className={classes.titleText}>
              {children}
            </HvTypography>
          )}
        </div>
      </div>
    </MuiDialogTitle>
  );
};
