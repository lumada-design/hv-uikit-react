import React, { useState } from "react";
import isEmpty from "lodash/isEmpty";
import { Map } from "@hv/uikit-react-icons/dist";
import { HvButton } from "../..";

import HvBaseInput from "../BaseInput";

export default {
  title: "Components/BaseInput",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvBaseInput } from '@hv/uikit-react-core/dist'"
  },
  component: HvBaseInput
};

export const Main = () => {
  const labels = {
    placeholder: "Insert first name",
    infoText: "Please enter your first name",
    inputLabel: "First name",
    warningText: "Error",
    maxCharQuantityWarningText: "Max characters exceeded"
  };

  // return <HvBaseInput labels={labels} id="input-simple-sample" />;
  return (
    <>
      <HvBaseInput labels={labels} />
    </>
  );
};

// export const WithIconInfo = () => {
//   const labels = {
//     placeholder: "Insert first name",
//     infoText: "Please enter your first name",
//     inputLabel: "First name",
//     warningText: "Error",
//     maxCharQuantityWarningText: "Max characters exceeded"
//   };

//   return <HvBaseInput labels={labels} id="input-simple-with-info-icon-sample" infoIcon />;
// };

// WithIconInfo.story = {
//   parameters: {
//     docs: {
//       storyDescription: "Showing the info icon instead of the info text bellow the input."
//     }
//   }
// };

// export const Disabled = () => {
//   const labels = {
//     placeholder: "Insert first name",
//     infoText: "Please enter your first name",
//     inputLabel: "First name",
//     warningText: "Error",
//     maxCharQuantityWarningText: "Max characters exceeded"
//   };

//   return <HvBaseInput labels={labels} disabled id="input-disabled-sample" />;
// };

// Disabled.story = {
//   parameters: {
//     docs: {
//       storyDescription: "Input sample that does not allow interactions."
//     }
//   }
// };

// export const InvalidState = () => {
//   const labels = {
//     placeholder: "Insert last name",
//     infoText: "Please enter your last name",
//     inputLabel: "Last name",
//     warningText: "This is invalid just because I said so",
//     maxCharQuantityWarningText: "Max characters exceeded"
//   };
//   return (
//     <HvBaseInput
//       id="invalid-state-input"
//       labels={labels}
//       initialValue="Not a name!"
//       validationState="invalid"
//     />
//   );
// };

// InvalidState.story = {
//   parameters: {
//     docs: {
//       storyDescription:
//         "Input created in invalid state showing the error message and the failed validation icon."
//     }
//   }
// };

// export const NoValidation = () => {
//   const labels = {
//     placeholder: "Type an animal name",
//     infoText: "A living organism that feeds on organic matter",
//     inputLabel: "What's your favorite animal?"
//   };
//   return <HvBaseInput id="no-validation-input" labels={labels} showInfo={false} />;
// };

// NoValidation.story = {
//   parameters: {
//     docs: {
//       storyDescription: "Input without any type of validation not showing validation icons."
//     }
//   }
// };

// export const Limited = () => {
//   const labels = {
//     placeholder: "Insert your postal code",
//     infoText: "Group of letters and numbers added to your address to assist the sorting of mail",
//     inputLabel: "Postal code",
//     maxCharQuantityWarningText: "Max characters exceeded"
//   };
//   return <HvBaseInput id="limited-input" labels={labels} maxCharQuantity={5} />;
// };

// Limited.story = {
//   parameters: {
//     docs: {
//       storyDescription: "Input that limits the maximum text length to 5."
//     }
//   }
// };

// export const NumericLimited = () => {
//   const labels = {
//     placeholder: "Insert a number",
//     infoText: "Enter a numeric value",
//     inputLabel: "Weight",
//     warningText: "Value is not a number",
//     maxCharQuantityWarningText: "Number is too big",
//     requiredWarningText: "The number is required"
//   };

//   return (
//     <HvBaseInput id="numeric-input" labels={labels} maxCharQuantity={5} validationType="number" />
//   );
// };

// NumericLimited.story = {
//   parameters: {
//     docs: {
//       storyDescription: "Input that only accepts numbers and limits the maximum length to 5."
//     }
//   }
// };

// export const NumericRequired = () => {
//   const labels = {
//     placeholder: "Insert a number",
//     infoText: "Enter a numeric value",
//     inputLabel: "Height",
//     warningText: "Value is not a number",
//     maxCharQuantityWarningText: "Number is too big",
//     requiredWarningText: "The number is required"
//   };

//   return (
//     <HvBaseInput
//       id="numeric-required-input"
//       isRequired
//       labels={labels}
//       maxCharQuantity={5}
//       validationType="number"
//     />
//   );
// };

// NumericRequired.story = {
//   parameters: {
//     docs: {
//       storyDescription:
//         "Required Input that only accepts numbers and limits the maximum length to 5."
//     }
//   }
// };

// export const Email = () => {
//   const labels = {
//     placeholder: "example@domain.com",
//     infoText: "Enter your email",
//     inputLabel: "Email",
//     warningText: "please add the right email format: your.name@hitachivantara.com"
//   };

//   return <HvBaseInput id="email-input" labels={labels} validationType="email" />;
// };

// Email.story = {
//   parameters: {
//     docs: {
//       storyDescription: "Required Input that only accepts valid emails."
//     }
//   }
// };

// export const Password = () => {
//   const labels = {
//     placeholder: "Must have at least 6 character",
//     infoText: "Enter your password",
//     inputLabel: "Password",
//     warningText: "Wrong password",
//     maxCharQuantityWarningText: "Your password has more than 12 characters",
//     minCharQuantityWarningText: "Your password has less than 6 characters",
//     requiredWarningText: "Your password is required"
//   };

