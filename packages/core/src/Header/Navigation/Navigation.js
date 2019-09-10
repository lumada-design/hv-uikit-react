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

import React, { useState } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import isNil from "lodash/isNil";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { KeyboardCodes, isKeypress } from "@hv/uikit-common-utils/dist";
import Slide from "react-reveal/Slide"; // Importing Zoom effect
import HvTypography from "../../Typography";

import HvLink from "../../Link";

/**
 * Check if the index is the passed select header.
 *
 * @param selectedIndex
 * @param index
 * @returns {boolean}
 */
const isSelected = (selectedIndex, index) => selectedIndex === index;

const getSuperIndex = selectedArray => {
  if (Array.isArray(selectedArray)) return selectedArray[0];
  if (Number.isInteger(selectedArray)) return selectedArray;
  return null;
};

const getSubIndex = selectedArray =>
  Array.isArray(selectedArray) ? selectedArray[1] : null;

const mapNavigationData = (
  classes,
  navigationData,
  selected,
  basePath,
  useRouter,
  onClick,
  onKeyDown,
  reference,
  setHoveredIndex,
  superIndex
) =>
  navigationData.map((elem, i) => {
    const key = `${elem.label}_${i}`;
    const route = `${basePath}${elem.path}`;
    return (
      <HvLink
        className={classnames(
          isSelected(selected, i)
            ? classes.selectedButton
            : classes.notSelectedButton
        )}
        key={key}
        route={route}
        params={elem.params}
        useRouter={useRouter}
        onClick={e => {
          if (isNil(superIndex)) {
            if (navigationData[i].subData) return;
            onClick(i, -1, e);
            return;
          }
          onClick(superIndex, i, e);
        }}
        onMouseEnter={() => {
          setHoveredIndex(i);
        }}
        onFocus={() => {
          setHoveredIndex(i);
        }}
        onKeyDown={e => {
          if (isNil(superIndex)) {
            onKeyDown(i, -1, e);
          } else {
            onKeyDown(superIndex, i, e);
          }
          if (
            !isNil(navigationData[i].subData) &&
            (isKeypress(e, KeyboardCodes.Enter) ||
              isKeypress(e, KeyboardCodes.ArrowDown))
          ) {
            const subListItems = reference.getElementsByClassName(
              classes.subListItem
            );
            subListItems[0].parentElement.focus();
          }
        }}
      >
        <ListItem
          button
          className={classnames(
            superIndex
              ? [classes.subListItem, classes.listItem]
              : classes.listItem
          )}
          key={key}
          tabIndex={-1}
        >
          <ListItemText
            key={key}
            disableTypography
            className={classnames(
              classes.listItemText,
              isSelected(selected, i) ? classes.selected : ""
            )}
          >
            <HvTypography className={classes.label}>{elem.label}</HvTypography>
          </ListItemText>
        </ListItem>
      </HvLink>
    );
  });

const getSubMenu = (
  classes,
  hoveredIndex,
  navigationData,
  superIndex,
  subIndex,
  basePath,
  useRouter,
  onClick,
  onKeyDown,
  reference,
  selected
) => {
  let subMenu = null;
  if (hoveredIndex !== -1) {
    subMenu =
      !isNil(navigationData[hoveredIndex].subData) &&
      Array.isArray(navigationData[hoveredIndex].subData.data)
        ? mapNavigationData(
            classes,
            navigationData[hoveredIndex].subData.data,
            subIndex,
            basePath,
            useRouter,
            onClick,
            onKeyDown,
            reference,
            () => {},
            hoveredIndex
          )
        : null;
  } else if (
    Array.isArray(selected) &&
    !isNil(navigationData[superIndex]) &&
    !isNil(navigationData[superIndex].subData) &&
    !isNil(navigationData[superIndex].subData.data)
  ) {
    subMenu = mapNavigationData(
      classes,
      navigationData[superIndex].subData.data,
      subIndex,
      basePath,
      useRouter,
      onClick,
      onKeyDown,
      reference,
      () => {},
      superIndex
    );
  }
  return subMenu;
};

/**
 * Navigation container. Contains the links for navigation. Depending of the option
 * useRouter it creates a div (for route) or a <a href /> for each navigation item.
 *
 * @param classes
 * @param navigationData
 * @param selected
 * @param basePath
 * @param useRouter
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
  onClick,
  onKeyDown
}) => {
  if (!navigationData) {
    return <div className={classes.emptyContainer} />;
  }

  const selectedSuperIndex = getSuperIndex(selected);
  const SubIndex = getSubIndex(selected);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [reference, setSubMenuReference] = useState(null);

  const menu = mapNavigationData(
    classes,
    navigationData,
    selectedSuperIndex,
    basePath,
    useRouter,
    onClick,
    onKeyDown,
    reference,
    setHoveredIndex
  );

  const subMenu = getSubMenu(
    classes,
    hoveredIndex,
    navigationData,
    selectedSuperIndex,
    SubIndex,
    basePath,
    useRouter,
    onClick,
    onKeyDown,
    reference,
    selected
  );

  return (
    <div
      className={classes.navigationContainer}
      onMouseLeave={() => {
        setHoveredIndex(-1);
      }}
      ref={node => {
        setSubMenuReference(node);
      }}
    >
      <div className={classes.menuContainer}>
        <div className={classes.menu}>{menu}</div>
      </div>
      <div className={classes.subMenuCurtain} />
      <Slide top duration={500} when={!isNil(subMenu)}>
        {!isNil(subMenu) && (
          <div className={classes.subMenuContainer}>
            <div className={classnames([classes.menu, classes.subMenu])}>
              {subMenu}
            </div>
          </div>
        )}
      </Slide>
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
  selected: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number)
  ]),
  /**
   * The data used for creating the navigation item.
   */
  navigationData: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      path: PropTypes.string,
      subData: PropTypes.shape({
        data: PropTypes.arrayOf(
          PropTypes.shape({
            label: PropTypes.string,
            path: PropTypes.string
          })
        )
      })
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
   * Function when the navigation item is click. It returns the selected index.
   */
  onClick: PropTypes.func,
  /**
   * Function when the navigation item is pressed. It returns the selected index.
   */
  onKeyDown: PropTypes.func
};

Navigation.defaultProps = {
  navigationData: null,
  selected: null,
  onClick: () => {},
  onKeyDown: () => {}
};

export default Navigation;
