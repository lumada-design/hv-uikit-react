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
import classNames from "classnames";
import withStyles from "@material-ui/core/styles/withStyles";
import IconButton from "@material-ui/core/IconButton";
import Link from "../../Link";
import styles from "./styles";

import SettingsButton from "@material-ui/icons/SettingsOutlined";

const Settings = ({
  classes,
  settingsData,
  userData,
  basePath,
  useRouter,
  dropDown,
  onClick,
  settingsMenuRef
}) => {
  if (!settingsData || !userData) return "";

  const settingsMenu = settingsData.map((elem, i) => {
    const key = `${elem.label}_${i}`;
    const route = `${basePath}${elem.path}`;

    return (
      <Link key={key} route={route} useRouter={useRouter}>
        <div className={classes.menuItem}>{elem.label}</div>
      </Link>
    );
  });

  return (
    <div className={classes.settings} ref={settingsMenuRef}>
      <IconButton className={classes.settingsButton} onClick={onClick}>
        <SettingsButton
          className={classNames(
            dropDown ? classes.dropdown : "",
            classes.settingsIcon
          )}
        />
        {dropDown && <div className={classes.menuList}>{settingsMenu}</div>}
      </IconButton>
    </div>
  );
};

Settings.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  settingsData: PropTypes.instanceOf(Object)
};

Settings.defaultProps = {
  settingsData: null
};

export default withStyles(styles, { withTheme: true })(Settings);
