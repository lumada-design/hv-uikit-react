import React, { useContext } from "react";
import { Source } from "@storybook/components";
import { DocsContext } from "@storybook/addon-docs";

export const Usage = ({ slot, children }) => {
  const context = useContext(DocsContext);
  const { parameters } = context;
  let text = children;
  if (!text) {
    text = slot ? slot(context) : parameters && parameters.usage;
  }
  return text ? <Source code={text} /> : null;
};
