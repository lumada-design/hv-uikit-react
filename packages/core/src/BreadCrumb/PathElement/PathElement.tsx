import { type ExtractNames } from "@hitachivantara/uikit-react-utils";

import { HvIcon } from "../../icons";
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
        <HvIcon
          name="Chevron"
          size="xs"
          className={classes.separatorContainer}
          color="secondary_60"
        />
      )}
    </li>
  );
};
