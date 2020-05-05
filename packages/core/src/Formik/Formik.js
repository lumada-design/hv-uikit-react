import React, { useState } from "react";
import { Formik, Field, useFormik, useField } from "formik";
// import { useFormikContext } from "formik";
import { TextField } from "formik-material-ui";

import { Caution } from "@hv/uikit-react-icons/dist";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core";
import Typography from "../Typography";
import styles from "./styles";

import HvInput from "../Input";
import HvTextArea from "../TextArea";
import HvDatePicker from "../DatePicker";
import HvButton from "../Button";

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

const validate = values => {
  const errors = {};
  // if (!values.firstName_input) {
  //   errors.firstName = "Required";
  // } else if (values.firstName_input.length > 15) {
  //   errors.firstName = "Must be 15 characters or less";
  // }

  // if (!values.lastName_input) {
  //   errors.lastName = "Required";
  // } else if (values.lastName_input.length > 20) {
  //   errors.lastName = "Must be 20 characters or less";
  // }

  // if (!values.email_input) {
  //   errors.email = "Email is Required";
  // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email_input)) {
  //   errors.email = "Invalid email address";
  // }

  if (values.textarea_input.length > 9) {
    errors.textarea_input = "Too many characters";
  }
  debugger;
  return errors;
};

const SignupForm = () => {
  const [textLength, setTextLength] = useState(0);

  /**
   * 
   *  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);
  return (
    <DatePicker
      {...field}
      {...props}
      selected={(field.value && new Date(field.value)) || null}
      onChange={val => {
        setFieldValue(field.name, val);
      }}
    />
   */

  // const { setFieldValue } = useFormikContext();
  // const [field] = useField(props);

  const setCounter = (event, data) => {
    setTextLength(data.length);
    return data;
  };

  // Notice that we have to initialize ALL of fields with values. These
  // could come from props, but since we don't want to prefill this form,
  // we just use an empty string. If you don't do this, React will yell
  // at you.
  const formik = useFormik({
    initialValues: {
      firstName_input: "",
      lastName_input: "",
      email_input: "",
      textarea_input: "",
      DatePicker_input: "",
      allProperties: ""
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
      {formik.errors.firstName ? (
        <div style={{ height: "20px", width: "auto" }}>{formik.errors.firstName}</div>
      ) : null}
      <HvInput
        labels={labels}
        id="lastName"
        onChange={formik.handleChange}
        value={formik.values.lastName_input}
      />
      {formik.errors.lastName ? (
        <div style={{ height: "20px", width: "auto" }}>{formik.errors.lastName}</div>
      ) : null}
      <HvInput
        labels={emailLabels}
        id="email"
        onChange={formik.handleChange}
        value={formik.values.email_input}
        validationType="email"
      />
      <div>
        <HvTextArea
          id="textarea"
          rows={5}
          labels={textAreaLabels}
          maxCharQuantity={10}
          blockMax
          onChange={formik.handleChange}
          // onChange={setCounter}
          countCharProps={{ "aria-label": `You have inserted ${textLength} characters` }}
        />
        {formik.errors.textarea_input ? (
          <div style={{ height: "20px", width: "auto" }}>{formik.errors.textarea_input}</div>
        ) : null}
      </div>
      <HvDatePicker
        id="DatePicker"
        // onChange={formik.handleChange}
        value={formik.values.DatePicker_input}
        // onChange={val => {
        //   setFieldValue(DatePicker_input, val);
        // }}
        // onChange={val => {
        //   setFieldValue(field.name, val);
        // }}
        // onChange={e => alert(e)}
      />
      <div>
        Formik Errors go here:
        {formik.errors.email ? (
          <div style={{ height: "20px", width: "auto" }}>{formik.errors.email}</div>
        ) : null}
      </div>

      <HvButton
        className="all"
        id="allProperties"
        classes=""
        startIcon={<Caution />}
        // onClick={() => alert("incorrect")}
        onChange={formik.handleChange}
      >
        all properties
      </HvButton>

      <button type="submit">Submit</button>
    </form>
  );
};

export default withStyles(styles, { name: "HvFormikBackup" })(SignupForm);
