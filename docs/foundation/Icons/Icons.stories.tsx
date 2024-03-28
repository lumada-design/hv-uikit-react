import { Meta, StoryObj } from "@storybook/react";
import { HvIconButton } from "@hitachivantara/uikit-react-core";
import {
  Bookmark,
  CheckboxCheck,
  Close,
  HvIconSprite,
  HvIconSpriteProps,
  IconBase,
  Level4,
  Machine,
} from "@hitachivantara/uikit-react-icons";

const meta: Meta<typeof IconBase> = {
  title: "Foundation/Icons",
  parameters: {
    componentSubtitle: null,
  },
  component: IconBase,
};
export default meta;

/** internal or deprecated props that shouldn't be used */
const disabledArgs = {
  svgProps: { table: { disable: true } },
  palette: { table: { disable: true } },
  semantic: { table: { disable: true } },
  inverted: { table: { disable: true } },
  viewbox: { table: { disable: true } },
};

export const Main: StoryObj<typeof IconBase> = {
  args: {
    iconSize: "S",
    color: "secondary",
  },
  argTypes: {
    ...disabledArgs,
    iconName: { table: { disable: true } },
  },
  render: (args) => {
    return <CheckboxCheck {...args} />;
  },
};

export const CustomColors = () => (
  <Bookmark
    color={["brand", "secondary"]}
    iconSize="M"
    title="Click to bookmark"
  />
);

CustomColors.parameters = {
  docs: {
    description: { story: "Overriding Icon colors with palette colors" },
  },
};

export const Accessibility = () => (
  <>
    <Machine iconSize="M" />
    <Level4 title="Warning!" iconSize="M" color="negative" />
    <HvIconButton title="Close" onClick={() => {}}>
      <Close />
    </HvIconButton>
  </>
);

Accessibility.parameters = {
  docs: {
    description: {
      story:
        'Icons have `role="none"` by default, hiding them from the accessibility tree. <br /> \
        Semantic icons should be given a `title` label associated with their meaning. <br /> \
        If icons trigger actions, they should be wrapped in a tooltip and a button. For this, use `HvIconButton` with the `title` attribute.',
    },
  },
};

export const CustomSize = () => (
  <CheckboxCheck width={200} height={200} style={{ width: 240, height: 240 }} />
);

CustomSize.parameters = {
  docs: {
    description: { story: "Overrides Icon size using non standard sizes" },
  },
};

export const IconSprites: StoryObj<HvIconSpriteProps> = {
  args: {
    iconName: "CheckboxCheck",
    spriteUrl: "./assets/icons.svg",
    color: "secondary",
    iconSize: "S",
  },
  argTypes: {
    ...disabledArgs,
    spriteUrl: {
      description:
        "The URL to the SVG icon sprite, served statically served by the application.",
      control: { type: "radio" },
      options: ["./assets/icons.svg", "./assets/pictograms.svg"],
    },
  },
  render: (args) => {
    return <HvIconSprite {...args} />;
  },
};
