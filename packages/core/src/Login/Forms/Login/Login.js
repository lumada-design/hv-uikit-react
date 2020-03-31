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
import withStyles from "@material-ui/core/styles/withStyles";
import classNames from "classnames";
import Input from "../../../Input";
import HvButton from "../../../Button";
import HvCheckbox from "../../../Selectors/CheckBox";
import Title from "./Title";
import MessageElement from "../MessageElement";

import styles from "./styles";

/**
 * Error link button element.
 *
 * @param props
 * @returns {*}
 * @constructor
 */
// eslint-disable-next-line react/prop-types
function RecoveryLinkButton({ onClick, classes, forgotYourCredentialMessage }) {
  return (
    <div className={classes.forgotCredentials}>
      <HvButton
        category="ghost"
        onClick={onClick}
        className={classes.sentenceCase}
      >
        {forgotYourCredentialMessage}
      </HvButton>
    </div>
  );
}

/**
 * Login main form.
 */
class Login extends React.Component {
  state = {
    password: "",
    username: "",
    isLogging: false,
    rememberMe: false,
    loginError: false
  };

  componentDidMount() {
    this.setState({
      username:
        localStorage.getItem("username") != null
          ? localStorage.getItem("username")
          : ""
    });
  }

  /**
   * Submit of the Form. Asynchronous call of the passed login function.
   * The remember checkbox is evaluated to determine if the value of the username
   * and password should be store in the local storage.
   *
   * @param e
   * @returns {Promise<void>}
   */
  handleSubmit = async e => {
    e.preventDefault();

    // Prevent the submit if the component isn't fully loaded.
    const { isLoading } = this.props;
    if (isLoading) return;

    const { username, password, rememberMe } = this.state;
    const { login } = this.props;

    this.setState({ isLogging: true });
    this.setState({ loginError: false });

    if (rememberMe) {
      localStorage.setItem("username", username);
    } else {
      localStorage.removeItem("username");
    }

    try {
      await login({ username, password });
    } catch (error) {
      this.setState({ loginError: true });
    }
    this.setState({ isLogging: false });
  };

  /**
   * Maintains the state of the remember me checkbox.
   *
   * @param e
   */
  handleRememberMe = e => {
    this.setState({ rememberMe: e.target.checked });
  };

  /**
   * Sets the value of the state of the passed parameter.
   *
   * @param name
   * @returns {function(*): *}
   */
  handleInputChange = name => value => {
    this.setState({ [name]: value });
    return value;
  };

  render() {
    const {
      classes,
      logo,
      titleText,
      titleComponent,
      onClick,
      allowRecover,
      allowRememberMe,
      errorLoginIcon,
      isLoading,
      userNameInputLabel,
      userNamePlaceHolder,
      passwordInputLabel,
      passwordPlaceHolder,
      loginButtonMessage,
      loginButtonLabel,
      forgotYourCredentialMessage,
      rememberMeLabel,
      incorrectCredentialsMessage,
      customMessage
    } = this.props;
    const { isLogging, loginError } = this.state;

    const customMessageElement =
      !loginError && customMessage != null ? (
        <MessageElement
          showMessage={classes.showCustomMessage}
          message={customMessage}
        />
      ) : null;
    return (
      <form className={classes.root} onSubmit={e => this.handleSubmit(e)}>
        <div className={classes.title}>
          <Title
            titleText={titleText}
            logo={logo}
            titleComponent={titleComponent}
          />
        </div>

        <div className={classes.errorMessageContainer}>
          {loginError ? (
            <MessageElement
              iconElement={errorLoginIcon}
              icon={classes.icon}
              showMessage={classes.showMessage}
              message={incorrectCredentialsMessage}
            />
          ) : (
            customMessageElement
          )}
        </div>

        <div className={classes.inputUser}>
          <Input
            labels={{
              inputLabel: userNameInputLabel,
              placeholder: userNamePlaceHolder,
              infoText: ""
            }}
            name="username"
            disabled={isLoading}
            password={false}
            onChange={this.handleInputChange("username")}
            autoFocus
          />
        </div>
        <div className={classes.inputPassword}>
          <Input
            labels={{
              inputLabel: passwordInputLabel,
              placeholder: passwordPlaceHolder,
              infoText: ""
            }}
            name="password"
            disabled={isLoading}
            password
            onChange={this.handleInputChange("password")}
          />
        </div>

        <div
          className={classNames({
            [classes.buttonsContainerWithRemember]: allowRememberMe,
            [classes.buttonsContainer]: !allowRememberMe
          })}
        >
          {allowRememberMe ? (
            <HvCheckbox
              classes={{ labelTypography: classes.checkBoxTypography }}
              label={rememberMeLabel}
              onChange={this.handleRememberMe}
            />
          ) : null}
          <HvButton
            type="submit"
            category="primary"
            className={classNames(classes.button, classes.sentenceCase)}
            disabled={isLoading || isLogging}
          >
            {isLogging ? loginButtonMessage : loginButtonLabel}
          </HvButton>
        </div>

        {allowRecover ? (
          <RecoveryLinkButton
            onClick={onClick}
            classes={classes}
            forgotYourCredentialMessage={forgotYourCredentialMessage}
          />
        ) : null}
      </form>
    );
  }
}

