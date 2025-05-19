import type { Meta, StoryObj } from "@storybook/react";
import {
  HvQueryBuilder,
  HvQueryBuilderProps,
} from "@hitachivantara/uikit-react-core";

import { CustomRenderers as CustomRenderersStory } from "./stories/CustomRenderers";
import { InitialQuery as InitialQueryStory } from "./stories/InitialQuery";
import { Main as MainStory } from "./stories/Main";
import { ReadOnly as ReadOnlyStory } from "./stories/ReadOnly";
import { setupChromatic } from ".storybook/setupChromatic";

const meta: Meta<typeof HvQueryBuilder> = {
  title: "Components/Query Builder",
  component: HvQueryBuilder,
};
export default meta;

export const Main: StoryObj<HvQueryBuilderProps> = {
  args: { disableConfirmation: false },
  argTypes: {
    classes: { control: { disable: true } },
    attributes: { control: { disable: true } },
    combinators: { control: { disable: true } },
    labels: { control: { disable: true } },
    onChange: { control: { disable: true } },
    renderers: { control: { disable: true } },
    operators: { control: { disable: true } },
    query: { control: { disable: true } },
  },
  parameters: {
    docs: {},
    ...setupChromatic(),
  },
  render: (args) => {
    return <MainStory {...args} />;
  },
};

export const InitialQuery: StoryObj<HvQueryBuilderProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "Query builder that parses the query to Mongo. You can also control whether you want the confirmation dialogs, which are shown before removing rules and rule groups, to appear or not by clicking on the button at the top of the sample. This button controls the query builder's `disableConfirmation` property.",
      },
    },
    ...setupChromatic(),
  },
  render: () => <InitialQueryStory />,
};

export const ReadOnly: StoryObj<HvQueryBuilderProps> = {
  parameters: {
    docs: {
      description: {
        story: "Query builder in read only mode.",
      },
    },
    ...setupChromatic(),
  },
  render: () => <ReadOnlyStory />,
};

export const CustomRenderers: StoryObj<HvQueryBuilderProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "If the default attribute types (`boolean`, `numeric`, `text`, `textarea`, and `dateandtime`) are not enough to cover your use case, custom ones can be used. For these custom types, if no corresponding renderer is provided through the `renderers` property, a text input will be rendered. The `renderers` property can also be used to customize the value renderers for specific operators of an attribute type.",
      },
    },
  },
  render: () => <CustomRenderersStory />,
};
