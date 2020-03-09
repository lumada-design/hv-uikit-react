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
import HvTypography from "../../../Typography";
import Input from "../../../Input";
import HvButton from "../../../Button";
import MessageElement from "../MessageElement";

/**
 * The recovery password form.
 */
class Recovery extends React.Component {
  state = {
    email: "",
    recoverStatus: "processing"
  };

  /**
   * Sleep function.
   */
  sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

  /**
   * Submit of the Form. Asynchronous call of the passed recovery function.
   *
   * @param e
   * @returns {Promise<void>}
   */
  handleSubmit = async e => {
    e.preventDefault();

    const { email } = this.state;
    const { recovery, onClick } = this.props;

    this.setState({ isRecovering: true });
    this.setState({ recoverStatus: "processing" });

    try {
      await recovery({ email });
      this.setState({ recoverStatus: "success" });
      await this.sleep(2000);
      onClick();
    } catch (error) {
      this.setState({ recoverStatus: "error" });
    } finally {
      this.setState({ isRecovering: false });
    }
  };

  /**
   * Sets the value of the state of the passed parameter.
   *
   * @returns {function(*=): *}
   */
  handleInputChange = () => value => {
    this.setState({ email: value });
    return value;
  };

  render() {
    const {
      classes,
      onClick,
      okRecoveryIcon,
      recoveryTitle,
      messageToRecover,
      messageAfterRecover,
      recoveryErrorMessage,
      emailLabel,
      emailPlaceholder,
      recoveringMessage,
      cancelButton,
      recoverButton
    } = this.props;
    const { isRecovering, recoverStatus } = this.state;

    return (
      <form className={classes.root} onSubmit={e => this.handleSubmit(e)}>
        <HvTypography className={classes.title} variant="mTitle">
          {recoveryTitle}
        </HvTypography>

        <div className={classes.messageContainer}>
          {recoverStatus === "success" ? (
            <MessageElement
              iconElement={okRecoveryIcon}
              icon={classes.iconError}
              showMessage={classes.showOkMessage}
              message={messageAfterRecover}
            />
          ) : (
            <HvTypography variant="normalText" className={classes.instructions}>
              {messageToRecover}
            </HvTypography>
          )}
        </div>

        <div className={classes.input}>
          <Input
            labels={{
              inputLabel: emailLabel,
              placeholder: emailPlaceholder
            }}
            password={false}
            onChange={this.handleInputChange()}
            validationState={recoverStatus === "error" ? "invalid" : undefined}
            externalWarningTextOverride={
              recoverStatus === "error" ? recoveryErrorMessage : null
            }
            autoFocus
          />
        </div>

        <div
          className={classNames(
            { [classes.buttonsContainer]: recoverStatus !== "error" },
            { [classes.buttonsContainerError]: recoverStatus === "error" }
          )}
        >
          <HvButton
            className={classes.submitButton}
            type="submit"
            category="primary"
            disabled={isRecovering}
          >
            {isRecovering ? recoveringMessage : recoverButton}
          </HvButton>
          <HvButton
            className={classes.cancelButton}
            type="submit"
            onClick={onClick}
            category="ghost"
          >
            {cancelButton}
          </HvButton>
        </div>
      </form>
    );
  }
}

Recovery.displayName = "recoveryForm";

Recovery.propTypes = {
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
     * Styles applied to the recovery message.
     */
    instructions: PropTypes.string,
    /**
     * Styles applied to the input.
     */
    input: PropTypes.string,
    /**
     * Styles applied to the cancel button.
     */
    cancelButton: PropTypes.string,
    /**
     * Styles applied to the submit button.
     */
    submitButton: PropTypes.string,
    /**
     * Styles applied to the button container.
     */
    buttonsContainer: PropTypes.string,
    /**
     * Styles applied to the button container error.
     */
    buttonsContainerError: PropTypes.string,
    /**
     * Styles applied to the message ok.
     */
    showOkMessage: PropTypes.string,
    /**
     * Styles applied to the icon error.
     */
    iconError: PropTypes.string,
    /**
     * Styles applied to the message container.
     */
    messageContainer: PropTypes.string
  }).isRequired,
  /**
   * the function invoked for the recover action. The function must throw an exception if the request wasn't successful.
   */
  recovery: PropTypes.func.isRequired,
  /**
   * Callback function to switch between forms.
   */
  onClick: PropTypes.func.isRequired,
  /**
   * Icon to be presented when the recovery occurs successfully.
   */
  okRecoveryIcon: PropTypes.node,
  /**
   * Label for the email input.
   */
  emailLabel: PropTypes.string.isRequired,
  /**
   * Placeholder for the email.
   */
  emailPlaceholder: PropTypes.string.isRequired,
  /**
   * Label for the cancel button.
   */
  cancelButton: PropTypes.string.isRequired,
  /**
   * Recovery button label
   */
  recoverButton: PropTypes.string.isRequired,
  /**
   * Recovering message after the recover button is pressed.
   */
  recoveringMessage: PropTypes.string.isRequired,
  /**
   * Recovery title.
   */
  recoveryTitle: PropTypes.string.isRequired,
  /**
   * Message to recover.
   */
  messageToRecover: PropTypes.string.isRequired,
  /**
   * Message shown after recover.
   */
  messageAfterRecover: PropTypes.string.isRequired,
  /**
   * Message shown when an error occurs.
   */
  recoveryErrorMessage: PropTypes.string.isRequired
};

Recovery.defaultProps = {
  okRecoveryIcon: null
};

export default Recovery;
