import { forwardRef } from "react";
import {
  ExtractNames,
  HvBaseProps,
  useDefaultProps,
} from "@hitachivantara/uikit-react-core";

import { staticClasses, useClasses } from "./CardMedia.styles";

export { staticClasses as cardMediaClasses };

export type HvCardMediaClasses = ExtractNames<typeof useClasses>;

export interface HvCardMediaProps extends HvBaseProps {
  /** */
  src: string;
  /**  */
  height?: number;
  /** A Jss Object used to override or extend the styles applied. */
  classes?: HvCardMediaClasses;
}

/**
 *
 */
export const HvCardMedia = forwardRef<HTMLImageElement, HvCardMediaProps>(
  (props, ref) => {
    const {
      src,
      height = 160,
      className,
      classes: classesProp,
      children,
      ...others
    } = useDefaultProps("HvCardMedia", props);
    const { classes, cx } = useClasses(classesProp);

    return (
      <div className={cx(classes.root, className)}>
        <img
          ref={ref}
          alt="test"
          height={height}
          className={classes.image}
          src={src}
          {...others}
        />
      </div>
    );
  },
);
