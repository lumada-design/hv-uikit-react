import { Meta, StoryObj } from "@storybook/react";
import { HvSimpleGrid } from "@hitachivantara/uikit-react-core";

import { Variants as BladeVariantsStory } from "./Blade/Blade.stories";
import { Main as BladesMainStory } from "./Blades/Blades.stories";
import { Main as DashboardMainStory } from "./Dashboard/Dashboard.stories";
import { Variants as StepNavigationVariantsStory } from "./StepNavigation/StepNavigation.stories";
import { setupChromatic } from ".storybook/setupChromatic";

const meta: Meta = {
  title: "Lab/Test",
};
export default meta;

export const Test: StoryObj = {
  parameters: {
    ...setupChromatic(
      [
        "DS3 dawn",
        "DS3 wicked",
        "DS5 dawn",
        "DS5 wicked",
        "Pentaho+ dawn",
        "Pentaho+ wicked",
      ],
      5000,
    ),
    docs: { disable: true },
  },
  render: (args, context: any) => (
    <>
      <HvSimpleGrid
        cols={2}
        style={{ alignItems: "start", justifyContent: "start" }}
      >
        {DashboardMainStory.render?.(DashboardMainStory.args as any, context)}
        {BladesMainStory.render?.(BladesMainStory.args as any, context)}
        {BladeVariantsStory.render?.(BladeVariantsStory.args as any, context)}
      </HvSimpleGrid>
      {StepNavigationVariantsStory.render?.(
        StepNavigationVariantsStory.args as any,
        context,
      )}
    </>
  ),
};
