import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  HvButton,
  HvTypography,
  HvLabel,
  HvBaseInput,
  HvCheckBox
} from "@hitachivantara/uikit-react-core";
import Message from "../Message";

const DUMMY_CREDENTIALS = { username: "admin", password: "password" };

const LoginForm = ({ classes, onSubmit, onRecover, status }) => {
  const [credentials, setCredentials] = useState(DUMMY_CREDENTIALS);
  const isPending = status === "pending";
  const isSuccess = status === "success";
  const isError = status === "error";
  const showRecover = !!onRecover;

  const handleChange = (evt, key) => {
    const newCredentials = {
      ...credentials,
      ...{ [key]: evt.target.value }
    };
    setCredentials(newCredentials);
  };

  return (
    <div className={classes.root}>
      <HvTypography variant="mTitle">Welcome</HvTypography>

      {(isError || isSuccess) && (
        <Message
          message={{
            error: "Login error!",
            success: "Welcome!"
          }}
          status={status}
        />
      )}

      <HvLabel id="username-label" label="Username" classes={{ root: classes.input }}>
        <HvBaseInput
          id="username-input"
          placeholder="Enter text"
          value={credentials.username}
          inputProps={{ autoFocus: true }}
          onChange={evt => handleChange(evt, "username")}
        />
      </HvLabel>

      <HvLabel id="password-label" label="Password" classes={{ root: classes.input }}>
        <HvBaseInput
          id="password-input"
          placeholder="Enter text"
          value={credentials.password}
          inputProps={{
            type: "password"
          }}
          onChange={evt => handleChange(evt, "password")}
        />
      </HvLabel>

      <HvCheckBox
        classes={{
          container: classes.checkBox,
          labelTypography: classes.checkBoxTypography
        }}
        label="Remember"
      />

      <HvButton
        type="submit"
        category="primary"
        className={clsx(classes.login, classes.sentenceCase)}
        onClick={() => onSubmit(credentials)}
        disabled={isPending}
      >
        {isPending ? "Logging" : "Login"}
      </HvButton>

      {showRecover && (
        <HvButton
          category="ghost"
          classes={{
            root: classes.forgot
          }}
          className={clsx(classes.sentenceCase)}
          onClick={onRecover}
          disabled={isPending}
        >
          Forgot your credentials?
        </HvButton>
      )}
    </div>
  );
};

LoginForm.propTypes = {
  /**
   * The classes object to be applied into the root object.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to root element.
     */
    root: PropTypes.string,
    /**
     * Styles applied to input element.
     */
    input: PropTypes.string,
    /**
     * Styles applied to checkBox element.
     */
    checkBox: PropTypes.string,
    /**
     * Styles applied to checkBoxTypography element.
     */
    checkBoxTypography: PropTypes.string,
    /**
     * Styles applied to login element.
     */
    login: PropTypes.string,
    /**
     * Styles applied to forgot element.
     */
    forgot: PropTypes.string,
    /**
     * Styles applied to sentenceCase element.
     */
    sentenceCase: PropTypes.string
  }).isRequired,
  /**
   * Callback to trigger on login action.
   */
  onSubmit: PropTypes.func.isRequired,
  /**
   * Callback to trigger on forgot action.
   */
  onRecover: PropTypes.func,
  /**
   * Login status.
   */
  status: PropTypes.string.isRequired
};

export default LoginForm;
