import React, { useRef, useContext } from "react";
import PropTypes from "prop-types";

import clsx from "clsx";

import { withStyles } from "@material-ui/core";
import styles from "./styles";

import HvListContext from "../ListContext";

/**
 * A <b>list</b> is any enumeration of a set of items.
 * The simple list is for continous <b>vertical indexes of text or icons+text</b>. The content of these lists must be simple: ideally simples fields.
 * This pattern is ideal for <b>selections</b>. It should be used inside a HvPanel.
 */
const HvListContainer = (props) => {
  const {
    id,
    className,
    classes,
    role,
    interactive: interactiveProp,
    selectable,
    multiSelect,
    condensed,
    disableGutters,
    children,
    ...others
  } = props;

  const containerRef = useRef(null);
  const containerRole = role || (selectable ? "listbox" : undefined);

  const interactive = interactiveProp != null ? interactiveProp : selectable;

  const { topContainerRef, nesting = -1 } = useContext(HvListContext);

  const listContext = {
    topContainerRef: topContainerRef || containerRef,
    containerRole,
    condensed,
    disableGutters,
    interactive,
    selectable,
    nesting: nesting + 1,
  };

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

  return (
    <HvListContext.Provider value={listContext}>
      <ul
        ref={containerRef}
        id={id}
        className={clsx(className, classes.root)}
        role={containerRole}
        aria-multiselectable={(selectable && multiSelect) || undefined}
        {...others}
      >
        {renderChildren()}
      </ul>
    </HvListContext.Provider>
  );
};

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
   * Overrides the implicit list role. It defaults to "listbox" if unspecified and the list is selectable.
   */
  role: PropTypes.string,
  /**
   * If the list items should be focusable and react to mouse over events.
   * Defaults to true if the list is selectable, false otherwise.
   */
  interactive: PropTypes.bool,
  /**
   * If the list represents a set of selectable items.
   */
  selectable: PropTypes.bool,
  /**
   * If the is list is selectable, indicates that the user may select more than one item from the current selectable list items.
   */
  multiSelect: PropTypes.bool,
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
