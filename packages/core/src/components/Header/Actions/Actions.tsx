import { BaseProps } from "types";
import { StyledDiv } from "./Actions.styles";

export interface ActionsProps extends BaseProps {}

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
