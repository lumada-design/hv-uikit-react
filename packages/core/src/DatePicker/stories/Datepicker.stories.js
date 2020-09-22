import React, { useState } from "react";
import moment from "moment";
import { HvButton, HvList, HvDatePicker, HvInput } from "../..";
import { makeUTCDate } from "../../Calendar/utils";

export default {
  title: "Forms/Date Picker",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvDatePicker } from '@hv/uikit-react-core/dist'",
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

export const Main = () => <HvDatePicker id="DatePicker" />;

Main.story = {
  parameters: {
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
  },
};

export const DefaultValue = () => (
  <HvDatePicker id="DatePicker" value={makeUTCDate(2020, 10, 10)} />
);

DefaultValue.story = {
  parameters: {
    docs: {
      storyDescription: "Datepicker sample with a value already set.",
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
  },
};

export const Localized = () => {
  const [locale, setLocale] = useState("pt-PT");

  return (
    <>
      <div style={{ marginBottom: "20px", width: "150px" }}>
        <HvInput
          labels={{ inputLabel: "Locale" }}
          type="text"
          value={locale}
          style={{ marginBottom: "20px", width: "150px" }}
          onChange={(value) => {
            const chosenLocale = value.currentTarget.value;
            if (chosenLocale.match(/[a-z]{2}-[A-Z]{2}/g)) {
              setLocale(chosenLocale);
            }
          }}
        />
      </div>
      <HvDatePicker locale={locale} id="DatePicker" />
    </>
  );
};

Localized.story = {
  parameters: {
    docs: {
      storyDescription: "Datepicker sample with values localized.",
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
  },
};

export const WithActions = () => (
  <HvDatePicker showActions value={makeUTCDate(1970, 2, 2)} id="DatePicker" />
);

WithActions.story = {
  parameters: {
    docs: {
      storyDescription: "Datepicker with action buttons at the bottom.",
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
  },
};

export const WithCustomLabels = () => (
  <HvDatePicker
    showActions
    labels={{
      title: "This is the title for the date picker",
      placeholder: "Custom placeholder",
    }}
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
        // TODO: BUG Input has no label
        // https://github.com/lumada-design/hv-uikit-react/issues/1692
        "label",
        "WCAG2AA.Principle4.Guideline4_1.4_1_2.H91.InputText.Name",
        "WCAG2AA.Principle1.Guideline1_3.1_3_1.F68",
        // TODO: BUG Custom label isn't a real label
        // https://github.com/lumada-design/hv-uikit-react/issues/1692
        "button-name",
        "WCAG2AA.Principle4.Guideline4_1.4_1_2.H91.Div.Name",
      ],
    },
  },
};

export const RangeMode = () => (
  <HvDatePicker
    rangeMode
    labels={{
      applyLabel: "Apply",
      cancelLabel: "Cancel",
      placeholder: "Select a range",
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
        // TODO: BUG Input has no label
        // https://github.com/lumada-design/hv-uikit-react/issues/1692
        "label",
        "WCAG2AA.Principle4.Guideline4_1.4_1_2.H91.InputText.Name",
        "WCAG2AA.Principle1.Guideline1_3.1_3_1.F68",
      ],
    },
  },
};

export const RangeWithValues = () => {
  const labels = {
    applyLabel: "Apply",
    cancelLabel: "Cancel",
    placeholder: "Select a range",
    rangeStart: "Start date",
    rangeEnd: "End date",
  };

  return (
    <HvDatePicker
      id="DatePicker"
      labels={labels}
      rangeMode
      startValue={makeUTCDate(2019, 7, 5)}
      endValue={makeUTCDate(2019, 7, 10)}
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
        // TODO: BUG Input has no label
        // https://github.com/lumada-design/hv-uikit-react/issues/1692
        "label",
        "WCAG2AA.Principle4.Guideline4_1.4_1_2.H91.InputText.Name",
        "WCAG2AA.Principle1.Guideline1_3.1_3_1.F68",
      ],
    },
  },
};

export const NearInvalid = () => <HvDatePicker value={makeUTCDate(1000, 1, 1)} />;

NearInvalid.story = {
  parameters: {
    docs: {
      storyDescription: "Datepicker in range mode with invalid near invalid dates.",
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
  },
};

export const WithValueChange = () => {
  const [date, setDate] = useState(makeUTCDate(2020, 1, 1));

  const addDay = () => setDate(moment(date).add(1, "day").toDate());

  return (
    <>
      <HvButton id="AddButton" onClick={addDay}>
        Add a day
      </HvButton>
      <p />
      <HvDatePicker id="DatePicker" value={date} onChange={(d) => setDate(d)} />
    </>
  );
};

WithValueChange.story = {
  parameters: {
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
  },
};

export const WithSelectionList = () => {
  const [startDate, setStartDate] = useState(makeUTCDate(2020, 9, 5));
  const [endDate, setEndDate] = useState(makeUTCDate(2020, 9, 10));

  const handleClick = (evt, item) => {
    console.log(item);
    const today = new Date();
    const [d, m, y] = [today.getUTCDate(), today.getUTCMonth() + 1, today.getUTCFullYear()];

    switch (item.label) {
      case "Last 7 days": {
        setStartDate(makeUTCDate(y, m, d - 7));
        setEndDate(makeUTCDate(y, m, d));
        break;
      }
      case "This month": {
        setStartDate(makeUTCDate(y, m, 1));
        setEndDate(makeUTCDate(y, m, d));
        break;
      }
      case "This year": {
        setStartDate(makeUTCDate(y, 1, 1));
        setEndDate(makeUTCDate(y, m, d));
        break;
      }
      default:
        break;
    }
  };

  const options = (
    <HvList
      style={{ padding: "40px 20px", minWidth: 160 }}
      selectable={false}
      values={[
        { label: "Today", disabled: true },
        { label: "Yesterday", disabled: true },
        { label: "Last 7 days" },
        { label: "This month" },
        { label: "This year" },
      ]}
      onClick={handleClick}
    />
  );

  return (
    <HvDatePicker
      id="DatePicker"
      startAdornment={options}
      rangeMode
      startValue={startDate}
      endValue={endDate}
    />
  );
};
