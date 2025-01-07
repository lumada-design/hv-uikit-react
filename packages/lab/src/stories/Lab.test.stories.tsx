import { Meta, StoryObj } from "@storybook/react";
import { HvSimpleGrid } from "@hitachivantara/uikit-react-core";

import { Variants as BladeVariantsStory } from "../Blade/Blade.stories";
import { Main as BladesMainStory } from "../Blades/Blades.stories";
import { Main as DashboardMainStory } from "../Dashboard/Dashboard.stories";
import { Variants as StepNavigationVariantsStory } from "../StepNavigation/StepNavigation.stories";
import { setupChromatic } from ".storybook/setupChromatic";
import { renderStory } from ".storybook/utils";

/** Visual tests for components from the Lab package */
const meta: Meta = {
  title: "Tests/Lab",
};
export default meta;

/**
 * Visual tests for:
 * - Blade
 * - Blades
 * - Dashboard
 * - Step navigation
 */
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
    a11y: {
      disable: true,
    },
  },
  tags: ["skipTestRunner"],
  render: (args, context: any) => (
    <>
      <HvSimpleGrid
        cols={2}
        style={{ alignItems: "start", justifyContent: "start" }}
      >
        {renderStory(DashboardMainStory, context)}
        {renderStory(BladesMainStory, context)}
        {renderStory(BladeVariantsStory, context)}
      </HvSimpleGrid>
      {renderStory(StepNavigationVariantsStory, context)}
    </>
  ),
};
