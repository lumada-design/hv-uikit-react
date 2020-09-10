import React from "react";
import { HvFooter, HvLink, HvTypography } from "../..";

export default {
  title: "Patterns/Footer",
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

Main.parameters = {
  v3: true
};

export const CustomLabels = () => {
  return (
    <HvFooter
      id="sample2"
      name="Hitachi Vantara"
      copyright="© Hitachi Vantara Corporation 2020"
      links={
        <HvTypography component="div" variant="link">
          <HvLink route="https://www.hitachivantara.com">License information</HvLink>
        </HvTypography>
      }
    />
  );
};

CustomLabels.parameters = {
  v3: true,
  docs: {
    description: { story: "Sample 2 description." }
  }
};
