import { Formik } from "formik";
import * as yup from "yup";
import {
  HvInput,
  HvButton,
  HvCheckBoxGroup,
  HvCheckBox,
  HvDropdown,
} from "@hitachivantara/uikit-react-core";

const validationSchema = yup.object({
  textField: yup.string().required("Text Field is required"),
  dropdown: yup.array().required("Dropdown is required").min(1),
});

const onSubmit = (data) => alert(`Data: ${JSON.stringify(data)}`);

export default () => (
  <Formik
    initialValues={{
      textField: "",
      dropdown: [],
      checkboxes: [],
    }}
    validationSchema={validationSchema}
    onSubmit={onSubmit}
  >
    {(props) => {
      const {
        values,
        errors,
        touched,
        handleSubmit,
        setFieldValue,
        setFieldTouched,
      } = props;

      const parseStatus = (name) => {
        return errors[name] && touched[name] ? "invalid" : "valid";
      };

      const parseStatusMessage = (name) => {
        return errors[name] && touched[name] ? errors[name] : "";
      };

      return (
        <div style={{ width: 310 }}>
          <form onSubmit={handleSubmit}>
            <HvInput
              label="Text Field"
              value={values.textField}
              status={parseStatus("textField")}
              statusMessage={parseStatusMessage("textField")}
              onChange={(evt, value) => {
                setFieldTouched("textField");
                setFieldValue("textField", value);
              }}
            />
            <br />
            <HvDropdown
              label="Dropdown"
              values={[
                { label: "Value 1" },
                { label: "Value 2" },
                { label: "Value 3" },
                { label: "Value 4" },
              ]}
              status={parseStatus("dropdown")}
              statusMessage={parseStatusMessage("dropdown")}
              onChange={(selection) => {
                const value = [].concat(selection || []);
                setFieldTouched("dropdown");
                setFieldValue("dropdown", value);
              }}
            />
            <br />
            <br />
            <HvCheckBoxGroup
              label="Checkboxes"
              orientation="horizontal"
              onChange={(evt, value) => {
                setFieldTouched("checkboxes");
                setFieldValue("checkboxes", value);
              }}
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
    }}
  </Formik>
);
