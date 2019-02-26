/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */

import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Input from "../../../Input";
import HvButton, { buttonTypes } from "../../../Button";
import HvCheckbox from "../../../Selectors/CheckBox";
import Title from "./Title";
import MessageElement from "../MessageElement";

/**
 * Error link button element.
 *
 * @param props
 * @returns {*}
 * @constructor
 */
// eslint-disable-next-line react/prop-types
function RecoveryLinkButton({ onClick, classes }) {
  return (
    <div className={classes.forgotCredentials}>
      <HvButton
        colorType="link"
        onClick={onClick}
        classes={{ textPrimary: classes.linkButtonTypography }}
      >
        Forgot your credentials?
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
      errorLoginIcon
    } = this.props;
    const { isLogging, loginError } = this.state;

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
              message="Incorrect Username or Password. Try again."
            />
          ) : null}
        </div>

        <div className={classes.inputUser}>
          <Input
            inputTextConfiguration={{
              inputLabel: "Username",
              placeholder: "Enter text",
              infoText: ""
            }}
            name="username"
            password={false}
            onChange={this.handleInputChange("username")}
          />
        </div>
        <div className={classes.inputPassword}>
          <Input
            inputTextConfiguration={{
              inputLabel: "Password",
              placeholder: "Enter text",
              infoText: ""
            }}
            name="password"
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
              label="Remember me"
              onChange={this.handleRememberMe}
            />
          ) : null}
          <HvButton
            type="submit"
            colorType={buttonTypes.primary}
            className={classes.button}
          >
            {isLogging ? "Logging in" : "Log in"}
          </HvButton>
        </div>

        {allowRecover ? (
          <RecoveryLinkButton onClick={onClick} classes={classes} />
        ) : null}
      </form>
    );
  }
}

Login.displayName = "loginForm";

Login.propTypes = {
  /**
   * the classes object to be applied into the root object.
   */
  classes: PropTypes.instanceOf(Object).isRequired,
  /**
   * the function invoked for the login action
   */
  login: PropTypes.func.isRequired,
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
  titleComponent: PropTypes.node,
  /**
   * the component should have the recovery capability
   */
  allowRecover: PropTypes.bool,
  /**
   * the component should have remember me capability.
   */
  allowRememberMe: PropTypes.bool,
  /**
   * Callback function to switch between forms
   */
  onClick: PropTypes.func.isRequired,
  /**
   * Icon to be presented when an error occurs in the login.
   */
  errorLoginIcon: PropTypes.element
};

Login.defaultProps = {
  titleText: null,
  logo: null,
  titleComponent: null,
  allowRecover: false,
  allowRememberMe: false,
  errorLoginIcon: null
};

export default Login;
