import { useState } from "react";
import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";
import { Map } from "@hitachivantara/uikit-react-icons";
import { Meta, StoryObj } from "@storybook/react";
import {
  HvButton,
  HvFormStatus,
  HvInput,
  HvInputProps,
  HvGrid,
  HvLabel,
  HvInfoMessage,
  HvTypography,
  HvBaseInput,
} from "~/components";
import countryNamesArray from "./countries";
import { HvInputSuggestion } from "../../types";

const meta: Meta<typeof HvInput> = {
  title: "Components/Input",
  component: HvInput,
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
    return <HvInput id="input-simple-sample" {...args} />;
  },
};

export const Disabled: StoryObj<HvInputProps> = {
  parameters: {
    docs: {
      description: {
        story: "Input sample that does not allow interactions",
      },
    },
  },
  render: () => {
    return (
      <HvInput
        id="input-disabled-sample"
        disabled
        label="First name"
        description="Please enter your first name"
        placeholder="Insert first name"
      />
    );
  },
};

export const ReadOnly: StoryObj<HvInputProps> = {
  parameters: {
    docs: {
      description: {
        story: "Not editable input.",
      },
    },
  },
  render: () => {
    return (
      <HvInput
        readOnly
        label="First name"
        description="Please enter your first name"
        placeholder="Insert first name"
        defaultValue="You can't change this..."
      />
    );
  },
};

export const WithoutLabel: StoryObj<HvInputProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "Input without label. The accessible name is provided via the `aria-label` property.",
      },
    },
  },
  render: () => {
    return <HvInput aria-label="First name" placeholder="Insert first name" />;
  },
};

export const Required: StoryObj<HvInputProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "Required input value. Clear the input to show default error message.",
      },
    },
  },
  render: () => {
    return (
      <HvInput
        required
        label="First name"
        placeholder="Insert first name"
        defaultValue="Clear this text"
      />
    );
  },
};

export const ControlledWithButtons: StoryObj<HvInputProps> = {
  parameters: {
    docs: {
      description: {
        story: "Changing the input value from outside the input component.",
      },
    },
    eyes: { include: false },
  },
  render: () => {
    const StyledContainer = styled("div")({
      "& button": {
        marginBottom: theme.spacing(4),
      },
    });
    const StyledWrapper = styled("div")({
      "& button": {
        marginRight: theme.space.xs,
      },
    });

    const [value, setValue] = useState("Initial value");

    // to be possible to change the input value by user action
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    return (
      <StyledContainer>
        <StyledWrapper>
          <HvButton
            variant="secondarySubtle"
            onClick={() => setValue("First value")}
          >
            First value
          </HvButton>
          <HvButton
            variant="secondarySubtle"
            onClick={() => setValue("Second value")}
          >
            Second value
          </HvButton>
          <HvButton
            variant="secondarySubtle"
            onClick={() => setValue("Third value")}
          >
            Third value
          </HvButton>
          <HvButton variant="secondarySubtle" onClick={() => setValue("")}>
            Clear value
          </HvButton>
        </StyledWrapper>

        <HvInput
          label="Label"
          placeholder="Enter value"
          value={value}
          onChange={handleChange}
        />
      </StyledContainer>
    );
  },
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
      "This is invalid just because I said so."
    );

    return (
      <HvInput
        id="invalid-state-input"
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
            "Nice try, but this will always be invalid. I told you!"
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
    eyes: { include: false },
  },
  render: () => {
    const [lastNameValidationState, setLastNameValidationState] =
      useState<HvFormStatus>("invalid");

    const [firstNameErrorMessage, setFirstNameErrorMessage] = useState<
      string | null
    >(null);
    const [lastNameErrorMessage, setLastNameErrorMessage] = useState<
      string | null
    >("The last name is invalid just because I said so.");

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
              onFocus={(_, value) => {
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
        <HvGrid item xs={7}>
          <div
            style={{
              paddingTop: "20px",
              paddingLeft: "30px",
              backgroundColor: theme.colors.negative_20,
              color: theme.colors.base_dark,
              height: "100%",
            }}
          >
            <h4>Form errors:</h4>
            <ul>
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

export const NumericRequired: StoryObj<HvInputProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "Required Input that only accepts numbers and limits the maximum length to 5.",
      },
    },
  },
  render: () => {
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
  },
};

