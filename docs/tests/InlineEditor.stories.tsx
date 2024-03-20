import {
  HvContainer,
  HvGrid,
  HvInlineEditor,
  HvTypography,
  HvTypographyVariants,
} from "@hitachivantara/uikit-react-core";
import { StoryObj } from "@storybook/react";

export default {
  title: "Tests/Inline Editor",
  parameters: {
    // Enables Chromatic snapshot
    chromatic: { disableSnapshot: false },
  },
};

const variants: HvTypographyVariants[] = [
  "display",
  "title1",
  "title2",
  "title3",
  "title4",
  "body",
  "label",
  "caption1",
  "caption2",
];

export const Main: StoryObj = {
  render: () => {
    return (
      <HvContainer>
        <HvTypography variant="title3">Enabled</HvTypography>
        <br />
        <HvInlineEditor />
        <br />
        <HvInlineEditor showIcon />
        <br />
        <HvTypography variant="title3">Disabled</HvTypography>
        <br />
        <HvInlineEditor disabled />
        <br />
        <HvInlineEditor disabled showIcon />
        <br />
        <HvTypography variant="title3">Typography Variants</HvTypography>
        <br />
        <HvGrid container>
          {variants.map((variant) => (
            <HvGrid item key={variant} xs={12} sm={6} style={{ minHeight: 64 }}>
              <HvInlineEditor
                variant={variant}
                value="Very very very long text that is likely to be truncated"
              />
            </HvGrid>
          ))}
        </HvGrid>
      </HvContainer>
    );
  },
};
