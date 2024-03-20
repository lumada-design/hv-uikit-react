import { StoryObj } from "@storybook/react";
import {
  HvTypography,
  theme,
  typographyVariants,
} from "@hitachivantara/uikit-react-core";

export default {
  title: "Tests/Typography",
  parameters: {
    // Enables Chromatic snapshot
    chromatic: { disableSnapshot: false },
  },
};

export const Main: StoryObj = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: theme.space.sm,
      }}
    >
      {typographyVariants.map((variant) => (
        <div key={variant}>
          <HvTypography variant="label">{variant}</HvTypography>
          <br />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <HvTypography variant={variant}>
              Welcome to NEXT Design System!
            </HvTypography>
            <HvTypography variant={variant} disabled>
              Welcome to NEXT Design System!
            </HvTypography>
            <HvTypography
              variant={variant}
              link
              component="a"
              href="https://lumada-design.github.io/uikit/master"
            >
              Welcome to NEXT Design System!
            </HvTypography>
          </div>
        </div>
      ))}
    </div>
  ),
};
