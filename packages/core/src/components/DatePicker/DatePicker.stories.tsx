import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";
import { Meta, StoryObj } from "@storybook/react";
import { useEffect, useState } from "react";
import { CSSInterpolation, css } from "@emotion/css";
import {
  HvButton,
  HvFormStatus,
  HvGrid,
  HvListContainer,
  HvListItem,
  HvRadio,
  HvRadioGroup,
} from "@core/components";
import { HvDatePicker, HvDatePickerProps } from "./DatePicker";

const Decorator = ({ children }) => {
  return <div style={{ width: 340, height: 600, padding: 10 }}>{children}</div>;
};

const meta: Meta<typeof HvDatePicker> = {
  title: "Components/Date Picker",
  component: HvDatePicker,
};
export default meta;

export const Main: StoryObj<HvDatePickerProps> = {
  args: {
    disabled: false,
    required: false,
    status: "standBy",
    locale: "en-US",
    showActions: false,
    showClear: false,
    disablePortal: false,
    escapeWithReference: false,
    readOnly: false,
  },
  argTypes: {
    classes: { control: { disable: true } },
  },
  decorators: [(Story) => <Decorator>{Story()}</Decorator>],
  render: (args) => {
    return (
      <HvDatePicker
        id="DatePicker"
        placeholder="Select date"
        aria-label="Date"
        {...args}
      />
    );
  },
};

export const Variants: StoryObj<HvDatePickerProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "Date Pickers in their various form state variants. `value` is used to configure the _uncontrolled_ initial value.",
      },
    },
  },
  render: () => {
    const value = new Date("2023-01-01");

    const styles: { root: CSSInterpolation } = {
      root: {
        display: "flex",
        height: 550,
        gap: 20,
        flexWrap: "wrap",
        "& > div": {
          width: 200,
        },
      },
    };

    return (
      <div className={css(styles.root)}>
        <HvDatePicker required label="Required" value={value} />
        <HvDatePicker disabled label="Disabled" value={value} />
        <HvDatePicker readOnly label="Read-only" value={value} />
        <HvDatePicker
          label="Invalid"
          status="invalid"
          statusMessage="This is an invalid date"
          value={value}
        />
      </div>
    );
  },
};

export const DefaultValue: StoryObj<HvDatePickerProps> = {
  parameters: {
    eyes: { include: false },
    docs: {
      description: {
        story: "Datepicker default value and limit selection range.",
      },
    },
  },
  decorators: [(Story) => <Decorator>{Story()}</Decorator>],
  render: () => {
    return (
      <HvDatePicker
        id="DatePicker"
        aria-label="Date"
        placeholder="Select date"
        value={new Date("2020-10-10")}
      />
    );
  },
};

export const Localized: StoryObj<HvDatePickerProps> = {
  parameters: {
    eyes: { include: false },
    docs: {
      description: {
        story: "Datepicker sample with values localized.",
      },
    },
  },
  decorators: [(Story) => <Decorator>{Story()}</Decorator>],
  render: () => {
    // Locales must be imported beforehand:
    // import "dayjs/locale/pt";
    const initialLocale = "pt";
    const [locale, setLocale] = useState(initialLocale);

    return (
      <>
        <div style={{ marginBottom: "20px", width: "400px" }}>
          <HvRadioGroup
            orientation="horizontal"
            value={locale}
            onChange={(event, value) => {
              setLocale(value);
            }}
          >
            <HvRadio label="English" value="en" />
            <HvRadio label="French" value="fr" />
            <HvRadio label="Portuguese" value="pt" />
          </HvRadioGroup>
        </div>
        <HvDatePicker
          placeholder={`Select a date in ${locale}`}
          locale={locale}
          id="DatePicker"
          aria-label="Date"
        />
      </>
    );
  },
};

export const WithActions: StoryObj<HvDatePickerProps> = {
  parameters: {
    eyes: { include: false },
    docs: {
      description: {
        story: "Datepicker with action buttons at the bottom.",
      },
    },
  },
  decorators: [(Story) => <Decorator>{Story()}</Decorator>],
  render: () => {
    return (
      <HvDatePicker
        showActions
        value={new Date(1970, 1, 2)}
        id="DatePicker"
        placeholder="Select date"
        aria-label="Date"
      />
    );
  },
};

