import React, { useState } from "react";
import { HvButton, HvListContainer, HvListItem, HvDatePicker, HvRadioGroup, HvRadio } from "../..";

import "dayjs/locale/pt";
import "dayjs/locale/en";
import "dayjs/locale/fr";

export default {
  title: "Forms/Date Picker",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvDatePicker } from '@hv/uikit-react-core/dist'",
    maturityStatus: "stable",
    dsVersion: "3.2.1",
  },
  component: HvDatePicker,
  decorators: [
    (Story) => (
      <div style={{ height: 600, padding: 10 }}>
        <Story />
      </div>
    ),
  ],
};

export const Main = () => (
  <HvDatePicker id="DatePicker" placeholder="Select date" aria-label="Date" />
);

Main.story = {
  parameters: {
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

export const DefaultValue = () => (
  <HvDatePicker
    id="DatePicker"
    aria-label="Date"
    placeholder="Select date"
    value={new Date(2020, 9, 10)}
  />
);

DefaultValue.story = {
  parameters: {
    docs: {
      storyDescription: "Datepicker sample with a value already set.",
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

export const Localized = () => {
  // Locales must be imported beforehand:
  // import "dayjs/locale/pt";
  const initialLocale = "pt";
  const [locale, setLocale] = useState(initialLocale);

  return (
    <>
      <div style={{ marginBottom: "20px", width: "150px" }}>
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
      <HvDatePicker locale={locale} id="DatePicker" placeholder="Select date" aria-label="Date" />
    </>
  );
};

Localized.story = {
  parameters: {
    docs: {
      storyDescription:
        "Datepicker sample with values localized. Locales should be loaded by the user.",
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

export const WithActions = () => (
  <HvDatePicker
    showActions
    value={new Date(1970, 1, 2)}
    id="DatePicker"
    placeholder="Select date"
    aria-label="Date"
  />
);

WithActions.story = {
  parameters: {
    docs: {
      storyDescription: "Datepicker with action buttons at the bottom.",
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

export const WithCustomLabels = () => (
  <HvDatePicker
    aria-label="Date"
    showActions
    label="This is the title for the date picker"
    placeholder="Custom placeholder"
  />
);

WithCustomLabels.story = {
  parameters: {
    docs: {
      storyDescription: "Datepicker with actions buttons at the bottom that have custom labels.",
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

RangeMode.story = {
  parameters: {
    docs: {
      storyDescription: "Datepicker in range mode allowing the selection of more than one value.",
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

RangeModeWithNoValues.story = {
  parameters: {
    docs: {
      storyDescription: "Datepicker in range mode allowing the selection of more than one value.",
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

RangeWithValues.story = {
  parameters: {
    docs: {
      storyDescription: "Datepicker in range mode with values already set.",
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

export const NearInvalid = () => (
  <HvDatePicker aria-label="Date" placeholder="Select date" value={new Date(1000, 0, 1)} />
);

NearInvalid.story = {
  parameters: {
    docs: {
      storyDescription: "Datepicker in range mode with invalid near invalid dates.",
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

WithValueChange.story = {
  parameters: {
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

export const Disabled = () => (
  <HvDatePicker
    id="DatePicker"
    placeholder="Select date"
    disabled
    aria-label="Disabled date picker"
  />
);

Disabled.story = {
  parameters: {
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
