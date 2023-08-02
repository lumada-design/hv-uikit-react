import { clsx } from "clsx";
import { useDefaultProps } from "@core/hooks/useDefaultProps";

import { HvBaseProps } from "@core/types/generic";

import { StyledDiv } from "./Actions.styles";
import headerActionsClasses, { HvHeaderActionsClasses } from "./actionsClasses";

export interface HvHeaderActionsProps extends HvBaseProps {
  classes?: HvHeaderActionsClasses;
}

export const HvHeaderActions = (props: HvHeaderActionsProps) => {
  const { classes, className, children, ...others } = useDefaultProps(
    "HvHeaderActions",
    props
  );

  return (
    <StyledDiv
      className={clsx(className, headerActionsClasses.root, classes?.root)}
      {...others}
    >
      {children}
    </StyledDiv>
  );
};