export const WithCustomLabels: StoryObj<HvDatePickerProps> = {
  parameters: {
    eyes: { include: false },
    docs: {
      description: {
        story:
          "Datepicker with actions buttons at the bottom that have custom labels.",
      },
    },
  },
  decorators: [(Story) => <Decorator>{Story()}</Decorator>],
  render: () => {
    return (
      <HvDatePicker
        aria-label="Date"
        showActions
        label="This is the title for the date picker"
        placeholder="Custom placeholder"
        labels={{
          applyLabel: "Custom apply",
          cancelLabel: "Custom cancel",
          clearLabel: "Custom clear",
          invalidDateLabel: "Custom invalid",
        }}
      />
    );
  },
};

export const RangeMode: StoryObj<HvDatePickerProps> = {
  parameters: {
    eyes: { include: false },
    docs: {
      description: {
        story:
          "Datepicker in range mode allowing the selection of more than one value.",
      },
    },
  },
  decorators: [(Story) => <Decorator>{Story()}</Decorator>],
  render: () => {
    return (
      <HvDatePicker
        aria-label="Date"
        placeholder="Select a range"
        rangeMode
        startValue={new Date(2020, 1, 1)}
        endValue={new Date(2020, 1, 10)}
        labels={{
          applyLabel: "Apply",
          cancelLabel: "Cancel",
        }}
      />
    );
  },
};

export const RangeModeWithNoValues: StoryObj<HvDatePickerProps> = {
  parameters: {
    eyes: { include: false },
    docs: {
      description: {
        story:
          "Datepicker in range mode allowing the selection of more than one value.",
      },
    },
  },
  decorators: [(Story) => <Decorator>{Story()}</Decorator>],
  render: () => {
    return (
      <HvDatePicker
        aria-label="Date"
        placeholder="Select a range"
        rangeMode
        labels={{
          applyLabel: "Apply",
          cancelLabel: "Cancel",
        }}
      />
    );
  },
};

export const NearInvalid: StoryObj<HvDatePickerProps> = {
  parameters: {
    eyes: { include: false },
    docs: {
      description: {
        story: "Datepicker in range mode with invalid near invalid dates.",
      },
    },
  },
  decorators: [(Story) => <Decorator>{Story()}</Decorator>],
  render: () => {
    return (
      <HvDatePicker
        aria-label="Date"
        placeholder="Select date"
        value={new Date(1000, 0, 1)}
      />
    );
  },
};

export const WithValueChange: StoryObj<HvDatePickerProps> = {
  decorators: [(Story) => <Decorator>{Story()}</Decorator>],
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date(2020, 0, 1));

    const addDay = () => {
      if (date)
        setDate(
          new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
        );
    };
    return (
      <>
        <HvButton
          id="AddButton"
          onClick={addDay}
          style={{ marginBottom: "10px" }}
        >
          Add a day
        </HvButton>
        <HvDatePicker
          id="DatePicker"
          aria-label="Date"
          placeholder="Select date"
          value={date}
          onChange={(d) => {
            setDate(d);
          }}
        />
      </>
    );
  },
};

