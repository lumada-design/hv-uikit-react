import React, { useState } from "react";
import { useFormik } from "formik";

import { useForm } from "react-hook-form";

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

  const firstNameValue = values["firstName-input"];
  const lastNameValue = values["lastName-input"];
  const emailValue = values["email-input"];
  const textAreaContent = values["textarea-input"];

  if (!firstNameValue) {
    errors.firstName = "First Name is Required";
  } else if (firstNameValue.length > 15) {
    errors.firstName = "Must be 15 characters or less";
  }

  if (!lastNameValue) {
    errors.lastName = "Last Name is Required";
  } else if (lastNameValue.length > 20) {
    errors.lastName = "Must be 20 characters or less";
  }

  if (!emailValue) {
    errors.email = "Email is Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(emailValue)) {
    errors.email = "Invalid email address";
  }

  if (textAreaContent.length > 9) {
    errors.textarea_input = "Too many characters";
  }

  return errors;
};

const SignupForm = () => {
  const [textLength, setTextLength] = useState(0);

  let multiButtonSet = [
    { id: "map", value: "Map", icon: <Map />, selected: true, enforced: true },
    { id: "satellite", value: "Satellite", icon: <LocationPin /> },
    { id: "map1", value: "Chart", icon: <Map />, selected: true },
    { id: "satellite1", value: "Place", icon: <LocationPin /> }
  ];

  const updateMBSet = newState => {
    const ns = newState;
    const newArray = multiButtonSet.map(item => {
      if (ns.indexOf(item.id) !== -1) {
        item.selected = true;
      } else {
        item.selected = undefined;
      }
    });
    return newArray;
  };

  const formik = useFormik({
    initialValues: {
      "firstName-input": "",
      "lastName-input": "",
      "email-input": "",
      "textarea-input": "",
      "datePicker-input": "2020-05-05",
      dropdown_values: [
        { label: "Archie" },
        { label: "Betty", selected: true },
        { label: "Jughead" },
        { label: "Veronica" }
      ],
      allProperties: "",
      "checkA-input": "",
      "checkB-input": "",
      "checkC-input": "",
      "radio1-input": "",
      "radio2-input": "",
      "radio3-input": "",
      switch: "off",
      list: [
        { label: "Advanced server DS120", iconCallback: ColoredIcon(User) },
        { label: "Advanced server DS122", iconCallback: ColoredIcon(Calendar) },
        { label: "Advanced server DS250", selected: true, iconCallback: ColoredIcon(Machine) },
        { label: "Advanced server DS530", disabled: true, iconCallback: ColoredIcon(Plane) },
        { label: "Advanced server DS555", iconCallback: ColoredIcon(LineChart) }
      ]
    },
    validate,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    }
  });

  const tabOne = (
    <>
      <HvInput
        labels={labels}
        id="firstName"
        onChange={formik.handleChange}
        value={formik.values.firstName_input}
      />
      <HvInput
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
      />
    </>
  );

  const tabTwo = (
    <>
      <div>
        <HvTextArea
          id="textarea"
          rows={5}
          labels={textAreaLabels}
          maxCharQuantity={10}
          blockMax
          onChange={formik.handleChange}
          countCharProps={{ "aria-label": `You have inserted ${textLength} characters` }}
        />
      </div>
      <HvDatePicker
        id="datePicker"
        value={formik.values.datePicker_input}
        onChange={val => {
          formik.setFieldValue("datePicker-input", val);
        }}
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
    </>
  );

  const tabThree = (
    <>
      <div style={{ width: "500px", marginTop: "50px" }}>
        <HvMultiButton
          multi
          type="mixed"
          buttons={multiButtonSet}
          onChange={(e, newState) => updateMBSet(newState)}
        />
      </div>
      <div style={{ width: "500px", marginTop: "50px" }}>
        <HvCheckBox id="checkA" label="Click me A!" value="A" onChange={formik.handleChange} />
        <HvCheckBox id="checkB" label="Click me B!" value="B" onChange={formik.handleChange} />
        <HvCheckBox id="checkC" label="Click me C!" value="C" onChange={formik.handleChange} />
      </div>
      <div style={{ width: "500px", marginTop: "50px" }}>
        <HvRadio
          id="radio1"
          label="Label A"
          value="A"
          onChange={val => {
            formik.setFieldValue("radio1-input", val.target.value);
          }}
        />
        <HvRadio
          id="radio2"
          label="Label B"
          value="B"
          onChange={val => {
            formik.setFieldValue("radio2-input", val.target.value);
          }}
        />
        <HvRadio
          id="radio3"
          label="Label C"
          value="C"
          onChange={val => {
            formik.setFieldValue("radio3-input", val.target.value);
          }}
        />
      </div>
      <div style={{ width: "500px", marginTop: "50px" }}>
        <HvSwitch
          id="switch"
          checked={false}
          labels={{
            left: "Disconnect",
            right: "Connect"
          }}
          aria-label="Server online"
          value={formik.values.switch}
          onChange={val => {
            const switchValue = val.target.value === "off" ? "on" : "off";
            formik.setFieldValue("switch", switchValue);
          }}
        />
      </div>

      <div style={{ width: "250px", marginTop: "50px" }}>
        <HvList
          id="list"
          style={{ marginLeft: -10 }}
          selectDefault
          aria-label="Single Selection List with Left Icons Title"
          values={formik.values.list}
          onChange={val => {
            formik.setFieldValue("list", val);
          }}
        />
      </div>

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
    </>
  );

  const renderContainer = id =>
    id === "container1" ? tabOne : id === "container2" ? tabTwo : tabThree;

  const [value, setValue] = useState(0);
  const handleChange = (e, newValue) => setValue(newValue);

  return (
    <form onSubmit={formik.handleSubmit}>
      <>
        <HvTabs id="tabs" value={value} onChange={handleChange}>
          <HvTab id="tabs-tab1" label="Clickable tab 1" />
          <HvTab id="tabs-tab2" label="Clickable tab 2" />
          <HvTab id="tabs-tab3" label="Clickable tab 3" />
        </HvTabs>
        {value === 0 && renderContainer("container1")}
        {value === 1 && renderContainer("container2")}
        {value === 2 && renderContainer("container3")}
      </>
    </form>
  );
};

export default withStyles(styles, { name: "HvFormikBackup" })(SignupForm);
