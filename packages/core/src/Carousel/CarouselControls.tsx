import { Backwards, Forwards } from "@hitachivantara/uikit-react-icons";

import { HvButton } from "../Button";
import { useDefaultProps } from "../hooks/useDefaultProps";
import { useLabels } from "../hooks/useLabels";
import { HvPaginationProps } from "../Pagination";
import { HvBaseProps } from "../types/generic";
import { ExtractNames } from "../utils/classes";
import { useClasses } from "./Carousel.styles";

const DEFAULT_LABELS = {
  backwards: "Backwards",
  forwards: "Forwards",
};

interface HvCarouselControlsProps
  extends HvBaseProps<HTMLDivElement>,
    Pick<HvPaginationProps, "page" | "pages" | "canPrevious" | "canNext"> {
  showDots?: boolean;
  classes?: ExtractNames<typeof useClasses>;
  actions?: React.ReactNode;
  onPreviousClick?: React.MouseEventHandler<HTMLButtonElement>;
  onNextClick?: React.MouseEventHandler<HTMLButtonElement>;
  /** Labels used on the component. */
  labels?: Partial<typeof DEFAULT_LABELS>;
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
    labels: labelsProps,
    onPreviousClick,
    onNextClick,
  } = useDefaultProps("HvCarouselControls", props);
  const { classes, cx } = useClasses(classesProp, false);

  const labels = useLabels(DEFAULT_LABELS, labelsProps);

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
            aria-label={labels.backwards}
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
            aria-label={labels.forwards}
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
