import React from "react";

import { HvFormik, HvButton } from "../..";

const container = {
  width: 400,
  display: "flex",
  justifyContent: "space-between"
};

export default {
  title: "Components/Formik",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvFormik } from '@hv/uikit-react-core/dist'"
  },
  component: HvFormik
};

export const Main = () => (
  <>
    <HvFormik id="badge1" />
  </>
);

Main.story = {
  decorators: [storyFn => <div style={container}>{storyFn()}</div>]
};