//   return (
//     <HvBaseInput
//       id="password-input"
//       labels={labels}
//       validation={value => value === "password"}
//       password
//       isRequired
//       maxCharQuantity={12}
//       minCharQuantity={6}
//     />
//   );
// };

// Password.story = {
//   parameters: {
//     docs: {
//       storyDescription:
//         "Password required input that only accepts the value ´password´ and limits the value between 6 or 12 characters."
//     }
//   }
// };

// export const CustomValidation = () => {
//   const labels = {
//     placeholder: "Insert 'hello'",
//     infoText: "You must input the text 'hello'",
//     inputLabel: "Compliment me",
//     warningText: "You didn't write 'hello'"
//   };

//   return (
//     <HvBaseInput
//       id="custom-validation-input"
//       labels={labels}
//       infoIcon
//       validation={value => value.includes("hello")}
//     />
//   );
// };

// CustomValidation.story = {
//   parameters: {
//     docs: {
//       storyDescription:
//         "Input with a custom validation function, it validates if the input contains the value ´hello´."
//     }
//   }
// };

// export const DefaultValue = () => {
//   const labels = {
//     placeholder: "example@domain.com",
//     infoText: "Enter your email",
//     inputLabel: "Email",
//     warningText: "Please add the right email format: your.name@hitachivantara.com"
//   };

//   return (
//     <HvBaseInput
//       id="default-value-input"
//       labels={labels}
//       validationType="email"
//       initialValue="example@exam.com"
//     />
//   );
// };

// DefaultValue.story = {
//   parameters: {
//     docs: {
//       storyDescription: "Input with an default value already in place."
//     }
//   }
// };

// export const EventDemostration = () => {
//   const labels = {
//     placeholder: "Insert text",
//     infoText: "Look at the browser's developer console to see the event handlers output",
//     inputLabel: "Text I will modify"
//   };

//   return (
//     <HvBaseInput
//       id="event-demostration-input"
//       labels={labels}
//       onFocus={value => {
//         console.log(`my value is ${value}`);
//       }}
//       onBlur={(value, validationState) => {
//         console.log(`my value is ${value} and my validation state is ${validationState}`);
//       }}
//       onChange={(event, value) => `${value}.`}
//     />
//   );
// };

// EventDemostration.story = {
//   parameters: {
//     docs: {
//       storyDescription: "Input with all events functions enabled."
//     }
//   }
// };

// export const CustomProps = () => {
//   const labels = {
//     placeholder: "Insert text",
//     infoText: "Try to write more than 25 characters",
//     inputLabel: "Short story of your life"
//   };

//   return (
//     <HvBaseInput
//       id="extraProps-input"
//       labels={labels}
//       inputProps={{
//         maxLength: 25
//       }}
//     />
//   );
// };

// CustomProps.story = {
//   parameters: {
//     docs: {
//       storyDescription:
//         "Using the input props to inject custom props, this input will block values exceeding 25 character."
//     }
//   }
// };

// export const Controlled = () => {
//   const [value, setValue] = useState("Initial value");

//   return (
//     <HvBaseInput
//       id="inputControlled"
//       labels={{ inputLabel: "Label", placeholder: "Enter value" }}
//       value={value}
//       onChange={(event, newValue) => setValue(newValue)}
//     />
//   );
// };

// export const ControlledWithButtons = () => {
//   const labels = {
//     inputLabel: "Label",
//     placeholder: "Enter value"
//   };

//   const btnStyle = {
//     width: "50px",
//     height: "50px",
//     margin: "10px"
//   };
//   const [value, setValue] = useState("Initial value");

//   // to be possible to change the input value by user action
//   const setterValue = (event, newValue) => {
//     setValue(newValue);
//   };

//   return (
//     <>
//       <HvButton style={btnStyle} onClick={() => setValue("First value")}>
//         First value
//       </HvButton>
//       <HvButton style={btnStyle} onClick={() => setValue("Second value")}>
//         Second value
//       </HvButton>
//       <HvButton style={btnStyle} onClick={() => setValue("Third value")}>
//         Third value
//       </HvButton>
//       <HvButton style={btnStyle} onClick={() => setValue("")}>
//         Clear value
//       </HvButton>
//       <HvBaseInput labels={labels} value={value} onChange={setterValue} />
//     </>
//   );
// };

// ControlledWithButtons.story = {
//   parameters: {
//     docs: {
//       storyDescription: "Changing the input value from outside the input component."
//     }
//   }
// };

// export const Suggestion = () => {
//   const [value, setValue] = useState("");

//   const labels = {
//     placeholder: "Country",
//     infoText: "Info",
//     inputLabel: "Select a country",
//     warningText: "Error",
//     maxCharQuantityWarningText: "Max characters exceeded"
//   };

//   const countries = countryNamesArray;

//   const suggestionHandler = val => {
//     if (typeof val !== "string" || isEmpty(val)) return null;
//     const foundCountries = countries.filter(country =>
//       country.toUpperCase().startsWith(val.toUpperCase())
//     );

//     if (isEmpty(foundCountries)) return null;

//     return foundCountries.map((country, idx) => ({
//       id: `c_${idx}`,
//       label: country
//     }));
//   };

//   return (
//     <HvBaseInput
//       labels={labels}
//       id="suggestions"
//       value={value}
//       onChange={(e, val) => setValue(val)}
//       validation={val => val.includes("a")}
//       suggestionListCallback={suggestionHandler}
//       suggestionSelectedCallback={item => setValue(item.label)}
//       customFixedIcon={<Map />}
//     />
//   );
// };

// Suggestion.story = {
//   parameters: {
//     docs: {
//       storyDescription: "Input with suggestion list."
//     }
//   }
// };
