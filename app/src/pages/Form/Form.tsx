import isEmpty from "lodash/isEmpty";
import { Formik } from "formik";
import * as yup from "yup";
import {
  HvGrid,
  HvGlobalActions,
  HvButton,
  HvInput,
  HvTextArea,
  HvFormStatus,
  HvDropdown,
  HvTagsInput,
} from "@hitachivantara/uikit-react-core";
import { Map } from "@hitachivantara/uikit-react-icons";
import { fields, allCountries, FormData, FormDataKey } from "lib/utils/form";
import classes from "./styles";

/**
 * The validation schema used by Formik to validate the data inserted by the user.
 */
const validationSchema = yup.object({
  asset: yup.string().required(fields.asset.required),
  location: yup.string().required(fields.location.required),
  project: yup.string().required(fields.project.required),
  version: yup
    .number()
    .typeError("Version must be a number")
    .required(fields.version.required),
  name: yup.string().required(fields.name.required),
  description: yup.string().required(fields.description.required).max(256),
  date: yup.date(),
  time: yup.object().shape({
    hours: yup.number(),
    minutes: yup.number(),
    seconds: yup.number(),
    period: yup.string(),
  }),
  public: yup.bool(),
});

/**
 * Handler for the submission of the form.
 *
 * @param {Object} data - the data inserted on the form.
 */
const onSubmit = (
  data: FormData,
  { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
) => {
  setSubmitting(false);
  alert(`Formik: ${JSON.stringify(data)}`);
};

/**
 * Handler for the suggestions on the location input.
 *
 * @param {String} val - the value entered on the input
 */
const suggestionHandler = (val: string) => {
  if (typeof val !== "string" || isEmpty(val)) return null;
  const foundCountries = allCountries.filter((country) =>
    country.toUpperCase().startsWith(val.toUpperCase())
  );

  if (isEmpty(foundCountries)) return null;

  return foundCountries.map((country, idx) => ({
    id: `c_${idx}`,
    label: country,
  }));
};

const Form = () => {
  return (
    <>
      <HvGlobalActions title="Deploy" className={classes.section} />

      <Formik
        initialValues={{
          asset: "",
          location: "",
          project: "",
          version: undefined,
          name: "",
          description: "",
          date: undefined,
          time: undefined,
          public: false,
        }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {(props) => {
          const {
            errors,
            touched,
            handleSubmit,
            setFieldValue,
            setFieldTouched,
            isValid,
            isSubmitting,
            values,
            initialValues,
          } = props;
          // Parse the status for the field
          const parseStatus = (name: FormDataKey) => {
            return errors[name] && touched[name] ? "invalid" : "valid";
          };

          // Get the status message for the field
          const parseStatusMessage = (name: FormDataKey) => {
            return errors[name] && touched[name] ? errors[name] : "";
          };

          // Get generic status properties for each field
          const fieldStatusProps = (id: FormDataKey) => {
            return {
              status: parseStatus(id) as HvFormStatus,
              statusMessage: parseStatusMessage(id),
              onChange: (
                event: React.ChangeEvent<
                  HTMLInputElement | HTMLTextAreaElement
                >,
                value: string
              ) => {
                setFieldTouched(id);
                setFieldValue(id, value);
              },
            };
          };

          return (
            <form onSubmit={handleSubmit}>
              <HvGrid container className={classes.section}>
                <HvGrid item xs={12}>
                  <HvGlobalActions title="Project Details" variant="section" />
                </HvGrid>
                <HvGrid item md={6} xs={12}>
                  <HvInput
                    id={fields.asset.id}
                    label={fields.asset.label}
                    required
                    placeholder={fields.asset.placeholder}
                    {...fieldStatusProps(fields.asset.id)}
                  />
                </HvGrid>

                <HvGrid item md={6} xs={12}>
                  <HvInput
                    id={fields.location.id}
                    label={fields.location.label}
                    required
                    placeholder={fields.location.placeholder}
                    suggestionListCallback={suggestionHandler}
                    endAdornment={<Map />}
                    {...fieldStatusProps(fields.location.id)}
                  />
                </HvGrid>

                <HvGrid item md={6} xs={12}>
                  <HvInput
                    id={fields.project.id}
                    label={fields.project.label}
                    required
                    placeholder={fields.project.placeholder}
                    {...fieldStatusProps(fields.project.id)}
                  />
                </HvGrid>

                <HvGrid item md={6} xs={12}>
                  <HvInput
                    id={fields.version.id}
                    label={fields.version.label}
                    required
                    placeholder={fields.version.placeholder}
                    type="number"
                    {...fieldStatusProps(fields.version.id)}
                  />
                </HvGrid>

                <HvGrid item md={6} xs={12}>
                  <HvDropdown
                    id={fields.release.id}
                    label={fields.release.label}
                    required
                    placeholder={fields.release.placeholder}
                    values={[
                      { id: "1", label: "1.0" },
                      { id: "2", label: "2.0" },
                      { id: "3", label: "3.0" },
                    ]}
                  />
                </HvGrid>

                <HvGrid item md={6} xs={12}>
                  <HvTagsInput
                    id={fields.tags.id}
                    label={fields.tags.label}
                    required
                    placeholder={fields.tags.placeholder}
                  />
                </HvGrid>

                <HvGrid item xs={12}>
                  <HvInput
                    id={fields.name.id}
                    label={fields.name.label}
                    required
                    placeholder={fields.name.placeholder}
                    {...fieldStatusProps(fields.name.id)}
                  />
                </HvGrid>

                <HvGrid item xs={12}>
                  <HvTextArea
                    id={fields.description.id}
                    label={fields.description.label}
                    required
                    rows={5}
                    maxCharQuantity={256}
                    placeholder={fields.description.placeholder}
                    {...fieldStatusProps(fields.description.id)}
                  />
                </HvGrid>
              </HvGrid>

              <div className={classes.footer}>
                <HvButton
                  id="submit"
                  type="submit"
                  disabled={
                    isSubmitting ||
                    !isValid ||
                    values.asset.trim() === initialValues.asset.trim() ||
                    values.location.trim() === initialValues.location.trim() ||
                    values.project.trim() === initialValues.project.trim() ||
                    values.version === initialValues.version ||
                    values.name.trim() === initialValues.name.trim() ||
                    values.description.trim() ===
                      initialValues.description.trim()
                  }
                  variant="primaryGhost"
                >
                  Submit
                </HvButton>
                <HvButton
                  id="cancel"
                  disabled={values === initialValues}
                  variant="primaryGhost"
                  type="reset"
                  onClick={() => alert("Cancelling from submission.")}
                >
                  Cancel
                </HvButton>
              </div>
            </form>
          );
        }}
      </Formik>
    </>
  );
};

export default Form;
