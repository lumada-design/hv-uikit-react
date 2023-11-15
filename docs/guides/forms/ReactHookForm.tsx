import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  HvInput,
  HvButton,
  HvCheckBoxGroup,
  HvCheckBox,
  HvDropdown,
} from "@hitachivantara/uikit-react-core";

const schema = z.object({
  textField: z.string({ required_error: "Text Field is required" }),
  dropdown: z.array(z.string()).min(1, { message: "Dropdown is required" }),
});

const onSubmit = (data) => alert(`Data: ${JSON.stringify(data)}`);

export default () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm({
    resolver: zodResolver(schema),
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
              onChange={(evt, value) =>
                setValue(name, value, { shouldValidate: true })
              }
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
              onChange={(evt, value) =>
                setValue(name, value, { shouldValidate: true })
              }
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
