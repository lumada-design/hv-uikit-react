import React, { useMemo } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core";
import { isKeypress, KeyboardCodes } from "../../utils";
import VerticalScrollListItem from "./VerticalScrollListItem";
import styles, { generateDynamicStyles } from "./styles";
import useScrollTo from "../useScrollTo";
import addTooltipToElement from "../withTooltip";
import { useUniqueId, setId } from "../..";

const { Enter } = KeyboardCodes;

/**
 * VerticalScrollTo element used to quickly navigate in a page.
 */
const HvScrollToVertical = (props) => {
  const {
    id,
    defaultSelectedIndex = 0,
    scrollElementId,
    href = true,
    onChange,
    onClick,
    onEnter,
    className,
    classes,
    options,
    offset = 0,
    position = "relative",
    tooltipPosition = "left",
    ...others
  } = props;

  const elementId = useUniqueId(id, "hvVerticalScrollto");

  const [selectedIndex, setScrollTo] = useScrollTo(
    defaultSelectedIndex,
    scrollElementId,
    href,
    offset,
    options,
    onChange
  );
  const dynamicClasses = generateDynamicStyles(options.length);
  const handleSelection = (event, value, index) => {
    event.preventDefault();
    const wrappedOnChange = () => {
      onChange?.(event, index);
    };
    setScrollTo(event, value, index, wrappedOnChange);
  };

  const tooltipWrappers = useMemo(() => {
    return options.map((option) => {
      return addTooltipToElement(option.label, "div", tooltipPosition, false);
    });
  }, [options, tooltipPosition]);

  const tabs = options.map((option, index) => {
    const selected = selectedIndex === index;
    const tooltipWrapper = tooltipWrappers[index];
    return (
      <VerticalScrollListItem
        id={setId(elementId, `item-${index}`)}
        onClick={(event) => {
          handleSelection(event, option.value, index);
          onClick?.(event, index);
        }}
        onKeyDown={(event) => {
          if (isKeypress(event, Enter) === true) {
            handleSelection(event, option.value, index);
            onEnter?.(event, index);
          }
        }}
        tooltipWrapper={tooltipWrapper}
        selected={selected}
        key={option.key || option.label}
        aria-label={option.label}
      />
    );
  });
  return (
    <ol
      className={clsx(className, classes.root, {
        [dynamicClasses.positionAbsolute]: position === "absolute",
        [dynamicClasses.positionFixed]: position === "fixed",
      })}
      id={elementId}
      {...others}
    >
      {tabs}
    </ol>
  );
};

HvScrollToVertical.propTypes = {
  /**
   * Id to be applied to the element.
   */
  id: PropTypes.string,
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the component root class.
     */
    root: PropTypes.string,
    /**
     * Styles applied to the component when it has a sticky position.
     */
    positionAbsolute: PropTypes.string,
    /**
     * Styles applied to the component when it has a fixed position.
     */
    positionFixed: PropTypes.string,
  }).isRequired,
  /**
   * A function called each time the selected index changes.
   */
  onChange: PropTypes.func,
  /**
   * A function called each time an user clicks on a tab element.
   */
  onClick: PropTypes.func,
  /**
   * A function called each time an user press enter on a tab element.
   */
  onEnter: PropTypes.func,
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
   * default selected index passed from the parent.
   */
  defaultSelectedIndex: PropTypes.number,
  /**
   * The Id of the scrollable container containing displayed elements.
   *
   * Defaults to `window` if unspecified.
   */
  scrollElementId: PropTypes.string,
  /*
   * Defines the offset from the top of each element for getting an optimal viewing region in the container.
   * This allows to exclude regions of the container that are obscured by other content (such as fixed-positioned toolbars or titles)
   * or to put more breathing room between the targeted element and the edges of the container.
   *
   * Each element can also have a specific offset via the options property.
   */
  offset: PropTypes.number,
  /**
   * True if the href location link should be applied. It will create an a element around every list item
   */
  href: PropTypes.bool,
  /**
   * Position of the Vertical scroll to.
   */
  position: PropTypes.oneOf(["absolute", "fixed", "relative"]),
  /**
   * Position of tooltip identifying the current item.
   */
  tooltipPosition: PropTypes.oneOf(["left", "right", "top", "bottom"]),
};

export default withStyles(styles, { name: "HvScrollToVertical" })(HvScrollToVertical);
