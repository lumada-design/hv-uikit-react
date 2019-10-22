import React from "react";
import HvLogin from "@hv/uikit-react-core/dist/Login";

const callSimulation = () =>
  new Promise(resolve => {
    throw "Dummy Error";
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
      allowRecover={false}
      allowRememberMe={false}
      customMessage={{ text: "Here is some message.\nErrors will override it. Log in for error." }}
    />
  </div>
);