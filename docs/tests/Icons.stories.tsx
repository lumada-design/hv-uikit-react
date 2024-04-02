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
    // Enables Chromatic snapshot
    chromatic: { disableSnapshot: false },
    eyes: { include: true },
  },
};

export const IconLibrary: StoryObj<IconBaseProps> = {
  args: {
    color: ["secondary", "negative", "positive"],
  },
  render: (args) => (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {Object.entries(icons).map(([name, Icon], i) => (
        <>
          <Icon key={name} iconSize="M" {...args} />
          {/* Visual test for icon size */}
          {i === Object.entries(icons).length - 1 && (
            <>
              <Icon key={name} iconSize="XS" {...args} />
              <Icon key={name} iconSize="S" {...args} />
              <Icon key={name} iconSize="L" {...args} />
            </>
          )}
        </>
      ))}
    </div>
  ),
};

export const IconSpriteLibrary: StoryObj<HvIconSpriteProps> = {
  args: {
    spriteUrl: "./assets/icons.svg",
    color: ["secondary", "negative", "positive"],
  },
  render: (args) => (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {Object.entries(icons).map(([name], i) => (
        <>
          <HvIconSprite key={name} iconSize="M" {...args} iconName={name} />
          {/* Visual test for icon size */}
          {i === Object.entries(icons).length - 1 && (
            <>
              <HvIconSprite
                key={name}
                iconSize="XS"
                {...args}
                iconName={name}
              />
              <HvIconSprite key={name} iconSize="S" {...args} iconName={name} />
              <HvIconSprite key={name} iconSize="L" {...args} iconName={name} />
            </>
          )}
        </>
      ))}
    </div>
  ),
};
