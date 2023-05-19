import { clsx } from "clsx";
import { useContext } from "react";
import { VerticalNavigationContext } from "..";
import { StyledRoot } from "./Actions.styles";
import actionsClasses, {
  HvVerticalNavigationActionsClasses,
} from "./actionsClasses";

export interface HvVerticalNavigationActionsProps {
  /**
   * Class names to be applied.
   */
  className?: string;
  /**
   * A Jss Object used to override or extend the styles applied to the component.
   */
  classes?: HvVerticalNavigationActionsClasses;
  /**
   * Id to be applied to the actions container.
   */
  id?: string;
  /**
   * Node to be rendered
   */
  children?: React.ReactNode;
}

export const HvVerticalNavigationActions = ({
  className,
  classes,
  id,
  children,
  ...others
}: HvVerticalNavigationActionsProps) => {
  const { isOpen, collapsedMode } = useContext(VerticalNavigationContext);

  return (
    <StyledRoot
      id={id}
      className={clsx(
        className,
        actionsClasses.root,
        classes?.root,
        !isOpen &&
          collapsedMode === "simple" &&
          clsx(actionsClasses.hide, classes?.hide)
      )}
      {...others}
    >
      {children}
    </StyledRoot>
  );
};
