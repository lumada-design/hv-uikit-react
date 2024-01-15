import React from "react";
import { HvFooter, HvLink, HvTypography } from "../..";

export default {
  title: "Components/Footer",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvFooter } from "@hitachivantara/uikit-react-core";',
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
      copyright="© Hitachi Vantara Corporation 2018"
      links={
        <HvTypography component="div" variant="inlineLink">
          <HvLink route="https://www.hitachivantara.com">License information</HvLink>
        </HvTypography>
      }
    />
  );
};

CustomLabels.story = {
  parameters: {
    docs: {
      storyDescription: "Sample 2 description.",
    },
  },
};
