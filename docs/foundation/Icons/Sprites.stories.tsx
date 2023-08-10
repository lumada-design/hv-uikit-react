import {
  HvIconSprite,
  HvIconSpriteProps,
  icons,
} from "@hitachivantara/uikit-react-icons";
import { Meta, StoryObj } from "@storybook/react";

export default {
  title: "Foundation/Icons/Sprites",
  parameters: {
    componentSubtitle:
      "The HvIconSprite component is used to display SVG icons from a sprite sheet.",
  },
  component: HvIconSprite,
} as Meta<typeof HvIconSprite>;

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
    color={["secondary", "brand"]}
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

export const IconLibraryTest = () => {
  const colors = ["secondary", "negative", "positive"];

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {Object.entries(icons).map(([name]) => (
        <HvIconSprite
          key={name}
          spriteUrl="./assets/icons.svg"
          iconName={name}
          iconSize="M"
          color={colors}
        />
      ))}
    </div>
  );
};

IconLibraryTest.parameters = {
  eyes: { include: true },
  docs: { disable: true },
};
