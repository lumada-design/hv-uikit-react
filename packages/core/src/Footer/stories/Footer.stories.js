import React from "react";
import { HvFooter, HvTypography } from "../..";

export default {
  title: "Components/Footer",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvFooter } from '@hv/uikit-react-core/dist'"
  },
  component: HvFooter,
  decorators: [
    Story => (
      <div style={{ padding: 10 }}>
        <Story />
      </div>
    )
  ]
};

export const Main = () => <HvFooter />;

export const CustomLabels = () => {
  return (
    <HvFooter
      id="sample2"
      name="Hitachi Vantara"
      copyright="© Hitachi Vantara Corporation 2018"
      links={
        <HvTypography variant="inlineLink" component="a" href="https://www.hitachivantara.com">
          License information
        </HvTypography>
      }
    />
  );
};

CustomLabels.story = {
  parameters: {
    docs: {
      storyDescription: "Sample 2 description."
    }
  }
};
