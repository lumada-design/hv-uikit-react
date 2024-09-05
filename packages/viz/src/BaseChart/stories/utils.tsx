import { Decorator } from "@storybook/react";
import { HvPanel } from "@hitachivantara/uikit-react-core";
import { HvVizProvider } from "@hitachivantara/uikit-react-viz";

export const vizDecorator: Decorator = (Story) => (
  <HvVizProvider>
    <HvPanel className="flex flex-col" style={{ height: 500 }}>
      {Story()}
    </HvPanel>
  </HvVizProvider>
);

export const confusionMatrixDecorator: Decorator = (Story) => (
  <HvVizProvider>
    <HvPanel className="flex flex-col">{Story()}</HvPanel>
  </HvVizProvider>
);
