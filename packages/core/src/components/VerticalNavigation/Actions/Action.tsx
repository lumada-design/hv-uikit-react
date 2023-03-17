import clsx from "clsx";
import { MouseEventHandler, useCallback, useContext } from "react";
import { isKeypress, keyboardCodes, setId } from "utils";
import { VerticalNavigationContext } from "../VerticalNavigation";
import { StyledAction } from "./Action.styles";
import actionClasses, { HvVerticalNavigationActionClasses } from "./actionClasses";


export const HvVerticalNavigationAction = ({
    className,
    classes,
    id,
    label = "",
    icon,
    onClick,
    ...others
    }: HvVerticalNavigationActionProps) => {

  const { isOpen } = useContext(VerticalNavigationContext)

  const handleKeyDown = useCallback(
    (event) => {
      if (
        onClick == null ||
        (!isKeypress(event, keyboardCodes.Enter) && !isKeypress(event, keyboardCodes.SpaceBar))
      ) {
        return;
      }

      onClick(event);
    },
    [onClick]
  );

  return (
    <StyledAction
      id={setId(id, "button")}
      component="div"
      role="button"
      className={clsx(className, actionClasses.action, classes?.action, !icon && clsx(actionClasses.noIcon, classes?.noIcon ), !isOpen && clsx(actionClasses.minimized, classes?.action))}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onClick={onClick}
      {...others}
    >
      {icon}
      {isOpen && label}
    </StyledAction>
  );
};

export type HvVerticalNavigationActionProps = {
  /**
   * Class names to be applied.
   */
  className?: string,
  /**
   * A Jss Object used to override or extend the styles applied to the component.
   */
  classes?: HvVerticalNavigationActionClasses,
  /**
   * Id to be applied to the action.
   */
  id?: string,
  /**
   * Visual label.
   */
  label?: string,
  /**
   * Icon.
   */
  icon?: React.ReactNode,
  /**
   * Callback called when clicked.
   */
  onClick?: MouseEventHandler<HTMLElement>,
};
