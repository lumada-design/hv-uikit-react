import clsx from "clsx";
import { HvBaseProps } from "../../../types";
import { StyledDiv } from "./Actions.styles";
import { actionsClasses, HvActionsClasses } from ".";

export type HvActionsProps = HvBaseProps & {
  classes?: HvActionsClasses;
};

export const HvActions = ({
  classes,
  className,
  children,
  ...others
}: HvActionsProps) => {
  return (
    <StyledDiv
      className={clsx(className, actionsClasses.root, classes?.root)}
      {...others}
    >
      {children}
    </StyledDiv>
  );
};
