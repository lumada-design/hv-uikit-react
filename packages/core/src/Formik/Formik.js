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

import classes from "../Input/styles";

import { validateCharLength, validateInput } from "../Input/validations";

import HvTypography from "../Typography";
import styles from "./styles";

import HvInput from "../Input";
import HvButton from "../Button";

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

  // const customLabel = (label, variant, others) => {
  //   return (
  //     <HvTypography
  //       variant={variant || "labelText"}
  //       component="label"
  //       // id={`${id}-label`}
  //       // htmlFor={`${id}-input`}
  //       // className={clsx(classes.label, {
  //       //   [classes.labelDisabled]: disabled
  //       // })}
  //       {...others}
  //     >
  //       {label || "Blah"}
  //       {/* {isRequired && <span aria-hidden="true">*</span>} */}
  //     </HvTypography>
  //   );
  // };

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

  // const validationStates = {
  //   empty: "empty",
  //   filled: "filled",
  //   valid: "valid",
  //   invalid: "invalid"
  // };

  // const validationFunction = incomingState => {
  //   const { value } = incomingState.state;
  //   const { onBlur, labels, isRequired } = incomingState.props;
  //   const { validation, validationType, minCharQuantity, maxCharQuantity } = incomingState.props;

  //   let validationState;
  //   let warningText = null;

  //   if (!value || value === "") {
  //     if (isRequired) {
  //       validationState = validationStates.invalid;
  //       warningText = labels.requiredWarningText;
  //     } else {
  //       validationState = validationStates.empty;
  //     }
  //   } else {
  //     const valueSizeStatus = validateCharLength(value, maxCharQuantity, minCharQuantity);
  //     const valid = validateInput(value, validation, validationType);

  //     if (valid && valueSizeStatus) {
  //       validationState = validationStates.valid;
  //     } else if (!valid || !valueSizeStatus) {
  //       validationState = validationStates.invalid;

  //       if (maxCharQuantity && value.length > maxCharQuantity) {
  //         warningText = labels.maxCharQuantityWarningText;
  //       } else if (minCharQuantity && value.length < minCharQuantity) {
  //         warningText = labels.minCharQuantityWarningText;
  //       } else {
  //         // eslint-disable-next-line prefer-destructuring
  //         warningText = labels.warningText;
  //       }
  //     }
  //   }

  //   incomingState.setState({ validationState, warningText });
  //   onBlur(value, validationState);
  // };

  return (
    <form onSubmit={formik.handleSubmit}>
      {/* <div>{customLabel(xlabels.inputLabel, "labelText")}</div> */}
      <HvInput
        labels={firstNameLabels}
        id="firstName"
        name="firstName"
        isRequired
        onChange={formik.handleChange}
        value={formik.values.firstName}
        validationState={formik.errors.firstName ? "invalid" : "valid"}
        externalWarningTextOverride={formik.errors.firstName}
        // labels={{ placeholder: "Something Something" }}
        // validationFunction={validationFunction}
      />
      <HvInput
        labels={secondNameLabels}
        id="secondName"
        name="secondName"
        isRequired
        onChange={formik.handleChange}
        // value={formik.values.secondName}
        // validationState={formik.errors.secondName ? "invalid" : "valid"}
        // externalWarningTextOverride={formik.errors.secondName}
        // labels={{ placeholder: "Something Something" }}
        // validationFunction={validationFunction}
      />
      {/* {customLabel(labels.infoText, "infoText")} */}
      {/* {customLabel(
        formik.errors.firstName ? formik.errors.firstName : xlabels.infoText,
        formik.errors.firstName ? "sText" : "infoText"
      )} */}
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
