import { CSSProperties, MouseEvent, forwardRef } from "react";
import { HvBaseProps } from "@core/types";
import { HvButton, HvButtonProps, HvPaginationProps, HvStack } from "..";
import { HvCarouselClasses, HvCarouselProps } from ".";
import { useClasses } from "./Carousel.styles";

interface HvCarouselThumbnailsProps
  extends HvBaseProps<HTMLDivElement, "children">,
    Pick<HvPaginationProps, "page" | "pages" | "canPrevious" | "canNext">,
    Pick<HvCarouselProps, "showDots" | "renderThumbnail"> {
  width?: CSSProperties["width"];
  classes?: HvCarouselClasses;
  onThumbnailClick?: (
    event: MouseEvent<HTMLButtonElement>,
    index: number
  ) => void;
  thumbnailProps?: Partial<HvButtonProps>;
}

export const HvCarouselThumbnails = forwardRef<
  HTMLDivElement,
  HvCarouselThumbnailsProps
>((props, ref) => {
  const {
    classes: classesProp,
    className,
    page,
    pages,
    width,
    renderThumbnail,
    onThumbnailClick,
    thumbnailProps,
    ...others
  } = props;
  const { classes, cx } = useClasses(classesProp);

  const selectedIndex = page || 0;
  const numSlides = pages;

  return (
    <div ref={ref} className={cx(classes.panel, className)} {...others}>
      <HvStack direction="row" spacing="xs">
        {Array.from(Array(numSlides)).map((doc, i) => (
          <HvButton
            icon
            key={`thumbnail-${i}`}
            style={{ width }}
            variant="secondaryGhost"
            className={cx(classes.thumbnail, {
              [classes.thumbnailSelected]: i === selectedIndex,
            })}
            onClick={(event) => onThumbnailClick?.(event, i)}
            {...thumbnailProps}
          >
            {renderThumbnail?.(i)}
          </HvButton>
        ))}
      </HvStack>
    </div>
  );
});
