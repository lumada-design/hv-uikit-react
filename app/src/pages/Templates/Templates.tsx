import { css } from "@emotion/react";
import { Formik } from "formik";
import * as yup from "yup";
import {
  HvGrid,
  HvContainer,
  HvGlobalActions,
  HvButton,
  HvInput,
  HvSwitch,
  HvTextArea,
  HvFormStatus,
} from "@hitachivantara/uikit-core";
import { Map } from "@hitachivantara/uikit-icons";
import { theme } from "@hitachivantara/uikit-styles";
import isEmpty from "lodash/isEmpty";
import { fields, allCountries } from "./utils";

const styles = {
  section: css({
    "&:nth-child(2)": {
      marginBottom: theme.spacing(4),
      marginTop: theme.spacing(2),
    },
    marginTop: 0,
  }),
  footer: css({
    width: "100%",
    height: 80,
    backgroundColor: theme.colors.atmo1,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingRight: theme.spacing(2),
    position: "fixed",
    left: 0,
    bottom: 0,
    zIndex: 2,
  }),
  field: css({
    height: 60,
  }),
  textArea: css({
    height: 114,
  }),
};

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
const onSubmit = (data, { setSubmitting }) => {
  setSubmitting(false);
  alert(`Formik: ${JSON.stringify(data)}`);
};

/**
 * Handler for the suggestions on the location input.
 *
 * @param {String} val - the value entered on the input
 */
const suggestionHandler = (val) => {
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

const Templates = () => {
  return (
    <HvContainer style={{ margin: "50px auto"}}>
      <HvGlobalActions title="Deploy" backButton={false} />

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
          const parseStatus = (name) => {
            return errors[name] && touched[name] ? "invalid" : "valid";
          };

          // Get the status message for the field
          const parseStatusMessage = (name) => {
            return errors[name] && touched[name] ? errors[name] : "";
          };

          // Get generic status properties for each field
          const fieldStatusProps = (id) => {
            return {
              status: parseStatus(id) as HvFormStatus,
              statusMessage: parseStatusMessage(id),
              onChange: (evt, value) => {
                setFieldTouched(id);
                setFieldValue(id, value);
              },
            };
          };

          return (
            <form onSubmit={handleSubmit}>
              <HvGrid container css={styles.section}>
                <HvGrid item xs={12}>
                  <HvGlobalActions title="Project Details" variant="section" />
                </HvGrid>
                <HvGrid item md={6} xs={12}>
                  <HvInput
                    id={fields.asset.id}
                    css={styles.field}
                    label={fields.asset.label}
                    required
                    placeholder={fields.asset.placeholder}
                    {...fieldStatusProps(fields.asset.id)}
                  />
                </HvGrid>

                <HvGrid item md={6} xs={12}>
                  <HvInput
                    id={fields.location.id}
                    css={styles.field}
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
                    css={styles.field}
                    label={fields.project.label}
                    required
                    placeholder={fields.project.placeholder}
                    {...fieldStatusProps(fields.project.id)}
                  />
                </HvGrid>

                <HvGrid item md={6} xs={12}>
                  <HvInput
                    id={fields.version.id}
                    css={styles.field}
                    label={fields.version.label}
                    required
                    placeholder={fields.version.placeholder}
                    type="number"
                    {...fieldStatusProps(fields.version.id)}
                  />
                </HvGrid>

                <HvGrid item xs={12}>
                  <HvInput
                    id={fields.name.id}
                    css={styles.field}
                    label={fields.name.label}
                    required
                    placeholder={fields.name.placeholder}
                    {...fieldStatusProps(fields.name.id)}
                  />
                </HvGrid>

                <HvGrid item xs={12}>
                  <HvTextArea
                    id={fields.description.id}
                    css={styles.textArea}
                    label={fields.description.label}
                    required
                    rows={5}
                    maxCharQuantity={256}
                    placeholder={fields.description.placeholder}
                    {...fieldStatusProps(fields.description.id)}
                  />
                </HvGrid>
              </HvGrid>

              <HvGrid container css={styles.section}>
                <HvGrid item xs={12}>
                  <HvGlobalActions title="Deploy details" variant="section" />
                </HvGrid>

                <HvGrid item xs={12}>
                  <HvSwitch
                    id={fields.public.id}
                    label={fields.public.label}
                    {...fieldStatusProps(fields.public.id)}
                  />
                </HvGrid>
              </HvGrid>

              <div css={styles.footer}>
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
                  variant="ghost"
                >
                  Submit
                </HvButton>
                <HvButton
                  id="cancel"
                  disabled={values === initialValues}
                  variant="ghost"
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
    </HvContainer>
  );
};

export default Templates;
