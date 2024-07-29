import { forwardRef } from "react";
import {
  ExtractNames,
  HvBaseProps,
  useDefaultProps,
} from "@hitachivantara/uikit-react-core";

import { staticClasses, useClasses } from "./CardSection.styles";

export { staticClasses as cardSectionClasses };

export type HvCardSectionClasses = ExtractNames<typeof useClasses>;

export interface HvCardSectionProps extends HvBaseProps {
  /** A Jss Object used to override or extend the styles applied. */
  classes?: HvCardSectionClasses;
}

/**
 * A subcomponent to be used within the `HvCard` component. This component is used to display content on the card.
 */
export const HvCardSection = forwardRef<HTMLDivElement, HvCardSectionProps>(
  (props, ref) => {
    const {
      className,
      classes: classesProp,
      children,
    } = useDefaultProps("HvCardSection", props);
    const { classes, cx } = useClasses(classesProp);

    return (
      <div ref={ref} className={cx(classes.root, className)}>
        {children}
      </div>
    );
  },
);
