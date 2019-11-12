import React from "react";
import HvLogin from "@hv/uikit-react-core/dist/Login";

const callSimulationError = () =>
  new Promise(resolve => {
    throw "error";
    setTimeout(() => {
      resolve();
    }, 2000);
  });

const labels = {
  titleText: "Welcome",
  recoveryTitle: "Recovery title",
  messageToRecover: "Message to recover",
  messageAfterRecover: "Message after recover",
  recoveryInputLabel: "Recovery label",
  recoveryPlaceholder: "Recovery placeholder",
  recoveryErrorMessage: "Error message",
  userNameInputLabel: "Username label",
  userNamePlaceHolder: "Uplaceholder",
  passwordInputLabel: "Password input label",
  passwordPlaceHolder: "Password placeholder",
  rememberMeLabel: "Remember me label",
  loginButtonMessage: "Log message",
  loginButtonLabel: "Log button",
  forgotYourCredentialMessage: "Forgot your credential message",
  emailLabel: "Email label",
  emailPlaceholder: "Email placeholder",
  cancelButton: "Cancel",
  recoverButton: "Recover l",
  recoveringMessage: "Recovering label",
  incorrectCredentialsMessage: "Some Error!"
};

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
      labels={labels}
    />
  </div>
);
