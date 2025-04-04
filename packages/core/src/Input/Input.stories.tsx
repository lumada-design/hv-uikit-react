import { useRef, useState } from "react";
import { css } from "@emotion/css";
import { Decorator, Meta, StoryObj } from "@storybook/react";
import {
  HvBaseInput,
  HvFormStatus,
  HvGrid,
  HvInput,
  HvInputProps,
  HvInputSuggestion,
  HvTypography,
  HvValidationMessages,
  theme,
} from "@hitachivantara/uikit-react-core";
import { Calendar, Map, Time } from "@hitachivantara/uikit-react-icons";

import ControlledStory from "./stories/Controlled";
import ControlledRaw from "./stories/Controlled?raw";
import countryNamesArray from "./stories/countries";

const showcaseDecorator: Decorator = (Story) => (
  <div
    className={css({
      display: "flex",
      justifyContent: "flex-start",
      flexFlow: "row wrap",
      gap: theme.space.sm,
      "& > div": {
        width: 200,
      },
    })}
  >
    {Story()}
  </div>
);

const meta: Meta<typeof HvInput> = {
  title: "Components/Input",
  component: HvInput,
  // @ts-ignore https://github.com/storybookjs/storybook/issues/23170
  subcomponents: { HvBaseInput },
};
export default meta;

export const Main: StoryObj<HvInputProps> = {
  args: {
    label: "First name",
    description: "Please enter your first name",
    placeholder: "Insert first name",
    disabled: false,
    readOnly: false,
    required: false,
    type: "text",
    status: "valid",
    statusMessage: "My status message",
    autoFocus: false,
    disableClear: false,
    disableRevealPassword: false,
    disableSearchButton: false,
    showValidationIcon: false,
    minCharQuantity: undefined,
    maxCharQuantity: undefined,
  },
  argTypes: {
    classes: { control: { disable: true } },
    onChange: { control: { disable: true } },
    onEnter: { control: { disable: true } },
    onBlur: { control: { disable: true } },
    onFocus: { control: { disable: true } },
    onKeyDown: { control: { disable: true } },
    validation: { control: { disable: true } },
    endAdornment: { control: { disable: true } },
    inputProps: { control: { disable: true } },
    suggestionListCallback: { control: { disable: true } },
    inputRef: { control: { disable: true } },
    validationMessages: { control: { disable: true } },
    labels: { control: { disable: true } },
  },
  render: (args) => {
    return <HvInput {...args} />;
  },
};

export const Variants: StoryObj<HvInputProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "Inputs in their various state variants. `HvInput` also has custom support for various `type` attributes, such as `email` and `password`.",
      },
    },
  },
  decorators: [showcaseDecorator],
  args: {
    description: "Enter your name",
    placeholder: "Insert first name",
  },
  render: (args) => {
    const validationMessages: HvValidationMessages = {
      error: "Invalid value!",
      maxCharError: "Value is too long!",
      minCharError: "Value is too short!",
      requiredError: "Value is required!",
      typeMismatchError: "Type is incorrect!",
    };

    return (
      <>
        <HvInput required label="Required" {...args} />
        <HvInput disabled label="Disabled" {...args} />
        <HvInput readOnly label="Readonly" {...args} />
        <HvInput
          required
          label="Invalid"
          status="invalid"
          statusMessage="Oh no!"
          {...args}
        />
        <HvInput
          required
          type="email"
          label="Email"
          description="Enter email"
          placeholder="example@domain.com"
          showValidationIcon
          validationMessages={validationMessages}
        />
        <HvInput
          type="password"
          label="Password"
          description="Enter password"
          placeholder="Enter password"
          validationMessages={validationMessages}
        />
        <HvInput
          type="search"
          label="Search"
          description="Search for a value"
          placeholder="Search..."
          validationMessages={validationMessages}
          onEnter={(event, value) => console.log("Searching", value)}
        />
        <HvInput
          required
          type="number"
          label="Number"
          description="With 2-3 digits"
          placeholder="Pick a number"
          showValidationIcon
          minCharQuantity={2}
          maxCharQuantity={3}
          validationMessages={validationMessages}
        />
      </>
    );
  },
};

