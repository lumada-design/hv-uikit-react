import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import HvLogin from "@hv/uikit-react-core/dist/Login";

const callSimulation = () =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });

const styles = () => ({
  login: {
    width: 400
  }
});

const HvLoginWrapper = withStyles(styles, {
  withTheme: true
})(({ classes }) => (
  <HvLogin
      login={callSimulation}
      recovery={callSimulation}
      id="test"
      allowRecover
      formProps={{
        autoComplete: "off",
        id: "login8-form",
        className: classes.login
      }}
    />
));

export default (
  <div
    style={{
      height: "100vh",
      display: "flex"
    }}
  >
    <HvLoginWrapper />
  </div>
);
