import { css } from "@emotion/css";
import { Decorator, Meta, StoryObj } from "@storybook/react";
import { HvDropdown, HvDropdownProps } from "@hitachivantara/uikit-react-core";
import { userEvent, within } from "@storybook/testing-library";

import { Empty as EmptyStory } from "./Empty";
import EmptyRaw from "./Empty?raw";
import { ExternalErrorMessage as ExternalErrorMessageStory } from "./ExternalErrorMessage";
import ExternalErrorMessageRaw from "./ExternalErrorMessage?raw";
import { Main as MainStory } from "./Main";
import MainRaw from "./Main?raw";
import { MultiSelection as MultiSelectionStory } from "./MultiSelection";
import MultiSelectionRaw from "./MultiSelection?raw";
import { SingleSelectionWithSearch as SingleSelectionWithSearchStory } from "./SingleSelectionWithSearch";
import SingleSelectionWithSearchRaw from "./SingleSelectionWithSearch?raw";
import { Variants as VariantsStory } from "./Variants";
import VariantsRaw from "./Variants?raw";
import { Virtualized as VirtualizedStory } from "./Virtualized";
import VirtualizedRaw from "./Virtualized?raw";
import { WithDefinedHeight as WithDefinedHeightStory } from "./WithDefinedHeight";
import WithDefinedHeightRaw from "./WithDefinedHeight?raw";
import { WithIcons as WithIconsStory } from "./WithIcons";
import WithIconsRaw from "./WithIcons?raw";

const widthDecorator: Decorator = (Story) => (
  <div style={{ minHeight: 120, width: 310 }}>{Story()}</div>
);

export default {
  title: "Components/Dropdown",
  component: HvDropdown,
} satisfies Meta<typeof HvDropdown>;

export const Main: StoryObj<HvDropdownProps> = {
  args: {
    multiSelect: true,
    showSearch: true,
    disabled: false,
    readOnly: false,
    required: false,
    defaultExpanded: true,
    notifyChangesOnFirstRender: false,
    hasTooltips: false,
    variableWidth: false,
    singleSelectionToggle: false,
    virtualized: false,
    status: "valid",
  },
  argTypes: {
    classes: { control: { disable: true } },
    label: { control: { disable: true } },
    popperProps: { control: { disable: true } },
  },
  decorators: [
    widthDecorator,
    (Story) => <div style={{ minHeight: 400 }}>{Story()}</div>,
  ],
  parameters: {
    docs: {
      source: {
        code: MainRaw,
      },
    },
    // Enables Chromatic snapshot
    chromatic: { disableSnapshot: false },
  },
  render: (args) => <MainStory {...args} />,
};

export const Variants: StoryObj<HvDropdownProps> = {
  parameters: {
    docs: {
      description: {
        story: "Dropdown in their various form state variants.",
      },
      source: {
        code: VariantsRaw,
      },
    },
    // Enables Chromatic snapshot
    chromatic: { disableSnapshot: false },
  },
  decorators: [
    (Story) => (
      <div
        className={css({
          display: "flex",
          flexFlow: "row wrap",
          gap: 16,
          "& > *": {
            width: 200,
          },
        })}
      >
        {Story()}
      </div>
    ),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const picker = canvas.getByRole("combobox", { name: /required/i });
    await userEvent.click(picker);
  },
  render: () => <VariantsStory />,
};

export const WithIcons: StoryObj<HvDropdownProps> = {
  parameters: {
    docs: {
      description: {
        story: "Single selection Dropdown with icons along with labels",
      },
      source: {
        code: WithIconsRaw,
      },
    },
  },
  decorators: [widthDecorator],
  render: () => <WithIconsStory />,
};

export const Empty: StoryObj<HvDropdownProps> = {
  parameters: {
    docs: {
      description: {
        story: "Dropdown with no values",
      },
      source: {
        code: EmptyRaw,
      },
    },
  },
  decorators: [widthDecorator],
  render: () => <EmptyStory />,
};

export const MultiSelection: StoryObj<HvDropdownProps> = {
  parameters: {
    docs: {
      source: {
        code: MultiSelectionRaw,
      },
    },
  },
  decorators: [widthDecorator],
  render: () => <MultiSelectionStory />,
};

export const SingleSelectionWithSearch: StoryObj<HvDropdownProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "Single selection Dropdown with search and less than 10 elements",
      },
      source: {
        code: SingleSelectionWithSearchRaw,
      },
    },
  },
  decorators: [widthDecorator],
  render: () => <SingleSelectionWithSearchStory />,
};

export const ExternalErrorMessage: StoryObj<HvDropdownProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "A form element can be invalid but render its error message elsewhere. For instance if a business rule error relates to the combination of two or more fields, or if we want to display all the form errors together in a summary section. The [aria-errormessage](https://w3c.github.io/aria/#aria-errormessage) property should reference another element that contains error message text. It can be used when controlling the validation status or when relying on the built-in validations, but the message text computation is reponsability of the app.",
      },
      source: {
        code: ExternalErrorMessageRaw,
      },
    },
  },
  render: () => <ExternalErrorMessageStory />,
};

export const WithDefinedHeight: StoryObj<HvDropdownProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "Dropdown's height can be configured using `height` (or `maxHeight`). Note: only validated in the single selection use-case.",
      },
      source: {
        code: WithDefinedHeightRaw,
      },
    },
  },
  decorators: [widthDecorator],
  render: () => <WithDefinedHeightStory />,
};

export const Virtualized: StoryObj<HvDropdownProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "Experimental Dropdown with virtualized list, which handles performance in lists with a lot of options. Note: only validated in the single selection use-case.",
      },
      source: {
        code: VirtualizedRaw,
      },
    },
  },
  decorators: [widthDecorator],
  render: () => <VirtualizedStory />,
};
