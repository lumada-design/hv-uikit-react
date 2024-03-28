import MuiDialogTitle, {
  DialogTitleProps as MuiDialogTitleProps,
} from "@mui/material/DialogTitle";

import { useDefaultProps } from "../../hooks/useDefaultProps";
import { ExtractNames } from "../../utils/classes";
import { iconVariant } from "../../utils/iconVariant";
import { useDialogContext } from "../context";
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
        className,
      )}
      {...others}
    >
      <div className={classes.messageContainer}>
        {icon}
        <div
          className={cx({
            [classes.textWithIcon]: !!icon,
            [classes.titleText]: isString,
          })}
        >
          {children}
        </div>
      </div>
    </MuiDialogTitle>
  );
};
