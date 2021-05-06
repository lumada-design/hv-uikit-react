import React, { useState } from "react";
import isEmpty from "lodash/isEmpty";
import { makeStyles, useTheme } from "@material-ui/core";
import { Map } from "@hv/uikit-react-icons";
import {
  HvButton,
  HvInput,
  HvBaseInput,
  HvTypography,
  HvLabel,
  HvInfoMessage,
  HvGrid,
} from "../..";
import countryNamesArray from "./countries";

export default {
  title: "Forms/Input",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvInput } from "@hv/uikit-react-core"',
    maturityStatus: "stable",
    dsVersion: "3.4.0",
  },
  component: HvInput,
  subcomponents: { HvBaseInput },
};

const defaultDecorator = (Story) => (
  <div style={{ maxWidth: 610, minWidth: 150 }}>
    <Story />
  </div>
);

export const Main = () => (
  <HvInput
    id="input-simple-sample"
    label="First name"
    description="Please enter your first name"
    placeholder="Insert first name"
  />
);

Main.decorators = [defaultDecorator];

export const Disabled = () => (
  <HvInput
    id="input-disabled-sample"
    disabled
    label="First name"
    description="Please enter your first name"
    placeholder="Insert first name"
  />
);

Disabled.parameters = {
  docs: {
    description: { story: "Input sample that does not allow interactions." },
  },
  pa11y: {
    ignore: [
      "region",
      // Text or images of text that are part of an inactive user interface component have no contrast requirement.
      // https://github.com/lumada-design/hv-uikit-react/issues/775#issuecomment-557167364
      "WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail",
      "color-contrast",
    ],
  },
};

Disabled.decorators = [defaultDecorator];

export const ReadOnly = () => (
  <HvInput
    readOnly
    label="First name"
    description="Please enter your first name"
    placeholder="Insert first name"
    defaultValue="You can't change this..."
  />
);

ReadOnly.parameters = {
  docs: {
    description: { story: "Not editable input." },
  },
};

ReadOnly.decorators = [defaultDecorator];

export const WithoutLabel = () => (
  <HvInput aria-label="First name" placeholder="Insert first name" />
);

WithoutLabel.parameters = {
  docs: {
    description:
      "Input without label. The accessible name is provided via the `aria-label` property.",
  },
};

WithoutLabel.decorators = [defaultDecorator];

export const Required = () => (
  <HvInput
    required
    label="First name"
    placeholder="Insert first name"
    defaultValue="Clear this text"
  />
);

Required.parameters = {
  docs: {
    description: { story: "Required input value. Clear the input to show default error message." },
  },
};

Required.decorators = [defaultDecorator];

export const ControlledWithButtons = () => {
  const useStyles = makeStyles((theme) => ({
    container: {
      "& button": {
        marginRight: theme.hvSpacing("xs"),
        marginBottom: theme.hvSpacing("md"),
      },
    },
  }));

  const classes = useStyles();

  const [value, setValue] = useState("Initial value");

  // to be possible to change the input value by user action
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.container}>
      <HvButton category="secondary" onClick={() => setValue("First value")}>
        First value
      </HvButton>
      <HvButton category="secondary" onClick={() => setValue("Second value")}>
        Second value
      </HvButton>
      <HvButton category="secondary" onClick={() => setValue("Third value")}>
        Third value
      </HvButton>
      <HvButton category="secondary" onClick={() => setValue("")}>
        Clear value
      </HvButton>
      <HvInput label="Label" placeholder="Enter value" value={value} onChange={handleChange} />
    </div>
  );
};

ControlledWithButtons.parameters = {
  docs: {
    description: { story: "Changing the input value from outside the input component." },
  },
};

ControlledWithButtons.decorators = [defaultDecorator];

export const InvalidState = () => {
  const [validationState, setValidationState] = useState("invalid");
  const [errorMessage, setErrorMessage] = useState("This is invalid just because I said so.");

  return (
    <HvInput
      id="invalid-state-input"
      label="Last name"
      description="Please enter your last name"
      placeholder="Insert last name"
      defaultValue="Not a name!"
      status={validationState}
      statusMessage={errorMessage}
      onFocus={(value) => setValidationState(value ? "standBy" : "empty")}
      onBlur={() => {
        setValidationState("invalid");
        setErrorMessage("Nice try, but this will always be invalid. I told you!");
      }}
    />
  );
};

InvalidState.parameters = {
  docs: {
    description: {
      story:
        "Controlling the validation state and the error message. When controlling the validation state it is recommended to also manage the error message via the statusMessage property. Also, the input will remain in invalid state even when active, unless it is handled manually in the onFocus/onBlur.",
    },
  },
  pa11y: {
    ignore: [
      "region",
      // aria-errormessage value is being reported as invalid because axe-core forces
      // the referenced error element to have aria-live="assertive", when the spec does not
      // https://github.com/dequelabs/axe-core/pull/2590
      "aria-valid-attr-value",
    ],
  },
};

