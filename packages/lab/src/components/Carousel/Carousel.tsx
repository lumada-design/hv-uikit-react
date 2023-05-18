import React, { CSSProperties, useEffect, useRef, useState } from "react";
import useCarousel, { EmblaOptionsType } from "embla-carousel-react";
import { ClassNames } from "@emotion/react";
import {
  HvBaseProps,
  HvButton,
  HvContainer,
  HvStack,
  HvTypography,
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
  /** Height of the Slider container. If undefined, adjusts according to the breakpoint width */
  height?: CSSProperties["height"];
  /** Width of the thumbnail. Height will try to maintain aspect-ratio */
  thumbnailWidth?: CSSProperties["width"];
  /** Title of the carousel */
  title?: React.ReactNode;
  /** Documents to be displayed. */
  documents: { src: string; value: string }[];
  /** Custom content to render in the actions area */
  actions?: React.ReactNode;
  /** Whether Carousel is in "xs mode" - to use in embedded contexts */
  xs?: boolean;
  /** Whether to show dots instead of arrow pagination. Defaults to true under 5 elements */
  showDots?: boolean;
  /** Whether to show the counter on the top-right corner of the active slide */
  showCounter?: boolean;
  /** Whether to show the back/forwards buttons over the active slide */
  showSlideControls?: boolean;
  /** Whether to enable the fullscreen toggle button */
  showFullscreen?: boolean;
  /** Whether to hide the thumbnails. Hidden by default in "xs" mode */
  hideThumbnails?: boolean;
  /** Carousel configuration options. @see https://www.embla-carousel.com/api/options/ */
  carouselOptions?: EmblaOptionsType;
  /** The callback fired when the active slide changes. */
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
    height: heightProp = "auto",
    thumbnailWidth = 90,
    title,
    documents,
    actions,
    xs,
    showDots: showDotsProp,
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
  const height = isFullscreen ? "100%" : heightProp ?? "auto";
  const hideThumbnails = hideThumbnailsProp ?? (xs && !isFullscreen);
  const showDots = showDotsProp ?? documents.length <= 5;

  return (
    <ClassNames>
      {({ css, cx }) => (
        <HvContainer
          className={cx(
            className,
            cx(cc.root, classes.root, css(styles.root)),
            xs && cx(cc.xs, classes.root, css(styles.xs)),
            isFullscreen &&
              cx(cc.xs, classes.fullscreen, css(styles.fullscreen))
          )}
          {...others}
        >
          {showTitle && (
            <HvTypography
              variant="title2"
              className={cx(cc.title, classes.title, css(styles.title))}
            >
              {title}
            </HvTypography>
          )}
          <div className={cx(cc.actions, classes.actions, css(styles.actions))}>
            {showFullscreen && (
              <HvButton
                icon
                variant="secondaryGhost"
                onClick={() => setIsFullscreen((curr) => !curr)}
                className={cx(
                  cc.closeButton,
                  classes.closeButton,
                  css(styles.closeButton)
                )}
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

          <div
            className={cx(
              cc.mainContainer,
              classes.mainContainer,
              css(styles.mainContainer)
            )}
          >
            <div
              className={cx(
                cc.controls,
                classes.controls,
                css(styles.controls)
              )}
            >
              {showDots ? (
                <div className={cx(cc.dots, classes.dots, css(styles.dots))}>
                  {documents.map((el, index) => (
                    <span
                      key={`circle-${index}`}
                      className={cx(cc.dot, classes.dot, css(styles.dot), {
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
                  <div
                    className={cx(
                      cc.pageCounter,
                      classes.pageCounter,
                      css(styles.pageCounter)
                    )}
                  >{`${selectedIndex + 1} / ${documents.length}`}</div>
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
                cx(cc.main, classes.main, css(styles.main)),
                xs && cx(cc.mainXs, classes.mainXs, css(styles.mainXs)),
                isFullscreen &&
                  cx(
                    cc.mainFullscreen,
                    classes.mainFullscreen,
                    css(styles.mainFullscreen)
                  )
              )}
            >
              {showCounter && (
                <div
                  className={cx(
                    cc.counterContainer,
                    classes.counterContainer,
                    css(styles.counterContainer)
                  )}
                >
                  <span className={cx(cc.counter, css(styles.counter))}>
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
