import React from "react";
import HvLogin from "@hv/uikit-react-core/dist/Login";

const backgroundImage = require("./assets/background.jpg");

const callSimulation = () =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });

export default (
  <div
    style={{
      height: "100vh",
      display: "flex"
    }}
  >
    <HvLogin
      login={callSimulation}
      recovery={callSimulation}
      allowRecover
      allowRememberMe
      backgroundImage={backgroundImage}
      backgroundImageSize="100%"
    />
  </div>
);
