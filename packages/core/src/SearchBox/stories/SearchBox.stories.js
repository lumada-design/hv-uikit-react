import React from "react";
import { HvSearchBox } from "../..";

export default {
  title: "Components/Searchbox",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvSearchBox } from '@hv/uikit-react-core/dist'"
  },
  component: HvSearchBox
};

export const Main = () => {
  const suggestionHandler = value => {
    const random = Math.random()
      .toString(36)
      .substring(7);
    if (typeof value === "string" && value !== "") {
      return [
        {
          id: "2",
          label: `${value} first suggestion`
        },
        {
          id: "3",
          label: `${value} second suggestion`
        },
        {
          id: "4",
          label: `${random} second suggestion`
        }
      ];
    }
    return null;
  };

  return (
    <>
      <HvSearchBox
        suggestionListCallback={suggestionHandler}
        suggestionSelectedCallback={item => console.log(`${item.label} selected`)}
        onChange={value => {
          console.log(`${value} submitted`);
          return value;
        }}
      />
    </>
  );
};

export const Disabled = () => {
  const suggestionHandler = value => {
    const random = Math.random()
      .toString(36)
      .substring(7);
    if (typeof value === "string" && value !== "") {
      return [
        {
          id: "2",
          label: `${value} first suggestion`
        },
        {
          id: "3",
          label: `${value} second suggestion`
        },
        {
          id: "4",
          label: `${random} second suggestion`
        }
      ];
    }
    return null;
  };

  return (
    <HvSearchBox
      suggestionListCallback={suggestionHandler}
      suggestionSelectedCallback={item => alert(`${item.label} selected`)}
      onSubmit={value => alert(`${value} submitted`)}
      disabled
    />
  );
};

Disabled.story = {
  parameters: {
    docs: {
      storyDescription: "Searchbox sample that does not use the suggestion box."
    }
  }
};

export const WithoutSuggestion = () => {
  return <HvSearchBox onSubmit={value => console.log(`${value} submitted`)} />;
};

WithoutSuggestion.story = {
  parameters: {
    docs: {
      storyDescription: "Searchbox sample that does not use the suggestion box."
    }
  }
};
