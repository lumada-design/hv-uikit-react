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

const Main = ({ classes, menuData, userData, userLogout, useRouter }) => (
  <AppBar color="default">
    <Toolbar>
      <Logo />
      <Menu menuData={menuData} useRouter={useRouter} />
      <User userData={userData} logout={userLogout} />
    </Toolbar>
  </AppBar>
);

Main.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  menuData: PropTypes.instanceOf(Array),
  userData: PropTypes.instanceOf(Object),
  userLogout: PropTypes.instanceOf(Function),
  useRouter: PropTypes.bool
};

Main.defaultProps = {
  menuData: null,
  userData: null,
  userLogout: null,
  useRouter: false
};

export default Main;