InvalidState.decorators = [defaultDecorator];

export const ExternalErrorMessage = () => {
  const theme = useTheme();

  const [lastNameValidationState, setLastNameValidationState] = useState("invalid");

  const [firstNameErrorMessage, setFirstNameErrorMessage] = useState(null);
  const [lastNameErrorMessage, setLastNameErrorMessage] = useState(
    "The last name is invalid just because I said so."
  );

  return (
    <HvGrid container>
      <HvGrid item xs={5} container>
        <HvGrid item xs={12}>
          <HvInput
            label="First name"
            description="Please enter your first name"
            placeholder="Insert first name"
            required
            minCharQuantity={2}
            aria-errormessage="firstName-error"
            onBlur={(_e, _value, inputValidity) => {
              if (inputValidity.valid) {
                setFirstNameErrorMessage(null);
              } else if (inputValidity.valueMissing) {
                setFirstNameErrorMessage("You must provide a first name");
              } else if (inputValidity.tooShort) {
                setFirstNameErrorMessage("The first name is too short");
              }
            }}
          />
        </HvGrid>
        <HvGrid item xs={12}>
          <HvInput
            label="Last name"
            description="Please enter your last name"
            placeholder="Insert last name"
            defaultValue="Not a name!"
            required
            status={lastNameValidationState}
            aria-errormessage="lastName-error"
            onFocus={(value) => {
              setLastNameValidationState(value ? "standBy" : "empty");
            }}
            onBlur={(_e, _value, inputValidity) => {
              setLastNameValidationState("invalid");

              if (inputValidity.valueMissing) {
                setLastNameErrorMessage("You must provide a last name");
              } else {
                setLastNameErrorMessage(
                  "Nice try, but the last name will always be invalid. I told you!"
                );
              }
            }}
          />
        </HvGrid>
      </HvGrid>
      <HvGrid
        item
        xs={7}
        style={{
          backgroundColor: theme.hv.palette.semantic.sema9,
          color: theme.hv.palette.base.base2,
        }}
      >
        <h4>Form errors:</h4>
        <ul>
          {firstNameErrorMessage && <li id="firstName-error">{firstNameErrorMessage}</li>}
          {lastNameErrorMessage && <li id="lastName-error">{lastNameErrorMessage}</li>}
        </ul>
      </HvGrid>
    </HvGrid>
  );
};

ExternalErrorMessage.parameters = {
  docs: {
    description: {
      story:
        "A form element can be invalid but render its error message elsewhere. For instance if a business rule error relates to the combination of two or more fields, or if we want to display all the form errors together in a summary section. The [aria-errormessage](https://w3c.github.io/aria/#aria-errormessage) property should reference another element that contains error message text. It can be used when controlling the validation status or when relying on the built-in validations, but the message text computation is reponsability of the app.",
    },
  },
  pa11y: {
    ignore: [
      "region",
      // aria-errormessage value is being reported as invalid because axe-core forces
      // the referenced error element to have aria-live="assertive", when the spec does not
      // https://github.com/dequelabs/axe-core/pull/2590
      "aria-valid-attr-value",
    ],
  },
};

export const NumericRequired = () => {
  const validationMessages = {
    requiredError: "The number is required",
    maxCharError: "Number is too big",
    typeMismatchError: "Value is not a number",
  };

  return (
    <HvInput
      id="numeric-required-input"
      type="number"
      label="Height"
      description="Enter a numeric value"
      placeholder="Insert a number"
      validationMessages={validationMessages}
      required
      maxCharQuantity={5}
      showValidationIcon
    />
  );
};

NumericRequired.parameters = {
  docs: {
    description: {
      story: "Required Input that only accepts numbers and limits the maximum length to 5.",
    },
  },
};

NumericRequired.decorators = [defaultDecorator];

export const Email = () => {
  const validationMessages = {
    typeMismatchError: "Please add the right email format: your.name@hitachivantara.com",
  };

  return (
    <HvInput
      id="email-input"
      type="email"
      label="Email"
      description="Enter your email"
      placeholder="example@domain.com"
      validationMessages={validationMessages}
      showValidationIcon
    />
  );
};

Email.parameters = {
  docs: {
    description: { story: "Required Input that only accepts valid emails." },
  },
};

Email.decorators = [defaultDecorator];

export const Password = () => {
  const validationMessages = {
    error: "Wrong password",
    requiredError: "Your password is required",
    minCharError: "Your password has less than 6 characters",
    maxCharError: "Your password has more than 12 characters",
  };

  return (
    <HvInput
      id="password-input"
      label="Password"
      description="Enter your password"
      placeholder="Must have at least 6 character"
      type="password"
      required
      maxCharQuantity={12}
      minCharQuantity={6}
      validation={(value) => value === "password"}
      validationMessages={validationMessages}
    />
  );
};

