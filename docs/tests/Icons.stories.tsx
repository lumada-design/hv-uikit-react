import { StoryObj } from "@storybook/react";
import {
  HvIconSprite,
  HvIconSpriteProps,
  IconBaseProps,
  icons,
} from "@hitachivantara/uikit-react-icons";

export default {
  title: "Tests/Icons",
  parameters: {
    docs: { disable: true },
  },
};

export const IconLibrary: StoryObj<IconBaseProps> = {
  args: {
    iconSize: "M",
    color: ["secondary", "negative", "positive"],
  },
  render: (args) => (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {Object.entries(icons).map(([name, Icon]) => (
        <Icon key={name} {...args} />
      ))}
    </div>
  ),
};

export const IconSpriteLibrary: StoryObj<HvIconSpriteProps> = {
  args: {
    iconSize: "M",
    spriteUrl: "./assets/icons.svg",
    color: ["secondary", "negative", "positive"],
  },
  render: (args) => (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {Object.entries(icons).map(([name]) => (
        <HvIconSprite key={name} {...args} iconName={name} />
      ))}
    </div>
  ),
};
