import React, { useState } from "react";
import { withStyles } from "@mui/styles";
import PropTypes from "prop-types";
import clsx from "clsx";

import {
  HvVerticalNavigation as HvVerticalNavigationCore,
  HvVerticalNavigationTree,
  HvVerticalNavigationActions,
  HvButton,
  setId,
} from "@hitachivantara/uikit-react-core";
import { Backwards, Forwards } from "@hitachivantara/uikit-react-icons";

import useStyles from "./styles";

const HvVerticalNavigation = ({
  id,
  onNavigationChange,
  data,
  selected,
  collapseLabel,

  topPosition,
  expandedPanelWidth,
  collapsedPanelWidth,
  position,
}) => {
  const classes = useStyles({ topPosition, expandedPanelWidth, collapsedPanelWidth, position })();

  const [isExpanded, setIsExpanded] = useState(true);

  const handleVerticalNavigationChange = (event, item) => {
    onNavigationChange?.(event, item);
  };

  const handleExpandToggle = () => {
    setIsExpanded((prevState) => !prevState);
  };

  return (
    <HvVerticalNavigationCore
      className={clsx(classes.panel, {
        [classes.panelExpanded]: isExpanded,
        [classes.panelCollapsed]: !isExpanded,
      })}
    >
      <HvVerticalNavigationTree
        collapsible
        data={data}
        selected={selected}
        onChange={handleVerticalNavigationChange}
      />

      <HvVerticalNavigationActions>
        <HvButton
          id={setId(id, "button-toggle")}
          className={clsx({
            [classes.collapseButton]: isExpanded,
            [classes.expandButton]: !isExpanded,
          })}
          category="ghost"
          startIcon={isExpanded ? <Backwards iconSize="XS" /> : <Forwards iconSize="XS" />}
          onClick={handleExpandToggle}
        >
          {isExpanded && <span className={classes.collapseTextContainer}>{collapseLabel}</span>}
        </HvButton>
      </HvVerticalNavigationActions>
    </HvVerticalNavigationCore>
  );
};

HvVerticalNavigation.propTypes = {
  /**
   * Id to be applied to the root node of the panel.
   */
  id: PropTypes.string,
  /**
   * Called when a menu item is clicked.
   */
  onNavigationChange: PropTypes.func,
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
   * Text to be displayed in the collpase area when the panel is expanded.
   */
  collapseLabel: PropTypes.string,
  /**
   * The ID of the selected page.
   */
  selected: PropTypes.string,
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
  collapseLabel: "Collapse",
  topPosition: 44,
  expandedPanelWidth: 300,
  collapsedPanelWidth: 52,
  position: "fixed",
};

export default withStyles(useStyles, { name: "HvVerticalNavigation" })(HvVerticalNavigation);
