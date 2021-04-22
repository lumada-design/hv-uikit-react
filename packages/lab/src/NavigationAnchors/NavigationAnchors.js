import React, { useState, useEffect, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { deprecatedPropType, withStyles } from "@material-ui/core";
import { HvListContainer, HvListItem } from "@hv/uikit-react-core";
import styles from "./styles";

const RETRY_MAX = 5;

const verticalScrollOffset = (t, c = window) => {
  if (c === window) {
    return (t?.getBoundingClientRect?.().top || 0) + (window.scrollY || window.pageYOffset);
  }
  if (getComputedStyle(c).position !== "static") {
    return t.offsetTop;
  }

  return t.offsetTop - c.offsetTop;
};

const scrollElement = (element, container, offset = 0) => {
  const elemTop = verticalScrollOffset(element, container);
  container.scrollTo({
    top: elemTop - offset,
    behavior: "smooth",
  });
};

const isScrolledToTheBottom = (container) => {
  let atTheBottom = false;
  if (container === window) {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      atTheBottom = true;
    }
  } else if (container.scrollHeight - container.scrollTop === container.offsetHeight) {
    atTheBottom = true;
  }
  return atTheBottom;
};

const hasScrolledIntoView = (container, options, offset) => {
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

  // select the last nav item that whose top scrolled out of the container's visible area
  // or, if the user has reached the bottom of the container, select the first nav item still visible.
  // (usually this selects the last nav item, when it can't reach the top the container)
  return i - (i < options.length && isScrolledToTheBottom(container) ? 0 : 1);
};

/**
 * A navigation component to help in changing views, still in development
 */
const NavigationAnchors = ({
  selectedIndex: selectedIndexProp = 0,
  scrollElementId,
  href = true,
  onClick,
  className,
  classes,
  options,
  floating,
  offset = 0,
  ...other
}) => {
  const [selectedIndex, setSelectedIndex] = useState(selectedIndexProp);

  const scrollEle = useRef();
  const requestedAnimationFrame = useRef(0);

  // get and store the container's dom element
  useEffect(() => {
    scrollEle.current = (scrollElementId && document.getElementById(scrollElementId)) || window;
  }, [scrollElementId]);

  const checkScroll = useCallback(() => {
    if (requestedAnimationFrame.current === 0 && window?.requestAnimationFrame) {
      requestedAnimationFrame.current = window.requestAnimationFrame(() => {
        requestedAnimationFrame.current = 0;

        const newSelectedIndex = hasScrolledIntoView(scrollEle.current, options, offset);
        if (newSelectedIndex > -1) {
          setSelectedIndex(newSelectedIndex);
        }
      });
    }
  }, [offset, options]);

  // registers and unregisters the scroll listener
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

  // waits for the elements to be rendered and scrolls to the one referenced
  // in the URL hash, if any
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

    // we really want to run this just in the first load
    // in fact this doesn't even belong here, the logic should be external
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleListItemClick = (event, id, index) => {
    const option = options.find((o) => o.value === id);

    if (option) {
      const ele = document.getElementById(id);
      if (ele) {
        scrollElement(ele, scrollEle.current, option.offset || offset);
      }

      if (!href && onClick) {
        onClick(event, index, option);
      } else if (href) {
        window.history.pushState({}, "", `#${options[index].value}`);
      }
    }
  };

  return (
    <HvListContainer interactive className={clsx(className, classes.root)} {...other}>
      {options.map((option, index) => (
        <HvListItem
          classes={{
            selected: classes.listItemSelected,
            gutters: classes.listItemGutters,
          }}
          key={option.key || option.label}
          onClick={(event) => handleListItemClick(event, option.value, index)}
          selected={selectedIndex === index}
        >
          {option.label}
        </HvListItem>
      ))}
    </HvListContainer>
  );
};

NavigationAnchors.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    root: PropTypes.string,
    listItemGutters: PropTypes.string,
    listItemSelected: PropTypes.string,
  }).isRequired,
  /**
   * An Array of Objects with Label and Value. Label is the displayed Element and Value is the local navigation location applied
   */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      offset: PropTypes.number,
    })
  ).isRequired,
  /**
   * True if the href location link should be applied. It will create an a element around every list item
   */
  href: PropTypes.bool,
  /**
   * A callback called on click of every list item, if the href is false
   */
  onClick: PropTypes.func,
  /**
   * Whether the anchors are always in a fixed position
   *
   * @deprecated Currently does nothing. Style the component instead.
   */
  floating: deprecatedPropType(PropTypes.bool),
  /**
   * Currently selected index passed from the parent.
   */
  selectedIndex: PropTypes.number,
  /**
   * The Id of the scrollable container containing displayed elements.
   *
   * Defaults to `window` if unspecified.
   */
  scrollElementId: PropTypes.string,
  /**
   * Defines the offset from the top of each element for getting an optimal viewing region in the container.
   * This allows to exclude regions of the container that are obscured by other content (such as fixed-positioned toolbars or titles)
   * or to put more breathing room between the targeted element and the edges of the container.
   *
   * Each element can alse have a specific offset via the options property.
   */
  offset: PropTypes.number,
};

export default withStyles(styles, { name: "HvNavigationAnchors" })(NavigationAnchors);
