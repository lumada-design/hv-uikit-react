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
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import Input from "../../../Input";
import HvButton, { buttonTypes } from "../../../Button";
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
    const { classes, onClick, okRecoveryIcon } = this.props;
    const { isRecovering, recoverStatus } = this.state;

    return (
      <form className={classes.root} onSubmit={e => this.handleSubmit(e)}>
        <Typography className={classes.title} variant="h3">
          {"Recover Credentials"}
        </Typography>

        <div className={classes.messageContainer}>
          {recoverStatus === "success" ? (
            <MessageElement
              iconElement={okRecoveryIcon}
              icon={classes.iconError}
              showMessage={classes.showOkMessage}
              message="The instructions to recover your credentials were sent."
            />
          ) : (
            <p className={classes.instructions}>
              You will receive an email with instructions to recover your
              credentials.
            </p>
          )}
        </div>

        <div className={classes.input}>
          <Input
            inputTextConfiguration={{
              inputLabel: "Email",
              placeholder: "Enter text"
            }}
            password={false}
            onChange={this.handleInputChange()}
            externalWarningTextOverride={
              recoverStatus === "error"
                ? "The email you've entered doesn't match any account"
                : null
            }
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
            colorType={buttonTypes.primary}
          >
            {isRecovering ? "Recovering" : "Recover"}
          </HvButton>
          <HvButton
            className={classes.cancelButton}
            type="submit"
            onClick={onClick}
            colorType={buttonTypes.secondary}
          >
            Cancel
          </HvButton>
        </div>
      </form>
    );
  }
}

Recovery.displayName = "recoveryForm";

Recovery.propTypes = {
  /**
   * the classes object to be applied into the root object.
   */
  classes: PropTypes.instanceOf(Object).isRequired,
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
  okRecoveryIcon: PropTypes.node
};

Recovery.defaultProps = {
  okRecoveryIcon: null
};

export default Recovery;