Login.displayName = "loginForm";

Login.propTypes = {
  /**
   * The classes object to be applied into the root object.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the component root class.
     */
    root: PropTypes.string,
    /**
     * Styles applied to the title.
     */
    title: PropTypes.string,
    /**
     * Styles applied to the h3.
     */
    h3: PropTypes.string,
    /**
     * Styles applied to the user input.
     */
    inputUser: PropTypes.string,
    /**
     * Styles applied to the password input.
     */
    inputPassword: PropTypes.string,
    /**
     * Styles applied to the button.
     */
    button: PropTypes.string,
    /**
     * Styles applied to the button container.
     */
    buttonsContainer: PropTypes.string,
    /**
     * Styles applied to the button container when with remember.
     */
    buttonsContainerWithRemember: PropTypes.string,
    /**
     * Styles applied to the separator.
     */
    separator: PropTypes.string,
    /**
     * Styles applied to the forgot credentials.
     */
    forgotCredentials: PropTypes.string,
    /**
     * Styles applied to the typography of the checkbox.
     */
    checkBoxTypography: PropTypes.string,
    /**
     * Styles to apply sentence case.
     */
    sentenceCase: PropTypes.string,
    /**
     * Styles applied to the message.
     */
    showMessage: PropTypes.string,
    /**
     * Styles applied to the custom message.
     */
    showCustomMessage: PropTypes.string,
    /**
     * Styles applied to the icon.
     */
    icon: PropTypes.string,
    /**
     * Styles applied to the error message container.
     */
    errorMessageContainer: PropTypes.string
  }).isRequired,
  /**
   * The function invoked for the login action
   */
  login: PropTypes.func.isRequired,
  /**
   * The welcome message
   */
  titleText: PropTypes.string,
  /**
   * The url for the logo in the welcome message.
   */
  logo: PropTypes.string,
  /**
   * A component to replace the welcome message
   */
  titleComponent: PropTypes.node,
  /**
   * The component should have the recovery capability
   */
  allowRecover: PropTypes.bool,
  /**
   * The component should have remember me capability.
   */
  allowRememberMe: PropTypes.bool,
  /**
   * Callback function to switch between forms
   */
  onClick: PropTypes.func.isRequired,
  /**
   * Icon to be presented when an error occurs in the login.
   */
  errorLoginIcon: PropTypes.element,
  /**
   * Label for the login button.
   */
  loginButtonLabel: PropTypes.string.isRequired,
  /**
   * Label for the login button while loggin.
   */
  loginButtonMessage: PropTypes.string.isRequired,
  /**
   * Link for forgot your credentials.
   */
  forgotYourCredentialMessage: PropTypes.string.isRequired,
  /**
   * Input user name label
   */
  userNameInputLabel: PropTypes.string.isRequired,
  /**
   * Input user name placeholder
   */
  userNamePlaceHolder: PropTypes.string.isRequired,
  /**
   * Password label.
   */
  passwordInputLabel: PropTypes.string.isRequired,
  /**
   * Password placeholder.
   */
  passwordPlaceHolder: PropTypes.string.isRequired,
  /**
   * Remember me label.
   */
  rememberMeLabel: PropTypes.string.isRequired,
  /**
   * Incorrect Credentials Message
   */
  incorrectCredentialsMessage: PropTypes.string.isRequired,
  /**
   * Indicates if the Login is fully loaded.
   */
  isLoading: PropTypes.bool,
  /**
   * A custom message to be shown in the error area.
   * Will be overridden by any error messages.
   */
  customMessage: PropTypes.string
};

Login.defaultProps = {
  titleText: null,
  logo: null,
  titleComponent: null,
  allowRecover: false,
  allowRememberMe: false,
  errorLoginIcon: null,
  isLoading: false,
  customMessage: null
};

export default withStyles(styles, { name: "HvLoginFormsLogin" })(Login);
