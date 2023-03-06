import MuiDialogContent, {
  DialogContentProps as MuiDialogContentProps,
} from "@mui/material/DialogContent";
import clsx from "clsx";
import { HvBaseProps } from "../../../types";
import { StyledTypography } from "./Content.styles";
import dialogContentClasses, { HvDialogContentClasses } from "./contentClasses";

export type HvContentProps = Omit<MuiDialogContentProps, "classes"> &
  HvBaseProps & {
    /** Content should be indented in relationship to the Dialog title. */
    indentContent?: boolean;
    classes?: HvDialogContentClasses;
  };

export const HvContent = ({
  classes,
  className,
  children,
  indentContent = false,
}: HvContentProps) => {
  return (
    <StyledTypography
      component={MuiDialogContent}
      className={clsx(
        className,
        dialogContentClasses.root,
        classes?.root,
        !!indentContent &&
          clsx(dialogContentClasses.textContent, classes?.textContent)
      )}
      $indentContent={indentContent}
    >
      {children}
    </StyledTypography>
  );
};
