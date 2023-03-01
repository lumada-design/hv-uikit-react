import React from "react";
import { withStyles } from "@mui/styles";
import PropTypes from "prop-types";

import { HvListContainer, HvListItem, HvButton } from "@hitachivantara/uikit-react-core";
import { DropRightXS } from "@hitachivantara/uikit-react-icons";

import styles from "./styles";

const Navigation = ({ id, classes, data, selected, onNavigateToTarget, onNavigateToChild }) => {
  return (
    <HvListContainer interactive id={id}>
      {data.map((item) => (
        <HvListItem
          key={item.id}
          classes={{
            root: classes.listItemRoot,
            selected: classes.listItemSelected,
          }}
          onClick={(event) => onNavigateToTarget(event, item)}
          selected={selected === item.id}
          startAdornment={item.icon}
          endAdornment={
            item.data && item.data.length > 0 ? (
              <HvButton icon onClick={(event) => onNavigateToChild(event, item)}>
                <DropRightXS />
              </HvButton>
            ) : (
              <div />
            )
          }
        >
          <span>{item.label}</span>
        </HvListItem>
      ))}
    </HvListContainer>
  );
};

Navigation.propTypes = {
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
    listItemRoot: PropTypes.string,
    listItemSelected: PropTypes.string,
  }).isRequired,
  /**
   * An array containing the data for each menu item.
   *
   * id - the id to be applied to the root element.
   * label - the label to be rendered on the menu item.
   * icon - the icon react element
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
   * The selected item id.
   */
  selected: PropTypes.string,
  /**
   * Triggered when the item is clicked.
   */
  onNavigateToTarget: PropTypes.func,
  /**
   * Triggered when the navigate to child button is clicked.
   */
  onNavigateToChild: PropTypes.func,
};

export default withStyles(styles, { name: "Navigation" })(Navigation);
