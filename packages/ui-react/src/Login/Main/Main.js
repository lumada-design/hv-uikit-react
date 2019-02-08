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
import Login from "../Forms/Login";
import Recovery from "../Forms/Recovery";
import PropTypes from "prop-types";
import backImg from "../resources/background.jpg";
import { Level0Success16Color, Level5Unsuccess16Color } from "@hv-ui/icons";

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
    this.setState({ inRecoveryMode: !this.state.inRecoveryMode });
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
      errorLoginIcon
    } = this.props;
    const { inRecoveryMode } = this.state;

    let form;

    if (inRecoveryMode) {
      form = (
        <Recovery
          recovery={recovery}
          onClick={this.switchForms}
          okRecoveryIcon={okRecoveryIcon}
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
  classes: PropTypes.instanceOf(Object).isRequired,
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
  titleComponent: PropTypes.node,
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
  okRecoveryIcon: PropTypes.node,
  /**
   * Icon to be presented when an error occurs in the login.
   */
  errorLoginIcon: PropTypes.node
};

HvLogin.defaultProps = {
  backgroundImage: backImg,
  recover: true,
  allowRecover: true,
  allowRememberMe: true,
  okRecoveryIcon: Level0Success16Color,
  errorLoginIcon: Level5Unsuccess16Color
};

export default HvLogin;
