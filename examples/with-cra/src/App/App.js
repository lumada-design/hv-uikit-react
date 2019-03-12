import React from "react";
import HvHeader from "@hv-ui/react/core/Header";
import HvLogin from "@hv-ui/react/core/Login";
import HvFooter from "@hv-ui/react/core/Footer";

import companyLogo from "./logo.svg"
import backgroundImage from "./bg.png";

const handleLogin = () => alert("Welcome!");

const App = ({ classes }) => (
  <div>
    <HvHeader companyLogo={companyLogo} />
    <div className={classes.login}>
      <HvLogin login={handleLogin} backgroundImage={backgroundImage} />
    </div>
    <HvFooter />
  </div>
);

export default App;
