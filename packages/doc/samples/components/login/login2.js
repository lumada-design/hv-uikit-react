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
  recoveryTitle: "recovery title",
  messageToRecover: "message to recover",
  messageAfterRecover: "message after recover",
  recoveryInputLabel: "recovery label",
  recoveryPlaceholder: "recovery placeholder",
  recoveryErrorMessage: "error message",
  userNameInputLabel: "username label",
  userNamePlaceHolder: "uplaceholder",
  passwordInputLabel: "password input label",
  passwordPlaceHolder: "password placeholder",
  rememberMeLabel: "remember me label",
  loginButtonMessage: "Log message",
  loginButtonLabel: "Log button",
  forgotYourCredentialMessage: "Forgot Your Credential Message",
  emailLabel: "email label",
  emailPlaceholder: "email placeholder",
  cancelButton: "Cancel label",
  recoverButton: "Recover label",
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
