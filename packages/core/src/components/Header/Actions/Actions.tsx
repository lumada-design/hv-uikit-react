import { HvBaseProps } from "types";
import { StyledDiv } from "./Actions.styles";

export type ActionsProps = HvBaseProps;

export const Actions = (props: ActionsProps) => {
  const { children, className, ...others } = props;

  return (
    <StyledDiv className={className} {...others}>
      {children}
    </StyledDiv>
  );
};

if (process.env.NODE_ENV !== "production") {
  Actions.displayName = "Actions";
}
