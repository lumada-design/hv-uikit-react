import React from "react";
import Header, { HvHeaderBrand } from "@hv/uikit-react-core/dist/NewHeader";
import Login from "@hv/uikit-react-core/dist/Login";
import HitachiLogo from "../home/components/HitachiLogo";

const callSimulation = () =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });

const LoginTemplate = ({ classes }) => (
  <div>
    <Header id="header">
      <HvHeaderBrand logo={<HitachiLogo />} name="Maintenance Insights" />
    </Header>
    <div className={classes.root}>
      <Login
        id="test"
        login={callSimulation}
        recovery={callSimulation}
        allowRecover
      />
    </div>
  </div>
);
export default LoginTemplate;
