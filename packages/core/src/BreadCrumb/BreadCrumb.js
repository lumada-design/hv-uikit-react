import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core";
import Separator from "@hv/uikit-react-icons/dist/DropRightXS";
import MoreOptions from "@hv/uikit-react-icons/dist/MoreOptionsHorizontal";
import startCase from "lodash/startCase";
import isNil from "lodash/isNil";
import uniqueId from "lodash/uniqueId";
import HvTypography from "../Typography";
import HvDropDownMenu from "../DropDownMenu";
import HvLink from "../Link";
import styles from "./styles";

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
const LastPathElement = ({ classes, label }) => (
  <li className={classes.centerContainer}>
    <HvTypography variant="sText">{startCase(removeExtension(label))}</HvTypography>
  </li>
);

LastPathElement.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  label: PropTypes.string.isRequired
};

/**
 * Representation of an path element. This element contains a link.
 *
 * @param Component
 * @param onClick
 * @param elem
 * @param classes
 * @returns {*}
 * @constructor
 */
const Page = ({ Component, onClick, elem, classes }) => {
  return (
    <HvLink route={elem.path} Component={Component} onClick={onClick} data={elem}>
      <div className={classes.centerContainer}>
        <HvTypography variant="sLink" className={classes.link}>
          {startCase(elem.label)}
        </HvTypography>
      </div>
    </HvLink>
  );
};

Page.propTypes = {
  Component: PropTypes.elementType,
  onClick: PropTypes.func,
  elem: PropTypes.shape({
    path: PropTypes.string,
    label: PropTypes.string
  }).isRequired,
  classes: PropTypes.instanceOf(Object).isRequired
};

Page.defaultProps = {
  Component: undefined,
  onClick: undefined
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
  <li className={classes.centerContainer}>
    {children}
    <div className={classes.separator} aria-hidden>
      <Separator className={classes.separatorContainer} />
    </div>
  </li>
);

PathElement.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  children: PropTypes.element.isRequired
};

/**
 * Helper function to build a new path list with one element with the list for the submenu.
 *
 * @param listRoute
 * @param maxVisible
 * @returns {*}
 */
const pathWithSubMenu = (listRoute, maxVisible) => {
  const nbrElemToSubMenu = listRoute.length - maxVisible;
  const subMenuList = listRoute.slice(1, nbrElemToSubMenu + 1);

  listRoute.splice(
    1,
    nbrElemToSubMenu,
    <HvDropDownMenu
      style={{ width: 32, height: 32 }}
      icon={<MoreOptions />}
      dataList={subMenuList}
      aria-label="dropdownMenu"
    />
  );

  return listRoute;
};

/**
 * Breadcrumb element.
 *
 * @param classes
 * @param listRoute
 * @param maxVisible
 * @returns {*}
 * @constructor
 */
const BreadCrumb = ({
  classes,
  className,
  id,
  listRoute,
  maxVisible,
  url,
  onClick,
  component,
  ...other
}) => {
  const maxVisibleElem = maxVisible < 2 ? 2 : maxVisible;
  let listPath = listRoute.slice();

  const internalId = id || uniqueId("hv-breadcrumb-");

  // build the listPath object list
  if (!isNil(url)) {
    listPath = [];

    // get the domain
    const baseUrl = url.match(/^.*\/\/[^/]+/, "");

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
    listPath.length > maxVisibleElem ? pathWithSubMenu(listPath, maxVisibleElem) : listPath;

  const lastIndex = breadcrumbPath.length - 1;

  const Component = onClick ? component : undefined;

  return (
    <nav id={internalId} className={clsx(classes.root, className)} {...other}>
      <ol className={classes.orderedList}>
        {listPath.map((elem, index) => {
          const key = `key_${index}`;

          return index === lastIndex ? (
            <LastPathElement classes={classes} label={elem.label} key={key} />
          ) : (
            <PathElement classes={classes} key={key}>
              {React.isValidElement(elem) ? (
                elem
              ) : (
                <Page
                  key={key}
                  elem={elem}
                  classes={classes}
                  Component={Component}
                  onClick={onClick}
                />
              )}
            </PathElement>
          );
        })}
      </ol>
    </nav>
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
    separator: PropTypes.string,
    /**
     *  Styles applied to the list.
     */
    orderedList: PropTypes.string
  }).isRequired,
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
  maxVisible: PropTypes.number,
  /**
   * The component used for the link node.
   * Either a string to use a DOM element or a component.
   */
  component: PropTypes.elementType,
  /**
   * Function passed to the component. If defined the component prop is used as the link node.
   */
  onClick: PropTypes.func
};

BreadCrumb.defaultProps = {
  className: "",
  id: undefined,
  maxVisible: 9999,
  listRoute: [],
  url: null,
  component: "div",
  onClick: undefined
};

export default withStyles(styles, { name: "HvBreadCrumb" })(BreadCrumb);
