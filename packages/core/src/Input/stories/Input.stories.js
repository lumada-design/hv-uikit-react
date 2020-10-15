import React, { useState } from "react";
import isEmpty from "lodash/isEmpty";
import { makeStyles } from "@material-ui/core";
import { Map } from "@hv/uikit-react-icons";
import { HvButton, HvInput, HvBaseInput } from "../..";
import countryNamesArray from "./countries";

export default {
  title: "Forms/Input",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvInput } from '@hv/uikit-react-core/dist'",
    maturityStatus: "stable",
    dsVersion: "3.2.0",
  },
  component: HvInput,
  subcomponents: { HvBaseInput },
};

export const Main = () => (
  <HvInput
    id="input-simple-sample"
    label="First name"
    description="Please enter your first name"
    placeholder="Insert first name"
  />
);

export const Disabled = () => (
  <HvInput
    id="input-disabled-sample"
    disabled
    label="First name"
    description="Please enter your first name"
    placeholder="Insert first name"
  />
);

Disabled.story = {
  parameters: {
    docs: {
      storyDescription: "Input sample that does not allow interactions.",
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
  },
};

export const ReadOnly = () => (
  <HvInput
    readOnly
    label="First name"
    description="Please enter your first name"
    placeholder="Insert first name"
    defaultValue="You can't change this..."
  />
);

ReadOnly.story = {
  parameters: {
    docs: {
      storyDescription: "Not editable input.",
    },
  },
};

export const WithoutLabel = () => (
  <HvInput aria-label="First name" placeholder="Insert first name" />
);

WithoutLabel.story = {
  parameters: {
    docs: {
      storyDescription:
        "Input without label. The accessible name is provided via the `aria-label` property.",
    },
  },
};

export const Required = () => (
  <HvInput
    required
    label="First name"
    placeholder="Insert first name"
    defaultValue="Clear this text"
  />
);

Required.story = {
  parameters: {
    docs: {
      storyDescription: "Required input value. Clear the input to show default error message.",
    },
  },
};

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

ControlledWithButtons.story = {
  parameters: {
    docs: {
      storyDescription: "Changing the input value from outside the input component.",
    },
  },
};

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
      onFocus={(value) => setValidationState(value ? "filled" : "empty")}
      onBlur={() => {
        setValidationState("invalid");
        setErrorMessage("Nice try, but this will always be invalid. I told you!");
      }}
    />
  );
};

InvalidState.story = {
  parameters: {
    docs: {
      storyDescription:
        "Controlling the validation state and the error message. When controlling the validation state it is recommended to also manage the error message via the externalWarningTextOverride property, or else it will always default to labels.warningText. Also, the input will remain in invalid state even when active, unless it is handled manually in the onFocus/onBlur.",
    },
    pa11y: {
      ignore: [
        "region",
        // aria-errormessage value is being reported as invalid, but the references an existing ID
        "aria-valid-attr-value",
      ],
    },
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

NumericRequired.story = {
  parameters: {
    docs: {
      storyDescription:
        "Required Input that only accepts numbers and limits the maximum length to 5.",
    },
  },
};

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

Email.story = {
  parameters: {
    docs: {
      storyDescription: "Required Input that only accepts valid emails.",
    },
  },
};

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

Password.story = {
  parameters: {
    docs: {
      storyDescription:
        "Password required input that only accepts the value `password` and limits the value between 6 or 12 characters.",
    },
  },
};

export const Search = () => {
  return (
    <HvInput aria-label="Basic search" placeholder="Search" type="search" onEnter={console.log} />
  );
};

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

CustomValidation.story = {
  parameters: {
    docs: {
      storyDescription:
        "Input with a custom validation function, it validates if the input contains the value `hello`.",
    },
  },
};

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

EventDemonstration.story = {
  parameters: {
    docs: {
      storyDescription: "Input with all events functions enabled.",
    },
  },
};

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

CustomProps.story = {
  parameters: {
    docs: {
      storyDescription:
        "Using the input props to inject custom props. This input will block values exceeding 25 character and display an error if less than 5 characters.",
    },
  },
};

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

Suggestion.story = {
  parameters: {
    docs: {
      storyDescription: "Input with suggestion list.",
    },
  },
};
