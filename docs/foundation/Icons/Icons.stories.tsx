import { Meta, StoryObj } from "@storybook/react";
import {
  Bookmark,
  CheckboxCheck,
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
    aria-label="Click to bookmark"
  />
);

CustomColors.parameters = {
  docs: {
    description: { story: "Overriding Icon colors with palette colors" },
  },
};

export const Accessibility = () => (
  <>
    <Machine role="none" iconSize="M" />
    <Level4 role="img" title="Warning!" iconSize="M" color="negative" />
  </>
);

Accessibility.parameters = {
  docs: {
    description: {
      story:
        'Decorative icons should have `role="none"` or equivalent, hiding them from the accessibility tree. <br /> Semantic icons should be given a role and label associated with their meaning, such as `role="img"`',
    },
  },
};

export const CustomSize = () => (
  <CheckboxCheck height={200} width={200} style={{ width: 240, height: 240 }} />
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
