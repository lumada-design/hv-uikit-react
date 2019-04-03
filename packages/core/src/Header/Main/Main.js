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
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import isNill from "lodash/isNil";
import Brand from "../Brand";
import Navigation from "../Navigation";
import User from "../User";
import Actions from "../Actions";

/**
 *
 * @param classes
 * @param navigationData
 * @param selected
 * @param onNavigationClick
 * @param userData
 * @param userIcon
 * @param userClick
 * @param basePath
 * @param companyLogo
 * @param productLogo
 * @param productText
 * @param itemActions
 * @param useRouter
 * @returns {*}
 * @constructor
 */
const Main = ({
  classes,
  position,
  navigationData,
  selected,
  onNavigationClick,
  userData,
  userIcon,
  userClick,
  basePath,
  companyLogo,
  productLogo,
  productText,
  itemActions,
  useRouter
}) => {
  const userExists = !(isNill(userData) && isNill(userIcon));

  return (
    <AppBar color="default" position={position} className={classes.root}>
      <Toolbar variant="dense">
        <Brand
          companyLogo={companyLogo}
          productLogo={productLogo}
          productText={productText}
        />
        <Navigation
          navigationData={navigationData}
          basePath={basePath}
          useRouter={useRouter}
          selected={selected}
          onClick={onNavigationClick}
        />
        <User userData={userData} userIcon={userIcon} onClick={userClick} />
        <Actions userExists={userExists} itemActions={itemActions} />
      </Toolbar>
    </AppBar>
  );
};

Main.propTypes = {
  /**
   * A Jss Object used to override or extend the styles applied to the header.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the component root class.
     */
    root: PropTypes.string
  }).isRequired,
  /**
   * The position property of the header.
   */
  position: PropTypes.PropTypes.oneOf([
    "fixed",
    "absolute",
    "sticky",
    "static",
    "relative"
  ]),
  /**
   * Company logo. Can be a path for a image or a component.
   */
  companyLogo: PropTypes.node,
  /**
   * Product logo. Can be a path for a image or a component.
   */
  productLogo: PropTypes.node,
  /**
   * Product text.
   */
  productText: PropTypes.string,

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
      path: PropTypes.string
    })
  ),
  /**
   * Path to be as base to be concatenated with the pat of the navigation data.
   */
  basePath: PropTypes.string,
  /**
   * Indicates if the router should be used.
   */
  useRouter: PropTypes.bool,
  /**
   * Function when the navigation item is click. It returns the selected index.
   */
  onNavigationClick: PropTypes.func,
  /**
   * Object containing the text to be present
   */
  userData: PropTypes.shape({
    name: PropTypes.string,
    role: PropTypes.string
  }),
  /**
   * Image to be render. If a path is passed an image is render, otherwise the component itself.
   */
  userIcon: PropTypes.node,
  /**
   * Function to be triggered by clicking in any point of container.
   */
  userClick: PropTypes.func,
  /**
   * Array with the components to be render.
   */
  itemActions: PropTypes.arrayOf(PropTypes.element)
};

Main.defaultProps = {
  position: "fixed",

  companyLogo: null,
  productText: null,
  productLogo: null,

  navigationData: [],
  basePath: "",
  onNavigationClick: () => {},
  selected: 0,
  useRouter: false,

  userData: {},
  userIcon: null,
  userClick: null,

  itemActions: []
};

export default Main;
