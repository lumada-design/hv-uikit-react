import { clsx } from "clsx";
import { HvBaseProps } from "@core/types";
import { StyledDiv } from "./Actions.styles";
import headerActionsClasses, { HvHeaderActionsClasses } from "./actionsClasses";

export interface HvHeaderActionsProps extends HvBaseProps {
  classes?: HvHeaderActionsClasses;
}

export const HvHeaderActions = ({
  classes,
  className,
  children,
  ...others
}: HvHeaderActionsProps) => {
  return (
    <StyledDiv
      className={clsx(className, headerActionsClasses.root, classes?.root)}
      {...others}
    >
      {children}
    </StyledDiv>
  );
};
