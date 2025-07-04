import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { setupChromatic } from "@hitachivantara/internal";
import {
  HvFlow,
  HvFlowBackground,
  HvFlowControls,
  HvFlowMinimap,
  HvFlowProps,
  HvFlowSidebar,
} from "@hitachivantara/uikit-react-lab";
import { HvVizProvider } from "@hitachivantara/uikit-react-viz";

import { BaseHook as BaseHookStory } from "./BaseHook";
import BaseHookRaw from "./BaseHook?raw";
import { CustomDrop as CustomDropStory } from "./CustomDrop";
import CustomDropRaw from "./CustomDrop?raw";
import { Dynamic as DynamicStory } from "./Dynamic";
import DynamicRaw from "./Dynamic?raw";
import { DynamicHandles as DynamicHandlesStory } from "./DynamicHandles";
import DynamicHandlesRaw from "./DynamicHandles?raw";
import { InitialState as InitialStateStory } from "./InitialState";
import InitialStateRaw from "./InitialState?raw";
import { Main as MainStory } from "./Main";
import MainRaw from "./Main?raw";
import { NoGroups as NoGroupStory } from "./NoGroups";
import NoGroupsRaw from "./NoGroups?raw";
import { SubFlow as SubFlowStory } from "./SubFlow";
import SubFlowRaw from "./SubFlow?raw";
import { Visualizations as VisualizationsStory } from "./Visualizations";
import VisualizationsRaw from "./Visualizations?raw";

const meta: Meta<typeof HvFlow> = {
  title: "Lab/Flow",
  component: HvFlow,
  // @ts-ignore https://github.com/storybookjs/storybook/issues/23170
  subcomponents: {
    HvFlowBackground,
    HvFlowControls,
    HvFlowMinimap,
    HvFlowSidebar,
  } as unknown,
  parameters: {
    a11y: {
      config: {
        rules: [
          { id: "nested-interactive", enabled: false },
          { id: "aria-allowed-attr", enabled: false },
          { id: "aria-prohibited-attr", enabled: false },
          { id: "color-contrast", enabled: false },
        ],
      },
    },
  },
  decorators: [(Story) => <HvVizProvider>{Story()}</HvVizProvider>],
};
export default meta;

export const Main: StoryObj<HvFlowProps> = {
  parameters: {
    docs: {
      source: {
        code: MainRaw,
      },
    },
    ...setupChromatic(["DS5 dawn", "DS5 wicked"]),
  },
  // For visual testing
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: /add node/i });
    await userEvent.click(button);
    const expand = canvas.getAllByRole("button", { name: /expand group/i })[0];
    await userEvent.click(expand);
    await expect(
      canvas.getByRole("searchbox", { name: /search node/i }),
    ).toBeInTheDocument();
  },
  render: () => <MainStory />,
};

export const InitialState: StoryObj<HvFlowProps> = {
  parameters: {
    docs: {
      description: {
        story: "A Flow with an initial state",
      },
      source: {
        code: InitialStateRaw,
      },
    },
    ...setupChromatic(["DS5 dawn", "DS5 wicked"]),
  },
  render: () => <InitialStateStory />,
};

export const Visualizations: StoryObj<HvFlowProps> = {
  parameters: {
    docs: {
      description: {
        story: `The HvFlowNode component can take any content as children. In this sample, we created visualizations based on the JSON output of the first node.
        <br /><br />Please refer to the [code samples](https://github.com/lumada-design/hv-uikit-react/blob/master/packages/lab/src/components/Flow/stories/Visualizations/Visualizations.tsx) in our repository for more details.`,
      },
      source: {
        code: VisualizationsRaw,
      },
    },
  },
  render: () => <VisualizationsStory />,
};

export const DynamicNodes: StoryObj<HvFlowProps> = {
  parameters: {
    docs: {
      source: {
        code: DynamicRaw,
      },
    },
  },
  render: () => <DynamicStory />,
};

export const CustomDrop: StoryObj<HvFlowProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "If necessary, the drop event can be customized through the `onDndDrop` property. This callback is used to override the custom UI Kit drop event. Thus, when defined, you are responsible for adding nodes to the flow. In this sample, the drop event was overridden to show a dialog to configure the node.",
      },
      source: {
        code: CustomDropRaw,
      },
    },
  },
  render: () => <CustomDropStory />,
};

export const NoGroups: StoryObj<HvFlowProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "You don't need to use groups. If you don't use them, the sidebar will show a list of nodes.",
      },
      source: {
        code: NoGroupsRaw,
      },
    },
  },
  render: () => <NoGroupStory />,
};

export const DynamicHandles: StoryObj<HvFlowProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "In this sample nodes' inputs and outputs are dynamically generated.",
      },
      source: {
        code: DynamicHandlesRaw,
      },
    },
  },
  render: () => <DynamicHandlesStory />,
};

export const BaseHook: StoryObj<HvFlowProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "This sample demonstrate the use of the `useHvNode` hook to create a node with a custom look and feel",
      },
      source: {
        code: BaseHookRaw,
      },
    },
  },
  render: () => <BaseHookStory />,
};

export const SubFlow: StoryObj<HvFlowProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "This sample demonstrate the use of a sub flow to create groups of nodes. Drag the node to the group node to add it, drag out of it to remove it.",
      },
      source: {
        code: SubFlowRaw,
      },
    },
  },
  render: () => <SubFlowStory />,
};
