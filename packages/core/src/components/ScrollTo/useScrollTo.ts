import { useCallback, useEffect, useRef, useState } from "react";
import {
  findFirstVisibleElement,
  getScrollTop,
  isScrolledToTheBottom,
  scrollElement,
  verticalScrollOffset,
} from "./utils";
import { HvScrollToVerticalOption } from "./Vertical";

export const useScrollTo = (
  selectedIndexProp: number = 0,
  scrollElementId: string | undefined = undefined,
  href: boolean = false,
  offset: number = 0,
  options: HvScrollToVerticalOption[] = [],
  onChange:
    | ((
        event:
          | Event
          | React.MouseEvent<HTMLDivElement>
          | React.KeyboardEvent<HTMLDivElement>,
        index: number
      ) => void)
    | undefined = undefined,
  direction: "column" | "row" = "column"
): [
  number,
  (
    event:
      | React.MouseEvent<HTMLDivElement>
      | React.KeyboardEvent<HTMLDivElement>,
    id: string,
    index: number,
    wrappedOnChange?: (index: number) => void
  ) => void
] => {
  const RETRY_MAX: number = 5;
  const [selectedIndex, setSelectedIndex] = useState<number>(selectedIndexProp);

  const scrollEle = useRef<HTMLElement | (Window & typeof globalThis)>(window);
  const requestedAnimationFrame = useRef(0);
  const lastContainerScrollTop = useRef<number>(0);

  // Ref to use a often-changing value in useCallback, as recommended in
  // https://reactjs.org/docs/hooks-faq.html#how-to-read-an-often-changing-value-from-usecallback
  const selectedIndexRef = useRef(selectedIndex);

  useEffect(() => {
    selectedIndexRef.current = selectedIndex;
  }, [selectedIndex]);

  useEffect(() => {
    scrollEle.current =
      (scrollElementId && document.getElementById(scrollElementId)) || window;

    lastContainerScrollTop.current = verticalScrollOffset(scrollEle.current);
  }, [scrollElementId]);

  const checkScroll = useCallback(
    (
      event:
        | Event
        | React.MouseEvent<HTMLDivElement>
        | React.KeyboardEvent<HTMLDivElement>
    ) => {
      if (
        requestedAnimationFrame.current === 0 &&
        window?.requestAnimationFrame
      ) {
        requestedAnimationFrame.current = window.requestAnimationFrame(() => {
          requestedAnimationFrame.current = 0;

          const firstVisibleElementIndex = findFirstVisibleElement(
            scrollEle.current,
            options,
            offset
          );

          let newSelectedIndex = firstVisibleElementIndex;

          // select the first element when all elements are bellow the container's top
          if (firstVisibleElementIndex < 0) {
            newSelectedIndex = 0;
          }

          // if the user has reached the bottom of the container, select the first nav item still visible
          // (usually this selects the last nav item, when it can't reach the top the container)
          // in theory only needed when scrolling down, but no... because of the Safari bouncing behaviour
          if (
            newSelectedIndex < options.length - 1 &&
            isScrolledToTheBottom(scrollEle.current)
          ) {
            newSelectedIndex += 1;
          }

          const containerScrollTop = getScrollTop(scrollEle.current);
          const isScrollingDown =
            containerScrollTop > lastContainerScrollTop.current;
          lastContainerScrollTop.current = containerScrollTop;

          // only update the selected item if the scroll direction is moving away from it
          if (isScrollingDown) {
            if (newSelectedIndex < selectedIndexRef.current) {
              newSelectedIndex = selectedIndexRef.current;
            }
          } else if (newSelectedIndex > selectedIndexRef.current) {
            newSelectedIndex = selectedIndexRef.current;
          }

          setSelectedIndex(newSelectedIndex);
          onChange?.(event, newSelectedIndex);
        });
      }
    },
    [offset, options, onChange]
  );

  // Registers and unregisters the scroll listener
  useEffect(() => {
    if (scrollEle.current) {
      scrollEle.current.addEventListener("scroll", checkScroll, false);
    }

    return () => {
      if (scrollEle.current) {
        scrollEle.current.removeEventListener("scroll", checkScroll);
      }

      if (requestedAnimationFrame.current !== 0) {
        window.cancelAnimationFrame(requestedAnimationFrame.current);
        requestedAnimationFrame.current = 0;
      }
    };
  }, [checkScroll]);

  // Waits for the elements to be rendered and scrolls to the one referenced in the URL hash, if any
  useEffect(() => {
    let checkRenderedInterval;

    if (href) {
      const hashValue = document.location.hash.split("#")[1] || "";

      const option = options.find((o) => o.value === hashValue);

      if (option) {
        let retry = 0;
        checkRenderedInterval = setInterval(() => {
          const ele = document.getElementById(option.value);

          if (ele) {
            scrollElement(ele, scrollEle.current, option.offset || offset);
            clearInterval(checkRenderedInterval);
          } else {
            retry += 1;
            if (retry === RETRY_MAX) {
              clearInterval(checkRenderedInterval);
            }
          }
        }, 1000);
      }
    }

    return () => {
      clearInterval(checkRenderedInterval);
    };

    // We really want to run this just in the first load
    // in fact this doesn't even belong here, the logic should be external
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setScrollTo = (
    event:
      | React.MouseEvent<HTMLDivElement>
      | React.KeyboardEvent<HTMLDivElement>,
    id: string,
    index: number,
    wrappedOnChange?: (index: number) => void
  ) => {
    const option = options.find((o) => o.value === id);

    if (option) {
      const ele = document.getElementById(id);
      if (ele) {
        scrollElement(
          ele,
          scrollEle.current,
          option.offset || offset,
          direction
        );
      }

      if (href) {
        window.history.pushState({}, "", `#${options[index].value}`);
      }

      setSelectedIndex(index);
      wrappedOnChange?.(index);

      // Safari scrolls immediately (no smooth scroll support),
      // so this ref value must be updated asap
      selectedIndexRef.current = index;
    }
  };

  return [selectedIndex, setScrollTo];
};
