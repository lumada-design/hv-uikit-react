import { ExtractNames } from "@core/utils/classes";

import { useContext } from "react";

import { VerticalNavigationContext } from "../VerticalNavigationContext";
import { staticClasses, useClasses } from "./Actions.styles";

export { staticClasses as actionsClasses };

export type HvVerticalNavigationActionsClasses = ExtractNames<
  typeof useClasses
>;

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
  classes: classesProp,
  id,
  children,
  ...others
}: HvVerticalNavigationActionsProps) => {
  const { classes, cx } = useClasses(classesProp);

  const { isOpen, useIcons } = useContext(VerticalNavigationContext);

  return (
    <div
      id={id}
      className={cx(
        classes.root,
        {
          [classes.hide]: !isOpen && !useIcons,
        },
        className
      )}
      {...others}
    >
      {children}
    </div>
  );
};
