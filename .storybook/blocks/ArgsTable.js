import React, { useContext } from "react";
import { ArgsTableError } from "@storybook/components";
import { DocsContext, CURRENT_SELECTION, PRIMARY_STORY, StoryTable } from "@storybook/addon-docs";

const isShortcut = (value) => {
  return value && [CURRENT_SELECTION, PRIMARY_STORY].includes(value);
};

export const getComponent = (props = {}, context) => {
  const { of } = props;
  const { story } = props;
  const { parameters = {} } = context;
  const { component } = parameters;
  if (isShortcut(of) || isShortcut(story)) {
    return component?.Naked || component || null;
  }
  if (!of) {
    throw new Error(ArgsTableError.NO_COMPONENT);
  }
  return of;
};

export const ArgsTable = (props) => {
  const context = useContext(DocsContext);
  const { parameters: { subcomponents } = {} } = context;
  const { include, exclude, components } = props;
  const { story } = props;

  const main = getComponent(props, context);
  if (story) {
    return <StoryTable {...props} component={main} subcomponents={subcomponents} />;
  }
};

ArgsTable.defaultProps = {
  of: ".",
};
