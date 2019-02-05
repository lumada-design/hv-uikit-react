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
import Input from "../../../Input";
import HvButton, {buttonTypes} from "../../../Button";
import Typography from "@material-ui/core/Typography";
import MessageElement from "../MessageElement";
import classNames from "classnames";


/**
 * The recovery password form.
 */
class Recovery extends React.Component {
  state = {
    email: "",
    isLogging: false,
    recoverStatus: "processing"
  };

  /**
   * Sleep function.
   */
   sleep= (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Submit of the Form. Asynchronous call of the passed recovery function.
   *
   * @param e
   * @returns {Promise<void>}
   */
  handleSubmit = async e => {
    e.preventDefault();

    const {email} = this.state;
    const {recovery} = this.props;

    this.setState({isRecovering: true});
    this.setState({recoverStatus: "processing"});

    try {
      await recovery({email});
      this.setState({recoverStatus: "success"});
      await this.sleep(2000);
      this.props.onClick();
    } catch (error) {
      this.setState({recoverStatus: "error"});
    }finally {
      this.setState({isRecovering: false});
    }
  };

  /**
   * Sets the value of the state of the passed parameter.
   *
   * @returns {function(*=): *}
   */
  handleInputChange = () => value => {
    this.setState({"email": value});
    return value;
  };

  render() {
    const {classes, onClick, okRecoveryIcon} = this.props;
    const {isRecovering, recoverStatus} = this.state;

    return (

        <form className={classes.root} onSubmit={e => this.handleSubmit(e)}>

          <Typography className={classes.title} variant="h3">{"Recover Credentials"}</Typography>

          <div className={classes.messageContainer}>
            {recoverStatus === "success" ?
                <MessageElement iconElement={okRecoveryIcon}
                    icon={classes.iconError}
                    showMessage={classes.showOkMessage}
                    message="The instructions to recover your credentials were sent." />
                :
                <p className={classes.instructions}>You will receive an email with instructions to recover your credentials.</p>}
          </div>

          <div className={classes.input}>
            <Input className
                inputTextConfiguration={{
                  inputLabel: "Email",
                  placeholder: "Enter text",
                }}
                password={false}
                onChange={this.handleInputChange()}
                externalWarningTextOverride={recoverStatus == "error" ? "The email you've entered doesn't match any account": null}
            />
          </div>

          <div className={classNames({[classes.buttonsContainer]: recoverStatus !== "error"},
              {[classes.buttonsContainerError]: recoverStatus === "error"})} >

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

export default Recovery;
