import { Div } from "./HeaderActions.styles";

export const HeaderActions = (props: HeaderActionsProps) => {
  const { children, className, ...others } = props;

  return (
    <Div className={className} {...others}>
      {children}
    </Div>
  );
};

HeaderActions.displayName = "HeaderActions";
