import { useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  HvInput,
  HvButton,
  HvCheckBoxGroup,
  HvCheckBox,
  HvDropdown,
  HvListValue,
} from "@hitachivantara/uikit-react-core";

const schema = z.object({
  textField: z.string({ required_error: "Text Field is required" }),
  dropdown: z.string({ required_error: "Dropdown is required" }),
  checkboxes: z.array(z.string()).optional(),
});

type FormSchema = z.infer<typeof schema>;

export default () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormSchema>({
    mode: "onBlur",
    resolver: zodResolver(schema),
    defaultValues: {
      checkboxes: [],
      dropdown: "",
      textField: "",
    },
  });

  const parseStatus = (name) => {
    return errors?.[name] ? "invalid" : "valid";
  };

  const parseStatusMessage = (name) => {
    return errors?.[name]?.message || "";
  };

  const dropdownValues = useMemo(
    () =>
      [...Array(4)].map((el, i) => ({
        id: `v${i + 1}`,
        label: `Value ${i + 1}`,
      })),
    []
  );

  return (
    <form
      style={{ width: 310 }}
      onSubmit={handleSubmit((data) => alert(JSON.stringify(data, null, 2)))}
    >
      <Controller
        name="textField"
        control={control}
        render={({ field }) => (
          <HvInput
            {...field}
            label="Text Field"
            status={parseStatus(field.name)}
            statusMessage={parseStatusMessage(field.name)}
          />
        )}
      />
      <br />
      <Controller
        name="dropdown"
        control={control}
        render={({ field: { name, onChange } }) => (
          <HvDropdown
            name={name}
            label="Dropdown"
            values={dropdownValues}
            status={parseStatus(name)}
            statusMessage={parseStatusMessage(name)}
            onChange={(selection) => {
              const selectionId = (selection as HvListValue)?.id;
              onChange(selectionId as string, { shouldValidate: true });
            }}
          />
        )}
      />
      <br />
      <br />
      <Controller
        name="checkboxes"
        control={control}
        render={({ field: { name, onChange } }) => (
          <HvCheckBoxGroup
            name={name}
            label="Checkboxes"
            orientation="vertical"
            onChange={(evt, value) => onChange(value, { shouldValidate: true })}
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
      <HvButton type="submit">Submit</HvButton>
    </form>
  );
};
