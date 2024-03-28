import MuiDialogContent, {
  DialogContentProps as MuiDialogContentProps,
} from "@mui/material/DialogContent";

import { useDefaultProps } from "../../hooks/useDefaultProps";
import { HvTypography } from "../../Typography";
import { ExtractNames } from "../../utils/classes";
import { staticClasses, useClasses } from "./Content.styles";

export { staticClasses as dialogContentClasses };

export type HvDialogContentClasses = ExtractNames<typeof useClasses>;

export interface HvDialogContentProps
  extends Omit<MuiDialogContentProps, "classes"> {
  /** Content should be indented in relationship to the Dialog title. */
  indentContent?: boolean;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvDialogContentClasses;
}

export const HvDialogContent = (props: HvDialogContentProps) => {
  const {
    classes: classesProp,
    className,
    children,
    indentContent = false,
    ...others
  } = useDefaultProps("HvDialogContent", props);

  const { classes, cx } = useClasses(classesProp);

  return (
    <HvTypography
      component={MuiDialogContent}
      className={cx(
        classes.root,
        { [classes.textContent]: !!indentContent },
        className,
      )}
      {...others}
    >
      {children}
    </HvTypography>
  );
};
