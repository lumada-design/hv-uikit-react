import React, { useState } from "react";
import isEmpty from "lodash/isEmpty";
import { Map } from "@hv/uikit-react-icons/dist";
import { HvButton, HvInput } from "../..";

export default {
  title: "Components/Input",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvInput } from '@hv/uikit-react-core/dist'"
  },
  component: HvInput
};

export const Main = () => {
  const labels = {
    placeholder: "Insert first name",
    infoText: "Please enter your first name",
    inputLabel: "First name",
    warningText: "Error",
    maxCharQuantityWarningText: "Max characters exceeded"
  };

  return <HvInput labels={labels} id="input-simple-sample" />;
};

export const WithIconInfo = () => {
  const labels = {
    placeholder: "Insert first name",
    infoText: "Please enter your first name",
    inputLabel: "First name",
    warningText: "Error",
    maxCharQuantityWarningText: "Max characters exceeded"
  };

  return <HvInput labels={labels} id="input-simple-with-info-icon-sample" infoIcon />;
};

WithIconInfo.story = {
  parameters: {
    docs: {
      storyDescription: "Showing the info icon instead of the info text bellow the input."
    }
  }
};

export const Disabled = () => {
  const labels = {
    placeholder: "Insert first name",
    infoText: "Please enter your first name",
    inputLabel: "First name",
    warningText: "Error",
    maxCharQuantityWarningText: "Max characters exceeded"
  };

  return <HvInput labels={labels} disabled id="input-disabled-sample" />;
};

Disabled.story = {
  parameters: {
    docs: {
      storyDescription: "Input sample that does not allow interactions."
    }
  }
};

export const InvalidState = () => {
  const labels = {
    placeholder: "Insert last name",
    infoText: "Please enter your last name",
    inputLabel: "Last name",
    warningText: "This is invalid just because I said so",
    maxCharQuantityWarningText: "Max characters exceeded"
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
        "Input created in invalid state showing the error message and the failed validation icon."
    }
  }
};

export const NoValidation = () => {
  const labels = {
    placeholder: "Type an animal name",
    infoText: "A living organism that feeds on organic matter",
    inputLabel: "What's your favorite animal?"
  };
  return <HvInput id="no-validation-input" labels={labels} showInfo={false} />;
};

NoValidation.story = {
  parameters: {
    docs: {
      storyDescription: "Input without any type of validation not showing validation icons."
    }
  }
};

export const Limited = () => {
  const labels = {
    placeholder: "Insert your postal code",
    infoText: "Group of letters and numbers added to your address to assist the sorting of mail",
    inputLabel: "Postal code",
    maxCharQuantityWarningText: "Max characters exceeded"
  };
  return <HvInput id="limited-input" labels={labels} maxCharQuantity={5} />;
};

Limited.story = {
  parameters: {
    docs: {
      storyDescription: "Input that limits the maximum text length to 5."
    }
  }
};

export const NumericLimited = () => {
  const labels = {
    placeholder: "Insert a number",
    infoText: "Enter a numeric value",
    inputLabel: "Weight",
    warningText: "Value is not a number",
    maxCharQuantityWarningText: "Number is too big",
    requiredWarningText: "The number is required"
  };

  return <HvInput id="numeric-input" labels={labels} maxCharQuantity={5} validationType="number" />;
};

NumericLimited.story = {
  parameters: {
    docs: {
      storyDescription: "Input that only accepts numbers and limits the maximum length to 5."
    }
  }
};

export const NumericRequired = () => {
  const labels = {
    placeholder: "Insert a number",
    infoText: "Enter a numeric value",
    inputLabel: "Height",
    warningText: "Value is not a number",
    maxCharQuantityWarningText: "Number is too big",
    requiredWarningText: "The number is required"
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
        "Required Input that only accepts numbers and limits the maximum length to 5."
    }
  }
};

export const Email = () => {
  const labels = {
    placeholder: "example@domain.com",
    infoText: "Enter your email",
    inputLabel: "Email",
    warningText: "please add the right email format: your.name@hitachivantara.com"
  };

  return <HvInput id="email-input" labels={labels} validationType="email" />;
};

Email.story = {
  parameters: {
    docs: {
      storyDescription: "Required Input that only accepts valid emails."
    }
  }
};

export const Password = () => {
  const labels = {
    placeholder: "Must have at least 6 character",
    infoText: "Enter your password",
    inputLabel: "Password",
    warningText: "Wrong password",
    maxCharQuantityWarningText: "Your password has more than 12 characters",
    minCharQuantityWarningText: "Your password has less than 6 characters",
    requiredWarningText: "Your password is required"
  };

  return (
    <HvInput
      id="password-input"
      labels={labels}
      validation={value => value === "password"}
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
        "Password required input that only accepts the value ´password´ and limits the value between 6 or 12 characters."
    }
  }
};

