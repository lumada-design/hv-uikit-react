import React, { useState } from "react";
import { withStyles } from "@mui/styles";
import PropTypes from "prop-types";
import clsx from "clsx";

import {
  HvVerticalNavigation as HvVerticalNavigationCore,
  HvVerticalNavigationTree,
  HvButton,
  HvContainer,
} from "@hitachivantara/uikit-react-core";
import { Backwards, Forwards } from "@hitachivantara/uikit-react-icons";

import useStyles from "./styles";
import { findRootParentById, findItemById, pathToItem } from "./utils";

const HvVerticalNavigation = ({
  onNavigationChange,
  onToggleExpanded,
  data,
  selected,
  expanded,
  topPosition,
  expandedPanelWidth,
  collapsedPanelWidth,
  position,

  ...others
}) => {
  const classes = useStyles({ topPosition, expandedPanelWidth, collapsedPanelWidth, position })();

  const noSubData = data.map(({ data: dataToRemove, ...rest }) => rest);

  const [expandedItems, setExpandedItems] = useState(pathToItem(data, selected));

  const selectedTopParent = findRootParentById(data, selected)?.id;

  const handleVerticalNavigationChange = (event, item) => {
    // This need to be done because the item recieved on the callback is missing the original data object
    const fullItem = findItemById(data, item.id);

    if (!expanded && fullItem.data && fullItem.data.length > 0) {
      setExpandedItems((prevState) => [...prevState, item.id]);
      onToggleExpanded(true);
    } else {
      onNavigationChange?.(event, item);
    }
  };

  const handleVerticalNavigationToggle = (event, currentExpandedItems) => {
    setExpandedItems(currentExpandedItems);
  };

  const handleExpandToggle = () => {
    onToggleExpanded(!expanded);
  };

  return (
    <HvVerticalNavigationCore
      className={clsx(classes.panel, {
        [classes.panelExpanded]: expanded,
        [classes.panelCollapsed]: !expanded,
      })}
      {...others}
    >
      <HvContainer className={`${classes.toggleCollapsePanel}`}>
        <HvButton icon onClick={handleExpandToggle}>
          {expanded ? <Backwards iconSize="XS" /> : <Forwards iconSize="XS" />}
        </HvButton>
      </HvContainer>

      <HvVerticalNavigationTree
        collapsible
        expanded={expandedItems}
        data={expanded ? data : noSubData}
        selected={expanded ? selected : selectedTopParent}
        onChange={handleVerticalNavigationChange}
        onToggle={handleVerticalNavigationToggle}
      />
    </HvVerticalNavigationCore>
  );
};

HvVerticalNavigation.propTypes = {
  /**
   * Called when a menu item is clicked.
   */
  onNavigationChange: PropTypes.func,
  /**
   * Called when the collapse / expand button is clicked.
   */
  onToggleExpanded: PropTypes.func,
  /**
   * An array containing the data for each menu item.
   *
   * id - the id to be applied to the root element.
   * label - the label to be rendered on the menu item.
   * icon - the icon component.
   * data - sub-menu items
   * href - the url used for navigation.
   * target - the behavior when opening an url.
   */
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      icon: PropTypes.node,
      data: PropTypes.array,
      href: PropTypes.string,
      target: PropTypes.string,
    })
  ).isRequired,
  /**
   * The ID of the selected page.
   */
  selected: PropTypes.string,
  /**
   * Boolean value stating if the panel should be collapsed or expanded.
   */
  expanded: PropTypes.bool,
  /**
   * The top value where the panel will be rendered. Default is 44 as it is the height of the Header component.
   */
  topPosition: PropTypes.number,
  /**
   * The width of the panel when expanded. Default value is 300.
   */
  expandedPanelWidth: PropTypes.number,
  /**
   * The width of the panel when collapsed. Default vlaue is 52.
   */
  collapsedPanelWidth: PropTypes.number,
  /**
   * Position of the component.
   */
  position: PropTypes.oneOf(["static", "relative", "fixed", "absolute", "sticky"]),
};

HvVerticalNavigation.defaultProps = {
  topPosition: 44,
  expandedPanelWidth: 300,
  collapsedPanelWidth: 52,
  position: "fixed",
};

export default withStyles(useStyles, { name: "HvVerticalNavigation" })(HvVerticalNavigation);
