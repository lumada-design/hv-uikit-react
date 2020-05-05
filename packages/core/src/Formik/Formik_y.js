import React from "react";
import { useFormik, Formik, Form } from "formik";

import { Caution } from "@hv/uikit-react-icons/dist";

import { withStyles } from "@material-ui/core";
import styles from "./styles";

import HvDatePicker from "../DatePicker";
import HvInput from "../Input";

const firstLabels = {
  placeholder: "Insert first name",
  infoText: "Please enter your first name",
  inputLabel: "First name",
  warningText: "Error",
  maxCharQuantityWarningText: "Max characters exceeded"
};

const lastLabels = {
  placeholder: "Insert last name",
  infoText: "Please enter your last name",
  inputLabel: "Last name",
  warningText: "Error",
  maxCharQuantityWarningText: "Max characters exceeded"
};

const emailLabels = {
  placeholder: "example@domain.com",
  infoText: "Enter your email",
  inputLabel: "Email",
  warningText: "please add the right email format: your.name@hitachivantara.com"
};

const SignupForm = () => {
  return (
    <Formik
      initialValues={{
        startDate: "2020-05-05",
        firstName: "Joe",
        lastName: "Schmoe",
        email: "mail@mail.com"
      }}
      validate={values => {
        const errors = {};

        if (!values.firstName_input) {
          errors.firstName = "Required";
        } else if (values.firstName_input.length > 15) {
          errors.firstName = "Must be 15 characters or less";
        }

        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        alert("Stuff");
        // setTimeout(() => {
        //   alert(JSON.stringify(values, null, 2));
        //   setSubmitting(false);
        // }, 400);
      }}
    >
      {({ isSubmitting, values, setFieldValue, errors }) => (
        <div className="row clearfix">
          <Form>
            <HvInput
              labels={firstLabels}
              id="firstName"
              onChange={firstName => setFieldValue("firstName", firstName.target.value)}
              value={values.firstName}
            />
            {errors.firstName ? (
              <div style={{ height: "20px", width: "auto" }}>{errors.firstName}</div>
            ) : null}
            <HvInput
              labels={lastLabels}
              id="lastName"
              onChange={lastName => setFieldValue("lastName", lastName.target.value)}
              value={values.lastName}
            />
            <HvInput
              labels={emailLabels}
              id="email"
              onChange={email => setFieldValue("email", email.target.value)}
              value={values.email}
              validationType="email"
            />
            <div style={{ marginTop: "450px" }}>
              <HvDatePicker
                id="datePicker"
                value={values.startDate}
                onChange={date => setFieldValue("startDate", date)}
              />
            </div>
            <div className="row mb-3">
              <button
                type="submit"
                className="btn btn-lg btn-outline-success mt-4 mb-4"
                disabled={isSubmitting}
              >
                insert item
              </button>
            </div>
          </Form>
        </div>
      )}
    </Formik>

    // <Formik
    //   onSubmit={() => {}}
    //   validate={() => {}}
    //   render={({ handleSubmit, handleChange, handleBlur, values, errors }) => {
    //     <form onSubmit={handleSubmit}>
    //       <div style={{ marginTop: "450px" }}>
    //         <HvDatePicker
    //           id="DatePicker"
    //           onChange={val => {
    //             setFieldValue(name, val);
    //           }}
    //         />
    //       </div>
    //     </form>;
    //   }}
    // />
  );
};

export default withStyles(styles, { name: "HvFormik" })(SignupForm);