export const Email: StoryObj<HvInputProps> = {
  parameters: {
    docs: {
      description: {
        story: "Required Input that only accepts valid emails.",
      },
    },
  },
  render: () => {
    const validationMessages = {
      typeMismatchError:
        "Please add the right email format: your.name@hitachivantara.com",
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
  },
};

export const Password: StoryObj<HvInputProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "Password required input that only accepts the value `password` and limits the value between 6 or 12 characters.",
      },
    },
  },
  render: () => {
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
  },
};

export const Search: StoryObj<HvInputProps> = {
  render: () => {
    return (
      <HvInput
        aria-label="Basic search"
        placeholder="Search"
        type="search"
        onEnter={console.log}
      />
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
        id="custom-validation-input"
        label="Compliment me"
        description="You must input the text 'hello'"
        placeholder="Insert 'hello'"
        validationMessages={validationMessages}
        validation={(value) => value.includes("hello")}
        showValidationIcon
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
    eyes: { include: false },
  },
  render: () => {
    const [value, setValue] = useState("");

    return (
      <HvInput
        id="event-demonstration-input"
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
            validationState
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
          "Using the input props to inject custom props. This input will block values exceeding 25 character and display an error if less than 5 characters.",
      },
    },
    eyes: { include: false },
  },
  render: () => {
    return (
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
  },
};

export const Suggestion: StoryObj<HvInputProps> = {
  parameters: {
    docs: {
      description: {
        story: "Input with suggestion list.",
      },
    },
    eyes: { include: false },
  },
  decorators: [(Story) => <div style={{ height: 400 }}>{Story()}</div>],
  render: () => {
    const [value, setValue] = useState("");

    const countries = countryNamesArray;

    const suggestionHandler = (val: string): HvInputSuggestion[] | null => {
      if (typeof val !== "string" || val === "") return null;
      const foundCountries = countries.filter((country) =>
        country.toUpperCase().startsWith(val.toUpperCase())
      );

      if (foundCountries.length === 0) return null;

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
  },
};

export const PrefixAndSuffix: StoryObj<HvInputProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "If you need to apply a custom layout, e.g. for providing a prefix or suffix, you can and should externalize both the label and description.",
      },
    },
  },
  render: () => {
    const validationMessages = {
      error: "Invalid subdomain",
    };

    const validateSubdomain = (value) => {
      const re = /[^a-zA-Z0-9-]/;

      return !re.test(value);
    };

    const StyledControlContainer = styled("div")({
      width: "100%",
      maxWidth: 400,
    });
    const StyledLabelContainer = styled("div")({
      display: "flex",
      alignItems: "flex-start",
    });
    const StyledInputContainer = styled("div")({
      width: "100%",
      display: "flex",
      alignItems: "baseline",

      "& > *": {
        marginLeft: theme.space.xs,
      },
      "& > p:first-of-type": {
        marginLeft: 0,
      },
    });
    const StyledLabel = styled(HvLabel)({
      paddingBottom: "6px",
    });
    const StyledInput = styled(HvInput)({
      flexGrow: 1,
    });

    return (
      <StyledControlContainer>
        <StyledLabelContainer>
          <StyledLabel label="Subdomain" htmlFor="subdomain-input" />
          <HvInfoMessage id="subdomain-description">
            Choose your application subdomain
          </HvInfoMessage>
        </StyledLabelContainer>
        <StyledInputContainer>
          <HvTypography>https://</HvTypography>
          <StyledInput
            id="subdomain"
            name="subdomain"
            aria-describedby="subdomain-description"
            placeholder="Enter sub-domain"
            validation={validateSubdomain}
            validationMessages={validationMessages}
          />
          <HvTypography>.lumada.org</HvTypography>
        </StyledInputContainer>
      </StyledControlContainer>
    );
  },
};
