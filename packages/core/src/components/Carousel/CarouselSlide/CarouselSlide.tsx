import { ImgHTMLAttributes } from "react";
import { ClassNames } from "@emotion/react";

import styles, { HvCarouselSlideClasses, cc } from "./CarouselSlide.styles";

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
  classes = {},
  children,
  size: flexBasis = "100%",
  src,
  alt,
  ...props
}: HvCarouselSlideProps) => {
  return (
    <ClassNames>
      {({ css, cx }) => (
        <div
          className={cx(
            cc.slide,
            classes.slide,
            css(styles.slide),
            css({ flex: `0 0 ${flexBasis}` })
          )}
        >
          {children ?? (
            <img
              className={cx(cc.image, classes.image, css(styles.image))}
              src={src}
              alt={alt}
              {...props}
            />
          )}
        </div>
      )}
    </ClassNames>
  );
};
