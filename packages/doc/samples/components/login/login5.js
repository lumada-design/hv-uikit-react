import React from "react";
import HvLogin from "@hv/uikit-react-core/dist/Login";

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
      backgroundImage="background.jpg"
      backgroundImageSize="auto"
    />
  </div>
);
