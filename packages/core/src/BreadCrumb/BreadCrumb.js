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
import classNames from "classnames";
import Separator from "@hv/uikit-react-icons/dist/DawnTheme/DropRight.XS";
import MoreOptions from "@hv/uikit-react-icons/dist/DawnTheme/MoreOptionsHorizontal.S";
import startCase from "lodash/startCase";
import isNil from "lodash/isNil";
import HvTypography from "../Typography";
import HvDropDownMenu from "../DropDownMenu";
import HvLink from "../Link";

/**
 * Removes the extension of the label.
 *
 * @param label
 * @returns {string | *}
 */
const removeExtension = label =>
  label.includes(".") ? label.substring(0, label.lastIndexOf(".")) : label;

/**
 * Representation of last path element. This element doesn't have a link.
 *
 * @param label
 * @returns {*}
 * @constructor
 */
const LastPathElement = ({ label }) => (
  <HvTypography variant="sText">
    {startCase(removeExtension(label))}
  </HvTypography>
);

LastPathElement.propTypes = {
  label: PropTypes.string.isRequired
};

/**
 * Representation of an path element. This element contains a link.
 *
 * @param useRouter
 * @param elem
 * @param classes
 * @returns {*}
 * @constructor
 */
const Page = ({ useRouter, elem, classes }) => (
  <HvLink route={elem.path} params={elem.params} useRouter={useRouter}>
    <div className={classes.centerContainer}>
      <HvTypography variant="sLink" className={classes.link}>
        {startCase(elem.label)}
      </HvTypography>
    </div>
  </HvLink>
);

Page.propTypes = {
  useRouter: PropTypes.bool.isRequired,
  elem: PropTypes.shape({
    path: PropTypes.string,
    params: PropTypes.instanceOf(Object),
    label: PropTypes.string
  }).isRequired,
  classes: PropTypes.instanceOf(Object).isRequired
};

/**
 * Container of the intermediates path elements with the separator.
 *
 * @param classes
 * @param children
 * @returns {*}
 * @constructor
 */
const PathElement = ({ classes, children }) => (
  <div className={classes.centerContainer}>
    {children}
    <div className={classes.separator}>
      <Separator />
    </div>
  </div>
);

PathElement.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  children: PropTypes.element.isRequired
};

/**
 * Helper function to build a new path list with one element with the list for the submenu.
 *
 * @param useRouter
 * @param listRoute
 * @param maxVisible
 * @returns {*}
 */
const pathWithSubMenu = (useRouter, listRoute, maxVisible) => {
  const nbrElemToSubMenu = listRoute.length - maxVisible;
  const subMenuList = listRoute.slice(1, nbrElemToSubMenu + 1);

  listRoute.splice(
    1,
    nbrElemToSubMenu,
    <HvDropDownMenu icon={<MoreOptions />} dataList={subMenuList} />
  );

  return listRoute;
};

/**
 * Breadcrumb element.
 *
 * @param classes
 * @param useRouter
 * @param listRoute
 * @param maxVisible
 * @returns {*}
 * @constructor
 */
const BreadCrumb = ({
  classes,
  className,
  id,
  useRouter,
  listRoute,
  maxVisible,
  url
}) => {
  const maxVisibleElem = maxVisible < 2 ? 2 : maxVisible;
  let listPath = listRoute.slice();

  // build the listPath object list
  if (!isNil(url)) {
    listPath = [];

    // get the domain
    const baseUrl = !useRouter ? url.match(/^.*\/\/[^/]+/, "") : "";

    // get url without domain
    const urlWithoutDomain = url.replace(/^.*\/\/[^/]+/, "");

    const pathNames = urlWithoutDomain.split("/").filter(x => x);

    pathNames.map((elem, index) =>
      listPath.push({
        label: decodeURI(elem),
        path: `${baseUrl}/${pathNames.slice(0, index + 1).join("/")}`
      })
    );
  }

  const breadcrumbPath =
    listPath.length > maxVisibleElem
      ? pathWithSubMenu(useRouter, listPath, maxVisibleElem)
      : listPath;

  const lastIndex = breadcrumbPath.length - 1;

  return (
    <div id={id} className={classNames(classes.root, className)}>
      {listPath.map((elem, index) => {
        const key = `key_${index}`;

        return index === lastIndex ? (
          <LastPathElement label={elem.label} key={key} />
        ) : (
          <PathElement classes={classes} key={key}>
            {typeof elem.type === "function" ? (
              <>{elem}</>
            ) : (
              <Page
                key={key}
                useRouter={useRouter}
                elem={elem}
                classes={classes}
              />
            )}
          </PathElement>
        );
      })}
    </div>
  );
};
BreadCrumb.propTypes = {
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
    root: PropTypes.string,
    /**
     * Styles applied to the links.
     */
    link: PropTypes.string,
    /**
     *  Styles applied to the separator.
     */
    separator: PropTypes.string
  }).isRequired,
  /**
   * Should use the router.
   */
  useRouter: PropTypes.bool,
  /**
   * List of breadcrumb.
   */
  listRoute: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      path: PropTypes.string
    })
  ),
  /**
   * URL to build the breadcrumb.
   */
  url: PropTypes.string,
  /**
   * Number of pages visible.
   */
  maxVisible: PropTypes.number
};

BreadCrumb.defaultProps = {
  className: "",
  id: undefined,
  useRouter: false,
  maxVisible: 9999,
  listRoute: [],
  url: null
};

export default BreadCrumb;
