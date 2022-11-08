import { BaseProps } from "types/base";
import { Div } from "./HeaderActions.styles";

export interface HeaderActionsProps extends BaseProps {}

export const HeaderActions = (props: HeaderActionsProps) => {
  const { children, className, ...others } = props;

  return (
    <Div className={className} {...others}>
      {children}
    </Div>
  );
};

HeaderActions.displayName = "HeaderActions";
