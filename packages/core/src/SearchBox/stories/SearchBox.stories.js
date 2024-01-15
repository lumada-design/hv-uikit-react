import React from "react";
import { HvSearchBox } from "../..";

export default {
  title: "Components/Searchbox",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvSearchBox } from "@hitachivantara/uikit-react-core";',
  },
  component: HvSearchBox,
};

export const Main = () => {
  const suggestionHandler = (value) => {
    const random = Math.random().toString(36).substring(7);
    if (typeof value === "string" && value !== "") {
      return [
        {
          id: "2",
          label: `${value} first suggestion`,
        },
        {
          id: "3",
          label: `${value} second suggestion`,
        },
        {
          id: "4",
          label: `${random} second suggestion`,
        },
      ];
    }
    return null;
  };

  return (
    <>
      <HvSearchBox
        suggestionListCallback={suggestionHandler}
        suggestionSelectedCallback={(item) => console.log(`${item.label} selected`)}
        onChange={(event, value) => {
          console.log(`${value} submitted`);
          return value;
        }}
      />
    </>
  );
};

Main.story = {
  decorators: [(storyFn) => <div style={{ height: "160px" }}>{storyFn()}</div>],
};

export const Disabled = () => {
  const suggestionHandler = (value) => {
    const random = Math.random().toString(36).substring(7);
    if (typeof value === "string" && value !== "") {
      return [
        {
          id: "2",
          label: `${value} first suggestion`,
        },
        {
          id: "3",
          label: `${value} second suggestion`,
        },
        {
          id: "4",
          label: `${random} second suggestion`,
        },
      ];
    }
    return null;
  };

  return (
    <HvSearchBox
      suggestionListCallback={suggestionHandler}
      suggestionSelectedCallback={(item) => alert(`${item.label} selected`)}
      onSubmit={(event, value) => alert(`${value} submitted`)}
      disabled
    />
  );
};

Disabled.story = {
  parameters: {
    docs: {
      storyDescription: "Searchbox sample that does not use the suggestion box.",
    },
  },
};

export const WithoutSuggestion = () => {
  return <HvSearchBox onSubmit={(event, value) => console.log(`${value} submitted`)} />;
};

WithoutSuggestion.story = {
  parameters: {
    docs: {
      storyDescription: "Searchbox sample that does not use the suggestion box.",
    },
  },
};