export const Accessibility: StoryObj<HvInputProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "Inputs not using the visual `label` prop should instead provide an `aria-label` property.",
      },
    },
  },
  render: () => {
    return <HvInput aria-label="First name" placeholder="Insert first name" />;
  },
};

export const Controlled: StoryObj<HvInputProps> = {
  parameters: {
    docs: {
      source: { code: ControlledRaw },
      description: {
        story: "Changing the input value from outside the input component.",
      },
    },
  },
  render: () => <ControlledStory />,
};

export const InvalidState: StoryObj<HvInputProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "Controlling the validation state and the error message. When controlling the validation state it is recommended to also manage the error message via the statusMessage property. Also, the input will remain in invalid state even when active, unless it is handled manually in the onFocus/onBlur.",
      },
    },
  },
  render: () => {
    const [validationState, setValidationState] =
      useState<HvFormStatus>("invalid");
    const [errorMessage, setErrorMessage] = useState(
      "This is invalid just because I said so.",
    );

    return (
      <HvInput
        label="Last name"
        description="Please enter your last name"
        placeholder="Insert last name"
        defaultValue="Not a name!"
        status={validationState}
        statusMessage={errorMessage}
        onFocus={(_, value) => setValidationState(value ? "standBy" : "empty")}
        onBlur={() => {
          setValidationState("invalid");
          setErrorMessage(
            "Nice try, but this will always be invalid. I told you!",
          );
        }}
      />
    );
  },
};

export const ExternalErrorMessage: StoryObj<HvInputProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "A form element can be invalid but render its error message elsewhere. For instance if a business rule error relates to the combination of two or more fields, or if we want to display all the form errors together in a summary section. The [aria-errormessage](https://w3c.github.io/aria/#aria-errormessage) property should reference another element that contains error message text. It can be used when controlling the validation status or when relying on the built-in validations, but the message text computation is reponsability of the app.",
      },
    },
  },
  render: () => {
    const [lastNameValidationState, setLastNameValidationState] =
      useState<HvFormStatus>("invalid");

    const [firstNameErrorMessage, setFirstNameErrorMessage] =
      useState<string>();
    const [lastNameErrorMessage, setLastNameErrorMessage] = useState(
      "The last name is invalid just because I said so.",
    );

    return (
      <HvGrid container>
        <HvGrid container item xs={12} md={6}>
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
                  setFirstNameErrorMessage(undefined);
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
              onFocus={(_, value) => {
                setLastNameValidationState(value ? "standBy" : "empty");
              }}
              onBlur={(_e, _value, inputValidity) => {
                setLastNameValidationState("invalid");

                if (inputValidity.valueMissing) {
                  setLastNameErrorMessage("You must provide a last name");
                } else {
                  setLastNameErrorMessage(
                    "Nice try, but the last name will always be invalid. I told you!",
                  );
                }
              }}
            />
          </HvGrid>
        </HvGrid>
        <HvGrid item xs={12} md={6}>
          <div
            style={{
              backgroundColor: theme.colors.negativeDimmed,
              color: theme.colors.textDark,
              padding: theme.space.md,
            }}
          >
            <HvTypography
              component="h4"
              variant="title4"
              style={{
                color: theme.colors.textDark,
              }}
            >
              Form errors:
            </HvTypography>
            <ul
              className={css({
                margin: theme.spacing("sm", 0),
                paddingLeft: theme.space.md,
              })}
            >
              {firstNameErrorMessage && (
                <li id="firstName-error" aria-live="polite">
                  {firstNameErrorMessage}
                </li>
              )}
              {lastNameErrorMessage && (
                <li id="lastName-error" aria-live="polite">
                  {lastNameErrorMessage}
                </li>
              )}
            </ul>
          </div>
        </HvGrid>
      </HvGrid>
    );
  },
};

