import React from "react";
import HvLogin from "@hv-ui/react/core/Login";

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
      allowRecover={false}
      allowRememberMe={false}
    />
  </div>
);
