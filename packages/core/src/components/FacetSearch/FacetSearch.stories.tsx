import { Meta, StoryObj, Decorator } from "@storybook/react";

import { Global } from "@emotion/react";

import FacetSearchRaw from "./FacetSearchSample?raw";
import { FacetSearch } from "./FacetSearchSample";

const templateDecorator: Decorator = (Story) => (
  <>
    <Global
      styles={{
        ".sbdocs-content > div:last-of-type": {
          display: "none !important",
        },
      }}
    />
    <div>{Story()}</div>
  </>
);

/**
 *
 * A Sample of an example implementation of the Facet Search design pattern.
 */
const meta: Meta = {
  title: "Widgets/Facet Search",
  decorators: [templateDecorator],
};

export default meta;

export const Sample: StoryObj = {
  parameters: {
    docs: {
      source: { code: FacetSearchRaw },
      description: {
        story:
          "A Sample of an example implementation of the Facet Search design pattern.",
      },
    },
    controls: { hideNoControlsWarning: true },
  },
  render: () => <FacetSearch />,
};
