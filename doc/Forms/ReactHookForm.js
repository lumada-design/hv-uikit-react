import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { HvInput, HvButton, HvCheckBoxGroup, HvCheckBox, HvDropdown } from "@hv/uikit-react-core";

const schema = yup.object().shape({
  textField: yup.string().required("Text Field is required"),
  dropdown: yup.array().required("Dropdown is required").min(1),
});

const onSubmit = (data) => alert("React Hook: " + JSON.stringify(data));

export default () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const parseStatus = (name) => {
    return errors?.[name] ? "invalid" : "valid";
  };

  const parseStatusMessage = (name) => {
    return errors?.[name]?.message || "";
  };

  return (
    <div style={{ width: 310 }}>
      <form onSubmit={handleSubmit(onSubmit)} mode="onBlur">
        <Controller
          name="textField"
          control={control}
          render={({ field: { name } }) => (
            <HvInput
              name={name}
              label="Text Field"
              status={parseStatus(name)}
              statusMessage={parseStatusMessage(name)}
              onChange={(evt, value) => setValue(name, value, { shouldValidate: true })}
            />
          )}
        />
        <br />
        <Controller
          name="dropdown"
          control={control}
          render={({ field: { name } }) => (
            <HvDropdown
              name={name}
              label="Dropdown"
              values={[
                { label: "Value 1" },
                { label: "Value 2" },
                { label: "Value 3" },
                { label: "Value 4" },
              ]}
              status={parseStatus(name)}
              statusMessage={parseStatusMessage(name)}
              onChange={(selection) => {
                const value = [].concat(selection || []);
                setValue(name, value, { shouldValidate: true });
              }}
            />
          )}
        />
        <br />
        <br />
        <Controller
          name="checkboxes"
          control={control}
          render={({ field: { name } }) => (
            <HvCheckBoxGroup
              name={name}
              label="Checkboxes"
              orientation="horizontal"
              onChange={(evt, value) => setValue(name, value, { shouldValidate: true })}
            >
              <HvCheckBox label="Option 1" value="1" />
              <HvCheckBox label="Option 2" value="2" />
              <HvCheckBox label="Option 3" value="3" />
              <HvCheckBox label="Option 4" value="4" />
            </HvCheckBoxGroup>
          )}
        />
        <br />
        <br />
        <HvButton type="submit" category="secondary">
          Submit
        </HvButton>
      </form>
    </div>
  );
};
