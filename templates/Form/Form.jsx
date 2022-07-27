import React from "react";
import PropTypes from "prop-types";
import { Formik } from "formik";
import * as yup from "yup";
import {
  HvGrid,
  HvContainer,
  HvGlobalActions,
  HvButton,
  HvInput,
  HvDatePicker,
  HvTimePicker,
  HvSwitch,
  HvTypography,
  HvTextArea,
} from "@hitachivantara/uikit-react-core";
import { withStyles } from "@material-ui/core";
import { Map } from "@hitachivantara/uikit-react-icons";
import isEmpty from "lodash/isEmpty";
import countryNamesArray from "./countries";
import FIELDS from "./utils";
import styles from "./styles";

/**
 * The validation schema used by Formik to validate the data inserted by the user.
 */
const validationSchema = yup.object({
  asset: yup.string().required(FIELDS.asset.requried),
  location: yup.string().required(FIELDS.location.requried),
  project: yup.string().required(FIELDS.project.requried),
  version: yup.number().typeError("Version must be a number").required(FIELDS.version.requried),
  name: yup.string().required(FIELDS.name.requried),
  description: yup.string().required(FIELDS.description.requried).max(256),
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
  const foundCountries = countryNamesArray.filter((country) =>
    country.toUpperCase().startsWith(val.toUpperCase())
  );

  if (isEmpty(foundCountries)) return null;

  return foundCountries.map((country, idx) => ({
    id: `c_${idx}`,
    label: country,
  }));
};

const Form = ({ classes }) => {
  return (
    <HvContainer>
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
              status: parseStatus(id),
              statusMessage: parseStatusMessage(id),
              onChange: (evt, value) => {
                setFieldTouched(id);
                setFieldValue(id, value);
              },
            };
          };

          return (
            <div className={classes.formContainer}>
              <form onSubmit={handleSubmit}>
                <div className={classes.section}>
                  <HvGrid container>
                    <HvGrid item xs={12}>
                      <HvTypography variant="sectionTitle">Project Details</HvTypography>
                    </HvGrid>
                    <HvGrid item md={6} xs={12}>
                      <HvInput
                        id={FIELDS.asset.id}
                        className={classes.field}
                        label={FIELDS.asset.label}
                        required
                        placeholder={FIELDS.asset.placeholder}
                        {...fieldStatusProps(FIELDS.asset.id)}
                      />
                    </HvGrid>

                    <HvGrid item md={6} xs={12}>
                      <HvInput
                        id={FIELDS.location.id}
                        className={classes.field}
                        label={FIELDS.location.label}
                        required
                        placeholder={FIELDS.location.placeholder}
                        suggestionListCallback={suggestionHandler}
                        endAdornment={<Map />}
                        {...fieldStatusProps(FIELDS.location.id)}
                      />
                    </HvGrid>

                    <HvGrid item md={6} xs={12}>
                      <HvInput
                        id={FIELDS.project.id}
                        className={classes.field}
                        label={FIELDS.project.label}
                        required
                        placeholder={FIELDS.project.name}
                        {...fieldStatusProps(FIELDS.project.id)}
                      />
                    </HvGrid>

                    <HvGrid item md={6} xs={12}>
                      <HvInput
                        id={FIELDS.version.id}
                        className={classes.field}
                        label={FIELDS.version.label}
                        required
                        placeholder={FIELDS.version.placeholder}
                        type="number"
                        {...fieldStatusProps(FIELDS.version.id)}
                      />
                    </HvGrid>

                    <HvGrid item xs={12}>
                      <HvInput
                        id={FIELDS.name.id}
                        className={classes.field}
                        label={FIELDS.name.label}
                        required
                        placeholder={FIELDS.name.placeholder}
                        {...fieldStatusProps(FIELDS.name.id)}
                      />
                    </HvGrid>

                    <HvGrid item xs={12}>
                      <HvTextArea
                        id={FIELDS.description.id}
                        className={classes.textArea}
                        label={FIELDS.description.label}
                        required
                        rows={5}
                        maxCharQuantity={256}
                        placeholder={FIELDS.description.placeholder}
                        {...fieldStatusProps(FIELDS.description.id)}
                      />
                    </HvGrid>
                  </HvGrid>
                </div>

                <div className={classes.section}>
                  <HvGrid container>
                    <HvGrid item xs={12}>
                      <HvTypography variant="sectionTitle">Deploy details</HvTypography>
                    </HvGrid>
                    <HvGrid item md={6} xs={12}>
                      <HvDatePicker
                        id={FIELDS.date.id}
                        label={FIELDS.date.label}
                        placeholder={FIELDS.date.placeholder}
                        {...fieldStatusProps(FIELDS.date.id)}
                      />
                    </HvGrid>
                    <HvGrid item md={6} xs={12}>
                      <HvTimePicker
                        id={FIELDS.time.id}
                        label={FIELDS.time.label}
                        placeholder={FIELDS.time.placeholder}
                        {...fieldStatusProps(FIELDS.time.id)}
                      />
                    </HvGrid>
                    <HvGrid item xs={12}>
                      <HvSwitch
                        id={FIELDS.public.id}
                        label={FIELDS.public.label}
                        {...fieldStatusProps(FIELDS.public.id)}
                      />
                    </HvGrid>
                  </HvGrid>
                </div>

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
                      values.description.trim() === initialValues.description.trim()
                    }
                    category="ghost"
                  >
                    Submit
                  </HvButton>
                  <HvButton
                    id="cancel"
                    disabled={values === initialValues}
                    category="ghost"
                    type="reset"
                    onClick={() => alert("Cancelling from submission.")}
                  >
                    Cancel
                  </HvButton>
                </div>
              </form>
            </div>
          );
        }}
      </Formik>
    </HvContainer>
  );
};

Form.propTypes = {
  /**
   * The CSS Classes object.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the form container.
     */
    formContainer: PropTypes.string,
    /**
     * Styles applied to each section of the form.
     */
    section: PropTypes.string,
    /**
     * Styles applied to the footer section.
     */
    footer: PropTypes.string,
    /**
     * Styles applied to each field
     */
    field: PropTypes.string,
  }),
};

export default withStyles(styles)(Form);
