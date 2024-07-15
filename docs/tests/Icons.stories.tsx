import { StoryObj } from "@storybook/react";
import {
  Abacus,
  HvIconSprite,
  HvIconSpriteProps,
  IconBaseProps,
  icons,
} from "@hitachivantara/uikit-react-icons";

export default {
  title: "Tests/Icons",
  parameters: {
    // Enables Chromatic snapshot
    chromatic: { disableSnapshot: false },
  },
};

export const IconLibrary: StoryObj<IconBaseProps> = {
  args: {
    iconSize: "M",
    color: ["secondary", "negative", "positive"],
  },
  render: (args) => (
    <>
      <div className="flex flex-wrap">
        {Object.entries(icons).map(([name, Icon]) => (
          <Icon key={name} {...args} />
        ))}
      </div>
      <div className="flex">
        {/* Visual test for icon size */}
        <Abacus {...args} iconSize="XS" />
        <Abacus {...args} iconSize="S" />
        <Abacus {...args} iconSize="M" />
        <Abacus {...args} iconSize="L" />
      </div>
    </>
  ),
};

export const IconSpriteLibrary: StoryObj<HvIconSpriteProps> = {
  args: {
    iconSize: "M",
    spriteUrl: "./assets/icons.svg",
    color: ["secondary", "negative", "positive"],
  },
  render: (args) => (
    <>
      <div className="flex flex-wrap">
        {Object.keys(icons).map((name) => (
          <HvIconSprite {...args} key={name} iconName={name} />
        ))}
      </div>
      <div className="flex">
        {/* Visual test for icon size */}
        <HvIconSprite {...args} iconName="Abacus" iconSize="XS" />
        <HvIconSprite {...args} iconName="Abacus" iconSize="S" />
        <HvIconSprite {...args} iconName="Abacus" iconSize="M" />
        <HvIconSprite {...args} iconName="Abacus" iconSize="L" />
      </div>
    </>
  ),
};
