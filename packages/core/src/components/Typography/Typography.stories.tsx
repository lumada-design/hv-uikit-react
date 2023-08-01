import { StoryObj } from "@storybook/react";
import {
  HvBox,
  HvTypography,
  HvTypographyProps,
  typographyVariants,
  theme,
} from "@hitachivantara/uikit-react-core";

export default { title: "Foundation/Typography", component: HvTypography };

export const Main: StoryObj<HvTypographyProps> = {
  args: {
    variant: "title1",
    link: false,
    disabled: false,
    noWrap: false,
    paragraph: false,
  },
  argTypes: {
    variant: { options: typographyVariants },
    component: { control: { disable: true } },
    classes: { control: { disable: true } },
  },
  decorators: [(Story) => <div style={{ width: 400 }}>{Story()}</div>],
  render: (args) => (
    <HvTypography {...args}>Welcome to NEXT Design System!</HvTypography>
  ),
};

export const Variants = () => {
  return (
    <HvBox sx={{ marginBottom: theme.spacing(7) }}>
      {typographyVariants.map((variant) => (
        <HvBox key={variant} sx={{ marginBottom: theme.space.sm }}>
          <HvTypography variant="label">{variant}</HvTypography>
          <br />
          <HvTypography variant={variant}>
            Welcome to NEXT Design System!
          </HvTypography>
        </HvBox>
      ))}
    </HvBox>
  );
};
