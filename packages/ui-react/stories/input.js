import React from "react";
import { storiesOf } from "@storybook/react";
import {
  HvInput,
  HvShowCase,
  HvShowCaseHeader,
  validationStates,
  validationTypes,
  iconPositions
} from "../src";

const inputTextConfiguration = {
  placeholder: "Insert text",
  infoText: "Info",
  inputLabel: "Label",
  warningText: "Error",
  maxCharQuantityWarningText: "Max characters exceeded"
};

const emailInputTextConfiguration = {
  placeholder: "example@domain.com",
  infoText: "Enter your email",
  inputLabel: "Email",
  warningText: "please add the right email format: your.name@hitachivantar.com",
  maxCharQuantityWarningText: "Max characters exceeded"
};

const passwordInputTextConfiguration = {
  placeholder: "Must have at least 6 character",
  infoText: "Enter your password",
  inputLabel: "password",
  warningText: "wrong password",
  maxCharQuantityWarningText: "Your password has more than 12 characters",
  minCharQuantityWarningText: "Your password has less than 6 characters",
  requiredWarningText: "Your password is required"
};

const numberInputTextConfiguration = {
  placeholder: "Insert a number",
  infoText: "Enter a number",
  inputLabel: "Number",
  warningText: "This is not a number",
  maxCharQuantityWarningText: "Number is too big",
  requiredWarningText: "the number is required"
};

const HvShowCaseStyle = {
  min: {
    width: "150px"
  },
  max: {
    maxWidth: "800px"
  }
};

storiesOf("Input", module).add(`Input`, () => (
  <>
    <HvShowCaseHeader reviewed date="2019/Jan/4" />

    <HvShowCase title="Input" style={HvShowCaseStyle.min}>
      <HvInput inputTextConfiguration={inputTextConfiguration} />
    </HvShowCase>

    <HvShowCase
      title="40 character"
      description="Input that only accepts 40 maximum characters"
    >
      <HvInput
        inputTextConfiguration={inputTextConfiguration}
        maxCharQuantity={40}
      />
    </HvShowCase>

    <HvShowCase
      title="40 digit input"
      description="Input that only accepts 40 digits"
    >
      <HvInput
        inputTextConfiguration={numberInputTextConfiguration}
        validationType={validationTypes.number}
        maxCharQuantity={40}
      />
    </HvShowCase>

    <HvShowCase
      title="40 digit input"
      description="Input that only accepts 40 digits and is required"
    >
      <HvInput
        inputTextConfiguration={numberInputTextConfiguration}
        validationType={validationTypes.number}
        isRequired
        maxCharQuantity={40}
      />
    </HvShowCase>

    <HvShowCase
      title="Email input"
      description="Validates email"
      style={HvShowCaseStyle.min}
    >
      <HvInput
        inputTextConfiguration={emailInputTextConfiguration}
        validationType={validationTypes.email}
      />
    </HvShowCase>

    <HvShowCase
      title="Email input"
      description="input disabled"
      style={HvShowCaseStyle.min}
    >
      <HvInput
        inputTextConfiguration={emailInputTextConfiguration}
        disabled
        validationType={validationTypes.email}
      />
    </HvShowCase>

    <HvShowCase
      title="Custom validation"
      description="only values with 'hello'"
    >
      <HvInput
        inputTextConfiguration={inputTextConfiguration}
        validation={value => value.includes("hello")}
      />
    </HvShowCase>

    <HvShowCase
      title="Password"
      description="password required"
      style={HvShowCaseStyle.min}
    >
      <HvInput
        inputTextConfiguration={passwordInputTextConfiguration}
        validation={value => value === "password"}
        password
        isRequired
        maxCharQuantity={12}
        minCharQuantity={6}
      />
    </HvShowCase>

    <HvShowCase
      title="Default value"
      description="input with default"
      style={HvShowCaseStyle.min}
    >
      <HvInput
        inputTextConfiguration={emailInputTextConfiguration}
        validationType={validationTypes.email}
        value="example@exam.com"
      />
    </HvShowCase>

    <HvShowCase
      title="Initial state"
      description="input initial state"
      style={HvShowCaseStyle.min}
    >
      <HvInput
        inputTextConfiguration={emailInputTextConfiguration}
        validationType={validationTypes.email}
        validationState={validationStates.invalid}
        value="wrong"
      />
    </HvShowCase>

    <HvShowCase
      title="Left icon"
      description="icon left aligned"
      style={HvShowCaseStyle.min}
    >
      <HvInput
        inputTextConfiguration={emailInputTextConfiguration}
        iconPosition={iconPositions.left}
        validationType={validationTypes.email}
        validationState={validationStates.invalid}
        value="wrong"
      />
    </HvShowCase>

    <HvShowCase
      title="onChange"
      description="shows how to execute a function on focus and the provided values what should be return"
    >
      <HvInput
        inputTextConfiguration={inputTextConfiguration}
        onChange={value => `${value}.`}
      />
    </HvShowCase>

    <HvShowCase
      title="onBlur"
      description="shows how to execute a function on blur and the provided values"
    >
      <HvInput
        inputTextConfiguration={numberInputTextConfiguration}
        validationType={validationTypes.number}
        onBlur={(value, validationState) => {
          alert(
            `my value is ${value} and my validation state is ${validationState}`
          );
        }}
      />
    </HvShowCase>

    <HvShowCase
      title="onFocus"
      description="shows how to execute a function on focus and the provided values"
    >
      <HvInput
        inputTextConfiguration={inputTextConfiguration}
        onFocus={value => {
          console.log(`my value is ${value}`);
        }}
      />
    </HvShowCase>

    <HvShowCase
      title="Simple Input minimum size"
      description="small container"
      style={HvShowCaseStyle.min}
    >
      <HvInput />
    </HvShowCase>

    <HvShowCase
      title="Simple Input max size"
      description="giant container"
      style={HvShowCaseStyle.max}
    >
      <HvInput />
    </HvShowCase>
  </>
));
