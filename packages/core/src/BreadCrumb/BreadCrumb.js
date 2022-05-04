import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@mui/styles";
import { DropRightXS } from "@hitachivantara/uikit-react-icons";
import startCase from "lodash/startCase";
import isNil from "lodash/isNil";
import { HvLink, HvTypography } from "..";
import { pathWithSubMenu, removeExtension } from "./utils";
import styles from "./styles";

const Page = ({ Component, onClick, elem, classes }) => (
  <HvLink
    route={elem.path}
    Component={Component}
    onClick={onClick}
    data={elem}
    classes={{ a: classes.a }}
  >
    <HvTypography noWrap variant="highlightText" className={classes.link}>
      {startCase(elem.label)}
    </HvTypography>
  </HvLink>
);

Page.propTypes = {
  Component: PropTypes.elementType,
  onClick: PropTypes.func,
  elem: PropTypes.shape({
    path: PropTypes.string,
    label: PropTypes.string,
  }).isRequired,
  classes: PropTypes.instanceOf(Object).isRequired,
};

const PathElement = ({ classes, last = false, children }) => (
  <li className={classes.centerContainer}>
    {children}
    {!last && <DropRightXS className={classes.separatorContainer} color="atmo5" />}
  </li>
);

PathElement.propTypes = {
  last: PropTypes.bool,
  classes: PropTypes.instanceOf(Object).isRequired,
  children: PropTypes.element.isRequired,
};

/**
 * A breadcrumb is a graphical control element frequently used as a navigational aid.
 */
const BreadCrumb = (props) => {
  const {
    classes,
    className,
    id,
    listRoute = [],
    maxVisible,
    url,
    onClick,
    component = "div",
    dropDownMenuProps,
    ...others
  } = props;
  const maxVisibleElem = maxVisible < 2 ? 2 : maxVisible;
  let listPath = listRoute.slice();

  // build the listPath object list
  if (!isNil(url)) {
    listPath = [];

    // get the domain
    const baseUrl = url.match(/^.*\/\/[^/]+/, "");

    // get url without domain
    const urlWithoutDomain = url.replace(/^.*\/\/[^/]+/, "");

    const pathNames = urlWithoutDomain.split("/").filter((x) => x);

    pathNames.map((elem, index) =>
      listPath.push({
        label: decodeURI(elem),
        path: `${baseUrl}/${pathNames.slice(0, index + 1).join("/")}`,
      })
    );
  }

  const breadcrumbPath =
    listPath.length > maxVisibleElem
      ? pathWithSubMenu(id, classes, listPath, maxVisibleElem, dropDownMenuProps)
      : listPath;

  return (
    <nav id={id} className={clsx(classes.root, className)} {...others}>
      <ol className={classes.orderedList}>
        {listPath.map((elem, index) => {
          const key = `key_${index}`;
          const isLast = index === breadcrumbPath.length - 1;

          return (
            <PathElement classes={classes} key={key} last={isLast}>
              {(React.isValidElement(elem) && elem) ||
                (isLast && (
                  <HvTypography className={classes.currentPage} variant="normalText">
                    {startCase(removeExtension(elem.label))}
                  </HvTypography>
                )) || (
                  <Page
                    key={key}
                    elem={elem}
                    classes={classes}
                    Component={onClick ? component : undefined}
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
     *  Styles applied to the list.
     */
    orderedList: PropTypes.string,
    /**
     *  Styles applied to the last element.
     */
    currentPage: PropTypes.string,
  }).isRequired,
  /**
   * List of breadcrumb.
   */
  listRoute: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      path: PropTypes.string,
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
  onClick: PropTypes.func,
  /**
   * Props passed down to the DropDownMenu sub-menu component.
   */
  dropDownMenuProps: PropTypes.instanceOf(Object),
};

export default withStyles(styles, { name: "HvBreadCrumb", index: 1 })(BreadCrumb);
