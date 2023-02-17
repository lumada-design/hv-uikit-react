import { StoryObj } from "@storybook/react";
import { HvTypography, HvTypographyProps } from "./Typography";

export default { title: "Theme/Typography", component: HvTypography };

export const Main: StoryObj<HvTypographyProps> = {
  args: {
    children: "Welcome to NEXT Design System!",
    variant: "title1",
    link: false,
    disabled: false,
    noWrap: false,
  },
  decorators: [(Story) => <div style={{ width: 400 }}>{Story()}</div>],
};

const Link = ({ children }) => (
  <a href="http://www.google.com" target="_blank">
    {children}
  </a>
);

export const Samples = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <HvTypography>This is a link!</HvTypography>
      <HvTypography variant="title3">This is a link!</HvTypography>
      <HvTypography component="a">This is a link!</HvTypography>
      <HvTypography component="a" variant="title4">
        This is a link!
      </HvTypography>
      <HvTypography component={Link}>This is a link!</HvTypography>
      <HvTypography component="label" variant="label">
        This is a link!
      </HvTypography>
    </div>
  );
};
