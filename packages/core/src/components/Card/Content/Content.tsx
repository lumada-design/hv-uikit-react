import clsx from "clsx";
import { HvBaseProps } from "types";
import { StyledContent } from "./Content.styles";
import { CardContentProps as MuiCardContentProps } from "@mui/material/CardContent";

export type HvContentProps = MuiCardContentProps &
  HvBaseProps & {
    /** Id to be applied to the root node. */
    id?: string;
    /** The function that will be executed when this section is clicked. */
    onClick?: any;
    /** A Jss Object used to override or extend the styles applied to the empty state component. */
    classes?: {
      content?: string;
    };
  };

export const HvContent = ({
  id,
  classes,
  className,
  children,
  onClick,
  ...others
}: HvContentProps) => {
  return (
    <StyledContent
      id={id}
      className={clsx(classes?.content, className)}
      onClick={onClick}
      {...others}
    >
      {children}
    </StyledContent>
  );
};
