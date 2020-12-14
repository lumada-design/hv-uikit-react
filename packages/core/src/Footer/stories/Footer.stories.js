import React from "react";
import { HvFooter, HvLink, HvTypography } from "../..";

export default {
  title: "Components/Footer",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvFooter } from '@hv/uikit-react-core/dist'",

    dsVersion: "3.2.1",
  },
  component: HvFooter,
  decorators: [
    (Story) => (
      <div style={{ padding: 10 }}>
        <Story />
      </div>
    ),
  ],
};

export const Main = () => <HvFooter />;

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
  docs: {
    description: { story: "Sample 2 description." },
  },
};
