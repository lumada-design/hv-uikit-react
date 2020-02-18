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
import classNames from "classnames";
import Success from "@hv/uikit-react-icons/dist/Generic/Success";
import Fail from "@hv/uikit-react-icons/dist/Generic/Fail";

import HvGrid from "../Grid";

import Login from "./Forms/Login";
import Recovery from "./Forms/Recovery";
import defaultBackImage from "./resources/bg.svg";

/**
 * Main container for the Login component.
 */
class HvLogin extends React.Component {
  state = { inRecoveryMode: false, isLoading: true };

  /**
   * When the component is fully loaded the state is changed
   * indicating that the load is complete and the form can be displayed.
   */
  componentDidMount() {
    this.setState({ isLoading: false });
  }

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
      className,
      id,
      login,
      recovery,
      backgroundImage,
      backgroundImageSize,
      logo,
      titleComponent,
      allowRecover,
      allowRememberMe,
      okRecoveryIcon,
      errorLoginIcon,
      labels,
      customMessage,
      formClasses
    } = this.props;
    const { inRecoveryMode, isLoading } = this.state;
    const backgroundLoginImg = !backgroundImage.length
      ? defaultBackImage
      : backgroundImage;

    let form;
    if (inRecoveryMode) {
      form = (
        <Recovery
          recovery={recovery}
          onClick={this.switchForms}
          okRecoveryIcon={okRecoveryIcon}
          recoveryTitle={labels.recoveryTitle}
          messageToRecover={labels.messageToRecover}
          messageAfterRecover={labels.messageAfterRecover}
          recoveryInputLabel={labels.recoveryInputLabel}
          recoveryPlaceholder={labels.recoveryPlaceholder}
          recoveryErrorMessage={labels.recoveryErrorMessage}
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
          titleText={labels.titleText}
          logo={logo}
          titleComponent={titleComponent}
          allowRecover={allowRecover}
          allowRememberMe={allowRememberMe}
          onClick={this.switchForms}
          errorLoginIcon={errorLoginIcon}
          incorrectCredentialsMessage={labels.incorrectCredentialsMessage}
          userNameInputLabel={labels.userNameInputLabel}
          userNamePlaceHolder={labels.userNamePlaceHolder}
          passwordInputLabel={labels.passwordInputLabel}
          passwordPlaceHolder={labels.passwordPlaceHolder}
          rememberMeLabel={labels.rememberMeLabel}
          loginButtonMessage={labels.loginButtonMessage}
          loginButtonLabel={labels.loginButtonLabel}
          forgotYourCredentialMessage={labels.forgotYourCredentialMessage}
          isLoading={isLoading}
          customMessage={customMessage.text}
          classes={formClasses}
        />
      );
    }

    return (
      <>
        <HvGrid
          container
          className={classes.container}
          style={{
            backgroundImage: `url(${backgroundLoginImg})`,
            backgroundSize: `${backgroundImageSize}`
          }}
        >
          <HvGrid
            item
            xs="false"
            sm="false"
            md={8}
            lg={8}
            xl={8}
            className={classes.panelPosition}
          >
            <div id={id} className={classNames(classes.root, className)} />
          </HvGrid>
          <HvGrid
            item
            xs={12}
            sm={12}
            md={5}
            lg={5}
            xl={5}
            className={classes.rightContainer}
          >
            <div>{form}</div>
          </HvGrid>
        </HvGrid>
      </>
    );
  }
}

HvLogin.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * Id to be applied to the root node.
   */
  id: PropTypes.string,
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
     * Styles applied to the grid.
     */
    panelPosition: PropTypes.string
  }).isRequired,

  /**
   *  the classes object to be applied into the inner form.
   */
  formClasses: PropTypes.shape({
    /**
     * Styles applied to the component root class.
     */
    root: PropTypes.string
  }),
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
   * Sizing for background image
   */
  backgroundImageSize: PropTypes.string,
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
   * - incorrectCredentialsMessage: Incorrect Credentials Message
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
    incorrectCredentialsMessage: PropTypes.string
  }),
  /**
   * A custom message to be shown in the error area.
   * Will be overridden by any error messages.
   */
  customMessage: PropTypes.shape({
    text: PropTypes.string
  })
};

HvLogin.defaultProps = {
  className: "",
  id: undefined,
  backgroundImage: "",
  backgroundImageSize: "100%",
  recovery: () => {},
  logo: null,
  titleComponent: null,
  allowRecover: true,
  allowRememberMe: true,
  okRecoveryIcon: <Success semantic="sema1" />,
  errorLoginIcon: <Fail semantic="sema4" />,
  labels: {
    titleText: "Welcome",
    recoveryTitle: "Recover Credentials",
    messageToRecover:
      "You will receive an email with instructions to recover your credentials",
    messageAfterRecover:
      "The instructions to recover your credentials were sent.",
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
    incorrectCredentialsMessage:
      "Incorrect Username and/or Password. Please try again."
  },
  customMessage: {},
  formClasses: null
};

export default HvLogin;
