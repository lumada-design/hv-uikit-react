import React from "react";
import { withTooltip, HvTypography } from "..";

export const getScrollTop = (c = window) => {
  if (c === window) {
    return (
      window.scrollY ||
      window.pageYOffset ||
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop
    );
  }

  return c.scrollTop;
};

export const verticalScrollOffset = (t, c = window) => {
  if (c === window) {
    return (t?.getBoundingClientRect?.().top || 0) + (window.scrollY || window.pageYOffset);
  }
  if (getComputedStyle(c).position !== "static") {
    return t.offsetTop;
  }

  return t.offsetTop - c.offsetTop;
};

export const scrollElement = (element, container, offset = 0) => {
  const elemTop = verticalScrollOffset(element, container);
  container.scrollTo({
    top: elemTop - offset,
    behavior: "smooth",
  });
  element.focus({ preventScroll: true });
};

export const isScrolledToTheBottom = (container) => {
  const containerScrollTop = getScrollTop(container);

  if (container === window) {
    // accounting for cases where html/body are set to height:100%
    const scrollHeight =
      (document.documentElement && document.documentElement.scrollHeight) ||
      document.body.scrollHeight;

    return containerScrollTop + window.innerHeight >= scrollHeight;
  }

  return containerScrollTop + container.offsetHeight >= container.scrollHeight;
};

export const findFirstVisibleElement = (container, options, offset) => {
  const boundsTop = verticalScrollOffset(container);

  let i = 0;
  // find index of first element whose top is still visible inside the container
  for (; i < options.length; i += 1) {
    const ele = document.getElementById(options[i].value);

    if (ele) {
      const elemTop = verticalScrollOffset(ele) - (options[i].offset || offset);

      if (elemTop > boundsTop) {
        break;
      }
    }
  }

  // return the previous index, the element that last scrolled past the top
  return i - 1;
};

const hideTooltip = (evt) => {
  const isOverFlow =
    evt.target.children.length > 1
      ? Array.of(...evt.target.children).some((child) => child.scrollWidth > child.clientWidth)
      : evt.target.scrollWidth > evt.target.clientWidth;
  return !isOverFlow;
};

export const addTooltipToElement = (
  label,
  componentType,
  tooltipPosition = "top",
  hideOnOverflow = true
) => {
  const component = (props) => (
    <HvTypography component={componentType} {...props}>
      {props.children}
    </HvTypography>
  );
  const hideTooltipFunc = hideOnOverflow ? hideTooltip : undefined;
  return withTooltip(component, label, tooltipPosition, hideTooltipFunc);
};
