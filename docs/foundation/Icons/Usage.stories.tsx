import {
  Bookmark,
  CheckboxCheck,
  Level4,
  Level5,
  Machine,
  IconBase,
  IconBaseProps,
  icons,
  Level3Bad,
} from "@hitachivantara/uikit-react-icons";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof IconBase> = {
  title: "Foundation/Icons/Usage",
  parameters: {
    componentSubtitle: null,
  },
  component: IconBase,
};
export default meta;

export const Main: StoryObj<IconBaseProps> = {
  args: {
    iconSize: "S",
  },
  argTypes: {
    svgProps: { table: { disable: true } },
  },
  render: (args) => {
    return <CheckboxCheck {...args} />;
  },
};

export const IconSize = () => <CheckboxCheck iconSize="M" />;

IconSize.parameters = {
  docs: {
    description: { story: "Overrides Generic Icon size using standard sizes" },
  },
};

export const CustomColors = () => (
  <div style={{ display: "flex", gap: 8 }}>
    <Bookmark
      color={["brand", "secondary"]}
      iconSize="M"
      aria-label="Click to bookmark"
    />
    <Level3Bad
      color={["warning", "base_light"]}
      iconSize="M"
      aria-label="Attention"
    />
    <Level5 color={["none", "negative"]} iconSize="M" aria-label="Error" />
  </div>
);

CustomColors.parameters = {
  docs: {
    description: { story: "Overriding Icon colors with palette colors" },
  },
};

export const DecorativeIcon = () => (
  <Machine role="presentation" iconSize="M" />
);

DecorativeIcon.parameters = {
  docs: {
    description: {
      story:
        "Icon with decorative meaning using the hidden attribute for accessibility",
    },
  },
};

export const SemanticIcon = () => (
  <Level4 role="img" title="Warning!" iconSize="M" color="negative" />
);

SemanticIcon.parameters = {
  docs: {
    description: {
      story:
        "Icon with semantic meaning using the title and role attributes for accessibility",
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

export const IconLibraryTest = () => {
  const colors = ["secondary", "negative", "positive"];

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {Object.entries(icons).map(([name, Icon]) => (
        <Icon key={name} iconSize="M" color={colors} />
      ))}
    </div>
  );
};

IconLibraryTest.parameters = {
  eyes: { include: true },
  docs: { disable: true },
};
