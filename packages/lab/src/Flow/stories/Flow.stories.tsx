import { Meta, StoryObj } from "@storybook/react";
import { fireEvent, screen, waitFor } from "@storybook/testing-library";
import {
  HvFlow,
  HvFlowBackground,
  HvFlowControls,
  HvFlowMinimap,
  HvFlowProps,
  HvFlowSidebar,
} from "@hitachivantara/uikit-react-lab";

import { CustomDrop as CustomDropStory } from "./CustomDrop";
import CustomDropRaw from "./CustomDrop?raw";
import { Dynamic as DynamicStory } from "./Dynamic";
import DynamicRaw from "./Dynamic?raw";
import { DynamicHandles as DynamicHandlesStory } from "./DynamicHandles";
import DynamicHandlesRaw from "./DynamicHandles?raw";
import { InitialState as InitialStateStory } from "./InitialState";
import InitialStateRaw from "./InitialState?raw";
import { Invalid as InvalidStory } from "./Invalid";
import InvalidRaw from "./Invalid?raw";
import { Main as MainStory } from "./Main";
import MainRaw from "./Main?raw";
import { NoGroups as NoGroupStory } from "./NoGroups";
import NoGroupsRaw from "./NoGroups?raw";
import { Visualizations as VisualizationsStory } from "./Visualizations";
import VisualizationsRaw from "./Visualizations?raw";

const meta: Meta<typeof HvFlow> = {
  title: "Lab/Flow",
  component: HvFlow,
  // @ts-expect-error https://github.com/storybookjs/storybook/issues/20782
  subcomponents: {
    HvFlowBackground,
    HvFlowControls,
    HvFlowMinimap,
    HvFlowSidebar,
  } as unknown,
  parameters: {
    eyes: {
      runBefore() {
        fireEvent.click(
          screen.getByRole("button", {
            name: "Add Node",
          }),
        );

        return waitFor(() => screen.getByText("Search node..."));
      },
    },
    a11y: {
      config: {
        rules: [
          { id: "nested-interactive", enabled: false },
          { id: "aria-prohibited-attr", enabled: false },
          { id: "color-contrast", enabled: false },
        ],
      },
    },
  },
};
export default meta;

export const Main: StoryObj<HvFlowProps> = {
  parameters: {
    docs: {
      source: {
        code: MainRaw,
      },
    },
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
    eyes: { include: false },
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
    eyes: { include: false },
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
    eyes: { include: false },
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
    eyes: { include: false },
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
    eyes: { include: false },
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
    eyes: { include: false },
  },
  render: () => <DynamicHandlesStory />,
};

export const InvalidFlow: StoryObj<HvFlowProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "This sample illustrates how to handle an invalid flow and show an error message.",
      },
      source: {
        code: InvalidRaw,
      },
    },
    eyes: { include: false },
  },
  render: () => <InvalidStory />,
};
