import React from "react";
import { HvSearchBox } from "../../..";

export default {
  title: "Patterns/Search Box",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvSearchBox } from '@hv/uikit-react-core/dist'"
  },
  component: HvSearchBox,
  decorators: [
    Story => (
      <div style={{ height: 100, width: 360 }}>
        <Story />
      </div>
    )
  ]
};

export const Main = () => {
  const suggestionHandler = value => [
    { id: "2", label: `${value} first suggestion` },
    { id: "3", label: `${value} second suggestion` }
  ];

  return (
    <HvSearchBox
      suggestionListCallback={suggestionHandler}
      suggestionSelectedCallback={item => console.log(`${item.label} selected`)}
      onChange={(event, value) => {
        console.log(`value: ${value}`);
      }}
    />
  );
};

export const Disabled = () => <HvSearchBox disabled />;

export const WithoutSuggestion = () => {
  return <HvSearchBox onSubmit={(event, value) => console.log(`${value} submitted`)} />;
};

WithoutSuggestion.story = {
  parameters: {
    docs: {
      storyDescription: "Searchbox sample that does not use the suggestion box."
    }
  }
};
