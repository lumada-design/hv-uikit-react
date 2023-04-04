import { StoryObj } from "@storybook/react";
import { HvBox } from "~/components";
import {
  HvTypography,
  HvTypographyProps,
  HvTypographyVariants,
} from "./Typography";
import { theme } from "@hitachivantara/uikit-styles";

export default { title: "Foundation/Typography", component: HvTypography };

export const Main: StoryObj<HvTypographyProps> = {
  args: {
    variant: "title1",
    link: false,
    disabled: false,
    noWrap: false,
    paragraph: false,
  },
  decorators: [(Story) => <div style={{ width: 400 }}>{Story()}</div>],
  render: (args) => (
    <HvTypography {...args}>Welcome to NEXT Design System!</HvTypography>
  ),
};

const variants = [
  "display",
  "title1",
  "title2",
  "title3",
  "title4",
  "body",
  "label",
  "caption1",
  "caption2",
] as HvTypographyVariants[];

export const Variants = () => {
  return (
    <HvBox sx={{ marginBottom: theme.spacing(7) }}>
      {variants.map((variant: HvTypographyVariants) => {
        return (
          <HvBox key={`key_${variant}`} sx={{ marginBottom: theme.space.sm }}>
            <HvTypography variant="label" key={`label_${variant}`}>
              {variant}
            </HvTypography>
            <br />
            <HvTypography variant={variant} key={variant}>
              Welcome to NEXT Design System!
            </HvTypography>
          </HvBox>
        );
      })}
    </HvBox>
  );
};
