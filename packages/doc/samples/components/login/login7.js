import React from "react";
import HvLogin from "@hv/uikit-react-core/dist/Login";

const logo = require("./assets/Hitachi-logo.png");

const callSimulation = () =>
  new Promise(() => {
    throw new Error("Dummy Error");
  });

const labels = {
  titleText: "File Sync and share",
  recoveryTitle: "Recovery title",
  messageToRecover: "Message to recover",
  messageAfterRecover: "Message after recover",
  recoveryInputLabel: "Recovery",
  recoveryPlaceholder: "Recovery placeholder",
  recoveryErrorMessage: "Error message",
  userNameInputLabel: "Username",
  userNamePlaceHolder: "Placeholder",
  passwordInputLabel: "Password",
  passwordPlaceHolder: "Password placeholder",
  rememberMeLabel: "Remember me",
  loginButtonMessage: "Log message",
  loginButtonLabel: "Log in",
  forgotYourCredentialMessage: "Forgot your credential",
  emailLabel: "Email label",
  emailPlaceholder: "Email placeholder",
  cancelButton: "Cancel label",
  recoverButton: "Recover label",
  recoveringMessage: "Recovering",
  incorrectCredentialsMessage: "Incorrect credentials message"
};

export default (
  <div
    style={{
      height: "100vh",
      display: "flex"
    }}
  >
    <HvLogin login={callSimulation} labels={labels} logo={logo} />
  </div>
);
