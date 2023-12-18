import { MouseEventHandler, useCallback, useContext } from "react";

import { isKey } from "@core/utils/keyboardUtils";
import { setId } from "@core/utils/setId";

import { ExtractNames } from "@core/utils/classes";
import { HvTypography } from "@core/Typography";

import { VerticalNavigationContext } from "../VerticalNavigationContext";
import { staticClasses, useClasses } from "./Action.styles";

export { staticClasses as actionClasses };

export type HvVerticalNavigationActionClasses = ExtractNames<typeof useClasses>;

export interface HvVerticalNavigationActionProps {
  /**
   * Class names to be applied.
   */
  className?: string;
  /**
   * A Jss Object used to override or extend the styles applied to the component.
   */
  classes?: HvVerticalNavigationActionClasses;
  /**
   * Id to be applied to the action.
   */
  id?: string;
  /**
   * Visual label.
   */
  label?: string;
  /**
   * Icon.
   */
  icon?: React.ReactNode;
  /**
   * Callback called when clicked.
   */
  onClick?: MouseEventHandler<HTMLElement>;
}

export const HvVerticalNavigationAction = ({
  className,
  classes: classesProp,
  id,
  label = "",
  icon,
  onClick,
  ...others
}: HvVerticalNavigationActionProps) => {
  const { isOpen } = useContext(VerticalNavigationContext);

  const { classes, cx } = useClasses(classesProp);

  const handleKeyDown = useCallback(
    (event) => {
      if (
        onClick == null ||
        (!isKey(event, "Enter") && !isKey(event, "Space"))
      ) {
        return;
      }

      onClick(event);
    },
    [onClick]
  );

  return (
    <HvTypography
      id={setId(id, "button")}
      component="div"
      role="button"
      className={cx(
        classes.action,
        {
          [classes.noIcon]: !icon,
          [classes.minimized]: !isOpen,
        },
        className
      )}
      tabIndex={0}
      {...(!isOpen && { "aria-label": label })}
      onKeyDown={handleKeyDown}
      onClick={onClick}
      {...others}
    >
      {icon}
      {isOpen && label}
    </HvTypography>
  );
};
