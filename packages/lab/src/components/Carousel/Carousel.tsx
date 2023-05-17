import React, { CSSProperties, useEffect, useRef, useState } from "react";
import useCarousel, { EmblaOptionsType } from "embla-carousel-react";
import { ClassNames } from "@emotion/react";
import {
  HvBaseProps,
  HvButton,
  HvContainer,
  HvStack,
  HvTypography,
  useBreakpoints,
} from "@hitachivantara/uikit-react-core";
import {
  Backwards,
  Forwards,
  Close,
  Fullscreen,
} from "@hitachivantara/uikit-react-icons";

import styles, {
  HvCarouselClasses,
  carouselClasses as cc,
} from "./Carousel.styles";

const clamp = (num: number, max: number, min = 0) =>
  Math.min(Math.max(num, min), max);

export interface HvCarouselProps
  extends HvBaseProps<HTMLDivElement, "title" | "onChange"> {
  /** A Jss Object used to override or extend the styles applied. */
  classes?: Partial<HvCarouselClasses>;
  /** TODO */
  height?: CSSProperties["height"];
  /** TODO */
  thumbnailWidth?: CSSProperties["width"];
  /** Title of the image carousel */
  title?: React.ReactNode;
  /** Documents to be displayed. */
  documents: { src: string; value: string }[];
  /** Actions! */
  actions?: React.ReactNode;
  /** Whether Carousel is in "XS mode". Removed extra padding to use in embedded contexts */
  xs?: boolean;
  /** A flag that switches to low cardinality mode */
  showDots?: boolean;
  /** A flag that activates a counter on the top right corner of the selected image */
  showCounter?: boolean;
  /** Whether to show the back/forwards buttons over the slide */
  showSlideControls?: boolean;
  /** Whether to show the Fullscreen toggle button */
  showFullscreen?: boolean;
  /** Whether to show the thumbnails */
  hideThumbnails?: boolean;
  /** Carousel configuration options. @see https://www.embla-carousel.com/api/options/ */
  carouselOptions?: EmblaOptionsType;
  /** A function called each time the selected image changes. */
  onChange?: (index: number) => void;
}

/**
 * A Carousel is commonly used to browse images, it can also be used to browse any kind of content like text, video, or charts.
 * It allows you to focus on a particular content while having a notion of how many you have to explore.
 */
