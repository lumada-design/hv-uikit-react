import { forwardRef } from "react";
import {
  useDefaultProps,
  type ExtractNames,
} from "@hitachivantara/uikit-react-utils";

import { HvBaseProps } from "../types/generic";
import { staticClasses, useClasses } from "./Panel.styles";

export { staticClasses as panelClasses };

export type HvPanelClasses = ExtractNames<typeof useClasses>;

export interface HvPanelProps extends HvBaseProps {
  /** A Jss Object used to override or extend the styles applied. */
  classes?: HvPanelClasses;
}

/**
 * A panel is a container used in a variety of patterns (e.g. dropdown, filter group, details section).
 * It can be horizontal or vertical and its size is defined by its content and how it relates to surrounding patterns.
 * Regardless of its content, a panel look and feel should be consistent.
 */
export const HvPanel = forwardRef<HTMLDivElement, HvPanelProps>(
  (props, ref) => {
    const {
      className,
      classes: classesProp,
      children,
      ...others
    } = useDefaultProps("HvPanel", props);
    const { classes, cx } = useClasses(classesProp);

    return (
      <div ref={ref} className={cx(classes.root, className)} {...others}>
        {children}
      </div>
    );
  },
);
