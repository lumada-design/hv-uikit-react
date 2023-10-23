import {
  HvFlowBackground,
  HvFlowControls,
  HvFlowMinimap,
  HvFlowSidebar,
  HvFlow,
  HvFlowProps,
} from "@hitachivantara/uikit-react-lab";
import { Meta, StoryObj } from "@storybook/react";
import { waitFor, screen, fireEvent } from "@storybook/testing-library";

import { InitialState as InitialStateStory } from "./InitialState";
import InitialStateRaw from "./InitialState?raw";
import { Main as MainStory } from "./Main";
import MainRaw from "./Main?raw";
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
          })
        );

        return waitFor(() => screen.getByText("Search node..."));
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
        <br /><br />Please refer to the <b><a target="_blank" href="https://github.com/lumada-design/hv-uikit-react/blob/master/packages/lab/src/components/Flow/stories/Visualizations/Visualizations.tsx">code samples</a> </b> in our repository for more details.`,
      },
      source: {
        code: VisualizationsRaw,
      },
    },
    eyes: { include: false },
  },
  render: () => <VisualizationsStory />,
};
