import clsx from "clsx";
import { HvBaseProps } from "../../../types";
import { StyledDiv } from "./Actions.styles";

export type HvActionsProps = HvBaseProps & {
  classes?: {
    root?: string;
  };
};

export const HvActions = ({
  classes,
  className,
  children,
  ...others
}: HvActionsProps) => {
  return (
    <StyledDiv className={clsx(className, classes?.root)} {...others}>
      {children}
    </StyledDiv>
  );
};
