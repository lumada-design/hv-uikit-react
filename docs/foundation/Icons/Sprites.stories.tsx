import {
  HvIconSprite,
  HvIconSpriteProps,
} from "@hitachivantara/uikit-react-icons";
import { Meta, StoryObj } from "@storybook/react";

export default {
  title: "Foundation/Icons/Sprites",
  component: HvIconSprite,
} satisfies Meta<typeof HvIconSprite>;

export const Main: StoryObj<HvIconSpriteProps> = {
  args: {
    iconSize: "S",
    spriteUrl: "./assets/icons.svg",
    iconName: "CheckboxCheck",
  },
  argTypes: {
    svgProps: { control: { disable: true } },
    spriteUrl: {
      control: { type: "select" },
      options: ["./assets/icons.svg", "./assets/pictograms.svg"],
    },
  },
  render: (args) => {
    return <HvIconSprite {...args} />;
  },
};

export const IconSize = () => (
  <HvIconSprite
    spriteUrl="./assets/icons.svg"
    iconName="CheckboxCheck"
    iconSize="M"
  />
);

IconSize.parameters = {
  docs: {
    description: { story: "Overrides Generic Icon size using standard sizes" },
  },
};

export const CustomColors = () => (
  <HvIconSprite
    spriteUrl="./assets/icons.svg"
    iconName="Bookmark"
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

export const DecorativeIcon = () => (
  <HvIconSprite
    spriteUrl="./assets/icons.svg"
    iconName="Machine"
    role="presentation"
    iconSize="M"
  />
);

DecorativeIcon.parameters = {
  docs: {
    description: {
      story:
        "Icon with decorative meaning using the hidden attribute for accessibility",
    },
  },
};

export const CustomSize = () => (
  <HvIconSprite
    spriteUrl="./assets/icons.svg"
    iconName="CheckboxCheck"
    height={200}
    width={200}
    style={{ width: 240, height: 240 }}
  />
);

CustomSize.parameters = {
  docs: {
    description: { story: "Overrides Icon size using non standard sizes" },
  },
};
