import React, { useState } from "react";
import isEmpty from "lodash/isEmpty";
import { makeStyles } from "@material-ui/core";
import { Map } from "@hv/uikit-react-icons";
import { HvButton, HvInput } from "../..";
import countryNamesArray from "./countries";

export default {
  title: "Patterns/Input",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvInput } from '@hv/uikit-react-core/dist'",
  },
  component: HvInput,
};

export const Main = () => {
  const labels = {
    placeholder: "Insert first name",
    infoText: "Please enter your first name",
    inputLabel: "First name",
    warningText: "Error",
    maxCharQuantityWarningText: "Max characters exceeded",
  };

  return <HvInput labels={labels} id="input-simple-sample" showInfo={false} />;
};

export const WithInfoMessage = () => {
  const labels = {
    placeholder: "Insert first name",
    infoText: "Please enter your first name",
    inputLabel: "First name",
    warningText: "Error",
    maxCharQuantityWarningText: "Max characters exceeded",
  };

  return <HvInput labels={labels} id="input-simple-with-info-icon-sample" />;
};

WithInfoMessage.story = {
  parameters: {
    docs: {
      storyDescription: "Showing the info message.",
    },
  },
};

export const Disabled = () => {
  const labels = {
    placeholder: "Insert first name",
    infoText: "Please enter your first name",
    inputLabel: "First name",
    warningText: "Error",
    maxCharQuantityWarningText: "Max characters exceeded",
  };

  return <HvInput labels={labels} disabled id="input-disabled-sample" />;
};

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

export const InvalidState = () => {
  const labels = {
    placeholder: "Insert last name",
    infoText: "Please enter your last name",
    inputLabel: "Last name",
    warningText: "This is invalid just because I said so",
    maxCharQuantityWarningText: "Max characters exceeded",
  };
  return (
    <HvInput
      id="invalid-state-input"
      labels={labels}
      initialValue="Not a name!"
      validationState="invalid"
    />
  );
};

InvalidState.story = {
  parameters: {
    docs: {
      storyDescription:
        "Input created in invalid state showing the error message and the failed validation icon.",
    },
  },
};

export const NoValidation = () => {
  const labels = {
    placeholder: "Type an animal name",
    infoText: "A living organism that feeds on organic matter",
    inputLabel: "What's your favorite animal?",
  };
  return <HvInput id="no-validation-input" labels={labels} showInfo={false} />;
};

NoValidation.story = {
  parameters: {
    docs: {
      storyDescription: "Input without any type of validation not showing validation icons.",
    },
  },
};

export const Limited = () => {
  const labels = {
    placeholder: "Insert your postal code",
    infoText: "Group of letters and numbers added to your address to assist the sorting of mail",
    inputLabel: "Postal code",
    maxCharQuantityWarningText: "Max characters exceeded",
  };
  return <HvInput id="limited-input" labels={labels} maxCharQuantity={5} />;
};

Limited.story = {
  parameters: {
    docs: {
      storyDescription: "Input that limits the maximum text length to 5.",
    },
  },
};

export const NumericLimited = () => {
  const labels = {
    placeholder: "Insert a number",
    infoText: "Enter a numeric value",
    inputLabel: "Weight",
    warningText: "Value is not a number",
    maxCharQuantityWarningText: "Number is too big",
    requiredWarningText: "The number is required",
  };

  return <HvInput id="numeric-input" labels={labels} maxCharQuantity={5} validationType="number" />;
};

NumericLimited.story = {
  parameters: {
    docs: {
      storyDescription: "Input that only accepts numbers and limits the maximum length to 5.",
    },
  },
};

