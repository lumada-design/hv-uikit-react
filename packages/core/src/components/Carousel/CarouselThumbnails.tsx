import { CSSProperties, MouseEvent, forwardRef } from "react";

import { HvBaseProps } from "@core/types/generic";
import { HvPaginationProps } from "@core/components/Pagination";
import { HvStack } from "@core/components/Stack";
import { HvButton, HvButtonProps } from "@core/components/Button";
import { ExtractNames } from "@core/utils/classes";

import { useClasses } from "./Carousel.styles";

interface HvCarouselThumbnailsProps
  extends HvBaseProps<HTMLDivElement, "children">,
    Pick<HvPaginationProps, "page" | "pages" | "canPrevious" | "canNext"> {
  width?: CSSProperties["width"];
  classes?: ExtractNames<typeof useClasses>;
  onThumbnailClick?: (
    event: MouseEvent<HTMLButtonElement>,
    index: number
  ) => void;
  thumbnailProps?: Partial<HvButtonProps>;
  showDots?: boolean;
  renderThumbnail?: (index: number) => React.ReactNode;
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
