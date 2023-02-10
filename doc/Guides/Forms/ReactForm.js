import React, { useState } from "react";
import {
  HvInput,
  HvButton,
  HvCheckBoxGroup,
  HvCheckBox,
  HvDropdown,
} from "@hitachivantara/uikit-react-core";

const validate = (data) =>
  new Promise((resolve, reject) => {
    const err = {};

    if (data.hasOwnProperty("textField") && !data.textField.length)
      err.textField = "Text Field is required";

    if (data.hasOwnProperty("dropdown") && !data.dropdown.length)
      err.dropdown = "Dropdown is required";

    Object.keys(err).length > 0 ? reject(err) : resolve();
  });

export default () => {
  const [data, setData] = useState({
    textField: "",
    dropdown: [],
    checkboxes: [],
  });

  const [errors, setErrors] = useState(null);

  const setValue = (name, value) => {
    const newData = { [name]: value };

    validate(newData)
      .then(() => {
        setErrors((prevErr) => ({ ...prevErr, [name]: null }));
        setData((prevData) => ({ ...prevData, ...newData }));
      })
      .catch((err) => {
        setErrors((prevErr) => ({ ...prevErr, ...err }));
        setData((prevData) => ({ ...prevData, [name]: null }));
      });
  };

  const onSubmit = (evt) => {
    evt.preventDefault();

    validate(data)
      .then(() => {
        setErrors(null);
        alert("UIKit: " + JSON.stringify(data));
      })
      .catch((err) => {
        setErrors((prevErr) => ({ ...prevErr, ...err }));
      });
  };

  return (
    <div style={{ width: 310 }}>
      <form onSubmit={onSubmit}>
        <HvInput
          name="textField"
          label="TextField"
          status={errors?.textField ? "invalid" : "valid"}
          statusMessage={errors?.textField || ""}
          onChange={(evt, value) => setValue("textField", value)}
        />
        <br />
        <HvDropdown
          name="dropdown"
          label="Dropdown"
          values={[
            { label: "Value 1" },
            { label: "Value 2" },
            { label: "Value 3" },
            { label: "Value 4" },
          ]}
          status={errors?.dropdown ? "invalid" : "valid"}
          statusMessage={errors?.dropdown || ""}
          onChange={(selection) => {
            const value = [].concat(selection || []);
            setValue("dropdown", value);
          }}
        />
        <br />
        <br />
        <HvCheckBoxGroup
          name="checkboxes"
          label="Checkboxes"
          orientation="horizontal"
          onChange={(evt, value) => setValue("checkboxes", value)}
        >
          <HvCheckBox label="Option 1" value="1" />
          <HvCheckBox label="Option 2" value="2" />
          <HvCheckBox label="Option 3" value="3" />
          <HvCheckBox label="Option 4" value="4" />
        </HvCheckBoxGroup>
        <br />
        <br />
        <HvButton type="submit" category="secondary">
          Submit
        </HvButton>
      </form>
    </div>
  );
};