export const NumericRequired = () => {
  const labels = {
    placeholder: "Insert a number",
    infoText: "Enter a numeric value",
    inputLabel: "Height",
    warningText: "Value is not a number",
    maxCharQuantityWarningText: "Number is too big",
    requiredWarningText: "The number is required",
  };

  return (
    <HvInput
      id="numeric-required-input"
      isRequired
      labels={labels}
      maxCharQuantity={5}
      validationType="number"
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
  const labels = {
    placeholder: "example@domain.com",
    infoText: "Enter your email",
    inputLabel: "Email",
    warningText: "Please add the right email format: your.name@hitachivantara.com",
  };

  return <HvInput id="email-input" labels={labels} validationType="email" />;
};

Email.story = {
  parameters: {
    docs: {
      storyDescription: "Required Input that only accepts valid emails.",
    },
  },
};

export const Password = () => {
  const labels = {
    placeholder: "Must have at least 6 character",
    infoText: "Enter your password",
    inputLabel: "Password",
    warningText: "Wrong password",
    maxCharQuantityWarningText: "Your password has more than 12 characters",
    minCharQuantityWarningText: "Your password has less than 6 characters",
    requiredWarningText: "Your password is required",
  };

  return (
    <HvInput
      id="password-input"
      labels={labels}
      validation={(value) => value === "password"}
      password
      isRequired
      maxCharQuantity={12}
      minCharQuantity={6}
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

export const CustomValidation = () => {
  const labels = {
    placeholder: "Insert 'hello'",
    infoText: "You must input the text 'hello'",
    inputLabel: "Compliment me",
    warningText: "You didn't write 'hello'",
  };

  return (
    <HvInput
      id="custom-validation-input"
      labels={labels}
      validation={(value) => value.includes("hello")}
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

export const DefaultValue = () => {
  const labels = {
    placeholder: "example@domain.com",
    infoText: "Enter your email",
    inputLabel: "Email",
    warningText: "Please add the right email format: your.name@hitachivantara.com",
  };

  return (
    <HvInput
      id="default-value-input"
      labels={labels}
      validationType="email"
      initialValue="example@exam.com"
    />
  );
};

DefaultValue.story = {
  parameters: {
    docs: {
      storyDescription: "Input with an default value already in place.",
    },
  },
};

export const EventDemonstration = () => {
  const labels = {
    placeholder: "Insert text",
    infoText: "Look at the browser's developer console to see the event handlers output",
    inputLabel: "Text I will modify",
  };

  return (
    <HvInput
      id="event-demostration-input"
      labels={labels}
      onFocus={(value) => {
        console.log(`my value is ${value}`);
      }}
      onBlur={(value, validationState) => {
        console.log(`my value is ${value} and my validation state is ${validationState}`);
      }}
      onChange={(event, value) => `${value}.`}
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

export const CustomProps = () => {
  const labels = {
    placeholder: "Insert text",
    infoText: "Try to write more than 25 characters",
    inputLabel: "Short story of your life",
  };

  return (
    <HvInput
      id="extraProps-input"
      labels={labels}
      inputProps={{
        maxLength: 25,
      }}
    />
  );
};

CustomProps.story = {
  parameters: {
    docs: {
      storyDescription:
        "Using the input props to inject custom props, this input will block values exceeding 25 character.",
    },
  },
};

export const Controlled = () => {
  const [value, setValue] = useState("Initial value");

  return (
    <HvInput
      id="inputControlled"
      labels={{ inputLabel: "Label", placeholder: "Enter value" }}
      value={value}
      onChange={(event, newValue) => setValue(newValue)}
    />
  );
};

export const ControlledWithButtons = () => {
  const useStyles = makeStyles((theme) => ({
    container: {
      "& button": {
        marginRight: theme.spacing("xs"),
        marginBottom: theme.spacing("md"),
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
      <HvInput
        labels={{
          inputLabel: "Label",
          placeholder: "Enter value",
        }}
        value={value}
        onChange={handleChange}
      />
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

export const Suggestion = () => {
  const [value, setValue] = useState("");

  const labels = {
    placeholder: "Country",
    infoText: "",
    inputLabel: "Select a country",
    warningText: "Error",
    maxCharQuantityWarningText: "Max characters exceeded",
  };

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
      labels={labels}
      id="suggestions"
      value={value}
      onChange={(e, val) => setValue(val)}
      validation={(val) => val.includes("a")}
      suggestionListCallback={suggestionHandler}
      suggestionSelectedCallback={(item) => setValue(item.label)}
      customFixedIcon={<Map />}
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
