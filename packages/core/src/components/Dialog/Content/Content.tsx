import { DialogContentProps as MuiDialogContentProps } from "@mui/material/DialogContent";
import clsx from "clsx";
import { HvBaseProps } from "../../../types";
import { StyledContent, StyledTypography } from "./Content.styles";
import dialogContentClasses, { HvDialogContentClasses } from "./contentClasses";

export type HvContentProps = MuiDialogContentProps &
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
      as={StyledContent}
      className={clsx(className, dialogContentClasses.root, classes?.root)}
      $indentContent={indentContent}
    >
      {children}
    </StyledTypography>
  );
};
