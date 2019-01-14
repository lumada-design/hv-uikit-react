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
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Button from "@material-ui/core/Button";
import styles from "./styles";

import SettingsButton from "@material-ui/icons/SettingsOutlined";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";

class User extends React.Component {
  state = {
    userMenuOpen: false,
    settingsMenuOpen: false
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount = () => {
    document.removeEventListener("mousedown", this.handleClickOutside);
  };

  setWrapperRef = node => {
    this.wrapperRef = node;
  };

  handleClickOutside = event => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({
        settingsMenuOpen: false,
        userMenuOpen: false
      });
    }
  };

  toggleUserMenu = () => {
    this.setState({
      userMenuOpen: !this.state.userMenuOpen,
      settingsMenuOpen: false
    });
  };

  toggleSettingsMenu = () => {
    this.setState({
      settingsMenuOpen: !this.state.settingsMenuOpen,
      userMenuOpen: false
    });
  };

  render() {
    const { classes, userData, logout } = this.props;
    if (!userData) return "";

    return (
      <div className={classes.user} ref={this.setWrapperRef}>
        <div className={classes.userInfo}>
          <Typography className={classes.userName}>{userData.name}</Typography>
          <Typography className={classes.userRole}>{userData.role}</Typography>
        </div>
        <IconButton
          className={classes.userButton}
          onClick={this.toggleUserMenu}
        >
          <AccountCircle
            className={classNames(
              this.state.userMenuOpen ? classes.dropdown : "",
              classes.userIcon
            )}
          />
          {this.state.userMenuOpen && (
            <div className={classes.menuList}>
              <div className={classes.menuItem}>Profile</div>
              <div className={classes.menuItem} onClick={() => logout()}>
                Logout
              </div>
            </div>
          )}
        </IconButton>
        <IconButton
          className={classes.userButton}
          onClick={this.toggleSettingsMenu}
        >
          <SettingsButton
            className={classNames(
              this.state.settingsMenuOpen ? classes.dropdown : "",
              classes.userIcon
            )}
          />
          {this.state.settingsMenuOpen && (
            <div className={classes.menuList}>
              <div className={classes.menuItem}>Event Settings</div>
              <div className={classes.menuItem}>Work Request Settings</div>
              <div className={classes.menuItem}>Anaytics Settings</div>
              <div className={classes.menuItem}>User Management</div>
            </div>
          )}
        </IconButton>
      </div>
    );
  }
}

User.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  userData: PropTypes.instanceOf(Object),
  logout: PropTypes.instanceOf(Function)
};

User.defaultProps = {
  userData: null,
  logout: null
};

export default withStyles(styles, { withTheme: true })(User);
