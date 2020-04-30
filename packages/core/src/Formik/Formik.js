import React from "react";
import { Formik, Field, useFormik } from "formik";
import { TextField } from "formik-material-ui";

import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core";
import Typography from "../Typography";
import styles from "./styles";

import HvInput from "../Input";

const labels = {
  placeholder: "Insert first name",
  infoText: "Please enter your first name",
  inputLabel: "First name",
  warningText: "Error",
  maxCharQuantityWarningText: "Max characters exceeded"
};

const emailLabels = {
  placeholder: "example@domain.com",
  infoText: "Enter your email",
  inputLabel: "Email",
  warningText: "please add the right email format: your.name@hitachivantara.com"
};

const validate = values => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = "Required";
  } else if (values.firstName.length > 15) {
    errors.firstName = "Must be 15 characters or less";
  }

  if (!values.lastName) {
    errors.lastName = "Required";
  } else if (values.lastName.length > 20) {
    errors.lastName = "Must be 20 characters or less";
  }

  if (!values.email_input) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  return errors;
};

const SignupForm = () => {
  // Notice that we have to initialize ALL of fields with values. These
  // could come from props, but since we don't want to prefill this form,
  // we just use an empty string. If you don't do this, React will yell
  // at you.
  const formik = useFormik({
    initialValues: {
      firstName_input: "",
      lastName: "",
      email_input: ""
    },
    validate,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    }
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <HvInput
        labels={labels}
        id="firstName"
        onChange={formik.handleChange}
        value={formik.values.firstName_input}
      />
      <HvInput
        labels={emailLabels}
        id="email"
        onChange={formik.handleChange}
        value={formik.values.email_input}
        validationType="email"
      />
      {formik.errors.email ? <div>{formik.errors.email_input}</div> : null}
      <button type="submit">Submit</button>
    </form>
  );
};

export default withStyles(styles, { name: "HvFormik" })(SignupForm);
