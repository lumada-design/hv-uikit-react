import { CSSProperties, MouseEvent, forwardRef } from "react";
import { HvBaseProps } from "@core/types";
import { HvPaginationProps, HvStack } from "..";
import { HvCarouselClasses, HvCarouselProps } from ".";
import { useClasses } from "./Carousel.styles";
import { HvCarouselThumbnail } from "./CarouselThumbnail";

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
    ...others
  } = props;
  const { classes, cx } = useClasses(classesProp);

  const selectedIndex = page || 0;
  const numSlides = pages;

  return (
    <div ref={ref} className={cx(classes.panel, className)} {...others}>
      <HvStack direction="row" spacing="xs">
        {Array.from(Array(numSlides)).map((doc, i) => (
          <HvCarouselThumbnail
            key={`thumbnail-${i}`}
            style={{ width }}
            selected={i === selectedIndex}
            onClick={(event) => onThumbnailClick?.(event, i)}
          >
            {renderThumbnail?.(i)}
          </HvCarouselThumbnail>
        ))}
      </HvStack>
    </div>
  );
});
