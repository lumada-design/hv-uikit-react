import React from "react";
import HvLogin from "@hv/uikit-react-core/dist/Login";

const backgroundImage = require("./assets/background.jpg");

export default (
  <div
    style={{
      height: "100vh",
      display: "flex"
    }}
  >
    <HvLogin
      allowRecover={true}
      allowRememberMe={true}
      backgroundImage={backgroundImage}
      backgroundImageSize="100%"
    />
  </div>
);
