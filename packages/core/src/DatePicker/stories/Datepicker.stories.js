import React, { useState } from "react";
import { useTheme } from "@material-ui/core";
import {
  HvButton,
  HvListContainer,
  HvListItem,
  HvDatePicker,
  HvRadioGroup,
  HvRadio,
  HvGrid,
} from "../..";

import "dayjs/locale/pt";
import "dayjs/locale/en";
import "dayjs/locale/fr";

export default {
  title: "Forms/Date Picker",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvDatePicker } from "@hv/uikit-react-core"',
    maturityStatus: "stable",
    dsVersion: "3.4.0",
  },
  component: HvDatePicker,
};

const defaultDecorator = (Story) => (
  <div style={{ width: 340, height: 600, padding: 10 }}>
    <Story />
  </div>
);

export const Main = () => (
  <HvDatePicker id="DatePicker" placeholder="Select date" aria-label="Date" />
);

Main.parameters = {
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

Main.decorators = [defaultDecorator];

export const DefaultValue = () => (
  <HvDatePicker
    id="DatePicker"
    aria-label="Date"
    placeholder="Select date"
    value={new Date(2020, 9, 10)}
  />
);

DefaultValue.parameters = {
  docs: {
    description: { story: "Datepicker sample with a value already set." },
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

DefaultValue.decorators = [defaultDecorator];

export const Localized = () => {
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
};

Localized.parameters = {
  docs: {
    description: { story: "Datepicker sample with values localized." },
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

Localized.decorators = [defaultDecorator];

export const WithActions = () => (
  <HvDatePicker
    showActions
    value={new Date(1970, 1, 2)}
    id="DatePicker"
    placeholder="Select date"
    aria-label="Date"
  />
);

WithActions.parameters = {
  docs: {
    description: { story: "Datepicker with action buttons at the bottom." },
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

WithActions.decorators = [defaultDecorator];

export const WithCustomLabels = () => (
  <HvDatePicker
    aria-label="Date"
    showActions
    label="This is the title for the date picker"
    placeholder="Custom placeholder"
  />
);

WithCustomLabels.parameters = {
  docs: {
    description: {
      story: "Datepicker with actions buttons at the bottom that have custom labels.",
    },
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

WithCustomLabels.decorators = [defaultDecorator];

export const RangeMode = () => (
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

RangeMode.parameters = {
  docs: {
    description: {
      story: "Datepicker in range mode allowing the selection of more than one value.",
    },
  },
  pa11y: {
    ignore: [
      "region",
      // TODO: BUG Input has no label
      // https://github.com/lumada-design/hv-uikit-react/issues/1692
      "label",
      "WCAG2AA.Principle4.Guideline4_1.4_1_2.H91.InputText.Name",
      "WCAG2AA.Principle1.Guideline1_3.1_3_1.F68",
    ],
  },
};

RangeMode.decorators = [defaultDecorator];

export const RangeModeWithNoValues = () => (
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

RangeModeWithNoValues.parameters = {
  docs: {
    description: {
      story: "Datepicker in range mode allowing the selection of more than one value.",
    },
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

RangeModeWithNoValues.decorators = [defaultDecorator];

export const RangeWithValues = () => {
  const labels = {
    applyLabel: "Apply",
    cancelLabel: "Cancel",
  };

  return (
    <HvDatePicker
      id="DatePicker"
      aria-label="Date"
      placeholder="Select a range"
      labels={labels}
      rangeMode
      startValue={new Date(2019, 6, 5)}
      endValue={new Date(2019, 6, 10)}
    />
  );
};

RangeWithValues.parameters = {
  docs: {
    description: { story: "Datepicker in range mode with values already set." },
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

RangeWithValues.decorators = [defaultDecorator];

export const NearInvalid = () => (
  <HvDatePicker aria-label="Date" placeholder="Select date" value={new Date(1000, 0, 1)} />
);

NearInvalid.parameters = {
  docs: {
    description: { story: "Datepicker in range mode with invalid near invalid dates." },
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

NearInvalid.decorators = [defaultDecorator];

export const WithValueChange = () => {
  const [date, setDate] = useState(new Date(2020, 0, 1));

  const addDay = () => setDate(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1));

  return (
    <>
      <HvButton id="AddButton" onClick={addDay}>
        Add a day
      </HvButton>
      <p />
      <HvDatePicker
        id="DatePicker"
        aria-label="Date"
        placeholder="Select date"
        value={date}
        onChange={(d) => setDate(d)}
      />
    </>
  );
};

WithValueChange.parameters = {
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

WithValueChange.decorators = [defaultDecorator];

export const WithSelectionList = () => {
  const [startDate, setStartDate] = useState(new Date(2020, 8, 5));
  const [endDate, setEndDate] = useState(new Date(2020, 8, 10));

  const handleClick = (item) => {
    console.log(item);
    const today = new Date();
    const [d, m, y] = [today.getDate(), today.getMonth(), today.getFullYear()];

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
    <HvListContainer role="menu" style={{ padding: "40px 20px", minWidth: 160 }} interactive>
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
      placeholder="Select date"
    />
  );
};

WithSelectionList.decorators = [defaultDecorator];

export const Disabled = () => (
  <HvDatePicker
    id="DatePicker"
    placeholder="Can't select a date now"
    disabled
    aria-label="Disabled date picker"
  />
);

Disabled.parameters = {
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

export const Invalid = () => (
  <HvDatePicker
    placeholder="Select date"
    id="DatePicker"
    status="invalid"
    statusMessage="This date picker is always invalid"
    aria-label="Invalid date picker"
  />
);

Invalid.parameters = {
  docs: {
    description: {
      story:
        "Datepicker sample with invalid status. It is a Form Element and it inherits all Form capabilities.",
    },
  },
  pa11y: {
    ignore: [
      "region",
      // placeholder text is failing contrast test
      // TODO: check if that's acceptable
      "WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail",
      "color-contrast",
      // aria-errormessage value is being reported as invalid because axe-core forces
      // the referenced error element to have aria-live="assertive", when the spec does not
      // https://github.com/dequelabs/axe-core/pull/2590
      "aria-valid-attr-value",
    ],
  },
};

Invalid.decorators = [defaultDecorator];

export const ExternalErrorMessage = () => {
  const theme = useTheme();

  const [deathValidationState, setDeathValidationState] = useState("invalid");

  const [birthErrorMessage, setBirthErrorMessage] = useState(null);
  const [deathErrorMessage, setDeathErrorMessage] = useState(
    "The death day will always be invalid."
  );

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
                setBirthErrorMessage(null);
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
                setDeathErrorMessage("The death day will always be invalid. I know you're alive!");
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
          {birthErrorMessage && <li id="birth-error">{birthErrorMessage}</li>}
          {deathErrorMessage && <li id="death-error">{deathErrorMessage}</li>}
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
      // placeholder text is failing contrast test
      // TODO: check if that's acceptable
      "WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail",
      "color-contrast",
      // aria-errormessage value is being reported as invalid because axe-core forces
      // the referenced error element to have aria-live="assertive", when the spec does not
      // https://github.com/dequelabs/axe-core/pull/2590
      "aria-valid-attr-value",
    ],
  },
};

ExternalErrorMessage.decorators = [
  (Story) => (
    <div style={{ height: 650 }}>
      <Story />
    </div>
  ),
];
