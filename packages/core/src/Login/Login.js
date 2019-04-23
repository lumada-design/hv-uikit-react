/*
 * Copyright 2019 Hitachi Vantara Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from "react";
import PropTypes from "prop-types";
import deprecatedPropType from "@material-ui/core/utils/deprecatedPropType";
import Level0Success16Color from "@hv/uikit-react-icons/dist/Level0.S";
import Level5Unsuccess16Color from "@hv/uikit-react-icons/dist/Level5.S";

import Login from "./Forms/Login";
import Recovery from "./Forms/Recovery";
import backImg from "./resources/background.jpg";

/**
 * Main container for the Login component.
 */
class HvLogin extends React.Component {
  state = { inRecoveryMode: false };

  /**
   * Function to switch the status inRecoveryMode. This status is used to determine which form
   * should be render (Login or Recover).
   */
  switchForms = () => {
    this.setState(prevState => ({ inRecoveryMode: !prevState.inRecoveryMode }));
  };

  render() {
    const {
      classes,
      login,
      recovery,
      backgroundImage,
      titleText,
      logo,
      titleComponent,
      allowRecover,
      allowRememberMe,
      okRecoveryIcon,
      errorLoginIcon,
      labels,
      recoveryTitle,
      messageToRecover,
      messageAfterRecover,
      recoveryInputLabel,
      recoveryPlaceholder,
      recoveryErrorMessage,
      userNameInputLabel,
      userNamePlaceHolder,
      passwordInputLabel,
      passwordPlaceHolder,
      rememberMeLabel
    } = this.props;
    const { inRecoveryMode } = this.state;

    let form;

    if (inRecoveryMode) {
      form = (
        <Recovery
          recovery={recovery}
          onClick={this.switchForms}
          okRecoveryIcon={okRecoveryIcon}
          recoveryTitle={recoveryTitle || labels.recoveryTitle}
          messageToRecover={messageToRecover || labels.messageToRecover}
          messageAfterRecover={messageAfterRecover || labels.messageAfterRecover}
          recoveryInputLabel={recoveryInputLabel || labels.recoveryInputLabel}
          recoveryPlaceholder={recoveryPlaceholder || labels.recoveryPlaceholder}
          recoveryErrorMessage={recoveryErrorMessage || labels.recoveryErrorMessage}
          emailLabel={labels.emailLabel}
          emailPlaceholder={labels.emailPlaceholder}
          cancelButton={labels.cancelButton}
          recoverButton={labels.recoverButton}
          recoveringMessage={labels.recoveringMessage}
        />
      );
    } else {
      form = (
        <Login
          login={login}
          titleText={labels.titleText || titleText}
          logo={logo}
          titleComponent={titleComponent}
          allowRecover={allowRecover}
          allowRememberMe={allowRememberMe}
          onClick={this.switchForms}
          errorLoginIcon={errorLoginIcon}
          userNameInputLabel={userNameInputLabel || labels.userNameInputLabel}
          userNamePlaceHolder={userNamePlaceHolder || labels.userNamePlaceHolder}
          passwordInputLabel={passwordInputLabel || labels.passwordInputLabel}
          passwordPlaceHolder={passwordPlaceHolder || labels.passwordPlaceHolder}
          rememberMeLabel={rememberMeLabel || labels.rememberMeLabel}
          loginButtonMessage={labels.loginButtonMessage}
          loginButtonLabel={labels.loginButtonLabel}
          forgotYourCredentialMessage={labels.forgotYourCredentialMessage}
        />
      );
    }

    return (
      <div
        className={classes.root}
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className={classes.rightContainer}>
          <div className={classes.formContainer}>{form}</div>
        </div>
      </div>
    );
  }
}

