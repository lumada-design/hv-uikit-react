import React, { TextField, useState } from "react";
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

import classes from "../Input/styles";

// import { validateCharLength, validateInput } from "../Input/validations";

import HvTypography from "../Typography";
import HelperText from "../HelperText";
import styles from "./styles";

import { HvInput, HvButton, HvDropdown } from "../..";

const xlabels = {
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
  const secondNameValue = values.secondName;
  const dropdownValues = values.dropdown_values;

  if (!firstNameValue) {
    errors.firstName = "First Name is Required";
  } else if (firstNameValue.length > 15) {
    errors.firstName = "Must be 15 characters or less";
  }

  if (!secondNameValue) {
    errors.secondName = "Second Name is Required";
  } else if (secondNameValue.length > 15) {
    errors.secondName = "Must be 15 characters or less";
  }

  if (dropdownValues.filter(el => el.selected).length > 2) {
    errors.dropdownValues = "Too many items selected";
  }

  return errors;
};

const SignupForm = () => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      secondName: "",
      // "lastName-input": "",
      // "email-input": "",
      dropdown_values: [
        { label: "Archie" },
        { label: "Betty", selected: true },
        { label: "Jughead" },
        { label: "Veronica" }
      ]
    },
    validate,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    }
  });

  const firstNameLabels = {
    placeholder: "First name",
    infoText: "Insert first name",
    inputLabel: "First Name",
    warningText: "Value is not a string",
    maxCharQuantityWarningText: "String is too long",
    requiredWarningText: "First name required"
  };

  const secondNameLabels = {
    placeholder: "Second name",
    infoText: "Insert second name",
    inputLabel: "Second Name",
    warningText: "Value is not a string",
    maxCharQuantityWarningText: "String is too long",
    requiredWarningText: "Second name required"
  };

  // novalidate suspends form validation, but still submits the form
  // allows formik to handle submission
  // test novalidate -> a11y
  return (
    <form onSubmit={formik.handleSubmit} noValidate>
      <HvInput
        labels={firstNameLabels}
        id="firstName"
        name="firstName"
        isRequired
        onChange={formik.handleChange}
        value={formik.values.firstName}
        validationState={formik.errors.firstName ? "invalid" : "valid"}
        externalWarningTextOverride={formik.errors.firstName}
      />
      <HvInput
        labels={secondNameLabels}
        id="secondName"
        name="secondName"
        isRequired
        // validationType="number"
        onChange={formik.handleChange}
        value={formik.values.secondName}
        validationState={formik.errors.secondName ? "invalid" : "valid"}
        externalWarningTextOverride={formik.errors.secondName}
      />
      <HvDropdown
        id="dropdown"
        multiSelect
        showSearch
        labels={{ title: "Dropdown Title" }}
        values={formik.values.dropdown_values}
        onChange={val => {
          formik.setFieldValue(
            "dropdown_values",
            Object.assign(formik.values.dropdown_values, val)
          );
        }}
      />

      {/* <HelperText
        // replace id setting by withId function
        id="dropdown-description"
        // need to figure out a way to get rid of this variant
        variant="warning"
        // add prop for custom warning label
        // to be wired via others
        labels={{ infoText: "", warningText: "Error" }}
        // hasIcon={showValidationIcon}
        stateValidation={formik.errors.dropdown_values ? "invalid" : "valid"}
        // externalWarningTextOverride={externalWarningTextOverride}
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
