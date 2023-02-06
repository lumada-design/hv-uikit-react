import clsx from "clsx";
import { HvBaseProps } from "../../../types";
import { StyledDiv } from "./Actions.styles";
import headerActionsClasses, { HvHeaderActionsClasses } from "./actionsClasses";

export type HvActionsProps = HvBaseProps & {
  classes?: HvHeaderActionsClasses;
};

export const HvActions = ({
  classes,
  className,
  children,
  ...others
}: HvActionsProps) => {
  return (
    <StyledDiv
      className={clsx(className, headerActionsClasses.root, classes?.root)}
      {...others}
    >
      {children}
    </StyledDiv>
  );
};