export const CustomValidation: StoryObj<HvInputProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "Input with a custom validation function, it validates if the input contains the value `hello`.",
      },
    },
  },
  render: () => {
    const validationMessages = {
      error: "You didn't write 'hello'",
    };

    return (
      <HvInput
        label="Compliment me"
        description="You must input the text 'hello'"
        placeholder="Insert 'hello'"
        validationMessages={validationMessages}
        validation={(value) => value.includes("hello")}
        showValidationIcon
        onBlur={(event, value, validationState) => {
          console.log(value, validationState);
        }}
      />
    );
  },
};

export const EventDemonstration: StoryObj<HvInputProps> = {
  parameters: {
    docs: {
      description: {
        story: "Input with all events functions enabled.",
      },
    },
  },
  render: () => {
    const [value, setValue] = useState("");

    return (
      <HvInput
        label="Text I will modify"
        description="Look at the browser's developer console to see the event handlers output"
        placeholder="Insert text"
        value={value}
        onFocus={(_event, newValue) => {
          console.log(`my value is ${newValue}`);
        }}
        onBlur={(_event, newValue, validationState) => {
          console.log(
            `my value is ${newValue} and my validation state is`,
            validationState,
          );
        }}
        onChange={(_event, newValue) => setValue(`${newValue}.`)}
      />
    );
  },
};

export const CustomProps: StoryObj<HvInputProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "Using `inputProps` to inject custom props. This input will block values exceeding 25 character and display an error if less than 5 characters.",
      },
    },
  },
  render: () => {
    return (
      <HvInput
        label="Short story of your life"
        description="Try to write more than 25 characters"
        placeholder="Insert text"
        inputProps={{
          minLength: 5,
          maxLength: 25,
        }}
      />
    );
  },
};

export const CustomVariants: StoryObj<HvInputProps> = {
  decorators: [showcaseDecorator],
  parameters: {
    docs: {
      description: {
        story:
          "Using the `inputProps` to configure custom [HTML input types](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input). This can be useful for providing a better mobile experience.",
      },
    },
  },
  render: () => {
    const timeRef = useRef<HTMLInputElement>(null);
    const dateRef = useRef<HTMLInputElement>(null);
    const dateTimeRef = useRef<HTMLInputElement>(null);

    return (
      <>
        <HvInput
          label="Number"
          placeholder="Insert a number"
          inputProps={{ type: "number", min: 10, max: 99 }}
        />
        <HvInput
          ref={dateRef}
          label="Date"
          placeholder="Insert text"
          inputProps={{ type: "date" }}
          endAdornment={
            <Calendar onClick={() => dateRef.current?.showPicker()} />
          }
        />
        <HvInput
          ref={dateTimeRef}
          label="Datetime-local"
          placeholder="Insert text"
          inputProps={{ type: "datetime-local", step: 1 }}
          endAdornment={
            <Calendar onClick={() => dateTimeRef.current?.showPicker()} />
          }
        />
        <HvInput
          ref={timeRef}
          label="Time"
          placeholder="Insert text"
          inputProps={{ type: "time", step: 1 }}
          endAdornment={<Time onClick={() => timeRef.current?.showPicker()} />}
        />
      </>
    );
  },
};

export const Suggestion: StoryObj<HvInputProps> = {
  parameters: {
    docs: {
      description: {
        story: "Input with suggestion list.",
      },
    },
  },
  decorators: [(Story) => <div style={{ height: 400 }}>{Story()}</div>],
  render: () => {
    const [value, setValue] = useState("");

    const countries = countryNamesArray;

    const suggestionHandler = (val: string): HvInputSuggestion[] | null => {
      if (typeof val !== "string" || val === "") return null;
      const foundCountries = countries.filter((country) =>
        country.toUpperCase().startsWith(val.toUpperCase()),
      );

      if (foundCountries.length === 0) return null;

      return foundCountries.map((country, idx) => ({
        id: `c_${idx}`,
        label: country,
      }));
    };

    return (
      <HvInput
        label="Select a country"
        placeholder="Country"
        value={value}
        onChange={(_e, val) => setValue(val)}
        validation={(val) => val.includes("a")}
        suggestionListCallback={suggestionHandler}
        endAdornment={<Map />}
      />
    );
  },
};

