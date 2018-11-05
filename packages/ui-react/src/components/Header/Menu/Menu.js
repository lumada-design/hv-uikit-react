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
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Link from "../../Link";
import styles from "./styles";

const Menu = ({ classes, data, useRouter }) => {
  const menu = data.map((elem,i) => {
    const key = `${elem.label}_${i}`;

    return (
      <Link key={key} href={elem.path} useRouter={useRouter}>
        <ListItem button className={classes.listItem}>
          <div className={classnames(elem.isActive ? classes.selector : "")}/>
          <ListItemText
            disableTypography
            className={classnames(
              classes.listItemText,
              elem.isActive ? classes.selected : ""
            )}
          >
            <Typography className={classes.label}>
              {elem.label}
            </Typography>
          </ListItemText>
        </ListItem>
      </Link>
    )
  });

  return <List className={classes.menu}>{menu}</List>;
};

Menu.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  data: PropTypes.instanceOf(Array).isRequired,
  useRouter: PropTypes.bool
};

Menu.defaultProps = {
  useRouter: false
};

export default withStyles(styles, { withTheme: true })(Menu);
