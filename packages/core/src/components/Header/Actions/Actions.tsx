import { HvBaseProps } from "../../../types";
import { StyledDiv } from "./Actions.styles";

export type HvActionsProps = HvBaseProps;

export const HvActions = (props: HvActionsProps) => {
  const { children, className, ...others } = props;

  return (
    <StyledDiv className={className} {...others}>
      {children}
    </StyledDiv>
  );
};
