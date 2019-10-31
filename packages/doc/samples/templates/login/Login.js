import React from "react";
import Header from "@hv/uikit-react-core/dist/Header";
import Login from "@hv/uikit-react-core/dist/Login";
import HitachiLogo from "../home/components/hitachiLogo";

const callSimulation = () =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });

const LoginTemplate = ({ classes }) => (
  <div>
    <Header id="header" companyLogo={<HitachiLogo />} label="App Name" />
    <div className={classes.root}>
      <Login
        login={callSimulation}
        recovery={callSimulation}
        id="test"
        allowRecover
      />
    </div>
  </div>
);
export default LoginTemplate;
