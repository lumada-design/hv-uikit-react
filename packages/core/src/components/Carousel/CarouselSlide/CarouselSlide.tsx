import { ImgHTMLAttributes } from "react";
import { ClassNames } from "@emotion/react";

import styles, { HvCarouselSlideClasses, cc } from "./CarouselSlide.styles";
import { makeClasses } from "../utils";

export interface HvCarouselSlideProps
  extends ImgHTMLAttributes<HTMLImageElement> {
  /** A Jss Object used to override or extend the styles applied. */
  classes?: Partial<HvCarouselSlideClasses>;
  /** The width of the Slide. Defaults to `100%` */
  size?: string;
  /** Content of a slide to be displayed */
  children?: React.ReactNode;
}

/**
 * A container to use as `children` of `HvCarousel`.
 * Pass `img` props directly to it, or `children` for any custom content
 */
export const HvCarouselSlide = ({
  classes: classesProp = {},
  children,
  size: flexBasis = "100%",
  src,
  alt,
  ...props
}: HvCarouselSlideProps) => {
  return (
    <ClassNames>
      {({ css, cx }) => {
        const classes = makeClasses(
          { css, cx },
          { cc, styles, classes: classesProp }
        );

        return (
          <div className={cx(css({ flex: `0 0 ${flexBasis}` }), classes.slide)}>
            {children ?? (
              <img className={classes.image} src={src} alt={alt} {...props} />
            )}
          </div>
        );
      }}
    </ClassNames>
  );
};
