import { Meta, StoryObj } from "@storybook/react";
import {
  HvButton,
  HvMultiButton,
  HvMultiButtonProps,
  HvSimpleGrid,
} from "@hitachivantara/uikit-react-core";
import { LocationPin } from "@hitachivantara/uikit-react-icons";

import { Disabled as DisabledStory } from "./Disabled";
import DisabledRaw from "./Disabled?raw";
import { DisabledItem as DisabledItemStory } from "./DisabledItem";
import DisabledItemRaw from "./DisabledItem?raw";
import { EnforcedSelection as EnforcedSelectionStory } from "./EnforcedSelection";
import EnforcedSelectionRaw from "./EnforcedSelection?raw";
import { Main as MainStory } from "./Main";
import MainRaw from "./Main?raw";
import { MaximumSelection as MaximumSelectionStory } from "./MaximumSelection";
import MaximumSelectionRaw from "./MaximumSelection?raw";
import { MinimumSelection as MinimumSelectionStory } from "./MinimumSelection";
import MinimumSelectionRaw from "./MinimumSelection?raw";
import { MultipleSelection as MultipleSelectionStory } from "./MultipleSelection";
import MultipleSelectionRaw from "./MultipleSelection?raw";
import { OnlyIcons as OnlyIconsStory } from "./OnlyIcons";
import OnlyIconsRaw from "./OnlyIcons?raw";
import { OnlyLabels as OnlyLabelsStory } from "./OnlyLabels";
import OnlyLabelsRaw from "./OnlyLabels?raw";
import { SplitButton as SplitButtonStory } from "./SplitButton";
import SplitButtonRaw from "./SplitButton?raw";
import { VerticalOrientation as VerticalOrientationStory } from "./VerticalOrientation";
import VerticalOrientationRaw from "./VerticalOrientation?raw";

const meta: Meta<typeof HvMultiButton> = {
  title: "Components/Multi Button",
  component: HvMultiButton,
};
export default meta;

export const Main: StoryObj<HvMultiButtonProps> = {
  args: {
    disabled: false,
    vertical: false,
    size: undefined,
  },
  argTypes: {
    classes: { control: { disable: true } },
    variant: { control: { disable: true } },
  },
  parameters: {
    docs: {
      source: {
        code: MainRaw,
      },
    },
  },
  render: (args) => <MainStory {...args} />,
};

export const OnlyLabels: StoryObj<HvMultiButtonProps> = {
  parameters: {
    docs: {
      source: {
        code: OnlyLabelsRaw,
      },
    },
  },
  render: () => <OnlyLabelsStory />,
};

export const OnlyIcons: StoryObj<HvMultiButtonProps> = {
  parameters: {
    docs: {
      source: {
        code: OnlyIconsRaw,
      },
    },
  },
  render: () => <OnlyIconsStory />,
};

export const Disabled: StoryObj<HvMultiButtonProps> = {
  parameters: {
    docs: {
      source: {
        code: DisabledRaw,
      },
    },
  },
  render: () => <DisabledStory />,
};

export const DisabledItem: StoryObj<HvMultiButtonProps> = {
  parameters: {
    docs: {
      source: {
        code: DisabledItemRaw,
      },
    },
  },
  render: () => <DisabledItemStory />,
};

export const MultipleSelection: StoryObj<HvMultiButtonProps> = {
  parameters: {
    docs: {
      source: {
        code: MultipleSelectionRaw,
      },
    },
  },
  render: () => <MultipleSelectionStory />,
};

export const EnforcedSelection: StoryObj<HvMultiButtonProps> = {
  parameters: {
    docs: {
      description: {
        story:
          'HvMultiButton element set as enforced cannot be toggled - In this case **"Location 1" cannot be toggled on/off**.',
      },
      source: {
        code: EnforcedSelectionRaw,
      },
    },
  },
  render: () => <EnforcedSelectionStory />,
};

export const MinimumSelection: StoryObj<HvMultiButtonProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "Specify a number of minimum elements that must be active - in this case a **minimum of 2**.",
      },
      source: {
        code: MinimumSelectionRaw,
      },
    },
  },
  render: () => <MinimumSelectionStory />,
};

export const MaximumSelection: StoryObj<HvMultiButtonProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "Specify a number of maximum elements that can be selected - in this case a **maximum of 2**.",
      },
      source: {
        code: MaximumSelectionRaw,
      },
    },
  },
  render: () => <MaximumSelectionStory />,
};

