import React from "react";
import { makeDecorator } from "@storybook/addons";
import Layout from "./Layout/Main";

const withLayout = makeDecorator({
  name: "withLayout",
  skipIfNoParametersOrOptions: false,
  wrapper: (getStory, context, args) => (
    <Layout context={context}>{getStory(context)}</Layout>
  )
});

export default withLayout;
