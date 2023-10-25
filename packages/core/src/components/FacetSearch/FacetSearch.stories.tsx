import { Meta, StoryObj } from "@storybook/react";
import FacetSearchRaw from "./FacetSearch?raw";
import { FacetSearch } from "./FacetSearch";

const meta: Meta = {
  title: "Widgets/Facet Search",
};

export default meta;

export const Sample: StoryObj = {
  parameters: {
    docs: {
      source: { code: FacetSearchRaw },
      description: {
        story:
          "A Sample of an example implementation of the Facet Search design patterned.",
      },
    },
  },
  render: () => <FacetSearch />,
};
