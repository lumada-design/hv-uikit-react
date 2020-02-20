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
import OutsideClickHandler from "react-outside-click-handler";
import deprecatedPropType from "@material-ui/core/utils/deprecatedPropType";
import { AppBar, Toolbar, useMediaQuery, useTheme } from "@material-ui/core";
import isNill from "lodash/isNil";
import isEqual from "lodash/isEqual";
import isEmpty from "lodash/isEmpty";
import map from "lodash/map";

import Menu from "@hv/uikit-react-icons/dist/Generic/Menu";
import Close from "@hv/uikit-react-icons/dist/Generic/Close";

import { KeyboardCodes, isKeypress } from "@hv/uikit-common-utils/dist";

import HvVerticalNavigation from "../VerticalNavigation";

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
const Header = ({
  classes,
  className,
  id,
  position,
  navigationStructure,
  navigationData,
  selected,
  onNavigationClick,
  onNavigationKeyDown,
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
  useRouter,
  responsivenessConfig,
  fixVerticalNavigation,
  actionValues
}) => {
  const [showNav, toggleNav] = useState(false);
  const userExists = !(isNill(userData) && isNill(userIcon));
  const theme = useTheme();
  const showHbMenu = useMediaQuery(
    theme.breakpoints.down(responsivenessConfig.showHbMenus)
  );
  const showNavigation = useMediaQuery(
    theme.breakpoints.up(responsivenessConfig.showNavigation)
  );
  const showUser = !useMediaQuery(
    theme.breakpoints.down(responsivenessConfig.showUser)
  );
  const showActions = !useMediaQuery(
    theme.breakpoints.down(responsivenessConfig.showActions)
  );
  const centerAlignElement = useMediaQuery(
    theme.breakpoints.down(responsivenessConfig.centerAlignElement)
  );

  const navigationMapper = (navStructure, navData) => {
    if (isNill(navData)) {
      return navStructure;
    }

    return {
      showSearch: false,
      data: navData
    };
  };

  const actionItemMapper =
    !isNill(actionValues) && Array.isArray(actionValues)
      ? map(actionValues, actionValue => actionValue.horizontalItemAction)
      : undefined;

  const checkUserDeprecatedProps = (lbls, uData, uIcon, onClk) =>
    !isNill(lbls) && !isNill(uData) && !isNill(uIcon) && !isNill(onClk);

  const defineHeaderActions = (itemAction, userExist, actionValue) => {
    if (userExist || (Array.isArray(itemAction) && !itemAction.length < 1)) {
      return undefined;
    }
    return actionValue;
  };

  const getNavigationData = (navStructure, navData) => {
    if (!isNill(navData)) {
      return navData;
    }
    const defaultData = {
      showSearch: false,
      data: [
        {
          id: undefined,
          label: "",
          selected: false,
          isHidden: false,
          leftIcon: null,
          iconCallback: undefined,
          showNavIcon: false,
          path: "",
          params: {},
          subData: {
            showSearch: false,
            data: [
              {
                label: "",
                path: ""
              }
            ]
          }
        }
      ]
    };
    if (isEmpty(navStructure.data) || isEqual(navStructure, defaultData)) {
      return null;
    }
    return navStructure.data;
  };
  const navData = getNavigationData(navigationStructure, navigationData);

  return (
    <div className={classes.shadowPadding}>
      <AppBar
        color="default"
        position={position}
        className={classNames(classes.root, className)}
        id={id}
      >
        <Toolbar variant="dense">
          {showHbMenu && !(isNill(navData) && isNill(actionItemMapper)) ? (
            <div
              role="button"
              className={classes.navButton}
              onClick={() => toggleNav(!showNav)}
              onKeyDown={e => {
                if (isKeypress(e, KeyboardCodes.Enter)) toggleNav(!showNav);
              }}
              tabIndex={0}
            >
              {showNav ? <Close iconSize="S" /> : <Menu iconSize="S" />}
            </div>
          ) : (
            ""
          )}
          <Brand
            centerAlignElement={centerAlignElement}
            companyLogo={companyLogo}
            productLogo={productLogo}
            productText={productText || label || labels.productName}
          />
          {showNavigation &&
          (navigationStructure.data.length > 0 || navigationData.length > 0) ? (
            <Navigation
              navigationData={navData}
              basePath={basePath}
              useRouter={useRouter}
              selected={selected}
              onKeyDown={onNavigationKeyDown}
              onClick={onNavigationClick}
            />
          ) : (
            ""
          )}
          {showUser &&
          checkUserDeprecatedProps(labels, userData, userIcon, userClick) ? (
            <User
              labels={labels}
              userData={userData}
              userIcon={userIcon}
              onClick={userClick}
            />
          ) : (
            ""
          )}
          {showActions ? (
            <Actions
              userExists={userExists}
              itemActions={actionItemMapper || itemActions}
            />
          ) : (
            ""
          )}
        </Toolbar>
      </AppBar>
      {showNav &&
      showHbMenu &&
      !(isNill(navData) && isNill(actionItemMapper)) ? (
        <OutsideClickHandler
          useCapture
          onOutsideClick={() => setTimeout(() => toggleNav(false), 0)}
        >
          <div
            className={classNames(classes.verticalNavigationContainer, {
              [classes.verticalNavigationContainerFixed]: fixVerticalNavigation,
              [classes.verticalNavigationContainerAbsolute]: !fixVerticalNavigation
            })}
          >
            <HvVerticalNavigation
              className={classes.verticalNavigationSeparation}
              values={
                isNill(navData)
                  ? undefined
                  : navigationMapper(navigationStructure, navigationData)
              }
              actionValues={defineHeaderActions(
                itemActions,
                checkUserDeprecatedProps(labels, userData, userIcon, userClick),
                actionValues
              )}
              onClickAction={item => {
                item.onVerticalClick();
              }}
            />
          </div>
        </OutsideClickHandler>
      ) : (
        ""
      )}
    </div>
  );
};