export const HvCarousel = (props: HvCarouselProps) => {
  const {
    className,
    classes = {},
    height: heightProp,
    thumbnailWidth = 90,
    title,
    documents,
    actions,
    xs,
    showDots,
    showCounter,
    showSlideControls,
    showFullscreen: showFullscreenProp,
    hideThumbnails: hideThumbnailsProp,
    carouselOptions = { loop: true },
    onChange,
    ...others
  } = props;
  const thumbnailsRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { sm: isSmUp, lg: isLgUp } = useBreakpoints("up");

  const [containerRef, controller] = useCarousel(carouselOptions);

  const [selectedIndex, setSelectedIndex] = useState(
    carouselOptions.startIndex ?? 0
  );

  const handlePrevious = () => {
    controller?.scrollPrev();
  };

  const handleNext = () => {
    controller?.scrollNext();
  };

  const handleScroll = (index: number) => {
    controller?.scrollTo(index);
  };

  const handleSelect = () => {
    if (!controller) return;

    const slideIndex = controller.selectedScrollSnap();
    setSelectedIndex(slideIndex);

    // scroll to thumbnail button
    thumbnailsRef.current
      ?.querySelectorAll("button")
      ?.[slideIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });

    onChange?.(slideIndex);
  };

  useEffect(() => {
    if (!controller) return;

    controller.on("select", handleSelect);

    return () => {
      controller.off("select", handleSelect);
    };
  }, [controller]);

  useEffect(() => {
    if (!controller) return;

    controller.reInit();
    setSelectedIndex((currentIndex) =>
      clamp(currentIndex, 0, documents.length)
    );
  }, [documents.length]);

  const canPrev = controller?.canScrollPrev() ?? false;
  const canNext = controller?.canScrollNext() ?? false;
  const showTitle = !!title && (!xs || isFullscreen);
  const showFullscreen = showFullscreenProp ?? xs;
  const height = isFullscreen ? "100%" : isLgUp ? 600 : isSmUp ? 400 : 200;
  const hideThumbnails = hideThumbnailsProp ?? (xs && !isFullscreen);

  return (
    <ClassNames>
      {({ css, cx }) => (
        <HvContainer
          className={cx(
            className,
            cx(cc.root, classes.root, css(styles.root)),
            xs && cx(cc.xs, css(styles.xs), "xs"),
            isFullscreen && cx(cc.xs, css(styles.fullscreen), "fs")
          )}
          {...others}
        >
          {showTitle && (
            <HvTypography
              variant="title2"
              className={cx(css(styles.title), cc.title)}
            >
              {title}
            </HvTypography>
          )}
          <div className={cx(css(styles.actions), cc.actions)}>
            {showFullscreen && (
              <HvButton
                icon
                variant="secondaryGhost"
                onClick={() => setIsFullscreen((curr) => !curr)}
                className={cx(css(styles.closeButton), cc.closeButton)}
              >
                {isFullscreen ? (
                  <Close aria-label="Close" />
                ) : (
                  <Fullscreen aria-label="Fullscreen" />
                )}
              </HvButton>
            )}
            {actions}
          </div>

          <div className={css(styles.idk)}>
            <div className={cx(css(styles.controls), cc.controls)}>
              {showDots ? (
                <div className={cx(css(styles.dots), cc.dots)}>
                  {documents.map((el, index) => (
                    <span
                      key={`circle-${index}`}
                      className={cx(css(styles.dot), cc.dot, {
                        [css(styles.dotSelected)]: index === selectedIndex,
                      })}
                    />
                  ))}
                </div>
              ) : (
                <>
                  <HvButton
                    icon
                    disabled={!canPrev}
                    variant="secondaryGhost"
                    aria-label="Backwards"
                    onClick={handlePrevious}
                  >
                    <Backwards iconSize="XS" />
                  </HvButton>
                  <div>{`${selectedIndex + 1} / ${documents.length}`}</div>
                  <HvButton
                    icon
                    disabled={!canNext}
                    variant="secondaryGhost"
                    aria-label="Forwards"
                    onClick={handleNext}
                  >
                    <Forwards iconSize="XS" />
                  </HvButton>
                </>
              )}
            </div>

            <div
              className={cx(
                cc.main,
                cx(css(styles.main)),
                xs && cx(css(styles.mainXs)),
                isFullscreen && cx(css(styles.mainFullscreen))
              )}
            >
              {showCounter && (
                <div className={cx(css(styles.counterContainer))}>
                  <span className={css(styles.counter)}>
                    {`${selectedIndex + 1}/${documents.length}`}
                  </span>
                </div>
              )}

              {showSlideControls && (
                <div
                  className={cx(css(styles.slideControls), cc.slideControls)}
                >
                  {
                    <HvButton
                      icon
                      disabled={!canPrev}
                      variant="secondary"
                      aria-label="Backwards"
                      onClick={handlePrevious}
                    >
                      <Backwards iconSize="XS" />
                    </HvButton>
                  }
                  <HvButton
                    icon
                    disabled={!canNext}
                    variant="secondary"
                    aria-label="Forwards"
                    onClick={handleNext}
                  >
                    <Forwards iconSize="XS" />
                  </HvButton>
                </div>
              )}

              <div
                ref={containerRef}
                style={{ height }}
                className={cx(css(styles.slidesViewport), cc.slidesViewport)}
              >
                <div
                  className={cx(
                    css(styles.slidesContainer),
                    cc.slidesContainer
                  )}
                >
                  {documents.map((el) => (
                    <div
                      key={`slide-${el.value}`}
                      className={cx(classes.slide, css(styles.slide), cc.slide)}
                    >
                      <img
                        className={cx(css(styles.image))}
                        src={el.src}
                        alt={el.value}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {!hideThumbnails && (
            <div
              ref={thumbnailsRef}
              className={cx(cc.panel, css(styles.panel))}
            >
              <HvStack direction="row" spacing="xs">
                {documents.map((doc, i) => (
                  <HvButton
                    icon
                    variant="secondaryGhost"
                    key={`button-${i}`}
                    style={{ width: thumbnailWidth }}
                    className={cx(
                      css(styles.thumbnailButton),
                      cc.thumbnailButton
                    )}
                    onClick={() => handleScroll(i)}
                  >
                    <img
                      className={cx(css(styles.thumbnail), {
                        [css(styles.thumbnailSelected)]: i === selectedIndex,
                      })}
                      src={doc.src}
                      alt={doc.value}
                    />
                  </HvButton>
                ))}
              </HvStack>
            </div>
          )}
        </HvContainer>
      )}
    </ClassNames>
  );
};
