import { Meta, StoryObj } from "@storybook/react";
import {
  HvQueryBuilder,
  HvQueryBuilderProps,
} from "@hitachivantara/uikit-react-core";

import { Controlled as ControlledStory } from "./Controlled";
import ControlledRaw from "./Controlled?raw";
import { CustomRenderers as CustomRenderersStory } from "./CustomRenderers";
import CustomRenderersRaw from "./CustomRenderers?raw";
import { InitialQuery as InitialQueryStory } from "./InitialQuery";
import InitialQueryRaw from "./InitialQuery?raw";
import { Main as MainStory } from "./Main";
import MainRaw from "./Main?raw";
import { ReadOnly as ReadOnlyStory } from "./ReadOnly";
import ReadOnlyRaw from "./ReadOnly?raw";

const meta: Meta<typeof HvQueryBuilder> = {
  title: "Widgets/Query Builder",
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
    docs: {
      source: {
        code: MainRaw,
      },
    },
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
      source: {
        code: InitialQueryRaw,
      },
    },
  },
  render: () => <InitialQueryStory />,
};

export const ReadOnly: StoryObj<HvQueryBuilderProps> = {
  parameters: {
    docs: {
      description: {
        story: "Query builder in read only mode.",
      },
      source: {
        code: ReadOnlyRaw,
      },
    },
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
      source: {
        code: CustomRenderersRaw,
      },
    },
  },
  render: () => <CustomRenderersStory />,
};

export const Controlled: StoryObj<HvQueryBuilderProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "The query builder state can be controlled using the `value` and `onChange` properties.",
      },
      source: {
        code: ControlledRaw,
      },
    },
  },
  render: () => <ControlledStory />,
};
