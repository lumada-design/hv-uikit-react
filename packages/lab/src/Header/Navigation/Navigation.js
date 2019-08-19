/*
 * Copyright 2019 Hitachi Vantara Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import HvTypography from "@hv/uikit-react-core/dist/Typography";

import HvLink from "@hv/uikit-react-core/dist/Link";

/**
 * Check if the index is the passed select header.
 *
 * @param selected
 * @param index
 * @returns {boolean}
 */
const isSelected = (selected, index) => selected === index;

/**
 * Navigation container. Contains the links for navigation. Depending of the option
 * useRouter it creates a div (for route) or a <a href /> for each navigation item.
 *
 * @param classes
 * @param navigationData
 * @param selected
 * @param basePath
 * @param useRouter
 * @param verticalStyles
 * @param onClick
 * @returns {*}
 * @constructor
 */
const Navigation = ({
  classes,
  navigationData,
  selected,
  basePath,
  useRouter,
  verticalStyles,
  onClick
}) => {
  if (!navigationData) return "";

  const menu = navigationData.map((elem, i) => {
    const key = `${elem.label}_${i}`;
    const route = `${basePath}${elem.path}`;
    const iconColors = isSelected(selected, i) ? ["none", "#FFFFFF"] : ["none", "#414141"]

    return (
      <HvLink
        key={key}
        route={route}
        params={elem.params}
        useRouter={useRouter}
        onClick={() => {
          onClick(i);
        }}
      >
        <ListItem
          button
          className={classnames(
            classes.listItem,
            {
              [classes.vListItem]: verticalStyles,
              [classes.vSelector]: isSelected(selected, i) && verticalStyles
            }
          )}
          key={key}
        >
          {!verticalStyles && (
            <div
              className={classnames(
                isSelected(selected, i) ? classes.selector : ""
              )}
            />)}
          {verticalStyles && elem.icon && elem.icon(iconColors)}
          <ListItemText
            key={key}
            disableTypography
            className={classnames(
              classes.listItemText,
              isSelected(selected, i) ? classes.selected : ""
            )}
          >
            <HvTypography className={classnames(
              classes.label,
              isSelected(selected, i) && verticalStyles ? classes.vSelected : ""
            )}
            >
              {elem.label}
            </HvTypography>
          </ListItemText>
        </ListItem>
      </HvLink>
    );
  });

  return (
    <div className={classnames(
      classes.menu, 
      { 
        [classes.vMenu]: verticalStyles 
      }
    )}
    >
      {menu}
    </div>
  );
};

Navigation.propTypes = {
  /**
   * A Jss Object used to override or extend the component styles.
   */
  classes: PropTypes.instanceOf(Object).isRequired,
  /**
   * The index of the selected navigation item.
   */
  selected: PropTypes.number,
  /**
   * The data used for creating the navigation item.
   */
  navigationData: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      path: PropTypes.string,
      /**
       * Function to return an icon for each nav item. 
       * Takes in array of color values to be applied to the icon
       */
      icon: PropTypes.func
    })
  ),
  /**
   * Path to be as base to be concatenated with the pat of the navigation data.
   */
  basePath: PropTypes.string.isRequired,
  /**
   * Indicates if the router should be used.
   */
  useRouter: PropTypes.bool.isRequired,
  /**
   * TODO:
   */
  verticalStyles: PropTypes.bool,
  /**
   * Function when the navigation item is click. It returns the selected index.
   */
  onClick: PropTypes.func
};

Navigation.defaultProps = {
  navigationData: null,
  selected: null,
  verticalStyles: false,
  onClick: () => {}
};

export default Navigation;
