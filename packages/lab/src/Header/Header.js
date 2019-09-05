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
import classNames from "classnames";
import deprecatedPropType from "@material-ui/core/utils/deprecatedPropType";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import isNill from "lodash/isNil";
import MenuS from "@hv/uikit-react-icons/dist/Menu.S";
import Brand from "./Brand";
import Navigation from "./Navigation";
import User from "./User";
import Actions from "./Actions";

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
  className,
  id,
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
  label,
  labels,
  itemActions,
  useRouter
}) => {
  const [showNav, toggleNav] = useState(false);
  const userExists = !(isNill(userData) && isNill(userIcon));


  return (
    <AppBar
      color="default"
      position={position}
      className={classNames(classes.root, className)}
      id={id}
    >
      <Toolbar variant="dense">
        <MenuS
          className={classes.navButton}
          onClick={() => toggleNav(!showNav)}
        />
        <Brand
          companyLogo={companyLogo}
          productLogo={productLogo}
          productText={productText || label || labels.productName}
        />
        <div className={classes.navContainer}>
          <Navigation
            navigationData={navigationData}
            basePath={basePath}
            useRouter={useRouter}
            selected={selected}
            onClick={onNavigationClick}
          />
        </div>
        <div className={classes.hidden}>
          <User
            labels={labels}
            userData={userData}
            userIcon={userIcon}
            onClick={userClick}
          />
          <Actions userExists={userExists} itemActions={itemActions} />
        </div>
      </Toolbar>
      <div
        className={classNames(
          classes.verticalNav,
          showNav ? classes.showNav : ""
        )}
      >
        <Navigation
          navigationData={navigationData}
          basePath={basePath}
          useRouter={useRouter}
          selected={selected}
          onClick={onNavigationClick}
          verticalStyles
        />
        <div className={classes.userAction}>
          <User
            labels={labels}
            userData={userData}
            userIcon={userIcon}
            onClick={userClick}
            verticalStyles
          />
          <Actions
            userExists={userExists}
            itemActions={itemActions}
            verticalStyles
          />
        </div>
      </div>
    </AppBar>
  );
};

Main.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * Id to be applied to the root node.
   */
  id: PropTypes.string,
  /**
   * A Jss Object used to override or extend the styles applied.
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
   * @deprecated Instead use the label property
   */
  productText: deprecatedPropType(
    PropTypes.string,
    "Instead use the label title property"
  ),
  /**
   * Product text.
   */
  label: PropTypes.string,
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
   * Object containing the labels to be present
   */
  labels: PropTypes.shape({
    productName: PropTypes.string,
    tenantName: PropTypes.string
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
  itemActions: PropTypes.arrayOf(
    PropTypes.shape({
      /**
       * Component to be rendered
       */
      action: PropTypes.element,
      /**
       * Text corresponding to the component to be rendered
       */
      label: PropTypes.string
    })
  )
};

Main.defaultProps = {
  className: "",
  id: undefined,
  position: "fixed",

  companyLogo: null,
  label: null,
  productText: undefined,
  productLogo: null,
  labels: {},

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