Password.parameters = {
  docs: {
    description: {
      story:
        "Password required input that only accepts the value `password` and limits the value between 6 or 12 characters.",
    },
  },
};

Password.decorators = [defaultDecorator];

export const Search = () => {
  return (
    <HvInput aria-label="Basic search" placeholder="Search" type="search" onEnter={console.log} />
  );
};

Search.decorators = [defaultDecorator];

export const CustomValidation = () => {
  const validationMessages = {
    error: "You didn't write 'hello'",
  };

  return (
    <HvInput
      id="custom-validation-input"
      label="Compliment me"
      description="You must input the text 'hello'"
      placeholder="Insert 'hello'"
      validationMessages={validationMessages}
      validation={(value) => value.includes("hello")}
      showValidationIcon
    />
  );
};

CustomValidation.parameters = {
  docs: {
    description:
      "Input with a custom validation function, it validates if the input contains the value `hello`.",
  },
};

CustomValidation.decorators = [defaultDecorator];

export const EventDemonstration = () => {
  const [value, setValue] = useState("");

  return (
    <HvInput
      id="event-demostration-input"
      label="Text I will modify"
      description="Look at the browser's developer console to see the event handlers output"
      placeholder="Insert text"
      value={value}
      onFocus={(_event, newValue) => {
        console.log(`my value is ${newValue}`);
      }}
      onBlur={(_event, newValue, validationState) => {
        console.log(`my value is ${newValue} and my validation state is`, validationState);
      }}
      onChange={(_event, newValue) => setValue(`${newValue}.`)}
    />
  );
};

EventDemonstration.parameters = {
  docs: {
    description: { story: "Input with all events functions enabled." },
  },
};

EventDemonstration.decorators = [defaultDecorator];

export const CustomProps = () => (
  <HvInput
    id="extraProps-input"
    label="Short story of your life"
    description="Try to write more than 25 characters"
    placeholder="Insert text"
    inputProps={{
      minLength: 5,
      maxLength: 25,
    }}
  />
);

CustomProps.parameters = {
  docs: {
    description:
      "Using the input props to inject custom props. This input will block values exceeding 25 character and display an error if less than 5 characters.",
  },
};

CustomProps.decorators = [defaultDecorator];

export const Suggestion = () => {
  const [value, setValue] = useState("");

  const countries = countryNamesArray;

  const suggestionHandler = (val) => {
    if (typeof val !== "string" || isEmpty(val)) return null;
    const foundCountries = countries.filter((country) =>
      country.toUpperCase().startsWith(val.toUpperCase())
    );

    if (isEmpty(foundCountries)) return null;

    return foundCountries.map((country, idx) => ({
      id: `c_${idx}`,
      label: country,
    }));
  };

  return (
    <HvInput
      id="suggestions"
      label="Select a country"
      placeholder="Country"
      value={value}
      onChange={(_e, val) => setValue(val)}
      validation={(val) => val.includes("a")}
      suggestionListCallback={suggestionHandler}
      endAdornment={<Map />}
    />
  );
};

Suggestion.parameters = {
  docs: {
    description: { story: "Input with suggestion list." },
  },
};

Suggestion.decorators = [defaultDecorator];

export const PrefixAndSuffix = () => {
  const validationMessages = {
    error: "Invalid subdomain",
  };

  const validateSubdomain = (value) => {
    const re = /[^a-zA-Z0-9-]/;

    return !re.test(value);
  };

  const useStyles = makeStyles((theme) => ({
    controlContainer: {
      width: "100%",
      maxWidth: 400,
    },

    labelContainer: {
      display: "flex",
      alignItems: "flex-start",
    },
    label: {
      paddingBottom: "6px",
    },

    inputContainer: {
      width: "100%",
      display: "flex",
      alignItems: "baseline",

      "& > *": {
        marginLeft: theme.hv.spacing.xs,
      },
      "& > *:first-child": {
        marginLeft: 0,
      },
    },
    input: {
      flexGrow: 1,
    },
  }));

  const classes = useStyles();

  return (
    <div className={classes.controlContainer}>
      <div className={classes.labelContainer}>
        <HvLabel label="Subdomain" htmlFor="subdomain-input" className={classes.label} />
        <HvInfoMessage id="subdomain-description">Choose your application subdomain</HvInfoMessage>
      </div>
      <div className={classes.inputContainer}>
        <HvTypography noWrap>https://</HvTypography>
        <HvInput
          id="subdomain"
          name="subdomain"
          aria-describedby="subdomain-description"
          placeholder="Enter sub-domain"
          validation={validateSubdomain}
          validationMessages={validationMessages}
          className={classes.input}
        />
        <HvTypography noWrap>.lumada.org</HvTypography>
      </div>
    </div>
  );
};

PrefixAndSuffix.parameters = {
  docs: {
    description:
      "If you need to apply a custom layout, e.g. for providing a prefix or suffix, you can and should externalize both the label and description.",
  },
};

PrefixAndSuffix.decorators = [defaultDecorator];
