import React, { useState } from "react";
import moment from "moment";
import { HvButton, HvDatePicker, HvInput } from "../..";

export default {
  title: "Components/Date Picker",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvDatePicker } from "@hitachivantara/uikit-react-core";',
  },
  component: HvDatePicker,
  decorators: [(storyFn) => <div style={{ height: "600px" }}>{storyFn()}</div>],
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

export const DefaultValue = () => <HvDatePicker id="DatePicker" value="1970-01-01" />;

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
      <HvInput
        labels={{ inputLabel: "Locale" }}
        type="text"
        value={locale}
        style={{ marginBottom: "20px", width: "150px" }}
        onChange={(value) => setLocale(value)}
      />
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

export const WithActions = () => <HvDatePicker showActions value="1970-01-02" id="DatePicker" />;

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
      startValue="2019-06-05"
      endValue="2019-06-10"
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

export const NearInvalid = () => <HvDatePicker value="1000-01-01" />;

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
  const Example = () => {
    const [date, setDate] = useState("2020-01-01");

    const addDay = () => setDate(moment(date).add(1, "day").format("YYYY-MM-DD"));

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

  return <Example />;
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