export const CustomValidation = () => {
  const labels = {
    placeholder: "Insert 'hello'",
    infoText: "You must input the text 'hello'",
    inputLabel: "Compliment me",
    warningText: "You didn't write 'hello'"
  };

  return (
    <HvInput
      id="custom-validation-input"
      labels={labels}
      infoIcon
      validation={value => value.includes("hello")}
    />
  );
};

CustomValidation.story = {
  parameters: {
    docs: {
      storyDescription:
        "Input with a custom validation function, it validates if the input contains the value ´hello´."
    }
  }
};

export const DefaultValue = () => {
  const labels = {
    placeholder: "example@domain.com",
    infoText: "Enter your email",
    inputLabel: "Email",
    warningText: "Please add the right email format: your.name@hitachivantara.com"
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
      storyDescription: "Input with an default value already in place."
    }
  }
};

export const EventDemostration = () => {
  const labels = {
    placeholder: "Insert text",
    infoText: "Look at the browser's developer console to see the event handlers output",
    inputLabel: "Text I will modify"
  };

  return (
    <HvInput
      id="event-demostration-input"
      labels={labels}
      onFocus={value => {
        console.log(`my value is ${value}`);
      }}
      onBlur={(value, validationState) => {
        console.log(`my value is ${value} and my validation state is ${validationState}`);
      }}
      onChange={(event, value) => `${value}.`}
    />
  );
};

EventDemostration.story = {
  parameters: {
    docs: {
      storyDescription: "Input with all events functions enabled."
    }
  }
};

export const CustomProps = () => {
  const labels = {
    placeholder: "Insert text",
    infoText: "Try to write more than 25 characters",
    inputLabel: "Short story of your life"
  };

  return (
    <HvInput
      id="extraProps-input"
      labels={labels}
      inputProps={{
        maxLength: 25
      }}
    />
  );
};

CustomProps.story = {
  parameters: {
    docs: {
      storyDescription:
        "Using the input props to inject custom props, this input will block values exceeding 25 character."
    }
  }
};

export const Controlled = () => {
  const labels = {
    inputLabel: "Label",
    placeholder: "Enter value"
  };

  const btnStyle = {
    width: "50px",
    height: "50px",
    margin: "10px"
  };
  const [value, setValue] = useState("Initial value");

  // to be possible to change the input value by user action
  const setterValue = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <HvButton style={btnStyle} onClick={() => setValue("First value")}>
        First value
      </HvButton>
      <HvButton style={btnStyle} onClick={() => setValue("Second value")}>
        Second value
      </HvButton>
      <HvButton style={btnStyle} onClick={() => setValue("Third value")}>
        Third value
      </HvButton>
      <HvButton style={btnStyle} onClick={() => setValue("")}>
        Clear value
      </HvButton>
      <HvInput labels={labels} value={value} onChange={setterValue} />
    </>
  );
};

Controlled.story = {
  parameters: {
    docs: {
      storyDescription: "Changing the input value from outside the input component."
    }
  }
};

export const Suggestion = () => {
  const labels = {
    placeholder: "Country",
    infoText: "Info",
    inputLabel: "Select a country",
    warningText: "Error",
    maxCharQuantityWarningText: "Max characters exceeded"
  };

  const countries = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Antigua & Deps",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei",
    "Bulgaria",
    "Burkina",
    "Burundi",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Cape Verde",
    "Central African Rep",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo",
    "Congo {Democratic Rep}",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czech Republic",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "East Timor",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Grenada",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland {Republic}",
    "Israel",
    "Italy",
    "Ivory Coast",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Korea North",
    "Korea South",
    "Kosovo",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Macedonia",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Micronesia",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar, {Burma}",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Romania",
    "Russian Federation",
    "Rwanda",
    "St Kitts & Nevis",
    "St Lucia",
    "Saint Vincent & the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome & Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Swaziland",
    "Sweden",
    "Switzerland",
    "Syria",
    "Taiwan",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Togo",
    "Tonga",
    "Trinidad & Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Vatican City",
    "Venezuela",
    "Vietnam",
    "Yemen",
    "Zambia",
    "Zimbabwe"
  ];

  const suggestionHandler = value => {
    if (typeof value !== "string" || isEmpty(value)) return null;
    const foundCountries = countries.filter(country =>
      country.toUpperCase().startsWith(value.toUpperCase())
    );

    if (isEmpty(foundCountries)) return null;

    return foundCountries.map((country, idx) => ({
      id: `c_${idx}`,
      label: country
    }));
  };

  return (
    <HvInput
      labels={labels}
      id="suggestion-input"
      validation={value => value.includes("a")}
      suggestionListCallback={suggestionHandler}
      suggestionSelectedCallback={item => console.log(`${item.label} selected`)}
      customFixedIcon={<Map />}
    />
  );
};

Suggestion.story = {
  parameters: {
    docs: {
      storyDescription: "Input with suggestion list."
    }
  }
};
