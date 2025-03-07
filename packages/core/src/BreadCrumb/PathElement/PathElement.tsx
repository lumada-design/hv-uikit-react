import { DropRightXS } from "@hitachivantara/uikit-react-icons";
import { type ExtractNames } from "@hitachivantara/uikit-react-utils";

import { staticClasses, useClasses } from "./PathElement.styles";

export { staticClasses as pathElementClasses };

export type HvPathElementClasses = ExtractNames<typeof useClasses>;

export interface HvPathElementProps {
  last?: boolean;
  classes?: HvPathElementClasses;
  children: React.ReactElement;
}

export const HvPathElement = ({
  classes: classesProp,
  last = false,
  children,
}: HvPathElementProps) => {
  const { classes } = useClasses(classesProp);

  return (
    <li className={classes.centerContainer}>
      {children}
      {!last && (
        <DropRightXS
          className={classes.separatorContainer}
          color="textDisabled"
        />
      )}
    </li>
  );
};