HvLogin.propTypes = {
  /**
   * the classes object to be applied into the root object.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the component root class.
     */
    root: PropTypes.string,
    /**
     * Styles applied to the right container.
     */
    rightContainer: PropTypes.string,
    /**
     * Styles applied to the form, inside the right container.
     */
    formContainer: PropTypes.string
  }).isRequired,
  /**
   * the function invoked for the log in
   */
  login: PropTypes.func.isRequired,
  /**
   * the function invoked for the recovery
   */
  recovery: PropTypes.func,
  /**
   * the url for the background image
   */
  backgroundImage: PropTypes.string,
  /**
   * the welcome message.
   * @deprecated
   */
  titleText: deprecatedPropType(PropTypes.string),
  /**
   * the url for the logo in the welcome message.
   */
  logo: PropTypes.string,
  /**
   * a component to replace the welcome message
   */
  titleComponent: PropTypes.element,
  /**
   * the component should have the recovery capability
   */
  allowRecover: PropTypes.bool,
  /**
   * the component should have the remember me capability
   */
  allowRememberMe: PropTypes.bool,
  /**
   * Icon to be presented when the recovery occurs successfully.
   */
  okRecoveryIcon: PropTypes.element,
  /**
   * Icon to be presented when an error occurs in the login.
   */
  errorLoginIcon: PropTypes.element,
  /**
   * The object that contains the different labels inside the kpi.
   *
   * - titleText: The welcome message.
   * - recoveryTitle: Recovery title.
   * - messageToRecover: Message to recover
   * - messageAfterRecover: Message shown after recover.
   * - recoveryInputLabel: Recovery input label.
   * - recoveryPlaceholder: Recovery placeholder.
   * - recoveryErrorMessage: Message shown when an error occurs.
   * - userNameInputLabel: Input user name label.
   * - userNamePlaceHolder: Input user name placeholder.
   * - passwordInputLabel: Password label.
   * - passwordPlaceHolder: Password placeholder.
   * - rememberMeLabel: Remember me label.
   */
  labels: PropTypes.shape({
    titleText: PropTypes.string,
    recoveryTitle: PropTypes.string,
    messageToRecover: PropTypes.string,
    messageAfterRecover: PropTypes.string,
    recoveryInputLabel: PropTypes.string,
    recoveryPlaceholder: PropTypes.string,
    recoveryErrorMessage: PropTypes.string,
    userNameInputLabel: PropTypes.string,
    userNamePlaceHolder: PropTypes.string,
    passwordInputLabel: PropTypes.string,
    passwordPlaceHolder: PropTypes.string,
    rememberMeLabel: PropTypes.string,
    loginButtonMessage: PropTypes.string,
    loginButtonLabel: PropTypes.string,
    forgotYourCredentialMessage: PropTypes.string,
    emailLabel: PropTypes.string.isRequired,
    emailPlaceholder: PropTypes.string.isRequired,
    cancelButton: PropTypes.string.isRequired,
    recoverButton: PropTypes.string.isRequired,
    recoveringMessage: PropTypes.string.isRequired,
  }),
  /**
   * Recovery title.
   * @deprecated
   */
  recoveryTitle: deprecatedPropType(PropTypes.string),
  /**
   * Message to recover.
   * @deprecated
   */
  messageToRecover:deprecatedPropType(PropTypes.string),
  /**
   * Message shown after recover.
   * @deprecated
   */
  messageAfterRecover:deprecatedPropType(PropTypes.string),
  /**
   * Recovery input label.
   * @deprecated
   */
  recoveryInputLabel:deprecatedPropType(PropTypes.string),
  /**
   * Recovery placeholder.
   * @deprecated
   */
  recoveryPlaceholder:deprecatedPropType(PropTypes.string),
  /**
   * Message shown when an error occurs.
   * @deprecated
   */
  recoveryErrorMessage:deprecatedPropType(PropTypes.string),
  /**
   * Input user name label.
   * @deprecated
   */
  userNameInputLabel:deprecatedPropType(PropTypes.string),
  /**
   * Input user name placeholder.
   * @deprecated
   */
  userNamePlaceHolder:deprecatedPropType(PropTypes.string),
  /**
   * Password label.
   * @deprecated
   */
  passwordInputLabel:deprecatedPropType(PropTypes.string),
  /**
   * Password placeholder.
   * @deprecated
   */
  passwordPlaceHolder:deprecatedPropType(PropTypes.string),
  /**
   * Remember me label.
   * @deprecated
   */
  rememberMeLabel:deprecatedPropType(PropTypes.string)
};

HvLogin.defaultProps = {
  backgroundImage: backImg,
  recovery: () => {},
  logo: null,
  titleComponent: null,
  allowRecover: true,
  allowRememberMe: true,
  okRecoveryIcon: <Level0Success16Color />,
  errorLoginIcon: <Level5Unsuccess16Color />,
  labels: {
    titleText: "Welcome",
    recoveryTitle: "Recover Credentials",
    messageToRecover: "You will receive an email with instructions to recover your credentials",
    messageAfterRecover: "The instructions to recover your credentials were sent.",
    recoveryInputLabel: "Email",
    recoveryPlaceholder: "Enter text",
    recoveryErrorMessage: "The email you've entered doesn't match any account",
    userNameInputLabel: "Username",
    userNamePlaceHolder: "Enter text",
    passwordInputLabel: "Password",
    passwordPlaceHolder: "Enter text",
    rememberMeLabel: "Remember me",
    loginButtonMessage: "Logging",
    loginButtonLabel: "Log in",
    forgotYourCredentialMessage: "Forgot your credentials?",
    emailLabel: "Email",
    emailPlaceholder: "Enter Email",
    cancelButton: "Cancel",
    recoverButton: "Recover",
    recoveringMessage: "Recovering",
  },
  titleText: undefined,
  recoveryTitle: undefined,
  messageToRecover: undefined,
  messageAfterRecover: undefined,
  recoveryInputLabel: undefined,
  recoveryPlaceholder: undefined,
  recoveryErrorMessage: undefined,
  userNameInputLabel: undefined,
  userNamePlaceHolder: undefined,
  passwordInputLabel: undefined,
  passwordPlaceHolder: undefined,
  rememberMeLabel: undefined
};

export default HvLogin;
