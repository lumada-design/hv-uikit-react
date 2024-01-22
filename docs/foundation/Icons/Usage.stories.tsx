import {
  Bookmark,
  CheckboxCheck,
  Level4,
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
  },
  argTypes: {
    svgProps: { table: { disable: true } },
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
