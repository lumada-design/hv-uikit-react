import {
  useDefaultProps,
  type ExtractNames,
} from "@hitachivantara/uikit-react-utils";

import { HvBaseProps } from "../../types/generic";
import { staticClasses, useClasses } from "./Actions.styles";

export { staticClasses as headerActionsClasses };

export type HvHeaderActionsClasses = ExtractNames<typeof useClasses>;

export interface HvHeaderActionsProps extends HvBaseProps {
  classes?: HvHeaderActionsClasses;
}

export const HvHeaderActions = (props: HvHeaderActionsProps) => {
  const {
    classes: classesProp,
    className,
    children,
    ...others
  } = useDefaultProps("HvHeaderActions", props);

  const { classes, cx } = useClasses(classesProp);

  return (
    <div className={cx(classes.root, className)} {...others}>
      {children}
    </div>
  );
};
