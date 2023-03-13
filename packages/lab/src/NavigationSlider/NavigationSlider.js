import React, { useState, useMemo } from "react";
import { withStyles } from "@mui/styles";
import PropTypes from "prop-types";

import { HvVerticalNavigation as HvVerticalNavigationCore } from "@hitachivantara/uikit-react-core";

import Header from "./Header";
import Navigation from "./Navigation";
import { fillDataWithParentId, getNavigationItemById, getParentItemById } from "./utils";

import useStyles from "./styles";

const HvNavigationSlider = ({
  id,
  onNavigationChange,
  data,
  title,
  selected,
  topPosition,
  panelWidth,
  position,
}) => {
  const classes = useStyles({ topPosition, panelWidth, position })();

  const withParentData = useMemo(() => fillDataWithParentId(data), [data]);

  const initialParentItem = useMemo(
    () => getParentItemById(withParentData, selected),
    [withParentData, selected]
  );

  const [parentItem, setParentItem] = useState(initialParentItem);

  const navigateToParentHandler = () => {
    setParentItem(getParentItemById(withParentData, parentItem.id));
  };

  const navigateToTargetHandler = (event, selectedItem) => {
    onNavigationChange(event, selectedItem);
  };

  const navigateToChildHandler = (event, item) => {
    setParentItem(getNavigationItemById(withParentData, item.id));

    event.stopPropagation();
  };

  return (
    <div id={id} className={classes.container}>
      <HvVerticalNavigationCore className={classes.root}>
        <Header
          onBackButtonClick={navigateToParentHandler}
          showBackButton={!!parentItem?.label}
          title={parentItem?.label || title}
        />

        <Navigation
          data={parentItem.data || withParentData}
          selected={selected}
          onNavigateToTarget={navigateToTargetHandler}
          onNavigateToChild={navigateToChildHandler}
        />
      </HvVerticalNavigationCore>
    </div>
  );
};

HvNavigationSlider.propTypes = {
  /**
   * Id to be applied to the root node of the panel.
   */
  id: PropTypes.string,
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * styles object applied to the root
     */
    container: PropTypes.string,
    root: PropTypes.string,
    footer: PropTypes.string,
  }).isRequired,
  /**
   * Called when a menu item is clicked.
   */
  onNavigationChange: PropTypes.func,
  /**
   * An array containing the data for each menu item.
   *
   * id - the id to be applied to the root element.
   * label - the label to be rendered on the menu item.
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
   * The text to be displayed when at the root of the structure.
   */
  title: PropTypes.string,
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
  panelWidth: PropTypes.number,
  /**
   * Position of the component.
   */
  position: PropTypes.oneOf(["static", "relative", "fixed", "absolute", "sticky"]),
};

HvNavigationSlider.defaultProps = {
  topPosition: 44,
  panelWidth: 300,
  position: "fixed",
};

export default withStyles(useStyles, { name: "HvNavigationSlider" })(HvNavigationSlider);
