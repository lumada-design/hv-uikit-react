import { forwardRef } from "react";

import { ExtractNames } from "../utils/classes";
import { useDefaultProps } from "../hooks/useDefaultProps";
import { useUniqueId } from "../hooks/useUniqueId";
import { staticClasses, useClasses } from "./TableSection.styles";
import { HvSection, HvSectionProps } from "../Section";

export { staticClasses as tableSectionClasses };

export type HvTableSectionClasses = ExtractNames<typeof useClasses>;

export interface HvTableSectionProps extends HvSectionProps {}

/**
 * The `TableSection` component is a wrapper for the `Section` component that applies
 * specific stylings for tables that follow the latest DS specifications.
 */
export const HvTableSection = forwardRef<HTMLDivElement, HvTableSectionProps>(
  (props, ref) => {
    const {
      id,
      classes: classesProp,
      children,
      ...others
    } = useDefaultProps("HvTableSection", props);

    const { classes } = useClasses(classesProp);
    const elementId = useUniqueId(id, "hvTableSection");

    return (
      <HvSection id={elementId} ref={ref} classes={classes} {...others}>
        {children}
      </HvSection>
    );
  }
);
