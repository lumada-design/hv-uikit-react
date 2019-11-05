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
  forgotYourCredentialMessage: "Forgot Your Credential Message",
  emailLabel: "Email label",
  emailPlaceholder: "Email placeholder",
  cancelButton: "Cancel label",
  recoverButton: "Recover label",
  recoveringMessage: "Recovering label",
  incorrectCredentialsMessage: "Incorrect Credentials Message label"

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
