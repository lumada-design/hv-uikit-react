import { useEffect, useState } from "react";

import { Global } from "@emotion/react";

import { waitFor, screen, fireEvent } from "@storybook/testing-library";
import { DecoratorFn, Meta, StoryObj } from "@storybook/react";

import { CSSInterpolation, css, cx } from "@emotion/css";
import {
  HvButton,
  HvCalendar,
  HvDatePicker,
  HvDatePickerProps,
  HvFormStatus,
  HvGrid,
  HvListContainer,
  HvListItem,
  HvRadio,
  HvRadioGroup,
  theme,
} from "@hitachivantara/uikit-react-core";

const containerDecorator: DecoratorFn = (Story) => (
  <div className={cx("decorator", css({ width: 340, padding: 10 }))}>
    {Story()}
  </div>
);

const unsetDecorator: DecoratorFn = (Story) => (
  <>
    <Global styles={{ ".decorator:has(.unset)": { width: "unset" } }} />
    <div className="unset">{Story()}</div>
  </>
);

const meta: Meta<typeof HvDatePicker> = {
  title: "Components/Date Picker",
  subcomponents: { HvCalendar },
  component: HvDatePicker,
  decorators: [containerDecorator],
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
  render: (args) => {
    return <HvDatePicker placeholder="Select date" label="Date" {...args} />;
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
  decorators: [unsetDecorator],
  render: () => {
    const value = new Date("2023-01-01");

    const styles: { root: CSSInterpolation } = {
      root: {
        display: "flex",
        gap: 20,
        flexFlow: "row",
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

export const Localized: StoryObj<HvDatePickerProps> = {
  parameters: {
    eyes: { include: false },
    docs: {
      description: {
        story: "Datepicker sample with values localized.",
      },
    },
  },
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

export const NearInvalid: StoryObj<HvDatePickerProps> = {
  parameters: {
    eyes: {
      runBefore() {
        fireEvent.click(screen.getByRole("combobox"));

        return waitFor(() => screen.getByText("January"));
      },
    },
    docs: {
      description: {
        story: "Datepicker in range mode with invalid near invalid dates.",
      },
    },
  },
  render: () => {
    return (
      <HvDatePicker
        aria-label="Date"
        placeholder="Select date"
        value={new Date(2020, 0, 15)}
        calendarProps={{
          minimumDate: new Date(2020, 0, 10),
          maximumDate: new Date(2020, 0, 20),
        }}
      />
    );
  },
};

export const WithValueChange: StoryObj<HvDatePickerProps> = {
  parameters: {
    eyes: { include: false },
  },
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
  parameters: {
    eyes: {
      runBefore() {
        fireEvent.click(screen.getByRole("combobox"));

        return waitFor(() => screen.getByRole("button", { name: "Apply" }));
      },
    },
  },
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

    const handleClick = (item: string) => {
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
  decorators: [unsetDecorator],
  render: () => {
    const [endValidationState, setEndValidationState] =
      useState<HvFormStatus>("invalid");

    const [startErrorMessage, setStartErrorMessage] = useState<string>();
    const [endErrorMessage, setEndErrorMessage] = useState(
      "The end date will always be invalid."
    );

    return (
      <HvGrid container>
        <HvGrid container item xs={12}>
          <HvGrid item xs={12} sm={6}>
            <HvDatePicker
              label="Start date"
              description="Enter a start date"
              placeholder="Choose a date"
              required
              aria-errormessage="start-error"
              onChange={(value) => {
                setStartErrorMessage(
                  value ? undefined : "Start date is required."
                );
              }}
            />
          </HvGrid>
          <HvGrid item xs={12} sm={6}>
            <HvDatePicker
              label="End date"
              description="Enter an end date"
              placeholder="Choose a date"
              required
              status={endValidationState}
              aria-errormessage="end-error"
              onChange={(value) => {
                setEndValidationState("invalid");

                setEndErrorMessage(
                  value
                    ? "The end date will always be invalid."
                    : "You can try choosing an end date."
                );
              }}
            />
          </HvGrid>
        </HvGrid>
        <HvGrid item xs={12}>
          <div
            style={{
              display: "inline-block",
              padding: theme.space.md,
              backgroundColor: theme.colors.negative_20,
              color: theme.colors.base_dark,
              height: "100%",
            }}
          >
            <h4>Form errors:</h4>
            <ul
              className={css({
                marginTop: theme.space.xs,
                paddingLeft: theme.space.md,
              })}
            >
              {startErrorMessage && (
                <li id="start-error" aria-live="polite">
                  {startErrorMessage}
                </li>
              )}
              {endErrorMessage && (
                <li id="end-error" aria-live="polite">
                  {endErrorMessage}
                </li>
              )}
            </ul>
          </div>
        </HvGrid>
      </HvGrid>
    );
  },
};