Header.propTypes = {
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
   * Props passed to the navigation component
   */
  navigationStructure: PropTypes.shape({
    showSearch: PropTypes.bool,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        label: PropTypes.string.isRequired,
        selected: PropTypes.bool,
        isHidden: PropTypes.bool,
        leftIcon: deprecatedPropType(
          PropTypes.func,
          "Use iconCallback instead"
        ),
        iconCallback: PropTypes.func,
        showNavIcon: PropTypes.bool,
        path: PropTypes.string,
        params: PropTypes.instanceOf(Object),
        subData: PropTypes.shape({
          data: PropTypes.arrayOf(
            PropTypes.shape({
              label: PropTypes.string,
              path: PropTypes.string
            })
          )
        })
      })
    )
  }),
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
  navigationData: deprecatedPropType(
    PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        path: PropTypes.string,
        subData: PropTypes.arrayOf(
          PropTypes.shape({
            label: PropTypes.string,
            path: PropTypes.string
          })
        )
      })
    ),
    "use navigationStructure instead"
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
   * Function when the navigation item detects a keydown. It returns the index.
   */
  onNavigationKeyDown: PropTypes.func,
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
  itemActions: deprecatedPropType(
    PropTypes.arrayOf(PropTypes.element),
    "if using this prop, responsiveness might be compromised, use actionValues instead"
  ),
  /**
   * Array with responsiveness breakpoints for components.
   * *  - Accepted values:
   *    --"xs",
   *    --"sm",
   *    --"md",
   *    --"lg",
   *    --"xl",
   */
  responsivenessConfig: PropTypes.shape({
    showHbMenus: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"]),
    showNavigation: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"]),
    showUser: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"]),
    showActions: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"]),
    centerAlignElement: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"])
  }),
  /**
   * Property set for actions to be displayed in the Vertical Navigation.
   */
  actionValues: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string.isRequired,
      selected: PropTypes.bool,
      isHidden: PropTypes.bool,
      leftIcon: deprecatedPropType(PropTypes.func, "Use iconCallback instead"),
      iconCallback: PropTypes.func,
      showNavIcon: PropTypes.bool,
      subData: PropTypes.object,
      path: PropTypes.string,
      onVerticalClick: PropTypes.func,
      params: PropTypes.instanceOf(Object),
      horizontalItemAction: PropTypes.node
    })
  ),
  fixVerticalNavigation: PropTypes.bool
};

Header.defaultProps = {
  className: "",
  id: undefined,
  position: "fixed",
  companyLogo: null,
  label: null,
  productText: undefined,
  productLogo: null,
  labels: {},

  navigationStructure: {
    showSearch: false,
    data: [
      {
        id: undefined,
        label: "",
        selected: false,
        isHidden: false,
        leftIcon: null,
        iconCallback: undefined,
        showNavIcon: false,
        path: "",
        params: {},
        subData: {
          showSearch: false,
          data: [
            {
              label: "",
              path: ""
            }
          ]
        }
      }
    ]
  },

  navigationData: undefined,
  basePath: "",
  onNavigationClick: () => {},
  onNavigationKeyDown: () => {},
  selected: 0,
  useRouter: false,

  userData: {},
  userIcon: null,
  userClick: null,

  itemActions: null,
  responsivenessConfig: {
    showHbMenus: "sm",
    showNavigation: "md",
    showUser: "sm",
    showActions: "sm",
    centerAlignElement: "sm"
  },
  actionValues: null,
  fixVerticalNavigation: false
};

export default Header;
