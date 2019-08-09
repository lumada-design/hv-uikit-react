import React from "react";
import HvLogin from "@hv/uikit-react-core/dist/Login";

const callSimulationError = () =>
  new Promise(resolve => {
    throw "error";
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
      login={callSimulationError}
      recovery={callSimulationError}
      allowRecover
    />
  </div>
);
