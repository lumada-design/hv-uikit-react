import clsx from "clsx";
import { HvBaseProps } from "../../../types";
import { StyledContent } from "./Content.styles";
import { CardContentProps as MuiCardContentProps } from "@mui/material/CardContent";
import cardContentClasses, { HvCardContentClasses } from "./contentClasses";

export type HvContentProps = MuiCardContentProps &
  HvBaseProps & {
    /** Id to be applied to the root node. */
    id?: string;
    /** The function that will be executed when this section is clicked. */
    onClick?: (event: React.SyntheticEvent) => void;
    /** A Jss Object used to override or extend the styles applied to the component. */
    classes?: HvCardContentClasses;
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
      className={clsx(classes?.content, cardContentClasses.content, className)}
      onClick={onClick}
      {...others}
    >
      {children}
    </StyledContent>
  );
};
