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
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import CircularProgress from "@material-ui/core/CircularProgress";
import InputAdornment from "@material-ui/core/InputAdornment";
import Lock from "@material-ui/icons/Lock";
import Person from "@material-ui/icons/Person";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "./styles";

const SpinnerAdornment = withStyles(styles)(props => {
  const { classes } = props;
  return (
    <CircularProgress
      style={{ color: "white" }}
      className={classes.spinner}
      size={15}
    />
  );
});

class Form extends React.Component {
  state = {
    username: "",
    password: "",
    isLogging: false
  };

  handleSubmit = async e => {
    e.preventDefault();

    const { username, password } = this.state;
    const { login } = this.props;

    this.setState({ isLogging: true });

    try {
      await login({ username, password });
    } catch (error) {
      // TODO: handle authentication errors properly
    }

    this.setState({ isLogging: false });
  };

  handleInputChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  checkInput = () => {
    const { username, password } = this.state;
    return username.length === 0 || password.length === 0;
  };

  render() {
    const { classes } = this.props;
    const { showPassword, username, password, isLogging } = this.state;

    return (
      <form className={classes.root} onSubmit={e => this.handleSubmit(e)}>
        <InputLabel className={classes.label}>Username</InputLabel>
        <Input
          autoFocus
          type="text"
          value={username}
          onChange={this.handleInputChange("username")}
          className={classes.input}
          inputProps={{ name: "username" }}
          startAdornment={(
            <InputAdornment position="start">
              <Person style={{ fontSize: 19 }} />
            </InputAdornment>
)}
        />
        <InputLabel className={classes.label}>Password</InputLabel>
        <Input
          type={showPassword ? "text" : "password"}
          value={password}
          className={classes.input}
          onChange={this.handleInputChange("password")}
          inputProps={{ name: "password" }}
          startAdornment={(
            <InputAdornment position="start">
              <Lock style={{ fontSize: 19 }} />
            </InputAdornment>
)}
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          className={classes.button}
          disabled={this.checkInput()}
        >
          {isLogging ? <SpinnerAdornment /> : "Log in"}
        </Button>
      </form>
    );
  }
}

Form.displayName = "Form";

Form.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  login: PropTypes.instanceOf(Function).isRequired
};

export default Form;
