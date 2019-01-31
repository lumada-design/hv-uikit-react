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
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";

import Link from "../../Link";

const Menu = ({ classes, menuData, basePath, useRouter }) => {
  if (!menuData) return "";

  const menu = menuData.map((elem, i) => {
    const key = `${elem.label}_${i}`;
    const route = `${basePath}${elem.path}`;

    return (
      <Link key={key} route={route} useRouter={useRouter}>
        <ListItem button className={classes.listItem}>
          <div className={classnames(elem.isActive ? classes.selector : "")} />
          <ListItemText
            disableTypography
            className={classnames(
              classes.listItemText,
              elem.isActive ? classes.selected : ""
            )}
          >
            <Typography className={classes.label}>{elem.label}</Typography>
          </ListItemText>
        </ListItem>
      </Link>
    );
  });

  return <List className={classes.menu}>{menu}</List>;
};

Menu.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  menuData: PropTypes.instanceOf(Array),
  basePath: PropTypes.string.isRequired,
  useRouter: PropTypes.bool.isRequired
};

Menu.defaultProps = {
  menuData: null
};

export default Menu;
