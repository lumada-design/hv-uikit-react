import { MouseEventHandler, ReactNode } from "react";

import { Backwards, Forwards } from "@hitachivantara/uikit-react-icons";

import { useDefaultProps } from "../hooks/useDefaultProps";

import { HvBaseProps } from "../types/generic";
import { HvButton } from "../Button";
import { HvPaginationProps } from "../Pagination";
import { ExtractNames } from "../utils/classes";

import { useClasses } from "./Carousel.styles";

interface HvCarouselControlsProps
  extends HvBaseProps<HTMLDivElement>,
    Pick<HvPaginationProps, "page" | "pages" | "canPrevious" | "canNext"> {
  showDots?: boolean;
  classes?: ExtractNames<typeof useClasses>;
  actions?: ReactNode;
  onPreviousClick?: MouseEventHandler<HTMLButtonElement>;
  onNextClick?: MouseEventHandler<HTMLButtonElement>;
}

export const HvCarouselControls = (props: HvCarouselControlsProps) => {
  const {
    classes: classesProp,
    className,
    showDots,
    page,
    pages,
    canPrevious,
    canNext,
    actions,
    onPreviousClick,
    onNextClick,
  } = useDefaultProps("HvCarouselControls", props);
  const { classes, cx } = useClasses(classesProp, false);

  const selectedIndex = page || 0;
  const numSlides = pages;

  return (
    <div className={cx(classes.controls, className)}>
      {showDots ? (
        <div className={classes.dots}>
          {Array.from(Array(numSlides)).map((el, index) => (
            <span
              key={`circle-${index}`}
              className={cx(classes.dot, {
                [classes.dotSelected]: index === selectedIndex,
              })}
            />
          ))}
        </div>
      ) : (
        <>
          <HvButton
            icon
            disabled={!canPrevious}
            aria-label="Backwards"
            onClick={onPreviousClick}
          >
            <Backwards iconSize="XS" />
          </HvButton>
          <div className={classes.pageCounter}>
            {`${selectedIndex + 1} / ${numSlides}`}
          </div>
          <HvButton
            icon
            disabled={!canNext}
            aria-label="Forwards"
            onClick={onNextClick}
          >
            <Forwards iconSize="XS" />
          </HvButton>
        </>
      )}
      {actions}
    </div>
  );
};
