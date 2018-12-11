/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */

import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import HvLink from "../Link";

class NavigationAnchors extends React.Component {
  state = {
    selectedIndex: 0
  };

  handleListItemClick = (event, index) => {
    this.setState({ selectedIndex: index });

    const { href, onClick } = this.props;
    if (!href && onClick) {
      onClick(event, index);
    }
  };

  render() {
    const { classes, options, href } = this.props;
    const { selectedIndex } = this.state;

    return (
      <Drawer
        className={classNames(classes.drawer, classes.dense)}
        variant="persistent"
        anchor="left"
        open
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <List
          dense
          classes={{
            root: classes.listRoot,
            dense: classes.listDense
          }}
        >
          {options.map((option, index) => {
            const listItem = (
              <ListItem
                button
                classes={{
                  selected: classes.listItemSelected,
                  root: classes.listItemRoot,
                  gutters: classes.listItemGutters
                }}
                key={option.label}
                onClick={event => this.handleListItemClick(event, index)}
                selected={selectedIndex === index}
              >
                <ListItemText
                  className={classNames({
                    [classes.listItemTextSelected]: selectedIndex === index
                  })}
                  classes={{
                    dense: classes.listItemTextDense
                  }}
                  primary={option.label}
                />
              </ListItem>
            );

            if (href) {
              return (
                <HvLink
                  href={`#${options[index].value}`}
                  key={option.label}
                >
                  {listItem}
                </HvLink>
              );
            }

            return listItem;
          })}
        </List>
      </Drawer>
    );
  }
}

NavigationAnchors.propTypes = {
  /**
   *  Styles applied to the Drawer Paper element
   */
  classes: PropTypes.instanceOf(Object).isRequired,
  /**
   * An Array of Objects with Label and Value. Label is the displayed Element and Value is the local navigation location applied
   */
  options: PropTypes.arrayOf(
    (propValue, key, componentName, location, propFullName) => {
      if (
        propValue[key].label === undefined ||
        propValue[key].value === undefined
      ) {
        return new Error(
          `Invalid prop "${propFullName}" supplied to "${componentName}". Validation Failed.`
        );
      }
      return null;
    }
  ).isRequired,
  /**
   * True if the href location link should be applied. It will create an a element around every list item
   */
  href: PropTypes.bool,
  /**
   * A callback called on click of every list item, if the href is false
   */
  onClick: PropTypes.func
};

NavigationAnchors.defaultProps = {
  href: true,
  onClick: undefined
};

export default NavigationAnchors;