export const Adornments: StoryObj<HvInputProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "You can use `startAdornment` and `endAdornment` to create custom input layouts.",
      },
    },
  },
  decorators: [(Story) => <div style={{ maxWidth: 400 }}>{Story()}</div>],
  render: () => {
    const classes = {
      adornment: css({
        height: "100%",
        alignContent: "center",
        padding: theme.spacing(0, "xxs"),
      }),
    };

    return (
      <HvInput
        label="Subdomain"
        description="Choose your application subdomain"
        startAdornment={<span className={classes.adornment}>https://</span>}
        endAdornment={<span className={classes.adornment}>.lumada.org</span>}
        id="subdomain"
        name="subdomain"
        aria-describedby="subdomain-description"
        placeholder="Enter sub-domain"
        className={css({ flexGrow: 1 })}
        validation={(value) => !/[^a-zA-Z0-9-]/.test(value)}
        validationMessages={{ error: "Invalid subdomain" }}
      />
    );
  },
};

export const Test: StoryObj<HvInputProps> = {
  parameters: {
    docs: { disable: true },
  },
  decorators: [showcaseDecorator],
  args: {
    description: "Enter name",
    placeholder: "Insert first name",
  },
  render: (args) => {
    const validationMessages: HvValidationMessages = {
      error: "Invalid value!",
      maxCharError: "Value is too long!",
      minCharError: "Value is too short!",
      requiredError: "Value is required!",
      typeMismatchError: "Type is incorrect!",
    };

    return (
      <>
        <HvInput aria-label="default" className="self-end" />
        <HvInput disabled aria-label="default" className="self-end" />
        <HvInput label="Default value" defaultValue="value!" />
        <HvInput required label="Required" {...args} />
        <HvInput disabled label="Disabled" {...args} />
        <HvInput readOnly label="Readonly" {...args} />
        <HvInput
          required
          label="Invalid"
          status="invalid"
          statusMessage="Oh no!"
          {...args}
        />
        <HvInput
          required
          type="email"
          label="Email"
          description="Enter email"
          placeholder="example@domain.com"
          showValidationIcon
          validationMessages={validationMessages}
        />
        <HvInput
          type="password"
          label="Password"
          description="Enter password"
          placeholder="Enter password"
          validationMessages={validationMessages}
        />
        <HvInput
          disabled
          type="password"
          label="Disabled"
          description="Enter password"
          placeholder="Enter password"
          validationMessages={validationMessages}
        />
        <HvInput
          type="search"
          label="Search"
          description="Search for a value"
          placeholder="Search..."
          validationMessages={validationMessages}
          onEnter={(event, value) => console.log("Searching", value)}
        />
        <HvInput
          disabled
          type="search"
          label="Disabled"
          description="Search for a value"
          placeholder="Search..."
          validationMessages={validationMessages}
          onEnter={(event, value) => console.log("Searching", value)}
        />
        <HvInput
          required
          type="number"
          label="Number"
          description="With 2-3 digits"
          placeholder="Pick a number"
          showValidationIcon
          minCharQuantity={2}
          maxCharQuantity={3}
          validationMessages={validationMessages}
        />
        <HvInput
          required
          inputProps={{ type: "number", min: 10, max: 99 }}
          label="Number native"
          placeholder="Pick a number"
        />
        <HvInput
          required
          disabled
          defaultValue="60"
          inputProps={{ type: "number", min: 10, max: 99 }}
          label="Number native"
          placeholder="Pick a number"
        />
        <HvInput
          label="Domain"
          placeholder="domain"
          startAdornment={
            <span className="content-center px-xxs">https://</span>
          }
          endAdornment={
            <span className="h-full content-center px-xxs">.com</span>
          }
        />
        <HvInput
          type="password"
          label="Password"
          value="password"
          status="valid"
          showValidationIcon
          placeholder="Enter password"
          classes={{ inputRoot: "h-48px" }}
        />
      </>
    );
  },
};
