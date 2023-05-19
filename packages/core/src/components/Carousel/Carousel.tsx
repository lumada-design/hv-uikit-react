import React, {
  CSSProperties,
  Children,
  useEffect,
  useRef,
  useState,
} from "react";
import useCarousel, { EmblaOptionsType } from "embla-carousel-react";
import { ClassNames } from "@emotion/react";
import {
  Backwards,
  Forwards,
  Close,
  Fullscreen,
} from "@hitachivantara/uikit-react-icons";
import { HvButton, HvContainer, HvStack, HvTypography } from "@core/components";
import { HvBaseProps } from "@core/types";

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
  /** Height of the Slider container. If `undefined`, images will keep a 16/9 aspect-ratio */
  height?: CSSProperties["height"];
  /** Width of the thumbnail. Height will try to maintain a 16/9 aspect-ratio */
  thumbnailWidth?: CSSProperties["width"];
  /** Title of the carousel */
  title?: React.ReactNode;
  /** Content slides to be displayed. @see `<HvCarouselSlide />` */
  children?: React.ReactNode;
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
  /** */
  renderThumbnail?: (index: number) => React.ReactNode;
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
    children,
    actions,
    xs,
    showDots: showDotsProp,
    showCounter: showCounterProp,
    showSlideControls,
    showFullscreen: showFullscreenProp,
    hideThumbnails: hideThumbnailsProp,
    carouselOptions,
    renderThumbnail,
    onChange,
    ...others
  } = props;
  const thumbnailsRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const [containerRef, controller] = useCarousel({
    align: "start",
    loop: true,
    ...carouselOptions,
  });

  const [selectedIndex, setSelectedIndex] = useState(
    carouselOptions?.startIndex ?? 0
  );

  const numSlides = Children.count(children);

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
    setSelectedIndex((currentIndex) => clamp(currentIndex, numSlides, 0));
  }, [numSlides]);

  const canPrev = controller?.canScrollPrev() ?? false;
  const canNext = controller?.canScrollNext() ?? false;
  const showTitle = !!title && (!xs || isFullscreen);
  const showFullscreen = showFullscreenProp ?? xs;
  const height = isFullscreen ? "100%" : heightProp ?? "auto";
  const showCounter = xs;
  const hideThumbnails = hideThumbnailsProp ?? (xs && !isFullscreen);
  const showThumbnails = !hideThumbnails && !!renderThumbnail;
  const showDots = showDotsProp ?? numSlides <= 5;

  return (
    <ClassNames>
      {({ css, cx }) => (
        <HvContainer
          className={cx(
            cx(cc.root, classes.root, css(styles.root)),
            xs && cx(cc.xs, classes.root, css(styles.xs)),
            isFullscreen &&
              cx(cc.xs, classes.fullscreen, css(styles.fullscreen)),
            className
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
                  {Array.from(Array(numSlides)).map((el, index) => (
                    <span
                      key={`circle-${index}`}
                      className={cx(
                        cc.dot,
                        classes.dot,
                        css(styles.dot),
                        index === selectedIndex &&
                          cx(
                            cc.dotSelected,
                            classes.dotSelected,
                            css(styles.dotSelected)
                          )
                      )}
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
                  >{`${selectedIndex + 1} / ${numSlides}`}</div>
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
                classes.main,
                css(styles.main),
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
                  <span
                    className={cx(
                      cc.counter,
                      classes.counter,
                      css(styles.counter)
                    )}
                  >
                    {`${selectedIndex + 1}/${numSlides}`}
                  </span>
                </div>
              )}

              {showSlideControls && (
                <div
                  className={cx(
                    cc.slideControls,
                    classes.slideControls,
                    css(styles.slideControls)
                  )}
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
                className={cx(
                  cc.slidesViewport,
                  classes.slidesViewport,
                  css(styles.slidesViewport)
                )}
              >
                <div
                  className={cx(
                    cc.slidesContainer,
                    classes.slidesContainer,
                    css(styles.slidesContainer)
                  )}
                >
                  {children}
                </div>
              </div>
            </div>
          </div>

          {showThumbnails && (
            <div
              ref={thumbnailsRef}
              className={cx(cc.panel, classes.panel, css(styles.panel))}
            >
              <HvStack direction="row" spacing="xs">
                {Array.from(Array(numSlides)).map((doc, i) => (
                  <HvButton
                    icon
                    variant="secondaryGhost"
                    key={`button-${i}`}
                    style={{ width: thumbnailWidth }}
                    className={cx(
                      cc.thumbnail,
                      classes.thumbnail,
                      css(styles.thumbnail),
                      i === selectedIndex &&
                        cx(
                          cc.thumbnailSelected,
                          classes.thumbnailSelected,
                          css(styles.thumbnailSelected)
                        )
                    )}
                    onClick={() => handleScroll(i)}
                  >
                    {renderThumbnail(i)}
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
