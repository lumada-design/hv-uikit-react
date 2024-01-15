import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core";
import {
  DropRightXS as Separator,
  MoreOptionsHorizontal as MoreOptions,
} from "@hitachivantara/uikit-react-icons";
import startCase from "lodash/startCase";
import isNil from "lodash/isNil";
import HvTypography from "../Typography";
import HvDropDownMenu from "../DropDownMenu";
import { setId } from "../utils";
import HvLink from "../Link";
import styles from "./styles";

const removeExtension = (label) =>
  label.includes(".") ? label.substring(0, label.lastIndexOf(".")) : label;

const LastPathElement = ({ classes, label }) => (
  <li className={classes.centerContainer}>
    <HvTypography variant="sText">{startCase(removeExtension(label))}</HvTypography>
  </li>
);

LastPathElement.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  label: PropTypes.string.isRequired,
};

const Page = ({ Component, onClick, elem, classes }) => (
  <HvLink
    route={elem.path}
    Component={Component}
    onClick={onClick}
    data={elem}
    classes={{ a: classes.a }}
  >
    <div className={classes.centerContainer}>
      <HvTypography variant="sLink" className={classes.link}>
        {startCase(elem.label)}
      </HvTypography>
    </div>
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
  children: PropTypes.element.isRequired,
};

const pathWithSubMenu = (id, listRoute, maxVisible, dropDownMenuProps) => {
  const nbrElemToSubMenu = listRoute.length - maxVisible;
  const subMenuList = listRoute.slice(1, nbrElemToSubMenu + 1);

  listRoute.splice(
    1,
    nbrElemToSubMenu,
    <HvDropDownMenu
      id={setId(id, "submenu")}
      icon={<MoreOptions />}
      dataList={subMenuList}
      {...dropDownMenuProps}
    />
  );

  return listRoute;
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
      ? pathWithSubMenu(id, listPath, maxVisibleElem, dropDownMenuProps)
      : listPath;

  const lastIndex = breadcrumbPath.length - 1;

  const Component = onClick ? component : undefined;

  return (
    <nav id={id} className={clsx(classes.root, className)} {...others}>
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
    orderedList: PropTypes.string,
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

export default withStyles(styles, { name: "HvBreadCrumb" })(BreadCrumb);
