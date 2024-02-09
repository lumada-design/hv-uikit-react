import { StoryObj } from "@storybook/react";

import { CreateTheme as CreateThemeStory } from "./CreateTheme";
import CreateThemeRaw from "./CreateTheme?raw";
import { ThemeContext as ThemeContextStory } from "./ThemeContext";
import ThemeContextRaw from "./ThemeContext?raw";
import { CssVariables as CssVariablesStory } from "./CssVariables";
import CssVariablesRaw from "./CssVariables?raw";
import { DefaultProps as DefaultPropsStory } from "./DefaultProps";
import DefaultPropsRaw from "./DefaultProps?raw";
import { Spacing as SpacingStory } from "./Spacing";
import SpacingRaw from "./Spacing?raw";
import { Alpha as AlphaStory } from "./Alpha";
import AlphaRaw from "./Alpha?raw";

export default {
  title: "Guides/Theming",
};

export const CreateTheme: StoryObj = {
  parameters: { docs: { source: { code: CreateThemeRaw } } },
  render: () => <CreateThemeStory />,
};

export const ThemeContext: StoryObj = {
  parameters: { docs: { source: { code: ThemeContextRaw } } },
  render: () => <ThemeContextStory />,
};

export const CssVariables: StoryObj = {
  parameters: { docs: { source: { code: CssVariablesRaw } } },
  render: () => <CssVariablesStory />,
};

export const DefaultProps: StoryObj = {
  parameters: { docs: { source: { code: DefaultPropsRaw } } },
  render: () => <DefaultPropsStory />,
};

export const Spacing: StoryObj = {
  parameters: { docs: { source: { code: SpacingRaw } } },
  render: () => <SpacingStory />,
};

export const Alpha: StoryObj = {
  parameters: { docs: { source: { code: AlphaRaw } } },
  render: () => <AlphaStory />,
};
