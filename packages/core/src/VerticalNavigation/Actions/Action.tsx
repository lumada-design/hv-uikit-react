import { useCallback, useContext } from "react";

import { useDefaultProps } from "../../hooks/useDefaultProps";
import { HvTypography, HvTypographyProps } from "../../Typography";
import { ExtractNames } from "../../utils/classes";
import { isKey } from "../../utils/keyboardUtils";
import { setId } from "../../utils/setId";
import { VerticalNavigationContext } from "../VerticalNavigationContext";
import { staticClasses, useClasses } from "./Action.styles";

export { staticClasses as actionClasses };

export type HvVerticalNavigationActionClasses = ExtractNames<typeof useClasses>;

export interface HvVerticalNavigationActionProps
  extends Omit<HvTypographyProps, "classes" | "onClick"> {
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvVerticalNavigationActionClasses;
  /** Visual label. */
  label?: string;
  /** Icon. */
  icon?: React.ReactNode;
  /** Callback called when clicked. */
  onClick?: (
    event:
      | React.KeyboardEvent<HTMLDivElement>
      | React.MouseEvent<HTMLDivElement>,
  ) => void;
}

export const HvVerticalNavigationAction = (
  props: HvVerticalNavigationActionProps,
) => {
  const {
    className,
    classes: classesProp,
    id,
    label = "",
    icon,
    onClick,
    ...others
  } = useDefaultProps("HvVerticalNavigationAction", props);

  const { isOpen } = useContext(VerticalNavigationContext);

  const { classes, cx } = useClasses(classesProp);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (!onClick || (!isKey(event, "Enter") && !isKey(event, "Space"))) {
        return;
      }
      onClick(event);
    },
    [onClick],
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
        className,
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
