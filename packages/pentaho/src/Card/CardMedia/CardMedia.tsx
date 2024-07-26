import { forwardRef } from "react";
import {
  ExtractNames,
  HvBaseProps,
  useDefaultProps,
} from "@hitachivantara/uikit-react-core";

import { staticClasses, useClasses } from "./CardMedia.styles";

export { staticClasses as cardMediaClasses };

export type HvCardMediaClasses = ExtractNames<typeof useClasses>;

export interface HvCardMediaProps extends HvBaseProps<HTMLImageElement> {
  /** The source for the image to use in the card. */
  src: string;
  /** The height of the image container. */
  height?: number;
  /** A text alternative to the image. */
  alt?: string;
  /** A Jss Object used to override or extend the styles applied. */
  classes?: HvCardMediaClasses;
}

/**
 * A subcomponent to be used within the `HvCard` component. This component is used to display an image within the card.
 */
export const HvCardMedia = forwardRef<HTMLImageElement, HvCardMediaProps>(
  (props, ref) => {
    const {
      src,
      alt = "",
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
          height={height}
          className={classes.image}
          src={src}
          alt={alt}
          {...others}
        />
      </div>
    );
  },
);
