import React from "react";
import { HvFooter, HvLink, HvTypography } from "../..";

export default {
  title: "Components/Footer",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvFooter } from "@hitachivantara/uikit-react-core"',
    maturityStatus: "stable",
    dsVersion: "3.4.0",
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
