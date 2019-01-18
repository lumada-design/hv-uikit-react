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
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Logo from "../Logo";
import Menu from "../Menu";
import User from "../User";
import Settings from "../Settings";

class Main extends React.Component {
  state = {
    openUserMenu: false,
    openSettingsMenu: false
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount = () => {
    document.removeEventListener("mousedown", this.handleClickOutside);
  };

  setUserWrapperRef = node => {
    this.userWrapperRef = node;
  };

  setSettingsWrapperRef = node => {
    this.settingsWrapperRef = node;
  };

  handleClickOutside = event => {
    if (
      (this.userWrapperRef || this.settingsWrapperRef) &&
      !(
        this.userWrapperRef.contains(event.target) ||
        this.settingsWrapperRef.contains(event.target)
      )
    ) {
      this.setState({
        openUserMenu: false,
        openSettingsMenu: false
      });
    }
  };

  toggleUserMenu = () => {
    this.setState({
      openUserMenu: !this.state.openUserMenu,
      openSettingsMenu: false
    });
  };

  toggleSettingsMenu = () => {
    this.setState({
      openSettingsMenu: !this.state.openSettingsMenu,
      openUserMenu: false
    });
  };

  render() {
    const {
      classes,
      menuData,
      userData,
      userLogout,
      settingsData,
      basePath,
      useRouter,
      companyLogo,
      productLogo
    } = this.props;

    return (
      <AppBar color="default">
        <Toolbar variant="dense" classes={classes.root}>
          <Logo companyLogo={companyLogo} productLogo={productLogo} />
          <Menu menuData={menuData} basePath={basePath} useRouter={useRouter} />
          <User
            userData={userData}
            logout={userLogout}
            onClick={this.toggleUserMenu}
            dropDown={this.state.openUserMenu}
            userMenuRef={this.setUserWrapperRef}
          />
          <Settings
            settingsData={settingsData}
            userData={userData}
            basePath={basePath}
            useRouter={useRouter}
            dropDown={this.state.openSettingsMenu}
            onClick={this.toggleSettingsMenu}
            settingsMenuRef={this.setSettingsWrapperRef}
          />
        </Toolbar>
      </AppBar>
    );
  }
}

Main.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  menuData: PropTypes.instanceOf(Array),
  userData: PropTypes.instanceOf(Object),
  userLogout: PropTypes.instanceOf(Function),
  basePath: PropTypes.string,
  useRouter: PropTypes.bool,
  companyLogo: PropTypes.string,
  productLogo: PropTypes.string
};

Main.defaultProps = {
  menuData: [],
  userData: {},
  userLogout: null,
  basePath: "",
  useRouter: false,
  companyLogo: null,
  productLogo: null
};

export default Main;