export const WithSelectionList: StoryObj<HvDatePickerProps> = {
  decorators: [(Story) => <Decorator>{Story()}</Decorator>],
  render: () => {
    const [startDate, setStartDate] = useState<Date>(new Date(2020, 8, 5));
    const [endDate, setEndDate] = useState<Date>(new Date(2020, 8, 10));
    const [trueStartDate, setTrueStartDate] = useState<Date>(
      new Date(2020, 8, 5)
    );
    const [trueEndDate, setTrueEndDate] = useState<Date>(new Date(2020, 8, 10));

    useEffect(() => {
      setStartDate(trueStartDate);
    }, [trueStartDate]);

    useEffect(() => {
      setEndDate(trueEndDate);
    }, [trueEndDate]);

    const handleClick = (item) => {
      console.log(item);
      const today = new Date();
      const [d, m, y] = [
        today.getDate(),
        today.getMonth(),
        today.getFullYear(),
      ];

      switch (item) {
        case "Last 7 days": {
          setStartDate(new Date(y, m, d - 7));
          setEndDate(new Date(y, m, d));
          break;
        }
        case "This month": {
          setStartDate(new Date(y, m, 1));
          setEndDate(new Date(y, m, d));
          break;
        }
        case "This year": {
          setStartDate(new Date(y, 0, 1));
          setEndDate(new Date(y, m, d));
          break;
        }
        default:
          break;
      }
    };

    const options = (
      <HvListContainer
        role="menu"
        style={{ padding: "40px 20px", minWidth: 160 }}
        interactive
      >
        <HvListItem role="menuitem" disabled>
          Today
        </HvListItem>
        <HvListItem role="menuitem" disabled>
          Yesterday
        </HvListItem>
        <HvListItem role="menuitem" onClick={() => handleClick("Last 7 days")}>
          Last 7 days
        </HvListItem>
        <HvListItem role="menuitem" onClick={() => handleClick("This month")}>
          This month
        </HvListItem>
        <HvListItem role="menuitem" onClick={() => handleClick("This year")}>
          This year
        </HvListItem>
      </HvListContainer>
    );

    return (
      <HvDatePicker
        id="DatePicker"
        aria-label="Date"
        startAdornment={options}
        rangeMode
        startValue={startDate}
        endValue={endDate}
        onChange={(sd, ed) => {
          if (sd) setTrueStartDate(sd);
          if (ed) setTrueEndDate(ed);
        }}
        placeholder="Select date"
        onCancel={() => {
          setStartDate(trueStartDate);
          setEndDate(trueEndDate);
        }}
        showClear
      />
    );
  },
};

export const ExternalErrorMessage: StoryObj<HvDatePickerProps> = {
  parameters: {
    eyes: { include: false },
    docs: {
      description: {
        story:
          "A form element can be invalid but render its error message elsewhere. For instance if a business rule error relates to the combination of two or more fields, or if we want to display all the form errors together in a summary section. The [aria-errormessage](https://w3c.github.io/aria/#aria-errormessage) property should reference another element that contains error message text. It can be used when controlling the validation status or when relying on the built-in validations, but the message text computation is reponsability of the app.",
      },
    },
  },
  render: () => {
    const [deathValidationState, setDeathValidationState] =
      useState<HvFormStatus>("invalid");

    const [birthErrorMessage, setBirthErrorMessage] = useState<
      string | undefined
    >();
    const [deathErrorMessage, setDeathErrorMessage] = useState(
      "The death day will always be invalid."
    );

    const StyledList = styled("ul")({
      margin: "16px 0px",
      paddingLeft: "40px",
    });

    return (
      <HvGrid container>
        <HvGrid item xs={5} container>
          <HvGrid item xs={12}>
            <HvDatePicker
              label="Birth day"
              description="Please enter when you're born"
              placeholder="Choose a date"
              required
              aria-errormessage="birth-error"
              onChange={(value) => {
                if (!value) {
                  setBirthErrorMessage("You must provide a birth day.");
                } else {
                  setBirthErrorMessage(undefined);
                }
              }}
            />
          </HvGrid>
          <HvGrid item xs={12}>
            <HvDatePicker
              label="Death day"
              description="Please enter when you're dead"
              placeholder="Choose a date"
              required
              status={deathValidationState}
              aria-errormessage="death-error"
              onChange={(value) => {
                setDeathValidationState("invalid");

                if (!value) {
                  setDeathErrorMessage("You can try choosing a death day.");
                } else {
                  setDeathErrorMessage(
                    "The death day will always be invalid. I know you're alive!"
                  );
                }
              }}
            />
          </HvGrid>
        </HvGrid>
        <HvGrid item xs={7}>
          <div
            style={{
              paddingTop: "10px",
              paddingLeft: "10px",
              backgroundColor: theme.colors.negative_20,
              color: theme.colors.base_dark,
              height: "100%",
            }}
          >
            {" "}
            <h4>Form errors:</h4>
            <StyledList>
              {birthErrorMessage && (
                <li id="birth-error" aria-live="polite">
                  {birthErrorMessage}
                </li>
              )}
              {deathErrorMessage && (
                <li id="death-error" aria-live="polite">
                  {deathErrorMessage}
                </li>
              )}
            </StyledList>
          </div>
        </HvGrid>
      </HvGrid>
    );
  },
};

ExternalErrorMessage.decorators = [
  (Story) => (
    <div style={{ height: 650, width: "90vw" }}>
      <Story />
    </div>
  ),
];
