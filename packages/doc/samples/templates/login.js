import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Header from "@hv/uikit-react-core/dist/Header";
import Login from "@hv/uikit-react-core/dist/Login";
import Lumada from "../components/header/resources/hitachi";
// import Lumada from "./resources/lumada.svg";

const styles = () => ({
  root: {
    height: "100vh"
  }
});

const LumadaLogo = () => <Lumada style={{ width: "72px" }} />;

const callSimulation = () =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });

const LoginTemplate = ({ classes }) => (
  <div>
    <Header id="header" companyLogo={<LumadaLogo />} label="App Name" />
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
export default withStyles(styles, { withTheme: true })(LoginTemplate);