export const VerticalOrientation: StoryObj<HvMultiButtonProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "MultiButton combinations with **vertical orientation** and **multiple selection**.",
      },
      source: {
        code: VerticalOrientationRaw,
      },
    },
  },
  render: () => <VerticalOrientationStory />,
};

export const SplitButton: StoryObj<HvMultiButtonProps> = {
  parameters: {
    docs: {
      description: {
        story: "MultiButton component used to create a **Split Button**.",
      },
      source: {
        code: SplitButtonRaw,
      },
    },
  },
  render: () => <SplitButtonStory />,
};

export const Test: StoryObj = {
  parameters: {
    docs: { disable: true },
  },
  render: () => (
    <>
      <SplitButtonStory />
      <br />
      <HvSimpleGrid
        cols={3}
        style={{ alignItems: "start", justifyContent: "start" }}
      >
        <div className="grid gap-xs">
          <HvMultiButton>
            <HvButton>Label 1</HvButton>
            <HvButton>Label 2</HvButton>
            <HvButton>Label 3</HvButton>
          </HvMultiButton>
          <HvMultiButton>
            <HvButton selected>Label 1</HvButton>
            <HvButton selected>Label 2</HvButton>
            <HvButton>Label 3</HvButton>
          </HvMultiButton>
          <HvMultiButton size="sm">
            <HvButton selected>Label 1</HvButton>
            <HvButton disabled>Label 2</HvButton>
            <HvButton>Label 3</HvButton>
          </HvMultiButton>
          <HvMultiButton size="lg">
            <HvButton selected>Label 1</HvButton>
            <HvButton disabled>Label 2</HvButton>
            <HvButton>Label 3</HvButton>
          </HvMultiButton>
        </div>
        <div className="grid gap-xs">
          <HvMultiButton disabled>
            {["Label 1", "Label 2", "Label 3"].map((button) => (
              <HvButton key={button}>{button}</HvButton>
            ))}
          </HvMultiButton>
          <HvMultiButton disabled>
            {["Label 1", "Label 2", "Label 3"].map((button, i) => (
              <HvButton key={button} selected={i === 2}>
                {button}
              </HvButton>
            ))}
          </HvMultiButton>
          <HvMultiButton>
            {["Label 1", "Label 2", "Label 3", "Label 4"].map((button, i) => (
              <HvButton
                key={button}
                selected={i === 0}
                disabled={i === 2}
                endIcon={<LocationPin />}
              >
                {button}
              </HvButton>
            ))}
          </HvMultiButton>
          <div className="flex flex-1 [&>*]:flex-1 gap-xs">
            <HvMultiButton style={{ width: "fit-content" }}>
              {["Label 1", "Label 2", "Label 3", "Label 4"].map((name, i) => (
                <HvButton
                  key={name}
                  icon
                  aria-label={name}
                  selected={i === 1}
                  disabled={i === 2}
                >
                  <LocationPin />
                </HvButton>
              ))}
            </HvMultiButton>
            <HvMultiButton>
              <HvButton>Label 1</HvButton>
            </HvMultiButton>
            <HvMultiButton>
              <HvButton selected>Label 1</HvButton>
            </HvMultiButton>
            <HvMultiButton>
              <HvButton disabled>Label 1</HvButton>
            </HvMultiButton>
          </div>
        </div>
        <div className="flex gap-xs items-start">
          <HvMultiButton vertical style={{ width: "120px" }}>
            {["Label 1", "Label 2", "Label 3", "Label 4"].map((button) => (
              <HvButton key={button}>{button}</HvButton>
            ))}
          </HvMultiButton>
          <HvMultiButton vertical style={{ width: "120px" }}>
            {["Label 1", "Label 2", "Label 3", "Label 4"].map((button, i) => (
              <HvButton
                key={button}
                selected={i === 0 || i === 2}
                startIcon={<LocationPin />}
              >
                {button}
              </HvButton>
            ))}
          </HvMultiButton>
          <HvMultiButton vertical style={{ width: "fit-content" }}>
            {["Label 1", "Label 2", "Label 3", "Label 4"].map((name, i) => (
              <HvButton
                key={name}
                icon
                aria-label={name}
                selected={i === 1 || i === 2}
              >
                <LocationPin />
              </HvButton>
            ))}
          </HvMultiButton>
        </div>
      </HvSimpleGrid>
    </>
  ),
};
