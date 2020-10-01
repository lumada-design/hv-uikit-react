// Copied from https://github.com/storybookjs/storybook/blob/v5.3.18/addons/docs/src/blocks/Stories.tsx
// just to enable the toolbar (withToolbar)

import React, { useContext } from "react";
import { DocsContext, DocsStory, Heading } from "@storybook/addon-docs/blocks";

const getDocsStories = (context) => {
  const { storyStore, selectedKind } = context;

  if (!storyStore) {
    return [];
  }

  return storyStore
    .getStoriesForKind(selectedKind)
    .filter((s) => !(s.parameters && s.parameters.docs && s.parameters.docs.disable));
};

export const Stories = ({ slot, title }) => {
  const context = useContext(DocsContext);
  const componentStories = getDocsStories(context);

  const stories = slot
    ? slot(componentStories, context)
    : componentStories && componentStories.slice(1);
  if (!stories || stories.length === 0) {
    return null;
  }
  return (
    <>
      <Heading>{title}</Heading>
      {stories.map(
        (story) => story && <DocsStory key={story.id} {...story} expanded withToolbar />
      )}
    </>
  );
};

Stories.defaultProps = {
  title: "Stories",
};
