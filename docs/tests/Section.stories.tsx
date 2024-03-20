import {
  HvSection,
  HvTypography,
  HvButton,
} from "@hitachivantara/uikit-react-core";
import { StoryObj } from "@storybook/react";

export default {
  title: "Tests/Section",
  parameters: {
    // Enables Chromatic snapshot
    chromatic: { disableSnapshot: false },
  },
};

export const Main: StoryObj = {
  render: () => (
    <>
      <HvSection
        title={<HvTypography variant="title4">My Section</HvTypography>}
        actions={<HvButton variant="primaryGhost">Action</HvButton>}
      >
        <HvTypography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor
          blandit ipsum quis sollicitudin. Aliquam erat volutpat. Praesent nisi
          nisl, sodales vitae blandit tincidunt, malesuada id sapien. Nulla
          dapibus accumsan est, a pharetra velit consequat et. Nullam iaculis
          justo sed urna condimentum ultricies. Integer nec interdum tortor.
          Nulla molestie nibh in elit congue malesuada. Donec fringilla volutpat
          sapien id maximus. Vestibulum faucibus pellentesque ex, non gravida
          dui pharetra quis.
        </HvTypography>
      </HvSection>
      <br />
      <HvSection>
        <HvTypography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor
          blandit ipsum quis sollicitudin. Aliquam erat volutpat. Praesent nisi
          nisl, sodales vitae blandit tincidunt, malesuada id sapien. Nulla
          dapibus accumsan est, a pharetra velit consequat et.
        </HvTypography>
      </HvSection>
      <br />
      <HvSection expandable title="My Section">
        <HvTypography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor
          blandit ipsum quis sollicitudin. Aliquam erat volutpat. Praesent nisi
          nisl, sodales vitae blandit tincidunt, malesuada id sapien. Nulla
          dapibus accumsan est, a pharetra velit consequat et.
        </HvTypography>
      </HvSection>
      <br />
      <HvSection raisedHeader expandable title="My Section">
        <HvTypography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor
          blandit ipsum quis sollicitudin. Aliquam erat volutpat. Praesent nisi
          nisl, sodales vitae blandit tincidunt, malesuada id sapien. Nulla
          dapibus accumsan est, a pharetra velit consequat et.
        </HvTypography>
      </HvSection>
      <br />
      <HvSection
        expandable
        expanded={false}
        title="My Section"
        actions={<HvButton variant="primaryGhost">Action</HvButton>}
      >
        <HvTypography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor
          blandit ipsum quis sollicitudin. Aliquam erat volutpat. Praesent nisi
          nisl, sodales vitae blandit tincidunt, malesuada id sapien. Nulla
          dapibus accumsan est, a pharetra velit consequat et.
        </HvTypography>
      </HvSection>
    </>
  ),
};
