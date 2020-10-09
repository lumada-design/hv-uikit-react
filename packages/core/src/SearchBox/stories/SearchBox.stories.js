import React from "react";
import { HvSearchBox } from "../../..";

export default {
  title: "Widgets/Search Box",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvSearchBox } from '@hv/uikit-react-core/dist'",
    maturityStatus: "stable",
    dsVersion: "3.2.0",
  },
  component: HvSearchBox,
  decorators: [
    (Story) => (
      <div style={{ height: 100, width: 360 }}>
        <Story />
      </div>
    ),
  ],
};

export const Main = () => {
  const suggestionHandler = (value) => [
    { id: "2", label: `${value} first suggestion` },
    { id: "3", label: `${value} second suggestion` },
  ];

  return (
    <HvSearchBox
      inputProps={{ "aria-label": "Search" }}
      suggestionListCallback={suggestionHandler}
      suggestionSelectedCallback={(item) => console.log(`${item.label} selected`)}
      onChange={console.log}
    />
  );
};

export const Disabled = () => <HvSearchBox disabled inputProps={{ "aria-label": "Search" }} />;

export const WithoutSuggestion = () => {
  return <HvSearchBox inputProps={{ "aria-label": "Search" }} onSubmit={console.log} />;
};

WithoutSuggestion.story = {
  parameters: {
    docs: {
      storyDescription: "Searchbox sample that does not use the suggestion box.",
    },
  },
};
