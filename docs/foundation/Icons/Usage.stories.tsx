import {
  Bookmark,
  CheckboxCheck,
  Level4,
  Level5,
  Machine,
  IconBase,
  IconBaseProps,
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
    inverted: false,
  },
  argTypes: {
    svgProps: { control: { disable: true } },
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
  <Bookmark
    color={["acce3", "acce1"]}
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
  <Level4 role="img" title="Warning!" iconSize="M" semantic="sema4" />
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

export const InvertedColors = () => (
  <Level5 iconSize="L" inverted role="img" title="Critical!" />
);

InvertedColors.parameters = {
  docs: {
    description: { story: "Inverts Generic Icon colors" },
  },
};
