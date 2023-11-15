import { useMemo, useState } from "react";
import {
  HvInput,
  HvButton,
  HvCheckBoxGroup,
  HvCheckBox,
  HvDropdown,
} from "@hitachivantara/uikit-react-core";
import { z } from "zod";

const formSchema = z.object({
  textField: z.string({ required_error: "Text Field is required" }),
  dropdown: z.string({ required_error: "Dropdown is required" }),
  checkboxes: z.array(z.string()).optional(),
});

type FormSchema = z.infer<typeof formSchema>;

const validate = (data: Partial<FormSchema>) =>
  new Promise((resolve, reject) => {
    const err: Record<string, string> = {};

    if (data.textField && !data.textField.length)
      err.textField = "Text Field is required";

    if (data.dropdown && !data.dropdown.length)
      err.dropdown = "Dropdown is required";

    if (Object.keys(err).length > 0) {
      reject(err);
    } else {
      resolve(data);
    }
  });

export default () => {
  const [data, setData] = useState<FormSchema>({
    textField: "",
    dropdown: "",
    checkboxes: [],
  });

  const [errors, setErrors] = useState<any>(null);

  const setValue = (name: keyof FormSchema, value: any) => {
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
      onSubmit={(evt) => {
        evt.preventDefault();

        console.log("submitting");

        validate(data)
          .then((formData) => {
            console.log("success", formData);
            setErrors(null);
            alert(JSON.stringify(formData, null, 2));
          })
          .catch((err) => {
            console.log("error", err);
            setErrors((prevErr) => ({ ...prevErr, ...err }));
          });
      }}
    >
      <HvInput
        name="textField"
        label="Text Field"
        status={errors?.textField ? "invalid" : "valid"}
        statusMessage={errors?.textField || ""}
        onChange={(evt, value) => setValue("textField", value)}
      />
      <br />
      <HvDropdown
        name="dropdown"
        label="Dropdown"
        values={dropdownValues}
        status={errors?.dropdown ? "invalid" : "valid"}
        statusMessage={errors?.dropdown || ""}
        onChange={(selection) => {
          setValue("dropdown", selection?.id || "");
        }}
      />
      <br />
      <br />
      <HvCheckBoxGroup
        name="checkboxes"
        label="Checkboxes"
        orientation="vertical"
        onChange={(evt, value) => setValue("checkboxes", value)}
      >
        <HvCheckBox label="Option 1" value="1" />
        <HvCheckBox label="Option 2" value="2" />
        <HvCheckBox label="Option 3" value="3" />
        <HvCheckBox label="Option 4" value="4" />
      </HvCheckBoxGroup>
      <br />
      <br />
      <HvButton type="submit">Submit</HvButton>
    </form>
  );
};
