import React from "react";
import HvLogin from "@hv/uikit-react-core/dist/Login";

const callSimulation = () =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });

const labels = 
{
  titleText: "Title text",
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
}

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
      allowRecover={true}
      allowRememberMe={true}
      labels={labels}
    />
  </div>
);
