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
import classnames from "classnames";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";

import Link from "../../Link";

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
  onClick
}) => {
  if (!navigationData) return "";

  const menu = navigationData.map((elem, i) => {
    const key = `${elem.label}_${i}`;
    const route = `${basePath}${elem.label}`;

    return (
      <Link
        key={key}
        route={route}
        params={elem.params}
        useRouter={useRouter}
        onClick={() => {
          onClick(i);
        }}
      >
        <ListItem button className={classes.listItem} key={key}>
          <div
            className={classnames(
              isSelected(selected, i) ? classes.selector : ""
            )}
          />
          <ListItemText
            key={key}
            disableTypography
            className={classnames(
              classes.listItemText,
              isSelected(selected, i) ? classes.selected : ""
            )}
          >
            <Typography className={classes.label}>{elem.label}</Typography>
          </ListItemText>
        </ListItem>
      </Link>
    );
  });

  return <div className={classes.menu}>{menu}</div>;
};

Navigation.propTypes = {
  /**
   * A Jss Object used to override or extend the styles applied to the button.
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
      path: PropTypes.string
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
  onClick: PropTypes.func
};

Navigation.defaultProps = {
  navigationData: null,
  selected: null,
  onClick: () => {}
};

export default Navigation;
