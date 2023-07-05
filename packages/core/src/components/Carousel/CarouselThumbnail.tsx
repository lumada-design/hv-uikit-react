import { HvButton, HvButtonProps } from "../..";
import { useClasses } from "./Carousel.styles";

interface HvCarouselThumbnailProps extends HvButtonProps {
  selected?: boolean;
}

export const HvCarouselThumbnail = (props: HvCarouselThumbnailProps) => {
  const {
    classes: classesProp,
    className,
    selected,
    children,
    ...others
  } = props;
  const { classes, cx } = useClasses(classesProp);

  return (
    <HvButton
      icon
      variant="secondaryGhost"
      className={cx(classes.thumbnail, {
        [classes.thumbnailSelected]: selected,
      })}
      {...others}
    >
      {children}
    </HvButton>
  );
};
