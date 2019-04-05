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
          recoveryTitle={recoveryTitle}
          messageToRecover={messageToRecover}
          messageAfterRecover={messageAfterRecover}
          recoveryInputLabel={recoveryInputLabel}
          recoveryPlaceholder={recoveryPlaceholder}
          recoveryErrorMessage={recoveryErrorMessage}
        />
      );
    } else {
      form = (
        <Login
          login={login}
          titleText={titleText}
          logo={logo}
          titleComponent={titleComponent}
          allowRecover={allowRecover}
          allowRememberMe={allowRememberMe}
          onClick={this.switchForms}
          errorLoginIcon={errorLoginIcon}
          userNameInputLabel={userNameInputLabel}
          userNamePlaceHolder={userNamePlaceHolder}
          passwordInputLabel={passwordInputLabel}
          passwordPlaceHolder={passwordPlaceHolder}
          rememberMeLabel={rememberMeLabel}
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
   * the welcome message
   */
  titleText: PropTypes.string,
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
   * Recovery title.
   */
  recoveryTitle: PropTypes.string,
  /**
   * Message to recover.
   */
  messageToRecover: PropTypes.string,
  /**
   * Message shown after recover.
   */
  messageAfterRecover: PropTypes.string,
  /**
   * Recovery input label.
   */
  recoveryInputLabel: PropTypes.string,
  /**
   * Recovery placeholder.
   */
  recoveryPlaceholder: PropTypes.string,
  /**
   * Message shown when an error occurs.
   */
  recoveryErrorMessage: PropTypes.string,
  /**
   * Input user name label
   */
  userNameInputLabel: PropTypes.string,
  /**
   * Input user name placeholder
   */
  userNamePlaceHolder: PropTypes.string,
  /**
   * Password label.
   */
  passwordInputLabel: PropTypes.string,
  /**
   * Password placeholder.
   */
  passwordPlaceHolder: PropTypes.string,
  /**
   * Remember me label.
   */
  rememberMeLabel: PropTypes.string
};

HvLogin.defaultProps = {
  backgroundImage: backImg,
  recovery: () => {},
  titleText: "Welcome",
  logo: null,
  titleComponent: null,
  allowRecover: true,
  allowRememberMe: true,
  okRecoveryIcon: <Level0Success16Color />,
  errorLoginIcon: <Level5Unsuccess16Color />,
  recoveryTitle: "Recover Credentials",
  messageToRecover:
    "You will receive an email with instructions to recover your credentials.",
  messageAfterRecover:
    "The instructions to recover your credentials were sent.",
  recoveryInputLabel: "Email",
  recoveryPlaceholder: "Enter text",
  recoveryErrorMessage: "The email you've entered doesn't match any account",
  userNameInputLabel: "Password",
  userNamePlaceHolder: "Enter text",
  passwordInputLabel: "Password",
  passwordPlaceHolder: "Enter text",
  rememberMeLabel: "Remember me"
};

export default HvLogin;
