import React, { useState } from "react";
import { useFormik } from "formik";

import {
  Caution,
  LocationPin,
  Map,
  Calendar,
  LineChart,
  Machine,
  Plane,
  User
} from "@hv/uikit-react-icons/dist";

// import * as yup from "yup";
import { withStyles } from "@material-ui/core";
import styles from "./styles";

import HvInput from "../Input";
import HvTextArea from "../TextArea";
import HvDatePicker from "../DatePicker";
import HvButton from "../Button";
import HvDropdown from "../Dropdown";
import HvMultiButton from "../MultiButton";
import HvCheckBox from "../Selectors/CheckBox";
import HvRadio from "../Selectors/RadioButton";
import HvSwitch from "../Switch";
import HvList from "../List";

import HvTabs from "../Tabs";
import HvTab from "../Tab";

const labels = {
  placeholder: "Insert first name",
  infoText: "Please enter your first name",
  inputLabel: "First name",
  warningText: "Error",
  maxCharQuantityWarningText: "Max characters exceeded"
};

const textAreaLabels = {
  placeholder: "Insert some text",
  infoText: "Please enter your first name",
  inputLabel: "Free text",
  warningText: "Error",
  maxCharQuantityWarningText: "Max characters exceeded"
};

const emailLabels = {
  placeholder: "example@domain.com",
  infoText: "Enter your email",
  inputLabel: "Email",
  warningText: "please add the right email format: your.name@hitachivantara.com"
};

/* eslint-disable no-nested-ternary */
const ColoredIcon = Icon => ({ isSelected, isDisabled }) => (
  <Icon color={isSelected ? "atmo1" : isDisabled ? "atmo7" : undefined} />
);

const validate = values => {
  const errors = {};

  const firstNameValue = values.firstName;

  if (!firstNameValue) {
    errors.firstName = "First Name is Required";
  } else if (firstNameValue.length > 15) {
    errors.firstName = "Must be 15 characters or less";
  }

  return errors;
};

const SignupForm = () => {
  const formik = useFormik({
    initialValues: {
      firstName: ""
      // "lastName-input": "",
      // "email-input": "",
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
        name="firstName"
        onChange={formik.handleChange}
        value={formik.values.firstName}
      />
      {/* <HvInput
        labels={labels}
        id="lastName"
        onChange={formik.handleChange}
        value={formik.values.lastName_input}
      />
      <HvInput
        labels={emailLabels}
        id="email"
        onChange={formik.handleChange}
        value={formik.values.email_input}
        validationType="email"
      /> */}

      <div style={{ marginTop: "50px" }}>
        <HvButton
          type="submit"
          className="all"
          id="allProperties"
          classes=""
          startIcon={<Caution />}
          onChange={formik.handleChange}
        >
          Submit
        </HvButton>
      </div>

      <div>
        Formik Errors go here:
        {formik.errors.firstName ? (
          <div style={{ height: "20px", width: "auto" }}>{formik.errors.firstName}</div>
        ) : null}
        {formik.errors.lastName ? (
          <div style={{ height: "20px", width: "auto" }}>{formik.errors.lastName}</div>
        ) : null}
        {formik.errors.textarea_input ? (
          <div style={{ height: "20px", width: "auto" }}>{formik.errors.textarea_input}</div>
        ) : null}
        {formik.errors.email ? (
          <div style={{ height: "20px", width: "auto" }}>{formik.errors.email}</div>
        ) : null}
      </div>
    </form>
  );
};

export default withStyles(styles, { name: "HvFormikBackup" })(SignupForm);
