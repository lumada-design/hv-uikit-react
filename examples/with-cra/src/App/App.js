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
import Header from "@hv/uikit-react-core/dist/Header";
import Login from "@hv/uikit-react-core/dist/Login";
import Footer from "@hv/uikit-react-lab/dist/Footer";

import companyLogo from "./logo.svg";
import backgroundImage from "./bg.png";

const handleLogin = () => alert("Welcome!");

const AppView = ({ classes }) => (
  <div>
    <Header companyLogo={companyLogo} />
    <div className={classes.login}>
      <Login login={handleLogin} backgroundImage={backgroundImage} />
    </div>
    <Footer />
  </div>
);

export default AppView;
