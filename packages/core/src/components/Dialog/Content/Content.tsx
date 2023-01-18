import { DialogContentProps as MuiDialogContentProps } from "@mui/material/DialogContent";
import clsx from "clsx";
import { HvBaseProps } from "../../../types";
import { StyledContent, StyledTypography } from "./Content.styles";

export type HvContentProps = MuiDialogContentProps &
  HvBaseProps & {
    /** Content should be indented in relationship to the Dialog title. */
    indentContent?: boolean;
    classes?: {
      root?: string;
    };
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
      className={clsx(className, classes?.root)}
      $indentContent={indentContent}
    >
      {children}
    </StyledTypography>
  );
};
