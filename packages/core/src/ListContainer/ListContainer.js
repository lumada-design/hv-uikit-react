import React, { useRef, useContext, useMemo } from "react";
import PropTypes from "prop-types";

import clsx from "clsx";

import { withStyles } from "@mui/styles";
import useForkRef from "../utils/useForkRef";

import styles from "./styles";

import HvListContext from "./ListContext";

/**
 * A <b>list</b> is any enumeration of a set of items.
 * The simple list is for continuous <b>vertical indexes of text or icons+text</b>. The content of these lists must be simple: ideally simples fields.
 * This pattern is ideal for <b>selections</b>. It should be used inside a HvPanel.
 */
const HvListContainer = React.forwardRef((props, externalRef) => {
  const {
    id,
    className,
    classes,
    interactive = false,
    condensed,
    disableGutters,
    children,
    ...others
  } = props;

  const containerRef = useRef(null);

  const { topContainerRef, nesting = -1 } = useContext(HvListContext);

  const listContext = useMemo(
    () => ({
      topContainerRef: topContainerRef || containerRef,
      condensed,
      disableGutters,
      interactive,
      nesting: nesting + 1,
    }),
    [condensed, disableGutters, interactive, nesting, topContainerRef]
  );

  const renderChildren = () => {
    if (!interactive) {
      return children;
    }

    const anySelected = React.Children.toArray(children)
      .map((child) => child.props.selected && !child.props.disabled)
      .reduce((result, selected) => result || selected, false);

    return React.Children.map(children, (child, i) => {
      const tabIndex =
        child.props.tabIndex ||
        (!anySelected && i === 0) ||
        (child.props.selected && !child.props.disabled)
          ? 0
          : -1;

      return React.cloneElement(child, {
        tabIndex,
      });
    });
  };

  const handleRef = useForkRef(externalRef, containerRef);

  return (
    <HvListContext.Provider value={listContext}>
      <ul ref={handleRef} id={id} className={clsx(className, classes.root)} {...others}>
        {renderChildren()}
      </ul>
    </HvListContext.Provider>
  );
});

HvListContainer.propTypes = {
  /**
   * The id of the root element
   */
  id: PropTypes.string,
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * A Jss Object used to override or extend the component styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the component root class.
     */
    root: PropTypes.string,
  }).isRequired,
  /**
   * If the list items should be focusable and react to mouse over events.
   * Defaults to true if the list is selectable, false otherwise.
   */
  interactive: PropTypes.bool,
  /**
   * If `true` compact the vertical spacing between list items.
   */
  condensed: PropTypes.bool,
  /**
   * If `true`, the list items' left and right padding is removed.
   */
  disableGutters: PropTypes.bool,
  /**
   * The list items.
   */
  children: PropTypes.node,
};

export default withStyles(styles, { name: "HvListContainer" })(HvListContainer);
